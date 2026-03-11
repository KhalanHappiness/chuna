import React, { useState, useEffect } from 'react';
import { Shield, Home, Car, Heart, Menu, X, ArrowRight, CheckCircle, Users, Clock, Award, Phone, Mail, MapPin } from 'lucide-react';

const InnovationsPage   = () => {
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
      features: ["Comprehensive Coverage", "24/7 Support", "Quick Claims Process"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      color: "green-600",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      ringColor: "ring-green-500",
      textColor: "text-green-600",
      lightBg: "bg-green-100"
    },
    {
      icon: Car,
      title: "CAR INSURANCE",
      description: "Your Car insurance is now minutes away. Worried about premiums? Worry no more. With our BIMA Loan get your premiums revamped and enjoy repayment flexibility.",
      features: ["Instant Coverage", "Flexible Payments", "Nationwide Service"],
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
      color: "cyan-600",
      bgColor: "bg-cyan-600",
      hoverColor: "hover:bg-cyan-700",
      ringColor: "ring-cyan-500",
      textColor: "text-cyan-600",
      lightBg: "bg-cyan-100"
    },
    {
      icon: Heart,
      title: "MEDI PLAN",
      description: "CHUNA SACCO Mediplan is designed for your comfort in old age. Comprehensive health coverage for you and your family.",
      features: ["Family Coverage", "Senior Care", "Wellness Programs"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      color: "amber-600",
      bgColor: "bg-amber-600",
      hoverColor: "hover:bg-amber-700",
      ringColor: "ring-amber-500",
      textColor: "text-amber-600",
      lightBg: "bg-amber-100"
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
  

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer ${
                  activeService === index ? `ring-4 ring-offset-2 ${service.ringColor} shadow-2xl scale-105` : ''
                }`}
                onMouseEnter={() => setActiveService(index)}
              >
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${service.bgColor} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <service.icon className={`w-7 h-7 ${service.textColor}`} />
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 group/item">
                        <div className={`w-6 h-6 ${service.lightBg} rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:${service.bgColor} transition-colors`}>
                          <CheckCircle className={`w-4 h-4 ${service.textColor} group-hover/item:text-white transition-colors`} />
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full ${service.bgColor} ${service.hoverColor} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105`}>
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default InnovationsPage;