const express = require("express");
const router = express.Router();

const { analyze } = require("../controllers/analysisController");
const protect = require("../middleware/authMiddleware");

// AI analysis route
router.post("/analyze", protect, analyze);

module.exports = router;