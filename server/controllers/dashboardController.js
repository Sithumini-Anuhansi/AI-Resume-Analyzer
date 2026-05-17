const Analysis = require("../models/Analysis");

// GET USER HISTORY
exports.getUserAnalyses = async (req, res) => {
    try {
        const { userId } = req.params;

        const analyses = await Analysis.find({ userId })
            .sort({ createdAt: -1 });

        res.json(analyses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};