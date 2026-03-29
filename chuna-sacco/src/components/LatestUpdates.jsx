import { useState, useEffect, useCallback } from "react";
import {
  Calendar, Clock, ArrowRight, TrendingUp, Users, Heart,
  Building2, ChevronLeft, ChevronRight, X, User, Tag
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
const NewsModal = ({ newsId, onClose }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
 
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/news/${newsId}`);
        if (!res.ok) throw new Error('Failed to fetch article');
        setArticle(await res.json());
      } catch (err) {
        console.error(err);
        setError('Could not load this article. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [newsId]);
 
  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
 
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
 
  const imageUrl = article?.featured_image
    ? (article.featured_image.startsWith('http')
        ? article.featured_image
        : `${FLASK_BASE_URL}${article.featured_image}`)
    : null;
 
  const formattedDate = article?.publish_date
    ? new Date(article.publish_date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';
 
  // Generate initials from author name
  const initials = article?.author
    ? article.author.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';
 
  return (
    // Backdrop — the WHOLE backdrop scrolls so long articles are reachable
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Centering wrapper — grows with content */}
      <div className="flex min-h-full items-start justify-center p-4 sm:p-8">
        <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto">
 
          {/* ── Hero Image ───────────────────────── */}
          {imageUrl ? (
            <div className="relative h-52 sm:h-64 overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={imageUrl}
                alt={article?.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.parentElement.style.display = 'none'; }}
              />
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
 
              {/* Category pill */}
              {article?.category && (
                <div className="absolute bottom-4 left-5">
                  <span className="bg-green-700 text-green-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                    {article.category}
                  </span>
                </div>
              )}
 
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 flex items-center justify-center transition-colors duration-150 shadow"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* No image — floating close button */
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors duration-150"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
 
          {/* ── Body — no max-height, grows with content ── */}
          <div>
            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-green-600" />
              </div>
            )}
 
            {/* Error */}
            {!loading && error && (
              <div className="text-center py-12 px-8">
                <p className="text-red-500 mb-4 text-sm">{error}</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            )}
 
            {/* Article */}
            {!loading && article && (
              <div className="px-6 sm:px-8 pt-6 pb-2">
 
                {/* Category badge (no image fallback) */}
                {!imageUrl && article.category && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                    {article.category}
                  </span>
                )}
 
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
                  {article.title}
                </h2>
 
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-5 pb-5 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-semibold flex-shrink-0">
                    {initials}
                  </div>
                  <span className="font-medium text-gray-700">{article.author}</span>
                  <span className="text-gray-300">·</span>
                  <span>{formattedDate}</span>
                  <span className="text-gray-300">·</span>
                  <span>2 min read</span>
                </div>
 
                {/* Excerpt pull-quote */}
                {article.excerpt && (
                  <p
                    className="text-base italic text-gray-600 pl-4 mb-5 leading-relaxed"
                    style={{ borderLeft: '3px solid #16a34a', borderRadius: 0 }}
                  >
                    {article.excerpt}
                  </p>
                )}
 
                {/* Full content — renders completely, no truncation */}
                {article.content && (
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pb-6">
                    {article.content}
                  </div>
                )}
              </div>
            )}
          </div>
 
          {/* ── Sticky-to-bottom Footer ───────────── */}
          {!loading && article && (
            <div className="flex items-center justify-between px-6 sm:px-8 py-3 bg-gray-50 border-t border-gray-100">
              <span className="text-xs text-gray-400">Chuna DT Sacco · News</span>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-150"
              >
                Close
              </button>
            </div>
          )}
 
        </div>
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
    </>
  );
};

export default LatestUpdates;