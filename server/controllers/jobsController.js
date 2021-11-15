import Job from "../models/jobsModel.js";

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      status: "Success",
      jobs,
    });
  } catch (error) {
    console.log("Error in router", error);
  }
};

const protectedJob = async (req, res, next) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      status: "Success",
      jobs,
      user: req.user,
    });
  } catch (error) {
    console.log("Error in router", error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const newTour = await Job.create(req.body);

    res.status(200).json({
      status: "Success",
      message: "Job created",
      job: newTour,
    });
  } catch (error) {
    console.log("Error when writing to DB", error);
  }
};

export { getAllJobs, createJob, protectedJob };
