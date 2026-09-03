import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			const error = new Error("Unauthorized");
			error.statusCode = 401;
			throw error;
		}

		const token = authHeader.split(" ")[1];

		const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

		req.user = decode;

		next();
	} catch (error) {
		error.statusCode = 401;
		next(error);
	}
};
