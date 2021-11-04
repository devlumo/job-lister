import express from "express";
import Job from "../models/jobsModel.js";

const jobsRouter = express.Router();

jobsRouter.get("/", async (req, res, next) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      status: "Success",
      jobs,
    });
  } catch (error) {
    console.log("Error in router", error);
  }
});

export default jobsRouter;
