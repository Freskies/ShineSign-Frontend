import { useEffect, useState } from "react";

export function useLocalStorage (key, initialValue = null) {
	const [data, setData] = useState(() => JSON.parse(localStorage.getItem(key)) || initialValue);

	function saveOnLocalStorage () {
		localStorage.setItem(key, JSON.stringify(data));
	}

	useEffect(saveOnLocalStorage, [data, key]);

	return [data, setData];
}