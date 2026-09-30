import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {
  getInterviews,
  addInterview,
  updateInterview,
} from "../service/applicationService";
const ApplicationDetails = () => {
  const { token } = useContext(AuthContext);
  const [showInterview, setShowInterview] = useState(false);
  const [showInterviewOptions, setShowInterviewOptions] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isEditingInterview, setEditingInterview] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("");

  const [interviews, setInterviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getInterviews(id , token);
        setInterviews(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInterviews();
  }, [id , token]);

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
      <div className="bg-(--cards) w-full p-6 space-y-4 rounded-xl border border-(--border) shadow-(--shadow)">
        <div className="flex justify-between items-center">
          <h2>Interview</h2>

          <button
            onClick={() => setShowInterviewOptions(!showInterviewOptions)}
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

                    const data = await getInterviews(id, token);
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
                    console.error("Interview save error:", error);
                  }
                }}
                className="bg-(--accent) text-white px-4 py-2 rounded-lg hover:bg-(--accent-hover)"
              >
                {isEditingInterview ? "Update Interview" : "Save Interview"}
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
                  setCompanyName(selectedInterview.companyName);
                  setRole(selectedInterview.role);
                  setDate(selectedInterview.date?.split("T")[0] || "");
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
