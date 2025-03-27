import { SSPProvider } from "../../Contexts/SSPContext.jsx";
import { Outlet } from "react-router-dom";

export default function SignedPageLayout () {
	return <SSPProvider>
		<Outlet/>
	</SSPProvider>;
};