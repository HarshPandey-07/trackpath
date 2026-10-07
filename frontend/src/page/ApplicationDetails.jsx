import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getApplicationById,
	removeApplication,
} from "../service/applicationService";
import { AuthContext } from "../context/AuthContext";
import { formatDateOnly, formatDateTime } from "../utils/formatter";
import { ChevronLeftIcon, Pen, Plus, SavePlus, Trash, X } from "lucide-react";
import toast from "react-hot-toast";
import {
	getInterviews,
	removeInterview,
	submitInterview,
} from "../service/interviewService";

const ApplicationDetails = () => {
	const { id } = useParams();

	const { token, setToken } = useContext(AuthContext);
	const [application, setApplication] = useState(null);

	const navigate = useNavigate();

	const [pageData, setPageData] = useState(null);
	const [page, setPage] = useState(1);

	const [interviews, setInterviews] = useState(null);
	const [interviewVersion, setInterviewVersion] = useState(0);

	const [showInterview, setShowInterview] = useState(false);
	const [showInterviewOptions, setShowInterviewOptions] = useState(false);
	const [selectedInterview, setSelectedInterview] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [formData, setFormData] = useState({
		application: id,
		round: "",
		status: "Scheduled",
		date: undefined,
		interviewLink: "",
		notes: "",
	});
	const [time, setTime] = useState(undefined);

	useEffect(() => {
		// Application
		const initializeData = async () => {
			try {
				const application = await getApplicationById(
					token,
					setToken,
					id,
				);
				setApplication(application);
			} catch (error) {
				toast.error(`Failed to load data ${error}`);
			}
		};

		initializeData();
	}, [token, setToken, id]);

	useEffect(() => {
		// Application's -> Interviews
		const initializeInterviews = async () => {
			try {
				const { interviews, pageData } = await getInterviews(
					page,
					id,
					token,
					setToken,
				);

				setInterviews(interviews);
				setPageData(pageData);
			} catch (error) {
				toast.error(`Failed to load data ${error}`);
			}
		};

		initializeInterviews();
	}, [token, setToken, id, page, interviewVersion]);

	// Page navigation
	const pageForward = (e) => {
		e.preventDefault();
		if (pageData?.totalPages > page) setPage(page + 1);
	};
	const pageBackward = (e) => {
		e.preventDefault();
		if (page !== 0) setPage(page - 1);
	};

	// Remove this application
	const handleRemove = async (e) => {
		e.preventDefault();

		try {
			await removeApplication(token, setToken, application._id);

			toast.success("Application removed successfully");
			navigate("/application");
		} catch (error) {
			toast.error(`Something went wrong: ${error}`);
		}
	};

	// Handle changes of the field while adding interview
	const handleChangeInterview = async (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle changes of the time field while adding interview
	const handleTimeChangeInterview = async (e) => {
		setTime(e.target.value);
	};

	// Handle submit (edit/save) interview
	const handleSubmitInterview = async (e) => {
		e.preventDefault();

		try {
			const payload = {
				...formData,
				date:
					formData.date && time
						? `${formData.date}T${time}`
						: undefined,
			};
			const response = await submitInterview(
				token,
				setToken,
				selectedInterview?._id,
				isEditMode,
				payload,
			);

			setShowInterviewOptions(false);

			if (isEditMode) {
				setIsEditMode(false);
				setSelectedInterview(null);
			}

			setFormData({
				application: id,
				round: "",
				status: "Scheduled",
				date: undefined,
				interviewLink: "",
				notes: "",
			});

			setTime(undefined);

			setInterviewVersion((prev) => prev + 1);

			toast.success(response.message);
		} catch (error) {
			console.error("Failed to save interview:", error);
			toast.error(`Failed to save interview: ${error}`);
		}
	};

	// Remove interview
	const handleRemoveInterview = async (e) => {
		e.preventDefault();

		try {
			const response = await removeInterview(
				token,
				setToken,
				selectedInterview._id,
			);

			setShowInterview(false);
			setSelectedInterview(null);

			setInterviewVersion((prev) => prev + 1);

			if (interviews.length === 1 && page > 1) {
				setPage((prev) => prev - 1);
			} else {
				setInterviewVersion((prev) => prev + 1);
			}

			toast.success(response.message);
		} catch (error) {
			toast.error(`Error while deleting interview: ${error}`);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2>Application Details</h2>

				<Link
					to="/application"
					className="flex flex-row gap-1 p-2 rounded border border-(--border) hover:bg-(--accent-bg)"
				>
					<ChevronLeftIcon /> Back
				</Link>
			</div>

			<div className="bg-(--cards) w-full p-6 space-y-5 rounded-xl border border-(--border) shadow-(--shadow)">
				<div>
					<p className="text-(--text-secondary)">Company</p>
					<h3>{application?.companyName}</h3>
				</div>

				<div>
					<p className="text-(--text-secondary)">Role</p>
					<h3>{application?.role}</h3>
				</div>

				<div>
					<p className="text-(--text-secondary)">Status</p>
					<h3>{application?.status}</h3>
				</div>

				<div>
					<p className="text-(--text-secondary)">Type</p>
					<h3>{application?.type}</h3>
				</div>

				<div>
					<p className="text-(--text-secondary)">Applied On</p>
					<h3>{formatDateOnly(application?.appliedDate)}</h3>
				</div>

				<div>
					<p className="text-(--text-secondary)">Job Link</p>
					<a
						href={application?.applicationLink}
						target="_blank"
						rel="noreferrer"
						className={`${application?.applicationLink === null && "hidden"} text-(--accent) hover:underline`}
					>
						{application?.applicationLink}
					</a>
				</div>

				<div>
					<p className="text-(--text-secondary)">Notes</p>
					<p>{application?.notes}</p>
				</div>
			</div>

			<div className="flex gap-3">
				<Link
					to={`/application/edit/${id}`}
					className="bg-(--accent) flex flex-row gap-1 text-white p-2 rounded hover:bg-(--accent-hover)"
				>
					<Pen size={20} /> Edit
				</Link>

				<button
					onClick={handleRemove}
					className="button-red flex flex-row gap-1"
				>
					<Trash size={20} /> Delete
				</button>
			</div>
			<div className="bg-(--cards) w-full p-6 space-y-4 rounded-xl border border-(--border) shadow-(--shadow)">
				<div className="flex justify-between items-center">
					<h2>Interviews</h2>

					<button
						onClick={() =>
							setShowInterviewOptions(!showInterviewOptions)
						}
						className="no-design-button flex flex-row gap-1 border border-(--border) p-2! hover:text-(--accent)! hover:bg-(--accent-bg)!"
					>
						<Plus />
					</button>
				</div>

				{/* Interviews */}
				{interviews?.map((interview) => (
					<div
						key={interview._id}
						onClick={() => {
							setSelectedInterview(interview);
							setShowInterview(true);
						}}
						className="p-4 rounded-xl border border-(--border) cursor-pointer transition-all duration-200 hover:border-purple-600 hover:bg-(--accent-bg)"
					>
						<p>Round: {interview.round}</p>
					</div>
				))}

				{/* Footer */}
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

			{/* Add interview option */}
			{showInterviewOptions && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="w-full max-w-lg rounded-2xl border border-(--border) bg-(--cards) p-8 shadow-(--shadow) animate-[interviewOpen_0.15s_ease-out]">
						<div className="flex justify-between items-center">
							<h2>Interview</h2>
						</div>

						<div className="flex flex-col gap-2 mt-4">
							<div className="space-y-3">
								<input
									type="date"
									name="date"
									value={formData.date}
									onChange={handleChangeInterview}
									className="w-full p-3 rounded-lg border border-(--border)"
								/>

								<input
									type="time"
									name="time"
									value={time}
									onChange={handleTimeChangeInterview}
									className="w-full p-3 rounded-lg border border-(--border)"
								/>

								<input
									type="text"
									placeholder="Round"
									name="round"
									value={formData.round}
									onChange={handleChangeInterview}
									className="w-full p-3 rounded-lg border border-(--border)"
								/>

								<div className="flex gap-3 mt-6">
									<button
										onClick={handleSubmitInterview}
										className="no-design-button p-2! border border-(--border) transition-all duration-200 hover:border-purple-600 hover:bg-(--accent-bg)!"
									>
										{isEditMode ? <Pen /> : <SavePlus />}
									</button>
									<button
										onClick={() => {
											setShowInterviewOptions(false);
											setIsEditMode(false);
										}}
										className="no-design-button p-2! border border-(--border) transition-all duration-200 hover:border-red-600 hover:bg-(--accent-bg)!"
									>
										<X />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Show interviews */}
			{showInterview && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="w-full max-w-lg rounded-2xl border border-(--border) bg-(--cards) p-8 shadow-(--shadow) animate-[interviewOpen_0.15s_ease-out]">
						<div className="flex justify-between items-center">
							<h2>Interview</h2>
						</div>

						<div className="mt-5 space-y-3 rounded-xl border border-(--border) p-4">
							<h3>
								{selectedInterview.application?.companyName}
							</h3>
							<p>Role: {selectedInterview.application?.role}</p>
							<p>
								Date &amp; Time:{" "}
								{formatDateTime(selectedInterview.date)}
							</p>
							<p>Round: {selectedInterview.round}</p>
							<p>Status: {selectedInterview.status}</p>
							{selectedInterview.interviewLink && (
								<p>
									Interview Link:{" "}
									{selectedInterview.interviewLink}
								</p>
							)}
							{selectedInterview.notes && (
								<p>Interview Link: {selectedInterview.notes}</p>
							)}
						</div>

						<div className="flex gap-3 mt-6">
							<button
								onClick={() => {
									setIsEditMode(true);
									setShowInterview(false);
									setShowInterviewOptions(true);

									setFormData({
										application: id,
										round: selectedInterview.round,
										status: selectedInterview.status,
										date: selectedInterview.date.split(
											"T",
										)[0],
										interviewLink:
											selectedInterview.interviewLink,
										notes: selectedInterview.notes,
									});
									setTime(
										selectedInterview.date
											.split("T")[1]
											.slice(0, 10),
									);
								}}
								className="no-design-button p-2! border border-(--border) transition-all duration-200 hover:border-purple-600 hover:bg-(--accent-bg)!"
							>
								<Pen />
							</button>

							<button
								onClick={handleRemoveInterview}
								className="no-design-button p-2! border border-(--border) transition-all duration-200 hover:border-red-600 hover:bg-(--accent-bg)!"
							>
								<Trash />
							</button>

							<button
								onClick={() => setShowInterview(false)}
								className="no-design-button p-2! border border-(--border) transition-all duration-200 hover:border-amber-600 hover:bg-(--accent-bg)!"
							>
								<X />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ApplicationDetails;
