import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
<<<<<<< HEAD
import { registerUser, createPaymentOrder, verifyPayment } from "../services/api";
=======
import { registerUser, createPaymentOrder } from "../services/api";
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4

const MembershipStep5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { personalInfo, stakeholderId, stakeholderTitle, stakeholderPrice, stakeholderFormData } = location.state || {};

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
<<<<<<< HEAD
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(null);
=======
  const [registrationStatus, setRegistrationStatus] = useState(null); // 'success' | 'error'
  const [paymentData, setPaymentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4

  const handleBack = () => {
    navigate("/step-4", {
      state: { personalInfo, stakeholderId, stakeholderTitle, stakeholderPrice, stakeholderFormData }
    });
  };

<<<<<<< HEAD
  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

=======
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4
  const handleProceedToPayment = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions to proceed.");
      return;
    }
<<<<<<< HEAD

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const step1Data = JSON.parse(sessionStorage.getItem('step1Data') || '{}');
      const step3Data = JSON.parse(sessionStorage.getItem('step3Data') || '{}');
      const step4Data = JSON.parse(sessionStorage.getItem('step4Data') || '{}');

      let userResponse;
      let isExistingUser = false;

      // Check if userId is already saved from previous attempt
      const savedUserId = sessionStorage.getItem('registeredUserId');
      
      if (savedUserId) {
        // User already registered, skip to payment
        console.log("User already registered, using saved ID:", savedUserId);
        userResponse = { id: savedUserId };
        isExistingUser = true;
        setUserId(savedUserId);
        setRegistrationStatus("success");
      } else {
        // Try to register new user
        const registrationData = {
          full_name: step1Data.full_name || personalInfo?.full_name || "",
          email: step1Data.email || personalInfo?.email || "",
          phone_number: step1Data.phone_number || personalInfo?.phone_number || "",
          address: step1Data.address || personalInfo?.address || "",
          city: step1Data.city || personalInfo?.city || "",
          state: step1Data.state || personalInfo?.state || "",
          latitude: parseFloat(step1Data.latitude) || parseFloat(personalInfo?.latitude) || 0,
          longitude: parseFloat(step1Data.longitude) || parseFloat(personalInfo?.longitude) || 0,
          about_yourself: step1Data.about_yourself || personalInfo?.about_yourself || "",
          password: step1Data.password || personalInfo?.password || "",
          reference_number: step1Data.reference_number || personalInfo?.reference_number || "",
          objective: step1Data.objective || personalInfo?.objective || "",
          user_type: stakeholderId || "student",
          category: step4Data.selectedCategories || stakeholderFormData?.category || [],
          custom_category: step4Data.customCategory || stakeholderFormData?.custom_category || undefined,
          sub_category: step4Data.selectedSubCategories || stakeholderFormData?.sub_category || [],
          custom_sub_category: step4Data.customSubCategory || stakeholderFormData?.custom_sub_category || undefined,
          describe_your_need: step4Data.describeNeed || stakeholderFormData?.describe_your_need || "",
          ...step3Data,
          ...stakeholderFormData
        };

        Object.keys(registrationData).forEach(key => {
          if (registrationData[key] === undefined) {
            delete registrationData[key];
          }
        });

        try {
          console.log("Registering user...", registrationData);
          userResponse = await registerUser(registrationData);
          console.log("User registered successfully:", userResponse);
          
          // Save userId in sessionStorage for retry attempts
          sessionStorage.setItem('registeredUserId', userResponse.id);
          
          setUserId(userResponse.id);
          setRegistrationStatus("success");
        } catch (regError) {
          if (regError.message.includes("already registered") || regError.message.includes("Email already")) {
            setErrorMessage("Email already registered. Please login or use a different email.");
            setRegistrationStatus("error");
            setIsProcessing(false);
            return;
          }
          throw regError;
        }
      }

      // Create Payment Order
      const timestamp = Date.now().toString().slice(-8);
      const receiptId = `rcpt_${timestamp}`;
      
      const paymentOrderData = {
        user_id: userResponse.id,
        user_type: stakeholderId || "student",
        payment_type: "subscription",
        amount_inr: Number(stakeholderPrice) || 1,
        currency: "INR",
        receipt: receiptId
      };

      console.log("Creating payment order with data:", paymentOrderData);
      const orderResponse = await createPaymentOrder(paymentOrderData);
      console.log("Payment order created successfully:", orderResponse);

      setPaymentData(orderResponse);

      // Load and Open Razorpay
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setErrorMessage("Failed to load payment gateway. Please check your internet connection.");
        setRegistrationStatus("error");
        setIsProcessing(false);
        return;
      }

      openRazorpay(orderResponse, step1Data);

    } catch (error) {
      console.error("Registration/Payment Order failed:", error);
      setErrorMessage(error.message || "Registration failed. Please try again.");
      setRegistrationStatus("error");
=======
    
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
      
      // Remove undefined AND empty string values from registration data
      Object.keys(registrationData).forEach(key => {
        if (registrationData[key] === undefined || registrationData[key] === "") {
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
        receipt: `mbr_${registerResponse.id.slice(0, 8)}_${Date.now()}`,
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
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4
    } finally {
      setIsProcessing(false);
    }
  };

<<<<<<< HEAD
  const openRazorpay = (orderData, personalData) => {
    let isPaymentProcessing = false;
    
    // Validate and format phone number
    const formatPhoneNumber = (phone) => {
      if (!phone) return "";
      
      // Remove all non-digits
      const cleaned = phone.replace(/\D/g, '');
      
      // Indian phone number should be 10 digits
      if (cleaned.length === 10) {
        return cleaned; // Don't add +91, Razorpay adds it automatically
      }
      
      // If it has country code, remove it
      if (cleaned.length > 10) {
        return cleaned.slice(-10); // Take last 10 digits
      }
      
      return cleaned;
    };
    
    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Samadhi Membership',
      description: `${stakeholderTitle} Membership Fee`,
      order_id: orderData.order_id,
      handler: async function (response) {
        if (isPaymentProcessing) {
          console.log("Payment already being processed, skipping...");
          return;
        }
        
        isPaymentProcessing = true;
        console.log("Payment successful:", response);
        
        try {
          setIsProcessing(true);
          
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          console.log("Verifying payment...", verificationData);
          const verifyResponse = await verifyPayment(verificationData);
          console.log("Payment verified:", verifyResponse);

          if (verifyResponse.verified) {
            // Don't clear sessionStorage here, Success page will do it
            console.log("✅ Payment verified successfully!");
            
            // Redirect to success page
            navigate('/success', { replace: true }); // ✅ Changed from '/' to '/success'
          } else {
            alert('❌ Payment verification failed. Please contact support.');
            isPaymentProcessing = false;
          }
        } catch (error) {
          console.error('Verification Error:', error);
          alert('Payment verification failed: ' + error.message);
          isPaymentProcessing = false;
          setIsProcessing(false);
        }
      },
      prefill: {
        name: personalData.full_name || "",
        email: personalData.email || "",
        contact: formatPhoneNumber(personalData.phone_number) // ✅ Format phone properly
      },
      theme: {
        color: '#4CAF50'
      },
      modal: {
        ondismiss: function() {
          if (!isPaymentProcessing) {
            console.log('Payment cancelled by user');
            alert('Payment cancelled. You can retry payment.');
            setIsProcessing(false);
          }
        },
        // Disable automatic retry and status polling
        confirm_close: true,
        escape: true,
        backdropclose: false
      },
      // Disable status check - we handle verification ourselves
      retry: {
        enabled: false
      },
      // Prevent automatic status polling
      config: {
        display: {
          hide: [
            {
              method: 'netbanking'
            }
          ],
          preferences: {
            show_default_blocks: true
          }
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    
    razorpay.on('payment.failed', function (response) {
      if (!isPaymentProcessing) {
        console.error('Payment failed:', response.error);
        alert('Payment failed: ' + response.error.description);
        setIsProcessing(false);
      }
    });
    
    razorpay.open();
=======
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
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4
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
<<<<<<< HEAD
=======
        {/* Card Container */}
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4
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
<<<<<<< HEAD
                      Payment gateway opened. Please complete the payment.
=======
                      Your registration has been submitted. Please complete the payment to activate your membership.
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4
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
<<<<<<< HEAD
                  disabled={registrationStatus === "success" || isProcessing}
=======
                  disabled={registrationStatus === "success"}
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4
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
<<<<<<< HEAD
              <button
                onClick={handleProceedToPayment}
                disabled={!agreedToTerms || isProcessing || registrationStatus === "success"}
                className={`flex items-center gap-2 px-8 py-3 rounded-md font-semibold transition-colors ${
                  !agreedToTerms || isProcessing || registrationStatus === "success"
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
              <p className="text-sm text-gray-500">
                {registrationStatus === "success" 
                  ? "Payment gateway has been opened in a new window"
                  : "Click to register and open payment gateway"
=======
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
>>>>>>> 8a8967f06bd4ac354e79b6c1321814cedf17b4f4
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