import styles from "./Dashboard.module.css";
import { useDocuments } from "../../../Hooks/requests/useDocuments.js";
import { useUser } from "../../../Contexts/UserContext.jsx";
import { useCreateDocument } from "../../../Hooks/requests/useCreateDocument.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner.jsx";
import { IconAdd, IconLogout } from "./DashboardIcons.jsx";
import Modal from "../../../Components/Modal/Modal.jsx";
import { useState } from "react";
import SsDocumentList from "../../../Components/SSDocuments/SSDocumentList.jsx";

export default function Dashboard () {
	const navigate = useNavigate();
	const { token, logout } = useUser();

	const [newDocumentTitle, setNewDocumentTitle] = useState("");

	const {
		isLoading: isLoadingDocuments,
		error: errorDocuments,
		ssDocuments,
	} = useDocuments(token);

	const {
		isLoading: isLoadingCreateDocument,
		error: errorCreateDocument,
		createDocument,
	} = useCreateDocument(token);

	const [isOpenModal, setIsOpenModal] = useState(false);

	function openModal () {
		setIsOpenModal(true);
	}

	function handleClose () {
		setIsOpenModal(false);
	}

	const groupedDocuments = ssDocuments ?
		Object.groupBy(ssDocuments, ({ isPublic }) => isPublic ? "public" : "private")
		: null;
	const publicDocuments = groupedDocuments?.public ?? [];
	const privateDocuments = groupedDocuments?.private ?? [];

	async function handleCreateDocument () {
		const createdDocument = await createDocument(newDocumentTitle);
		navigate(createdDocument.id, { replace: true });
	}

	function handleDocumentClick (documentId) {
		navigate(documentId, { replace: true });
	}

	function handleLogout () {
		logout();
		navigate("/home", { replace: true });
	}

	return <div className={styles.dashboard}>
		<aside className={styles.sideActions}>
			{/*<Link to={"/me"} className={styles.account}>fdf</Link>*/}
			<button className={styles.logout} onClick={handleLogout} title="logout">
				<IconLogout/>
			</button>
		</aside>
		<div>
			<header className={styles.header}>
				<h1 className={styles.title}>My Documents</h1>
				<button className={styles.add} onClick={openModal} title="create new document">
					<IconAdd/>
				</button>
			</header>
			<main className={styles.main}>
				{isLoadingDocuments
					? <Spinner fullscreen={true}/>
					: <>
						<section className={styles.documentSection}>
							<fieldset className={styles.fieldset}>
								<legend><h2 className={styles.sectionTitle}>Public Documents</h2></legend>
								<SsDocumentList documentList={publicDocuments} onClick={handleDocumentClick}/>
								{/*{publicDocuments.length === 0 && <p>No public documents</p>}*/}
							</fieldset>
						</section>
						<section className={styles.documentSection}>
							<fieldset className={styles.fieldset}>
								<legend><h2 className={styles.sectionTitle}>Private Documents</h2></legend>
								<SsDocumentList documentList={privateDocuments} onClick={handleDocumentClick}/>
								{/*{privateDocuments.length === 0 && <p>No private documents</p>}*/}
							</fieldset>
						</section>
					</>
				}
			</main>
		</div>
		<Modal isOpen={isOpenModal} onClose={handleClose}>
			<h2>Modal</h2>
			<input type="text" value={newDocumentTitle} onChange={e => setNewDocumentTitle(e.target.value)}/>
			<button onClick={handleCreateDocument}>CREATE</button>
		</Modal>
	</div>;
};