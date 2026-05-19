const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getUserAnalyses } = require("../controllers/dashboardController");

// 🔒 NO :userId PARAM ANYMORE
router.get("/", protect, getUserAnalyses);

module.exports = router;