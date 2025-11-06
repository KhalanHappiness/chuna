import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, Search } from 'lucide-react';

const Mchuna = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false); // 👈 new state

  const navItems = [
    { name: 'HOME', href: '#' },
    { name: 'ABOUT', href: '#', hasDropdown: true },
    { name: 'PRODUCTS', href: '#', hasDropdown: true },
    { name: 'MEMBERSHIP', href: '#', hasDropdown: true },
    { name: 'MEDIA CENTRE', href: '#', hasDropdown: true },
    { name: 'DOWNLOADS', href: '#' },
    { name: 'CONTACT US', href: '#' }
  ];

  const services = [
    'Enquire about balances',
    'Cash withdraw',
    'Make Payments and deposits',
    'Pay loans',
    'Access Mchuna loan',
    'Funds transfer'
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-24">
    
      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">
              Mobile Banking
            </p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Digital Banking Services
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-gray-200 overflow-hidden shadow-2xl relative">
                <img 
                  src="https://www.chunasacco.co.ke/sites/default/files/2024-02/670png.png" 
                  alt="chuna sacco" 
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-red-700 transition-colors"
                    onClick={() => setVideoOpen(true)} 
                  >
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              
              {/* Brand Tag */}
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-gray-800">CHUNA SACCO</p>
                <p className="text-xs text-green-600">#CHUNA IS HOME</p>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                In an effort to serve you better, We have a mobile banking platform which Mobile banking 
                allows members to transact remotely using their mobile phones. To access the services, a 
                member must fill and submit the Mobile Banking Application Form. The service can be 
                accessed by dialing *670#.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">CHUNA SACCO Mobile Banking allows you to:</h3>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <p className="text-gray-700">
                  One can deposit direct using our Mpesa Paybill number <strong>561999</strong>
                </p>
                <p className="text-gray-700 mt-2">
                  Email us: <a href="mailto:chunasacco@uonbi.ac.ke" className="text-green-600 hover:underline">chunasacco@uonbi.ac.ke</a>
                </p>
                <p className="text-green-600 font-semibold mt-2">#chunaishome</p>
              </div>
            </div>
          </div>
        </div>
      </main>

     {/* 🎬 Video Modal */}
{videoOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-[90%] max-w-5xl h-[70vh] relative">
      {/* Close button */}
      <button 
        onClick={() => setVideoOpen(false)} 
        className="absolute top-2 right-2 text-black text-2xl font-bold z-10"
      >
        ✕
      </button>
      {/* YouTube iframe */}
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/K9jOswGlNoA?autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}

    </div>
  );
};

export default Mchuna;
