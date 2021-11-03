import "./config.js";
import app from "./app.js";

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(
    `App running at http://127.0.0.1:${port} | ENV: ${process.env.WORKING_ENV}`
  );
});
