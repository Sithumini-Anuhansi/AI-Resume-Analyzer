const express = require("express");
const router = express.Router();
const { analyze } = require("../controllers/analysisController");

// AI analysis route
router.post("/analyze", analyze);

module.exports = router;