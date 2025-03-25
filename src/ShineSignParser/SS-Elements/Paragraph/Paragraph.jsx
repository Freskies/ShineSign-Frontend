import styles from "./Paragraph.module.css";

export default function Paragraph ({ children, style }) {
	return <section style={style} className={styles.paragraph}>
		{children}
	</section>;
};