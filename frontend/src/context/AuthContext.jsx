import { createContext, useEffect, useState } from "react";
import { refresh } from "../service/authService";
import { apiClient } from "../service/apiClient";

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
				const accessToken = await refresh();

				setToken(accessToken);

				// Get current user
				const meData = await apiClient("/api/auth/me", token, setToken);
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
