import styles from "./Login.module.css";
import formStyles from "./Form.module.css";
import { useLogin } from "../../../Hooks/requests/useLogin.js";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { IconPassword, IconUsername, IconVisibility, IconVisibilityHidden } from "./InputIcon.jsx";
import Input from "./Input.jsx";
import Spinner from "../../../Components/Spinner/Spinner.jsx";

export default function Login () {
	const { isLoading, error, isSuccess, login } = useLogin();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isVisiblePassword, setIsVisiblePassword] = useState(false);

	function setVisiblePassword () {
		setIsVisiblePassword(true);
	}

	function setHiddenPassword () {
		setIsVisiblePassword(false);
	}

	function handleSubmit (e) {
		e.preventDefault();
		login({ username, password });
	}

	const isValidForm = username.length > 0 && password.length > 0;

	return <main className={styles.loginPage}>
		{isLoading
			? <Spinner fullscreen={true}/>
			: <>
				{error ? <p className={styles.error}>{error}</p> : null}
				<form className={formStyles.form} onSubmit={handleSubmit}>
					<Input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="username"
						icon={<IconUsername className={formStyles.icon}/>}
						isValid={true}
					/>
					<Input
						type={isVisiblePassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="password"
						icon={<IconPassword className={formStyles.icon}/>}
						rightIcon={isVisiblePassword
							? <IconVisibility className={formStyles.rightIcon} onClick={setHiddenPassword}/>
							: <IconVisibilityHidden className={formStyles.rightIcon} onClick={setVisiblePassword}/>}
						isValid={true}
					/>
					<button className={formStyles.action} type="submit" disabled={isLoading || !isValidForm}>
						Login
					</button>
				</form>
			</>
		}
		{isSuccess && <Navigate to={`/${username}`} replace={true}/>}
	</main>;
};