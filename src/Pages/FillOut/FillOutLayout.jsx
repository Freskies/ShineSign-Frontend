import { FillOutProvider } from "../../Contexts/FillOutContext.jsx";
import { Outlet } from "react-router-dom";

export default function FillOutLayout () {
	return <FillOutProvider>
		<Outlet/>
	</FillOutProvider>;
};