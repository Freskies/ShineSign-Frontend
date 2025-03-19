import styles from "./Logo.module.css";

export default function Logo () {
	return <div className={styles.logo}>
		<div className={styles.sun}>
			<p className={styles.sunText}>ShineSign</p>
		</div>
		<div className={styles.horizonLine}></div>
		<div className={styles.penWrapper}>
			<svg
				className={styles.pen}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 -960 960 960"
				fill="#1F1300"
			>
				<path
					d={"m490-527 37 37 217-217-37-37-217 217ZM200-200h37l233-233-37-37-233 " +
						"233v37Zm355-205L405-555l167-167-29-29-219 219-56-56 218-219q24-24 " +
						"56.5-24t56.5 24l29 29 50-50q12-12 28.5-12t28.5 12l93 93q12 12 12 " +
						"28.5T828-678L555-405ZM270-120H120v-150l285-285 150 150-285 285Z"}/>
			</svg>
		</div>
	</div>;
};