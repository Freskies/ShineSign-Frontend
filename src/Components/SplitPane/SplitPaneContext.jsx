import { createContext, useContext, useState } from "react";
import { MIN_WIDTH } from "./SplitPaneConfig.js";
import { LeftPanel, RightPanel } from "./SplitPane.jsx";

const SplitPaneContext = createContext(null);

export function SplitPaneProvider ({ content, children }) {
	const [leftWidth, setLeftWidth] = useState(50); // Initial width in %
	const [isResizing, setIsResizing] = useState(false);
	const rightWidth = 100 - leftWidth;

	const leftPanel = content.find(child => child.type === LeftPanel)?.props.children;
	const rightPanel = content.find(child => child.type === RightPanel).props.children;

	if (!leftPanel || !rightPanel)
		throw new Error("SplitPaneProvider must have a LeftPanel and a RightPanel as children");

	function handleMouseDown (e) {
		e.preventDefault();
		const startX = e.clientX;
		setIsResizing(true);

		function onMouseMove (event) {
			/*
			* delta represents the change in the mouse position
			* event.clientX - startX -> gives the distance the mouse has moved
			* then / window.innerWidth * 100 -> gives the percentage of the distance moved (of the screen width)
			 */
			const delta = ((event.clientX - startX) / window.innerWidth) * 100;
			/*
			* newWidth is the new width of the left pane
			* Math.min(leftWidth + delta, 100 - MIN_WIDTH)
			* ensures that the right pane does not become smaller than the minimum width
			* Math.max(MIN_WIDTH, ...) ensures that the left pane does not become smaller than the minimum width
			 */
			const newWidth = Math.max(MIN_WIDTH, Math.min(leftWidth + delta, 100 - MIN_WIDTH));
			setLeftWidth(newWidth);
		}

		function onMouseUp () {
			setIsResizing(false);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		}

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	}

	const value = {
		leftWidth,
		rightWidth,
		isResizing,
		handleMouseDown,
		leftPanel,
		rightPanel,
	};

	return <SplitPaneContext.Provider value={value}>
		{children}
	</SplitPaneContext.Provider>;
}

export function useSplitPane () {
	const context = useContext(SplitPaneContext);
	if (!context) throw new Error("useSplitPane must be used within a SplitPaneProvider");
	return context;
}