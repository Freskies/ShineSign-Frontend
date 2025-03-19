import { emmetCSS, emmetHTML } from "emmet-monaco-es";

export function handleEditorMount () {
	emmetHTML(window.monaco);
	emmetCSS(window.monaco);
}