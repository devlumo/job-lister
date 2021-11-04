import express from "express";

import { getAllUsers } from "../controllers/usersController.js";
import { signUp } from "../controllers/authController.js";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/signup").post(signUp);

export default usersRouter;
