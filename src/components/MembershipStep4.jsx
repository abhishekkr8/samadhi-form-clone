import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Bell, Newspaper, Calendar, Wrench, BriefcaseBusiness, FileText, Megaphone, Layers } from "lucide-react";

const categoryOptions = [
  "Business", "Content", "Design", "Finance", "HR", "Legal", "Marketing", "Other", "Research", "Technology"
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

const subscriptionOptions = [
  { id: "newsletter", label: "Newsletter & Updates", icon: Newspaper },
  { id: "events", label: "Events & Webinars", icon: Calendar },
  { id: "resources", label: "Resources & Tools", icon: Wrench },
  { id: "career", label: "Career Opportunities", icon: BriefcaseBusiness },
  { id: "tenders", label: "Tenders/Wedding Info", icon: FileText },
  { id: "advertisements", label: "Advertisements", icon: Megaphone },
];

const MembershipStep4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { personalInfo, stakeholderId, stakeholderTitle, stakeholderPrice, stakeholderFormData } = location.state || {};

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [describeNeed, setDescribeNeed] = useState("");
  const [subscriptions, setSubscriptions] = useState({
    newsletter: true,
    events: true,
    resources: false,
    career: false,
    tenders: true,
    advertisements: false,
  });

  const handleBack = () => {
    navigate("/step-3", {
      state: { personalInfo, stakeholderId, stakeholderTitle, stakeholderPrice }
    });
  };

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

  const handleSubscriptionChange = (id) => {
    setSubscriptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Step 4 Submitted:", {
      categories: selectedCategories,
      subCategories: selectedSubCategories,
      describeNeed,
      subscriptions,
    });
    // Navigate to Step 5 payment page
    navigate("/step-5", {
      state: {
        personalInfo,
        stakeholderId,
        stakeholderTitle,
        stakeholderPrice,
        stakeholderFormData: {
          ...stakeholderFormData,
          categories: selectedCategories,
          subCategories: selectedSubCategories,
          describeNeed,
        },
        subscriptions,
      }
    });
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
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Green Header */}
          <div className="bg-[#4CAF50] px-8 py-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Membership Application - Step 4
            </h1>
            <p className="text-green-100 text-sm mt-2">
              Select your preferences and interests
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

            <form onSubmit={handleSubmit}>
              {/* Category & Sub Category Section */}
              <div className="mb-8 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-1">
                  <Layers className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    Category & Interests
                  </h2>
                </div>
                <p className="text-gray-500 text-sm mb-6 ml-8">
                  Select your areas of interest
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
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
                    <p className="text-sm text-blue-600 mt-1">You Can Choose Multiple Area Of Interest</p>
                  </div>

                  {/* Sub Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub Category <span className="text-red-500">*</span>
                    </label>
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
                    <p className="text-sm text-blue-600 mt-1">You Can Choose Multiple Sub-Categories</p>
                  </div>
                </div>

                {/* Describe Your Need */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe Your Need <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={describeNeed}
                    onChange={(e) => setDescribeNeed(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent resize-y"
                    placeholder="You May Describe Your Future Needs/Requirements Here"
                  />
                </div>
              </div>

              {/* Subscription Preferences */}
              <div className="mb-8 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-1">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    Subscription Preferences
                  </h2>
                </div>
                <p className="text-gray-500 text-sm mb-6 ml-8">
                  Select what you'd like to receive
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subscriptionOptions.map((option) => {
                    const OptionIcon = option.icon;
                    return (
                      <label
                        key={option.id}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all min-h-[56px] ${
                          subscriptions[option.id]
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={subscriptions[option.id]}
                          onChange={() => handleSubscriptionChange(option.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <OptionIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    );
                  })}
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

export default MembershipStep4;
