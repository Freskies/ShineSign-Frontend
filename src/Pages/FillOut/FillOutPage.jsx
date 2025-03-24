import styles from "./FillOutPage.module.css";
import DocumentPane from "../../Components/DocumentPane/DocumentPane.jsx";
import { useFillOut } from "../../Contexts/FillOutContext.jsx";
import FillOutDocument from "../../Components/FillOutDocument/FillOutDocument.jsx";
import { useParser } from "../../Hooks/ShineSignParser/useParser.jsx";

export default function FillOutPage () {
	const { isLoading, error, isSuccess } = useFillOut();

	return <main className={styles.fillOutContainer}>
		<DocumentPane scroll={true}>
			{isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{isSuccess && <FillOutDocument/>}
		</DocumentPane>
	</main>;
};