import styles from "./SendImage.module.css";
import { useUploadImage } from "../../Hooks/requests/useUploadImage.js";
import { useDocument } from "../../Contexts/DocumentContext.jsx";
import { useUser } from "../../Contexts/UserContext.jsx";

const formData = new FormData();

export default function SendImage () {
	const { documentId } = useDocument();
	const { token } = useUser();
	const { uploadImage } = useUploadImage(token);

	function handleSubmit (e) {
		e.preventDefault();
		uploadImage(documentId, formData).then(
			() => formData.delete("file"),
		);
	}

	function handleChangeFile (e) {
		if (e.target.files) formData.append("file", e.target.files[0]);
	}

	return <form onSubmit={handleSubmit}>
		<input type="file" placeholder="CIOLA" onChange={handleChangeFile}/>
		<button type="submit">SUBMIT</button>
	</form>;
};