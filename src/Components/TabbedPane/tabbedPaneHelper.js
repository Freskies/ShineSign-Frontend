import { Tab, TabList } from "./TabbedPane.jsx";

/**
 * Takes a TabList component and returns a flat list of tabs.
 * It's a deep search, so it will find tabs in nested html structures.
 *
 * @example
 *    <TabList>
 *       <Tab>Tab 1</Tab>
 *       <div>
 *          <Tab>Tab 2</Tab>
 *       </div>
 *    </TabList>
 *    // Returns [Tab1, Tab2]
 *
 *
 * @param tabList {TabList} The TabList component.
 * @returns {Array<Tab>} The flat list of tabs.
 */
export function flatTabs (tabList) {
	const tabs = [];

	function findTabs (children) {
		// if there is only one child, it will be an object and not an array
		const childrenList = children?.length ? children : [children];
		childrenList.forEach(child =>
			child.type === Tab
				? tabs.push(child)
				: findTabs(child?.props?.children),
		);
	}

	findTabs(tabList.props.children);

	return tabs;
}