import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("TrackPath - Internship & Placement tracking platform");
});

app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});
