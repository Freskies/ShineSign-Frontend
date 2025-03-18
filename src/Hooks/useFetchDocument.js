import { useState } from "react";
import { getDocumentUrl } from "../Config/fetchConfig.js";
import { useUser } from "../Contexts/UserContext.jsx";

export function useFetchDocument (documentId) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { token } = useUser();

	async function fetchDocument () {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(getDocumentUrl(documentId), {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
				},
			});
			if (!response.ok) throw new Error("Failed to fetch document");
			return await response.json();
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}

	return { isLoading, error, fetchDocument };
}