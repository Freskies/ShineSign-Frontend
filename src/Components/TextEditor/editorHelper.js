import * as monaco from "monaco-editor";
import { emmetCSS, emmetHTML } from "emmet-monaco-es";

export function handleEditorMount () {
	emmetHTML(window.monaco);
	emmetCSS(window.monaco);
}

export function configureMonaco () {
	monaco.languages.html.htmlDefaults.setOptions({
		customData: {
			tags: [
				{
					name: "field",
					description: "ShineSign tag: add a field that can be filled in by the user",
					attributes: [],
				}
			]
		}
	})
}