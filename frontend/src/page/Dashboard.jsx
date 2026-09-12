import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StatCard from "../component/StatCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	return (
		<div className="space-y-10">
			<h2>Welcome back, {user.name} 👋</h2>

			{/* Stats for the user */}
			<div className="flex flex-col md:flex-row justify-center align-middle gap-2 md:gap-10">
				<StatCard title={"Total Applications"} value={25} />
				<StatCard title={"Interview"} value={5} />
				<StatCard title={"Offers"} value={1} />
				<StatCard title={"Active Applications"} value={18} />
			</div>

			{/* Deadlines section */}
			<div className="flex flex-col md:flex-row justify-center gap-10">
				{/* Interview deadlines */}
				<div className="bg-(--cards) min-w-64 w-96 p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow)">
					<div className="flex justify-between">
						<h2>Upcoming Interviews</h2>
						<Link className="text-blue-500 hover:underline">
							View all
						</Link>
					</div>
					<div className="p-2 border-y border-(--border)">
						<h3>Google</h3>
						<h4>Software Engineer Intern - Technical round</h4>
						<p>25 May 2026, 10:00AM</p>
					</div>
				</div>

				{/* Applications deadlines */}
				<div className="bg-(--cards) min-w-64 w-96 p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow)">
					<div className="flex justify-between">
						<h2>Upcoming Deadlines</h2>
						<Link className="text-blue-500 hover:underline">
							View all
						</Link>
					</div>
					<div className="p-2 border-y border-(--border)">
						<h3>Google</h3>
						<p>25 May 2026</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
