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
