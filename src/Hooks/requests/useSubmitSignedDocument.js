import { useState } from "react";
import { fillOutSubmitUrl } from "../../Config/fetchConfig.js";

export function useSubmitSignedDocument (documentId) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	async function submitDocument (email) {
		setIsLoading(true);
		setError(null);
		setIsSuccess(false);

		try {
			const response = await fetch(fillOutSubmitUrl(documentId), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});
			if (!response.ok) throw new Error("Failed to submit document");
			setIsSuccess(true);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}

	return { isLoading, error, isSuccess, submitDocument };
}