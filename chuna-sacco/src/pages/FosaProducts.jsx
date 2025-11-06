import React, { useState } from 'react';
import { Download, ChevronRight, Clock, DollarSign, Users, BookOpen, PiggyBank, AlertCircle, CheckCircle2 } from 'lucide-react';

const ServiceCard = ({ title, amount, period, features, downloadText, icon: Icon, highlighted = false, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-green-200 bg-white transition-all duration-300 hover:shadow-xl sm:hover:scale-105 border-b-4 border-b-green-600 ${highlighted ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Image */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-90"
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/80 to-green-600/80" />
        
        {/* Icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-3 sm:p-4 backdrop-blur-sm">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>

        {highlighted && (
          <span className="absolute top-3 right-3 rounded-full bg-yellow-400 px-2 py-1 sm:px-3 text-xs font-bold text-green-800 shadow-lg">
            POPULAR
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-6">
        <div className="relative z-10">
          <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-green-800 leading-tight">{title}</h3>
          
          {amount && (
            <div className="mb-3 sm:mb-4">
              <div className="text-xl sm:text-3xl font-bold text-green-600 leading-tight">Ksh {amount}</div>
              {period && <div className="mt-1 text-xs sm:text-sm text-green-800 opacity-70">/ {period}</div>}
            </div>
          )}
          
          <ul className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
            {features.slice(0, isHovered ? features.length : 3).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle2 className="mt-0.5 h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-green-800 leading-relaxed">{feature}</span>
              </li>
            ))}
            {features.length > 3 && !isHovered && (
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                +{features.length - 3} more benefits
              </div>
            )}
          </ul>
          
          <button 
            className="group w-full rounded-lg bg-green-600 hover:bg-green-700 px-3 py-2.5 sm:px-4 sm:py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
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

const FosaProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Services', icon: Users },
    { id: 'loans', name: 'Loans', icon: DollarSign },
    { id: 'savings', name: 'Savings', icon: PiggyBank },
    { id: 'accounts', name: 'Accounts', icon: BookOpen }
  ];

  const services = [
    {
      id: 1,
      title: "Salary in Advance",
      amount: "60% of Basic Salary",
      period: "PAYABLE IN 14 MONTHS",
      category: 'loans',
      image: 'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Maximum loan amount is 60% of Member basic salary",
        "Member salary must pass through FOSA for at least 12 months",
        "Recovered within 3 month",
        "A third unit is applicable",
        "Interest rate is charged at 10% upfront",
        "Processed within 3 day"
      ],
      downloadText: "Download Form",
      icon: Clock
    },
    {
      id: 2,
      title: "Salary Advance",
      amount: "60% of Net Salary", 
      period: "PAYABLE IN 14 MONTHS",
      category: 'loans',
      image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Salary must pass through FOSA at least three months",
        "Loan recovered within a maximum of one (1) month",
        "Processed within 3 hours"
      ],
      downloadText: "Download Form",
      icon: DollarSign
    },
    {
      id: 3,
      title: "FOSA Loan",
      amount: "300,000 max",
      period: "PAYABLE IN 48 MONTHS", 
      category: 'loans',
      image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Third rule apply",
        "Not pegged to deposit contribution but on salary",
        "Maximum repayment period is 17 months",
        "A third rule is applicable",
        "Effective interest rate is charged at 13% P.A",
        "Processed within a day",
        "Able to top up"
      ],
      downloadText: "Download Form",
      icon: DollarSign,
      highlighted: true
    },
    {
      id: 4,
      title: "Emergency Loan 20 Months",
      amount: "300,000 Max",
      period: "PAYABLE IN 20 MONTHS",
      category: 'loans',
      image: 'https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Interest rate of 3% per month amortized",
        "Turn around time is one day",
        "Third rule apply"
      ],
      downloadText: "Download Form",
      icon: AlertCircle
    },
    {
      id: 5,
      title: "Karibu EMG Loan",
      amount: "100,000 Max",
      period: "PAYABLE IN 16 MONTHS",
      category: 'loans',
      image: 'https://images.unsplash.com/photo-1639754390580-2e7437267698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Designed for new Sacco members",
        "A least (1/3) of the loan is deducted as deposits and 1st 5000 share capital",
        "Maximum repayment period is twelve (12) months",
        "Maximum amount is ksh 100,000",
        "Loan must be fully secured",
        "Competitive interest rate"
      ],
      downloadText: "Download Form",
      icon: Users
    },
    {
      id: 6,
      title: "Education Savings Account",
      amount: "Savings Account",
      period: "INTEREST PAYABLE IN 30 MONTHS",
      category: 'savings',
      image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Designed for all Sacco members",
        "Minimum monthly contribution of 500 shillings",
        "Withdrawable three times a year",
        "Earns minimum interest of 10%"
      ],
      downloadText: "Download Form",
      icon: BookOpen
    },
    {
      id: 7,
      title: "Holiday Savings Account", 
      amount: "Savings Account",
      period: "INTEREST PAYABLE IN 12 MONTHS",
      category: 'savings',
      image: 'https://images.unsplash.com/photo-1640622843377-6b5af9417e70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Designed for all Sacco members",
        "Minimum monthly contribution of 500 shillings",
        "Withdrawable three times a year",
        "Earns minimum interest of 10%"
      ],
      downloadText: "Download Form",
      icon: PiggyBank
    },
    {
      id: 8,
      title: "Junior Savings Account",
      amount: "Savings Account", 
      period: "INTEREST PAYABLE IN 24 MONTHS",
      category: 'savings',
      image: 'https://images.unsplash.com/photo-1638913970779-388698e52c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "Designed for all Sacco members",
        "Minimum monthly contribution of 500 shillings",
        "Withdrawable three times a year", 
        "Earns minimum interest of 10%"
      ],
      downloadText: "Download Form",
      icon: Users
    },
    {
      id: 9,
      title: "FOSA Ordinary Account",
      amount: "Ordinary Account",
      category: 'accounts',
      image: 'https://images.unsplash.com/photo-1640622300473-977435c38c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: [
        "No ledger fees or account maintenance Fees",
        "No withdrawal limit",
        "Minimum balance of 500 shillings", 
        "Zero benefaction on every activity"
      ],
      downloadText: "Download Form",
      icon: BookOpen
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
            <div className="mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide">
              FOSA
            </div>
            <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 leading-tight">
              Chuna Front Office Products Available For You
            </h1>
            <div className="mx-auto h-1 w-12 sm:w-16 bg-green-600 mb-4 sm:mb-8"></div>
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
                      ? 'bg-green-600 text-white shadow-lg'
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

      {/* Contact CTA - Mobile Optimized */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold leading-tight">Ready to Get Started?</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-xl text-green-100 leading-relaxed">
            Contact us today to learn more about our services and how we can help you achieve your financial goals.
          </p>
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-white px-6 py-3 sm:px-8 sm:py-4 font-semibold text-green-600 transition-all duration-200 hover:shadow-lg sm:hover:scale-105">
              Contact Us
            </button>
            <button className="rounded-lg border-2 border-white px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-green-600">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FosaProducts;