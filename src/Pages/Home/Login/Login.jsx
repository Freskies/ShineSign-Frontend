import styles from "./Login.module.css";
import { useLogin } from "../../../Hooks/requests/useLogin.js";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login () {
	const { isLoading, error, isSuccess, login } = useLogin();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit (e) {
		e.preventDefault();
		login({ username, password });
	}

	return <main className={styles.loginPage}>
		{error && <p>username or password incorrect</p>}
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button type="submit" disabled={isLoading}>Login</button>
		</form>
		{isSuccess && <Navigate to={`/${username}`} replace={true}/>}
	</main>;
};