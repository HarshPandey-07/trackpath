export const getInterviews = async (applicationId , token) => {
	const res = await fetch(`/api/application/${applicationId}/interview`);
 headers:{
    Authorization:'Bearer ${token}' 
 }
	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to fetch interviews");
	}

	return data;
};

export const addInterview = async (applicationId, interviewData , token) => {
	const res = await fetch(`/api/application/${applicationId}/interview`, {
		method: "POST",
		headers: { "Content-Type": "application/json",
      Authorization:'Bearer ${token }',
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
  token
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
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update interview");
  }

  return data;
};