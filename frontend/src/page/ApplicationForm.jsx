import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	getApplicationById,
	submitApplication,
} from "../service/applicationService.js";
import toast from "react-hot-toast";
import { ChevronLeftIcon, Pen } from "lucide-react";

const ApplicationForm = () => {
	const { id } = useParams();
	const isEditMode = Boolean(id);

	const { token, setToken } = useContext(AuthContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		companyName: "",
		role: "",
		type: "Internship",
		status: "Applied",
		appliedDate: undefined,
		applicationLink: "",
		notes: "",
	});

	const [loading, setLoading] = useState(isEditMode);

	useEffect(() => {
		if (isEditMode) {
			async function fetchApplication() {
				try {
					const application = await getApplicationById(
						token,
						setToken,
						id,
					);

					setFormData({
						companyName: application.companyName || "",
						role: application.role || "",
						type: application.type || "Internship",
						status: application.status || "Applied",
						appliedDate: application.appliedDate
							? application.appliedDate.split("T")[0]
							: undefined,
						applicationLink: application.applicationLink || "",
						notes: application.notes || "",
					});
				} catch (error) {
					console.log("Error: ", error);
				} finally {
					setLoading(false);
				}
			}
			fetchApplication();
		}
	}, [isEditMode, id, token, setToken]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await submitApplication(
				token,
				setToken,
				id,
				isEditMode,
				formData,
			);

			toast.success(response);

			navigate("/application");
		} catch (error) {
			console.log("Error while trying to submitting application", error);
			toast.error(
				"Something went wrong. Please try again with correct values",
			);
		}
	};

	if (loading) {
		return (
			<div className="p-6 text-(--text-primary)">
				Loading application details...
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2>
						{isEditMode ? "Edit Application" : "Add Application"}
					</h2>
					{isEditMode === false && (
						<p>Add a new job or internship application.</p>
					)}
				</div>

				<Link
					to="/application"
					className="flex flex-row gap-1 p-2 rounded border border-(--border) hover:bg-(--accent-bg)"
				>
					<ChevronLeftIcon /> Back
				</Link>
			</div>

			<div className="bg-(--cards) w-full max-w-3xl p-6 rounded-xl border border-(--border) shadow-(--shadow)">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-1">Company Name</label>
						<input
							type="text"
							name="companyName"
							value={formData.companyName}
							onChange={handleChange}
							placeholder="Enter company name"
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Job Role</label>
						<input
							type="text"
							name="role"
							value={formData.role}
							onChange={handleChange}
							placeholder="Enter job role"
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						/>
					</div>

					<div className="flex flex-col md:flex-row gap-4">
						<div className="w-full">
							<label className="block mb-1">
								Application Type
							</label>
							<select
								name="type"
								value={formData.type}
								onChange={handleChange}
								className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
							>
								<option>Internship</option>
								<option>Placement</option>
							</select>
						</div>

						<div className="w-full">
							<label className="block mb-1">Status</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleChange}
								className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
							>
								<option>Applied</option>
								<option>Shortlisted</option>
								<option>Rejected</option>
								<option>Selected</option>
							</select>
						</div>
					</div>

					<div>
						<label className="block mb-1">Applied On</label>
						<input
							type="date"
							name="appliedDate"
							value={formData.appliedDate}
							onChange={handleChange}
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Job Link</label>
						<input
							type="url"
							name="applicationLink"
							value={formData.applicationLink}
							onChange={handleChange}
							placeholder="https://example.com/job (optional)"
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Notes</label>
						<textarea
							rows="4"
							name="notes"
							value={formData.notes}
							onChange={handleChange}
							placeholder="Add notes... (optional)"
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						></textarea>
					</div>

					<div className="flex justify-end gap-3 pt-2">
						<Link
							to="/application"
							className="p-2 rounded border border-(--border) hover:bg-(--accent-bg)"
						>
							Cancel
						</Link>

						<button
							type="submit"
							className="bg-(--accent) text-(--text-primary) px-4 py-2 rounded hover:bg-(--accent-hover)"
						>
							{isEditMode ? (
								<span className="flex flex-row">
									<Pen size={20} />
									Edit
								</span>
							) : (
								"Save Application"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ApplicationForm;
