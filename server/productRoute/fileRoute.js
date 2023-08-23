const getFile = require("../controllers/fileControlar");
const router = require("express").Router();

router.get("/file/:fileName", getFile.getFileWithoutAuth);

module.exports = router;
