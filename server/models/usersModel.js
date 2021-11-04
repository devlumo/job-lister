import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email address"],
    maxlength: [32, "Email is too long"],
  },
  password: {
    type: String,
    minlength: [8, "Password must be 8 characters or longer"],
  },
  userName: {
    type: String,
    minlength: [3, "Username must be 3 characters or longer"],
  },
  dateCreated: Date,
});

// MIDDLEWARES

userSchema.pre("save", function (next) {
  this.dateCreated = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
