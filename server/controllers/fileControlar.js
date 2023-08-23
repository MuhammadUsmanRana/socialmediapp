var fs = require("fs");
var path = require("path");
var mime = require("mime");

// Constants
exports.getFileWithoutAuth = async function (req, res) {
  try {
    let fileName = req.params.fileName;
    let filePath = path.join(__dirname, `../uploads/${fileName}`);
    if (!req.query.isBase64) {
      return res.sendFile(filePath);
    } else {
      return res.status(404).send({
        status: false,
        message: "Error: file not found",
      });
    }
  } catch (error) {
    console.log(error);
    // return respondWithError(req, res, "", null, 500);
  }
};
