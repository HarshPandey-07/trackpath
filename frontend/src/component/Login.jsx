import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="flex justify-center align-middle h-full w-full bg-(--cards) md:border border-(--border)">
			<aside className="border-r border-(--border) flex-1 hidden md:flex flex-col justify-center align-middle p-10">
				<h1>Welcome Back!</h1>
				<p>Track your internship and placement journey in one place.</p>
			</aside>

			<main className="flex justify-center align-middle gap-4 bg-(--cards) flex-col flex-1 p-8 border md:border-0 border-(--border)">
				<h2>Login</h2>

				<div className="flex justify-center align-middle flex-col gap-1">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						className="outline-none border border-(--border) p-2 rounded-lg hover:border-(--accent-border) focus:border-(--accent)"
					/>
				</div>

				<div className="flex justify-center align-middle flex-col gap-1">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="Enter your password"
						className="outline-none border border-(--border) p-2 rounded-lg hover:border-(--accent-border) focus:border-(--accent)"
					/>
				</div>

				<button>Login</button>

				<p>Don't have an account? <Link to={"/register"}>Register</Link></p>
			</main>
		</div>
	);
};

export default Login;
