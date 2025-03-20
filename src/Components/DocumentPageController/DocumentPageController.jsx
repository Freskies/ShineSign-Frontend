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
	} = useDocument();

	return <div className={styles.controller}>
		<button
			onClick={onPreviousPage}
			className={styles.controlButton}
			disabled={!hasPreviousPage()}
		>
			<ArrowLeft/>
		</button>
		<p>{currentPageNumber}</p>
		{
			hasNextPage()
				? <button onClick={onNextPage} className={styles.controlButton}><ArrowRight/></button>
				: <button onClick={addNewPage} className={styles.controlButton}><AddIcon/></button>
		}
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