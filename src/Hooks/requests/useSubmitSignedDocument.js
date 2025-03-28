import { useState } from "react";
import { fillOutSubmitUrl } from "../../Config/fetchConfig.js";

const formData = new FormData();

export function useSubmitSignedDocument (documentId, email) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	async function submitDocument (pdf) {
		formData.append("pdf", pdf);

		setIsLoading(true);
		setError(null);
		setIsSuccess(false);

		try {
			const response = await fetch(fillOutSubmitUrl(documentId, email), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: formData,
			});
			if (!response.ok) throw new Error("Failed to submit document");
			setIsSuccess(true);
		} catch (error) {
			setError(error);
		} finally {
			formData.delete("pdf");
			setIsLoading(false);
		}
	}

	return { isLoading, error, isSuccess, submitDocument };
}