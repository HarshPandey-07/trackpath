import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import auth from "./src/routes/authRoutes.js";

import { errorHandler } from "./src/middlewares/errorHandler.js";
import { connectDB } from "./src/config/dbConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("TrackPath - Internship & Placement tracking platform");
});

app.use("/api/auth/", auth);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});
