import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";

export default function Modal ({ isOpen, onClose, children }) {
	const modalRef = useRef(null);

	useEffect(() => {
		if (isOpen) modalRef.current?.showModal();
		else modalRef.current?.close();
	}, [isOpen]);

	function handleClickOutside (e) {
		if (e.target === modalRef.current) onClose();
	}

	return <dialog ref={modalRef} className={styles.modal} onMouseDown={handleClickOutside}>
		<div className={styles.modalWrapper}>
			<div className={styles.content}>
				<button className={styles.closeButton} onClick={onClose} title="close">
					<IconClose/>
				</button>
				{children}
			</div>
		</div>
	</dialog>;
};

function IconClose () {
	return <svg
		className={styles.closeIcon}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path
			d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
		/>
	</svg>;
}