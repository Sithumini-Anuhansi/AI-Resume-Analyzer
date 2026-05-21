import { Routes, Route, useNavigate } from "react-router-dom";

import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import bg from "../src/images/bg.jpeg";
import bg1 from "../src/images/bg1.jpeg";
import logo from "../src/images/logo.png";

// ---------------- HOME PAGE ----------------
function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-cover bg-center bg-no-repeat border-2 border-blue-300 min-h-screen flex items-center justify-center p-6 px-4" style={{backgroundImage: `url(${bg1})`}}>

      <div className="p-10 rounded-2xl shadow-lg text-center max-w-xl w-full bg-cover bg-center bg-no-repeat border-2 
		border-blue-600" style={{backgroundImage: `url(${bg})`}}>

	<div className="flex items-center cursor-pointer p-4">

		{/* LOGO */}
		<img
        	    src={logo}
        	    alt="ResuMate Logo"
        	    className="h-35 object-contain"
    		/>

    		{/* APP NAME */}
    		<div className="leading-tight flex flex-col justify-centre">

        	<h1
            	    className="
                    	text-6xl
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

		<p className="text-lg text-gray-500 font-bold tracking-wide">
            		Analyze. | Improve. | Succeed.
        	</p>

		<p className="text-xs text-gray-500 tracking-wide">
            		AI Powered Resume Analysis System
        	</p>

    		</div>

	</div>

        <div className="space-y-3 text-left mb-8">

          <div className="border-2 border-blue-300 bg-gray-100 p-3 rounded-lg">
            ✅ Upload Resume PDF/DOCX
          </div>

          <div className="border-2 border-blue-300 bg-gray-100 p-3 rounded-lg">
            ✅ Analyze Job Description Match
          </div>

          <div className="border-2 border-blue-300 bg-gray-100 p-3 rounded-lg">
            ✅ Get AI Skill Suggestions
          </div>

          <div className="border-2 border-blue-300 bg-gray-100 p-3 rounded-lg">
            ✅ ATS Resume Score
          </div>

        </div>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </button>

      </div>
    </div>
  );
}


// ---------------- APP ----------------
function App() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
	
        {/* PROTECTED ROUTES */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result/:id"
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* 404 PAGE (IMPORTANT FOR PRODUCTION) */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <h1 className="text-3xl font-bold text-gray-600">
                404 - Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>
    </>
  );
}

export default App;