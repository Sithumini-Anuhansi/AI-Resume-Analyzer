import { useEffect, useState, useContext } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import { AuthContext } from "../context/AuthContext";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Dashboard() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    useEffect(() => {

        const fetchData = async () => {

            try {

                if (!user?.id) {
                    setLoading(false);
                    return;
                }

                const res = await API.get("/dashboard");

                setData(res.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        fetchData();

    }, [user]);



    // Chart Data
    const chartData = data.map((item, index) => ({
        name: `Analysis ${index + 1}`,
        score: item.result.score
    }));



    // Statistics
    const total = data.length;

    const avgScore =
        total > 0
            ? Math.round(
                  data.reduce(
                      (acc, curr) => acc + curr.result.score,
                      0
                  ) / total
              )
            : 0;

    const highestScore =
        total > 0
            ? Math.max(...data.map((d) => d.result.score))
            : 0;



    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <Navbar />

            <div className="p-6 max-w-7xl mx-auto">

                {/* Page Title */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-blue-600 mb-2">
                        Dashboard Analytics
                    </h1>

                    <p className="text-gray-600">
                        Track your resume performance and AI analysis history.
                    </p>

                </div>



                {/* Loading */}
                {loading ? (

                    <Loader />

                ) : (

                    <>
                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">

                            {/* Total Analyses */}
                            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

                                <h2 className="text-gray-500 mb-2">
                                    Total Analyses
                                </h2>

                                <p className="text-5xl font-bold text-blue-600">
                                    {total}
                                </p>

                            </div>



                            {/* Average Score */}
                            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

                                <h2 className="text-gray-500 mb-2">
                                    Average Score
                                </h2>

                                <p className="text-5xl font-bold text-purple-600">
                                    {avgScore}%
                                </p>

                            </div>



                            {/* Highest Score */}
                            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">

                                <h2 className="text-gray-500 mb-2">
                                    Highest Score
                                </h2>

                                <p className="text-5xl font-bold text-green-600">
                                    {highestScore}%
                                </p>

                            </div>

                        </div>



                        {/* Chart Section */}
                        <div className="bg-white p-6 rounded-2xl shadow mb-8">

                            <div className="flex justify-between items-center mb-6">

                                <h2 className="text-2xl font-bold text-gray-700">
                                    Resume Score Trend
                                </h2>

                                <span className="text-sm text-gray-500">
                                    AI Performance Tracking
                                </span>

                            </div>

                            {chartData.length > 0 ? (

                                <ResponsiveContainer width="100%" height={320}>

                                    <LineChart data={chartData}>

                                        <XAxis dataKey="name" />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            ) : (

                                <div className="text-center py-20 text-gray-500">
                                    No chart data available yet.
                                </div>

                            )}

                        </div>



                        {/* History Section */}
                        <div>

                            <h2 className="text-2xl font-bold text-gray-700 mb-6">
                                Analysis History
                            </h2>

                            {data.length === 0 ? (

                                <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
                                    No resume analyses found yet.
                                </div>

                            ) : (

                                <div className="space-y-5">

                                    {data.map((item) => (

                                        <div
                                            key={item._id}
                                            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300"
                                        >

                                            {/* Top Row */}
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">

                                                <div>

                                                    <h2 className="text-2xl font-bold text-green-600">
                                                        Resume Score: {item.result.score}%
                                                    </h2>

                                                    <p className="text-gray-500 text-sm mt-1">
                                                        {new Date(item.createdAt).toLocaleString()}
                                                    </p>

                                                </div>

                                            </div>



                                            {/* Missing Skills */}
                                            <div className="mb-5">

                                                <h3 className="font-semibold text-gray-700 mb-3">
                                                    Missing Skills
                                                </h3>

                                                <div className="flex flex-wrap gap-2">

                                                    {item.result.missingSkills?.length > 0 ? (

                                                        item.result.missingSkills.map((skill, i) => (

                                                            <span
                                                                key={i}
                                                                className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                                            >
                                                                {skill}
                                                            </span>

                                                        ))

                                                    ) : (

                                                        <span className="text-gray-500">
                                                            No missing skills detected
                                                        </span>

                                                    )}

                                                </div>

                                            </div>



                                            {/* Matched Skills */}
                                            <div>

                                                <h3 className="font-semibold text-gray-700 mb-3">
                                                    Matched Skills
                                                </h3>

                                                <div className="flex flex-wrap gap-2">

                                                    {item.result.matchedSkills?.length > 0 ? (

                                                        item.result.matchedSkills.map((skill, i) => (

                                                            <span
                                                                key={i}
                                                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                                            >
                                                                {skill}
                                                            </span>

                                                        ))

                                                    ) : (

                                                        <span className="text-gray-500">
                                                            No matched skills found
                                                        </span>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;