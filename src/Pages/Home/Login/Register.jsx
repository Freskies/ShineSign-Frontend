import styles from "./Register.module.css";
import formStyles from "./Form.module.css";
import { useState } from "react";
import { useRegister } from "../../../Hooks/requests/useRegister.js";
import Input from "./Input.jsx";
import { IconMail, IconPassword, IconUsername } from "./InputIcon.jsx";

export default function Register () {
	const { isLoading, error, isSuccess, registerUser } = useRegister();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");

	const userObj = { username, password, email };

	function handleSubmit (e) {
		e.preventDefault();
		registerUser(userObj).then(() => null);
	}

	return <main className={styles.registerPage}>
		{error
			? <p className={styles.error}>{error}</p>
			: isSuccess && <p className={styles.success}>User registered successfully!</p>
		}
		<form className={formStyles.form} onSubmit={handleSubmit}>
			<Input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="username"
			>
				<IconUsername className={formStyles.icon}/>
			</Input>
			<Input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="password"
			>
				<IconPassword className={formStyles.icon}/>
			</Input>
			<Input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="confirm password"
			>
				<IconPassword className={formStyles.icon}/>
			</Input>
			<Input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="e-mail"
			>
				<IconMail className={formStyles.icon}/>
			</Input>
			<button className={formStyles.action} type="submit" disabled={isLoading}>Register</button>
		</form>
	</main>;
};