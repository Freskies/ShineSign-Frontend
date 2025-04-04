import { createContext, useContext, useEffect, useState } from "react";
import { TabList, TabPanel, TabPanelList } from "./TabbedPane.jsx";
import { flatTabs } from "./tabbedPaneHelper.js";

const TabContext = createContext(null);

export function TabProvider ({ content, children }) {
	const [activeTab, setActiveTab] = useState(null);

	const tabList = content.find(child => child.type === TabList);
	const tabs = flatTabs(tabList);
	const tabListContent = tabList.props.children;
	const tabPanelList = content.find(child => child.type === TabPanelList);
	const tabPanels = tabPanelList.props.children.filter(child => child.type === TabPanel);
	const currentPanel = tabPanels.find(child => child.props.tabId === activeTab);

	useEffect(() => {
		handleTabClick(tabs?.[0]?.props?.id);
	}, []);

	function handleTabClick (id) {
		setActiveTab(id);
	}

	function isActiveTab (id) {
		return activeTab === id;
	}

	const value = {
		activeTab,
		onTabClick: handleTabClick,
		isActiveTab,
		tabList,
		tabListContent,
		tabs,
		currentPanel,
	};

	return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

export function useTab () {
	const context = useContext(TabContext);
	if (!context) throw new Error("useTab must be used within a TabProvider");
	return context;
}