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
			success: true,
			message: "Application created successfully",
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const readApplications = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		// How many documents to skip
		const skip = (page - 1) * limit;

		const user = req.user;
		const { applications, totalApplications } =
			await applicationService.findApplications(user, skip, limit);

		res.status(200).json({
			success: true,
			data: applications,
			totalApplications,
			currentPage: page,
			totalPages: Math.ceil(totalApplications / limit),
		});
	} catch (error) {
		next(error);
	}
};

export const readApplicationById = async (req, res, next) => {
	try {
		const user = req.user;
		const applicationId = req.params.id;

		const application = await applicationService.findApplicationById(
			user,
			applicationId,
		);

		res.status(200).json({
			success: true,
			data: application,
		});
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
			success: true,
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

		res.status(200).json({
			success: true,
			message: "Application deleted successfully",
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const applicationStats = async (req, res, next) => {
	try {
		const user = req.user;

		const stats = await applicationService.applicationsStats(user);

		res.status(200).json({
			success: true,
			stats,
		});
	} catch (error) {
		next(error);
	}
};
