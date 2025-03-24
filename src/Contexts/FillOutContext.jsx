import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDocumentToFillOut } from "../Hooks/requests/useDocumentToFillOut.js";

const FillOutContext = createContext(null);

export function FillOutProvider ({ children }) {
	const { documentId } = useParams();

	const {
		isLoading,
		error,
		getDocumentToFillOut,
	} = useDocumentToFillOut();

	const [fillOutDocument, setFillOutDocument] = useState(null);
	const isSuccess = !!fillOutDocument;
	const pages = fillOutDocument?.pages;
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