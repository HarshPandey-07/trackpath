import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../service/authService";
const Sidebar = () => {
	const { user, setUser, setToken, showSidebar, setShowSidebar } =
		useContext(AuthContext);
	const navigate = useNavigate();

	const toggleShowSidebar = () => setShowSidebar((prev) => !prev);

	const handleLogout = async (e) => {
		try {
			e.preventDefault();

			await logout();

			setToken(null);
			setUser(null);

			navigate("/login");
		} catch (error) {
			console.log(`Error while logging out: ${error.message}`);
		}
	};

	return (
		<nav
			className={`fixed flex flex-col left-0 top-0 h-dvh bg-(--sidebar) p-4 transition-all duration-150 ${showSidebar ? "w-64" : "w-16 bg-transparent md:bg-(--sidebar)"}`}
		>
			{showSidebar ? (
				<>
					<h1
						className="text-center cursor-pointer"
						onClick={toggleShowSidebar}
					>
						TrackPath
					</h1>
					<div className="w-full border-t border-slate-600 my-6"></div>
					<div className="flex flex-col text-center gap-2">
						<NavLink
							to={"/"}
							className={({ isActive }) =>
								`${isActive ? "bg-(--accent) text-(--text-primary)" : ""} p-2 w-full rounded hover:bg-(--accent-bg)`
							}
						>
							Dashboard
						</NavLink>
						<NavLink
							to={"/login"} // For test purpose later add
							className={({ isActive }) =>
								`${isActive ? "bg-(--accent) text-(--text-primary)" : ""} p-2 w-full rounded hover:bg-(--accent-bg)`
							}
						>
							Applications
						</NavLink>
						<NavLink
							to={"/login"} // For test purpose later add
							className={({ isActive }) =>
								`${isActive ? "bg-(--accent) text-(--text-primary)" : ""} p-2 w-full rounded hover:bg-(--accent-bg)`
							}
						>
							Interviews
						</NavLink>
					</div>
					<div className="mt-auto mb-6 flex flex-col text-center gap-2">
						<div className="w-full border-t border-slate-600 my-2"></div>
						<NavLink
							to={"/login"} // For test purpose later add
							className={({ isActive }) =>
								`${isActive ? "bg-(--accent) text-(--text-primary)" : ""} p-2 w-full rounded hover:bg-(--accent-bg)`
							}
						>
							{user?.name ? user?.name : "Profile"}
						</NavLink>
						<button
							className="button-red"
							onClick={(e) => {
								handleLogout(e);
							}}
						>
							Logout
						</button>
					</div>
				</>
			) : (
				<button onClick={toggleShowSidebar}>|||</button>
			)}
		</nav>
	);
};

export default Sidebar;
