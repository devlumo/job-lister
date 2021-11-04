import express from "express";
import { getAllJobs, createJob } from "../controllers/jobsController.js";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getAllJobs).post(createJob);

export default jobsRouter;
