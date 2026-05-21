import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import bg from "../images/bg1.jpeg";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // NEW STATE
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", {
                name,
                email,
                password
            });

            toast.success("Account created successfully");
            navigate("/login");

        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat border-2 border-blue-600"
            style={{ backgroundImage: `url(${bg})` }}
        >

            <form
                onSubmit={handleRegister}
                className="bg-blue-100 p-8 border-2 border-blue-600 rounded-xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                {/* NAME */}
                <input
                    type="text"
                    placeholder="Name"
                    className="bg-white rounded-xl w-full p-3 border-2 border-green-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-white rounded-xl w-full p-3 border-2 border-green-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* PASSWORD WITH TOGGLE */}
                <div className="relative mb-6">

                    <input
                        type={showPassword ? "text" : "password"} // 👁 toggle
                        placeholder="Password"
                        className="bg-white rounded-xl w-full p-3 border-2 border-green-300 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* EYE ICON */}
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-green-700"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>

                </div>

                {/* REGISTER BUTTON */}
                <button
                    type="submit"
                    className="rounded-xl w-full bg-green-600 font-bold text-white py-2 hover:bg-green-700"
                >
                    Register
                </button>

                {/* LOGIN LINK */}
                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="font-bold text-blue-600 cursor-pointer"
                    >
                        Login
                    </span>
                </p>

            </form>
        </div>
    );
}

export default Register;