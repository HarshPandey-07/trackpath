import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				// Get a new access token using the refresh token cookie
				const refreshResponse = await fetch("/api/auth/refresh", {
					method: "POST",
					credentials: "include",
				});

				if (!refreshResponse.ok) {
					return;
				}

				const refreshData = await refreshResponse.json();
				const accessToken = refreshData.token;

				setToken(accessToken);

				// Get current user
				const meResponse = await fetch("/api/auth/me", {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					credentials: "include",
				});

				if (!meResponse.ok) {
					return;
				}

				const meData = await meResponse.json();
				setUser(meData.user);
			} catch (error) {
				console.error("Authentication initialization failed:", error);
			} finally {
				setLoading(false);
			}
		};

		initializeAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				loading,
				setUser,
				setToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
