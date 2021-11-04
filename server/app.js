import express from "express";
import morgan from "morgan";
import cors from "cors";

import jobsRouter from "./routes/jobsRouter.js";

const app = express();

if (process.env.WORKING_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api/v1/jobs", jobsRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Hello World!",
  });
});

export default app;
