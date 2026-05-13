const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env
dotenv.config();

// Connect DB
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for uploaded files
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
    res.send("AI Resume Analyzer API Running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});