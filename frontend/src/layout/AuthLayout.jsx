import { Outlet } from "react-router-dom";

const AppLayout = () => {
	return (
		<div className="h-dvh w-dvw flex justify-center align-middle px-40 py-30">
			<Outlet />
		</div>
	);
};

export default AppLayout;
