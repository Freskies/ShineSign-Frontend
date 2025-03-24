import styles from "./EditPage.module.css";
import tabbedPaneComponentStyles from "./TabbedPaneComponent.module.css";
import SplitPane, { LeftPanel, RightPanel } from "../../../Components/SplitPane/SplitPane.jsx";
import DocumentPane from "../../../Components/DocumentPane/DocumentPane.jsx";
import Page from "../../../Components/EditorResults/Page.jsx";
import TabbedPane, { Tab, TabList, TabPanel, TabPanelList } from "../../../Components/TabbedPane/TabbedPane.jsx";
import { useDocument } from "../../../Contexts/DocumentContext.jsx";
import EditorHtml from "../../../Components/TextEditor/EditorHTML.jsx";
import EditorCSS from "../../../Components/TextEditor/EditorCSS.jsx";
import DocumentPageController from "../../../Components/DocumentPageController/DocumentPageController.jsx";
import DocumentController from "../../../Components/DocumentController/DocumentController.jsx";
import { useEffect, useState } from "react";

function isFullscreen () {
	return window.innerWidth < 800;
}

export default function EditPage () {
	const [fullScreen, setFullScreen] = useState(isFullscreen);

	useEffect(() => {
		const handleResize = () => setFullScreen(isFullscreen());
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return <main className={styles.editorPage}>
		{fullScreen ? <FullscreenView/> : <SplitView/>}
	</main>;
};

function SplitView () {
	const { currentPage, handleChangeBody, handleChangeStyle } = useDocument();
	const currentPageBody = currentPage?.body;
	const currentPageStyle = currentPage?.style;

	return <SplitPane>
		<LeftPanel>
			<TabbedPane>
				<TabList className={tabbedPaneComponentStyles.tabs}>
					<Tab id="tab_body">Body</Tab>
					<Tab id="tab_style">Style</Tab>
					<div className={tabbedPaneComponentStyles.nonPageTabs}>
						<Tab><DocumentPageController/></Tab>
						<Tab><DocumentController/></Tab>
					</div>
				</TabList>
				<TabPanelList>
					<TabPanel className={tabbedPaneComponentStyles.tabPanel} tabId="tab_body">
						<EditorHtml key={"html"} value={currentPageBody} onChange={handleChangeBody}/>
					</TabPanel>
					<TabPanel className={tabbedPaneComponentStyles.tabPanel} tabId="tab_style">
						<EditorCSS key={"css"} value={currentPageStyle} onChange={handleChangeStyle}/>
					</TabPanel>
				</TabPanelList>
			</TabbedPane>
		</LeftPanel>
		<RightPanel>
			<DocumentPane>
				<Page/>
			</DocumentPane>
		</RightPanel>
	</SplitPane>;
}

function FullscreenView () {
	const { currentPage, handleChangeBody, handleChangeStyle } = useDocument();
	const currentPageBody = currentPage?.body;
	const currentPageStyle = currentPage?.style;

	return <TabbedPane>
		<TabList className={tabbedPaneComponentStyles.tabs}>
			<Tab id="tab_body">Body</Tab>
			<Tab id="tab_style">Style</Tab>
			<Tab id="tab_view" className={tabbedPaneComponentStyles.tabView}>View</Tab>
			<div className={tabbedPaneComponentStyles.nonPageTabs}>
				<Tab><DocumentPageController/></Tab>
				<Tab><DocumentController/></Tab>
			</div>
		</TabList>
		<TabPanelList>
			<TabPanel className={tabbedPaneComponentStyles.tabPanel} tabId="tab_body">
				<EditorHtml key={"html"} value={currentPageBody} onChange={handleChangeBody}/>
			</TabPanel>
			<TabPanel className={tabbedPaneComponentStyles.tabPanel} tabId="tab_style">
				<EditorCSS key={"css"} value={currentPageStyle} onChange={handleChangeStyle}/>
			</TabPanel>
			<TabPanel className={tabbedPaneComponentStyles.tabPanel} tabId="tab_view">
				<DocumentPane>
					<Page/>
				</DocumentPane>
			</TabPanel>
		</TabPanelList>
	</TabbedPane>;
}