import FiberNode from "./FiberTree.js";

export function useParser (elements, styles) {
	const fiberTree = FiberNode.generateFiberTree(elements, styles);
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