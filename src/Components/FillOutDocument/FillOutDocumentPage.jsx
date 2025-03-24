import styles from "./FillOutDocumentPage.module.css";
import "./../../Config/pageStyle.css";
import "./../../Config/fillOutStyle.css";
import { useParser } from "../../Hooks/ShineSignParser/useParser.jsx";

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
	const a = useParser(page.body, page.style);

	return <li className={styles.page}>
		{page.body}
	</li>;
};