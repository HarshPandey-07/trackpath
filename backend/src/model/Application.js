import mongoose, { Schema } from "mongoose";

const applicationSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
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
		type: {
			type: String,
			enum: ["Internship", "Placement"],
			default: "Internship",
		},
		status: {
			type: String,
			enum: [
				"Applied",
				"Shortlisted",
				"Interview",
				"Selected",
				"Rejected",
			],
			default: "Applied",
		},
		appliedDate: {
			type: Date,
			default: Date.now,
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

applicationSchema.index({ userId: 1, status: 1, createdAt: -1 });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
