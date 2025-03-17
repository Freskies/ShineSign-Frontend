import { createContext, useContext } from "react";
import { useIsLogged } from "../Hooks/useIsLogged.js";
import { useLocalStorage } from "../Hooks/useLocalStorage.js";
import { TOKEN_KEY, USER_KEY } from "../Config/localStorageConfig.js";

const UserContext = createContext(null);

export function UserProvider ({ children }) {
	// const { isLoading, error, isLogged } = useIsLogged();
	const [user] = useLocalStorage(USER_KEY);
	const [token] = useLocalStorage(TOKEN_KEY);

	console.log(user, token);

	return <UserContext.Provider value={null}>
		{children}
	</UserContext.Provider>;
}

export function useUser () {
	const context = useContext(UserContext);
	if (!context) throw new Error("useLogin must be used within a LoginProvider");
	return context;
}