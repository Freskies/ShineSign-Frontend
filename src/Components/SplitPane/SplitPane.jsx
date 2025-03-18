import styles from "./SplitPane.module.css";
import { SplitPaneProvider, useSplitPane } from "./SplitPaneContext.jsx";

export function LeftPanel ({ children }) {
	const { leftPanel, leftWidth } = useSplitPane();
	return <section style={{ width: `${leftWidth}%` }}>
		{leftPanel}
	</section>;
}

export function RightPanel ({ children }) {
	const { rightPanel, rightWidth } = useSplitPane();
	return <section style={{ width: `${rightWidth}%` }}>
		{rightPanel}
	</section>;
}

function Resizer () {
	const { handleMouseDown, isResizing } = useSplitPane();

	return <>
		<div
			className={styles.resizer}
			onMouseDown={handleMouseDown}
		/>
		{/* Overlay is necessary, otherwise the pointer event would be captured by the iframe */}
		{isResizing && <div className={styles.overlay}/>}
	</>;
}

function SplitPaneContent ({ className }) {
	return <div className={`${styles.splitPane} ${className}`}>
		<LeftPanel/>
		<Resizer/>
		<RightPanel/>
	</div>;
}

export default function SplitPane ({ children, className = "" }) {
	return <SplitPaneProvider content={children}>
		<SplitPaneContent className={className}/>
	</SplitPaneProvider>;
};