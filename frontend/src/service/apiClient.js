import { refresh } from "./authService";

export const apiClient = async (url, token, setToken, options = {}) => {
	const makeRequest = async (currentToken) => {
		return await fetch(url, {
			...options,
			headers: {
				"Content-Type": "application/json",
				...(currentToken && {
					Authorization: `Bearer ${currentToken}`,
				}),
				...options.headers,
			},
			credentials: "include",
		});
	};

	let response = await makeRequest(token);

	if (response.status === 401) {
		try {
			const newToken = await refresh();
			setToken(newToken);

			response = await makeRequest(newToken);
		} catch (refreshError) {
			setToken(null);
			throw refreshError;
		}
	}

	if (!response.ok) {
		throw new Error(`API Error: ${response.statusText}`);
	}

	return await response.json();
};
