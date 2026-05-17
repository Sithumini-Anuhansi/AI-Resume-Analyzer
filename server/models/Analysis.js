const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        resumeText: {
            type: String,
            required: true
        },

        jobDescription: {
            type: String,
            required: true
        },

        result: {
            score: Number,
            matchedSkills: [String],
            missingSkills: [String],
            strengths: [String],
            weaknesses: [String],
            suggestions: [String],
            atsTips: [String]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);