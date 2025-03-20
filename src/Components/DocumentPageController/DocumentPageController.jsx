import styles from "./DocumentPageController.module.css";
import { useDocument } from "../../Contexts/DocumentContext.jsx";

export default function DocumentPageController () {
	const {
		currentPageNumber,
		hasNextPage,
		hasPreviousPage,
		handleNextPage: onNextPage,
		handlePreviousPage: onPreviousPage,
		addNewPage,
		handleDeletePage: onDelete,
	} = useDocument();

	return <div className={styles.container}>
		{/* PAGE NAVIGATION */}
		<div className={styles.controller}>
			<button
				title="Previous Page"
				onClick={onPreviousPage}
				className={styles.controlButton}
				disabled={!hasPreviousPage()}
			>
				<ArrowLeft/>
			</button>
			<p className={styles.pageNumber}>{currentPageNumber}</p>
			{
				hasNextPage()
					? <button title="Next Page" onClick={onNextPage} className={styles.controlButton}><ArrowRight/></button>
					: <button title="New Page" onClick={addNewPage} className={styles.controlButton}><AddIcon/></button>
			}
		</div>
		{/* DELETE PAGE */}
		<button title="Delete Page" onClick={onDelete} className={styles.deleteContainer}><DeleteIcon/></button>
	</div>;
};

function ArrowLeft () {
	return <svg
		className={styles.arrow}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
		style={{ transform: "translateX(2px)" }}
	>
		<path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
	</svg>;
}

function ArrowRight () {
	return <svg
		className={styles.arrow}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
	</svg>;
}

function AddIcon () {
	return <svg
		className={styles.add}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
	</svg>;
}

function DeleteIcon () {
	return <svg
		className={styles.delete}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path
			d={"m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 " +
				"104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h" +
				"-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"}
		/>
	</svg>;
}