import styles from "./Spinner.module.css";

export default function Spinner ({ fullscreen = false }) {
	return <div className={`${styles.spinner} ${fullscreen ? styles.fullScreen : ""}`}>
		<div className={styles.bounce1}/>
		<div className={styles.bounce2}/>
		<div className={styles.bounce3}/>
	</div>;
};