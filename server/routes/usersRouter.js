import express from "express";

import { getAllUsers, createUser } from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/signup").post(createUser);

export default usersRouter;
