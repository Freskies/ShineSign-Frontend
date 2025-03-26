import styles from "./Spinner.module.css";

export default function Spinner ({ fullscreen = false }) {
	return <div className={`${styles.spinner} ${fullscreen ? styles.fullScreen : ""}`}>
	</div>;
};