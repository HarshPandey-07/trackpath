import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { register } from "../service/authService";

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

			const response = await register(data);

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
				<h1>Welcome!</h1>
				<p>Track your internship and placement journey in one place.</p>
			</aside>

			<main className="flex justify-center align-middle gap-2 bg-(--cards) flex-col flex-1 p-8 border md:border-0 border-(--border)">
				<div>
					<h2>Register</h2>
					<p className="text-red-500">{error && error.message}</p>
				</div>

				<div className="flex justify-center align-middle flex-col gap-0.5">
					<label htmlFor="name">Name</label>
					<input
						type="name"
						name="name"
						id="name"
						placeholder="Enter your name"
						onChange={handleChange}
						className="outline-none border border-(--border) p-2 rounded-lg hover:border-(--accent-border) focus:border-(--accent)"
					/>
				</div>

				<div className="flex justify-center align-middle flex-col gap-0.5">
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

				<div className="flex justify-center align-middle flex-col gap-0.5">
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

				<button onClick={handleSubmit}>Register</button>

				<p>
					Already have an account?{" "}
					<Link
						to={"/login"}
						className="text-[#8ab4f8] hover:underline"
					>
						Login
					</Link>
				</p>
			</main>
		</div>
	);
};

export default Login;
