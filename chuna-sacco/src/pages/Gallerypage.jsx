import { useState, useEffect, useCallback } from 'react';
import { X, Search, Filter, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft, FolderOpen } from 'lucide-react';

const API_BASE_URL = 'https://chuna-00t6.onrender.com/public';

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
const Lightbox = ({ items, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
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
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {current + 1} / {items.length}
      </div>

      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div className="max-w-5xl max-h-[85vh] mx-auto px-16" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.image_url}
          alt={item.caption || 'Gallery photo'}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl mx-auto block"
        />
        {item.caption && (
          <p className="text-center text-white/70 text-sm mt-3">{item.caption}</p>
        )}
      </div>

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
// Album Detail View (photos inside one album)
// ─────────────────────────────────────────────
const AlbumView = ({ album, onBack }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const photos = album.photos || [];

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox items={photos} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Album header */}
        <div className="bg-green-600 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-green-200 hover:text-white mb-4 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Gallery
            </button>
            <h1 className="text-4xl font-bold mb-1">{album.title}</h1>
            {album.category && <p className="text-green-200">{album.category}</p>}
            {album.description && <p className="text-green-100 mt-2 max-w-2xl">{album.description}</p>}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm text-gray-400 mb-6">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
          </p>

          {photos.length === 0 ? (
            <div className="text-center py-24 text-gray-400">No photos in this album yet.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square">
                    <img
                      src={photo.image_url}
                      alt={photo.caption || album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  {photo.caption && (
                    <p className="mt-2 text-center text-xs text-gray-500 line-clamp-1 px-1">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────
// Public Gallery Page (albums grid)
// ─────────────────────────────────────────────
const GalleryPage = () => {
  const [albums, setAlbums]             = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [categories, setCategories]     = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery]   = useState('');
  const [openAlbum, setOpenAlbum]       = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res  = await fetch(`${API_BASE_URL}/albums`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAlbums(data);
        setFiltered(data);
        const cats = ['All', ...new Set(data.map((a) => a.category).filter(Boolean))];
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  useEffect(() => {
    let result = albums;
    if (activeCategory !== 'All') result = result.filter((a) => a.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) => a.title?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [activeCategory, searchQuery, albums]);

  if (openAlbum) {
    return <AlbumView album={openAlbum} onBack={() => setOpenAlbum(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-green-600 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Media Gallery</h1>
          <p className="text-green-100 text-lg">Browse our albums of events, activities, and milestones</p>
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
                placeholder="Search albums..."
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

      {/* Albums Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!loading && (
          <p className="text-sm text-gray-400 mb-6">
            {filtered.length} {filtered.length === 1 ? 'album' : 'albums'}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </p>
        )}

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No albums found</h3>
            <p className="text-gray-500 text-sm mb-4">Try a different search or category</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((album) => (
              <div
                key={album.id}
                onClick={() => setOpenAlbum(album)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Cover */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {album.cover_image ? (
                    <img
                      src={album.cover_image}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Cover'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <FolderOpen className="w-10 h-10 text-gray-300" />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full">
                      View Album
                    </div>
                  </div>

                  {/* Photo count */}
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                    {album.photo_count} {album.photo_count === 1 ? 'photo' : 'photos'}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide">{album.title}</p>
                  {album.category && (
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {album.category}
                    </span>
                  )}
                  {album.description && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{album.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;