const Analysis = require("../models/Analysis");
const analyzeResume = require("../services/aiService");

// ================================
// ANALYZE + SAVE RESULT (MULTI-JOB READY + SECURE)
// ================================
exports.analyze = async (req, res) => {
    try {

        // ================================
        // INPUTS FROM REQUEST
        // ================================
        const { resumeText, jobTitle, jobDescription } = req.body;

        // ✅ SECURE USER ID FROM JWT (NOT FRONTEND)
        const userId = req.user.id;

        // ================================
        // VALIDATION
        // ================================
        if (!resumeText || !jobTitle || !jobDescription) {
            return res.status(400).json({
                message: "Resume text, job title, and job description are required"
            });
        }

        // ================================
        // CLEAN INPUTS
        // ================================
        const cleanJobTitle = jobTitle.trim();
        const cleanResumeText = resumeText.trim();
        const cleanJobDescription = jobDescription.trim();

        if (!cleanJobTitle) {
            return res.status(400).json({
                message: "Job title cannot be empty"
            });
        }

        if (!cleanResumeText || !cleanJobDescription) {
            return res.status(400).json({
                message: "Invalid resume or job description"
            });
        }

        // ================================
        // AI ANALYSIS CALL
        // ================================
        const result = await analyzeResume(
            cleanResumeText,
            cleanJobDescription
        );

        if (!result) {
            return res.status(500).json({
                message: "AI analysis failed. Please try again."
            });
        }

        // ================================
        // SAVE TO DATABASE (MULTI-JOB READY)
        // ================================
        const analysis = await Analysis.create({
            userId,
            jobTitle: cleanJobTitle,
            resumeText: cleanResumeText,
            jobDescription: cleanJobDescription,
            result
        });

        // ================================
        // RESPONSE
        // ================================
        return res.status(200).json({
            message: "Analysis completed successfully",
            analysis
        });

    } catch (error) {

        console.error("Analysis Error:", error);

        return res.status(500).json({
            message: error.message || "Server error during analysis"
        });
    }
};