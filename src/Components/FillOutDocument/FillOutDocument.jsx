import styles from "./FillOutDocument.module.css";
import { useFillOut } from "../../Contexts/FillOutContext.jsx";
import ResultPage from "../ResultPage/ResultPage.jsx";

export default function FillOutDocument () {
	const { pages } = useFillOut();
	return <ol className={styles.pageList}>
		{pages.map(page => <li key={page.id}><ResultPage page={page}/></li>)}
	</ol>;
};