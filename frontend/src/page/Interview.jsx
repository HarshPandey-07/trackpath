import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllInterviews } from "../service/interviewService.js";
import { formatDateTime } from "../utils/formatter.js";

const Interview = () => {
	const { token, setToken } = useContext(AuthContext);
	const [interviews, setInterviews] = useState(null);
	const [pageData, setPageData] = useState(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const initializeData = async () => {
			try {
				const { interviews, pageData } = await getAllInterviews(
					page,
					token,
					setToken,
				);
				setInterviews(interviews);
				setPageData(pageData);
			} catch (error) {
				console.log(`Failed to load data ${error}`);
			}
		};
		initializeData();
	}, [page, token, setToken]);

	const pageForward = (e) => {
		e.preventDefault();
		if (pageData?.totalPages > page) setPage(page + 1);
	};
	const pageBackward = (e) => {
		e.preventDefault();
		if (page !== 0) setPage(page - 1);
	};

	return (
		<div className="space-y-6">
			{/* INTERVIEW TABLE */}

			<div className="bg-(--cards) w-full p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow) overflow-x-auto">
				<div className="min-w-187.5">
					{/* TABLE HEADER */}

					<div className="flex gap-4 border-b border-(--border) pl-2 pb-3">
						<h3 className="w-1/4 text-(--text-secondary)">
							Company
						</h3>

						<h3 className="w-1/4 text-(--text-secondary)">Role</h3>

						<h3 className="w-1/4 text-(--text-secondary)">Round</h3>

						<h3 className="w-1/4 text-(--text-secondary)">
							Date &amp; time
						</h3>

						<h3 className="w-1/4 text-(--text-secondary)">
							Status
						</h3>
					</div>

					{/* INTERVIEW */}

					{interviews?.length > 0 ? (
						interviews.map((interview) => (
							<Link
								to={`/application/${interview.application?._id}`}
								key={interview._id}
								className="flex items-center text-(--text-primary) gap-4 pl-2 py-3 border-b rounded-xl border-(--border) hover:bg-(--bg) transition-all duration-150"
							>
								<div className="w-1/4">
									<p>{interview.application?.companyName}</p>
								</div>

								<div className="w-1/4">
									<p>{interview.application?.role}</p>
								</div>

								<div className="w-1/4">
									<p>{interview.round}</p>
								</div>

								<div className="w-1/4">
									<p>{formatDateTime(interview.date)}</p>
								</div>

								<div className="w-1/4">
									<span
										className={`
                                        px-2 py-1 rounded text-xs
                                        ${
											interview.status === "Completed"
												? "bg-green-100 text-green-600"
												: interview.status ===
													  "Scheduled"
													? "bg-blue-100 text-blue-600"
													: "bg-red-100 text-red-500"
										}
                                    `}
									>
										{interview.status}
									</span>
								</div>
							</Link>
						))
					) : (
						<i>No Interviews found</i>
					)}

					{/* FOOTER */}

					<div className="flex justify-between pt-3 px-2">
						<p className="text-xs">
							Showing {pageData?.currentPage} of{" "}
							{pageData?.totalPages} pages
						</p>
						<div className="flex justify-between gap-4">
							<button
								onClick={pageBackward}
								className={`no-design-button text-blue-500! cursor-pointer hover:underline ${page === 1 ? "hidden" : ""}`}
							>
								Previous
							</button>
							<button
								onClick={pageForward}
								className={`no-design-button text-blue-500! cursor-pointer hover:underline ${pageData?.totalPages === page || pageData?.totalPages === 0 ? "hidden" : ""}`}
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Interview;
