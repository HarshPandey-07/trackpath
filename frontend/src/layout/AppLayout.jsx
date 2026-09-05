import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";

const AppLayout = () => {
	return (
		<div className="min-h-screen">
			<Sidebar />
			<main className="ml-64 min-h-screen ">
				<Outlet />
			</main>
		</div>
	);
};

export default AppLayout;
