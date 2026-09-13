import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showSidebar, setShowSidebar] = useState(false);

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				// Get a new access token using the refresh token cookie
				const refreshResponse = await fetch("/api/auth/refresh", {
					method: "POST",
					credentials: "include",
				});

				if (refreshResponse.status === 401) {
					setUser(null);
					setToken(null);
					return;
				}

				if (!refreshResponse.ok) {
					throw new Error("Failed to refresh authentication");
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
					setUser(null);
					setToken(null);
					return;
				}

				const meData = await meResponse.json();
				setUser(meData);
			} catch (error) {
				console.error("Authentication initialization failed:", error);
				setUser(null);
				setToken(null);
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
				showSidebar,
				loading,
				setUser,
				setToken,
				setShowSidebar,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
