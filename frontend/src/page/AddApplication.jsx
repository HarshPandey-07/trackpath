import { Link } from "react-router-dom";

const AddApplication = () => {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2>Add Application</h2>
					<p>Add a new job or internship application.</p>
				</div>

				<Link
					to="/application"
					className="p-2 rounded border border-(--border) hover:bg-(--accent-bg)"
				>
					Back
				</Link>
			</div>

			<div className="bg-(--cards) w-full max-w-3xl p-6 rounded-xl border border-(--border) shadow-(--shadow)">
				<form className="space-y-4">
					<div>
						<label className="block mb-1">Company Name</label>
						<input
							type="text"
							placeholder="Enter company name"
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Job Role</label>
						<input
							type="text"
							placeholder="Enter job role"
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						/>
					</div>

					<div className="flex flex-col md:flex-row gap-4">
						<div className="w-full">
							<label className="block mb-1">
								Application Type
							</label>
							<select className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none">
								<option>Internship</option>
								<option>Placement</option>
								<option>Full Time</option>
							</select>
						</div>

						<div className="w-full">
							<label className="block mb-1">Status</label>
							<select className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none">
								<option>Applied</option>
								<option>Assessment</option>
								<option>Interview</option>
								<option>Rejected</option>
								<option>Selected</option>
							</select>
						</div>
					</div>

					<div>
						<label className="block mb-1">Applied On</label>
						<input
							type="date"
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Job Link</label>
						<input
							type="url"
							placeholder="https://example.com/job"
							className="w-full p-2 rounded border border-(--border) bg-(--bg) text-(--text-primary) outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Notes</label>
						<textarea
							rows="4"
							placeholder="Add notes..."
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
							type="button"
							className="bg-(--accent) text-(--text-primary) px-4 py-2 rounded hover:bg-(--accent-hover)"
						>
							Save Application
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddApplication;
