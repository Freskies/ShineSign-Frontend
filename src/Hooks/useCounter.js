import { useState } from "react";

export function useCounter (initialCount = 0, step = 1) {
	const [count, setCount] = useState(initialCount);

	function increment () {
		return setCount(prevCount => prevCount + step);
	}

	function decrement () {
		return setCount(prevCount => prevCount - step);
	}

	return { count, increment, decrement };
}