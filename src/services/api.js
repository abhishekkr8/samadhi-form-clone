 /**
  * API Service Layer
  * Base URL: http://46.202.166.179:8000
  * Handles all registration and payment API calls
  */
 
 const BASE_URL = "http://46.202.166.179:8000";
 
 /**
  * Mapping: UI stakeholder IDs to API user_type and endpoints
  */
 const STAKEHOLDER_API_MAP = {
   students: { user_type: "student", endpoint: "/api/register/student" },
   freelancers: { user_type: "freelancer", endpoint: "/api/register/freelancer" },
   educational: { user_type: "educational_institute", endpoint: "/api/register/educational-institute" },
   startups: { user_type: "startup_msme", endpoint: "/api/register/startup-msme" },
   incubation: { user_type: "incubation_centre", endpoint: "/api/register/incubation-centre" },
   "service-providers": { user_type: "service_product_provider", endpoint: "/api/register/service-product-provider" },
   industry: { user_type: "industry", endpoint: "/api/register/industry" },
   "project-partner": { user_type: "investor", endpoint: "/api/register/investor" },
 };
 
 /**
  * Build common fields from Step 1 data
  * @param {Object} personalInfo - Data from Step 1
  * @returns {Object} Common fields for API
  */
 const buildCommonFields = (personalInfo) => ({
   full_name: personalInfo.fullName || "",
   email: personalInfo.email || "",
   phone_number: personalInfo.mobile || "",
   password: personalInfo.password || "",
   address: personalInfo.address || "",
   city: personalInfo.city || "",
   state: personalInfo.state || "",
   latitude: 0, // Default value
   longitude: 0, // Default value
   about_yourself: personalInfo.aboutYourself || "",
   reference_number: personalInfo.referenceNumber || "",
   objective: personalInfo.objectives || "Personal networking",
 });
 
 /**
  * Build Student-specific fields
  */
 const buildStudentFields = (formData) => ({
   college_name: formData.collegeName || "",
   degree: formData.courseDegree || "",
   specialization: formData.specialization || "",
   key_skills: formData.keySkills || "",
   preferred_mode: (formData.preferredMode || "online").toLowerCase(),
   experience_projects: formData.experience || "",
 });
 
 /**
  * Build Freelancer-specific fields
  */
 const buildFreelancerFields = (formData) => ({
   freelancer_type: formData.freelancerType || "Individual",
   custom_freelancer_type: "",
   primary_skills: formData.primarySkills || "",
   experience_level: formData.experienceLevel || "",
   availability: formData.availability || "",
   preferred_mode: (formData.preferredWorkMode || "online").toLowerCase(),
 });
 
 /**
  * Build Educational Institute-specific fields
  */
 const buildEducationalFields = (formData) => ({
   institution_name: formData.institutionName || "",
   institution_type: formData.institutionType || "School",
   custom_institution_type: "",
   affiliated_university_board: formData.affiliatedUniversity || "",
   year_of_establishment: parseInt(formData.yearEstablishment) || 0,
   courses_offered: formData.coursesOffered || "",
   departments_streams: formData.departments || "",
   total_students_approx: parseInt(formData.totalStudents) || 0,
   institution_location: formData.institutionLocation || "",
 });
 
 /**
  * Build Startup/MSME-specific fields
  */
 const buildStartupFields = (formData) => ({
   startup_type: formData.startupType || "Startup",
   startup_stage: formData.startupStage || "",
   business_location: formData.businessLocation || "",
   year_of_establishment: parseInt(formData.yearEstablishment) || 0,
   industry_domain: formData.industryDomain || "",
 });
 
 /**
  * Build Incubation Centre-specific fields
  */
 const buildIncubationFields = (formData) => ({
   incubation_centre_name: formData.incubationCentreName || "",
   incubation_type: formData.incubationType || "Government",
   custom_incubation_type: "",
   year_of_establishment: parseInt(formData.yearEstablishment) || 0,
   focus_areas: formData.focusAreas || "",
   startup_stages_supported: formData.startupStagesSupported || "",
   facilities_provided: formData.facilitiesProvided || "",
   centre_location: formData.centreLocation || "",
 });
 
 /**
  * Build Service/Product Provider-specific fields
  */
 const buildServiceProviderFields = (formData) => ({
   company_brand_name: formData.companyBrandName || "",
   provider_type: formData.providerType || "Service",
   custom_provider_type: "",
   services_products_offered: formData.servicesProductsOffered || "",
   years_of_experience: parseInt(formData.yearsExperience) || 0,
   client_type: formData.clientType || "B2B",
   custom_client_type: "",
   operating_location: formData.operatingLocation || "",
 });
 
 /**
  * Build Industry-specific fields
  */
 const buildIndustryFields = (formData) => ({
   organization_company_name: formData.organizationCompanyName || "",
   organization_type: formData.organizationType || "Private",
   custom_organization_type: "",
   industry_sector_domain: formData.industrySectorDomain || "",
   year_of_establishment: parseInt(formData.yearEstablishment) || 0,
   company_size: formData.companySize || "",
   operational_location: formData.operationalLocation || "",
 });
 
 /**
  * Build Investor (Project Partner) specific fields
  */
 const buildInvestorFields = (formData) => ({
   investor_type: formData.investorType || "Angel",
   custom_investor_type: "",
   preferred_investment_stage: formData.preferredInvestmentStage || "",
   typical_investment_size: formData.typicalInvestmentSize || "",
   preferred_sectors: formData.preferredSectors || "",
   preferred_geography: formData.preferredGeography || "",
 });
 
 /**
  * Build category fields from Step 4
  */
 const buildCategoryFields = (stakeholderFormData) => ({
   category: stakeholderFormData.categories || [],
   custom_category: "",
   sub_category: stakeholderFormData.subCategories || [],
   custom_sub_category: "",
   describe_your_need: stakeholderFormData.describeNeed || "",
 });
 
 /**
  * Build stakeholder-specific fields based on type
  */
 const buildStakeholderFields = (stakeholderId, formData) => {
   const builders = {
     students: buildStudentFields,
     freelancers: buildFreelancerFields,
     educational: buildEducationalFields,
     startups: buildStartupFields,
     incubation: buildIncubationFields,
     "service-providers": buildServiceProviderFields,
     industry: buildIndustryFields,
     "project-partner": buildInvestorFields,
   };
   
   const builder = builders[stakeholderId];
   return builder ? builder(formData) : {};
 };
 
 /**
  * Register User API Call
  * @param {Object} params - All form data from steps 1-4
  * @returns {Promise<Object>} API response with user_id
  */
 export const registerUser = async ({ personalInfo, stakeholderId, stakeholderFormData }) => {
   const apiMapping = STAKEHOLDER_API_MAP[stakeholderId];
   
   if (!apiMapping) {
     throw new Error(`Unknown stakeholder type: ${stakeholderId}`);
   }
   
   // Build complete payload
   const payload = {
     ...buildCommonFields(personalInfo),
     user_type: apiMapping.user_type,
     ...buildCategoryFields(stakeholderFormData),
     ...buildStakeholderFields(stakeholderId, stakeholderFormData),
   };
   
   console.log("📤 Registration API Request:", {
     endpoint: `${BASE_URL}${apiMapping.endpoint}`,
     payload,
   });
   
   try {
     const response = await fetch(`${BASE_URL}${apiMapping.endpoint}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(payload),
     });
     
     const data = await response.json();
     
     if (!response.ok) {
       console.error("❌ Registration API Error:", {
         status: response.status,
         error: data,
       });
       throw new Error(data.detail?.[0]?.msg || data.message || "Registration failed");
     }
     
     console.log("✅ Registration API Success:", data);
     return data;
   } catch (error) {
     console.error("❌ Registration API Exception:", error);
     throw error;
   }
 };
 
 /**
  * Create Payment Order API Call
  * @param {Object} params - Payment order details
  * @returns {Promise<Object>} Razorpay order details
  */
 export const createPaymentOrder = async ({ userId, userType, amount }) => {
   const payload = {
     user_id: userId,
     user_type: STAKEHOLDER_API_MAP[userType]?.user_type || "student",
     payment_type: "subscription",
     amount_inr: amount,
     currency: "INR",
     receipt: `receipt_${Date.now()}`,
   };
   
   console.log("📤 Payment Order API Request:", {
     endpoint: `${BASE_URL}/api/payment/order`,
     payload,
   });
   
   try {
     const response = await fetch(`${BASE_URL}/api/payment/order`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(payload),
     });
     
     const data = await response.json();
     
     if (!response.ok) {
       console.error("❌ Payment Order API Error:", {
         status: response.status,
         error: data,
       });
       throw new Error(data.detail?.[0]?.msg || data.message || "Payment order creation failed");
     }
     
     console.log("✅ Payment Order API Success:", data);
     return data;
   } catch (error) {
     console.error("❌ Payment Order API Exception:", error);
     throw error;
   }
 };
 
 /**
  * Verify Payment API Call
  * @param {Object} params - Razorpay payment verification details
  * @returns {Promise<Object>} Verification result
  */
 export const verifyPayment = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
   const payload = {
     razorpay_order_id,
     razorpay_payment_id,
     razorpay_signature,
   };
   
   console.log("📤 Payment Verify API Request:", {
     endpoint: `${BASE_URL}/api/payment/verify`,
     payload,
   });
   
   try {
     const response = await fetch(`${BASE_URL}/api/payment/verify`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(payload),
     });
     
     const data = await response.json();
     
     if (!response.ok) {
       console.error("❌ Payment Verify API Error:", {
         status: response.status,
         error: data,
       });
       throw new Error(data.detail?.[0]?.msg || data.message || "Payment verification failed");
     }
     
     console.log("✅ Payment Verify API Success:", data);
     return data;
   } catch (error) {
     console.error("❌ Payment Verify API Exception:", error);
     throw error;
   }
 };
 
 /**
  * Load Razorpay SDK Script dynamically
  * @returns {Promise<boolean>}
  */
 export const loadRazorpayScript = () => {
   return new Promise((resolve) => {
     // Check if already loaded
     if (window.Razorpay) {
       resolve(true);
       return;
     }
     
     const script = document.createElement("script");
     script.src = "https://checkout.razorpay.com/v1/checkout.js";
     script.onload = () => {
       console.log("✅ Razorpay SDK Loaded");
       resolve(true);
     };
     script.onerror = () => {
       console.error("❌ Razorpay SDK Failed to Load");
       resolve(false);
     };
     document.body.appendChild(script);
   });
 };