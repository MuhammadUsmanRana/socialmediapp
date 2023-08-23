const express = require("express");
const MiddleWare = require("../MiddleWare/MiddleWare")
var multipart = require("connect-multiparty");

const {
  addingEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/controllers");
const router = express.Router();

router.post("/upload_data", multipart(MiddleWare), addingEmployee );
router.get("/get_data", multipart(MiddleWare), getAllEmployees);
router.delete("/delete_data/:id", deleteEmployee);
router.put("/edit_data/:id", updateEmployee);

module.exports = router;
