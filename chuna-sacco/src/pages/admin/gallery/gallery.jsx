import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import FileUpload from '../../../components/common/FileUpload';
import { adminAPI } from '../../../api/axios';

const FLASK_BASE_URL = 'https://chuna-00t6.onrender.com';
const buildUrl = (path) => {
  if (!path) return null;
  return path.startsWith('http') ? path : `${FLASK_BASE_URL}${path}`;
};

const Gallery = () => {
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editing, setEditing]       = useState(null);
  const [formData, setFormData]     = useState({
    title: '',
    category: '',
    description: '',
    display_order: 0,
    is_active: true,
    image: null,
  });

  const categories = [
    'Events', 'Sports', 'Community', 'Awards', 'Training', 'Meetings', 'Other'
  ];

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await adminAPI.getGallery();
      setItems(res.data);
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        title: item.title || '',
        category: item.category || '',
        description: item.description || '',
        display_order: item.display_order || 0,
        is_active: item.is_active,
        image: null,
      });
    } else {
      setEditing(null);
      setFormData({ title: '', category: '', description: '', display_order: 0, is_active: true, image: null });
    }
    setShowModal(true);
  };

  const handleClose = () => { setShowModal(false); setEditing(null); };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file')      setFormData({ ...formData, [name]: files[0] });
    else if (type === 'checkbox') setFormData({ ...formData, [name]: checked });
    else                      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('display_order', formData.display_order);
    data.append('is_active', formData.is_active);
    if (formData.image) data.append('image', formData.image);

    try {
      if (editing) {
        await adminAPI.updateGalleryItem(editing.id, data);
        toast.success('Item updated');
      } else {
        await adminAPI.createGalleryItem(data);
        toast.success('Item added');
      }
      handleClose();
      fetchItems();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    try {
      await adminAPI.deleteGalleryItem(id);
      toast.success('Item deleted');
      fetchItems();
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
          <p className="text-gray-600 mt-1">Manage photos and media for the gallery</p>
        </div>
        <Button onClick={() => handleOpen()} icon={Plus}>Add Photo</Button>
      </div>

      {/* Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div className="relative h-48 bg-gray-100">
                {item.image_url ? (
                  <img
                    src={buildUrl(item.image_url)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-300" />
                  </div>
                )}

                {/* Inactive badge */}
                {!item.is_active && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Hidden
                  </div>
                )}

                {/* Action buttons overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleOpen(item)}
                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Edit className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{item.title}</p>
                {item.category && (
                  <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No gallery items yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first photo</p>
          <Button onClick={() => handleOpen()} icon={Plus}>Add Photo</Button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleClose}
        title={editing ? 'Edit Gallery Item' : 'Add Gallery Photo'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <FileUpload
            label="Photo"
            name="image"
            onChange={handleChange}
            accept="image/*"
            currentImage={editing?.image_url ? buildUrl(editing.image_url) : null}
          />

          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Sports Day 2024"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
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
            <Button type="submit">{editing ? 'Update' : 'Add Photo'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Gallery;