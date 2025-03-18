import styles from "./TabbedPane.module.css";
import { TabProvider, useTab } from "./TabContext.jsx";

export function TabList ({ children, className = "" }) {
	const { tabs } = useTab();
	return <ul className={className}>{tabs}</ul>;
}

export function Tab ({ children, id, className = "" }) {
	const { onTabClick } = useTab();
	return <li id={id} className={className} onClick={() => onTabClick(id)}>{children}</li>;
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
			<nav>
				{tabList}
			</nav>
		</header>
		<main>
			{currentPanel}
		</main>
	</section>;
}


export default function TabbedPane ({ children, className = "" }) {
	return <TabProvider content={children}>
		<TabbedPaneContent className={className}/>
	</TabProvider>;
};