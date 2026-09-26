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

const ApplicationDetails = () => {
	const { id } = useParams();

	const { token, setToken } = useContext(AuthContext);
	const [application, setApplication] = useState(null);

	const navigate = useNavigate();

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
		</div>
	);
};

export default ApplicationDetails;
