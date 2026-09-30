import { createContext, useEffect, useState } from "react";
import { refresh } from "../service/authService";
import { apiClient } from "../service/apiClient";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

<<<<<<< HEAD
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
=======
	useEffect(() => {
		const initializeAuth = async () => {
			try {
				// Get a new access token using the refresh token cookie
				const accessToken = await refresh();
>>>>>>> main

        setToken(accessToken);

<<<<<<< HEAD
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
        console.log("USER AFTER LOGIN :", meData);
      } catch (error) {
        console.error("Authentication initialization failed:", error);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
=======
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
>>>>>>> main

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
