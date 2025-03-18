import styles from "./Page.module.css";
import { getDocument } from "../../EditorConfig/editorHelper.js";
import { useDocument } from "../../Contexts/DocumentContext.jsx";

export default function Page () {
	const { pageRef } = useDocument();
	return <iframe className={styles.page} srcDoc={getDocument()} ref={pageRef}/>;
};