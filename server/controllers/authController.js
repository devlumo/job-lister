import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";

import AppError from "../utils/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signUp = async (req, res, next) => {
  try {
    // FIXME: - Fix req.body, only take the fields we need
    const newUser = await User.create(req.body);

    // Create JWT and return token, "sign in"
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "Success",
      token,
      newUser,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide an email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new AppError("The email or password is incorrect", 400));
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: "Successfully logged in",
      token,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export { signUp, login };
