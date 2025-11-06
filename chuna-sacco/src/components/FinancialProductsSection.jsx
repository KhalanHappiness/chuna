import { Users, TrendingUp, Shield, BookOpen, Building2, CreditCard, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const ProductCard = ({ icon: Icon, title, description, features, color, buttonText = "Learn More →" }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      hover: "hover:text-blue-800 hover:bg-blue-50",
      border: "hover:border-blue-300",
      title: "hover:text-blue-600"
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      hover: "hover:text-emerald-800 hover:bg-emerald-50",
      border: "hover:border-emerald-300",
      title: "hover:text-emerald-600"
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      hover: "hover:text-green-800 hover:bg-green-50",
      border: "hover:border-green-300",
      title: "hover:text-green-600"
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      hover: "hover:text-purple-800 hover:bg-purple-50",
      border: "hover:border-purple-300",
      title: "hover:text-purple-600"
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      hover: "hover:text-orange-800 hover:bg-orange-50",
      border: "hover:border-orange-300",
      title: "hover:text-orange-600"
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      hover: "hover:text-red-800 hover:bg-red-50",
      border: "hover:border-red-300",
      title: "hover:text-red-600"
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transform transition-all duration-300 border border-gray-100 ${colors.border}`}>
      <div className={`${colors.bg} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
        <Icon className={`h-6 w-6 ${colors.text}`} />
      </div>
      <h3 className={`text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 ${colors.title}`}>{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`${colors.text} ${colors.hover} px-4 py-2 rounded-lg font-medium transition-all duration-300`}>
        {buttonText}
      </button>
    </div>
  );
};

const ImageProductCard = ({ icon: Icon, title, description, imageType, buttonText = "READ MORE" }) => {
  // Custom image backgrounds based on product type
  const getImageBackground = (type) => {
    switch (type) {
      case 'loan':
        return 'bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-100';
      case 'online':
        return 'bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-100';
      case 'savings':
        return 'bg-gradient-to-br from-green-200 via-emerald-100 to-lime-100';
      case 'bosa':
        return 'bg-gradient-to-br from-teal-200 via-green-100 to-emerald-100';
      default:
        return 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50';
    }
  };

  // Custom illustrations for each product type
  const getIllustration = (type) => {
    switch (type) {
      case 'loan':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            {/* House and money illustration */}
            <div className="text-6xl">🏠</div>
            <div className="absolute top-2 right-4 text-2xl animate-bounce">💰</div>
            <div className="absolute bottom-2 left-4 text-xl">📄</div>
          </div>
        );
      case 'online':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            {/* Laptop with online banking */}
            <div className="text-6xl">💻</div>
            <div className="absolute top-2 right-2 text-xl animate-pulse">🌐</div>
            <div className="absolute bottom-2 left-2 text-lg">💳</div>
          </div>
        );
      case 'savings':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            {/* Growing money and plant */}
            <div className="text-5xl">🌱</div>
            <div className="absolute top-2 right-4 text-3xl">💰</div>
            <div className="absolute bottom-2 left-4 text-2xl animate-bounce">📈</div>
          </div>
        );
      case 'bosa':
        return (
          <div className="relative w-full h-32 flex items-center justify-center">
            {/* Person with documents */}
            <div className="text-5xl">👩‍💼</div>
            <div className="absolute top-2 right-2 text-2xl animate-pulse">📊</div>
            <div className="absolute bottom-2 left-2 text-xl">✅</div>
          </div>
        );
      default:
        return <div className="text-6xl">📋</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100 border-b-4 border-b-green-600">
      {/* Image Section */}
      <div className={`${getImageBackground(imageType)} relative h-40 overflow-hidden`}>
        {getIllustration(imageType)}
      </div>
      
      {/* Content Section */}
      <div className="p-6 relative">
        {/* Circular Icon */}
        <div className="absolute -top-6 left-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        
        {/* Content */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[60px]">
            {description}
          </p>
          
          {/* Read More Button */}
          <button className="text-green-600 font-bold text-sm hover:text-emerald-800 transition-colors duration-300 flex items-center group">
            {buttonText}
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const FlipProductCard = ({ icon: Icon, title, description, features, buttonText = "Learn More →" }) => {
  return (
    <div className="group [perspective:1000px] cursor-pointer">
      <div className="relative h-80 w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Side */}
        <div className="absolute inset-0 bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center [backface-visibility:hidden]">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <Icon className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 text-center">{title}</h3>
        </div>
        
        {/* Back Side */}
        <div className="absolute inset-0 bg-green-600 text-white p-6 rounded-xl shadow-md flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div>
            <p className="text-sm mb-4">{description}</p>
            <ul className="space-y-1 text-sm">
              {features?.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-white mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button className="mt-4 bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            {buttonText}
          </button>
        </div>

      </div>
    </div>
  );
};


const FinancialProductsSection = () => {
  const products = [
    {
      icon: BookOpen,
      title: "School Fees Loan",
      description: "Flexible loan options to cover your tuition fees with competitive rates and convenient repayment terms.",
      features: ["Up to KSh 500,000", "Flexible repayment", "Competitive rates"],
      color: "blue"
    },
    {
      icon: Shield,
      title: "Emergency Loan",
      description: "Quick access to funds for unexpected expenses. Get immediate and structured online loans.",
      features: ["Instant approval", "Quick disbursement", "Flexible repayment"],
      color: "emerald"
    },
    {
      icon: TrendingUp,
      title: "Savings Account",
      description: "Grow your money with attractive interest rates and flexible withdrawal options.",
      features: ["Competitive rates", "No withdrawal limits", "Mobile banking"],
      color: "green"
    },
    {
      icon: Shield,
      title: "Insurance Cover",
      description: "Comprehensive insurance to protect you and your family's financial future.",
      features: ["Life cover", "Loan protection", "Family benefits"],
      color: "purple"
    },
    {
      icon: Building2,
      title: "Development Loan",
      description: "Fund your projects and achieve home improvements, or business ventures.",
      features: ["Home improvement", "Extended terms", "Flexible use"],
      color: "orange"
    },
    {
      icon: CreditCard,
      title: "M-CHUNA",
      description: "Mobile money solutions for convenient transactions, payments and account management.",
      features: ["24/7 access", "Secure payments", "Easy transfers"],
      color: "red"
    }
  ];

  // Image-based products similar to your reference
  const imageProducts = [
    {
      icon: BookOpen,
      title: "FOSA Products",
      description: "The Society has opened a Front Office Service Activities (FOSA) office as a way of deepening its financial service delivery to members.",
      imageType: "loan"
    },
    {
      icon: CreditCard,
      title: "Online Services", 
      description: "Get access to our online services easily. You can pay and apply for instant loans from the comfort of your home.",
      imageType: "online"
    },
    {
      icon: TrendingUp,
      title: "Member Savings",
      description: "Explore our diverse range of savings accounts designed to cater to the dynamic demands of the Kenyan market.",
      imageType: "savings"
    },
    {
      icon: Users,
      title: "BOSA Products",
      description: "Our Back Office Service Activities (BOSA) Loans Products, crafted with a keen understanding of individual member requirements.",
      imageType: "bosa"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Range of Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          We provide flexible savings and loan products tailored to support the financial goals of individuals, families, and businesses across Kenya.
          </p>
        </div>
        
        {/* Image-based Product Cards Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {imageProducts.map((product, index) => (
              <FlipProductCard key={index} {...product} />
            ))}
          </div>
        </div>

       
        
        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 font-medium">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinancialProductsSection