import { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import background from "../images/bg.jpeg";
import bg1 from "../images/bg1.jpeg";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function UploadPage() {
    const [file, setFile] = useState(null);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleAnalyze = async () => {

        // ---------------- VALIDATION ----------------
        if (!file || !jobDescription.trim() || !jobTitle.trim()) {
            toast.error("Please upload resume, job title and job description");
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
                jobTitle,
                userId: user?.id
            });

            const analysis = analysisRes?.data?.analysis;

            if (!analysis) {
                throw new Error("Analysis failed");
            }

            // ---------------- SAVE RESULT LOCALLY ----------------
            localStorage.setItem("lastAnalysisId", analysis._id);

            toast.success("Analysis completed successfully!");

            navigate(`/result/${analysis._id}`);

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
        <div className="min-h-screen border-2 border-blue-300">

            <Navbar />

            <div className="flex justify-center p-6 min-h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${bg1})`}}>

                <div className="shadow-xl rounded-2xl p-8 w-full max-w-3xl bg-cover bg-center bg-no-repeat border-2 border-blue-400" style={{backgroundImage: `url(${background})`}}>

                    {/* TITLE */}
                    <h1 className="text-3xl font-bold text-center text-blue-600">
                        Resume Analysis
                    </h1>

                    <p className="text-center text-gray-500 mt-2 mb-8">
                        Upload your resume and analyze it using AI
                    </p>

                    {/* FILE UPLOAD CARD */}
                    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 mb-6 text-center bg-blue-50 hover:border-blue-400 transition">

                        <input
                            type="file"
                            id="resumeUpload"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                        />

                        <label
                            htmlFor="resumeUpload"
                            className="cursor-pointer text-blue-600 font-semibold text-lg hover:underline"
                        >
                            Click to Upload Resume
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

                    {/* JOB TITLE */}
                    <div className="mb-5">

                        <label className="block mb-2 font-bold text-gray-700">
                            Job Title
                        </label>

			<input
                            type="text"
                            placeholder="e.g. Frontend Developer, Data Analyst"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="border-2 border-blue-300 bg-blue-50 hover:border-blue-500 transition w-full p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                    </div>

                    {/* JOB DESCRIPTION */}
                    <div className="mb-6">

                        <label className="block mb-2 font-bold text-gray-700">
                            Job Description
                        </label>

                        <div className="p-2 border-2 border-blue-300 bg-blue-50 hover:border-blue-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400">
			<textarea
                            placeholder="Paste job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="transition w-full p-2 rounded-2xl h-56 resize-none focus:outline-none focus:ring-2 focus:ring-blue-50"/>

			</div>

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