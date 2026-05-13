const analyzeResume = require("../services/aiService");

// ANALYZE RESUME
exports.analyze = async (req, res) => {
    try {
        const { resumeText, jobDescription } = req.body;

        if (!resumeText || !jobDescription) {
            return res.status(400).json({
                message: "Resume text and job description required"
            });
        }

        const result = await analyzeResume(resumeText, jobDescription);

        res.status(200).json({
            message: "Analysis completed",
            result
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};