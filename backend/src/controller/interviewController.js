import * as interviewService from "../service/interviewService.js";

export const createInterview = async (req, res, next) => {
	try {
		const body = req.body;
		const user = req.user;

		// Empty body check
		if (!body || Object.keys(body).length === 0) {
			const error = new Error("Invalid request");
			error.statusCode = 400;
			throw error;
		}

		const data = await interviewService.createInterview(user, body);

		res.status(201).json({
			success: true,
			message: "Interview created successfully",
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const findAll = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		// How many documents to skip
		const skip = (page - 1) * limit;

		const user = req.user;
		const { interviews, totalInterviews } = await interviewService.findAll(
			user,
			skip,
			limit,
		);

		res.status(200).json({
			success: true,
			data: interviews,
			totalInterviews,
			currentPage: page,
			totalPages: Math.ceil(totalInterviews / limit),
		});
	} catch (error) {
		next(error);
	}
};

export const findByApplication = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		// How many documents to skip
		const skip = (page - 1) * limit;

		const user = req.user;
		const applicationId = req.params.id;
		const { interviews, totalInterviews } =
			await interviewService.findByApplication(
				user,
				applicationId,
				skip,
				limit,
			);

		res.status(200).json({
			success: true,
			data: interviews,
			totalInterviews,
			currentPage: page,
			totalPages: Math.ceil(totalInterviews / limit),
		});
	} catch (error) {
		next(error);
	}
};

export const updateInterview = async (req, res, next) => {
	try {
		const interviewId = req.params.id;
		const body = req.body;
		const user = req.user;

		// Empty body check
		if (!body || Object.keys(body).length === 0) {
			const error = new Error("Invalid request");
			error.statusCode = 400;
			throw error;
		}

		const data = await interviewService.updateInterview(
			user,
			interviewId,
			body,
		);

		res.status(200).json({
			success: true,
			message: "Interview updated successfully",
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteInterview = async (req, res, next) => {
	try {
		const interviewId = req.params.id;
		const user = req.user;

		const data = await interviewService.deleteInterview(user, interviewId);

		res.status(200).json({
			success: true,
			message: "Interview deleted successfully",
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const interviewStats = async (req, res, next) => {
	try {
		const user = req.user;

		const stats = await interviewService.interviewStats(user);

		res.status(200).json({
			success: true,
			stats,
		});
	} catch (error) {
		next(error);
	}
};
