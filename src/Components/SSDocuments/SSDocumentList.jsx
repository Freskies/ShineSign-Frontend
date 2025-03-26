import styles from "./SSDcoumentList.module.css";
import SsDocument from "./SSDocument.jsx";

export default function SsDocumentList ({ documentList, onClick }) {
	return <ul className={styles.documentList}>
		{documentList.map(
			ssDocument => <SsDocument
				key={ssDocument.id}
				ssDocument={ssDocument}
				onClick={onClick}
			/>
		)}
	</ul>;
};