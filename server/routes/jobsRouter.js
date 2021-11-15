import express from "express";
import {
  getAllJobs,
  createJob,
  protectedJob,
} from "../controllers/jobsController.js";
import { protect } from "../controllers/authController.js";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getAllJobs).post(createJob);
jobsRouter.route("/vip-jobs").get(protect, protectedJob);

export default jobsRouter;
