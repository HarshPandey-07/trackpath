import { refresh } from "./authService";
import { API_URL } from "./config";

export const apiClient = async (url, token, setToken, options = {}) => {
	// Supports both relative API paths and absolute URLs
	const apiUrl = /^https?:\/\//i.test(url)
		? url
		: `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;

	const makeRequest = async (currentToken) => {
		return await fetch(apiUrl, {
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
		const errorData = await response.json().catch(() => null);
		throw new Error(
			errorData?.message || `API Error: ${response.statusText}`,
		);
	}

	return await response.json();
};
