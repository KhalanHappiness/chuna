import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderOpen, Image, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import FileUpload from '../../../components/common/FileUpload';
import { adminAPI } from '../../../api/axios';

const CATEGORIES = ['Events', 'Sports', 'Community', 'Awards', 'Training', 'Meetings', 'Other'];

const AdminGallery = ({ onOpenAlbum }) => {
  const [albums, setAlbums]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [formData, setFormData]   = useState({
    title: '', category: '', description: '',
    display_order: 0, is_active: true, cover_image: null,
  });

  useEffect(() => { fetchAlbums(); }, []);

  const fetchAlbums = async () => {
    try {
      const res = await adminAPI.getAlbums();
      setAlbums(res.data);
    } catch {
      toast.error('Failed to load albums');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (album = null) => {
    if (album) {
      setEditing(album);
      setFormData({
        title: album.title || '', category: album.category || '',
        description: album.description || '', display_order: album.display_order || 0,
        is_active: album.is_active, cover_image: null,
      });
    } else {
      setEditing(null);
      setFormData({ title: '', category: '', description: '', display_order: 0, is_active: true, cover_image: null });
    }
    setShowModal(true);
  };

  const handleClose = () => { setShowModal(false); setEditing(null); };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file')          setFormData(f => ({ ...f, [name]: files[0] }));
    else if (type === 'checkbox') setFormData(f => ({ ...f, [name]: checked }));
    else                          setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('display_order', formData.display_order);
    data.append('is_active', formData.is_active);
    if (formData.cover_image) data.append('cover_image', formData.cover_image);

    try {
      if (editing) {
        await adminAPI.updateAlbum(editing.id, data);
        toast.success('Album updated');
      } else {
        await adminAPI.createAlbum(data);
        toast.success('Album created');
      }
      handleClose();
      fetchAlbums();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this album and all its photos?')) return;
    try {
      await adminAPI.deleteAlbum(id);
      toast.success('Album deleted');
      fetchAlbums();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Gallery</h1>
          <p className="text-gray-600 mt-1">Create albums and upload photos into them</p>
        </div>
        <Button onClick={() => handleOpen()} icon={Plus}>New Album</Button>
      </div>

      {/* Albums grid */}
      {albums.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {albums.map((album) => (
            <div key={album.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
              {/* Cover image */}
              <div
                className="relative h-44 bg-gray-100 cursor-pointer"
                onClick={() => onOpenAlbum(album)}
              >
                {album.cover_image ? (
                  <img src={album.cover_image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <FolderOpen className="w-10 h-10 text-gray-300" />
                    <span className="text-xs text-gray-400">No cover photo</span>
                  </div>
                )}

                {/* Photo count badge */}
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Image className="w-3 h-3" />
                  {album.photo_count} {album.photo_count === 1 ? 'photo' : 'photos'}
                </div>

                {/* Hidden badge */}
                {!album.is_active && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Hidden
                  </div>
                )}
              </div>

              {/* Info + actions */}
              <div className="p-4 flex items-start justify-between gap-2">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => onOpenAlbum(album)}
                >
                  <p className="font-semibold text-gray-900 leading-snug">{album.title}</p>
                  {album.category && (
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {album.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleOpen(album)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(album.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenAlbum(album)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No albums yet</h3>
          <p className="text-gray-600 mb-4">Create your first album to start uploading photos</p>
          <Button onClick={() => handleOpen()} icon={Plus}>New Album</Button>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleClose}
        title={editing ? 'Edit Album' : 'Create New Album'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FileUpload
            label="Cover Photo (optional)"
            name="cover_image"
            onChange={handleChange}
            accept="image/*"
            currentImage={editing?.cover_image || null}
          />

          <Input
            label="Album Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. ADM 2024"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Optional description"
            />
          </div>

          <Input
            label="Display Order"
            name="display_order"
            type="number"
            value={formData.display_order}
            onChange={handleChange}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">
              Show on website
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Create Album'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminGallery;