import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import Applications from "./page/Application";
import ApplicationDetails from "./page/ApplicationDetails";
import AddApplication from "./page/AddApplication";

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
					{
						path: "/application",
						element: <Applications />,
					},
					{
						path: "/application/:id",
						element: <ApplicationDetails />,
					},
					{
						path: "/application/add",
						element: <AddApplication />,
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
