const mongoose = require("mongoose");
const { Schema } = mongoose;
const employeeSchema = new Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  empId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = {
  Employee,
};
