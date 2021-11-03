import express from "express";
import morgan from "morgan";

const app = express();

if (process.env.WORKING_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Hello World!",
  });
});

export default app;
