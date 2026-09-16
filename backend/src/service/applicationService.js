import Application from "../model/Application.js";

// Create Application
export const createApplication = async (user, applicationData) => {
	return await Application.create({
		...applicationData,
		userId: user.userId,
	});
};

// Get all applications
export const findApplications = async (user, skip, limit) => {
	const applications = await Application.find({
		userId: user.userId, // User only gets their own data
	})
		.sort({ createdAt: -1 }) // Newest first
		.skip(skip)
		.limit(limit);

	const totalApplications = await Application.countDocuments({
		userId: user.userId,
	}); // Total applications

	return { applications, totalApplications };
};

// Update application
export const updateApplication = async (user, id, updatedData) => {
	const application = await Application.findOneAndUpdate(
		{ _id: id, userId: user.userId },
		updatedData,
		{
			new: true,
			runValidators: true,
		},
	);

	if (!application) {
		const error = new Error("Application not found");
		error.statusCode = 404;
		throw error;
	}

	return application;
};

// Delete application
export const deleteApplication = async (user, id) => {
	const application = await Application.findOneAndDelete({
		_id: id,
		userId: user.userId,
	});

	if (!application) {
		const error = new Error("Application not found");
		error.statusCode = 404;
		throw error;
	}

	return application;
};

// Dashboard stats
export const totalApplications = async (user) => {
	return await Application.countDocuments({
		userId: user.userId,
	});
};

export const appliedApplications = async (user) => {
	return await Application.countDocuments({
		userId: user.userId,
		status: "Applied",
	});
};

export const shortlistedApplications = async (user) => {
	return await Application.countDocuments({
		userId: user.userId,
		status: "Shortlisted",
	});
};

export const interviewApplications = async (user) => {
	return await Application.countDocuments({
		userId: user.userId,
		status: "Interview",
	});
};

export const selectedApplications = async (user) => {
	return await Application.countDocuments({
		userId: user.userId,
		status: "Selected",
	});
};
