import styles from "./HomeContent.module.css";

export default function HomeContent () {
	return <div className={styles.homeContent}>
		<section className={styles.heroSection}>
			<div className={styles.heroDocument}>
				<h1 className={styles.tagline}>
					Paperwork Done <em>Right</em>,
					Sign Smarter with <em>ShineSign</em>
				</h1>
			</div>
		</section>
	</div>;
};