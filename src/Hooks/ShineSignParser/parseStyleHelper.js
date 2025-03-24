export function parseStyles (styles) {
	if (!styles) return [];
	return minifyStyle(styles).split("}").map(parseStyle).slice(0, -1);
}

function parseStyle (style) {
	const [name, rules] = style.split("{");
	return {
		name,
		rules: rules?.split(";").map(parseRule).slice(0, -1)
	}
}

function parseRule (rule) {
	const [property, value] = rule.split(":");
	return { property, value };
}

function minifyStyle (style) {
	return style.replace(/\s/g, "");
}