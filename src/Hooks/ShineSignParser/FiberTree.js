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

	static nodeFromArray (arr, getStyles) {
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