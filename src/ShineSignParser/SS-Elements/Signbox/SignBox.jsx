import styles from "./SignBox.module.css";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

export default function SignBox ({ style }) {
	function handleDraw (e) {
		// e.preventDefault();
		e.stopPropagation();
	}

	const sigCanvas = useRef({});

	return <fieldset className={styles.signbox} style={style}>
		<SignatureCanvas
			ref={sigCanvas}
			canvasProps={{ className: styles.canvas }}
			onBegin={handleDraw}
			backgroundColor="rgba(255, 255, 255, 0)"
		/>
		<button
			type="button"
			className={styles.clear}
			onClick={() => sigCanvas.current.clear()}
		>
			Clear
		</button>
	</fieldset>;
};