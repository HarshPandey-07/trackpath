import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppLayout = () => {
	const { showSidebar } = useContext(AuthContext);
	return (
		<div className="min-h-screen">
			<Sidebar />
			<main
				className={`${showSidebar ? "md:ml-64" : "md:mx-20"} min-h-screen mt-8 md:mt-0 p-6 transition-all duration-150`}
			>
				<Outlet />
			</main>
		</div>
	);
};

export default AppLayout;
