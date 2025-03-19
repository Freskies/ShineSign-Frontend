import minifiedStylePDF from "./minifiedStylePDF.js";

export function getDocument (content = "", style = "") {
	return `<html>
			<head><style>${minifiedStylePDF}${style}</style></head>
			<body><div class="document">${content}</div></body>
		</html>`;
}