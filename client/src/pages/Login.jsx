import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bg from "../images/bg1.jpeg";

// 👇 Lucide icons
import { Eye, EyeOff } from "lucide-react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // ✅ NEW
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

            login(res.data.user, res.data.token);

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
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat border-2 border-blue-600"
            style={{ backgroundImage: `url(${bg})` }}
        >

            <form
                onSubmit={handleLogin}
                className="bg-green-200 border-2 border-green-600 p-8 rounded-xl shadow-md w-full max-w-md"
            >

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-white rounded-xl w-full p-3 border-2 border-blue-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* PASSWORD WRAPPER */}
                <div className="relative mb-6">

                    <input
                        type={showPassword ? "text" : "password"} // TOGGLE TYPE
                        placeholder="Password"
                        className="bg-white rounded-xl w-full p-3 border-2 border-blue-300 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* EYE ICON */}
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-blue-600"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>

                </div>

                {/* LOGIN BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-xl font-bold text-white transition duration-300 ${
                        loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* REGISTER LINK */}
                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 cursor-pointer font-bold"
                    >
                        Register
                    </span>
                </p>

            </form>
        </div>
    );
}

export default Login;