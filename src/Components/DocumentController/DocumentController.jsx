import styles from "./DocumentController.module.css";
import { useDocument } from "../../Contexts/DocumentContext.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal.jsx";
import { useBinarySwitch } from "../../Hooks/useBinarySwitch.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

export default function DocumentController () {
	const navigate = useNavigate();
	const { isOn: isOpenModal, setOn: openModal, setOff: closeModal } = useBinarySwitch();
	const {
		handleSaveDocument: onSaveDocument,
		isPublic,
		setVisibility,
	} = useDocument();

	return <div className={styles.documentController}>
		<DocumentControl title="Settings" onClick={openModal}>
			<Settings/>
		</DocumentControl>
		<DocumentControl title="Save" onClick={onSaveDocument}>
			<Save/>
		</DocumentControl>
		<DocumentControl title="Exit" onClick={() => navigate("..")}>
			<Exit/>
		</DocumentControl>
		<Modal isOpen={isOpenModal} onClose={closeModal}>
			<h2>Settings</h2>
			<label className={styles.property}>
				<span>Visibility:</span>
				<ToggleSwitch isOn={isPublic} onToggle={() => setVisibility(!isPublic)}/>
			</label>
		</Modal>
	</div>;
};

function DocumentControl ({ children, title, onClick }) {
	return <button
		className={styles.documentControl}
		onClick={onClick}
		title={title}
	>
		{children}
	</button>;
}

function Settings () {
	return <svg
		className={styles.settings}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path
			d={"m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-" +
				"585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-" +
				"103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-" +
				"80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-" +
				"29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-" +
				"633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-" +
				"266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"}
		/>
	</svg>;
}

function Save () {
	return <svg
		className={styles.save}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path
			d={"M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-" +
				"840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-" +
				"50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"}
		/>
	</svg>;
}

function Exit () {
	return <svg
		className={styles.exit}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 -960 960 960"
	>
		<path
			d={"M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-" +
				"840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-" +
				"80h346L364-622l56-58 200 200-200 200Z"}
		/>
	</svg>;
}