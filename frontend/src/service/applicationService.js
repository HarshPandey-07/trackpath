export const getInterviews = async (applicationId, token) => {
	const res = await fetch(`/api/application/${applicationId}/interview`, {
		headers: { Authorization: `Bearer ${token}` },
	});

	const data = await res.json();
	return data;
};

export const addInterview = async (applicationId, interviewData, token) => {
	const res = await fetch(`/api/application/${applicationId}/interview`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(interviewData),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to add interview");
	}

	return data;
};
export const updateInterview = async (
	applicationId,
	interviewId,
	interviewData,
	token,
) => {
	const res = await fetch(
		`/api/application/${applicationId}/interview/${interviewId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(interviewData),
		},
	);

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to update interview");
	}

	return data;
};
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
