const axios = require("axios");

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `
You are an ATS resume analyzer.

Return ONLY valid JSON. No markdown. No explanation.

JSON format:
{
  "score": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "atsTips": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            }
        );

        let aiText =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            throw new Error("Empty AI response");
        }

        const jsonStart = aiText.indexOf("{");
        const jsonEnd = aiText.lastIndexOf("}");

        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("Invalid AI response format");
        }

        const jsonString = aiText.substring(jsonStart, jsonEnd + 1);

        return JSON.parse(jsonString);

    } catch (error) {
        console.error("AI ERROR:", error.response?.data || error.message);
        throw new Error("AI analysis failed");
    }
};

module.exports = analyzeResume;