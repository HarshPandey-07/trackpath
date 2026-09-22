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

// Get application by id
export const findApplicationById = async (user, applicationId) => {
	const application = await Application.findOne({
		_id: applicationId,
		userId: user.userId, // User only gets their own data
	});

	return application;
};

// Update application
export const updateApplication = async (user, id, updatedData) => {
	const application = await Application.findOneAndUpdate(
		{ _id: id, userId: user.userId },
		updatedData,
		{
			returnDocument: "after",
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
export const applicationsStats = async (user) => {
	const [total, applied, shortlisted, interview, selected, rejected] =
		await Promise.all([
			Application.countDocuments({ userId: user.userId }),
			Application.countDocuments({
				userId: user.userId,
				status: "Applied",
			}),
			Application.countDocuments({
				userId: user.userId,
				status: "Shortlisted",
			}),
			Application.countDocuments({
				userId: user.userId,
				status: "Interview",
			}),
			Application.countDocuments({
				userId: user.userId,
				status: "Selected",
			}),
			Application.countDocuments({
				userId: user.userId,
				status: "Rejected",
			}),
		]);

	return { total, applied, shortlisted, interview, selected, rejected };
};
