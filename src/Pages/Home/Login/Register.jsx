import styles from "./Register.module.css";
import formStyles from "./Form.module.css";
import { useState } from "react";
import { useRegister } from "../../../Hooks/requests/useRegister.js";
import Input from "./Input.jsx";
import { IconMail, IconPassword, IconUsername, IconVisibility, IconVisibilityHidden } from "./InputIcon.jsx";
import { useLogin } from "../../../Hooks/requests/useLogin.js";
import { Navigate } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner.jsx";

export default function Register () {
	const { isLoading, error, registerUser } = useRegister();
	const { isLoading: isLoadingLogin, error: errorLogin, isSuccess: isSuccessLogin, login } = useLogin();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");

	const [isVisiblePassword, setIsVisiblePassword] = useState();

	function setVisiblePassword () {
		setIsVisiblePassword(true);
	}

	function setHiddenPassword () {
		setIsVisiblePassword(false);
	}

	const userObj = { username, password, email };

	function handleSubmit (e) {
		e.preventDefault();
		registerUser(userObj).then(
			() => login({ username, password }).then(() => null),
		);
	}

	const isValidUsername = /^[a-zA-Z0-9_-]{5,16}$/.test(username);
	const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/.test(password);
	const isValidConfirmPassword = password === confirmPassword;
	const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
	const isValidForm = isValidUsername && isValidPassword && isValidConfirmPassword && isValidEmail;

	return <main className={styles.registerPage}>
		{isLoading || isLoadingLogin
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
						isValid={isValidUsername}
					>
						<p className={formStyles.invalid}>
							* Username can contain only alphanumerics character, underscores and hyphens. At least 5 characters
							long.
						</p>
					</Input>
					<Input
						type={isVisiblePassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="password"
						icon={<IconPassword className={formStyles.icon}/>}
						rightIcon={isVisiblePassword
							? <IconVisibility className={formStyles.rightIcon} onClick={setHiddenPassword}/>
							: <IconVisibilityHidden className={formStyles.rightIcon} onClick={setVisiblePassword}/>}
						isValid={isValidPassword}
					>
						<p className={formStyles.invalid}>
							* Password must contain at least one uppercase letter, one lowercase letter,
							one number, on special character and be at least 5 characters long.
						</p>
					</Input>
					<Input
						type={isVisiblePassword ? "text" : "password"}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="confirm password"
						icon={<IconPassword className={formStyles.icon}/>}
						isValid={isValidConfirmPassword}
					>
						<p className={formStyles.invalid}>
							* Passwords must match.
						</p>
					</Input>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="e-mail"
						icon={<IconMail className={formStyles.icon}/>}
						isValid={isValidEmail}
					>
						<p className={formStyles.invalid}>
							* Invalid e-mail address.
						</p>
					</Input>
					<button className={formStyles.action} type="submit" disabled={isLoading || !isValidForm}>
						Register
					</button>
				</form>
			</>
		}
		{isSuccessLogin && <Navigate to={`/${username}`} replace={true}/>}
		{errorLogin && <Navigate to={"/home/login"} replace={true}/>}
	</main>;
};