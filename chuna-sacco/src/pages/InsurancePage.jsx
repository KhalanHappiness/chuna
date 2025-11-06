import React, { useState, useEffect } from 'react';
import { Shield, Home, Car, Heart, Menu, X, ArrowRight, CheckCircle, Users, Clock, Award, Phone, Mail, MapPin } from 'lucide-react';

const InsurancePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });

  const services = [
    {
      icon: Home,
      title: "INSURE YOUR ASSETS",
      description: "With Chuna Sacco we insure your home from any kind of eventuality. As a CHUNA member, we want to ensure your peace of mind.",
      features: ["Comprehensive Coverage", "24/7 Support", "Quick Claims Process"]
    },
    {
      icon: Car,
      title: "CAR INSURANCE",
      description: "Your Car insurance is now minutes away. Worried about premiums? Worry no more. With our BIMA Loan get your premiums revamped and enjoy repayment flexibility.",
      features: ["Instant Coverage", "Flexible Payments", "Nationwide Service"]
    },
    {
      icon: Heart,
      title: "MEDI PLAN",
      description: "CHUNA SACCO Mediplan is designed for your comfort in old age. Comprehensive health coverage for you and your family.",
      features: ["Family Coverage", "Senior Care", "Wellness Programs"]
    }
  ];

  const stats = [
    { icon: Users, number: "50K+", label: "Happy Clients" },
    { icon: Shield, number: "99.9%", label: "Claims Settled" },
    { icon: Clock, number: "24/7", label: "Customer Support" },
    { icon: Award, number: "15+", label: "Years Experience" }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', service: '' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
     

  

      {/* Hero Section */}
      <section className="relative py-8 sm:py-10 md:py-16 lg:py-24 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden mt-28">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-blue-100/30"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-8 shadow-md">
              <Shield className="w-4 h-4 mr-2" />
              INSURANCE
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Are you <span className="text-green-600 relative">
                Covered?
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12" fill="none">
                  <path d="M0 6c20-4 40-4 60 0s40 4 40 0" stroke="currentColor" strokeWidth="2" fill="none" className="text-green-300"/>
                </svg>
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-green-600 font-medium max-w-4xl mx-auto leading-relaxed">
              We Are Now Offering You All Insurance Covers With Ease And Convenience
            </p>
          </div>

         
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 cursor-pointer ${
                  activeService === index ? 'ring-2 ring-green-500 ring-opacity-50 shadow-xl' : ''
                }`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-b-4 border-b-green-600"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg ">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Contact Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-600 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About */}
            <div className="text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">OUR INSURANCE SERVICES</h3>
              <p className="text-lg leading-relaxed mb-6 text-green-100">
                Discover peace of mind with our comprehensive insurance services at Chuna Sacco. From medical and life insurance to homeowners, auto, and personal insurance, we offer a diverse range of coverage options tailored to your specific needs.
              </p>
              <p className="text-green-100 mb-8">
                Whether you're safeguarding your health, securing your family's financial future, protecting your home, hitting the road with confidence, or covering valuable possessions, our dedicated team is here to provide the right level of protection.
              </p>
              <p className="text-green-100">
                With our commitment to exceptional service and personalized attention, trust us to ensure you're covered in every aspect of your life. Contact us today to explore how we can protect what matters most to you.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">GET INSURED INSTANTLY</h4>
                <p className="text-green-600 font-semibold">It's free & easy</p>
              </div>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-800"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-800"
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-800"
                  />
                </div>
                
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-800"
                  >
                    <option value="">Select Insurance Type</option>
                    <option value="home">Home Insurance</option>
                    <option value="car">Car Insurance</option>
                    <option value="medical">Medical Insurance</option>
                    <option value="life">Life Insurance</option>
                  </select>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Get Quote Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

  

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default InsurancePage;