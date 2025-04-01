import styles from "./Root.module.css";

export default function Root ({ children, style }) {
	return <form className={styles.page} style={style}>
		{children}
	</form>;
};