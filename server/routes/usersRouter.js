import express from "express";

import { getAllUsers } from "../controllers/usersController.js";
import { login, signUp, refreshToken } from "../controllers/authController.js";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/signup").post(signUp);
usersRouter.route("/login").post(login);
usersRouter.route("/refreshToken").post(refreshToken);

export default usersRouter;
