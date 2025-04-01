import Text from "./SS-Elements/Text/Text.jsx";
import React from "react";
import Root from "./SS-Elements/Root/Root.jsx";
import Paragraph from "./SS-Elements/Paragraph/Paragraph.jsx";
import Field from "./SS-Elements/Field/Field.jsx";
import SignBox from "./SS-Elements/Signbox/SignBox.jsx";

// loop the fiber tree and return the corresponding JSX for each node
export function fromFiberTree (fiberNode) {
	if (!fiberNode) return null;
	const { type, child, sibling, styles } = fiberNode;
	const element = getElementByType(type);
	if (!element) return child;
	const children = child ? React.createElement(element, { style: styles }, fromFiberTree(child)) : null;
	const siblings = sibling ? fromFiberTree(sibling) : null;
	return React.createElement(React.Fragment, null, children, siblings);
}

function getElementByType (type) {
	switch (type) {
		case "<root/>":
			return Root;
		case "<text/>":
			return Text;
		case "<paragraph/>":
			return Paragraph;
		case "<field/>":
			return Field;
		case "<signbox/>":
			return SignBox;
		case "text":
			return null;
		default:
			throw new Error("Invalid type");
	}
}