const express = require("express");
const route = express.Router();

const User = require("../db/models/user");
const bcrypt = require("bcrypt");

route.post("/register", async (req, res) => {
  console.log("register hit");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      rollNumber: req.body.rollNumber,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(error.errors);
  }
});

route.post("/login", async (req, res) => {
  console.log("login hit");
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route;
