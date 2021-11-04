import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  name: String,
  company: String,
  level: String,
  datePosted: Date,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
