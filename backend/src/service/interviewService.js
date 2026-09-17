import Interview from "../model/Interview.js";

// Create Interview
export const createInterview = async (user, interviewData) => {
	return await Interview.create({
		...interviewData,
		userId: user.userId,
	});
};

// Find all interviews of user
export const findAll = async (user, skip, limit) => {
	const interviews = await Interview.find({
		userId: user.userId,
	})
		.populate("application", "companyName role") // Pulls these fields from Application
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);

	const totalInterviews = await Interview.countDocuments({
		userId: user.userId,
	});

	return { interviews, totalInterviews };
};

// Find all interviews of the application
export const findByApplication = async (user, applicationId, skip, limit) => {
	const query = {
		userId: user.userId,
		application: applicationId,
	};
	const interviews = await Interview.find(query)
		.populate("application", "companyName role")
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);

	const totalInterviews = await Interview.countDocuments(query);

	return { interviews, totalInterviews };
};

// Update interview
export const updateInterview = async (user, interviewId, updatedData) => {
	const interview = await Interview.findOneAndUpdate(
		{ _id: interviewId, userId: user.userId },
		updatedData,
		{
			new: true,
			runValidators: true,
		},
	);

	if (!interview) {
		const error = new Error("Interview not found");
		error.statusCode = 404;
		throw error;
	}

	return interview;
};

// Delete interview
export const deleteInterview = async (user, interviewId) => {
	const interview = await Interview.findOneAndDelete({
		_id: interviewId,
		userId: user.userId,
	});

	if (!interview) {
		const error = new Error("Interview not found");
		error.statusCode = 404;
		throw error;
	}

	return interview;
};

// Dashboard stats
export const interviewStats = async (user) => {
	const [total, scheduled, completed, canceled] = await Promise.all([
		Interview.countDocuments({ userId: user.userId }),
		Interview.countDocuments({
			userId: user.userId,
			status: "Scheduled",
		}),
		Interview.countDocuments({
			userId: user.userId,
			status: "Completed",
		}),
		Interview.countDocuments({
			userId: user.userId,
			status: "Canceled",
		}),
	]);

	return { total, scheduled, completed, canceled };
};
