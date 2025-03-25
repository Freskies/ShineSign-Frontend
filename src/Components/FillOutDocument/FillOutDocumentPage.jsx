import styles from "./FillOutDocumentPage.module.css";
import { useSSPContext } from "../../ShineSignParser/SSPContext.jsx";

/*
<text style="title">TITLE</text>
<paragraph>
    <text>nome:</text><field/>
    <text>cognome:</text><field/>
</paragraph>

title {
    font-size: 3.2rem;
    text-align: center;
}
* */

export default function FillOutDocumentPage ({ page }) {
	const { parsePage } = useSSPContext();

	return <li className={styles.page}>
		{parsePage(page.body, page.style)}
	</li>;
};