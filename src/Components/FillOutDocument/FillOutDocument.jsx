import styles from "./FillOutDocument.module.css";
import { useFillOut } from "../../Contexts/FillOutContext.jsx";
import FillOutDocumentPage from "./FillOutDocumentPage.jsx"

export default function FillOutDocument () {
	const { pages } = useFillOut();
	return <ol className={styles.pageList}>
		{pages.map(page => <FillOutDocumentPage page={page} key={page.id}/>)}
	</ol>;
};