import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch ({ isOn, onToggle }) {
	return (
		<div className={styles.toggleContainer} onClick={onToggle} aria-roledescription="switch">
			<div className={`${styles.switch} ${isOn ? styles.on : styles.off}`}>
				<div className={styles.circle}></div>
			</div>
		</div>
	);
};