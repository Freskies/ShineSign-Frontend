import { modifyDocumentUrl } from "../../Config/fetchConfig.js";
import { useState } from "react";

export function useSaveDocument (token) {
	const [isLoading, setIsLoading] = useState(false);

	async function saveDocument (document) {
		setIsLoading(true);

		try {
			const response = await fetch(modifyDocumentUrl(document.id), {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify(document),
			});

			if (!response.ok) throw new Error("Failed to save document");
			return response.json();
		} finally {
			setIsLoading(false);
		}
	}

	return { saveDocument, isLoading };
}