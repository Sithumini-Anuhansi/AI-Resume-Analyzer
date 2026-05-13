const express = require("express");
const router = express.Router();

const upload = require("../utils/upload");
const { uploadResume } = require("../controllers/resumeController");

// Upload resume route
router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;