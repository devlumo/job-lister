import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import AppError from "../utils/errors/appError.js";
import {
  signAccessToken,
  signRefreshToken,
  getToken,
} from "../utils/auth/authUtils.js";

const refreshToken = async (req, res, next) => {
  let token;
  try {
    // Get token from autorization header
    token = getToken(req);

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

    if (!decoded) {
      return next(
        new AppError("You are not logged in - Please login to access", 401)
      );
    }

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
    const userData = { email: user.email, dateCreated: user.dateCreated };
    /*
    CANNOT USE CROSS SITE COOKIE IN DEVELOPMENT:
    Because a cookie???s SameSite attribute was not set or is invalid, it defaults to SameSite=Lax,
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
        user: userData,
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
        user,
      });
    }
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const protect = async (req, res, next) => {
  try {
    // get token
    let token = getToken(req);
    // verify that token is an access token
    if (!token) {
      return next(
        new AppError("You are not logged in - Please login to access", 401)
      );
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    if (!decoded) {
      return next(
        new AppError("You are not logged in - Please login to access", 401)
      );
    }

    // get user from token
    const currentUser = await User.findById(decoded.id);

    // TODO: additional checks has pw changed after token issued, check if user exists

    // add user data to the request, next() -> move to next route
    req.user = currentUser;
    next();
  } catch (error) {
    return next(
      new AppError(`You don't have access to this information ${error}`, 400)
    );
  }
};

export { signUp, login, refreshToken, protect };
