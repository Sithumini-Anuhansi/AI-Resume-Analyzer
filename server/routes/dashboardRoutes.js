const express = require("express");
const router = express.Router();

const { getUserAnalyses } = require("../controllers/dashboardController");

// Get history
router.get("/:userId", getUserAnalyses);

module.exports = router;