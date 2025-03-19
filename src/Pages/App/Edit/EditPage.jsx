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

export default function EditPage () {
	const { currentPage, handleChangeBody, handleChangeStyle } = useDocument();
	const currentPageBody = currentPage?.body;
	const currentPageStyle = currentPage?.style;

	return <main className={styles.editorPage}>
		<SplitPane>
			<LeftPanel>
				<TabbedPane>
					<TabList className={tabbedPaneComponentStyles.tabs}>
						<Tab id="tab_body">Body</Tab>
						<Tab id="tab_style">Style</Tab>
						<div className={tabbedPaneComponentStyles.nonPageTabs}>
							<Tab><DocumentPageController/></Tab>
							<div style={{ display: "flex" }}>
								<Tab><p>Save</p></Tab>
								<Tab><p>Exit</p></Tab>
							</div>
							<Tab><p>Settings</p></Tab>
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
		</SplitPane>
	</main>;
};