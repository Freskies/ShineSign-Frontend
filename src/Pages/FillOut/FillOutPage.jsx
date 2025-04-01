import styles from "./FillOutPage.module.css";
import DocumentPane from "../../Components/DocumentPane/DocumentPane.jsx";
import { useFillOut } from "../../Contexts/FillOutContext.jsx";
import FillOutDocument from "../../Components/FillOutDocument/FillOutDocument.jsx";
import Spinner from "../../Components/Spinner/Spinner.jsx";
import { generatePDF } from "../../Config/fillOutHelper.js";

export default function FillOutPage () {
	const {
		isLoading, error, isSuccess,
		pagesRef,
		isSubmitting, submitError, isSubmitSuccess, submitDocument
	} = useFillOut();

	function handleSubmit () {
		generatePDF(pagesRef).then((pdf) => {
			console.log(pdf);
			submitDocument("test@example.com")
		});
	}

	return <main className={styles.fillOutContainer}>
		<DocumentPane scroll={true}>
			{isLoading && <Spinner fullscreen={true}/>}
			{error && <p>An error occurred</p>}
			{isSuccess && <FillOutDocument/>}
		</DocumentPane>
		{isSuccess &&
			<button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
		}
	</main>;
};