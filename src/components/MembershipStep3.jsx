import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, User, Building, GraduationCap, Briefcase, Users } from "lucide-react";

const categoryOptions = [
  "Technology", "Business", "Marketing", "Finance", "Legal", "HR", "Design", "Content", "Research", "Other"
];

const subCategoryOptions = {
  Technology: ["Web Development", "Mobile Development", "AI/ML", "Cloud Computing", "Cybersecurity", "Data Science"],
  Business: ["Company incorporation", "Business Strategy", "Operations", "Project Management", "Consulting"],
  Marketing: ["Digital Marketing", "Content Marketing", "SEO/SEM", "Social Media", "Branding"],
  Finance: ["Accounting", "Investment", "Taxation", "Auditing", "Financial Planning"],
  Legal: ["Company Law", "IPR", "Contract Law", "Compliance", "Litigation"],
  HR: ["Recruitment", "Training", "Payroll", "Employee Relations"],
  Design: ["UI/UX", "Graphic Design", "Product Design", "Branding"],
  Content: ["Copywriting", "Technical Writing", "Video Production", "Photography"],
  Research: ["Market Research", "Academic Research", "Product Research"],
  Other: ["Other Services"]
};

const preferredModeOptions = ["Online", "Offline", "Hybrid"];
const freelancerTypeOptions = ["Developer", "Designer", "Writer", "Consultant", "Marketing", "Finance", "Legal", "Other"];
const experienceLevelOptions = ["Entry Level", "Intermediate", "Experienced", "Expert"];
const availabilityOptions = ["Full Time", "Part Time", "Freelance", "Contract"];
const startupTypeOptions = ["Product Based", "Service Based", "Hybrid", "E-Commerce", "SaaS", "Other"];
const startupStageOptions = ["Idea Stage", "Prototype", "MVP", "Early Revenue", "Growth Stage", "Established"];
const incubationTypeOptions = ["Government", "Private", "Academic", "Corporate", "Non-Profit", "Other"];
const providerTypeOptions = ["Product Provider", "Service Provider", "Both", "Consultant", "Agency", "Other"];
const clientTypeOptions = ["B2B", "B2C", "B2G", "Enterprise", "SME", "Startups", "All"];
const organizationTypeOptions = ["Private", "Public", "Government", "MNC", "Partnership", "Proprietorship", "Other"];
const companySizeOptions = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

// Common fields that appear in all stakeholder forms (Category & Sub Category on same row)
const commonFields = [
  { name: "category", label: "Category", type: "multiselect", options: categoryOptions, required: true, helperText: "You Can Choose Multiple Area Of Interest", halfWidth: true },
  { name: "subCategory", label: "Sub Category", type: "multiselect", options: [], required: true, helperText: "You Can Choose Multiple Sub-Categories", dependsOn: "category", halfWidth: true },
  { name: "describeNeed", label: "Describe Your Need", type: "textarea", required: true, placeholder: "You May Describe Your Future Needs/Requirements Here", fullWidth: true },
];

