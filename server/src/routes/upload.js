const express = require("express");
require("dotenv").config();
const url = require("url");
const multer = require("multer");

const router = express.Router();

const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

const LIMIT_FILE_TYPES = "LIMIT_FILE_TYPES";
const LIMIT_FILE_SIZE = "LIMIT_FILE_SIZE";
const MAX_SIZE = 400000;

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    const error = Error(`Type ${file.mimetype} not allowed`);
    error.code = LIMIT_FILE_TYPES;
    return cb(error, false);
  }

  return cb(null, true);
};

const upload = multer({
  storage: storageConfig,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_SIZE,
  },
}).single("file");

function errorMiddleware(error, req, res, next) {
  if (error.code === LIMIT_FILE_TYPES) {
    res.status(422).json({ error: "only images allowed" });
    return;
  }
  if (error.code === LIMIT_FILE_SIZE) {
    res
      .status(422)
      .json({ error: `file size too large. Limit ${MAX_SIZE / 1000} kB` });
    return;
  }
}

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
  });
}

router.post("/", upload, errorMiddleware, async (req, res) => {
  const fileName = req.file.filename;
  const file = fullUrl(req) + "/" + req.file.filename;
  res.json({ file });
});

module.exports = router;
