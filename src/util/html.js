export function getText(error) {
	const div = document.createElement('div');

	div.innerHTML = error;

	return div.innerText;
}