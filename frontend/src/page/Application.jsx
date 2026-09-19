import { Link } from "react-router-dom";

const Applications = () => {
  const applications = [
    {
      id: 1,
      company: "Google",
      role: "SDE Intern",
      type: "Internship",
      status: "Interview",
      appliedOn: "10 May 2025",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "SDE Intern",
      type: "Internship",
      status: "Assessment",
      appliedOn: "12 May 2025",
    },
    {
      id: 3,
      company: "TCS",
      role: "Developer",
      type: "Placement",
      status: "Applied",
      appliedOn: "15 May 2025",
    },
    {
      id: 4,
      company: "Infosys",
      role: "Systems Engineer",
      type: "Placement",
      status: "Assessment",
      appliedOn: "18 May 2025",
    },
    {
      id: 5,
      company: "Amazon",
      role: "SDE Intern",
      type: "Internship",
      status: "Interview",
      appliedOn: "20 May 2025",
    },
    {
      id: 6,
      company: "Deloitte",
      role: "Analyst Intern",
      type: "Internship",
      status: "Applied",
      appliedOn: "22 May 2025",
    },
    {
      id: 7,
      company: "Accenture",
      role: "ASE",
      type: "Placement",
      status: "Rejected",
      appliedOn: "23 May 2025",
    },
  ];

  return (
    <div className="space-y-6">
      {/* PAGE HEADING */}

      <div className="flex justify-between items-center">
        <h2>Applications</h2>

        <Link
          to="/application/add"
          className="bg-(--accent) text-white px-3 py-2 rounded hover:bg-(--accent-hover)"
        >
          + Add Application
        </Link>
      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="⌕  Search applications..."
          className="w-full md:flex-1 p-2 rounded border border-(--border) bg-(--cards) outline-none text-(--text-primary) focus:border-(--accent)"
        />

        <select className="w-full md:w-44 p-2 rounded border border-(--border) bg-(--cards) outline-none text-(--text-primary) focus:border-(--accent)">
          <option>All Status</option>
          <option>Applied</option>
          <option>Assessment</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* APPLICATION TABLE */}

      <div className="bg-(--cards) w-full p-4 space-y-2 rounded-xl border border-(--border) shadow-(--shadow) overflow-x-auto">
        <div className="min-w-[750px]">
          {/* TABLE HEADER */}

          <div className="flex gap-4 border-b border-(--border) pb-3">
            <h3 className="w-1/6 text-(--text-secondary)">Company</h3>

            <h3 className="w-1/6 text-(--text-secondary)">Role</h3>

            <h3 className="w-1/6 text-(--text-secondary)">Type</h3>

            <h3 className="w-1/6 text-(--text-secondary)">Status</h3>

            <h3 className="w-1/6 text-(--text-secondary)">Applied On</h3>

            <h3 className="w-1/6 text-(--text-secondary)">Action</h3>
          </div>

          {/* APPLICATIONS */}

          {applications.map((application) => (
            <div
              key={application.id}
              className="flex items-center gap-4 py-3 border-b border-(--border)"
            >
              <div className="w-1/6">
                <p>{application.company}</p>
              </div>

              <div className="w-1/6">
                <p>{application.role}</p>
              </div>

              <div className="w-1/6">
                <p>{application.type}</p>
              </div>

              <div className="w-1/6">
                <span
                  className={`
										px-2 py-1 rounded text-xs
										${
                      application.status === "Interview"
                        ? "bg-(--accent-bg) text-(--accent)"
                        : application.status === "Assessment"
                          ? "bg-(--accent-bg) text-(--accent)"
                          : application.status === "Applied"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                    }
									`}
                >
                  {application.status}
                </span>
              </div>

              <div className="w-1/6">
                <p>{application.appliedOn}</p>
              </div>

              <div className="w-1/6">
                <Link
                  to={`/application/${application.id}`}
                  className="text-(--text-secondary) hover:text-(--accent)"
                >
                  ⋮
                </Link>
              </div>
            </div>
          ))}

          {/* FOOTER */}

          <p className="pt-3 text-xs">
            Showing 1 to {applications.length} applications
          </p>
        </div>
      </div>
    </div>
  );
};

export default Applications;
