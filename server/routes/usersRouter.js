import express from "express";

import { getAllUsers } from "../controllers/usersController.js";
import { login, signUp } from "../controllers/authController.js";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/signup").post(signUp);
usersRouter.route("/login").post(login);

export default usersRouter;
