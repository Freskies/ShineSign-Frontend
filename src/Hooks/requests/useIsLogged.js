import { useEffect, useState } from "react";
import { getIsValidTokenUrl } from "../../Config/fetchConfig.js";

export function useIsLogged (username, token) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		async function isLoggedFetch (signal) {
			setIsLoading(true);
			setIsLogged(false);
			try {
				const res = await fetch(getIsValidTokenUrl(username),
					{
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`,
						},
						signal,
					});
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
				if (await res.json()) setIsLogged(true);
			} catch (err) {
				if (err.name === "AbortError") return;
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}

		const controller = new AbortController();
		isLoggedFetch(controller.signal).then(() => null);
		return () => controller.abort();
	}, [token, username]);

	return { isLoading, error, isLogged };
}