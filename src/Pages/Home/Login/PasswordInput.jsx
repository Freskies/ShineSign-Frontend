import { useEffect } from "react";
import styles from "./Input.module.css";

export default function PasswordInput ({ type, value, onChange, placeholder }) {
	useEffect(() => {
		if (value === "") onChange({ target: { value: placeholder } });
	}, [onChange, placeholder, value]);

	const isPlaceholder = value === placeholder;

	return <input
		className={isPlaceholder ? styles.placeholder : ""}
		type={type}
		value={value}
		onChange={onChange}
	/>;
};