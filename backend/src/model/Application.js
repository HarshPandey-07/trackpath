import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
	{
		companyName: {
			type: String,
			required: true,
			trim: true,
			minLength: 2,
			maxLength: 100,
		},
		role: {
			type: String,
			required: true,
			trim: true,
			minLength: 2,
			maxLength: 100,
		},
		status: {
			type: String,
			enum: [
				"applied",
				"shortlisted",
				"interview",
				"selected",
				"rejected",
			],
			default: "applied",
		},
		appliedDate: {
			type: Date,
			required: true,
		},
		applicationLink: {
			type: String,
			trim: true,
			validate: {
				validator: function (v) {
					// Allows the field to be empty, but forces 4+ characters if filled
					return v === "" || v === undefined || v.length >= 4;
				},
				message: "URL must be at least 4 characters long.",
			},
		},
		notes: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
