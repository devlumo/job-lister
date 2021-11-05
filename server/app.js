import express from "express";
import morgan from "morgan";
import cors from "cors";

import jobsRouter from "./routes/jobsRouter.js";
import usersRouter from "./routes/usersRouter.js";

import AppError from "./utils/appError.js";
import errorHandler from "./controllers/errorController.js";

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
app.use("/api/v1/users", usersRouter);

app.all("*", (req, res, next) => {
  // if anything is passed into next express assumes it is an error
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

export default app;
