import { createContext, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider ({ children }) {
	return <UserContext.Provider value={null}>
		{children}
	</UserContext.Provider>;
}

export function useUser () {
	const context = useContext(UserContext);
	if (!context) throw new Error("useLogin must be used within a LoginProvider");
	return context;
}