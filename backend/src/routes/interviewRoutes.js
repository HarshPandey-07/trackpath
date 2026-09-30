import express from "express";
import * as interviewController from "../controller/interviewController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, interviewController.createInterview);
router.get("/", authMiddleware, interviewController.findAll);

router.get("/stats", authMiddleware, interviewController.interviewStats);

router.get("/:id", authMiddleware, interviewController.findByApplication);
router.put("/:id", authMiddleware, interviewController.updateInterview);
router.delete("/:id", authMiddleware, interviewController.deleteInterview);

export default router;
