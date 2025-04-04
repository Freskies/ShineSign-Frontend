import { createContext, useContext } from "react";
import FiberNode from "../ShineSignParser/FiberTree.js";
import * as ShineSignPageFactory from "../ShineSignParser/ShineSignPageFactory.jsx";

const SSPContext = createContext(null);

export function SSPProvider ({ children }) {
	function parsePage (elements, styles) {
		try {
			const fiberTree = FiberNode.generateFiberTree(elements, styles);
			return ShineSignPageFactory.fromFiberTree(fiberTree);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	const value = {
		parsePage,
	};

	return <SSPContext.Provider value={value}>
		{children}
	</SSPContext.Provider>;
}

export function useSSPContext () {
	const context = useContext(SSPContext);
	if (!context) throw new Error("useSSPContext must be used within a SSPProvider");
	return context;
}