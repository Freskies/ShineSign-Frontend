import { useState } from "react";
import { REGISTER_URL } from "../Config/fetchConfig.js";

export function useRegister () {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	async function registerUser (user) {
		setIsLoading(true);
		try {
			const res = await fetch(REGISTER_URL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user),
				});
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			setIsSuccess(true);
			setError(false);
		} catch (err) {
			setIsSuccess(false);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	return { isLoading, error, isSuccess, registerUser };
}