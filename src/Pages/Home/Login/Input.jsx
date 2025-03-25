export default function Input ({ icon, type, value, onChange, placeholder, isValid, children, rightIcon }) {
	return <div className="inputContainer">
		<div className="inputWrapper">
			{icon}
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
			{rightIcon}
		</div>
		{!isValid && value && children}
	</div>;
};