const stakeholderForms = {
  students: {
    title: "Student Details",
    icon: GraduationCap,
    fields: [
      { name: "collegeName", label: "College/University Name", type: "text", required: true, placeholder: "Enter college/university name" },
      { name: "courseDegree", label: "Course/Degree", type: "text", required: true, placeholder: "Enter course/degree" },
      { name: "specialization", label: "Specialization/Stream", type: "text", required: true, placeholder: "Enter specialization/stream" },
      { name: "keySkills", label: "Key Skills", type: "textarea", required: true, placeholder: "Enter key skills" },
      { name: "preferredMode", label: "Preferred Mode", type: "select", options: preferredModeOptions, required: true },
      { name: "experience", label: "Experience/Projects (if any)", type: "textarea", required: false, placeholder: "Enter experience/projects (if any)" },
      ...commonFields,
    ],
  },
  freelancers: {
    title: "Freelancer Details",
    icon: User,
    fields: [
      { name: "freelancerType", label: "Freelancer Type", type: "select", options: freelancerTypeOptions, required: true },
      { name: "primarySkills", label: "Primary Skills", type: "textarea", required: true, placeholder: "Enter primary skills" },
      { name: "experienceLevel", label: "Experience Level", type: "select", options: experienceLevelOptions, required: true },
      { name: "availability", label: "Availability", type: "select", options: availabilityOptions, required: true },
      { name: "preferredWorkMode", label: "Preferred Work Mode", type: "select", options: preferredModeOptions, required: true },
      ...commonFields,
    ],
  },
  educational: {
    title: "Educational Institution Details",
    icon: Building,
    fields: [
      { name: "institutionName", label: "Institution Name", type: "text", required: true, placeholder: "Enter institution name" },
      { name: "institutionType", label: "Institution Type", type: "select", options: ["School", "College", "University", "Training Institute", "Other"], required: true },
      { name: "affiliatedUniversity", label: "Affiliated University/Board", type: "text", required: true, placeholder: "Enter affiliated university/board" },
      { name: "yearEstablishment", label: "Year of Establishment", type: "text", required: true, placeholder: "Enter year of establishment" },
      { name: "coursesOffered", label: "Courses Offered", type: "textarea", required: true, placeholder: "Enter courses offered" },
      { name: "departments", label: "Departments/Streams", type: "text", required: true, placeholder: "Enter departments/streams" },
      { name: "totalStudents", label: "Total Students (Approx)", type: "text", required: true, placeholder: "Enter total students (approx)" },
      { name: "institutionLocation", label: "Institution Location", type: "text", required: true, placeholder: "Enter institution location" },
      ...commonFields,
    ],
  },
  startups: {
    title: "Startup / MSME Details",
    icon: Briefcase,
    fields: [
      { name: "startupType", label: "Startup Type", type: "select", options: startupTypeOptions, required: true },
      { name: "startupStage", label: "Startup Stage", type: "select", options: startupStageOptions, required: true },
      { name: "businessLocation", label: "Business Location", type: "text", required: true, placeholder: "Enter business location" },
      { name: "yearEstablishment", label: "Year of Establishment", type: "text", required: true, placeholder: "Enter year of establishment" },
      { name: "industryDomain", label: "Industry/Domain", type: "text", required: true, placeholder: "Enter industry/domain" },
      ...commonFields,
    ],
  },
  incubation: {
    title: "Incubation Centre Details",
    icon: Building,
    fields: [
      { name: "incubationCentreName", label: "Incubation Centre Name", type: "text", required: true, placeholder: "Enter incubation centre name" },
      { name: "incubationType", label: "Incubation Type", type: "select", options: incubationTypeOptions, required: true },
      { name: "yearEstablishment", label: "Year of Establishment", type: "text", required: true, placeholder: "Enter year of establishment" },
      { name: "focusAreas", label: "Focus Areas", type: "text", required: true, placeholder: "Enter focus areas" },
      { name: "startupStagesSupported", label: "Startup Stages Supported", type: "text", required: true, placeholder: "Enter startup stages supported" },
      { name: "facilitiesProvided", label: "Facilities Provided", type: "text", required: true, placeholder: "Enter facilities provided" },
      { name: "centreLocation", label: "Centre Location", type: "text", required: true, placeholder: "Enter centre location" },
      ...commonFields,
    ],
  },
  "service-providers": {
    title: "Service / Product Provider Details",
    icon: Briefcase,
    fields: [
      { name: "companyBrandName", label: "Company/Brand Name", type: "text", required: true, placeholder: "Enter company/brand name" },
      { name: "providerType", label: "Provider Type", type: "select", options: providerTypeOptions, required: true },
      { name: "servicesProductsOffered", label: "Services/Products Offered", type: "textarea", required: true, placeholder: "Enter services/products offered" },
      { name: "yearsExperience", label: "Years of Experience", type: "text", required: true, placeholder: "Enter years of experience" },
      { name: "clientType", label: "Client Type", type: "select", options: clientTypeOptions, required: true },
      { name: "operatingLocation", label: "Operating Location", type: "text", required: true, placeholder: "Enter operating location" },
      ...commonFields,
    ],
  },
  industry: {
    title: "Industry Details",
    icon: Building,
    fields: [
      { name: "organizationCompanyName", label: "Organization/Company Name", type: "text", required: true, placeholder: "Enter organization/company name" },
      { name: "organizationType", label: "Organization Type", type: "select", options: organizationTypeOptions, required: true },
      { name: "industrySectorDomain", label: "Industry Sector/Domain", type: "text", required: true, placeholder: "Enter industry sector/domain" },
      { name: "yearEstablishment", label: "Year of Establishment", type: "text", required: true, placeholder: "Enter year of establishment" },
      { name: "companySize", label: "Company Size", type: "select", options: companySizeOptions, required: true },
      { name: "operationalLocation", label: "Operational Location", type: "text", required: true, placeholder: "Enter operational location" },
      ...commonFields,
    ],
  },
  "project-partner": {
    title: "Project Partner Details",
    icon: Users,
    fields: [
      { name: "organizationName", label: "Organization Name", type: "text", required: true },
      { name: "organizationType", label: "Organization Type", type: "select", options: ["NGO", "Government", "Corporate", "Academic", "Other"], required: true },
      { name: "projectArea", label: "Project Area of Interest", type: "textarea", required: true },
      { name: "pastProjects", label: "Past Project Experience", type: "textarea", required: false },
      { name: "collaborationType", label: "Collaboration Type", type: "select", options: ["Funding Partner", "Implementation Partner", "Knowledge Partner", "Resource Partner"], required: true },
      { name: "contactPerson", label: "Contact Person", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", required: true },
      ...commonFields,
    ],
  },
};

const subscriptionOptions = [
  { id: "newsletter", label: "Newsletter Updates", description: "Receive monthly newsletters about events and opportunities" },
  { id: "events", label: "Event Notifications", description: "Get notified about upcoming workshops, seminars, and meetups" },
  { id: "opportunities", label: "Business Opportunities", description: "Receive updates about collaboration and funding opportunities" },
  { id: "resources", label: "Resource Updates", description: "Access to new resources, tools, and learning materials" },
];

const MembershipStep3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stakeholderId, stakeholderTitle, stakeholderPrice } = location.state || {};

  const [formData, setFormData] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subscriptions, setSubscriptions] = useState({
    newsletter: true,
    events: true,
    opportunities: false,
    resources: false,
  });

  const stakeholderForm = stakeholderForms[stakeholderId] || stakeholderForms.students;
  const IconComponent = stakeholderForm.icon;

  // Get available sub-categories based on selected categories
  const getAvailableSubCategories = () => {
    let subs = [];
    selectedCategories.forEach(cat => {
      if (subCategoryOptions[cat]) {
        subs = [...subs, ...subCategoryOptions[cat]];
      }
    });
    return [...new Set(subs)];
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        const newCategories = prev.filter(c => c !== category);
        // Also remove sub-categories that belong to removed category
        const validSubs = getAvailableSubCategories();
        setSelectedSubCategories(curr => curr.filter(s => validSubs.includes(s)));
        return newCategories;
      }
      return [...prev, category];
    });
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategories(prev => {
      if (prev.includes(subCategory)) {
        return prev.filter(s => s !== subCategory);
      }
      return [...prev, subCategory];
    });
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubscriptionChange = (id) => {
    setSubscriptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBack = () => {
    navigate("/step-2");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Step 3 Submitted:", {
      stakeholder: stakeholderTitle,
      price: stakeholderPrice,
      formData,
      categories: selectedCategories,
      subCategories: selectedSubCategories,
      subscriptions,
    });
    // Navigate to next step or confirmation
  };

  if (!stakeholderId) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Please select a stakeholder category first.</p>
            <button
              onClick={() => navigate("/step-2")}
              className="bg-[#4CAF50] text-white px-6 py-2 rounded-md hover:bg-[#43A047]"
            >
              Go to Step 2
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Green Header */}
          <div className="bg-[#4CAF50] px-8 py-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Membership Application - Step 3
            </h1>
            <p className="text-green-100 text-sm mt-2">
              Complete your {stakeholderTitle} details
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
              Back to Step 2
            </button>

            {/* Selected Stakeholder Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-4">
              <div className="bg-[#4CAF50] p-3 rounded-full">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{stakeholderTitle}</p>
                <p className="text-[#4CAF50] font-bold">₹{stakeholderPrice?.toLocaleString("en-IN")} / Year</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Stakeholder Specific Form */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <IconComponent className="w-5 h-5 text-[#4CAF50]" />
                  {stakeholderForm.title}
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Please provide the following details
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stakeholderForm.fields.map((field) => (
                    <div
                      key={field.name}
                      className={field.fullWidth || (field.type === "textarea" && !field.halfWidth) ? "md:col-span-2" : ""}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      {field.type === "text" && (
                        <input
                          type="text"
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        />
                      )}

                      {field.type === "select" && (
                        <select
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent bg-white"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {field.type === "multiselect" && field.name === "category" && (
                        <div>
                          <div className="relative">
                            <select
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent bg-white"
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleCategoryChange(e.target.value);
                                  e.target.value = "";
                                }
                              }}
                            >
                              <option value="">Select Category</option>
                              {categoryOptions.map((option) => (
                                <option key={option} value={option} disabled={selectedCategories.includes(option)}>
                                  {option} {selectedCategories.includes(option) ? "✓" : ""}
                                </option>
                              ))}
                            </select>
                          </div>
                          {selectedCategories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedCategories.map(cat => (
                                <span key={cat} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                                  {cat}
                                  <button type="button" onClick={() => handleCategoryChange(cat)} className="text-green-600 hover:text-green-800">×</button>
                                </span>
                              ))}
                            </div>
                          )}
                          {field.helperText && (
                            <p className="text-sm text-blue-600 mt-1">{field.helperText}</p>
                          )}
                        </div>
                      )}

                      {field.type === "multiselect" && field.name === "subCategory" && (
                        <div>
                          <div className="relative">
                            <select
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent bg-white"
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleSubCategoryChange(e.target.value);
                                  e.target.value = "";
                                }
                              }}
                              disabled={selectedCategories.length === 0}
                            >
                              <option value="">{selectedCategories.length === 0 ? "Select Category first" : "Select Sub Category"}</option>
                              {getAvailableSubCategories().map((option) => (
                                <option key={option} value={option} disabled={selectedSubCategories.includes(option)}>
                                  {option} {selectedSubCategories.includes(option) ? "✓" : ""}
                                </option>
                              ))}
                            </select>
                          </div>
                          {selectedSubCategories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedSubCategories.map(sub => (
                                <span key={sub} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                                  {sub}
                                  <button type="button" onClick={() => handleSubCategoryChange(sub)} className="text-green-600 hover:text-green-800">×</button>
                                </span>
                              ))}
                            </div>
                          )}
                          {field.helperText && (
                            <p className="text-sm text-blue-600 mt-1">{field.helperText}</p>
                          )}
                        </div>
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent resize-y"
                          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscription Preferences */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Subscription Preferences
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Choose how you want to stay connected with us
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subscriptionOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                        subscriptions[option.id]
                          ? "border-[#4CAF50] bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={subscriptions[option.id]}
                        onChange={() => handleSubscriptionChange(option.id)}
                        className="mt-1 w-4 h-4 text-[#4CAF50] border-gray-300 rounded focus:ring-[#4CAF50]"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{option.label}</p>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#4CAF50] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#43A047] transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipStep3;
