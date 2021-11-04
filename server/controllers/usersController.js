import User from "../models/usersModel.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "Success",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    // FIXME: - Fix req.body, only take the fields we need
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: "Success",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export { getAllUsers, createUser };
