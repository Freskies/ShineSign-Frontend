import XMLParser from "react-xml-parser";

export default class FiberNode {
	type;
	child;
	sibling;
	styles;

	constructor ({ type, child = null, sibling = null, styles = {} }) {
		this.type = type;
		this.child = child;
		this.sibling = sibling;
		this.styles = styles;
	}

	static generateFiberTree (elements, styles) {
		// XML
		const xml = new XMLParser().parseFromString(`<root>${elements}</root>`);
		const fiberPropertiesXML = xmlToFiberProperties(xml);
		// Styles
		const styleList = getStyleList(styles);
		const stylesObj = getRulesObject(styleList);

		return FiberNode.#nodeFromArray(
			fiberPropertiesXML.children,
			tags => getRulesByTagList(tags, stylesObj),
		);
	}

	// FIBER TREE GENERATION

	static #nodeFromObject ({ type, tags, value, children }, getStyles) {
		const node = new FiberNode({ type });
		node.child = { type: "text", child: value };
		node.styles = getStyles(tags);
		if (!children || children.length === 0) return node;
		node.child = FiberNode.#nodeFromObject(children[0], getStyles);
		let current = node.child;
		for (const child of children.slice(1)) {
			current.sibling = FiberNode.#nodeFromObject(child, getStyles);
			current = current.sibling;
		}
		return node;
	}

	static #nodeFromArray (arr, getStyles) {
		const node = new FiberNode({ type: "root" });
		if (!arr || arr.length === 0) return node;
		node.child = FiberNode.#nodeFromObject(arr[0], getStyles);
		let current = node.child;
		for (const child of arr.slice(1)) {
			current.sibling = FiberNode.#nodeFromObject(child, getStyles);
			current = current.sibling;
		}
		return node;
	}
}

// XML HELPER

function xmlToFiberProperties (root) {
	return {
		type: `<${root.name}/>`,
		value: root.value,
		children: root.children.map(xmlToFiberProperties),
		tags: root.attributes.style?.split(" ") ?? [],
	};
}

// STYLE HELPER

function getRulesByTagList (tags, allRules) {
	return tags.reduce(
		(acc, tag) => ({ ...acc, ...allRules[tag] }),
		{}
	)
}

function getRulesObject (styleList) {
	const rulesObj = {};
	styleList.forEach(style => (rulesObj[style.name] = getRuleObject(style.rules)));
	return rulesObj;
}

function getRuleObject (ruleList) {
	const rulesObj = {};
	ruleList.forEach(rule => (rulesObj[rule.property] = rule.value));
	return rulesObj;
}

function getStyleList (styles) {
	if (!styles) return [];
	return minifyStyle(styles).split("}").map(getRuleList).slice(0, -1);
}

function getRuleList (style) {
	const [name, rules] = style.split("{");
	return {
		name,
		rules: rules?.split(";").map(getRule).slice(0, -1)
	}
}

function getRule (rule) {
	const [property, value] = rule.split(":");
	return { property, value };
}

function minifyStyle (style) {
	return style.replace(/\s/g, "");
}