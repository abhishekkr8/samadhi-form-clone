import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { registerUser, createPaymentOrder } from "../services/api";

const MembershipStep5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { personalInfo, stakeholderId, stakeholderTitle, stakeholderPrice, stakeholderFormData } = location.state || {};

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null); // 'success' | 'error'
  const [paymentData, setPaymentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBack = () => {
    navigate("/step-4", {
      state: { personalInfo, stakeholderId, stakeholderTitle, stakeholderPrice, stakeholderFormData }
    });
  };

  const handleProceedToPayment = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions to proceed.");
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage("");
    
    try {
      // Prepare registration payload according to API schema
      const registrationData = {
        // Step 1 - Personal Information
        full_name: personalInfo?.full_name || "",
        email: personalInfo?.email || "",
        password: personalInfo?.password || "",
        phone_number: personalInfo?.phone_number || "",
        address: personalInfo?.address || "",
        city: personalInfo?.city || "",
        state: personalInfo?.state || "",
        latitude: parseFloat(personalInfo?.latitude) || 0,
        longitude: parseFloat(personalInfo?.longitude) || 0,
        about_yourself: personalInfo?.about_yourself || "",
        reference_number: personalInfo?.reference_number || "",
        objective: personalInfo?.objective || "",
        
        // Step 2 - User Type
        user_type: stakeholderId,
        
        // Step 4 - Categories
        category: stakeholderFormData?.category || [],
        custom_category: stakeholderFormData?.category?.includes("Other") ? (stakeholderFormData?.custom_category || "") : undefined,
        sub_category: stakeholderFormData?.sub_category || [],
        custom_sub_category: stakeholderFormData?.sub_category?.includes("Other") ? (stakeholderFormData?.custom_sub_category || "") : undefined,
        describe_your_need: stakeholderFormData?.describe_your_need || "",
        
        // Step 3 - User type specific fields (dynamically added)
        ...getStakeholderSpecificFields(),
      };

      console.log("Registering user with data:", registrationData);
      
      // Remove undefined values from registration data
      Object.keys(registrationData).forEach(key => {
        if (registrationData[key] === undefined) {
          delete registrationData[key];
        }
      });
      
      console.log("Cleaned registration data:", registrationData);
      
      // Step 1: Register user
      const registerResponse = await registerUser(registrationData);
      console.log("Registration successful:", registerResponse);
      
      setRegistrationStatus("success");
      
      // Step 2: Create payment order
      const paymentOrderData = {
        user_id: registerResponse.id,
        user_type: stakeholderId,
        payment_type: "subscription",
        amount_inr: stakeholderPrice,
        currency: "INR",
        receipt: `membership_${registerResponse.id}_${Date.now()}`,
      };
      
      console.log("Creating payment order:", paymentOrderData);
      const paymentResponse = await createPaymentOrder(paymentOrderData);
      console.log("Payment order created:", paymentResponse);
      
      setPaymentData(paymentResponse);
      
      // Also save to localStorage for backup
      const membershipData = {
        ...registrationData,
        userId: registerResponse.id,
        paymentOrderId: paymentResponse.order_id,
        status: "pending_payment",
        createdAt: new Date().toISOString(),
      };
      const existingApplications = JSON.parse(localStorage.getItem("membershipApplications") || "[]");
      existingApplications.push(membershipData);
      localStorage.setItem("membershipApplications", JSON.stringify(existingApplications));
      
    } catch (error) {
      console.error("Error:", error);
      setRegistrationStatus("error");
      setErrorMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Extract user-type specific fields from stakeholderFormData
  const getStakeholderSpecificFields = () => {
    const specificFields = {};
    const excludeKeys = ["category", "custom_category", "sub_category", "custom_sub_category", "describe_your_need"];
    
    if (stakeholderFormData) {
      Object.entries(stakeholderFormData).forEach(([key, value]) => {
        if (!excludeKeys.includes(key) && value) {
          specificFields[key] = value;
        }
      });
    }
    
    return specificFields;
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
              Membership Application - Step 5
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
              disabled={isProcessing}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Step 4
            </button>

            {/* Success Message */}
            {registrationStatus === "success" && paymentData && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-800">Registration Successful!</h3>
                    <p className="text-green-700 text-sm mt-1">
                      Your registration has been submitted. Please complete the payment to activate your membership.
                    </p>
                    <div className="mt-3 p-3 bg-white rounded border border-green-200">
                      <p className="text-sm text-gray-600">Order ID: <span className="font-mono font-medium">{paymentData.order_id}</span></p>
                      <p className="text-sm text-gray-600">Amount: <span className="font-medium">₹{paymentData.amount?.toLocaleString("en-IN")}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {registrationStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800">Registration Failed</h3>
                    <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

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
                  disabled={registrationStatus === "success"}
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
              {registrationStatus !== "success" ? (
                <button
                  onClick={handleProceedToPayment}
                  disabled={isProcessing}
                  className={`flex items-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#4CAF50] hover:bg-[#43A047]"
                  } text-white`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Register & Proceed to Payment
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 px-8 py-3 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  onClick={() => {
                    // Payment gateway integration placeholder
                    alert(`Payment gateway integration pending.\n\nOrder ID: ${paymentData?.order_id}\nKey ID: ${paymentData?.key_id}`);
                  }}
                >
                  <CreditCard className="w-5 h-5" />
                  Pay Now ₹{stakeholderPrice?.toLocaleString("en-IN")}
                </button>
              )}
              <p className="text-sm text-gray-500">
                {registrationStatus === "success" 
                  ? "Click 'Pay Now' to complete your membership payment"
                  : "Your data will be registered first, then you can proceed to payment"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipStep5;