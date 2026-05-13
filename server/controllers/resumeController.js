const fs = require("fs");
const pdfParse = require("pdf-parse");

const analyzeResume = require("../services/aiService");

exports.uploadResume = async (req, res) => {
    try {
        // 1. Check file
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        // 2. Read file buffer
        const fileBuffer = fs.readFileSync(req.file.path);

        // 3. Extract text from PDF (SIMPLE & STABLE)
        const pdfData = await pdfParse(fileBuffer);

        const extractedText = pdfData.text || "";

        // 4. Clean text
        const cleanText = extractedText
            .replace(/\s+/g, " ")
            .trim();

        // 5. AI analysis (optional)
        let aiResult = null;

        if (req.body.jobDescription && req.body.jobDescription.trim() !== "") {
            aiResult = await analyzeResume(
                cleanText,
                req.body.jobDescription
            );
        }

        // 6. Response
        return res.status(200).json({
            message: "Resume uploaded successfully",
            extractedText: cleanText,
            analysis: aiResult
        });

    } catch (error) {
        console.error("Resume Upload Error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};