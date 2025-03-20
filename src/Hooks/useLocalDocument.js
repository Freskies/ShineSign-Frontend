import { useLocalStorage } from "./useLocalStorage.js";

export function useLocalDocument (documentId) {
	const [localDocument, setLocalDocument] = useLocalStorage(documentId);
	const pages = localDocument?.pages;

	const numberOfPages = pages.length;
	const firstPage = pages.find(page => page.isFirst);
	const lastPage = pages.find(page => page.nextPage === null);

	function getNextPage (prevPage) {
		return pages.find(page => prevPage.nextPage === page.id);
	}

	function getPageTailed (firstPage, pageNumber) {
		if (!firstPage) return null;
		if (pageNumber === 0) return firstPage;
		return getPageTailed(getNextPage(firstPage), pageNumber - 1);
	}

	function getPage (pageNumber) {
		return getPageTailed(firstPage, pageNumber);
	}

	function hasNextPage (page) {
		return page?.nextPage !== null;
	}

	function hasPreviousPage (page) {
		return page?.id !== firstPage?.id;
	}

	function setBody (pageId, text) {
		setLocalDocument(prevLocalDocument => ({
			...prevLocalDocument,
			pages: prevLocalDocument.pages.map(page =>
				page.id === pageId
					? { ...page, body: text }
					: page,
			),
		}));
	}

	function setStyle (pageId, text) {
		setLocalDocument(prevLocalDocument => ({
			...prevLocalDocument,
			pages: prevLocalDocument.pages.map(page =>
				page.id === pageId
					? { ...page, style: text }
					: page,
			),
		}));
	}

	function handleAddPage (newPage) {
		const prevLastPage = { ...lastPage, nextPage: newPage.id };
		setLocalDocument(prevLocalDocument => ({
			...prevLocalDocument,
			pages: [
				...prevLocalDocument.pages.slice(0, -1),
				prevLastPage,
				newPage,
			],
		}));
	}

	return {
		localDocument,
		numberOfPages,
		firstPage,
		lastPage,
		getPage,
		hasNextPage,
		hasPreviousPage,
		setBody,
		setStyle,
		setLocalDocument,
		handleAddPage,
	};
}