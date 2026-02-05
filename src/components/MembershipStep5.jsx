 import { useState } from "react";
 import { useNavigate, useLocation } from "react-router-dom";
 import { ArrowLeft, CreditCard, Save } from "lucide-react";
import { registerUser, createPaymentOrder, verifyPayment, loadRazorpayScript } from "../services/api";
 
 const MembershipStep5 = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { personalInfo, stakeholderId, stakeholderTitle, stakeholderPrice, stakeholderFormData, subscriptions } = location.state || {};
 
   const [agreedToTerms, setAgreedToTerms] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(""); // Track current step for UI
 
   const handleBack = () => {
     navigate("/step-4", {
       state: { personalInfo, stakeholderId, stakeholderTitle, stakeholderPrice, stakeholderFormData }
     });
   };
 
  /**
   * Main submission handler
   * Flow: Register User → Create Payment Order → Open Razorpay → Verify Payment
   */
  const handleProceedToPayment = async () => {
     if (!agreedToTerms) {
       alert("Please agree to the Terms & Conditions to proceed.");
       return;
     }
     
     setIsProcessing(true);
    setProcessingStep("Registering user...");
     
    try {
      // Step 1: Register User via API
      console.log("🚀 Starting Registration...");
      const registrationResponse = await registerUser({
        personalInfo: personalInfo || {},
        stakeholderId,
        stakeholderFormData: stakeholderFormData || {},
      });
      
      const userId = registrationResponse.id;
      console.log("✅ User Registered with ID:", userId);
      
      // Step 2: Create Payment Order
      setProcessingStep("Creating payment order...");
      console.log("🚀 Creating Payment Order...");
      const orderResponse = await createPaymentOrder({
        userId,
        userType: stakeholderId,
        amount: stakeholderPrice,
      });
      
      console.log("✅ Payment Order Created:", orderResponse);
      
      // Step 3: Load Razorpay SDK
      setProcessingStep("Loading payment gateway...");
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }
      
      // Step 4: Open Razorpay Checkout
      setProcessingStep("Opening payment window...");
      const options = {
        key: orderResponse.key_id,
        amount: orderResponse.amount, // Amount in paise
        currency: orderResponse.currency,
        name: "Membership Application",
        description: `${stakeholderTitle} - Annual Membership`,
        order_id: orderResponse.order_id,
        handler: async function (response) {
          // Payment successful - Verify with backend
          console.log("💳 Razorpay Payment Response:", response);
          setProcessingStep("Verifying payment...");
          
          try {
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            if (verifyResponse.verified) {
              console.log("✅ Payment Verified Successfully!");
              alert("🎉 Payment Successful! Your membership application has been submitted.");
              
              // Save to localStorage as backup
              const membershipData = {
                personalInfo: personalInfo || {},
                stakeholderId,
                stakeholder: stakeholderTitle,
                price: stakeholderPrice,
                stakeholderFormData: stakeholderFormData || {},
                subscriptions: subscriptions || {},
                userId,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                status: "completed",
                createdAt: new Date().toISOString(),
              };
              const existingApplications = JSON.parse(localStorage.getItem("membershipApplications") || "[]");
              existingApplications.push(membershipData);
              localStorage.setItem("membershipApplications", JSON.stringify(existingApplications));
              
              // Navigate to success or home
              navigate("/");
            } else {
              console.error("❌ Payment Verification Failed");
              alert("Payment verification failed. Please contact support.");
            }
          } catch (verifyError) {
            console.error("❌ Payment Verification Error:", verifyError);
            alert(`Payment verification error: ${verifyError.message}`);
          }
          
          setIsProcessing(false);
          setProcessingStep("");
        },
        prefill: {
          name: personalInfo?.fullName || "",
          email: personalInfo?.email || "",
          contact: personalInfo?.mobile || "",
        },
        theme: {
          color: "#4CAF50",
        },
        modal: {
          ondismiss: function () {
            console.log("⚠️ Payment Modal Dismissed");
            setIsProcessing(false);
            setProcessingStep("");
          },
        },
      };
      
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
    } catch (error) {
      console.error("❌ Process Error:", error);
      alert(`Error: ${error.message}`);
       setIsProcessing(false);
      setProcessingStep("");
    }
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
             >
               <ArrowLeft className="w-4 h-4" />
               Back to Step 4
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
                <p className="text-sm text-gray-500 text-center">
                  {processingStep || "Your data will be saved first, then you'll be redirected to payment"}
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default MembershipStep5;