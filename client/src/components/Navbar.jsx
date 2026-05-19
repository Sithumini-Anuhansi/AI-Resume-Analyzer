import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">
                AI Resume Analyzer
            </h1>

            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/upload")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Upload
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;