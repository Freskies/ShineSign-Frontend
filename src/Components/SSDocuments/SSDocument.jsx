import styles from "./SSDocument.module.css";
import { IconDocument } from "../../Pages/App/Dashboard/DashboardIcons.jsx";

export default function SsDocument ({ ssDocument, onClick }) {
	return <li>
		<figure>
			<button onClick={() => onClick(ssDocument.id)}>G</button>
			<IconDocument/>
			<figcaption>{ssDocument.title}</figcaption>
		</figure>
	</li>;
};