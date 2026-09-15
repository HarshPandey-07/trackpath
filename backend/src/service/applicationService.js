import Application from "../model/Application.js";

// Create Application
export const createApplication = async (applicationData) => {
	return await Application.create(applicationData);
};

export const findApplications = async () => {
	return await Application.find();
};

export const updateApplication = async (id, updatedData) => {
	return await Application.findByIdAndUpdate(id, updatedData, {
		new: true,
		runValidators: true,
	});
};

export const deleteApplication = async (id) => {
	return await Application.findByIdAndDelete(id);
};
