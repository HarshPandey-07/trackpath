import { NavLink } from "react-router-dom";
const Sidebar = () => {
	return (
		<aside className="fixed left-0 top-0 h-dvh w-64 bg-(--sidebar)">
			TrackPath
			<div>
				<NavLink to={"/"}>Dashboard</NavLink>
			</div>
		</aside>
	);
};

export default Sidebar;
