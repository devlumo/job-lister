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

export { getAllUsers };
