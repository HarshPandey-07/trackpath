import app from "./app.js";
import { connectDB } from "./config/dbConfig.js";

const PORT = process.env.PORT || 3000;

await connectDB();

app.listen(PORT, () => {
	console.log(`Server listening on PORT: ${PORT}`);
});
