import minifiedStylePDF from "./minifiedStylePDF.js";

export function getDocument (content = "", style = "") {
	return `<html>
			<head><style>${minifiedStylePDF}${style}</style></head>
			<body><div class="document">${parseContent(content)}</div></body>
		</html>`;
}

// <field/> / <field /> -> <span class="ss_field">...</span>
String.prototype.replaceField = function () {
	return this.replace(
		/<field(?:\s+[^>]*)?\/>/g,
		"<span class=\"ss_field\">...</span>",
	);
};

// <signbox/> / <signbox /> -> <fieldset class="ss_signBox"></fieldset>
// <signbox fixed/> / <signbox fixed /> -> <fieldset class="ss_signBox ss_signBox_fixed"></fieldset>
String.prototype.replaceSignBox = function () {
	function replaceSignBox (element) {
		return `<fieldset class="ss_signBox${element.includes("fixed") ? " ss_signBox_fixed" : ""}"></fieldset>`;
	}

	const elements = this.match(/<signbox(?:\s+[^>]*)?\/>/g) || [];
	return elements.reduce((acc, cur) => acc.replace(cur, replaceSignBox(cur)), this);
};

function parseContent (content) {
	return content
		.replaceField()
		.replaceSignBox();
}