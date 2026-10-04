import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Login from "./page/Login";
import Register from "./page/Register";
import Dashboard from "./page/Dashboard";
import Applications from "./page/Application";
import ApplicationDetails from "./page/ApplicationDetails";
import ApplicationForm from "./page/ApplicationForm";

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
						element: <ApplicationForm />,
					},
					{
						path: "/application/edit/:id",
						element: <ApplicationForm />,
					},
				],
			},
		],
	},
]);

function App() {
	return (
		<AuthProvider>
			<Toaster />
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
