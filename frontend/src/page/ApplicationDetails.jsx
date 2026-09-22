import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getApplicationById } from "../service/applicationService";
import { AuthContext } from "../context/AuthContext";
import { formatDateOnly } from "../utils/formatter";

const ApplicationDetails = () => {
	const { id } = useParams();

	const { token, setToken } = useContext(AuthContext);
	const [application, setApplication] = useState(null);

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

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2>Application Details</h2>

				<Link
					to="/application"
					className="text-(--text-secondary) hover:text-(--accent)"
				>
					← Back
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
						className={`${application?.applicationLink !== null && "hidden"} text-(--accent) hover:underline`}
					>
						View Job
					</a>
				</div>

				<div>
					<p className="text-(--text-secondary)">Notes</p>
					<p>{application?.notes}</p>
				</div>
			</div>

			<div className="flex gap-3">
				<Link
					to={`/application/add`}
					className="bg-(--accent) text-white px-4 py-2 rounded hover:bg-(--accent-hover)"
				>
					Edit Application
				</Link>

				<Link
					to="/application"
					className="px-4 py-2 rounded border border-(--border) hover:bg-(--accent-bg)"
				>
					Back to Applications
				</Link>
			</div>
		</div>
	);
};

export default ApplicationDetails;
