import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../Hooks/useLocalStorage.js";
import { useUser } from "./UserContext.jsx";
import { useFetchDocument } from "../Hooks/useFetchDocument.js";

const DocumentContext = createContext(null);

export function DocumentProvider ({ children }) {
	const { token } = useUser();
	const { documentId } = useParams();
	const [modifiedDocument, setModifiedDocument] = useLocalStorage(documentId);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const pageRef = useRef(null);
	const {
		isLoading: isLoadingFetchDocument,
		error: errorFetchDocument,
		fetchDocument,
	} = useFetchDocument(documentId);

	useEffect(() => {
		if (!modifiedDocument) fetchDocument().then(setModifiedDocument);
	}, [modifiedDocument]);

	function navigatePages (page, pageNumber) {
		if (!page) return null;
		if (pageNumber === 0) return page;
		return navigatePages(page.nextPage, pageNumber - 1);
	}

	const firstPage = modifiedDocument?.pages.find(page => page.isFirst);
	const currentPage = navigatePages(firstPage, currentPageNumber - 1);

	function handleChange (newDocument) {
		setModifiedDocument(newDocument);
	}

	function handleSave () {

	}

	function handleChangeBody (text) {
		setModifiedDocument(prevModifiedDocument => ({
			...prevModifiedDocument,
			pages: prevModifiedDocument.pages.map(page =>
				page.pageNumber === currentPage.pageNumber
					? { ...page, body: text }
					: page,
			),
		}));
	}

	function handleChangeStyle (text) {
		setModifiedDocument(prevModifiedDocument => ({
			...prevModifiedDocument,
			pages: prevModifiedDocument.pages.map(page =>
				page.pageNumber === currentPage.pageNumber
					? { ...page, style: text }
					: page,
			),
		}));
	}

	function hasNextPage () {
		return currentPage.nextPage !== null;
	}

	function hasPreviousPage () {
		return modifiedDocument.pages.find(page => page.nextPage === currentPage.id);
	}

	function nextPage () {
		setCurrentPageNumber(prevCurrentPageNumber => prevCurrentPageNumber + 1);
	}

	function previousPage () {
		setCurrentPageNumber(prevCurrentPageNumber => prevCurrentPageNumber - 1);
	}

	function newPage () {
		
	}

	const value = {
		pageRef,
		documentId,
		modifiedDocument,
		// states
		isLoadingFetchDocument,
		errorFetchDocument,
		// actions
		handleChange,
		handleChangeBody,
		handleChangeStyle,
		handleSave,
		// pages
		currentPage,
		currentPageNumber,
		hasNextPage,
		hasPreviousPage,
		nextPage,
		previousPage,
	};

	return <DocumentContext.Provider value={value}>
		{children}
	</DocumentContext.Provider>;
}

export function useDocument () {
	const context = useContext(DocumentContext);
	if (!context) throw new Error("useDocument must be used within a DocumentProvider");
	return context;
}