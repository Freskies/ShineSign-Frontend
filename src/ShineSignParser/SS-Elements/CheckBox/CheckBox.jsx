import styles from "./CheckBox.module.css";
import { useState } from "react";

export default function CheckBox ({ children, style }) {
	const [checked, setChecked] = useState(false);

	function handleClick () {
		setChecked(prevChecked => !prevChecked);
	}

	return <label className={styles.label}>
		<input
			style={style}
			type="checkbox"
			checked={checked}
			onChange={handleClick}
		/>
		<span>{children}</span>
	</label>;
}