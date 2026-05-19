import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = "123456"; // temporary (replace later with JWT user)
                const res = await API.get(`/dashboard/${userId}`);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // Chart data
    const chartData = data.map((item, index) => ({
        name: `Test ${index + 1}`,
        score: item.result.score
    }));

    const total = data.length;

    const avgScore =
        total > 0
            ? Math.round(
                  data.reduce((acc, curr) => acc + curr.result.score, 0) /
                      total
              )
            : 0;

    const highestScore =
        total > 0 ? Math.max(...data.map((d) => d.result.score)) : 0;

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <Navbar />

            <div className="p-6">

                {/* Title */}
                <h1 className="text-3xl font-bold mb-6 text-blue-600">
                    My Resume Dashboard
                </h1>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500">Total Analyses</h2>
                        <p className="text-4xl font-bold text-blue-600">
                            {total}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500">Average Score</h2>
                        <p className="text-4xl font-bold text-purple-600">
                            {avgScore}%
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-gray-500">Highest Score</h2>
                        <p className="text-4xl font-bold text-green-600">
                            {highestScore}%
                        </p>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">
                        Score Progress
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
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
                </div>

                {/* History Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-700">
                        History
                    </h2>

                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                        >

                            <div className="flex justify-between items-center mb-3">

                                <h2 className="text-xl font-bold text-green-600">
                                    Score: {item.result.score}%
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {new Date(item.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-2">
                                <strong className="text-gray-700">
                                    Missing Skills:
                                </strong>

                                <div className="flex gap-2 flex-wrap mt-2">
                                    {item.result.missingSkills?.map((s, i) => (
                                        <span
                                            key={i}
                                            className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Dashboard;