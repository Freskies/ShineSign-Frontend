import { useState } from "react";
import { CREATE_DOCUMENT_URL } from "../Config/fetchConfig.js";

export function useCreateDocument (token) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function createDocument (title) {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(CREATE_DOCUMENT_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({ title }),
			});
			if (!response.ok) throw new Error("Failed to create document");
			return await response.json();
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}

	return { isLoading, error, createDocument };
}