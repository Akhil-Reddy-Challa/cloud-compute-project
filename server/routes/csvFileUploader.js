const express = require("express");
const router = express.Router();

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "server/uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).array("csvFiles", 3);

router.post("/", (req, res) => {
  upload(req, res, function (err) {
    console.log(req.files);
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

module.exports = router;
