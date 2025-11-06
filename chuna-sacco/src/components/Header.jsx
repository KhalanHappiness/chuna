import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import chunaLogo from '../assets/chuna.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = React.useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = React.useState(false)
  const [isMobileAboutOpen, setIsMobileAboutOpen] = React.useState(false) // Add separate state for About
  const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = React.useState(false)
  const location = useLocation()

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false)
    setIsProductsDropdownOpen(false)
    setIsMobileProductsOpen(false)
    setIsMobileAboutOpen(false) // Reset both mobile dropdowns
  }

  // Toggle mobile products submenu
  const toggleMobileProducts = (e) => {
    e.preventDefault()
    setIsMobileProductsOpen(!isMobileProductsOpen)
  }

  // Toggle mobile about submenu
  const toggleMobileAbout = (e) => {
    e.preventDefault()
    setIsMobileAboutOpen(!isMobileAboutOpen)
  }

  // Check if current path matches the link
  const isActiveLink = (path) => {
    return location.pathname === path
  }

  // Products dropdown items
  const productItems = [
    { name: 'FOSA Products', path: '/fosaProducts' },
    { name: 'BOSA Products', path: '/bosaProducts' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Agency Banking', path: '/products/agency-banking' },
    { name: 'Mchuna', path: '/mchuna' }
  ]

  const aboutUsItems = [
    {name: 'Who We Are', path: '/WhoWeAre'},
    {name: 'Board of Directors', path: '/boardofdirectors'},
    {name: 'Supervisory Committee', path: '/supervisorycommittee'},
    {name: 'Staff', path: '/staff'}
  ]

  // Navigation links configuration
  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/WhoWeAre', hasDropdown: true },
    { name: 'Products', path: '/fosaProducts', hasDropdown: true },
    { name: 'Membership', path: '/membership' },
    {name: 'Downloads', path: '/downloads'},
    { name: 'Contact', path: '/contact' },
    {name: 'Admin', path: '/admin'}
  ]

  return (
    <header className="fixed top-6 sm:top-8 left-0 w-full bg-white shadow-sm z-40">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            {/* Logo - Link to home */}
            <Link to="/" onClick={handleLinkClick}>
              <img 
                src={chunaLogo} 
                alt="Chuna DT Sacco Logo" 
                className="h-8 sm:h-10 lg:h-12 w-auto hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 relative">
            {navigationLinks.map((link) => (
              <div 
                key={link.path} 
                className="relative"
                onMouseEnter={() => {
                  if (link.hasDropdown && link.name === 'Products') {
                    setIsProductsDropdownOpen(true);
                  } else if (link.hasDropdown && link.name === 'About') {
                    setIsAboutUsDropdownOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (link.hasDropdown && link.name === 'Products') {
                    setIsProductsDropdownOpen(false);
                  } else if (link.hasDropdown && link.name === 'About') {
                    setIsAboutUsDropdownOpen(false);
                  }
                }}
              >
                {link.hasDropdown ? (
                  <div className="flex items-center">
                    <Link
                      to={link.path}
                      className={`flex items-center space-x-1 transition-colors text-sm xl:text-base ${
                        isActiveLink(link.path) || 
                        (link.name === 'Products' && location.pathname.startsWith('/products/')) ||
                        (link.name === 'About' && location.pathname.startsWith('/WhoWeAre/'))
                          ? 'text-green-600 font-semibold border-b-2 border-green-600'
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          (link.name === 'Products' && isProductsDropdownOpen) ||
                          (link.name === 'About' && isAboutUsDropdownOpen)
                            ? 'rotate-180' 
                            : ''
                        }`} 
                      />
                    </Link>
                    
                    {/* Products Dropdown Menu */}
                    {link.name === 'Products' && (
                      <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50 transition-all duration-200 ${
                        isProductsDropdownOpen 
                          ? 'opacity-100 translate-y-0 visible' 
                          : 'opacity-0 translate-y-2 invisible'
                      }`}>
                        <div className="py-2">
                          {productItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={handleLinkClick}
                              className={`block px-4 py-3 text-sm transition-colors hover:bg-green-50 hover:text-green-600 ${
                                isActiveLink(item.path)
                                  ? 'text-green-600 bg-green-50 font-medium'
                                  : 'text-gray-700'
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* About Us Dropdown Menu */}
                    {link.name === 'About' && (
                      <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50 transition-all duration-200 ${
                        isAboutUsDropdownOpen 
                          ? 'opacity-100 translate-y-0 visible' 
                          : 'opacity-0 translate-y-2 invisible'
                      }`}>
                        <div className="py-2">
                          {aboutUsItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={handleLinkClick}
                              className={`block px-4 py-3 text-sm transition-colors hover:bg-green-50 hover:text-green-600 ${
                                isActiveLink(item.path)
                                  ? 'text-green-600 bg-green-50 font-medium'
                                  : 'text-gray-700'
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`transition-colors text-sm xl:text-base ${
                      isActiveLink(link.path)
                        ? 'text-green-600 font-semibold border-b-2 border-green-600'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <Link
              to="/login"
              className={`transition-colors text-sm xl:text-base ${
                isActiveLink('/login')
                  ? 'text-green-600 font-semibold'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Login
            </Link>
            <a 
              href="https://applications.chunasacco.co.ke/index.php?r=new-membership"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-3 py-2 xl:px-4 rounded-lg hover:bg-green-700 transition-colors text-sm xl:text-base"
            >
              Join Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors p-2"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <span className={`absolute block h-0.5 w-full bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-2.5 sm:top-3' : 'top-1'}`}></span>
                <span className={`absolute block h-0.5 w-full bg-current transition-all duration-300 ease-in-out top-2.5 sm:top-3 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block h-0.5 w-full bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-2.5 sm:top-3' : 'top-4 sm:top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden absolute top-16 sm:top-20 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-4 invisible'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navigationLinks.map((link) => (
              <div key={link.path}>
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={link.name === 'Products' ? toggleMobileProducts : toggleMobileAbout}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium text-left ${
                        isActiveLink(link.path) || 
                        (link.name === 'Products' && location.pathname.startsWith('/products/')) ||
                        (link.name === 'About' && location.pathname.startsWith('/WhoWeAre/'))
                          ? 'text-green-600 bg-green-50 font-semibold'
                          : 'text-gray-800 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        (link.name === 'Products' && isMobileProductsOpen) ||
                        (link.name === 'About' && isMobileAboutOpen)
                          ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Mobile Submenu */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      (link.name === 'Products' && isMobileProductsOpen) ||
                      (link.name === 'About' && isMobileAboutOpen)
                        ? 'max-h-96 opacity-100 mt-2' 
                        : 'max-h-0 opacity-0'
                    }`}>
                      <div className="ml-4 space-y-1 bg-gray-50 rounded-lg p-2">
                        {/* Render the correct items based on the dropdown */}
                        {(link.name === 'Products' ? productItems : aboutUsItems).map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`block px-3 py-2.5 text-sm rounded-md transition-all duration-200 ${
                              isActiveLink(item.path)
                                ? 'text-green-600 bg-white font-medium shadow-sm'
                                : 'text-gray-600 hover:text-green-600 hover:bg-white hover:shadow-sm'
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium ${
                      isActiveLink(link.path)
                        ? 'text-green-600 bg-green-50 font-semibold'
                        : 'text-gray-800 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-200 mt-6">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className={`block w-full px-4 py-3 rounded-lg transition-all duration-200 text-center font-medium ${
                  isActiveLink('/login')
                    ? 'text-green-600 bg-green-50 font-semibold'
                    : 'text-gray-800 hover:text-green-600 hover:bg-green-50 border border-gray-200'
                }`}
              >
                Login
              </Link>
              <a
                href="https://applications.chunasacco.co.ke/index.php?r=new-membership"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="block w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-center"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>

        {/* Overlay backdrop */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </nav>
    </header>
  )
}

export default Header