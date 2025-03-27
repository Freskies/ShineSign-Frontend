import { useLocalStorage } from "./useLocalStorage.js";

export function useLocalDocument (documentId) {
	const [localDocument, setLocalDocument] = useLocalStorage(documentId);
	const isPublic = localDocument?.isPublic;
	const pages = localDocument?.pages;

	const numberOfPages = pages?.length;
	const firstPage = pages?.find(page => page.isFirst);
	const lastPage = pages?.find(page => page.nextPage === null);

	function getNextPage (prevPage) {
		return pages.find(page => prevPage.nextPage === page.id);
	}

	function getPreviousPage (nextPage) {
		return pages.find(page => page.nextPage === nextPage.id);
	}

	function getPageTailed (firstPage, pageNumber) {
		if (!firstPage) return null;
		if (pageNumber === 0) return firstPage;
		return getPageTailed(getNextPage(firstPage), pageNumber - 1);
	}

	function getPageById (pageId) {
		return pages.find(page => page.id === pageId);
	}

	function getPageByNumber (pageNumber) {
		return getPageTailed(firstPage, pageNumber);
	}

	function getPage (pageIdOrNumber) {
		return Number.isFinite(pageIdOrNumber)
			? getPageByNumber(pageIdOrNumber)
			: getPageById(pageIdOrNumber);
	}

	function hasNextPage (page) {
		return page?.nextPage !== null;
	}

	function hasPreviousPage (page) {
		return page?.id !== firstPage?.id;
	}

	function isDeletable (page) {
		return !(page?.isFirst) || page.nextPage !== null;
	}

	function setVisibility (isPublic) {
		setLocalDocument(prevLocalDocument => ({
			...prevLocalDocument,
			isPublic,
		}));
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

	function clearPage (page) {
		return {
			...page,
			body: "",
			style: "",
		};
	}

	function _deletePage (pageToDelete) {
		if (!isDeletable(pageToDelete)) {
			setLocalDocument(prevLocalDocument => ({
				...prevLocalDocument,
				pages: prevLocalDocument.pages.map(page =>
					page.id === pageToDelete.id
						? clearPage(page)
						: page,
				),
			}));
			return;
		}

		const prevPageId = getPreviousPage(pageToDelete)?.id;
		const nextPageId = getNextPage(pageToDelete)?.id;
		const isFirst = pageToDelete.isFirst;

		setLocalDocument(prevLocalDocument => ({
			...prevLocalDocument,
			pages: prevLocalDocument.pages.reduce((acc, page) => {
				if (page.id === prevPageId) return [...acc, { ...page, nextPage: nextPageId ?? null }];
				if (page.id === pageToDelete.id) return acc;
				if (isFirst && page.id === nextPageId) return [...acc, { ...page, isFirst: true }];
				return [...acc, page];
			}, []),
		}));
	}

	function deletePage (pageIdOrNumber) {
		_deletePage(
			Number.isFinite(pageIdOrNumber)
				? getPageByNumber(pageIdOrNumber)
				: getPageById(pageIdOrNumber),
		);
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
		isPublic,
		numberOfPages,
		firstPage,
		lastPage,
		getPage,
		hasNextPage,
		hasPreviousPage,
		setVisibility,
		setBody,
		setStyle,
		setLocalDocument,
		handleAddPage,
		deletePage,
	};
}