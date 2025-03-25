import styles from "./HomeNavbar.module.css";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../Components/Logo/Logo.jsx";

export default function HomeNavbar () {
	const location = useLocation();
	const isHomePage = location.pathname === "/home";
	const isRegisterPage = location.pathname === "/home/register";
	const isLoginPage = location.pathname === "/home/login";

	return <nav className={styles.navbar}>
		<Link to="/" className={styles.logoLink}>
			<Logo className={styles.logo}/>
		</Link>
		<ul className={styles.loginRegisterLinks}>
			{isHomePage && homeView()}
			{isRegisterPage && registerView()}
			{isLoginPage && loginView()}
		</ul>
	</nav>;
};

function homeView () {
	return <>
		<Link to="register" className={`${styles.registerLink} ${styles.disappear}`}>register</Link>
		<Link to="login" className={styles.loginLink}>login</Link>
	</>;
}

function loginView () {
	return <>
		<Link to="register" className={styles.registerLink}>register</Link>
	</>;
}

function registerView () {
	return <>
		<Link to="login" className={styles.registerLink}>login</Link>
	</>;
}