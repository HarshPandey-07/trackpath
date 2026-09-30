import { apiClient } from "./apiClient.js";

export const dashboardStats = async (token, setToken) => {
	const application = await apiClient(
		"/api/applications/stats",
		token,
		setToken,
	);

	const interview = await apiClient("/api/interviews/stats", token, setToken);

	const applicationStats = application.stats;
	const interviewStats = interview.stats;

	return { applicationStats, interviewStats };
};

export const dashboardData = async (token, setToken) => {
	const applicationRes = await apiClient(
		"/api/applications?page=1&limit=2",
		token,
		setToken,
	);
	const interviewRes = await apiClient(
		"/api/interviews?page=1&limit=3",
		token,
		setToken,
	);

	const applications = applicationRes.data;
	const interviews = interviewRes.data;

	return { applications, interviews };
};
