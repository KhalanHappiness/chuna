import React, { useState } from 'react';
import { Play, Menu, X, Phone, Mail, MapPin, Clock, Award, Users, Target, Eye, Heart, Shield, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';

export default function WhoWeAre() {

  const [videoOpen, setVideoOpen] = useState(false);

  const coreValues = [
    {
      icon: Users,
      title: 'TEAMWORK',
      description: 'Chuna Sacco shall closely collaborate with all stakeholders to ensure effective and efficient delivery of its products and services to members and customers.'
    },
    {
      icon: Shield,
      title: 'ACCOUNTABILITY',
      description: 'Chuna Sacco shall carry out its duties in an accountable manner by acknowledging and assuming responsibility for its products and services.'
    },
    {
      icon: Lightbulb,
      title: 'CREATIVITY & INNOVATION',
      description: 'The Sacco shall continuously and consistently develop new ideas, solutions, processes, products and services for the benefit of its members and customers.'
    },
    {
      icon: CheckCircle,
      title: 'EQUALITY',
      description: 'All Chuna Sacco members are given equal opportunities in access to Sacco products and services.'
    },
    {
      icon: Heart,
      title: 'INTEGRITY',
      description: 'Chuna Sacco Staff and Management possesses and adheres to high moral principles, ethics and professional standards. The Society shall always conduct its affairs in a manner that is above reproach. We are committed to acting at all times with honesty, fairness, transparency, ethics and being above board in our operations'
    },
    {
      icon: TrendingUp,
      title: 'EFFICIENCY',
      description: 'Chuna Sacco will utilize resources optimally. The Society shall endeavor to conduct its operations in a manner that is efficient in providing diversified reliable, accessible and affordable financial products and services.'
    }
  ];

  const awards = [
    {
      title: 'MOST EFFICIENT DEPOSIT TAKING SACCO',
      image: '/api/placeholder/200/150'
    },
    {
      title: 'SAVINGS DEPOSIT TAKING SACCOS: BEST IN SAVINGS DEPOSIT TAKING SACCOS',
      image: '/api/placeholder/200/150'
    },
    {
      title: 'TECHNOLOGY - SECOND BEST IN TECHNOLOGY OPTIMIZATION TECHNOLOGY',
      image: '/api/placeholder/200/150'
    },
    {
      title: 'BEST MANAGED DEPOSIT TAKING SACCO',
      image: '/api/placeholder/200/150'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16">
     

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">WHO WE ARE</h2>
            <h3 className="text-2xl text-green-600 font-semibold">UoN - Chuna DT Sacco Ltd</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://www.chunasacco.co.ke/sites/default/files/all-uploads/inver.jpg" 
                  alt="Savings Growth"
                  className="w-full h-66 object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-red-700 transition-colors"
                    onClick={() => setVideoOpen(true)} 
                  >
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                A VARIETY OF SERVICES ARE OFFERED TO THROUGH THE BACK OFFICE SERVICE ACTIVITIES 
                (BOSA) AND FRONT OFFICE SERVICE ACTIVITIES (FOSA) FOR BOTH BOSA AND FOSA FORM 
                UoN CHUNA.
              </p>
            </div>
            
            <div className="bg-green-600 text-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <CheckCircle className="mr-2" size={24} />
                BRIEFLY ABOUT CHUNA- DT SACCO LTD
              </h4>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>CHUNA SACCO LTD was established in the year 1976. The principal objective/function of the sacco is:</p>
                <div className="space-y-2">
                  <p className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 flex-shrink-0" size={16} />
                    To afford its members an opportunity to save money
                  </p>
                  <p className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 flex-shrink-0" size={16} />
                    To offer credit facilities to members. A pool of savings created from where various types of loans are issued to members.
                  </p>
                </div>
                <p>A variety of services are offered through the Back Office Service Activities (BOSA) and Front Office Service Activities (FOSA). i.e both BOSA and FOSA form up CHUNA SACCO. SACCO's are now regulated under by the Sacco Society Regulatory Authority (SASRA).</p>
                <p>The authority has put minimum standards for saccos like CHUNA to meet. One of the standards which is paramount to meet is the capital adequacy ratio. For Chuna Sacco, it is expected to meet the capital adequacy ratios by end of 2014.</p>
                <p>Towards achieving the ratio, members are expected to raise shares in one of the following ways: Contribute (by paying cash at CHUNA office) any amount of money that one can afford. The payout can be done immediately one gets salary. Somebody can come to CHUNA and pledge a monthly deduction from salary of say Kshs 500/= (Kenya Shillings Five Hundred only) or more to go towards share capital.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, CSR Section */}
      <section className="py-16 bg-gradient-to-b from-green-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-green-600 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Target className="text-green-600 mr-3" size={32} />
                <h3 className="text-xl font-bold text-gray-800">MISSION</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To mobilize savings and provide affordable financial services aimed at promoting socio-economic 
                welfare of members through prudent management and diversification of products and services 
                while recognizing the interest of stakeholders.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Eye className="text-blue-600 mr-3" size={32} />
                <h3 className="text-xl font-bold text-gray-800">OUR VISION</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be the Leading Sacco, providing quality and dynamic financial services to its members.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-orange-600 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Heart className="text-orange-600 mr-3" size={32} />
                <h3 className="text-xl font-bold text-gray-800">CORPORATE SOCIAL RESPONSIBILITY</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                CHUNA SACCO takes part in CSR Activities. This is to promote unity and give back to the community. Some recent CSR engagements are; 1. Children’s home visit 2. Slum clean up-2022
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">CORE VALUES</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Icon className="text-green-600" size={24} />
                    </div>
                    <h3 className="font-bold text-gray-800">{value.title}</h3>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Award className="mr-3 text-yellow-500" size={32} />
              AWARDS
            </h2>
            <h3 className="text-xl text-green-600 font-semibold mb-4">Chuna Success Story</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              As a competitive sacco in the region, we have won several awards. Some include: Best Sacco 
              employer based 2019, Second Best Sacco in Technology usage 2022, and Best improved sacco - 2022.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-white p-4 rounded-lg mb-4 shadow-inner">
                  <Award className="text-yellow-500 mx-auto" size={48} />
                </div>
                <h4 className="font-bold text-center text-gray-800 text-sm">{award.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

    
     {/* Video Modal */}
{videoOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-[90%] max-w-5xl h-[70vh] relative">
      {/* Close button */}
      <button 
        onClick={() => setVideoOpen(false)} 
        className="absolute top-2 right-2 text-black text-2xl font-bold z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        ✕
      </button>
      {/* YouTube iframe - Fixed URL */}
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
    </div>
  );
}