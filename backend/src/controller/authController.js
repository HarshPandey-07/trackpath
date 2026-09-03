import * as authService from "../service/authService.js";

export const register = async (req, res, next) => {
	try {
		const data = await authService.registerUser(req.body);
		const { refreshToken, token, ...user } = data;

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.status(201).json({
			message: "User registered successfully",
			user,
			token,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const data = await authService.loginUser(req.body);
		const { refreshToken, token, ...user } = data;

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.status(200).json({
			message: "User logged in successfully",
			user,
			token,
		});
	} catch (error) {
		next(error);
	}
};

export const refreshToken = async (req, res, next) => {
	try {
		const token = await authService.refreshToken(req.cookies.refreshToken);

		res.status(200).json({
			token,
		});
	} catch (error) {
		next(error);
	}
};

export const getMe = async (req, res, next) => {
	try {
		const user = await authService.getMe(req.user.userId);

		res.status(200).send(user);
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	try {
		res.clearCookie("refreshToken", {
			httpOnly: true,
			sameSite: "strict",
		});

		res.status(200).json({ message: "Logged out" });
	} catch (error) {
		next(error);
	}
};
