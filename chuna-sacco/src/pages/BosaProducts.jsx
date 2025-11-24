import React, { useState } from 'react';
import { Download, ChevronRight, Clock, DollarSign, Users, BookOpen, PiggyBank, AlertCircle, CheckCircle2, GraduationCap, Home, Car } from 'lucide-react';

const ServiceCard = ({ title, amount, period, features, downloadText, icon: Icon, highlighted = false, image, colorScheme = 'blue' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    blue: {
      border: 'border-[#189CCA33]',
      borderBottom: 'border-b-[#189CCA]',
      ring: 'ring-[#189CCA]',
      gradient: 'from-[#189CCA] to-[#0F6E8E]',
      iconBg: 'bg-white/20',
      title: 'text-[#0F3D4A]',
      amount: 'text-[#189CCA]',
      period: 'text-[#147FA1]',
      check: 'text-[#189CCA]',
      feature: 'text-[#147FA1]',
      button: 'bg-[#189CCA] hover:bg-[#0F6E8E]',
      badge: 'bg-yellow-400 text-[#0F3D4A]'
    },
    gold: {
      border: 'border-yellow-200',
      borderBottom: 'border-b-yellow-600',
      ring: 'ring-yellow-500',
      gradient: 'from-yellow-500 to-amber-600',
      iconBg: 'bg-white/20',
      title: 'text-amber-900',
      amount: 'text-amber-700',
      period: 'text-amber-800',
      check: 'text-amber-600',
      feature: 'text-amber-900',
      button: 'bg-amber-600 hover:bg-amber-700',
      badge: 'bg-blue-400 text-amber-900'
    }
  };

  const scheme = colors[colorScheme];

  return (
    <div 
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl border-2 ${scheme.border} bg-white transition-all duration-300 hover:shadow-xl sm:hover:scale-105 border-b-4 ${scheme.borderBottom} ${highlighted ? `ring-2 ${scheme.ring} ring-offset-2` : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Image */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-80`} />
        
        {/* Icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-3 sm:p-4 backdrop-blur-sm">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>

        {highlighted && (
          <span className={`absolute top-3 right-3 rounded-full ${scheme.badge} px-2 py-1 sm:px-3 text-xs font-bold shadow-lg`}>
            POPULAR
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-6">
        <div className="relative z-10">
          <h3 className={`mb-2 sm:mb-3 text-lg sm:text-xl font-bold ${scheme.title} leading-tight`}>{title}</h3>
          
          {amount && (
            <div className="mb-3 sm:mb-4">
              <div className={`text-xl sm:text-3xl font-bold ${scheme.amount} leading-tight`}>Ksh {amount}</div>
              {period && <div className={`mt-1 text-xs sm:text-sm ${scheme.period} opacity-70`}>/ {period}</div>}
            </div>
          )}
          
          <ul className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
            {features.slice(0, isHovered ? features.length : 3).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle2 className={`mt-0.5 h-3 w-3 sm:h-4 sm:w-4 ${scheme.check} flex-shrink-0`} />
                <span className={`text-xs sm:text-sm ${scheme.feature} leading-relaxed`}>{feature}</span>
              </li>
            ))}
            {features.length > 3 && !isHovered && (
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                +{features.length - 3} more benefits
              </div>
            )}
          </ul>
          
          <button 
            className={`group w-full rounded-lg ${scheme.button} px-3 py-2.5 sm:px-4 sm:py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg text-sm sm:text-base`}
          >
            <span className="flex items-center justify-center space-x-2">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{downloadText}</span>
              <ChevronRight className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const BosaProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Products', icon: Users },
    { id: 'emergency', name: 'Emergency Loans', icon: AlertCircle },
    { id: 'normal', name: 'Normal Loans', icon: DollarSign },
    { id: 'special', name: 'Special Loans', icon: BookOpen }
  ];

  const services = [
    {
      id: 1,
      title: "Emergency Loan 6 Months",
      amount: "300,000 Max",
      period: "PAYABLE IN 24 MONTHS",
      category: 'emergency',
      colorScheme: 'blue',
      image: 'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Minimum net pay of Ksh 5,500.00 after disbursement",
        "Member salary must pass through FOSA",
        "Maximum repayment period is 6 months",
        "Interest rate is charged 10% upfront",
        "Processed within a day"
      ],
      downloadText: "Download Form",
      icon: AlertCircle
    },
    {
      id: 2,
      title: "Emergency Loan 12 Months",
      amount: "300,000 Max",
      period: "PAYABLE IN 30 MONTHS",
      category: 'emergency',
      colorScheme: 'gold',
      image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Maximum repayment period is 12 months",
        "A third rule is applicable",
        "Effective interest rate is charged at 15% p.a",
        "Processed within a day",
        "Able to top up"
      ],
      downloadText: "Download Form",
      icon: AlertCircle
    },
    {
      id: 3,
      title: "Emergency Loan 20 Months",
      amount: "300,000 Max",
      period: "PAYABLE IN 20 MONTHS",
      category: 'emergency',
      colorScheme: 'blue',
      image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Maximum repayment period is 20 months",
        "A third rule is applicable",
        "Effective interest rate is charged at p.a",
        "Processed within a day",
        "Able to top up"
      ],
      downloadText: "Download Form",
      icon: AlertCircle,
      highlighted: true
    },
    {
      id: 4,
      title: "School Fees Loan",
      amount: "300,000 Max",
      period: "PAYABLE IN 60 MONTHS",
      category: 'special',
      colorScheme: 'gold',
      image: 'https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Maximum repayment period is 72 months",
        "A third rule is applicable",
        "Effective interest rate is charged at 12% P.A",
        "Processed within a day",
        "Able to top up"
      ],
      downloadText: "Download Form",
      icon: GraduationCap
    },
    {
      id: 5,
      title: "Jiunge Loan 72 Months",
      amount: "6,000,000 Max",
      period: "PAYABLE IN 72 MONTHS",
      category: 'special',
      colorScheme: 'blue',
      image: 'https://images.unsplash.com/photo-1639754390580-2e7437267698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Deposits Multiplier: 3 (three) times",
        "Must have been a member for at least three months",
        "Fully filled Jiunge Loan application form",
        "Latest pay slip",
        "OPEN FOSA being your monthly salary pay point"
      ],
      downloadText: "Download Form",
      icon: Users
    },
    {
      id: 6,
      title: "Normal 60",
      amount: "UP to 6million",
      period: "60 MONTHS",
      category: 'normal',
      colorScheme: 'gold',
      image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Application must be made on the official loan form duly completed",
        "Agreement and Guarantorship in-line with membership",
        "Member and Guarantor MUST reside in original pay slip front more than one month old",
        "Lending conditions relating at the time of application",
        "Must details on the loan form"
      ],
      downloadText: "Download Form",
      icon: DollarSign
    },
    {
      id: 7,
      title: "Normal Loan (24 Months)",
      amount: "1,000,000 Max",
      period: "PAYABLE IN 24 MONTHS",
      category: 'normal',
      colorScheme: 'blue',
      image: 'https://images.unsplash.com/photo-1640622843377-6b5af9417e70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Application must be made on the official loan form duly completed",
        "Agreement and Guarantorship in-line with membership",
        "The Loan Applicant MUST reside in original pay slip front more than one month old",
        "Lending conditions relating at the time of application",
        "Must details on the loan form"
      ],
      downloadText: "Download Form",
      icon: DollarSign
    },
    {
      id: 8,
      title: "Normal (36 Months)",
      amount: "3,000,000 Max",
      period: "PAYABLE IN 36 MONTHS",
      category: 'normal',
      colorScheme: 'gold',
      image: 'https://images.unsplash.com/photo-1638913970779-388698e52c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Application must be made on the official loan form duly completed",
        "Agreement and Guarantorship in-line with membership",
        "The Loan Applicant MUST reside in original pay slip front more than one month old",
        "Lending conditions relating at the time of application",
        "Must details on the loan form"
      ],
      downloadText: "Download Form",
      icon: DollarSign
    },
    {
      id: 9,
      title: "Normal (48 Months)",
      amount: "6,000,000 Max",
      period: "PAYABLE IN 48 MONTHS",
      category: 'normal',
      colorScheme: 'blue',
      image: 'https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Application must be made on the official loan form duly completed",
        "Agreement and Guarantorship in-line with membership",
        "The Loan Applicant MUST reside in original pay slip front more than one month old",
        "Lending conditions relating at the time of application",
        "Must details on the loan form"
      ],
      downloadText: "Download Form",
      icon: DollarSign
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header - Mobile Optimized */}
      <div className="bg-white/95 px-4 sm:px-6 py-8 sm:py-14 text-gray-900 mt-16 sm:mt-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wide">
              BOSA
            </div>
            <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
              Chuna Back Office Products Available For You
            </h1>
            <div className="mx-auto h-1 w-12 sm:w-16 bg-gradient-to-r from-blue-600 to-amber-500 mb-4 sm:mb-8"></div>
          </div>
        </div>
      </div>

      {/* Category Filter - Mobile Optimized */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-1.5 sm:space-x-2 rounded-full px-3 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="whitespace-nowrap">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Grid - Mobile First */}
      <div className="px-3 sm:px-6 py-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </div>

      {/* Optional CTA Section */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-amber-600 px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold leading-tight">Need Help Choosing?</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-xl text-blue-100 leading-relaxed">
            Our financial advisors are here to help you find the perfect loan product for your needs.
          </p>
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-white px-6 py-3 sm:px-8 sm:py-4 font-semibold text-blue-700 transition-all duration-200 hover:shadow-lg sm:hover:scale-105">
              Get Consultation
            </button>
            <button className="rounded-lg border-2 border-white px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-blue-700">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BosaProducts;