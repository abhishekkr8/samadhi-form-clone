import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const stakeholders = [
  {
    id: "students",
    title: "Students",
    description: "Perfect for students looking to enhance their skills and network with industry professionals.",
    price: 1000,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=200&fit=crop",
  },
  {
    id: "freelancers",
    title: "Freelancers",
    description: "Ideal for independent professionals seeking collaboration and growth opportunities.",
    price: 5000,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
  },
  {
    id: "educational",
    title: "Educational Institutions",
    description: "For schools and colleges looking to connect with industry and enhance student outcomes.",
    price: 10000,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop",
  },
  {
    id: "startups",
    title: "Startups & MSMEs",
    description: "For emerging businesses seeking resources, mentorship, and market access.",
    price: 10000,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
  },
  {
    id: "incubation",
    title: "Incubation Centres",
    description: "For incubators and accelerators looking to expand their network and resources.",
    price: 10000,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop",
  },
  {
    id: "service-providers",
    title: "Service & Product Providers",
    description: "For businesses offering products and services to the innovation ecosystem.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
  },
  {
    id: "industry",
    title: "Industry",
    description: "For established companies seeking innovation partnerships and talent access.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop",
  },
  {
    id: "project-partner",
    title: "Project Partner",
    description: "For organizations looking to collaborate on specific projects and initiatives.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop",
  },
];

const MembershipStep2 = () => {
  const navigate = useNavigate();

  const handleSelect = (stakeholder) => {
    console.log("Step 2 Submitted - Selected:", stakeholder.title, "Price:", stakeholder.price);
    navigate("/step-3", {
      state: {
        stakeholderId: stakeholder.id,
        stakeholderTitle: stakeholder.title,
        stakeholderPrice: stakeholder.price,
      },
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Green Header */}
          <div className="bg-[#4CAF50] px-8 py-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold">
              Membership Application - Step 2
            </h1>
            <p className="text-green-100 text-sm mt-2">
              Select your stakeholder category
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
              Back to Step 1
            </button>

            {/* Section Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Select Stakeholder
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Choose the category that best describes you
            </p>

            {/* Stakeholder Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stakeholders.map((stakeholder) => (
                <div
                  key={stakeholder.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-transparent transition-all hover:shadow-lg hover:border-[#4CAF50]"
                >
                  {/* Card Image */}
                  <div className="h-40 overflow-hidden">
                    <img
                      src={stakeholder.image}
                      alt={stakeholder.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">
                      {stakeholder.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {stakeholder.description}
                    </p>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-[#4CAF50] text-2xl font-bold">
                        ₹{stakeholder.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-gray-400 text-xs mb-4">
                        Annual Membership Fee
                      </p>

                      <button
                        onClick={() => handleSelect(stakeholder)}
                        className="w-full py-2 px-4 rounded-md border-2 font-semibold transition-colors bg-white text-[#4CAF50] border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipStep2;
