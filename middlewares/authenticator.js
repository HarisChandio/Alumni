const jwt = require("jsonwebtoken");
const User = require("../db/models/user");


const authenticate = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json("You need to login first");
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(verified._id);
    if (!user) {
      return res.status(401).json("You need to login first");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = authenticate;