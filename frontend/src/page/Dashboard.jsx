import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import StatCard from "../component/StatCard";
import { Link } from "react-router-dom";
import { dashboardData, dashboardStats } from "../service/dashboardService";
import { formatDateOnly, formatDateTime } from "../utils/formatter.js";

const Dashboard = () => {
	const { user, token, setToken } = useContext(AuthContext);
	const [applicationStats, setApplicationStats] = useState(null);
	const [interviewStats, setInterviewStats] = useState(null);

	const [applications, setApplications] = useState(null);
	const [interviews, setInterviews] = useState(null);

	useEffect(() => {
		const initializeStats = async () => {
			try {
				const { applicationStats, interviewStats } =
					await dashboardStats(token, setToken);
				setApplicationStats(applicationStats);
				setInterviewStats(interviewStats);
			} catch (error) {
				console.log(`Failed to load dashboard stats ${error}`);
			}
		};

		const initializeData = async () => {
			try {
				const { applications, interviews } = await dashboardData(
					token,
					setToken,
				);
				setApplications(applications);
				setInterviews(interviews);
			} catch (error) {
				console.log(`Failed to load dashboard data ${error}`);
			}
		};

		initializeStats();
		initializeData();
	}, [token, setToken]);

	return (
		<div className="space-y-6">
			<h2>Welcome back, {user.name} 👋</h2>

			{/* Stats for the user */}
			<div className="flex flex-col md:flex-row justify-center align-middle gap-2 md:gap-6">
				<StatCard
					title={"Total Applications"}
					value={applicationStats?.total}
				/>
				<StatCard title={"Interview"} value={interviewStats?.total} />
				<StatCard title={"Offers"} value={applicationStats?.selected} />
				<StatCard
					title={"Active Applications"}
					value={applicationStats?.applied}
				/>
			</div>

			{/* Deadlines section */}
			<div className="flex flex-col md:flex-row justify-center items-start gap-6">
				{/* Interview deadlines */}
				<div className="bg-(--cards) md:w-96 p-4 space-y-1 rounded-xl border border-(--border) shadow-(--shadow)">
					<div className="flex justify-between gap-4 md:gap-0">
						<h2>Upcoming Interviews</h2>
						<Link className="text-blue-500 hover:underline">
							View all
						</Link>
					</div>
					{interviews?.length > 0 ? (
						interviews.map((interview) => (
							<div
								key={interview._id}
								className="p-0.5 md:p-1 border-b border-(--border)"
							>
								<h3>{interview.application?.companyName}</h3>
								<h4>
									{interview.application?.role} -{" "}
									{interview.round}
								</h4>
								<p>{formatDateTime(interview.date)}</p>
							</div>
						))
					) : (
						<i>No upcoming interviews</i>
					)}
				</div>

				{/* Applications deadlines */}
				<div className="bg-(--cards) md:w-96 p-4 space-y-1 rounded-xl border border-(--border) shadow-(--shadow)">
					<div className="flex justify-between gap-4 md:gap-0">
						<h2>Upcoming Deadlines</h2>
						<Link
							to={"/application"}
							className="text-blue-500 hover:underline"
						>
							View all
						</Link>
					</div>
					{applications?.length > 0 ? (
						applications.map((application) => (
							<div
								key={application._id}
								className="p-0.5 md:p-1 border-b border-(--border)"
							>
								<h3>{application.companyName}</h3>
								<p>{formatDateOnly(application.appliedDate)}</p>
							</div>
						))
					) : (
						<i>No upcoming applications deadlines</i>
					)}
				</div>
			</div>

			{/* Recent Applications */}
			<div className="bg-(--cards) w-full p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow) overflow-auto">
				<div className="min-w-187.5">
					<div className="flex justify-between">
						<h2>Recent Applications</h2>
						<Link
							to={"/application"}
							className="text-blue-500 hover:underline"
						>
							View all
						</Link>
					</div>

					<div className="flex gap-4">
						<h3 className="w-1/4 text-(--text-secondary)">
							Company
						</h3>
						<h3 className="w-1/4 text-(--text-secondary)">Role</h3>
						<h3 className="w-1/4 text-(--text-secondary)">
							Status
						</h3>
						<h3 className="w-1/4 text-(--text-secondary)">
							Applied Date
						</h3>
					</div>
					<div className="border-b border-(--border) m-2"></div>
					{applications?.length > 0 ? (
						applications.map((application) => (
							<div
								key={application._id}
								className="flex gap-4 space-y-2"
							>
								<h3 className="w-1/4">
									{application.companyName}
								</h3>
								<h3 className="w-1/4">{application.role}</h3>
								<h3 className="w-1/4">
									<span
										className={`w-1/4 px-2 py-1 rounded
										${
											application.status === "Selected"
												? "bg-green-100 text-green-600"
												: application.status ===
													  "Interview"
													? "bg-(--accent-bg) text-(--accent)"
													: application.status ===
														  "Shortlisted"
														? "bg-amber-200 text-amber-600"
														: application.status ===
															  "Applied"
															? "bg-blue-100 text-blue-600"
															: "bg-red-100 text-red-500"
										}
									`}
									>
										{application.status}
									</span>
								</h3>
								<h3 className="w-1/4">
									{formatDateOnly(application.appliedDate)}
								</h3>
							</div>
						))
					) : (
						<i>No recent applications</i>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
