const express = require("express");
const router = express.Router();
const ctrl = require("./uploads.controller");
const multer = require("multer");
const auth = require("../../middleware/auth.middleware");

const upload = multer({ dest: "uploads/" });

// 🧩 Upload from file input (used for banners)
router.post("/file", auth, upload.single("image"), ctrl.uploadFile);

// 🧩 Upload by URL (used by Editor.js)
router.post("/url", auth, ctrl.uploadByUrl);

module.exports = router;
