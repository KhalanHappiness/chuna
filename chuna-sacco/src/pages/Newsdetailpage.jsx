import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";

const API_BASE_URL   = 'https://chuna-00t6.onrender.com/public';
const FLASK_BASE_URL = 'https://chuna-00t6.onrender.com';

const buildImageUrl = (path) => {
  if (!path) return null;
  return path.startsWith('http') ? path : `${FLASK_BASE_URL}${path}`;
};

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/5999936/pexels-photo-5999936.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

const NewsDetailPage = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [article, setArticle]     = useState(null);
  const [related,  setRelated]    = useState([]);
  const [loading,  setLoading]    = useState(true);
  const [error,    setError]      = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the main article
        const res = await fetch(`${API_BASE_URL}/news/${id}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        setArticle(data);

        // Fetch related articles (same category, exclude current)
        const allRes = await fetch(`${API_BASE_URL}/news`);
        if (allRes.ok) {
          const allNews = await allRes.json();
          const rel = allNews
            .filter((n) => n.id !== data.id && n.category === data.category)
            .slice(0, 3);
          setRelated(rel);
        }
      } catch (err) {
        console.error(err);
        setError('Could not load this article.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const imageUrl = buildImageUrl(article?.featured_image);
  const formattedDate = article?.publish_date
    ? new Date(article.publish_date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';
  const initials = article?.author
    ? article.author.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  // ── Loading ──────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  // ── Error ────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-gray-500 mb-6 text-sm">{error}</p>
          <button
            onClick={() => navigate('/news')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ─────────────────────────────── */}
      <div className="relative w-full h-72 sm:h-96 bg-gray-300 overflow-hidden">
        <img
          src={imageUrl || FALLBACK_IMAGE}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
        />
        {/* Dark scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        {/* Back button */}
        <div className="absolute top-6 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/90 hover:text-white text-sm bg-black/30 hover:bg-black/50 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>

        {/* Title overlay at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-4xl mx-auto">
            {article.category && (
              <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                {article.category}
              </span>
            )}
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Article Body ─────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 px-6 sm:px-10 py-5 border-b border-gray-100">
            {/* Author avatar + name */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-sm font-semibold flex-shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-xs text-gray-400 leading-none mb-0.5">Author</p>
                <p className="text-sm font-medium text-gray-800">{article.author}</p>
              </div>
            </div>

            <div className="w-px h-8 bg-gray-200 hidden sm:block" />

            {/* Date */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{formattedDate}</span>
            </div>

            <div className="w-px h-8 bg-gray-200 hidden sm:block" />

            {/* Read time */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>2 min read</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-10 py-8">

            {/* Excerpt pull-quote */}
            {article.excerpt && (
              <p
                className="text-lg italic text-gray-600 leading-relaxed mb-8"
                style={{ borderLeft: '4px solid #16a34a', paddingLeft: '1.25rem', borderRadius: 0 }}
              >
                {article.excerpt}
              </p>
            )}

            {/* Full body */}
            {article.content && (
              <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            )}
          </div>

          {/* Footer tag */}
          <div className="px-6 sm:px-10 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Tag className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </div>
            <Link
              to="/news"
              className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All articles
            </Link>
          </div>
        </div>

        {/* ── Related Articles ───────────────── */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">More in {article.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((item) => {
                const relImage = buildImageUrl(item.featured_image) || FALLBACK_IMAGE;
                const relDate  = item.publish_date
                  ? new Date(item.publish_date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })
                  : '';
                return (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={relImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 mt-1 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400">{relDate}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetailPage;