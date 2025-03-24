import styles from "./FillOutDocumentPage.module.css";

export default function FillOutDocumentPage ({ page }) {
	return <li className={styles.page}>
		{page.id}
	</li>;
};