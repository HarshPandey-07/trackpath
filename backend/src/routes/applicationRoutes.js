import express from "express";
import * as applicationController from "../controller/applicationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, applicationController.createApplication);
router.get("/", authMiddleware, applicationController.readApplications);

router.get("/stats", authMiddleware, applicationController.applicationStats);

router.put("/:id", authMiddleware, applicationController.updateApplication);
router.delete("/:id", authMiddleware, applicationController.deleteApplication);

export default router;
