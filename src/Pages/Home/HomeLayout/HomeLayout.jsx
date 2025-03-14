import styles from "./HomeLayout.module.css";
import { Outlet } from "react-router-dom";
import HomeNavbar from "../HomeNavbar/HomeNavbar.jsx";

export default function HomeLayout () {

	return <>
		<HomeNavbar/>
		<main>
			<Outlet/>
		</main>
	</>;
};