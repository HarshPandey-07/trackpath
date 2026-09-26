import { apiClient } from "./apiClient.js";

export const getApplications = async (page, token, setToken) => {
	const applicationRes = await apiClient(
		`/api/applications?page=${page}&limit=7`,
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

export const removeApplication = async (token, setToken, applicationId) => {
	await apiClient(`/api/applications/${applicationId}`, token, setToken, {
		method: "DELETE",
	});
};

export const submitApplication = async (
	token,
	setToken,
	id,
	isEditMode,
	formData,
) => {
	const url = isEditMode ? `/api/applications/${id}` : "/api/applications";
	const method = isEditMode ? "PUT" : "POST";
	await apiClient(url, token, setToken, {
		method: method,
		body: JSON.stringify(formData),
	});

	return isEditMode
		? "Application edited successfully!"
		: "Application added successfully!";
};
