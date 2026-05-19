const Analysis = require("../models/Analysis");

// GET LOGGED-IN USER HISTORY ONLY
exports.getUserAnalyses = async (req, res) => {
    try {
        const userId = req.user.id;

        const analyses = await Analysis.find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json(analyses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};