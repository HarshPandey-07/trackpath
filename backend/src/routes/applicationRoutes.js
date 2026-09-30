import express from "express";
import * as applicationController from "../controller/applicationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, applicationController.createApplication);
router.get("/", authMiddleware, applicationController.readApplications);

router.get("/stats", authMiddleware, applicationController.applicationStats);

router.get("/:id", authMiddleware, applicationController.readApplicationById);
router.put("/:id", authMiddleware, applicationController.updateApplication);
router.delete("/:id", authMiddleware, applicationController.deleteApplication);
router.post("/:id/interview", authMiddleware, applicationController.addInterview);

router.get("/:id/interview", authMiddleware, applicationController.readInterviews);

router.put(
	"/:id/interview/:interviewId",
	authMiddleware,
	applicationController.updateInterview,
);

export default router;
