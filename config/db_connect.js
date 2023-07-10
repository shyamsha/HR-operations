//db configuration
const mongoose = require("mongoose");
const connection_uri =
  "mongodb+srv://shyamsha04:9849084994@cluster0.e31asyp.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connection_uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
module.exports = {
  mongoose,
};
