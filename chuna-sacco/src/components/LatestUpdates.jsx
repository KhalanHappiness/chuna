import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Calendar, Clock, ArrowRight, TrendingUp, Users, Heart,
  Building2, ChevronLeft, ChevronRight, X, User, Tag, Share2
} from "lucide-react";

// ── Same pattern as StaffPage ──────────────────────────────────────────────
const API_BASE_URL  = 'https://chuna-00t6.onrender.com/public';   // public routes — no auth
const FLASK_BASE_URL = 'https://chuna-00t6.onrender.com';          // for building image URLs

const buildImageUrl = (path) => {
  if (!path) return null;
  return path.startsWith('http') ? path : `${FLASK_BASE_URL}${path}`;
};

// ─────────────────────────────────────────────
// News Detail Modal
// ─────────────────────────────────────────────
const calcReadTime = (html) => {
  if (!html) return 1;
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const NewsModal = ({ newsId, onClose }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [copied, setCopied]   = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/news/${newsId}`);
        if (!res.ok) throw new Error('Failed to fetch article');
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
        setError('Could not load article. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [newsId]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const imageUrl      = buildImageUrl(article?.featured_image);
  const formattedDate = article?.publish_date
    ? new Date(article.publish_date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';
  const readTime = calcReadTime(article?.content);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Styles for rendered HTML content */}
      <style>{`
        .modal-article-content p  { margin: 0.75rem 0 !important; }
        .modal-article-content ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin: 0.75rem 0 !important;
        }
        .modal-article-content ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem !important;
          margin: 0.75rem 0 !important;
        }
        .modal-article-content li { margin: 0.25rem 0 !important; }
        .modal-article-content a {
          color: #16a34a !important;
          text-decoration: underline !important;
        }
        .modal-article-content a:hover { color: #15803d !important; }
        .modal-article-content strong { font-weight: 700 !important; }
        .modal-article-content em    { font-style: italic !important; }
        .modal-article-content h2 {
          font-size: 1.4rem !important;
          font-weight: 700 !important;
          margin: 1.5rem 0 0.5rem !important;
          color: #111827 !important;
        }
        .modal-article-content h3 {
          font-size: 1.15rem !important;
          font-weight: 600 !important;
          margin: 1.25rem 0 0.5rem !important;
          color: #111827 !important;
        }
        .modal-article-content blockquote {
          border-left: 4px solid #16a34a !important;
          padding-left: 1.25rem !important;
          font-style: italic !important;
          color: #4b5563 !important;
          margin: 1rem 0 !important;
        }
        .modal-article-content img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 8px !important;
          margin: 1rem 0 !important;
          display: block !important;
        }
      `}</style>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-full p-2 shadow transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">

          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" />
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center h-64 text-center p-8">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Close
              </button>
            </div>
          )}

          {!loading && article && (
            <>
              {/* Hero image */}
              {imageUrl && (
                <div className="relative h-56 sm:h-72 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Category badge (no image fallback) */}
                {!imageUrl && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </span>
                )}

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                  {article.title}
                </h2>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                  {article.author && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-700">{article.author}</span>
                    </div>
                  )}
                  {formattedDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{formattedDate}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{readTime} min read</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4 flex-shrink-0" />
                    <span>{copied ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>

                {/* Excerpt pull-quote */}
                {article.excerpt && (
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium italic border-l-4 border-green-500 pl-4">
                    {article.excerpt}
                  </p>
                )}

                {/* Full content — rendered as HTML */}
                {article.content && (
                  <div
                    className="text-gray-700 leading-relaxed text-base modal-article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Sticky footer */}
        {!loading && article && (
          <div className="px-6 sm:px-8 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between flex-shrink-0">
            <span className="text-xs text-gray-400">Chuna DT Sacco News</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
// ─────────────────────────────────────────────
// Main LatestUpdates Section
// ─────────────────────────────────────────────
const LatestUpdates = () => {
  const [currentSlide,   setCurrentSlide]   = useState(0);
  const [latestNews,     setLatestNews]     = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  const quickStats = [
    { icon: Users,      label: 'Active Members', value: '3,000+' },
    { icon: TrendingUp, label: 'Total Savings',   value: 'KSh 2.5B' },
    { icon: Building2,  label: 'Loans Disbursed', value: 'KSh 1.8B' },
    { icon: Heart,      label: 'Success Stories', value: '500+' },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/news`);
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();

        const mapped = data.map((item) => ({
          id:       item.id,
          title:    item.title,
          summary:  item.excerpt || '',
          image:    buildImageUrl(item.featured_image)
                    || 'https://images.pexels.com/photos/5999936/pexels-photo-5999936.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
          category: item.category || 'News',
          date:     item.publish_date
                      ? new Date(item.publish_date).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })
                      : '',
          readTime: '2 min read',
          featured: item.is_featured,
        }));

        setLatestNews(mapped);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => { setCurrentSlide(0); }, [latestNews.length]);

  // Pause auto-slide while modal is open
  useEffect(() => {
    if (latestNews.length === 0 || selectedNewsId) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % latestNews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [latestNews.length, selectedNewsId]);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + latestNews.length) % latestNews.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % latestNews.length);

  const openArticle  = useCallback((id) => setSelectedNewsId(id), []);
  const closeArticle = useCallback(() => setSelectedNewsId(null), []);

  const featured = latestNews[currentSlide];

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto" />
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
    <>
      {selectedNewsId && (
        <NewsModal newsId={selectedNewsId} onClose={closeArticle} />
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News and Updates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest news, activities, and Engagements with stakeholders
            </p>
          </div>

          {/* Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">

            {/* Featured / Slider */}
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

                  {latestNews.length > 1 && (
                    <>
                      <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full">
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
                    <button
                      onClick={() => openArticle(featured.id)}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1 group"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* Side Stories */}
            <div className="space-y-6">
              {latestNews
                .filter((_, idx) => idx !== currentSlide)
                .slice(0, 2)
                .map((article) => (
                  <article key={article.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
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
                          <button
                            onClick={() => openArticle(article.id)}
                            className="text-emerald-600 hover:text-emerald-700 text-xs font-medium"
                          >
                            Read →
                          </button>
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
            <Link
              to="/news"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-500 font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center gap-2 mx-auto"
            >
              View All News & Updates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestUpdates;