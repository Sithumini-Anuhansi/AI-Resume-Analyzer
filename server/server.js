const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();
connectDB();

const app = express();


// 🔒 SECURITY HEADERS
app.use(helmet());


// 🔒 RATE LIMIT (GLOBAL - SAFE FOR STUDENT PROJECT)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, try again later."
});
app.use(limiter);


// 📊 LOGGING
app.use(morgan("dev"));


// 🌐 CORS CONFIG
app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}));


// JSON BODY
app.use(express.json());


// STATIC FILES
app.use("/uploads", express.static("uploads"));


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/dashboard", dashboardRoutes);


// HEALTH CHECK
app.get("/", (req, res) => {
    res.json({
        status: "AI Resume Analyzer API Running"
    });
});


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: err.message || "Server Error"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});