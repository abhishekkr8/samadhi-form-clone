import { useState } from "react";
import { User } from "lucide-react";

const MembershipStep1 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    aboutYourself: "",
    referenceNumber: "",
    objectives: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Step 1 Submitted");
  };

  const objectives = [
    "Select Objectives",
    "Personal Growth",
    "Professional Development",
    "Spiritual Enlightenment",
    "Community Service",
    "Health & Wellness",
    "Education & Learning",
    "Business Networking",
    "Social Impact",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Green Header */}
          <div className="bg-[#1e5631] px-6 py-5">
            <h1 className="text-white text-xl md:text-2xl font-semibold">
              Membership Application - Step 1
            </h1>
            <p className="text-green-100 text-sm mt-1">
              Fill your details first, then proceed to payment
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Personal Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-[#1e5631]" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Please provide your personal details
              </p>

              <div className="grid grid-cols-3 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be your User ID
                  </p>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="Enter your mobile number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Address Details Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Address Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter your address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter your city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Enter your state"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* About Yourself Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                About Yourself
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about yourself <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="aboutYourself"
                  value={formData.aboutYourself}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Write a brief description about yourself..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            {/* Membership Details Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Membership Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reference Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    placeholder="Enter reference number (if any)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional - If you have a reference number
                  </p>
                </div>

                {/* Objectives */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objectives <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="objectives"
                    value={formData.objectives}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5631] focus:border-transparent transition-all bg-white"
                  >
                    {objectives.map((obj, index) => (
                      <option key={index} value={index === 0 ? "" : obj}>
                        {obj}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#1e5631] hover:bg-[#164023] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 text-base"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipStep1;
