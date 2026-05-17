import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = "123456"; // temporary
                const res = await API.get(`/dashboard/${userId}`);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-2xl font-bold mb-6">
                My Resume Analysis History
            </h1>

            <div className="space-y-4">
                {data.map((item) => (
                    <div key={item._id} className="bg-white p-4 rounded shadow">

                        <h2 className="font-bold text-green-600">
                            Score: {item.result.score}%
                        </h2>

                        <p className="text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleString()}
                        </p>

                        <div className="mt-2">
                            <strong>Missing Skills:</strong>
                            <div className="flex gap-2 flex-wrap">
                                {item.result.missingSkills?.map((s, i) => (
                                    <span key={i} className="bg-red-200 px-2 py-1 rounded">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;