import styles from "./HomeNavbar.module.css";
import logo from "./../../../Assets/logo.png";
import { Link } from "react-router-dom";

export default function HomeNavbar () {
	return <nav className={styles.navbar}>
		<Link to="/" className={styles.logoLink}>
			<img className={styles.logo} src={logo} alt="ShineSign Logo"/>
			<p>ShineSign</p>
		</Link>
		<ul className={styles.loginRegisterLinks}>
			<Link to="register" className={styles.registerLink}>register</Link>
			<Link to="login" className={styles.loginLink}>login</Link>
		</ul>
	</nav>;
};