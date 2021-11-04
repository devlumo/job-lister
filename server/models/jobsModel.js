import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  name: String,
  company: String,
  level: String,
  datePosted: Date,
});

// MIDDLEWARES

jobSchema.pre("save", function (next) {
  this.dateCreated = Date.now();
  next();
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
