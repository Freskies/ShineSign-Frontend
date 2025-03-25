import styles from "./Root.module.css";

export default function Root ({ children, style }) {
	return <div className={styles.page} style={style}>
		{children}
	</div>;
};