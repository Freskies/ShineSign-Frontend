import styles from "./Input.module.css";

export default function Input ({ children, type, value, onChange, placeholder }) {
	return <div className="inputWrapper">
		{children}
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	</div>;
};