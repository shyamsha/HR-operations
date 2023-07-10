const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const mongoose = require("./config/db_connect");

const { userController } = require("./controllers/userController");
const { employeeController } = require("./controllers/employeeController");

app.use(express.json());
app.use(cors());
app.use("/user", userController);
app.use("/employee", employeeController);

app.listen(port, () => {
  console.log("listening from", port);
});
