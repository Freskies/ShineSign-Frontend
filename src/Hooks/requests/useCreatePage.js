import { useState } from "react";
import { createPageUrl } from "../../Config/fetchConfig.js";

export function useCreatePage (token) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function createPage (documentId) {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(createPageUrl(documentId), {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) throw new Error("Failed to create page");
			return await response.json();
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}

	return { isLoading, error, createPage };
}