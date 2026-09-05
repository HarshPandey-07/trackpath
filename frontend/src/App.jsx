import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./page/Dashboard";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import RequireAuth from "./context/RequireAuth";
import AuthProvider from "./context/AuthContext";

const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
	{
		element: <RequireAuth />,
		children: [
			{
				element: <AppLayout />,
				children: [
					{
						index: true,
						element: <Dashboard />,
					},
				],
			},
		],
	},
]);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
