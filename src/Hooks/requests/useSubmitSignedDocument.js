import { useState } from "react";
import { fillOutSubmitUrl } from "../../Config/fetchConfig.js";

export function useSubmitSignedDocument (documentId, email) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	async function submitDocument (pdf) {
		setIsLoading(true);
		setError(null);
		setIsSuccess(false);

		const formData = new FormData();
		//formData.append("email", email);
		formData.append("pdf", pdf);

		try {
			const response = await fetch(fillOutSubmitUrl(documentId), {
				method: "POST",
				// headers: {
				// 	"Content-Type": "multipart/form-data",
				// },
				body: formData,
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