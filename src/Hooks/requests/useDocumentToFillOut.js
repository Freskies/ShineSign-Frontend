import { useState } from "react";
import { fillOutUrl } from "../../Config/fetchConfig.js";

export function useDocumentToFillOut () {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function getDocumentToFillOut (documentId) {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(fillOutUrl(documentId));
			if (!response.ok) throw new Error(response.statusText);
			return await response.json();
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}

	return { isLoading, error, getDocumentToFillOut };
}