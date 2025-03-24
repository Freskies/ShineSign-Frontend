export function xmlToFiberProperties (root) {
	return {
		type: `<${root.name}/>`,
		value: root.value,
		children: root.children.map(xmlToFiberProperties),
		tags: getStyleTags(root.attributes?.style)
	}
}

function getStyleTags (tags) {
	if (!tags) return [];
	return tags.split(" ");
}