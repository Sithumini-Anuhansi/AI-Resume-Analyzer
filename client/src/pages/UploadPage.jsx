import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function UploadPage() {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Get logged-in user from context
    const { user } = useContext(AuthContext);

    const handleAnalyze = async () => {

        if (!file || !jobDescription) {
            toast.error("Upload resume and add job description");
            return;
        }

        if (!user) {
            toast.error("You must be logged in");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {

            // Upload resume
            const formData = new FormData();
            formData.append("resume", file);

            const uploadRes = await API.post(
                "/resume/upload",
                formData
            );

            const resumeText = uploadRes.data.extractedText;

            // AI Analysis
            const analysisRes = await API.post(
                "/analysis/analyze",
                {
                    resumeText,
                    jobDescription,
                    userId: user.id
                }
            );

            // Save analysis result locally
            localStorage.setItem(
                "analysisResult",
                JSON.stringify(analysisRes.data.analysis.result)
            );

            toast.success("Analysis completed!");

            navigate("/result");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="flex justify-center p-6">

                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">
                        Resume Analysis
                    </h1>

                    <p className="text-center text-gray-500 mb-8">
                        Upload your resume and compare it with a job description using AI
                    </p>

                    {/* Upload Section */}
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 mb-6 text-center bg-gray-50">

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="mb-4"
                        />

                        <p className="text-gray-500">
                            Upload Resume PDF
                        </p>

                        {file && (
                            <div className="mt-4 text-sm text-green-600 font-medium">
                                Selected File: {file.name}
                            </div>
                        )}
                    </div>

                    {/* Job Description */}
                    <div className="mb-6">

                        <label className="block mb-2 font-semibold text-gray-700">
                            Job Description
                        </label>

                        <textarea
                            placeholder="Paste Job Description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="
                                w-full
                                p-4
                                border
                                rounded-2xl
                                h-56
                                resize-none
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-400
                            "
                        />
                    </div>

                    {/* Analyze Button */}
                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="
                            w-full
                            bg-blue-600
                            text-white
                            py-3
                            rounded-2xl
                            hover:bg-blue-700
                            transition
                            duration-300
                            font-semibold
                            text-lg
                        "
                    >
                        {loading ? "Analyzing..." : "Analyze Resume"}
                    </button>

                    {/* Loader */}
                    {loading && <Loader />}

                </div>
            </div>
        </div>
    );
}

export default UploadPage;