require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


const connect_DB = require("./db/db");
connect_DB();
app.listen(3000, () => {
  console.log("Server running on port 5000");
});

const authRoute = require("./routes/auth");

app.use("/api/auth", authRoute);
