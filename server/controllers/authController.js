import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import AppError from "../utils/errors/appError.js";
import { signAccessToken, signRefreshToken } from "../utils/auth/authUtils.js";

const refreshToken = async (req, res, next) => {
  let token;
  try {
    // Get token from autorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log(token);

    if (!token) {
      return next(
        new AppError("You are not logged in - Please login to access", 401)
      );
    }

    // verify token and return an error if it is malformed etc
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.REFRESH_TOKEN_SECRET
    );

    console.log(decoded.id);
    console.log(decoded);
    if (!decoded) {
      return next(
        new AppError("You are not logged in - Please login to access", 401)
      );
    }

    // check if token has expired

    const accessToken = signAccessToken(decoded.id);

    // If we are in production, send cookie
    if (process.env.WORKING_ENV === "production") {
      res.cookie("refreshToken", signRefreshToken(decoded.id), {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      res.status(200).json({
        status: "Success",
        accessToken,
      });
    }

    // Send refresh token in development to be used in localStorage
    if (process.env.WORKING_ENV === "development") {
      const refreshToken = signRefreshToken(decoded.id);
      res.status(200).json({
        status: "Success",
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    return next(
      new AppError(
        `The provided refresh token is invalid, please login again: ${error}`,
        401
      )
    );
  }
};

const signUp = async (req, res, next) => {
  try {
    // FIXME: - Fix req.body, only take the fields we need
    const newUser = await User.create(req.body);

    // Create JWT and return token, "sign in"
    const token = signAccessToken(newUser._id);

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

    const accessToken = signAccessToken(user._id);

    /*
    CANNOT USE CROSS SITE COOKIE IN DEVELOPMENT:
    Because a cookie’s SameSite attribute was not set or is invalid, it defaults to SameSite=Lax,
     which prevents the cookie from being set in a cross-site context.
     This behavior protects user data from accidentally leaking to third parties and cross-site request forgery.
    resolve this issue by updating the attributes of the cookie
    */

    // Send refresh token in development to be used in localStorage
    if (process.env.WORKING_ENV === "development") {
      const refreshToken = signRefreshToken(user._id);
      res.status(200).json({
        status: "Successfully logged in",
        accessToken,
        refreshToken,
      });
    }

    // Cookie only used in production
    if (process.env.WORKING_ENV === "production") {
      res.cookie("refreshToken", signRefreshToken(user._id), {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      res.status(200).json({
        status: "Successfully logged in",
        accessToken,
      });
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export { signUp, login, refreshToken };
