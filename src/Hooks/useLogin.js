import { useLocalStorage } from "./useLocalStorage.js";
import { useState } from "react";
import { LOGIN_URL } from "../Config/fetchConfig.js";
import { TOKEN_KEY, USER_KEY } from "../Config/localStorageConfig.js";

export function useLogin () {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	// TODO use cookies instead of local storage
	const [, setUsername] = useLocalStorage(USER_KEY);
	const [, setToken] = useLocalStorage(TOKEN_KEY);

	async function login (user) {
		setIsLoading(true);
		try {
			const res = await fetch(LOGIN_URL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user),
				});
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			setToken(data.token);
			setUsername(user);
			setIsSuccess(true);
			setError(false);
		} catch (err) {
			setIsSuccess(false);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	return { isLoading, error, isSuccess, login };
}