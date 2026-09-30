import mongoose, { Schema } from "mongoose";

const interviewSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		application: {
			type: Schema.Types.ObjectId,
			ref: "Application", // Links with Application model
			required: true,
		},
		round: {
			type: String,
			trim: true,
			minLength: 2,
			maxLength: 100,
			required: true,
		},
		status: {
			type: String,
			enum: ["Scheduled", "Completed", "Canceled"],
			default: "Scheduled",
		},
		date: {
			type: Date,
			default: Date.now,
		},
		interviewLink: {
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

interviewSchema.index({ userId: 1, application: 1, createdAt: -1 });

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
