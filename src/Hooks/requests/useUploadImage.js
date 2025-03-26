import { useState } from "react";
import { uploadImageUrl } from "../../Config/fetchConfig.js";

export function useUploadImage (token) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function uploadImage (documentId, formData) {
		console.log(formData.get("file"));
		console.log(uploadImageUrl(documentId));
		setIsLoading(true);
		try {
			const response = await fetch(uploadImageUrl(documentId), {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
				},
				body: formData,
			});
			if (!response.ok) throw new Error("Failed to upload image");
			return await response.json();
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false);
		}
	}

	return { uploadImage, isLoading, error };
}