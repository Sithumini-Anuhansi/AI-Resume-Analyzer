import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await API.post("/auth/login", {
                email,
                password
            });

            // Store JWT + user session
            login(res.data.token);

            toast.success("Login successful!");

            navigate("/upload");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white transition duration-300 ${
                        loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* REGISTER LINK (IMPORTANT UX ADDITION) */}
                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 cursor-pointer font-medium"
                    >
                        Register
                    </span>
                </p>

            </form>
        </div>
    );
}

export default Login;