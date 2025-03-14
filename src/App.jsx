import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditPage from "./Pages/App/Edit/EditPage.jsx";
import Dashboard from "./Pages/App/Dashboard/Dashboard.jsx";
import HomeLayout from "./Pages/Home/HomeLayout/HomeLayout.jsx";
import HomeContent from "./Pages/Home/HomeContent/HomeContent.jsx";
import Login from "./Pages/Home/Login/Login.jsx";
import Register from "./Pages/Home/Register/Register.jsx";

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
			<Route path=":user" element={<p>HELLO WORLD</p>}>
				<Route index element={<Navigate to="edit" replace/>}/>
				<Route path="dashboard" element={<Dashboard/>}/>
				<Route path="edit" element={<EditPage/>}/>
			</Route>
			<Route path="*" element={<Navigate to="/home" replace/>}/>
		</Routes>
	</BrowserRouter>;
};