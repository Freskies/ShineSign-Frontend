import { useState } from "react";
import XMLParser from "react-xml-parser";
import { parseStyles } from "./parseStyleHelper.js";
import { xmlToFiberProperties } from "./xmlToFiberHelper.js";
import FiberNode from "./FiberTree.js";
import { getRulesByTagList, getStylesObjects } from "./parseRulesHelper.js";

function generateFiberTree (elements, styles) {
	// XML
	const xml = new XMLParser().parseFromString(`<root>${elements}</root>`);
	const fiberPropertiesXML = xmlToFiberProperties(xml);
	// Styles
	const styleList = parseStyles(styles);
	const stylesObj = getStylesObjects(styleList);

	console.log(xml);
	console.log(fiberPropertiesXML, stylesObj);

	return FiberNode.nodeFromArray(
		fiberPropertiesXML.children,
		tags => getRulesByTagList(tags, stylesObj),
	);
}

export function useParser (elements, styles) {
	const [fiberTree] = useState(() => generateFiberTree(elements, styles));
	console.log(fiberTree);
	return fiberTree;
}

function convertElement (shineSignElement) {
	switch (shineSignElement) {
		case "text":
			return parseText();
		default:
			throw new Error("Invalid shineSignElement");
	}
}

function parseText (shineSignText) {

}