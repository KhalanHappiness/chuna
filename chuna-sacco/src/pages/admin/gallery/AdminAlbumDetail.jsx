import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Upload, Trash2, Image, X, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import { adminAPI } from '../../../api/axios';

/**
 * AdminAlbumDetail
 * Props:
 *   album     — the album object (id, title, category, photos, ...)
 *   onBack    — callback to go back to the albums list
 *   onRefresh — callback to re-fetch album list after changes
 */
const AdminAlbumDetail = ({ album, onBack, onRefresh }) => {
  const [photos, setPhotos]           = useState(album.photos || []);
  const [previews, setPreviews]       = useState([]);   // files chosen but not yet uploaded
  const [uploading, setUploading]     = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 0-100
  const fileInputRef = useRef(null);

  // Keep photos in sync if the parent refreshes the album prop
  useEffect(() => { setPhotos(album.photos || []); }, [album]);

  // ── File selection ────────────────────────────────
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPreviews = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
    // reset input so same file can be re-selected
    e.target.value = '';
  };

  const removePreview = (index) => {
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearPreviews = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPreviews([]);
  };

  // ── Upload ────────────────────────────────────────
  const handleUpload = async () => {
    if (!previews.length) return;
    setUploading(true);
    setUploadProgress(0);

    const data = new FormData();
    previews.forEach((p) => data.append('photos', p.file));

    try {
      const res = await adminAPI.uploadPhotos(album.id, data);
      setPhotos((prev) => [...prev, ...res.data]);
      clearPreviews();
      toast.success(`${res.data.length} photo(s) uploaded`);
      onRefresh?.();
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // ── Delete photo ─────────────────────────────────
  const handleDeletePhoto = async (photo) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await adminAPI.deletePhoto(album.id, photo.id);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      toast.success('Photo deleted');
      onRefresh?.();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{album.title}</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
            {album.category && ` · ${album.category}`}
          </p>
        </div>
        <Button
          icon={Upload}
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          Select Photos
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Upload staging area */}
      {previews.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-blue-800">
              {previews.length} photo(s) ready to upload
            </p>
            <button
              onClick={clearPreviews}
              className="text-blue-400 hover:text-blue-600 transition-colors"
              disabled={uploading}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preview thumbnails */}
          <div className="flex gap-3 flex-wrap">
            {previews.map((p, i) => (
              <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden bg-white shadow-sm group">
                <img src={p.previewUrl} alt={p.name} className="w-full h-full object-cover" />
                {!uploading && (
                  <button
                    onClick={() => removePreview(i)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Upload button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {uploading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload {previews.length} Photo(s) to Cloudinary
                </>
              )}
            </button>
            {!uploading && (
              <button onClick={clearPreviews} className="text-sm text-gray-500 hover:text-gray-700">
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Drop zone (visible when no photos and no previews) */}
      {photos.length === 0 && previews.length === 0 && (
        <div
          className="border-2 border-dashed border-gray-200 rounded-xl p-16 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-1">Upload photos to this album</h3>
          <p className="text-sm text-gray-400">Click to select — you can choose multiple at once</p>
        </div>
      )}

      {/* Uploaded photos grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square shadow-sm">
              <img
                src={photo.image_url}
                alt={photo.caption || 'Gallery photo'}
                className="w-full h-full object-cover"
              />
              {/* Delete overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDeletePhoto(photo)}
                  className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              {/* Cloudinary tick — shows URL is a cloudinary URL */}
              {photo.image_url?.includes('cloudinary') && (
                <div className="absolute top-1.5 left-1.5">
                  <CheckCircle className="w-4 h-4 text-green-400 drop-shadow" />
                </div>
              )}
            </div>
          ))}

          {/* Add more — always visible at end of grid */}
          <div
            className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400 text-center">Add more</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAlbumDetail;