import { emmetCSS, emmetHTML } from "emmet-monaco-es";

export function handleEditorMount () {
	emmetHTML(window.monaco);
	emmetCSS(window.monaco);
}

// TODO find a way to make this work :)
export function configureMonaco () {
	window.monaco.languages.registerCompletionItemProvider("html", (
		{
			provideCompletionItems: (model, position, context, token) => ({
				suggestions: [{
					label: "field",
					kind: window.monaco.languages.CompletionItemKind.Keyword,
					insertText: "<field/>",
					documentation: "ShineSign tag: add a field that can be filled in by the user",
					range: new window.monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
				}],
			}),
		}
	));
}