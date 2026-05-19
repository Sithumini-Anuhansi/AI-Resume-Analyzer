import { Routes, Route, useNavigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ResultPage from "./pages/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-xl w-full">

        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          AI Resume Analyzer
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          MERN Stack + AI Powered Resume Analysis System
        </p>

        <div className="space-y-3 text-left mb-8">
          <div className="bg-gray-100 p-3 rounded-lg">
            ✅ Upload Resume PDF/DOCX
          </div>

          <div className="bg-gray-100 p-3 rounded-lg">
            ✅ Analyze Job Description Match
          </div>

          <div className="bg-gray-100 p-3 rounded-lg">
            ✅ Get AI Skill Suggestions
          </div>

          <div className="bg-gray-100 p-3 rounded-lg">
            ✅ ATS Resume Score
          </div>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (STEP 7 SECURITY LAYER) */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
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
      </Routes>
    </>
  );
}

export default App;