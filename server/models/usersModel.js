import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email address"],
    maxlength: [32, "Email is too long"],
  },
  password: {
    type: String,
    minlength: [8, "Password must be 8 characters or longer"],
    select: false, // password won't show in any output
  },
  userName: {
    type: String,
    unique: true,
    minlength: [3, "Username must be 3 characters or longer"],
  },
  dateCreated: Date,
});

// MIDDLEWARES

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("save", function (next) {
  this.dateCreated = Date.now();
  next();
});

// INSTANCE METHODS

userSchema.methods.checkPassword = async function (candidatePW, storedPW) {
  const correct = await bcrypt.compare(candidatePW, storedPW);
  return correct;
};

const User = mongoose.model("User", userSchema);

export default User;
