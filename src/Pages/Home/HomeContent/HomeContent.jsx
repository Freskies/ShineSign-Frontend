import styles from "./HomeContent.module.css";
import waterBackground from "./../../../Assets/water-background.jpeg";
import logo from "./../../../Assets/logo.png";
import sunLight from "./../../../Assets/sun-light.png";
import halfSunLight from "./../../../Assets/half-sun-light.png";

// Other possible taglines:
// ShineSign – The Smart Way to Sign for Your ASD
// ShineSign – Where Your Documents Meet the Future

export default function HomeContent () {
	return <div className={styles.homeContent}>
		<section className={styles.heroSection}>
			{/*<img className={styles.heroBackground} src={waterBackground} alt=""/>*/}
			<h1 className={styles.tagline}>
				Paperwork Done <em>Right</em>
				<br/>
				Sign Smarter with <em>ShineSign</em>
			</h1>
		</section>
		<div className={styles.heroLogoWrapper}>
			{/*<img className={styles.heroLogo} src={logo} alt=""/>*/}
			{/*<img className={styles.heroLogoLight} src={halfSunLight} alt=""/>*/}
		</div>
		<section>
			<p>viola è il colore della ciola</p>
		</section>
	</div>;
};