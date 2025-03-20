import styles from "./Dashboard.module.css";
import { useDocuments } from "../../../Hooks/requests/useDocuments.js";
import { useUser } from "../../../Contexts/UserContext.jsx";
import { useCreateDocument } from "../../../Hooks/requests/useCreateDocument.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard () {
	const navigate = useNavigate();
	const { token } = useUser();
	const {
		isLoading: isLoadingDocuments,
		error: errorDocuments,
		documents,
	} = useDocuments(token);
	const {
		isLoading: isLoadingCreateDocument,
		error: errorCreateDocument,
		createDocument,
	} = useCreateDocument(token);

	async function handleCreateDocument () {
		const createdDocument = await createDocument("ciola");
		navigate(createdDocument.id, { replace: true });
	}

	function handleDocumentClick (documentId) {
		navigate(documentId, { replace: true });
	}

	return <main>
		Dashboard
		{isLoadingDocuments && <p>Loading documents...</p>}
		{errorDocuments && <p>{errorDocuments.message}</p>}
		{documents && <ul>
			{documents.map(
				({ id, title }) => <li onClick={() => handleDocumentClick(id)} key={id}>{title}</li>)
			}
		</ul>}
		<button onClick={handleCreateDocument}>ADD DOCUMENT</button>
	</main>;
};