export function setToStorage(key, value) {
	if (localStorage) {
		localStorage.setItem(key, value);
	}
}

export function getFromStorage(key, _default = undefined) {
	let value = _default;

	if (localStorage) {
		value = localStorage.getItem(key);
	}

	return value;
}
