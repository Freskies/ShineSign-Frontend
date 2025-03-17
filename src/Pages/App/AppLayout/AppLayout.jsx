import styles from "./AppLayout.module.css";
import { UserProvider } from "../../../Contexts/UserContext.jsx";
import { Outlet } from "react-router-dom";

export default function AppLayout () {
	return <UserProvider>
		<Outlet/>
	</UserProvider>;
};