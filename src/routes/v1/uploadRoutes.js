const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "logoImage") {
      return cb(null, "./uploads/logo");
    } else if (file.fieldname === "photo") {
      return cb(null, "./uploads/photo");
    } else if (file.fieldname === "images") {
      return cb(null, "./uploads/images");
    }
    return cb(null, "./uploads/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadMiddleware = upload.fields([
  { name: "logoImage", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

router.post("/images", uploadMiddleware, (req, res) => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
});

module.exports = router;
