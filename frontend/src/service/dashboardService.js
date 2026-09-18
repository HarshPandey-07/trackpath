import { apiClient } from "./apiClient.js";

export const dashboardStats = async (token, setToken) => {
	const application = await apiClient(
		"/api/applications/stats",
		token,
		setToken,
		{ method: "GET" },
	);

	const interview = await apiClient(
		"/api/interviews/stats",
		token,
		setToken,
		{ method: "GET" },
	);

	const applicationStats = application.stats;
	const interviewStats = interview.stats;

	return { applicationStats, interviewStats };
};
