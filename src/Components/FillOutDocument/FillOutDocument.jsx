import styles from "./FillOutDocument.module.css";
import { useFillOut } from "../../Contexts/FillOutContext.jsx";
import ResultPage from "../ResultPage/ResultPage.jsx";

export default function FillOutDocument () {
	const { pages, pagesRef } = useFillOut();

	return <ol className={styles.pageList}>
		{pages.map(page => <li key={page.id} ref={element => (pagesRef.current[page.id] = element)}>
			<ResultPage
				pageBody={page.body}
				pageStyle={page.style}
			/>
		</li>)}
	</ol>;
};