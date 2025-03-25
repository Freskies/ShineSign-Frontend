import { FillOutProvider } from "../../Contexts/FillOutContext.jsx";
import { Outlet } from "react-router-dom";
import { SSPProvider } from "../../Contexts/SSPContext.jsx";

export default function FillOutLayout () {
	return <FillOutProvider>
		<SSPProvider>
			<Outlet/>
		</SSPProvider>
	</FillOutProvider>;
};