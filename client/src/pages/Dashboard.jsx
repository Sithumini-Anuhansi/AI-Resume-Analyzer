import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import bg from "../images/bg.jpeg";
import bg1 from "../images/bg1.jpeg";
import bg2 from "../images/bg2.jpeg";

function Dashboard() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState("All");

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

    // ================= FILTER BY JOB TITLE =================
    const filteredData =
        selectedJob === "All"
            ? data
            : data.filter((item) => item.jobTitle === selectedJob);

    // Chart Data
    const chartData = filteredData.map((item, index) => ({
        name: `Analysis ${index + 1}`,
        score: item.result.score
    }));

    // Stats
    const total = filteredData.length;

    const avgScore =
        total > 0
            ? Math.round(
                filteredData.reduce((acc, curr) => acc + curr.result.score, 0) / total
            )
            : 0;

    const highestScore =
        total > 0
            ? Math.max(...filteredData.map((d) => d.result.score))
            : 0;

    // Unique job titles
    const jobTitles = ["All", ...new Set(data.map((d) => d.jobTitle))];

    return (
        <div className="border-2 border-blue-300 min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>

            {/* Navbar */}
            <Navbar />

            <div className="p-6 max-w-7xl mx-auto">

                {/* Page Title */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-blue-600 mb-2">
                        Dashboard Analytics
                    </h1>

                    <p className="text-gray-600">
                        Track your resume performance across multiple job roles.
                    </p>

                    {/* ================= JOB FILTER ================= */}
                    <div className="mt-4 flex flex-wrap gap-2">

                        {jobTitles.map((job, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedJob(job)}
                                className={`px-3 py-1 rounded-full text-sm border transition ${
                                    selectedJob === job
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-700"
                                }`}
                            >
                                {job}
                            </button>
                        ))}

                    </div>

                </div>

                {/* Loading */}
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {/* ================= MAIN COMMAND CENTER LAYOUT ================= */}
                        <div className="flex flex-col lg:flex-row gap-6">

                            {/* ================= LEFT SIDE ================= */}
                            <div className="lg:w-[65%] flex flex-col gap-6">

                                {/* Stats Cards */}
                                <div className="grid md:grid-cols-3 gap-6">

                                    <div className="bg-blue-300 font-semibold p-6 rounded-2xl border-2 border-blue-500 hover:scale-105 
							transition duration-300 shadow-md">
                                        <h2 className="text-gray-500 font-semibold mb-2">
                                            Total Analyses
                                        </h2>
                                        <p className="text-5xl font-bold text-blue-700">
                                            {total}
                                        </p>
                                    </div>

                                    <div className="bg-blue-200 font-semibold p-6 rounded-2xl shadow border-2 border-blue-400 hover:scale-105 
							transition duration-300 shadow-md">
                                        <h2 className="text-gray-500 font-semibold mb-2">
                                            Average Score
                                        </h2>
                                        <p className="text-5xl font-bold text-purple-600">
                                            {avgScore}%
                                        </p>
                                    </div>

                                    <div className="bg-blue-100 font-semibold p-6 rounded-2xl shadow border-2 border-blue-300 hover:scale-105 
							transition duration-300 shadow-md">
                                        <h2 className="text-gray-500 font-semibold mb-2">
                                            Highest Score
                                        </h2>
                                        <p className="text-5xl font-bold text-green-600">
                                            {highestScore}%
                                        </p>
                                    </div>

                                </div>

                                {/* Chart Section */}
                                <div className="border-2 border-blue-400 p-6 rounded-2xl shadow bg-cover bg-center bg-no-repeat" 
						style={{ backgroundImage: `url(${bg1})` }}>

                                    <div className="flex justify-between items-center mb-6">

                                        <h2 className="text-2xl font-bold text-blue-500">
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

                            </div>

                            {/* ================= RIGHT SIDE ================= */}
                            <div className="rounded-2xl border-2 border-blue-400 lg:w-[35%] bg-cover bg-center bg-no-repeat" 
						style={{ backgroundImage: `url(${bg2})` }}>

                                <h2 className="text-2xl p-5 font-bold text-gray-600">
                                    Analysis History
                                </h2>

                                {filteredData.length === 0 ? (
                                    <div className="rounded-2xl shadow p-10 text-center text-gray-500">
                                        No resume analyses found yet.
                                    </div>
                                ) : (
                                    <div className="p-4 space-y-4 max-h-[100vh] overflow-y-auto pr-4">

                                        {filteredData.map((item) => (
                                            <div
                                                key={item._id}
						onClick={() => navigate(`/result/${item._id}`)}
                                                className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition border-2 border-blue-200 
								hover:border-blue-600 hover:scale-105 transition duration-300 shadow-md">

                                                {/* SCORE */}
                                                <h2 className="text-xl font-bold text-green-600">
                                                    {item.result.score}%
                                                </h2>

                                                {/* JOB TITLE (NEW FEATURE) */}
                                                <p className="text-sm font-semibold text-blue-600 mt-1">
                                                    {item.jobTitle}
                                                </p>

                                                <p className="text-gray-500 text-xs mt-1 mb-3">
                                                    {new Date(item.createdAt).toLocaleString()}
                                                </p>

                                                {/* Missing Skills */}
                                                <div className="text-sm mb-2">
                                                    <p className="font-semibold text-gray-700">
                                                        Missing
                                                    </p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {item.result.missingSkills?.slice(0, 3).map((skill, i) => (
                                                            <span
                                                                key={i}
                                                                className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Matched Skills */}
                                                <div className="text-sm">
                                                    <p className="font-semibold text-gray-700">
                                                        Matched
                                                    </p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {item.result.matchedSkills?.slice(0, 3).map((skill, i) => (
                                                            <span
                                                                key={i}
                                                                className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        ))}

                                    </div>
                                )}

                            </div>

                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default Dashboard;