import styles from "./Field.module.css";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER = "...";

export default function Field ({ children, style }) {
	const [value, setValue] = useState(`${children}`.trim() || "");
	const spanRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		if (spanRef.current && inputRef.current)
			inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
	}, [value]);

	return <div className={styles.inputWrapper}>
		<span ref={spanRef} className={styles.span}>
			{value || PLACEHOLDER}
		</span>
		<input
			ref={inputRef}
			type="text"
			className={styles.field}
			style={style}
			value={value}
			onChange={e => setValue(e.target.value)}
			placeholder={PLACEHOLDER}
		/>
	</div>;
};