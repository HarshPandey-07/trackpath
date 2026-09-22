import { AuthContext } from "../context/AuthContext";
import { Plus, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../service/applicationService";
import { formatDateOnly } from "../utils/formatter.js";

const Applications = () => {
	const { token, setToken } = useContext(AuthContext);
	const [applications, setApplications] = useState(null);
	const [pageData, setPageData] = useState(null);

	useEffect(() => {
		const initializeData = async () => {
			try {
				const { applications, pageData } = await getApplications(
					token,
					setToken,
				);
				setApplications(applications);
				setPageData(pageData);
			} catch (error) {
				console.log(`Failed to load data ${error}`);
			}
		};
		initializeData();
	}, [token, setToken]);

	return (
		<div className="space-y-6">
			{/* PAGE HEADING */}

			<div className="flex justify-between items-center">
				<h2>Applications</h2>

				<Link
					to="/application/add"
					className="bg-(--accent) flex flex-row text-white px-3 py-2 rounded hover:bg-(--accent-hover)"
				>
					<span>
						<Plus />
					</span>
					<span>Add Application</span>
				</Link>
			</div>

			{/* SEARCH + FILTER */}

			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex flex-row gap-2 w-full md:flex-1 p-2 rounded border border-(--border) bg-(--cards) text-(--text-primary) focus:border-(--accent)">
					<span>
						<Search />
					</span>
					<input
						type="text"
						placeholder="Search applications..."
						className="outline-none w-full"
					/>
				</div>

				<select className="w-full md:w-44 p-2 rounded border border-(--border) bg-(--cards) outline-none text-(--text-primary) focus:border-(--accent)">
					<option>All Status</option>
					<option>Applied</option>
					<option>Shortlisted</option>
					<option>Interview</option>
					<option>Rejected</option>
					<option>Selected</option>
				</select>
			</div>

			{/* APPLICATION TABLE */}

			<div className="bg-(--cards) w-full p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow) overflow-x-auto">
				<div className="min-w-187.5">
					{/* TABLE HEADER */}

					<div className="flex gap-4 border-b border-(--border) pl-2 pb-3">
						<h3 className="w-1/4 text-(--text-secondary)">
							Company
						</h3>

						<h3 className="w-1/4 text-(--text-secondary)">Role</h3>

						<h3 className="w-1/4 text-(--text-secondary)">
							Status
						</h3>

						<h3 className="w-1/4 text-(--text-secondary)">Type</h3>

						<h3 className="w-1/4 text-(--text-secondary)">
							Applied On
						</h3>
					</div>

					{/* APPLICATIONS */}

					{applications?.length > 0 ? (
						applications.map((application) => (
							<Link
								to={`/application/${application._id}`}
								key={application._id}
								className="flex items-center text-(--text-primary) gap-4 pl-2 py-3 border-b rounded-xl border-(--border) hover:bg-(--bg) transition-all duration-150"
							>
								<div className="w-1/4">
									<p>{application.companyName}</p>
								</div>

								<div className="w-1/4">
									<p>{application.role}</p>
								</div>

								<div className="w-1/4">
									<span
										className={`
										px-2 py-1 rounded text-xs
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
								</div>

								<div className="w-1/4">
									<p>{application.type}</p>
								</div>

								<div className="w-1/4">
									<p>
										{formatDateOnly(
											application.appliedDate,
										)}
									</p>
								</div>
							</Link>
						))
					) : (
						<i>No Applications found</i>
					)}

					{/* FOOTER */}

					<p className="pt-3 text-xs">
						Showing {pageData?.currentPage} to{" "}
						{pageData?.totalPages} pages
					</p>
				</div>
			</div>
		</div>
	);
};

export default Applications;
