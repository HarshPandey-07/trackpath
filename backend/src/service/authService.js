import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../model/User.js";

// Helper functions
// Access token
const generateAccessToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: "15m",
	});
};

// Refresh token
const generateRefreshToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "7d",
	});
};

export const registerUser = async ({ name, email, password }) => {
	// Check if user already exists
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		const error = new Error("User already exists");
		error.statusCode = 409;
		throw error;
	}

	// Hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create new user
	const newUser = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	// Generate JWT tokens
	const token = generateAccessToken(newUser.id); // Access token for auth
	const refreshToken = generateRefreshToken(newUser.id); // Refresh token for refreshing access token

	const { password: _, ...safeUser } = newUser.toObject();

	return { ...safeUser, token, refreshToken };
};

export const loginUser = async ({ email, password }) => {
	const user = await User.findOne()
		.where("email")
		.equals(email)
		.select("+password")
		.lean();

	if (!user) {
		const error = new Error("Invalid credentials");
		error.statusCode = 401;
		throw error;
	}

	// Compare passwords
	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		const error = new Error("Invalid credentials");
		error.statusCode = 401;
		throw error;
	}

	const token = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);

	const { password: _, ...safeUser } = user;

	return { ...safeUser, token, refreshToken };
};

export const refreshToken = async (token) => {
	if (!token) {
		const error = new Error("Unauthorized");
		error.statusCode = 401;
		throw error;
	}

	const decode = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

	const user = await User.findById(decode.userId);

	if (!user) {
		const error = new Error("User not found");
		error.statusCode = 404;
		throw error;
	}

	return generateAccessToken(user.id);
};

export const getMe = async (userId) => {
	const user = await User.findById(userId).lean();

	return user;
};
