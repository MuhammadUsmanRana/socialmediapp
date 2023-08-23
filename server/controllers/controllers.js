const Product = require("../Modle/productModle");
const generalHelper = require("../helper/helper");
const path = require("path");
const MiddleWare = require("../MiddleWare/MiddleWare");

exports.addingEmployee = async (req, res) => {
  // console.log("req",req.user)
  try {
    let registerEmployee = await Product.findOne({
      name: req.body.name,
      file: req.files.file,
    });
    if (registerEmployee) {
      return res.status(400).json({ message: "Employee already exists." });
    }

    if (!req.body.name || !req.files.file) {
      return res.status(422).json({ message: "Error: file not found" });
    }

    let fileData = await generalHelper.uploadDocument(req.files.file);
    // console.log(fileData, "create");
    if (!fileData || !fileData.status) {
      //   console.log("here");
      return res.status(422).send({
        message: "Error: Invalid file uploaded",
      });
    }

    const employee = new Product({
      name: req.body.name,
      file: fileData.fileName,
      // user: req.user._id
    });
    await employee.save();

    return res
      .status(201)
      .json({ employee, message: "Employee added successfully." });
  } catch (err) {
    console.log(err);
  }
};
exports.getAllEmployees = async (req, res) => {
  let employee;
  try {
    employee = await Product.find();
  } catch (err) {
    console.log(err);
  }
  if (!employee) {
    return res.status(404).json({ message: "No Employee Found" });
  }
  return res.status(200).json({ employee });
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const deleteEmployee = await Product.findByIdAndDelete(id);

    if (!deleteEmployee) {
      return res.status(404).send("Employee not found");
    }
    return res.status(200).send({ message: "Employee deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  // console.log(req.params);
  const updatedEmployee = req.body;
  console.log(req);
  try {
    const result = await Product.findByIdAndUpdate(
      employeeId,
      updatedEmployee,
      { new: true }
    );
    if (!result) {
      return res.status(404).send({ message: "Employee not found" });
    }
    return res
      .status(200)
      .send({ result, message: "Employee data updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};
