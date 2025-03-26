import { createContext, useContext } from "react";
import { useIsLogged } from "../Hooks/requests/useIsLogged.js";
import { useLocalStorage } from "../Hooks/useLocalStorage.js";
import { TOKEN_KEY } from "../Config/localStorageConfig.js";
import { Link, useParams } from "react-router-dom";

const UserContext = createContext(null);

export function UserProvider ({ children }) {
	const { username } = useParams();
	const [token] = useLocalStorage(TOKEN_KEY);

	const { isLoading, error, isLogged } = useIsLogged(username, token);

	function logout () {
		localStorage.removeItem(TOKEN_KEY);
	}

	const value = { token, username, logout };

	return <UserContext.Provider value={value}>
		{isLoading && <p>Loading...</p>}
		{error && <p>There was an error</p>}
		{isLogged
			? children
			: <p>Not logged in, return to <Link to={"/home"}>Home</Link></p>
		}
	</UserContext.Provider>;
}

export function useUser () {
	const context = useContext(UserContext);
	if (!context) throw new Error("useUser must be used within a UserProvider");
	return context;
}