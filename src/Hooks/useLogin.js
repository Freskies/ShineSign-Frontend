import { useLocalStorage } from "./useLocalStorage.js";
import { useEffect } from "react";

export function useLogin () {
	const [token, setToken] = useLocalStorage("ShineSignToken");

	useEffect(() => {
		fetch()
	}, []);
}