import { Editor as MonacoEditor } from "@monaco-editor/react";
import styles from "./Editor.module.css";
import { handleEditorMount } from "./editorHelper.js";

export default function EditorHtml ({ value, onChange }) {
	return <MonacoEditor
		className={styles.editor}
		defaultLanguage="html"
		value={value}
		onChange={onChange}
		theme="light"
		options={{
			quickSuggestions: true,
			wordBasedSuggestions: "currentDocument",
			suggestOnTriggerCharacters: true,
			tabCompletion: "on",
			minimap: { enabled: false },
		}}
		onMount={handleEditorMount}
	/>;
};