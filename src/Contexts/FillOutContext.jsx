import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDocumentToFillOut } from "../Hooks/requests/useDocumentToFillOut.js";
import { useSubmitSignedDocument } from "../Hooks/requests/useSubmitSignedDocument.js";

const FillOutContext = createContext(null);

function orderPages (pages, nextId = null) {
	if (!pages) return null;
	if (pages.length === 0) return [];
	if (!nextId) {
		const firstPage = pages.find(page => page.isFirst);
		return [firstPage, ...orderPages(pages.filter(page => !page.isFirst), firstPage.nextPage)];
	}
	const nextPage = pages.find(page => page.id === nextId);
	return [nextPage, ...orderPages(pages.filter(page => page.id !== nextId), nextPage.nextPage)];
}

export function FillOutProvider ({ children }) {
	const { documentId } = useParams();

	const {
		isLoading,
		error,
		getDocumentToFillOut,
	} = useDocumentToFillOut();

	const pagesRef = useRef({});

	const {
		isLoading: isSubmitting,
		error: submitError,
		isSuccess: isSubmitSuccess,
		submitDocument,
	} = useSubmitSignedDocument(documentId);

	const [fillOutDocument, setFillOutDocument] = useState(null);
	const isSuccess = !!fillOutDocument;
	const pages = orderPages(fillOutDocument?.pages);
	const title = fillOutDocument?.title;

	useEffect(() => {
		getDocumentToFillOut(documentId)
			.then(setFillOutDocument)
			.catch(console.error);
	}, [documentId]);

	const value = {
		documentId,
		fillOutDocument,
		pages,
		title,
		isLoading,
		error,
		isSuccess,
		pagesRef,
		isSubmitting,
		submitError,
		isSubmitSuccess,
		submitDocument
	};

	return <FillOutContext.Provider value={value}>
		{children}
	</FillOutContext.Provider>;
}

export function useFillOut () {
	const context = useContext(FillOutContext);
	if (!context) throw new Error("useFillOut must be used within a FillOutProvider");
	return context;
}