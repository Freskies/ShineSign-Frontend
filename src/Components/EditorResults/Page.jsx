import styles from "./Page.module.css";
import { getDocument } from "../../EditorConfig/editorHelper.js";
import { useDocument } from "../../Contexts/DocumentContext.jsx";
import { useEffect } from "react";

export default function Page () {
	const { pageRef, currentPage } = useDocument();
	const currentPageBody = currentPage?.body;
	const currentPageStyle = currentPage?.style;

	useEffect(() => {
		if (!pageRef.current || !currentPage) return;
		const doc = pageRef.current.contentDocument;
		doc.open();
		doc.write(getDocument(currentPageBody, currentPageStyle));
		doc.close();
	}, [currentPage, currentPageBody, currentPageStyle, pageRef]);

	if (!currentPage) return null;

	return <iframe
		className={styles.page}
		srcDoc={getDocument(currentPageBody, currentPageStyle)}
		ref={pageRef}
	/>;
};