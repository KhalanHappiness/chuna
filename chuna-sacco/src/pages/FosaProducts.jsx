import React, { useState, useEffect } from 'react';
import { Download, ChevronRight, Clock, DollarSign, Users, BookOpen, PiggyBank, AlertCircle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/public';

const ServiceCard = ({ product, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const colorSchemes = {
    blue: {
      border: 'border-[#189CCA33]',
      borderBottom: 'border-b-[#189CCA]',
      ring: 'ring-[#189CCA]',
      gradient: 'from-[#189CCA] to-[#0F6E8E]',
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
      title: 'text-amber-900',
      amount: 'text-amber-700',
      period: 'text-amber-800',
      check: 'text-amber-600',
      feature: 'text-amber-900',
      button: 'bg-amber-600 hover:bg-amber-700',
      badge: 'bg-blue-400 text-amber-900'
    }
  };

  const getIconComponent = (iconClass) => {
    const iconMap = {
      'Clock': Clock,
      'DollarSign': DollarSign,
      'Users': Users,
      'BookOpen': BookOpen,
      'PiggyBank': PiggyBank,
      'AlertCircle': AlertCircle,
      'fa-solid fa-clock': Clock,
      'fa-solid fa-dollar-sign': DollarSign,
      'fa-solid fa-users': Users,
      'fa-solid fa-book-open': BookOpen,
      'fa-solid fa-piggy-bank': PiggyBank,
      'fa-solid fa-exclamation-circle': AlertCircle,
    };
    return iconMap[iconClass] || DollarSign;
  };

  // Use product's color scheme or alternate between blue/gold based on ID
  const colorScheme = product.color_scheme || (product.display_order % 2 === 0 ? 'gold' : 'blue');
  const scheme = colorSchemes[colorScheme];
  const Icon = getIconComponent(product.icon_class);
  const features = product.features?.map(f => f.feature_text || f) || [];

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload(product.id);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl border-2 ${scheme.border} bg-white transition-all duration-300 hover:shadow-xl sm:hover:scale-105 border-b-4 ${scheme.borderBottom} ${product.is_popular ? `ring-2 ${scheme.ring} ring-offset-2` : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient} opacity-80`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-3 sm:p-4 backdrop-blur-sm">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>
        {product.is_popular && (
          <span className={`absolute top-3 right-3 rounded-full ${scheme.badge} px-2 py-1 sm:px-3 text-xs font-bold shadow-lg`}>
            POPULAR
          </span>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <h3 className={`mb-2 sm:mb-3 text-lg sm:text-xl font-bold ${scheme.title} leading-tight`}>
          {product.name}
        </h3>
        
        {product.max_amount && (
          <div className="mb-3 sm:mb-4">
            <div className={`text-xl sm:text-3xl font-bold ${scheme.amount} leading-tight`}>
              Ksh {product.max_amount}
            </div>
            {product.repayment_period && (
              <div className={`mt-1 text-xs sm:text-sm ${scheme.period} opacity-70`}>
                / {product.repayment_period}
              </div>
            )}
          </div>
        )}

        {product.description && (
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        )}

        {product.interest_rate && (
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-semibold">Interest Rate:</span> {product.interest_rate}
          </p>
        )}
        
        {features.length > 0 && (
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
        )}
        
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className={`group w-full rounded-lg ${scheme.button} px-3 py-2.5 sm:px-4 sm:py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span className="flex items-center justify-center space-x-2">
            {isDownloading ? (
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            ) : (
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
            )}
            <span>Download Form</span>
            <ChevronRight className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
          </span>
        </button>
      </div>
    </div>
  );
};

const FosaProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch FOSA products from backend
  const fetchProducts = async (categorySlug = null) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build URL with type=fosa parameter
      let url = `${API_BASE_URL}/products?type=fosa`;
      
      // Add category filter if provided
      if (categorySlug) {
        url += `&category=${categorySlug}`;
      }
      
      console.log('Fetching FOSA products from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Received FOSA data:', data);
      
      setCategories(data.categories || []);
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error fetching FOSA products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle category changes
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    if (categoryId === 'all') {
      fetchProducts(); // Fetch all FOSA products
    } else {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        fetchProducts(category.slug); // Fetch filtered FOSA products
      }
    }
  };

  // Handle form downloads
  const handleDownload = async (productId) => {
    try {
      const product = products.find(p => p.id === productId);
      const response = await fetch(`${API_BASE_URL}/forms/download/${productId}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${product.slug || 'product'}_form.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('Download failed');
      }
    } catch (err) {
      console.error('Error downloading form:', err);
      alert('Failed to download form. Please try again.');
    }
  };

  const getCategoryIcon = (iconClass) => {
    const iconMap = {
      'fa-solid fa-users': Users,
      'fa-solid fa-dollar-sign': DollarSign,
      'fa-solid fa-piggy-bank': PiggyBank,
      'fa-solid fa-book-open': BookOpen,
      'fa-solid fa-clock': Clock,
      'fa-solid fa-exclamation-circle': AlertCircle,
    };
    return iconMap[iconClass] || Users;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white/95 px-4 sm:px-6 py-8 sm:py-14 text-gray-900 mt-16 sm:mt-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-cyan-600 uppercase tracking-wide">
              FOSA
            </div>
            <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-600 leading-tight">
              Chuna Front Office Products Available For You
            </h1>
            <div className="mx-auto h-1 w-12 sm:w-16 bg-gradient-to-r from-blue-600 to-amber-500 mb-4 sm:mb-8"></div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`flex items-center space-x-1.5 sm:space-x-2 rounded-full px-3 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>All Services</span>
            </button>
            
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.icon_class);
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
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

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-cyan-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading FOSA products...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to Load Products</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => fetchProducts()}
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="px-3 sm:px-6 py-6 sm:py-12">
          <div className="mx-auto max-w-7xl">
            {products.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ServiceCard 
                    key={product.id} 
                    product={product}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No FOSA products available in this category</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-600 px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold leading-tight">Ready to Get Started?</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-xl text-blue-100 leading-relaxed">
            Contact us today to learn more about our services and how we can help you achieve your financial goals.
          </p>
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-white px-6 py-3 sm:px-8 sm:py-4 font-semibold text-cyan-700 transition-all duration-200 hover:shadow-lg sm:hover:scale-105">
              Contact Us
            </button>
            <button className="rounded-lg border-2 border-white px-6 py-3 sm:px-8 sm:py-4 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-cyan-700">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FosaProducts;