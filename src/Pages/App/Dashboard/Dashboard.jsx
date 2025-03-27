import styles from "./Dashboard.module.css";
import { useDocuments } from "../../../Hooks/requests/useDocuments.js";
import { useUser } from "../../../Contexts/UserContext.jsx";
import { useCreateDocument } from "../../../Hooks/requests/useCreateDocument.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner.jsx";
import { IconAdd, IconLogout } from "./DashboardIcons.jsx";
import Modal from "../../../Components/Modal/Modal.jsx";
import { useRef, useState } from "react";
import SsDocumentList from "../../../Components/SSDocuments/SSDocumentList.jsx";
import { useBinarySwitch } from "../../../Hooks/useBinarySwitch.js";

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

	const inputRef = useRef(null);
	const { isOn: isOpenModal, setOn: openModal, setOff: closeModal } = useBinarySwitch();

	function handleOpenModal () {
		openModal();
		setTimeout(() => inputRef.current.focus(), 0);
	}

	const groupedDocuments = ssDocuments ?
		Object.groupBy(ssDocuments, ({ isPublic }) => isPublic ? "public" : "private")
		: null;
	const publicDocuments = groupedDocuments?.public ?? [];
	const privateDocuments = groupedDocuments?.private ?? [];

	async function handleCreateDocument (e) {
		e.preventDefault();
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

	const isTitleValid = newDocumentTitle.length > 0;

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
				<button className={styles.add} onClick={handleOpenModal} title="create new document">
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
		<Modal isOpen={isOpenModal} onClose={closeModal}>
			<h2 className={styles.modalTitle}>Create new document</h2>
			<form onSubmit={handleCreateDocument} className={styles.formCreateDocument}>
				<input
					type="text"
					placeholder="Document title"
					value={newDocumentTitle}
					onChange={e => setNewDocumentTitle(e.target.value)}
					ref={inputRef}
				/>
				<button type="submit" disabled={!isTitleValid}>CREATE</button>
			</form>
		</Modal>
	</div>;
};