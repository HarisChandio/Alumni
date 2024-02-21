require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect_DB = require("./db/db");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", postRoute);

connect_DB();
app.listen(3000 || 5000, () => {
  console.log("Server running on port 5000");
});
