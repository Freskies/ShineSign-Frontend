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

export function IconEdit () {
	return <svg
		className={styles.edit}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path
			d={"M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18" +
				"l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-" +
				"29 57 57-29-28Z"}
		/>
	</svg>;
}