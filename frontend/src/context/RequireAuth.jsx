import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const RequireAuth = () => {
	const { user, loading } = useContext(AuthContext);

	if (loading) {
		return <div>Checking authentication...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default RequireAuth;
