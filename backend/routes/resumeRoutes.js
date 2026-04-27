import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createResume,
  deleteResume,
  getResumeById,
  getUserResume,
  updateResume,
} from "../controllers/resumeController.js";

const resumeRouter = express.Router();

resumeRouter.post("/", protect, createResume);

resumeRouter.get("/", protect, getUserResume);
resumeRouter.get("/:id", protect, getResumeById);

resumeRouter.put("/:id", protect, updateResume);
resumeRouter.put("/:id/upload-images", protect, updateResume);

resumeRouter.delete("/:id", protect, deleteResume);

export default resumeRouter;
