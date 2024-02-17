const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  rollNumber: {
    type: String,
    required: true,
    min: 5,
    max: 10,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  job: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
