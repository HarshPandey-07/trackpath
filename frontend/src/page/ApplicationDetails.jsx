import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getApplicationById,
	removeApplication,
} from "../service/applicationService";
import { AuthContext } from "../context/AuthContext";
import { formatDateOnly } from "../utils/formatter";
import { ChevronLeftIcon, Pen, Trash } from "lucide-react";
import toast from "react-hot-toast";
import {
	getInterviews,
	addInterview,
	updateInterview,
} from "../service/applicationService";

const ApplicationDetails = () => {
	const { id } = useParams();

	const { token, setToken } = useContext(AuthContext);
	const [application, setApplication] = useState(null);

	const navigate = useNavigate();

	const [showInterview, setShowInterview] = useState(false);
	const [showInterviewOptions, setShowInterviewOptions] = useState(false);
	const [selectedInterview, setSelectedInterview] = useState(null);
	const [isEditingInterview, setEditingInterview] = useState(false);
	const [companyName, setCompanyName] = useState("");
	const [role, setRole] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [mode, setMode] = useState("");

	const interviews = [
		{
			companyName: "Google",
			role: "Dev",
			date: "Date",
			time: "Time",
			mode: "Mode",
		},
	];

	useEffect(() => {
		const initializeData = async () => {
			try {
				const application = await getApplicationById(
					token,
					setToken,
					id,
				);
				setApplication(application);
			} catch (error) {
				console.log(`Failed to load data ${error}`);
			}
		};
		initializeData();
	}, [token, setToken, id]);

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

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2>Application Details</h2>

				<Link
					to="/application"
					className="flex flex-row text-(--text-secondary) hover:text-(--accent)"
				>
					<ChevronLeftIcon /> <span>Back</span>
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
					<h2>Interview</h2>

					<button
						onClick={() =>
							setShowInterviewOptions(!showInterviewOptions)
						}
						className="text-(--accent) hover:underline"
					>
						Add Interview
					</button>
				</div>
				{interviews.map((interview) => (
					<div
						key={interview._id}
						className="p-4 rounded-xl border border-(--border)"
					>
						<h3>{interview.companyName}</h3>

						<p>Role: {interview.role}</p>

						<p>Date: {interview.date}</p>

						<p>Time: {interview.time}</p>

						<p>Mode: {interview.mode}</p>

						<button
							onClick={() => {
								setSelectedInterview(interview);
								setShowInterview(true);
							}}
							className="text-(--accent) hover:underline mt-2"
						>
							View Interview
						</button>
					</div>
				))}
				{showInterviewOptions && (
					<div className="flex flex-col gap-2 mt-4">
						<div className="space-y-3">
							<input
								placeholder="Company Name"
								value={companyName}
								onChange={(e) => setCompanyName(e.target.value)}
								className="w-full p-3 rounded-lg border border-(--border)"
							/>

							<input
								placeholder="Role"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className="w-full p-3 rounded-lg border border-(--border)"
							/>

							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className="w-full p-3 rounded-lg border border-(--border)"
							/>

							<input
								type="time"
								value={time}
								onChange={(e) => setTime(e.target.value)}
								className="w-full p-3 rounded-lg border border-(--border)"
							/>

							<input
								placeholder="Mode"
								value={mode}
								onChange={(e) => setMode(e.target.value)}
								className="w-full p-3 rounded-lg border border-(--border)"
							/>

							<button
								onClick={async () => {
									try {
										if (isEditingInterview) {
											await updateInterview(
												id,
												selectedInterview._id,
												{
													companyName,
													role,
													date,
													time,
													mode,
												},
												token,
											);
										} else {
											await addInterview(
												id,
												{
													companyName,
													role,
													date,
													time,
													mode,
												},
												token,
											);
										}

										const data = await getInterviews(
											id,
											token,
										);
										setInterviews(data.data || []);

										setShowInterviewOptions(false);
										setEditingInterview(false);
										setSelectedInterview(null);

										setCompanyName("");
										setRole("");
										setDate("");
										setTime("");
										setMode("");
									} catch (error) {
										console.error(
											"Interview save error:",
											error,
										);
									}
								}}
								className="bg-(--accent) text-white px-4 py-2 rounded-lg hover:bg-(--accent-hover)"
							>
								{isEditingInterview
									? "Update Interview"
									: "Save Interview"}
							</button>
						</div>
					</div>
				)}
			</div>

			{showInterview && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
					<div className="w-full max-w-lg rounded-2xl border border-(--border) bg-(--cards) p-8 shadow-(--shadow) animate-[interviewOpen_0.15s_ease-out]">
						<div className="flex justify-between items-center">
							<h2>Interview</h2>
						</div>

						<div className="mt-5 space-y-3 rounded-xl border border-(--border) p-4">
							<h3>{selectedInterview.companyName}</h3>
							<p>Role: {selectedInterview.role}</p>
							<p>Date: {selectedInterview.date}</p>
							<p>Time: {selectedInterview.time}</p>
							<p>Mode: {selectedInterview.mode}</p>
						</div>

						<div className="flex gap-3 mt-6">
							<button
								onClick={() => {
									setCompanyName(
										selectedInterview.companyName,
									);
									setRole(selectedInterview.role);
									setDate(
										selectedInterview.date?.split("T")[0] ||
											"",
									);
									setTime(selectedInterview.time);
									setMode(selectedInterview.mode);

									setEditingInterview(true);

									setShowInterview(false);
									setShowInterviewOptions(true);
								}}
								className="bg-(--accent) text-white px-4 py-2 rounded-lg hover:bg-(--accent-hover)"
							>
								Edit Interview
							</button>

							<button
								onClick={() => setShowInterview(false)}
								className="px-4 py-2 rounded-lg border border-(--border) hover:bg-(--accent-bg)"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ApplicationDetails;
