import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("TrackPath - Internship & Placement tracking platform");
});

app.use("/api/auth/", authRoutes);
app.use("/api/applications/", applicationRoutes);
app.use("/api/interviews/", interviewRoutes);

app.use(errorHandler);

export default app;
