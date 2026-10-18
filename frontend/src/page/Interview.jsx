import { AuthContext } from "../context/AuthContext";
// import { Plus, Search } from "lucide-react"; // Read the comment below in search and filter section of this page
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
			{/* PAGE HEADING */}

			{/* In future we can add a feature for adding interview from here, by selecting from existing applications to link them */}

			{/* <div className="flex justify-between items-center">
				<h2>Interviews</h2>

				<Link
					to="/interview/add"
					className="bg-(--accent) flex flex-row text-white px-3 py-2 rounded hover:bg-(--accent-hover)"
				>
					<span>
						<Plus />
					</span>
					<span>Add Interview</span>
				</Link>
			</div> */}

			{/* SEARCH + FILTER */}

			{/* I'm keeping this code as a comment so that if the backend has these features it could be added easily */}

			{/* <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-row gap-2 w-full md:flex-1 p-2 rounded border border-(--border) bg-(--cards) text-(--text-primary) focus:border-(--accent)">
                    <span>
                        <Search />
                    </span>
                    <input
                        type="text"
                        placeholder="Search interviews..."
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
            </div> */}

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
