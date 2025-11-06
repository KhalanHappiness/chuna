import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const TopHeaderBar = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const messages = [
    "NEW IMPROVED PRODUCT ALERT (FCOSA EMERGENCY 20)",
    "SPECIAL OFFER: 0% Interest on Student Loans for New Members!",
    "SAVE UP TO 25% on loan processing fees this month",
    "VOTED Best University Banking Partner 2024",
    "DOWNLOAD our mobile app for instant banking"
  ];

  // Auto-advance messages every 12 seconds (time for text to flow)
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 12000);
    
    return () => clearInterval(timer);
  }, [isPaused, messages.length]);

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrentMessage((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Create styles programmatically
  useEffect(() => {
    const styleId = 'marquee-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
        
        @media (min-width: 640px) {
          .animate-marquee {
            animation: marquee 12s linear infinite;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-green-600 text-white py-1 px-2 sm:px-4 text-xs font-medium z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Flowing Text with Navigation Arrows */}
        <div 
          className="flex items-center space-x-1 sm:space-x-2 flex-1 max-w-xs sm:max-w-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            onClick={prevMessage}
            className="hover:bg-emerald-700 p-0.5 sm:p-1 rounded transition-colors duration-200 flex-shrink-0"
            title="Previous message"
          >
            <ChevronLeft className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </button>
          
          <div className="flex-1 overflow-hidden relative">
            <div className={`whitespace-nowrap ${isPaused ? '' : 'animate-marquee'}`}>
              <span className="inline-block pr-8 sm:pr-20 text-xs">
                {messages[currentMessage]}
              </span>
            </div>
          </div>
          
          <button 
            onClick={nextMessage}
            className="hover:bg-emerald-700 p-0.5 sm:p-1 rounded transition-colors duration-200 flex-shrink-0"
            title="Next message"
          >
            <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </button>

          {/* Message indicators - Hidden on very small screens */}
          <div className="hidden xs:flex space-x-1 ml-1 sm:ml-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  index === currentMessage ? 'bg-white' : 'bg-emerald-400'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Right side - Navigation Links */}
        <div className="flex items-center space-x-0.5 sm:space-x-1 text-xs">
          {/* Show only essential links on mobile */}
          <a href="#" className="hover:bg-emerald-700 px-1 sm:px-2 py-1 rounded transition-colors duration-200 hidden sm:inline-block">
            MEMBERS PORTAL
          </a>
          <span className="text-emerald-300 hidden sm:inline">|</span>
          
          {/* Mobile - show abbreviated links */}
          <a href="#" className="hover:bg-emerald-700 px-1 sm:px-2 py-1 rounded transition-colors duration-200 sm:hidden">
            PORTAL
          </a>
          <span className="text-emerald-300 sm:hidden">|</span>
          
          <a href="#" className="hover:bg-emerald-700 px-1 sm:px-2 py-1 rounded transition-colors duration-200 hidden sm:inline-block">
            BID DATA UPDATE
          </a>
          <span className="text-emerald-300 hidden sm:inline">|</span>
          
          <a href="#" className="hover:bg-emerald-700 px-1 sm:px-2 py-1 rounded transition-colors duration-200 hidden lg:inline-block">
            NEW MEMBER APPLICATION
          </a>
          <span className="text-emerald-300 hidden lg:inline">|</span>
          
          {/* Mobile - show abbreviated */}
          <a href="#" className="hover:bg-emerald-700 px-1 py-1 rounded transition-colors duration-200 sm:hidden">
            JOIN
          </a>
          <span className="text-emerald-300 sm:hidden">|</span>
          
          <a href="#" className="hover:bg-emerald-700 px-1 sm:px-2 py-1 rounded transition-colors duration-200">
            <span className="hidden sm:inline">CAREERS</span>
            <span className="sm:hidden">JOBS</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeaderBar;