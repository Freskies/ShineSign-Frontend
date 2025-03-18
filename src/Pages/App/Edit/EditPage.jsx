import styles from "./EditPage.module.css";
import SplitPane, { LeftPanel, RightPanel } from "../../../Components/SplitPane/SplitPane.jsx";
import Editor from "../../../Components/TextEditor/Editor.jsx";
import DocumentPane from "../../../Components/DocumentPane/DocumentPane.jsx";
import Page from "../../../Components/EditorResults/Page.jsx";
import TabbedPane, { Tab, TabList, TabPanel, TabPanelList } from "../../../Components/TabbedPane/TabbedPane.jsx";

export default function EditPage () {
	return <main className={styles.editorPage}>
		<SplitPane>
			<LeftPanel>
				<TabbedPane>
					<TabList>
						<Tab id="tab_body">Body</Tab>
						<Tab id="tab_style">Style</Tab>
					</TabList>
					<TabPanelList>
						<TabPanel tabId="tab_body"><Editor/></TabPanel>
						<TabPanel tabId="tab_style">Style</TabPanel>
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