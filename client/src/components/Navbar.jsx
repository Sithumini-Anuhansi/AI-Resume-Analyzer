import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo.png";

function Navbar() {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <nav className="bg-gradient-to-r
                        from-blue-200
			via-white
                        to-blue-200 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center">

            {/* ================= LEFT SIDE ================= */}
	    <div
    		className="flex items-center cursor-pointer"
    		onClick={() => navigate("/dashboard")}
	    >

		{/* LOGO */}
		<img
        	    src={logo}
        	    alt="ResuMate Logo"
        	    className="h-20 object-contain"
    		/>

    		{/* APP NAME */}
    		<div className="leading-tight flex flex-col justify-left">

        	<h1
            	    className="
                    	text-4xl
                    	font-extrabold
                	tracking-tight
                	bg-gradient-to-r
                	from-blue-900
                	via-blue-700
                	to-blue-500
                	bg-clip-text
                	text-transparent
            	    "
        	>
            		ResuMate
        	</h1>

        	<p className="text-xs text-gray-500 tracking-wide">
            		AI Powered Resume Analysis
        	</p>

    		</div>

	</div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="flex items-center gap-4">

                {/* DASHBOARD */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="
                        px-5
                        py-2.5
                        rounded-xl
                        bg-gradient-to-r
                        from-gray-700
                        to-gray-500
                        text-white
                        font-semibold
                        hover:scale-105
                        transition
                        duration-300
                        shadow-md
                    "
                >
                    Dashboard
                </button>

                {/* UPLOAD */}
                <button
                    onClick={() => navigate("/upload")}
                    className="
                        px-5
                        py-2.5
                        rounded-xl
                        bg-gradient-to-r
                        from-blue-700
                        to-blue-500
                        text-white
                        font-semibold
                        hover:scale-105
                        transition
                        duration-300
                        shadow-md
                    "
                >
                    Upload Resume
                </button>

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="
                        px-5
                        py-2.5
                        rounded-xl
                        bg-gradient-to-r
                        from-red-700
                        to-red-400
                        text-white
                        font-semibold
                        hover:scale-105
                        transition
                        duration-300
                        shadow-md
                    "
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;