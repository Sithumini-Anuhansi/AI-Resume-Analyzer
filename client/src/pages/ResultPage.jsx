import { useEffect, useState } from "react";

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
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">

                <h1 className="text-2xl font-bold mb-4">
                    AI Analysis Result
                </h1>

                {/* Score */}
                <div className="text-xl mb-4">
                    Match Score: 
                    <span className="font-bold text-green-600 ml-2">
                        {result.score}%
                    </span>
                </div>

                {/* Matched Skills */}
                <h2 className="font-bold">Matched Skills</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {result.matchedSkills?.map((skill, i) => (
                        <span key={i} className="bg-green-200 px-2 py-1 rounded">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Missing Skills */}
                <h2 className="font-bold">Missing Skills</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                    {result.missingSkills?.map((skill, i) => (
                        <span key={i} className="bg-red-200 px-2 py-1 rounded">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Suggestions */}
                <h2 className="font-bold">Suggestions</h2>
                <ul className="list-disc ml-6 mb-4">
                    {result.suggestions?.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>

                {/* ATS Tips */}
                <h2 className="font-bold">ATS Tips</h2>
                <ul className="list-disc ml-6">
                    {result.atsTips?.map((t, i) => (
                        <li key={i}>{t}</li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default ResultPage;