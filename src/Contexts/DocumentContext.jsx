import { createContext, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "./UserContext.jsx";
import { useFetchDocument } from "../Hooks/requests/useFetchDocument.js";
import { useCounter } from "../Hooks/useCounter.js";
import { useLocalDocument } from "../Hooks/useLocalDocument.js";
import { useCreatePage } from "../Hooks/requests/useCreatePage.js";
import { useSaveDocument } from "../Hooks/requests/useSaveDocument.js";

const DocumentContext = createContext(null);

export function DocumentProvider ({ children }) {
	const { token } = useUser();
	const { documentId } = useParams();
	const pageRef = useRef(null);

	const {
		// isLoading: isLoadingFetchDocument,
		// error: errorFetchDocument,
		fetchDocument,
	} = useFetchDocument(documentId);

	const {
		// isLoading: isLoadingCreatePage,
		// error: errorCreatePage,
		createPage,
	} = useCreatePage(token);

	const {
		// isLoading: isLoadingSaveDocument,
		saveDocument,
	} = useSaveDocument(token);

	const {
		localDocument,
		getPage,
		hasNextPage: hasNextPageGeneric,
		hasPreviousPage: hasPreviousPageGeneric,
		setBody,
		setStyle,
		setLocalDocument,
		handleAddPage: onAddPage,
		deletePage: onDeletePage,
	} = useLocalDocument(documentId);

	const {
		count: currentPageNumber,
		increment: handleNextPage,
		decrement: handlePreviousPage,
	} = useCounter(1);

	const currentPage = getPage(currentPageNumber - 1);

	///////// DEBUGGING /////////
	// console.log("DocumentProvider", { localDocument, currentPageNumber, currentPage });

	useEffect(() => {
		if (!localDocument) fetchDocument().then(setLocalDocument);
	}, [localDocument]);

	function hasNextPage () {
		return hasNextPageGeneric(currentPage);
	}

	function hasPreviousPage () {
		return hasPreviousPageGeneric(currentPage);
	}

	function handleChangeBody (text) {
		setBody(currentPage.id, text);
	}

	function handleChangeStyle (text) {
		setStyle(currentPage.id, text);
	}

	async function addNewPage () {
		const newPage = await createPage(documentId);
		onAddPage(newPage);
		handleNextPage();
	}

	function handleDeletePage () {
		if (hasPreviousPage()) handlePreviousPage();
		onDeletePage(currentPage.id);
	}

	async function handleSaveDocument () {
		try {
			await saveDocument(localDocument);
			setLocalDocument(null);
		} catch (error) {
			console.error("Failed to save document", error);
		}
	}

	const value = {
		pageRef,
		documentId,
		currentPageNumber,
		hasNextPage,
		hasPreviousPage,
		handleNextPage,
		handlePreviousPage,
		currentPage,
		handleChangeBody,
		handleChangeStyle,
		addNewPage,
		handleDeletePage,
		handleSaveDocument,
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