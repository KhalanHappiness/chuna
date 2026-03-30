import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar, Clock, Search, X, ArrowLeft, Filter
} from "lucide-react";

const API_BASE_URL  = 'https://chuna-00t6.onrender.com/public';
const FLASK_BASE_URL = 'https://chuna-00t6.onrender.com';

const buildImageUrl = (path) => {
  if (!path) return null;
  return path.startsWith('http') ? path : `${FLASK_BASE_URL}${path}`;
};

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/5999936/pexels-photo-5999936.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

// ─────────────────────────────────────────────
// News Card — navigates to detail page
// ─────────────────────────────────────────────
const NewsCard = ({ article }) => {
  const imageUrl = buildImageUrl(article.featured_image) || FALLBACK_IMAGE;
  const formattedDate = article.publish_date
    ? new Date(article.publish_date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      })
    : '';

  return (
    <Link
      to={`/news/${article.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group block"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-green-700 text-green-100 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
            {article.category || 'News'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-green-600 transition-colors duration-200 line-clamp-2 leading-snug">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>2 min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ─────────────────────────────────────────────
// Main News Page
// ─────────────────────────────────────────────
const NewsPage = () => {
  const navigate = useNavigate();
  const [news, setNews]                 = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories]     = useState(['All']);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/news`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setNews(data);
        setFiltered(data);

        // Build unique category list from fetched data
        const cats = ['All', ...new Set(data.map((n) => n.category).filter(Boolean))];
        setCategories(cats);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Filter whenever search or category changes
  useEffect(() => {
    let result = news;
    if (activeCategory !== 'All') {
      result = result.filter((n) => n.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title?.toLowerCase().includes(q) ||
          n.excerpt?.toLowerCase().includes(q) ||
          n.author?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [searchQuery, activeCategory, news]);




  return (
    <>


      <div className="min-h-screen bg-gray-50">

        {/* Page Header */}
        <div className="bg-green-600 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-green-100 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <h1 className="text-4xl font-bold mb-2">News & Updates</h1>
            <p className="text-green-100 text-lg">
              Stay informed about our latest news, activities, and engagements
            </p>
          </div>
        </div>

        {/* Search + Filter Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Result count */}
          {!loading && (
            <p className="text-sm text-gray-500 mb-6">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 text-sm mb-4">
                Try a different search term or category
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsPage;