import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api"; 
import Navbar from "../components/Navbar";
import { Activity, Briefcase, AlertTriangle } from "lucide-react";
import bg from "../images/bg.jpeg";
import bg1 from "../images/bg1.jpeg";
import bg2 from "../images/bg2.jpeg";

function ResultPage() {

    const { id } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchResult = async () => {
            try {
                const res = await API.get("/dashboard");

                const allResults = res.data;

                const found = allResults.find(
                    (item) => item._id === id
                );

                setResult(found || null);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchResult();

    }, [id]);

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    // ================= NO RESULT =================
    if (!result) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow text-center">
                    <h1 className="text-2xl font-bold text-gray-700 mb-2">
                        No Results Found
                    </h1>
                    <p className="text-gray-500">
                        Please upload and analyze a resume first.
                    </p>
                </div>
            </div>
        );
    }

    // ================= SAFE VALUES =================
    const score = result.result?.score || 0;

    const scoreColor =
        score >= 80 ? "text-green-600" :
        score >= 50 ? "text-yellow-500" :
        "text-red-600";

    return (
        <div
            className="border-2 border-blue-300 min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >

            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-blue-600 mb-2">
                        AI Resume Analysis
                    </h1>
                    <p className="text-gray-600">
                        Strategic AI insights for your target career role.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* TOP STATS */}
                        <div className="grid md:grid-cols-3 gap-6">

                            <div className="bg-blue-200 p-6 rounded-3xl shadow flex flex-col items-center text-center 
					border-2 border-blue-500 hover:scale-105 transition duration-300">
                                <p className="text-lg text-blue-600 font-bold">
                                    Match Score
                                </p>

                                <h2 className={`text-5xl font-bold mt-2 ${scoreColor}`}>
                                    {score}%
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    ATS Compatibility
                                </p>

                                <Activity className="w-5 h-5 text-gray-600 mt-2" />
                            </div>

                            <div className="bg-blue-100 p-6 rounded-3xl shadow flex flex-col items-center text-center 
					border-2 border-blue-400 hover:scale-105 transition duration-300">
                                <p className="text-lg text-blue-500 font-bold ">
                                    Target Role
                                </p>

                                <h2 className="text-xl font-extrabold mt-2 tracking-tight bg-gradient-to-r 
					from-gray-700 via-gray-500 to-gray-700 bg-clip-text text-transparent">
                                    {result.jobTitle}
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    AI Career Match
                                </p>

                                <Briefcase className="w-5 h-5 text-gray-600 mt-2" />
                            </div>

                            <div className="bg-blue-200 p-6 rounded-3xl shadow flex flex-col items-center text-center 
					border-2 border-blue-500 hover:scale-105 transition duration-300">
                                <p className="text-lg text-blue-600 font-bold">
                                    Status
                                </p>

                                <h2 className={`text-3xl font-bold mt-2 ${scoreColor}`}>
                                    {score >= 80 ? "Ready" : score >= 50 ? "Improve" : "Critical"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    AI Assessment
                                </p>

                                <AlertTriangle className="w-5 h-5 text-gray-600 mt-2" />
                            </div>

                        </div>

                        {/* CONTENT */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* SUGGESTIONS */}
                            <div className="p-4 rounded-3xl shadow bg-cover bg-center bg-no-repeat border-2 border-blue-600" 								style={{ backgroundImage: `url(${bg2})` }}>
                                <h2 className="text-2xl font-bold text-gray-600 mb-4">
                                    Suggestions
                                </h2>

                                <div className="space-y-3 max-h-[100vh] overflow-y-auto pr-4 text-left">
                                    {result.result?.suggestions?.map((s, i) => (
                                        <div key={i} className="bg-gray-200 p-3 rounded-xl">
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ATS */}
                            <div className="p-4 rounded-3xl shadow bg-cover bg-center bg-no-repeat border-2 border-blue-600" style={{ backgroundImage: `url(${bg2})` }}>
                                <h2 className="text-2xl font-bold text-gray-600 mb-4">
                                    ATS Tips
                                </h2>

                                <div className="space-y-3 max-h-[100vh] overflow-y-auto pr-4 text-left">
                                    {result.result?.atsTips?.map((t, i) => (
                                        <div key={i} className="bg-gray-100 p-3 rounded-xl">
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-4 flex flex-col gap-6 bg-cover bg-center bg-no-repeat p-6 rounded-3xl border-2 border-blue-400" style={{ backgroundImage: `url(${bg1})` }}>

                        {/* PERFORMANCE */}
                        <div className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 p-6 rounded-3xl shadow text-center">
                            <h2 className="text-white text-xl font-bold mb-5">
                                Performance Insight
                            </h2>

                            <div className="space-y-4">
                                <div className="bg-green-100 p-2 rounded-xl text-green-600 font-bold">
                                    Matched: {result.result?.matchedSkills?.length || 0}
                                </div>

                                <div className="bg-red-100 p-2 rounded-xl text-red-600 font-bold">
                                    Missing: {result.result?.missingSkills?.length || 0}
                                </div>
                            </div>
                        </div>

                        {/* MATCHED */}
                        <div className="bg-white p-6 rounded-3xl shadow">
                            <h2 className="text-xl font-bold text-green-700 mb-4">
                                Matched Skills
                            </h2>

                            <div className="flex flex-wrap gap-2 max-h-[30vh] overflow-y-auto pr-2">
                                {result.result?.matchedSkills?.map((s, i) => (
                                    <span key={i} className="bg-green-100 px-3 py-1 rounded-full text-sm">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* MISSING */}
                        <div className="bg-white p-6 rounded-3xl shadow">
                            <h2 className="text-xl font-bold text-red-700 mb-4">
                                Missing Skills
                            </h2>

                            <div className="flex flex-wrap gap-2 max-h-[30vh] overflow-y-auto pr-2">
                                {result.result?.missingSkills?.map((s, i) => (
                                    <span key={i} className="bg-red-100 px-3 py-1 rounded-full text-sm">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ResultPage;