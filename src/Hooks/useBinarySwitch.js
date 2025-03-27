import { useState } from "react";

export function useBinarySwitch (initialState = false) {
	const [isOn, setIsOn] = useState(false);

	function setOn () {
		setIsOn(true);
	}

	function setOff () {
		setIsOn(false);
	}

	function toggle () {
		setIsOn(prevIsOn => !prevIsOn);
	}

	return { isOn, setOn, setOff, toggle };
}