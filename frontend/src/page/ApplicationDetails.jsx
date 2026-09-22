import { Link, useParams } from "react-router-dom";

const ApplicationDetails = () => {
  const { id } = useParams();

  const application = {
    id,
    company: "Google",
    role: "SDE Intern",
    type: "Internship",
    status: "Interview",
    appliedOn: "10 May 2025",
    jobLink: "https://careers.google.com/",
    notes: "Technical interview preparation is in progress.",
  };

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
          <h3>{application.company}</h3>
        </div>

        <div>
          <p className="text-(--text-secondary)">Role</p>
          <h3>{application.role}</h3>
        </div>

        <div>
          <p className="text-(--text-secondary)">Application Type</p>
          <h3>{application.type}</h3>
        </div>

        <div>
          <p className="text-(--text-secondary)">Status</p>
          <h3>{application.status}</h3>
        </div>

        <div>
          <p className="text-(--text-secondary)">Applied On</p>
          <h3>{application.appliedOn}</h3>
        </div>

        <div>
          <p className="text-(--text-secondary)">Job Link</p>
          <a
            href={application.jobLink}
            target="_blank"
            rel="noreferrer"
            className="text-(--accent) hover:underline"
          >
            View Job
          </a>
        </div>

        <div>
          <p className="text-(--text-secondary)">Notes</p>
          <p>{application.notes}</p>
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
