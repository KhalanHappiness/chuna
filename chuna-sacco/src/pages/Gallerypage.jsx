import { useState, useEffect, useCallback } from 'react';
import { X, Search, Filter, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const API_BASE_URL   = 'https://chuna-00t6.onrender.com/public';
const FLASK_BASE_URL = 'https://chuna-00t6.onrender.com';

const buildUrl = (path) => {
  if (!path) return null;
  return path.startsWith('http') ? path : `${FLASK_BASE_URL}${path}`;
};

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
const Lightbox = ({ items, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const item = items[current];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {current + 1} / {items.length}
      </div>

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-5xl max-h-[85vh] mx-auto px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={buildUrl(item.image_url)}
          alt={item.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl mx-auto block"
        />
        {/* Caption */}
        <div className="text-center mt-4">
          <p className="text-white font-semibold text-lg">{item.title}</p>
          {item.category && (
            <span className="text-green-400 text-sm">{item.category}</span>
          )}
          {item.description && (
            <p className="text-white/60 text-sm mt-1 max-w-lg mx-auto">{item.description}</p>
          )}
        </div>
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Public Gallery Page
// ─────────────────────────────────────────────
const GalleryPage = () => {
  const [items, setItems]               = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [categories, setCategories]     = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery]   = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res  = await fetch(`${API_BASE_URL}/gallery`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setItems(data);
        setFiltered(data);
        const cats = ['All', ...new Set(data.map((i) => i.category).filter(Boolean))];
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Filter
  useEffect(() => {
    let result = items;
    if (activeCategory !== 'All') result = result.filter((i) => i.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) => i.title?.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [activeCategory, searchQuery, items]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox items={filtered} startIndex={lightboxIndex} onClose={closeLightbox} />
      )}

      <div className="min-h-screen bg-gray-50">

        {/* Page Header */}
        <div className="bg-green-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-2">Media Gallery</h1>
            <p className="text-green-100 text-lg">
              A collection of our events, activities, and milestones
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Count */}
          {!loading && (
            <p className="text-sm text-gray-400 mb-6">
              {filtered.length} {filtered.length === 1 ? 'photo' : 'photos'}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </p>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
            </div>
          )}

          {/* Empty */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos found</h3>
              <p className="text-gray-500 text-sm mb-4">Try a different search or category</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Grid — matches screenshot layout */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square">
                    <img
                      src={buildUrl(item.image_url)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Title — below image like the screenshot */}
                  <p className="mt-2 text-center text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wide leading-snug line-clamp-2 px-1">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;