const express = require("express");
const router = express.Router();
const { authenticationByUser } = require("../middleware/authenticate");
const { authorizationByUser } = require("../middleware/authorization");
const { Employee } = require("../modals/employee");

router.get("/", authenticationByUser, authorizationByUser, (req, res) => {
  Employee.find({})
    .then((employee) => {
      res.send(employee);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/", authenticationByUser, authorizationByUser, (req, res) => {
  const emp = new Employee(req.body, req.user._id);
  emp.user = req.user._id;
  emp
    .save()
    .then((emp) => {
      res.send(emp);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.put("/:id", authenticationByUser, authorizationByUser, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Employee.findOneAndUpdate({ _id: id }, { $set: { Employee, ...body } })
    .then((employee) => {
      res.send(employee);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.delete("/:id", authenticationByUser, (req, res) => {
  const id = req.params.id;
  Employee.findOneAndDelete({ _id: id }, req.user._id)
    .then((employee) => {
      res.send(employee);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = {
  employeeController: router,
};
