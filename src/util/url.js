export const getSearchParam = (key) => {
	const url = new URL(window.location);

	return url.searchParams.get(key);
}

export const getAllSearchParams = (key) => {
	const searchParams = {};

	const url = new URL(window.location);

	url.searchParams.forEach((value, key) => {
		searchParams[key] = value;
	});

	return searchParams;
}

export const setSearchParam = (key, value, pushState = false) => {
	const url = new URL(window.location);

	url.searchParams.set(key, value);

	updateHistory(url, pushState);
}

export const deleteSearchParam = (key, pushState = false) => {
	const url = new URL(window.location);

	url.searchParams.delete(key);

	updateHistory(url, pushState);
}

const updateHistory = (url, pushState = false) => {
	if (pushState) {
		window.history.pushState({}, document.title, url);
	} else {
		window.history.replaceState({}, document.title, url);
	}
}