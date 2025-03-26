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

	return <dialog ref={modalRef} className={styles.modal} onClick={handleClickOutside}>
		<div className={styles.content}>
			<button className={styles.closeButton} onClick={onClose}>
				&times;
			</button>
			{children}
		</div>
	</dialog>;
};