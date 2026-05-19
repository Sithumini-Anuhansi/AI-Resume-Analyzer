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
    const { user } = useContext(AuthContext);

    const handleAnalyze = async () => {

        // ---------------- VALIDATION ----------------
        if (!file || !jobDescription.trim()) {
            toast.error("Please upload resume and add job description");
            return;
        }

        if (!user?.id) {
            toast.error("Session expired. Please login again.");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {

            // ---------------- UPLOAD RESUME ----------------
            const formData = new FormData();
            formData.append("resume", file);

            const uploadRes = await API.post("/resume/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const resumeText = uploadRes?.data?.extractedText;

            if (!resumeText) {
                throw new Error("Failed to extract resume text");
            }

            // ---------------- AI ANALYSIS ----------------
            const analysisRes = await API.post("/analysis/analyze", {
                resumeText,
                jobDescription,
                userId: user?.id
            });

            const analysis = analysisRes?.data?.analysis;

            if (!analysis) {
                throw new Error("Analysis failed");
            }

            // ---------------- SAVE RESULT LOCALLY ----------------
            localStorage.setItem(
                "analysisResult",
                JSON.stringify(analysis.result)
            );

            toast.success("Analysis completed successfully!");

            navigate("/result");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex justify-center p-6">

                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">

                    {/* TITLE */}
                    <h1 className="text-3xl font-bold text-center text-blue-600">
                        Resume Analysis
                    </h1>

                    <p className="text-center text-gray-500 mt-2 mb-8">
                        Upload your resume and analyze it using AI
                    </p>

                    {/* FILE UPLOAD CARD */}
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 mb-6 text-center bg-gray-50 hover:border-blue-400 transition">

                        <input
                            type="file"
                            id="resumeUpload"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                        />

                        <label
                            htmlFor="resumeUpload"
                            className="cursor-pointer text-blue-600 font-semibold text-lg"
                        >
                            Choose Resume File
                        </label>

                        <p className="text-sm text-gray-500 mt-2">
                            Supported formats: PDF, DOC, DOCX
                        </p>

                        {/* FILE STATUS */}
                        <div className="mt-4">
                            {file ? (
                                <span className="text-green-600 font-medium">
                                    Selected: {file.name}
                                </span>
                            ) : (
                                <span className="text-gray-400">
                                    No file selected
                                </span>
                            )}
                        </div>
                    </div>

                    {/* JOB DESCRIPTION */}
                    <div className="mb-6">

                        <label className="block mb-2 font-semibold text-gray-700">
                            Job Description
                        </label>

                        <textarea
                            placeholder="Paste job description here..."
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

                    {/* BUTTON */}
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
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? "Analyzing Resume..." : "Analyze Resume"}
                    </button>

                    {/* LOADER */}
                    {loading && <Loader />}

                </div>
            </div>
        </div>
    );
}

export default UploadPage;