import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user data from navigation state
  const { userName = "User", userEmail, membershipType } = location.state || {};

  useEffect(() => {
    // Clear all sessionStorage data
    sessionStorage.clear();
    
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Welcome Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to Samadhi!
          </h1>
          
          {/* User Name */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            {userName}
          </h3>
          
          <p className="text-lg text-green-600 font-semibold mb-4">
            Payment Successful! 🎉
          </p>

          <p className="text-gray-600 mb-4">
            Your membership has been activated successfully.
          </p>

          {/* Membership Details */}
          {membershipType && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Membership Type:</span> {membershipType}
              </p>
            </div>
          )}

          {/* Redirect Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-700">
              Redirecting to homepage in 5 seconds...
            </p>
          </div>

          {/* Manual Redirect Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Go to Homepage Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;