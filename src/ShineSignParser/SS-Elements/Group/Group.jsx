import styles from "./Group.module.css";

export default function Group ({ children, style }) {
	return <div style={style} className={styles.group}>
		{children}
	</div>;
};