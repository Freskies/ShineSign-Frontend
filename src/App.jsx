import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditPage from "./Pages/App/Edit/EditPage.jsx";
import Home from "./Pages/Home/Home.jsx";
import Dashboard from "./Pages/App/Dashboard/Dashboard.jsx";

export default function App () {
	return <BrowserRouter>
		<Routes>
			<Route index element={<Navigate to="home" replace/>}/>
			<Route path="home" element={<Home/>}/>
			<Route path="app">
				<Route index element={<Navigate to="edit" replace/>}/>
				<Route path="dashboard" element={<Dashboard/>}/>
				<Route path="edit" element={<EditPage/>}/>
			</Route>
		</Routes>
	</BrowserRouter>;
};