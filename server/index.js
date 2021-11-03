import "./config.js";
import app from "./app.js";

import mongoose from "mongoose";

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Database connected");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(
    `App running at http://127.0.0.1:${port} | ENV: ${process.env.WORKING_ENV}`
  );
});
