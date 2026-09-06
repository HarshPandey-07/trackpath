import { NavLink } from "react-router-dom";
const Sidebar = () => {
	return (
		<nav className="fixed flex flex-col left-0 top-0 h-dvh w-64 bg-(--sidebar) p-4">
			<h1 className="text-center">Trackpath</h1>
			<div className="w-full border-t border-slate-600 my-6"></div>
			<div className="flex flex-col text-center gap-2">
				<NavLink
					to={"/"}
					className={({ isActive }) =>
						`${isActive ? "bg-(--accent)" : ""} p-2 w-full rounded hover:bg-(--accent-bg)`
					}
				>
					Dashboard
				</NavLink>
				<NavLink
					to={"/login"} // For test purpose later add
					className={({ isActive }) =>
						`${isActive ? "bg-(--accent)" : ""} p-2 w-full rounded hover:bg-(--accent-bg)`
					}
				>
					...
				</NavLink>
			</div>
			<div className="mt-auto mb-6 flex flex-col text-center gap-2">
				<div className="w-full border-t border-slate-600 my-2"></div>
				<NavLink
					to={"/login"} // For test purpose later add
					className={({ isActive }) =>
						`${isActive ? "bg-(--accent)" : ""} p-2 w-full rounded hover:bg-(--accent-bg)`
					}
				>
					Profile
				</NavLink>
				<button className="button-red">Logout</button>
			</div>
		</nav>
	);
};

export default Sidebar;
