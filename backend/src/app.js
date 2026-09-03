import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import auth from "./routes/authRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("TrackPath - Internship & Placement tracking platform");
});

app.use("/api/auth/", auth);

app.use(errorHandler);

export default app;
