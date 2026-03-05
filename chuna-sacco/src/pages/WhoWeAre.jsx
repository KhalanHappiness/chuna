import React, { useState } from 'react';
import { Play, Menu, X, Phone, Mail, MapPin, Clock, Award, Users, Target, Eye, Heart, Shield, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';
import grow from '../assets/sliderimg4.jpeg';

export default function WhoWeAre() {

  const [videoOpen, setVideoOpen] = useState(false);

  const coreValues = [
    {
      icon: Users,
      title: 'TEAMWORK',
      description: 'Chuna Sacco shall closely collaborate with all stakeholders to ensure effective and efficient delivery of its products and services to members and customers.',
      color: 'cyan',
      bgColor: 'bg-cyan-600',
      lightBg: 'bg-cyan-100',
      textColor: 'text-cyan-600',
      border: 'border-cyan-600'
    },
    {
      icon: Shield,
      title: 'ACCOUNTABILITY',
      description: 'Chuna Sacco shall carry out its duties in an accountable manner by acknowledging and assuming responsibility for its products and services.',
      color: 'green',
      bgColor: 'bg-green-600',
      lightBg: 'bg-green-100',
      textColor: 'text-green-600',
      border: 'border-green-600'
    },
    {
      icon: Lightbulb,
      title: 'CREATIVITY & INNOVATION',
      description: 'The Sacco shall continuously and consistently develop new ideas, solutions, processes, products and services for the benefit of its members and customers.',
      color: 'amber',
      bgColor: 'bg-amber-600',
      lightBg: 'bg-amber-100',
      textColor: 'text-amber-600',
      border: 'border-amber-600'
    },
    {
      icon: CheckCircle,
      title: 'EQUALITY',
      description: 'All Chuna Sacco members are given equal opportunities in access to Sacco products and services.',
      color: 'cyan',
      bgColor: 'bg-cyan-600',
      lightBg: 'bg-cyan-100',
      textColor: 'text-cyan-600',
      border: 'border-cyan-600'
    },
    {
      icon: Heart,
      title: 'INTEGRITY',
      description: 'Chuna Sacco Staff and Management possesses and adheres to high moral principles, ethics and professional standards. The Society shall always conduct its affairs in a manner that is above reproach. We are committed to acting at all times with honesty, fairness, transparency, ethics and being above board in our operations',
      color: 'green',
      bgColor: 'bg-green-600',
      lightBg: 'bg-green-100',
      textColor: 'text-green-600',
      border: 'border-green-600'
    },
    {
      icon: TrendingUp,
      title: 'EFFICIENCY',
      description: 'Chuna Sacco will utilize resources optimally. The Society shall endeavor to conduct its operations in a manner that is efficient in providing diversified reliable, accessible and affordable financial products and services.',
      color: 'amber',
      bgColor: 'bg-amber-600',
      lightBg: 'bg-amber-100',
      textColor: 'text-amber-600',
      border: 'border-amber-600'
    }
  ];

  const awards = [
    {
      title: 'MOST EFFICIENT DEPOSIT TAKING SACCO',
      color: 'cyan',
      bgColor: 'bg-cyan-600',
      lightBg: 'from-cyan-50 to-cyan-100'
    },
    {
      title: 'SAVINGS DEPOSIT TAKING SACCOS: BEST IN SAVINGS DEPOSIT TAKING SACCOS',
      color: 'green',
      bgColor: 'bg-green-600',
      lightBg: 'from-green-50 to-green-100'
    },
    {
      title: 'TECHNOLOGY - SECOND BEST IN TECHNOLOGY OPTIMIZATION TECHNOLOGY',
      color: 'amber',
      bgColor: 'bg-amber-600',
      lightBg: 'from-amber-50 to-amber-100'
    },
    {
      title: 'BEST MANAGED DEPOSIT TAKING SACCO',
      color: 'green',
      bgColor: 'bg-green-600',
      lightBg: 'from-green-50 to-green-100'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-16 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-100 text-cyan-800 rounded-full text-sm font-semibold mb-6 shadow-lg border-2 border-cyan-200">
              <Shield className="w-4 h-4 mr-2" />
              ABOUT US
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">WHO WE ARE</h2>
            <h3 className="text-2xl md:text-3xl text-amber-600 font-semibold">UoN - Chuna DT Sacco Ltd</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                <div className="absolute inset-0 bg-green-600 opacity-70"></div>
                <img 
                  src={grow} 
                  alt="Savings Growth"
                  className="w-full h-96 object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 relative group"
                    onClick={() => setVideoOpen(true)} 
                  >
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-600 animate-ping-slow opacity-75"></div>
                    <div className="absolute inset-0 rounded-full bg-amber-600 opacity-90"></div>
                    <Play className="text-white ml-1 relative z-10" size={36} />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6 italic leading-relaxed">
                A VARIETY OF SERVICES ARE OFFERED TO THROUGH THE BACK OFFICE SERVICE ACTIVITIES 
                (BOSA) AND FRONT OFFICE SERVICE ACTIVITIES (FOSA) FOR BOTH BOSA AND FOSA FORM 
                UoN CHUNA.
              </p>
            </div>
            
            <div className="relative bg-white p-8 md:p-10 rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl overflow-hidden border-t-8 border-cyan-600">
              <div className="absolute inset-0 bg-cyan-600 opacity-90"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-6 flex items-center text-white">
                  <CheckCircle className="mr-3" size={28} />
                  BRIEFLY ABOUT CHUNA- DT SACCO LTD
                </h4>
                <div className="space-y-4 text-sm leading-relaxed text-white">
                  <p>CHUNA SACCO LTD was established in the year 1976. The principal objective/function of the sacco is:</p>
                  <div className="space-y-3 bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                    <p className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 flex-shrink-0 text-amber-300" size={16} />
                      <span>To afford its members an opportunity to save money</span>
                    </p>
                    <p className="flex items-start">
                      <CheckCircle className="mr-2 mt-1 flex-shrink-0 text-green-300" size={16} />
                      <span>To offer credit facilities to members. A pool of savings created from where various types of loans are issued to members.</span>
                    </p>
                  </div>
                  <p>A variety of services are offered through the Back Office Service Activities (BOSA) and Front Office Service Activities (FOSA). i.e both BOSA and FOSA form up CHUNA SACCO. SACCO's are now regulated under by the Sacco Society Regulatory Authority (SASRA).</p>
                  <p>The authority has put minimum standards for saccos like CHUNA to meet. One of the standards which is paramount to meet is the capital adequacy ratio. For Chuna Sacco, it is expected to meet the capital adequacy ratios by end of 2014.</p>
                  <p>Towards achieving the ratio, members are expected to raise shares in one of the following ways: Contribute (by paying cash at CHUNA office) any amount of money that one can afford. The payout can be done immediately one gets salary. Somebody can come to CHUNA and pledge a monthly deduction from salary of say Kshs 500/= (Kenya Shillings Five Hundred only) or more to go towards share capital.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, CSR Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-amber-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-amber-600 transition-all shadow-lg">
                  <Target className="text-amber-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">MISSION</h3>
              </div>
              <p className="text-gray-600 leading-relaxed relative z-10">
                To mobilize savings and provide affordable financial services aimed at promoting socio-economic 
                welfare of members through prudent management and diversification of products and services 
                while recognizing the interest of stakeholders.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-green-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-green-600 transition-all shadow-lg">
                  <Eye className="text-green-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">OUR VISION</h3>
              </div>
              <p className="text-gray-600 leading-relaxed relative z-10">
                To be the Leading Sacco, providing quality and dynamic financial services to its members.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-cyan-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-cyan-600 transition-all shadow-lg">
                  <Heart className="text-cyan-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">CORPORATE SOCIAL RESPONSIBILITY</h3>
              </div>
              <p className="text-gray-600 leading-relaxed relative z-10">
                CHUNA SACCO takes part in CSR Activities. This is to promote unity and give back to the community. Some recent CSR engagements are; 1. Children's home visit 2. Slum clean up-2022
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-300 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">CORE VALUES</h2>
            <div className="flex justify-center space-x-2">
              <div className="w-8 h-1 bg-cyan-600 rounded-full"></div>
              <div className="w-8 h-1 bg-green-600 rounded-full"></div>
              <div className="w-8 h-1 bg-amber-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className={`bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border-t-4 ${value.border}`}>
                  <div className="flex items-center mb-4">
                    <div className={`${value.lightBg} p-4 rounded-xl mr-4 group-hover:${value.bgColor} transition-colors shadow-md`}>
                      <Icon className={`${value.textColor} group-hover:text-white transition-colors`} size={28} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6 shadow-lg border-2 border-green-200">
              <Award className="w-4 h-4 mr-2" />
              RECOGNITION
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">AWARDS</h2>
            <h3 className="text-2xl text-cyan-600 font-semibold mb-4">Chuna Success Story</h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              As a competitive sacco in the region, we have won several awards. Some include: Best Sacco 
              employer based 2019, Second Best Sacco in Technology usage 2022, and Best improved sacco - 2022.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <div key={index} className={`relative p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden bg-gradient-to-br ${award.lightBg}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg ${award.bgColor} group-hover:scale-110 transition-transform`}>
                    <Award className="text-white" size={40} />
                  </div>
                  <h4 className="font-bold text-center text-gray-800 text-sm leading-relaxed">{award.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl h-[80vh] relative animate-fadeIn">
            <button 
              onClick={() => setVideoOpen(false)} 
              className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 text-xl font-bold z-10 rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-lg"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/fTKaQKU8YjY"
              title="Chuna Sacco Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

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
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}