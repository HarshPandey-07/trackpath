export const register = async (user) => {
	const res = await fetch("/api/auth/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Register failed");
	}

	return data;
};

export const login = async (user) => {
	const res = await fetch("/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Login failed");
	}

	return data;
};

export const logout = async () => {
	const res = await fetch("/api/auth/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Logout failed");
	}

	return data;
};

export const refresh = async () => {
	const res = await fetch("/api/auth/refresh", {
		method: "POST",
		credentials: "include",
	});

	if (res.status === 401 || !res.ok) {
		throw new Error("Failed to refresh authentication");
	}

	const data = await res.json();
	const token = data.token;

	return token;
};
