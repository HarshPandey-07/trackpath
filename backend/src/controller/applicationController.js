import * as applicationService from "../service/applicationService.js";

export const createApplication = async (req, res, next) => {
	try {
		const body = req.body;
		const user = req.user;

		// Empty body check
		if (!body || Object.keys(body).length === 0) {
			const error = new Error("Invalid request");
			error.statusCode = 400;
			throw error;
		}

		const data = await applicationService.createApplication(user, body);

		res.status(201).json({
			message: "Application created successfully",
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const readApplications = async (req, res, next) => {
	try {
		const user = req.user;
		const data = await applicationService.findApplications(user);

		res.status(201).json(data);
	} catch (error) {
		next(error);
	}
};

export const updateApplication = async (req, res, next) => {
	try {
		const applicationId = req.params.id;
		const body = req.body;
		const user = req.user;

		// Empty body check
		if (!body || Object.keys(body).length === 0) {
			const error = new Error("Invalid request");
			error.statusCode = 400;
			throw error;
		}

		const data = await applicationService.updateApplication(
			user,
			applicationId,
			body,
		);

		res.status(200).json({
			message: "Application updated successfully",
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteApplication = async (req, res, next) => {
	try {
		const applicationId = req.params.id;
		const user = req.user;

		const data = await applicationService.deleteApplication(
			user,
			applicationId,
		);

		res.status(201).json({
			message: "Application deleted successfully",
			data,
		});
	} catch (error) {
		next(error);
	}
};
