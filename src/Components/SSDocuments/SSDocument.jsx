import styles from "./SSDocument.module.css";
import { IconDocument, IconEdit } from "../../Pages/App/Dashboard/DashboardIcons.jsx";
import { useNavigate } from "react-router-dom";

export default function SsDocument ({ ssDocument, onClick }) {
	const navigate = useNavigate();

	function handleEditClick (e) {
		e.stopPropagation();
		onClick(ssDocument.id);
	}

	function handleDocumentClick () {
		navigate("signed/" + ssDocument.id);
	}

	return <li onClick={handleDocumentClick} title={ssDocument.title}>
		<figure className={styles.documentCard}>
			<button className={styles.modify} onClick={handleEditClick} title="edit document">
				<IconEdit/>
			</button>
			<IconDocument/>
			<figcaption className={styles.title}>{ssDocument.title}</figcaption>
		</figure>
	</li>;
};