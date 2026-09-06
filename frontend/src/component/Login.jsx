import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../service/authService";

const Login = () => {
	const { setUser, setToken } = useContext(AuthContext);
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState({
		status: "",
		message: "",
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const response = await login(data);

			setUser(response.user);
			setToken(response.token);

			navigate("/");
		} catch (error) {
			setError(error);
		}
	};

	return (
		<div className="flex justify-center align-middle h-full w-full bg-(--cards) md:border border-(--border)">
			<aside className="border-r border-(--border) flex-1 hidden md:flex flex-col justify-center align-middle p-10">
				<h1>Welcome Back!</h1>
				<p>Track your internship and placement journey in one place.</p>
			</aside>

			<main className="flex justify-center align-middle gap-4 bg-(--cards) flex-col flex-1 p-8 border md:border-0 border-(--border)">
				<div className="flex justify-between align-middle">
					<h2>Login</h2>
					<p className={"text-red-500"}>{error && error?.message}</p>
				</div>

				<div className="flex justify-center align-middle flex-col gap-1">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Enter your email"
						onChange={handleChange}
						className="outline-none border border-(--border) p-2 rounded-lg hover:border-(--accent-border) focus:border-(--accent)"
					/>
				</div>

				<div className="flex justify-center align-middle flex-col gap-1">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Enter your password"
						onChange={handleChange}
						className="outline-none border border-(--border) p-2 rounded-lg hover:border-(--accent-border) focus:border-(--accent)"
					/>
				</div>

				<button
					onClick={(e) => {
						handleSubmit(e);
					}}
				>
					Login
				</button>

				<p>
					Don't have an account?{" "}
					<Link
						to={"/register"}
						className="text-[#8ab4f8] hover:underline"
					>
						Register
					</Link>
				</p>
			</main>
		</div>
	);
};

export default Login;
