const mongoose = require("mongoose");
const connect_DB = async () => {
  try {
    console.log(process.env.MONGO_URI || "No MONGO_URI");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

module.exports = connect_DB;