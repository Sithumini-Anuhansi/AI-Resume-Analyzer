import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function ResultPage() {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("analysisResult");
        if (data) {
            setResult(JSON.parse(data));
        }
    }, []);

    if (!result) {
        return (
            <div className="p-10 text-center">
                No results found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <Navbar />

            <div className="p-6">

                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-5xl mx-auto">

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
                        AI Resume Analysis Result
                    </h1>

                    {/* SCORE CARD */}
                    <div className="bg-blue-50 p-8 rounded-2xl text-center mb-8">
                        <h2 className="text-lg font-semibold text-gray-600 mb-2">
                            Resume Match Score
                        </h2>

                        <div className="text-6xl font-bold text-blue-600">
                            {result.score}%
                        </div>
                    </div>

                    {/* GRID SECTION */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* MATCHED SKILLS */}
                        <div className="bg-green-50 p-6 rounded-2xl shadow">
                            <h2 className="text-xl font-bold text-green-700 mb-4">
                                Matched Skills
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {result.matchedSkills?.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="bg-green-200 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* MISSING SKILLS */}
                        <div className="bg-red-50 p-6 rounded-2xl shadow">
                            <h2 className="text-xl font-bold text-red-700 mb-4">
                                Missing Skills
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {result.missingSkills?.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="bg-red-200 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SUGGESTIONS */}
                    <div className="bg-yellow-50 p-6 rounded-2xl shadow mt-6">
                        <h2 className="text-xl font-bold text-yellow-700 mb-4">
                            Suggestions
                        </h2>

                        <ul className="list-disc ml-6 space-y-2">
                            {result.suggestions?.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* ATS TIPS */}
                    <div className="bg-purple-50 p-6 rounded-2xl shadow mt-6">
                        <h2 className="text-xl font-bold text-purple-700 mb-4">
                            ATS Optimization Tips
                        </h2>

                        <ul className="list-disc ml-6 space-y-2">
                            {result.atsTips?.map((t, i) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ResultPage;