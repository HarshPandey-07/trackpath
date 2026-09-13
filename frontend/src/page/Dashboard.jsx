import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StatCard from "../component/StatCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const interviews = [
		// Mock data
		{
			id: 1,
			company: "Google",
			role: "Software Engineer Intern",
			round: "Technical round",
			date: "25 May 2026, 10:00AM",
		},
		{
			id: 2,
			company: "Amazon",
			role: "SDE Intern",
			round: "HR round",
			date: "20 Sep 2026, 02:00PM",
		},
	];
	const deadlines = [
		// Mock data
		{
			id: 1,
			name: "Deloitte Application",
			date: "25 May 2026",
		},
		{
			id: 2,
			name: "Flipkart Online Test",
			date: "20 Sep 2026",
		},
	];
	const applications = [
		// Mock data
		{
			id: 1,
			company: "TCS",
			role: "Developer",
			status: "Applied",
			appliedOn: "10 May 2026",
		},
		{
			id: 2,
			company: "TCS",
			role: "Developer",
			status: "Applied",
			appliedOn: "10 May 2026",
		},
		{
			id: 3,
			company: "TCS",
			role: "Developer",
			status: "Applied",
			appliedOn: "10 May 2026",
		},
		{
			id: 4,
			company: "TCS",
			role: "Developer",
			status: "Applied",
			appliedOn: "10 May 2026",
		},
	];
	return (
		<div className="space-y-6">
			<h2>Welcome back, {user.name} 👋</h2>

			{/* Stats for the user */}
			<div className="flex flex-col md:flex-row justify-center align-middle gap-2 md:gap-6">
				<StatCard title={"Total Applications"} value={25} />
				<StatCard title={"Interview"} value={5} />
				<StatCard title={"Offers"} value={1} />
				<StatCard title={"Active Applications"} value={18} />
			</div>

			{/* Deadlines section */}
			<div className="flex flex-col md:flex-row justify-center items-start gap-6">
				{/* Interview deadlines */}
				<div className="bg-(--cards) md:w-96 p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow)">
					<div className="flex justify-between">
						<h2>Upcoming Interviews</h2>
						<Link className="text-blue-500 hover:underline">
							View all
						</Link>
					</div>
					{interviews.length !== 0 ? (
						interviews.map((interview) => (
							<div
								key={interview.id}
								className="p-0.5 md:p-1 border-b border-(--border)"
							>
								<h3>{interview.company}</h3>
								<h4>
									{interview.role} - {interview.round}
								</h4>
								<p>{interview.date}</p>
							</div>
						))
					) : (
						<i>No upcoming interviews</i>
					)}
				</div>

				{/* Applications deadlines */}
				<div className="bg-(--cards) md:w-96 p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow)">
					<div className="flex justify-between gap-4 md:gap-0">
						<h2>Upcoming Deadlines</h2>
						<Link className="text-blue-500 hover:underline">
							View all
						</Link>
					</div>
					{deadlines.length !== 0 ? (
						deadlines.map((deadline) => (
							<div
								key={deadline.id}
								className="p-0.5 md:p-1 border-b border-(--border)"
							>
								<h3>{deadline.name}</h3>
								<p>{deadline.date}</p>
							</div>
						))
					) : (
						<i>No upcoming applications deadlines</i>
					)}
				</div>
			</div>

			{/* Recent Applications */}
			<div className="bg-(--cards) w-full p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow)">
				<div className="flex justify-between">
					<h2>Recent Applications</h2>
					<Link className="text-blue-500 hover:underline">
						View all
					</Link>
				</div>

				<div className="flex gap-4">
					<h3 className="w-1/4 text-(--text-secondary)">Company</h3>
					<h3 className="w-1/4 text-(--text-secondary)">Role</h3>
					<h3 className="w-1/4 text-(--text-secondary)">Status</h3>
					<h3 className="w-1/4 text-(--text-secondary)">
						Applied On
					</h3>
				</div>
				<div className="border-b border-(--border) m-2"></div>
				{applications.length !== 0 ? (
					applications.map((application) => (
						<div key={application.id} className="flex gap-4">
							<h3 className="w-1/4">{application.company}</h3>
							<h3 className="w-1/4">{application.role}</h3>
							<h3 className="w-1/4">{application.status}</h3>
							<h3 className="w-1/4">{application.appliedOn}</h3>
						</div>
					))
				) : (
					<i>No recent applications</i>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
