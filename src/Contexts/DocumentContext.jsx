import { createContext, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../Hooks/useLocalStorage.js";
import { useUser } from "./UserContext.jsx";
import { getDocument } from "../EditorConfig/editorHelper.js";
import { usePages } from "../Hooks/usePages.js";
import { useFetchDocument } from "../Hooks/useFetchDocument.js";

const DocumentContext = createContext(null);

export function DocumentProvider ({ children }) {
	const { token } = useUser();
	const { documentId } = useParams();
	const [modifiedDocument, setModifiedDocument] = useLocalStorage(documentId);
	const { currentPage: currentPageNumber, nextPage, previousPage } = usePages();
	const pageRef = useRef(null);
	const {
		isLoading: isLoadingFetchDocument,
		error: errorFetchDocument,
		fetchDocument,
	} = useFetchDocument(documentId);

	useEffect(() => {
		if (!modifiedDocument) fetchDocument().then(setModifiedDocument);
	}, [modifiedDocument]);

	const currentPage = modifiedDocument?.pages.find(page => page.pageNumber === currentPageNumber);

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
					? { ...page, body: text, }
					: page
			),
		}));
		pageRef.current.srcdoc = getDocument(text);
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
		handleSave,
		// pages
		currentPage,
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