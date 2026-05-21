const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
    {
        // =========================
        // USER REFERENCE
        // =========================
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // =========================
        // JOB INFORMATION
        // =========================
        jobTitle: {
            type: String,
            required: true,
            trim: true
        },

        jobDescription: {
            type: String,
            required: true
        },

        // =========================
        // RESUME DATA
        // =========================
        resumeText: {
            type: String,
            required: true
        },

        // =========================
        // AI RESULT OBJECT
        // =========================
        result: {
            score: {
                type: Number,
                default: 0
            },

            matchedSkills: {
                type: [String],
                default: []
            },

            missingSkills: {
                type: [String],
                default: []
            },

            strengths: {
                type: [String],
                default: []
            },

            weaknesses: {
                type: [String],
                default: []
            },

            suggestions: {
                type: [String],
                default: []
            },

            atsTips: {
                type: [String],
                default: []
            }
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Analysis", analysisSchema);