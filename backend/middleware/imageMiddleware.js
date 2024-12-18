const multer = require("multer");

const storage = multer.diskStorage({
  filesize: 1024 * 1024 * 2,
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    new Error("file unsportt"), false;
  }
};

var upload = multer({
  storage: storage,
  limits: { filesize: 1024 * 1024 * 5 },
  fileFilter: filter,
});

module.exports = upload;
