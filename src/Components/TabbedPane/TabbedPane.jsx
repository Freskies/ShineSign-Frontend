import styles from "./TabbedPane.module.css";
import { TabProvider, useTab } from "./TabContext.jsx";

export function TabList ({ children, className = "" }) {
	const { tabListContent } = useTab();
	return <ul className={className}>{tabListContent}</ul>;
}

export function Tab ({ children, id = null, className = "" }) {
	const { onTabClick, isActiveTab } = useTab();
	return <li
		id={id}
		className={`${isActiveTab(id) ? "activeTab" : ""} ${className} ${id ? "clickableTab" : ""}`}
		onClick={() => id && onTabClick(id)}
	>
		{children}
	</li>;
}

export function TabPanelList ({ children }) {
	return null;
}

export function TabPanel ({ children, tabId, className = "" }) {
	return <article className={className}>{children}</article>;
}

function TabbedPaneContent ({ className }) {
	const { tabList } = useTab();
	const { currentPanel } = useTab();

	return <section className={`${styles.tabbedPane} ${className}`}>
		<header>
			<nav className={styles.tabs}>
				{tabList}
			</nav>
		</header>
		<main className={styles.mainContent}>
			{currentPanel}
		</main>
	</section>;
}


export default function TabbedPane ({ children, className = "" }) {
	return <TabProvider content={children}>
		<TabbedPaneContent className={className}/>
	</TabProvider>;
};