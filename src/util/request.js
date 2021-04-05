export default async function request(url, options = {}) {
	const response = await fetch(url);

	if (response.ok) {
		if (options.responseType === 'text') {
			return response.text();
		}
		else {
			return response.json();
		}
	}
	else {
		const text = await response.text();

		throw new Error(text);
	}
}