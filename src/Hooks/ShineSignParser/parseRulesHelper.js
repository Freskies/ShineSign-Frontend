export function getStylesObjects (styles) {
	const stylesObj = {};
	styles.forEach(style => (stylesObj[style.name] = parseRules(style.rules)));
	return stylesObj;
}

function parseRules (rules) {
	const rulesObj = {};
	rules.forEach(rule => (rulesObj[rule.property] = rule.value));
	return rulesObj;
}

export function getRulesByTagList (tags, allRules) {
	return tags.reduce(
		(acc, tag) => ({ ...acc, ...allRules[tag] }),
		{}
	)
}