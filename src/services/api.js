const BASE_URL = "http://46.202.166.179:8000";
const API_BASE_URL = `${BASE_URL}/api`; // Add this line

// Price mapping for user types (not provided by API)
export const priceMapping = {
  student: 1000,
  freelancer: 5000,
  educational_institute: 10000,
  startup_msme: 10000,
  incubation_centre: 10000,
  service_product_provider: 25000,
  industry: 25000,
  investor: 25000,
};

// Image mapping for user types
export const imageMapping = {
  student: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop",
  freelancer: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
  educational_institute: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop",
  startup_msme: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
  incubation_centre: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop",
  service_product_provider: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
  industry: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop",
  investor: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop",
};

// Description mapping for user types
export const descriptionMapping = {
  student: "Perfect for students looking to enhance their skills and network with industry professionals.",
  freelancer: "Ideal for independent professionals seeking collaboration and growth opportunities.",
  educational_institute: "For schools and colleges looking to connect with industry and enhance student outcomes.",
  startup_msme: "For emerging businesses seeking resources, mentorship, and market access.",
  incubation_centre: "For incubators and accelerators looking to expand their network and resources.",
  service_product_provider: "For businesses offering products and services to the innovation ecosystem.",
  industry: "For established companies seeking innovation partnerships and talent access.",
  investor: "For investors looking to discover and fund promising startups and ventures.",
};

// Get common schema (fields order 1-17)
export const getCommonSchema = async () => {
  const response = await fetch(`${BASE_URL}/api/schema/common`);
  if (!response.ok) {
    throw new Error("Failed to fetch common schema");
  }
  return response.json();
};

// Get available user types
export const getUserTypes = async () => {
  const response = await fetch(`${BASE_URL}/api/schema/user-types`);
  if (!response.ok) {
    throw new Error("Failed to fetch user types");
  }
  return response.json();
};

// Get user type specific schema
export const getUserTypeSchema = async (userType) => {
  const response = await fetch(`${BASE_URL}/api/schema/user-type/${userType}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch schema for ${userType}`);
  }
  return response.json();
};

// Register user
export const registerUser = async (data) => {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    const errorMsg = error.detail?.[0]?.msg 
      || error.detail 
      || error.message 
      || JSON.stringify(error);
    throw new Error(errorMsg);
  }
  return response.json();
};

// Payment APIs
export const createPaymentOrder = async (paymentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Payment Order Error Response:", errorData);
      
      // Extract proper error message
      const errorMsg = errorData.detail?.[0]?.msg 
        || errorData.detail 
        || errorData.message 
        || "Failed to create payment order";
      
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error("Create Payment Order Error:", error);
    throw error;
  }
};

let verificationTimeout;

export const verifyPayment = async (verificationData) => {
  // Clear any pending verification
  if (verificationTimeout) {
    clearTimeout(verificationTimeout);
  }
  
  // Debounce verification calls
  return new Promise((resolve, reject) => {
    verificationTimeout = setTimeout(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Payment Verify Error Response:", errorData);
          
          const errorMsg = errorData.detail?.[0]?.msg 
            || errorData.detail 
            || errorData.message 
            || "Payment verification failed";
          
          reject(new Error(errorMsg));
        } else {
          resolve(await response.json());
        }
      } catch (error) {
        console.error("Verify Payment Error:", error);
        reject(error);
      }
    }, 500); // 500ms debounce
  });
};