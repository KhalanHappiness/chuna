import { Users, TrendingUp, Shield, BookOpen, Building2, CreditCard, Phone, Mail, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import chunaLogo from '../assets/chuna.png'

const Footer = () => {

    const quickLinks = [
    { name: "Mchuna Application", href: "https://cloudpesa.chunasacco.co.ke/" },
    { name: "Help Desk", href: "http://www.helpdesk.chunasacco.co.ke:8089/" },
    { name: "Online Loan Application", href: "https://www.internetbanking.chunasacco.co.ke/" },
    { name: "Asset Financing", href: "/asset-financing" },
    { name: "Group Loan", href: "/group-loan" },
    { name: "New Membership Application", href: "https://applications.chunasacco.co.ke/index.php?r=new-membership" }
  ]
  
  return (
    <footer className="bg-white text-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div>
                <img 
                  src={chunaLogo} 
                  alt="Chuna DT Sacco Logo" 
                  className="h-12 w-auto hover:opacity-90 transition-opacity"
                />
              </div>
            
            </div>
            <p className="text-gray-400 mb-2">
             Our Mission
            </p>
            <p className="text-gray-400 mb-4">
             To mobilize savings and provide affordable financial services aimed at promoting socio-economic welfare of members through prudent management and diversification of products and services while recognizing the interest of stakeholders.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                University of Nairobi, Main Campus
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                +254 758 111 222
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <a 
                    href="mailto:chunasacco@uonbi.ac.ke" 
                    className="hover:text-emerald-600 transition-colors"
                >
                    Mail us
                </a>
              </li>
              <li className="text-gray-400">
                Mon-Fri: 8AM-5PM
              </li>
            </ul>
          </div>
          
          {/* Stay Updated */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest updates on new products and services.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 bg-gray-100 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © Copyright Chuna Co-operative Savings & Credit Society Ltd 2025. All Rights Reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.chunasacco.co.ke/sites/default/files/2025-02/Privacy%20Policy%20for%20Chuna%20SACCO%20Mobile%20Banking%20App.pdf" className="text-gray-400 hover:text-emerald-600 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-emerald-600 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer
