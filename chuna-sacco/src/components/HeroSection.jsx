import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import member from '../assets/be a member.jpg';
import chunamarketing from '../assets/chuna mkting post copy.jpg';
import karibuloan from '../assets/KARIBU LOAN DONE copy.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [slides, setSlides] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API URL
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${API_BASE_URL}/api/public/home`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        
        console.log('API Response:', data); // Debug log
        
        // Map sliders from API
        if (data.sliders && data.sliders.length > 0) {
          const mappedSlides = data.sliders.map(slider => {
            // If image_url is relative, prepend the backend URL
            let imageUrl = slider.image_url;
            if (imageUrl && !imageUrl.startsWith('http')) {
              imageUrl = `${API_BASE_URL}${imageUrl}`;
            }
            
            return {
              image: imageUrl,
              title: slider.title || "",
              subtitle: slider.description || "",
              shortSubtitle: slider.short_description || slider.description || ""
            };
          });
          console.log('Mapped slides:', mappedSlides); // Debug log
          setSlides(mappedSlides);
        } else {
          console.warn('No sliders returned from API');
        }
        
        // Map news as updates
        if (data.news && data.news.length > 0) {
          const mappedUpdates = data.news.map(item => ({
            title: item.title,
            text: item.content || item.summary,
            link: item.link || "#"
          }));
          setUpdates(mappedUpdates);
        } else {
          console.warn('No news/updates returned from API');
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-advance updates
  useEffect(() => {
    if (updates.length === 0) return;
    const timer = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % updates.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [updates.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextUpdate = () => {
    setCurrentUpdate((prev) => (prev + 1) % updates.length);
  };

  const prevUpdate = () => {
    setCurrentUpdate((prev) => (prev - 1 + updates.length) % updates.length);
  };

  if (loading) {
    return (
      <section className="bg-white overflow-hidden pt-16 md:pt-24 relative">
        <div className="w-full">
          <div className="h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white overflow-hidden pt-16 md:pt-24 relative">
        <div className="w-full">
          <div className="h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
            <div className="text-center p-8">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Data</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="bg-white overflow-hidden pt-16 md:pt-24 relative">
        <div className="w-full">
          <div className="h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
            <div className="text-center p-8">
              <div className="text-gray-400 text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Content Available</h3>
              <p className="text-gray-600">No sliders found in the database.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white overflow-hidden pt-16 md:pt-24 relative">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-12 items-center">
          
          {/* Image Slider */}
          <div className="relative lg:col-span-3">
            <div className="relative bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden shadow-2xl">
              <div className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                      index === currentSlide ? 'translate-x-0' : 
                      index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title || 'Slider image'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', slide.image);
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:from-black/60 md:via-black/20"></div>
                    
                    {/* Slide Content */}
                    <div className="absolute bottom-8 left-4 sm:left-6 text-white max-w-xs sm:max-w-md">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-3 sm:mb-0 block sm:hidden">
                        {slide.shortSubtitle}
                      </p>
                      <p className="text-white/90 text-sm sm:text-base lg:text-lg hidden sm:block">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1.5 sm:p-2 text-white transition-all duration-300 hover:scale-110 hidden xs:block"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1.5 sm:p-2 text-white transition-all duration-300 hover:scale-110 hidden xs:block"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-110' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Updates Card - Scrollable */}
          {updates.length > 0 && (
            <div className="lg:absolute lg:bottom-20 lg:right-6 bg-green-600 text-white rounded-xl lg:rounded-2xl shadow-lg p-3 sm:p-4 z-30 mx-4 -mt-2 lg:mx-0 lg:mt-0 lg:max-w-sm">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">
                {updates[currentUpdate].title}
              </h3>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                {updates[currentUpdate].text}
              </p>
              <a
                href={updates[currentUpdate].link}
                className="inline-block bg-white text-emerald-600 font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-gray-200 transition text-sm"
              >
                Learn More
              </a>

              {/* Update Controls */}
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={prevUpdate}
                  className="bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex space-x-1">
                  {updates.map((_, index) => (
                    <span
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentUpdate ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextUpdate}
                  className="bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;