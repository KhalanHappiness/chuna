import { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, TrendingUp, Users, Heart, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axios"

const API_URL = import.meta.env.VITE_API_URL;

const LatestUpdates = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const quickStats = [
    { icon: Users, label: "Active Members", value: "3,000+" },
    { icon: TrendingUp, label: "Total Savings", value: "KSh 2.5B" },
    { icon: Building2, label: "Loans Disbursed", value: "KSh 1.8B" },
    { icon: Heart, label: "Success Stories", value: "500+" },
  ];

  // Fetch news from the public endpoint (no auth needed for display)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/admin/news");
        const data = response.data;

        // Map API fields to what the component expects
        const mapped = data.map((item) => ({
          id: item.id,
          title: item.title,
          summary: item.excerpt || "",
          image: item.featured_image
            ? (item.featured_image.startsWith('http')
                ? item.featured_image
                : `${API_URL}${item.featured_image}`)
            : "https://images.pexels.com/photos/5999936/pexels-photo-5999936.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
          category: item.category || "News",
          date: item.publish_date
            ? new Date(item.publish_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "",
          readTime: "2 min read",
          featured: item.is_featured,
          link: `/news/${item.id}`, // adjust to your frontend route if different
        }));

        setLatestNews(mapped);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Reset slide index if news list changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [latestNews.length]);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (latestNews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % latestNews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [latestNews.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + latestNews.length) % latestNews.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % latestNews.length);
  };

  const featured = latestNews[currentSlide];

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  if (latestNews.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">No news articles available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News and Updates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about our latest news, activities, and Engagements with stakeholders
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">

          {/* Featured Story - slider */}
          <div className="lg:col-span-2 relative">
            <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                    {featured.category}
                  </span>
                </div>

                {/* Arrows */}
                {latestNews.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors duration-300">
                  {featured.title}
                </h3>
                {featured.summary && (
                  <p className="text-gray-600 mb-4 leading-relaxed">{featured.summary}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {featured.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featured.date}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                  <a
                    href={featured.link}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1 group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Side Stories */}
          <div className="space-y-6">
            {latestNews
              .filter((_, idx) => idx !== currentSlide)
              .slice(0, 2) // Show max 2 side articles
              .map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-gray-500 text-xs">{article.date}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                        <a
                          href={article.link}
                          className="text-emerald-600 hover:text-emerald-700 text-xs font-medium"
                        >
                          Read →
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

            {/* Quick Stats */}
            <div className="bg-green-600 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Chuna Sacco at a Glance</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-green-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href="https://www.chunasacco.co.ke/latest-news"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center gap-2 mx-auto"
          >
            View All News & Updates
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;