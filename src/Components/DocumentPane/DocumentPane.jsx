import styles from "./DocumentPane.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { maxZoom, minZoom, zoomStep, scalingFactor, initialOccupiedPanePercentage } from "./documentPaneConfig.js";
import zoomIn from "../../Assets/icons/zoomIn.svg";
import zoomOut from "../../Assets/icons/zoomOut.svg";

/**
 * A document pane component that allows zooming and panning
 *
 * @param children the jsx elements to be displayed in the document pane
 * @param scroll whether the document pane should be scrollable
 * @returns {JSX.Element} the document pane
 */
export default function DocumentPane ({ children, scroll = false }) {
	// the scale of the document pane
	const [scale, setScale] = useState(1);
	// the position of the document pane
	const [position, setPosition] = useState({ x: 0, y: 0 });
	// whether the document pane is being dragged
	const [isDragging, setIsDragging] = useState(false);
	// the initial position of the mouse
	const startPos = useRef({ x: 0, y: 0 });

	const paneRef = useRef(null);
	const childrenRef = useRef(null);

	const onLoad = useCallback(() => {
		if (!(paneRef.current && childrenRef.current)) return;
		const paneWidth = paneRef.current.offsetWidth;
		const childrenWidth = childrenRef.current.offsetWidth;

		if (paneWidth > childrenWidth) {
			setPosition(prevPosition => ({ x: prevPosition.x, y: 0 }));
			return;
		}

		// document scale (initialOccupiedPanePercentage of paneWidth)
		const initialOccupiedWidth = initialOccupiedPanePercentage * paneWidth;
		const childrenScale = initialOccupiedWidth / childrenWidth;

		// document top position (and bottom padding)
		const offset = (paneWidth - initialOccupiedWidth) / 2;

		setScale(Math.min(maxZoom, Math.max(minZoom, childrenScale)));
		setPosition(prevPosition => ({ x: prevPosition.x, y: offset }));
	}, []);

	useEffect(onLoad, [onLoad]);

	function handleWheel (e) {
		/*
		* Math.min(maxZoom, ...) ensures that the scale does not exceed the maximum zoom level
		* Math.max(minZoom, ...) ensures that the scale does not go below the minimum zoom level
		* e.deltaY is the scroll amount
		* scalingFactor is the amount of zoom per scroll
		 */
		setScale(prevScale => Math.min(maxZoom, Math.max(minZoom, prevScale + e.deltaY * scalingFactor)));
	}

	function handleMouseDown (e) {
		setIsDragging(true);
		// e.clientX/Y is the coordinate of the mouse
		// position.x/y is the coordinate of the document pane
		startPos.current = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		};
	}

	function handleMouseMove (e) {
		if (!isDragging) return;
		// e.clientX/Y is the coordinate of the mouse
		// startPos.current.x/y is the initial position of the mouse
		setPosition({
			x: e.clientX - startPos.current.x,
			y: e.clientY - startPos.current.y,
		});
	}

	function handleMouseUp () {
		setIsDragging(false);
	}

	function handlePlus () {
		setScale(prevScale => Math.min(maxZoom, prevScale + zoomStep));
	}

	function handleMinus () {
		setScale(prevScale => Math.max(minZoom, prevScale - zoomStep));
	}

	const wrapperStyle = {
		transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
	};

	return <div
		className={`${styles.documentPane} ${scroll ? styles.scrollable : ""}`}
		onWheel={scroll ? () => null : handleWheel}
		onMouseMove={handleMouseMove}
		onMouseUp={handleMouseUp}
		onMouseLeave={handleMouseUp}
		ref={paneRef}
	>
		<div
			className={`${styles.cursorGrab} ${scroll ? styles.scrollableWrapper : ""}`}
			onMouseDown={handleMouseDown}
			style={wrapperStyle}
			ref={childrenRef}
			onLoad={onLoad}
		>
			{children}
		</div>
		<div className={styles.actions}>
			<button className={styles.zoomAction} onClick={handlePlus}>
				<img src={zoomIn} alt="zoom in"/>
			</button>
			<button className={styles.zoomAction} onClick={handleMinus}>
				<img src={zoomOut} alt="zoom out"/>
			</button>
		</div>
	</div>;
};