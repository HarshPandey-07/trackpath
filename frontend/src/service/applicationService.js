import { apiClient } from "./apiClient.js";

export const getApplications = async (token, setToken) => {
	const applicationRes = await apiClient(
		"/api/applications?page=1&limit=7",
		token,
		setToken,
	);

	const { data: applications, ...pageData } = applicationRes;

	return { applications, pageData };
};

export const getApplicationById = async (token, setToken, applicationId) => {
	const applicationRes = await apiClient(
		`/api/applications/${applicationId}`,
		token,
		setToken,
	);

	const application = applicationRes.data;

	return application;
};
