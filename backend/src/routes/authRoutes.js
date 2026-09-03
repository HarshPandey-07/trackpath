import express from "express";
import * as authController from "../controller/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);

router.get("/me", authMiddleware, authController.getMe);

export default router;
