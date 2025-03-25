import styles from "./Text.module.css";

export default function Text ({ children, style }) {
	return <p style={style}>
		{children}
	</p>;
};