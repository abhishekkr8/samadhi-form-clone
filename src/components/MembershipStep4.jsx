import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Save } from "lucide-react";

const MembershipStep4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stakeholderId, stakeholderTitle, stakeholderPrice, formData, subscriptions } = location.state || {};

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    navigate("/step-3", {
      state: { stakeholderId, stakeholderTitle, stakeholderPrice }
    });
  };

  const handleProceedToPayment = () => {
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions to proceed.");
      return;
    }
    
    setIsProcessing(true);
    
    // Prepare membership data
    const membershipData = {
      stakeholderId,
      stakeholder: stakeholderTitle,
      price: stakeholderPrice,
      formData,
      subscriptions,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage for now
    const existingApplications = JSON.parse(localStorage.getItem("membershipApplications") || "[]");
    existingApplications.push(membershipData);
    localStorage.setItem("membershipApplications", JSON.stringify(existingApplications));
    
    console.log("Membership Data Saved:", membershipData);
    
    // TODO: BACKEND API - Add database save API call here
    // Example:
    // const response = await fetch('/api/membership/save', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(membershipData)
    // });
    // const result = await response.json();
    
    // TODO: PAYMENT GATEWAY - Add payment gateway integration here
    // Example for Razorpay/Stripe:
    // const paymentResponse = await initiatePayment({
    //   amount: stakeholderPrice,
    //   currency: 'INR',
    //   orderId: result.orderId,
    //   customerEmail: formData.email,
    //   customerName: formData.name
    // });
    // Redirect to payment page or open payment modal
    
    setTimeout(() => {
      setIsProcessing(false);
      alert("Data saved to localStorage successfully! Payment gateway will be integrated later.");
    }, 1000);
  };

  if (!stakeholderId) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Please complete the previous steps first.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#4CAF50] text-white px-6 py-2 rounded-md hover:bg-[#43A047]"
            >
              Go to Step 1
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Green Header */}
          <div className="bg-[#4CAF50] px-8 py-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Membership Application - Step 4
            </h1>
            <p className="text-green-100 text-sm mt-2">
              Complete your payment
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-[#4CAF50] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Step 3
            </button>

            {/* Payment Information Section */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-1">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Payment Information
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-6 ml-8">
                Review the amount and proceed to payment
              </p>

              {/* Amount Box */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-green-700 mb-1">Total Amount to Pay</p>
                    <p className="text-3xl font-bold text-green-800">
                      ₹{stakeholderPrice?.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-2">Selected Stakeholder:</p>
                    <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
                      {stakeholderTitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-5 h-5 text-[#4CAF50] border-gray-300 rounded focus:ring-[#4CAF50]"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 font-medium hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and understand that membership activation is subject to administrative approval.
                </span>
              </label>
            </div>

            {/* Proceed Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleProceedToPayment}
                disabled={isProcessing}
                className={`flex items-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#4CAF50] hover:bg-[#43A047]"
                } text-white`}
              >
                <Save className="w-5 h-5" />
                {isProcessing ? "Processing..." : "Save Details & Proceed to Payment"}
              </button>
              <p className="text-sm text-gray-500">
                Your data will be saved first, then you'll be redirected to payment page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipStep4;
