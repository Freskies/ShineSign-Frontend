import styles from "./Register.module.css";
import { useState } from "react";
import { useRegister } from "../../../Hooks/requests/useRegister.js";

export default function Register () {
	const { isLoading, error, isSuccess, registerUser } = useRegister();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const userObj = { username, password, email };

	function handleSubmit (e) {
		e.preventDefault();
		registerUser(userObj);
	}

	return <main className={styles.registerPage}>
		{error
			? <p className={styles.error}>{error}</p>
			: isSuccess && <p className={styles.success}>User registered successfully!</p>
		}
		<form onSubmit={handleSubmit}>
			<label>
				<span>Username:</span>
				<input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
			</label>
			<label>
				<span>Password:</span>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			</label>
			<label>
				<span>Email:</span>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
			</label>
			<button type="submit" disabled={isLoading}>Register</button>
		</form>
	</main>;
};