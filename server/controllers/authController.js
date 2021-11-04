import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";

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
    console.log(token);
    res.status(201).json({
      status: "Success",
      token,
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export { signUp };
