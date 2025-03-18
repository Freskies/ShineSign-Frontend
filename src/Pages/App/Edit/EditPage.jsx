import styles from "./EditPage.module.css";
import SplitPane from "../../../Components/SplitPane/SplitPane.jsx";
import Editor from "../../../Components/TextEditor/Editor.jsx";
import DocumentPane from "../../../Components/DocumentPane/DocumentPane.jsx";
import Page from "../../../Components/EditorResults/Page.jsx";

export default function EditPage () {
	return <main className={styles.editorPage}>
		<SplitPane
			leftPane={<Editor/>}
			rightPane={<DocumentPane><Page/></DocumentPane>}
		/>
	</main>;
};