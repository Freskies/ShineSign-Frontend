import { DocumentProvider } from "../../Contexts/DocumentContext.jsx";
import EditPage from "./Edit/EditPage.jsx";

export default function EditorLayout () {
	return <DocumentProvider>
		<EditPage/>
	</DocumentProvider>;
};