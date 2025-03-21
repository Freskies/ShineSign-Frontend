import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/App/Dashboard/Dashboard.jsx";
import HomeLayout from "./Pages/Home/HomeLayout/HomeLayout.jsx";
import HomeContent from "./Pages/Home/HomeContent/HomeContent.jsx";
import Login from "./Pages/Home/Login/Login.jsx";
import Register from "./Pages/Home/Register/Register.jsx";
import AppLayout from "./Pages/App/AppLayout.jsx";
import EditorLayout from "./Pages/App/EditorLayout.jsx";

export default function App () {
	return <BrowserRouter>
		<Routes>
			<Route index element={<Navigate to="home" replace/>}/>
			<Route path="home" element={<HomeLayout/>}>
				<Route index element={<HomeContent/>}/>
				<Route path="login" element={<Login/>}/>
				<Route path="register" element={<Register/>}/>
			</Route>
			<Route path="/sign/:documentId" element={<p>HELLO</p>}/>
			<Route path=":username" element={<AppLayout/>}>
				<Route index element={<Dashboard/>}/>
				<Route path=":documentId" element={<EditorLayout/>}/>
			</Route>
			<Route path="*" element={<Navigate to="/home" replace/>}/>
		</Routes>
	</BrowserRouter>;
};