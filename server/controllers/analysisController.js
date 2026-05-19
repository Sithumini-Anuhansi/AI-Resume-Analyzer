const Analysis = require("../models/Analysis");
const analyzeResume = require("../services/aiService");

// ANALYZE + SAVE RESULT (SECURE VERSION)
exports.analyze = async (req, res) => {
    try {
        const { resumeText, jobDescription } = req.body;

        // ✅ USER FROM JWT (NOT FRONTEND)
        const userId = req.user.id;

        if (!resumeText || !jobDescription) {
            return res.status(400).json({
                message: "Resume text and job description required"
            });
        }

        const result = await analyzeResume(resumeText, jobDescription);

        const analysis = await Analysis.create({
            userId,
            resumeText,
            jobDescription,
            result
        });

        res.status(200).json({
            message: "Analysis completed successfully",
            analysis
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};