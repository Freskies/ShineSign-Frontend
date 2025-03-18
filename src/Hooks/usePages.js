import { useState } from "react";

export function usePages () {
	const [currentPage, setCurrentPage] = useState(1);

	function nextPage () {
		setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
	}

	function previousPage () {
		setCurrentPage(prevCurrentPage => prevCurrentPage - 1);
	}

	return { currentPage, nextPage, previousPage };
}