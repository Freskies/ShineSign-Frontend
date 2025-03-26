import styles from "./DashboardIcons.module.css";

export function IconLogout () {
	return <svg
		className={styles.logout}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path
			d={"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55" +
				"-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"}
		/>
	</svg>;
}

export function IconAdd () {
	return <svg
		className={styles.add}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
	</svg>;
}

export function IconDocument () {
	return <svg
		className={styles.document}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path
			d={"M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-8" +
				"80h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"}
		/>
	</svg>;
}