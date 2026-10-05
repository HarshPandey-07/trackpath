import { apiClient } from "./apiClient";

export const getInterviews = async (page, applicationId, token, setToken) => {
	const interviewRes = await apiClient(
		`/api/interviews/${applicationId}?page=${page}&limit=2`,
		token,
		setToken,
	);

	const { data: interviews, ...pageData } = interviewRes;

	return { interviews, pageData };
};

export const submitInterview = async (
	token,
	setToken,
	id,
	isEditMode,
	formData,
) => {
	const url = isEditMode ? `/api/interviews/${id}` : "/api/interviews";
	const method = isEditMode ? "PUT" : "POST";
	const response = await apiClient(url, token, setToken, {
		method: method,
		body: JSON.stringify(formData),
	});

	return response;
};

export const removeInterview = async (token, setToken, interviewId) => {
	const response = await apiClient(
		`/api/interviews/${interviewId}`,
		token,
		setToken,
		{
			method: "DELETE",
		},
	);

	return response;
};
