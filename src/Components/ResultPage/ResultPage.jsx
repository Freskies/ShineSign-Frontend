import styles from "./ResultPage.module.css";
import { useSSPContext } from "../../Contexts/SSPContext.jsx";

export default function ResultPage ({ pageBody, pageStyle, className }) {
	const { parsePage } = useSSPContext();

	return <article
		className={`${styles.page} ${className}`}
	>
		{parsePage(pageBody, pageStyle)}
	</article>;
};