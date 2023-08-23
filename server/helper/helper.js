const fs = require("fs");
const moment = require("moment");
const path = require("path");
const appConstants = require("../constant/constant");

module.exports = {
  uploadDocument: async function (file, userDir, prefix = "") {
    // console.log(file, "file");

    try {
      let fileMimeType = file.type;
      if (
        !appConstants.IMAGE_SUPPORTED_FORMATS.includes(
          fileMimeType.toLowerCase()
        ) &&
        !appConstants.PDF_SUPPORTED_FORMATS.includes(fileMimeType.toLowerCase())
      ) {
        return {
          status: false,
          message: "Error: one of the uploaded file Extension is not valid.",
          statusCode: 422,
        };
      }

      let extName = file.originalFilename.split(".").pop();

      let fileName = `${moment().unix()}-${path.parse(file.originalFilename).name}.${extName}`;

      if (prefix) {
        fileName = `${prefix}-${fileName}`;
      }

      let filePrefix = `file`;

      let fileStoragePath = path.join(__dirname, `../uploads/`);

      let fileStoragePathExists = fs.existsSync(fileStoragePath);
      if (!fileStoragePathExists) {
        fs.mkdirSync(fileStoragePath, { recursive: true });
      }

      let fileTarget = path.join(`${fileStoragePath}/${fileName}`);

      // console.log(imageTarget);

      let moveImageError = await this.move(file.path, fileTarget);
      if (moveImageError) {
        console.log(error);
        return {
          status: false,
          message: "Error: Internal server error",
          statusCode: 500,
        };
      }
      return {
        status: true,
        fileName: `${filePrefix}/${fileName}`,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        error: error,
      };
    }
  },
  move: function (oldPath, newPath) {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          if (err.code === "EXDEV") {
            var readStream = fs.createReadStream(oldPath);
            var writeStream = fs.createWriteStream(newPath);

            readStream.on("error", reject);
            writeStream.on("error", reject);

            readStream.on("close", function () {
              fs.unlink(oldPath, resolve);
            });

            readStream.pipe(writeStream);
          } else {
            reject(err);
          }
          return;
        }
        resolve();
      });
    });
  },
};
