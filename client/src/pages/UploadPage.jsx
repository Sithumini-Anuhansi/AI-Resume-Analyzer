import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UploadPage() {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!file || !jobDescription) {
            toast.error("Upload resume and add job description");
            return;
        }

        setLoading(true);

        try {
            // 1. Upload resume
            const formData = new FormData();
            formData.append("resume", file);

            const uploadRes = await API.post("/resume/upload", formData);

            const resumeText = uploadRes.data.extractedText;

            // 2. Send to AI analysis
            const analysisRes = await API.post("/analysis/analyze", {
                resumeText,
                jobDescription,
		userId: "123456" // temporary (we replace with login later)
            });

            // 3. Save result locally
            localStorage.setItem(
                "analysisResult",
                JSON.stringify(analysisRes.data.result)
            );

            toast.success("Analysis completed!");

            navigate("/result");

        } catch (error) {
            toast.error("Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    AI Resume Analyzer
                </h1>

                {/* File Upload */}
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-4 w-full"
                />

                {/* Job Description */}
                <textarea
                    placeholder="Paste Job Description..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full p-3 border rounded mb-4 h-40"
                />

                {/* Button */}
                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>
            </div>
        </div>
    );
}

export default UploadPage;