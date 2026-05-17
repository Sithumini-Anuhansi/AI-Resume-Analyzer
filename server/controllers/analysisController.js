const analyzeResume = require("../services/aiService");
const Analysis = require("../models/Analysis");

// ANALYZE + SAVE RESULT
exports.analyze = async (req, res) => {
    try {
        const { resumeText, jobDescription, userId } = req.body;

        if (!resumeText || !jobDescription) {
            return res.status(400).json({
                message: "Resume text and job description required"
            });
        }

        // Get AI result
        const result = await analyzeResume(resumeText, jobDescription);

        // Save to DB
        const analysis = await Analysis.create({
            userId,
            resumeText,
            jobDescription,
            result
        });

        res.status(200).json({
            message: "Analysis completed and saved",
            analysis
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};