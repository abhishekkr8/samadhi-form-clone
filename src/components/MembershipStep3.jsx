import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, User, Building, GraduationCap, Briefcase, Users } from "lucide-react";

const stakeholderForms = {
  students: {
    title: "Student Details",
    icon: GraduationCap,
    fields: [
      { name: "institution", label: "Institution Name", type: "text", required: true },
      { name: "course", label: "Course / Program", type: "text", required: true },
      { name: "year", label: "Year of Study", type: "select", options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"], required: true },
      { name: "studentId", label: "Student ID / Roll Number", type: "text", required: true },
      { name: "skills", label: "Key Skills", type: "textarea", required: false },
    ],
  },
  freelancers: {
    title: "Freelancer Details",
    icon: User,
    fields: [
      { name: "profession", label: "Profession / Expertise", type: "text", required: true },
      { name: "experience", label: "Years of Experience", type: "select", options: ["0-1 Years", "1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"], required: true },
      { name: "portfolio", label: "Portfolio URL", type: "text", required: false },
      { name: "services", label: "Services Offered", type: "textarea", required: true },
      { name: "hourlyRate", label: "Hourly Rate (₹)", type: "text", required: false },
    ],
  },
  educational: {
    title: "Educational Institution Details",
    icon: Building,
    fields: [
      { name: "institutionName", label: "Institution Name", type: "text", required: true },
      { name: "institutionType", label: "Institution Type", type: "select", options: ["School", "College", "University", "Training Institute", "Other"], required: true },
      { name: "accreditation", label: "Accreditation", type: "text", required: false },
      { name: "studentCount", label: "Number of Students", type: "text", required: true },
      { name: "website", label: "Website URL", type: "text", required: false },
      { name: "contactPerson", label: "Contact Person Name", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", required: true },
    ],
  },
  startups: {
    title: "Startup / MSME Details",
    icon: Briefcase,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "registrationNumber", label: "Registration Number", type: "text", required: false },
      { name: "sector", label: "Industry Sector", type: "select", options: ["Technology", "Healthcare", "Education", "Finance", "Manufacturing", "Retail", "Services", "Other"], required: true },
      { name: "stage", label: "Business Stage", type: "select", options: ["Idea Stage", "Prototype", "Early Revenue", "Growth Stage", "Established"], required: true },
      { name: "teamSize", label: "Team Size", type: "text", required: true },
      { name: "funding", label: "Funding Status", type: "select", options: ["Bootstrapped", "Seed Funded", "Series A", "Series B+", "Not Applicable"], required: false },
      { name: "description", label: "Company Description", type: "textarea", required: true },
    ],
  },
  incubation: {
    title: "Incubation Centre Details",
    icon: Building,
    fields: [
      { name: "centreName", label: "Centre Name", type: "text", required: true },
      { name: "hostInstitution", label: "Host Institution", type: "text", required: true },
      { name: "established", label: "Year Established", type: "text", required: true },
      { name: "startupsIncubated", label: "Number of Startups Incubated", type: "text", required: true },
      { name: "focusAreas", label: "Focus Areas", type: "textarea", required: true },
      { name: "facilities", label: "Facilities Offered", type: "textarea", required: false },
      { name: "website", label: "Website URL", type: "text", required: false },
    ],
  },
  "service-providers": {
    title: "Service / Product Provider Details",
    icon: Briefcase,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "serviceType", label: "Service / Product Type", type: "select", options: ["Software", "Hardware", "Consulting", "Marketing", "Legal", "Finance", "HR", "Other"], required: true },
      { name: "experience", label: "Years in Business", type: "text", required: true },
      { name: "clientele", label: "Target Clientele", type: "textarea", required: true },
      { name: "offerings", label: "Key Offerings", type: "textarea", required: true },
      { name: "website", label: "Website URL", type: "text", required: false },
    ],
  },
  industry: {
    title: "Industry Details",
    icon: Building,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "industry", label: "Industry Type", type: "select", options: ["IT/Software", "Manufacturing", "Pharma", "FMCG", "Automotive", "Banking", "Telecom", "Other"], required: true },
      { name: "employeeCount", label: "Employee Count", type: "select", options: ["1-50", "51-200", "201-500", "501-1000", "1000+"], required: true },
      { name: "annualRevenue", label: "Annual Revenue Range", type: "select", options: ["Under 1 Cr", "1-10 Cr", "10-50 Cr", "50-100 Cr", "100+ Cr"], required: false },
      { name: "partnershipInterest", label: "Partnership Interest Areas", type: "textarea", required: true },
      { name: "contactPerson", label: "Contact Person", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", required: true },
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
  const [subscriptions, setSubscriptions] = useState({
    newsletter: true,
    events: true,
    opportunities: false,
    resources: false,
  });

  const stakeholderForm = stakeholderForms[stakeholderId] || stakeholderForms.students;
  const IconComponent = stakeholderForm.icon;

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
                      className={field.type === "textarea" ? "md:col-span-2" : ""}
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
                          placeholder={`Enter ${field.label.toLowerCase()}`}
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

                      {field.type === "textarea" && (
                        <textarea
                          value={formData[field.name] || ""}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent resize-none"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
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
