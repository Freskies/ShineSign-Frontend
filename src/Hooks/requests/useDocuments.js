import { useEffect, useState } from "react";
import { ALL_DOCUMENTS_URL } from "../../Config/fetchConfig.js";

export function useDocuments (token) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		async function fetchDocuments (signal) {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(ALL_DOCUMENTS_URL, {
					signal,
					headers: {
						"Authorization": `Bearer ${token}`,
					},
				});
				const data = await response.json();
				if (!response.ok) throw new Error(data.message || "Failed to fetch documents.");
				setDocuments(data.documents);
			} catch (error) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		const controller = new AbortController();
		fetchDocuments(controller.signal).then(() => null);
		return () => controller.abort();
	}, [token]);

	return { isLoading, error, documents };
}