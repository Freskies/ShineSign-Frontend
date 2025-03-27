import { createContext, useContext } from "react";

const SignedDocumentsContext = createContext(null);

export function SignedDocumentsProvider ({ children }) {

	const value = {};

	return <SignedDocumentsContext.Provider value={value}>
		{children}
	</SignedDocumentsContext.Provider>;
}

export function useSignedDocumentsContext () {
	const context = useContext(SignedDocumentsContext);
	if (!context) throw new Error("useSignedDocumentsContext must be used within a SignedDocumentsProvider");
	return context;
}