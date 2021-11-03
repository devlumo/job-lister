import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

if (process.env.WORKING_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Hello World!",
  });
});

export default app;
