import styles from "./Field.module.css";
import { useState } from "react";

export default function Field ({ children, style }) {
	const [input, setInput] = useState(`${children}`);
	return <input
		className={styles.field}
		style={style}
		value={input}
		onChange={e => setInput(e.target.value)}
	/>;
};