import Application from "../model/Application.js";

// Create Application
export const createApplication = async (user, applicationData) => {
	return await Application.create({
		...applicationData,
		userId: user.userId,
	});
};

// Get all applications
export const findApplications = async (user) => {
	return await Application.find({
		userId: user.userId,
	});
};

// Update application
export const updateApplication = async (user, id, updatedData) => {
	return await Application.findOneAndUpdate(
		{ _id: id, userId: user.userId },
		updatedData,
		{
			new: true,
			runValidators: true,
		},
	);
};

// Delete application
export const deleteApplication = async (user, id) => {
	return await Application.findOneAndDelete({
		_id: id,
		userId: user.userId,
	});
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
