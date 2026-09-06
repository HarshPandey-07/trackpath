import { NavLink } from "react-router-dom";
const Sidebar = () => {
	return (
		<nav className="fixed left-0 top-0 h-dvh w-64 bg-(--sidebar)">
			<p>Trackpath</p>
			<div className="flex justify-center align-middle flex-col gap-4">
				<NavLink
					to={"/"}
					className={({ isActive }) =>
						isActive ? "text-(--accent)" : ""
					}
				>
					Dashboard
				</NavLink>
				<NavLink
					to={"/login"}
					className={({ isActive }) =>
						isActive ? "text-(--accent)" : ""
					}
				>
					Dashboard
				</NavLink>
			</div>
		</nav>
	);
};

export default Sidebar;
