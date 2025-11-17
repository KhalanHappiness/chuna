import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import FileUpload from '../../../components/common/FileUpload';

const Sliders = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    display_order: 0,
    is_active: true,
    image: null,
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await adminAPI.getSliders();
      setSliders(response.data);
    } catch (error) {
      toast.error('Failed to load sliders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (slider = null) => {
    if (slider) {
      setEditingSlider(slider);
      setFormData({
        title: slider.title || '',
        subtitle: slider.subtitle || '',
        link_url: slider.link_url || '',
        display_order: slider.display_order || 0,
        is_active: slider.is_active,
        image: null,
      });
    } else {
      setEditingSlider(null);
      setFormData({
        title: '',
        subtitle: '',
        link_url: '',
        display_order: 0,
        is_active: true,
        image: null,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSlider(null);
    setFormData({
      title: '',
      subtitle: '',
      link_url: '',
      display_order: 0,
      is_active: true,
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('link_url', formData.link_url);
    data.append('display_order', formData.display_order);
    data.append('is_active', formData.is_active);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingSlider) {
        await adminAPI.updateSlider(editingSlider.id, data);
        toast.success('Slider updated successfully');
      } else {
        await adminAPI.createSlider(data);
        toast.success('Slider created successfully');
      }
      
      handleCloseModal();
      fetchSliders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) {
      return;
    }

    try {
      await adminAPI.deleteSlider(id);
      toast.success('Slider deleted successfully');
      fetchSliders();
    } catch (error) {
      toast.error('Failed to delete slider');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Slider Images</h1>
          <p className="text-gray-600 mt-1">Manage homepage slider images</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={Plus}>
          Add Slider
        </Button>
      </div>

      {/* Sliders Grid */}
      {sliders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliders.map((slider) => (
            <div key={slider.id} className="card group relative overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={`http://localhost:5000${slider.image_url}`}
                  alt={slider.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  {slider.is_active ? (
                    <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      <Eye className="w-3 h-3 mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Inactive
                    </span>
                  )}
                </div>

                {/* Order Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs font-medium rounded">
                    Order: {slider.display_order}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {slider.title || 'Untitled'}
                </h3>
                {slider.subtitle && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {slider.subtitle}
                  </p>
                )}
                {slider.link_url && (
                  <p className="text-xs text-primary-600 truncate">
                    Link: {slider.link_url}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 mt-4">
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(slider)}
                  className="flex-1"
                  icon={Edit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(slider.id)}
                  icon={Trash2}
                >
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sliders yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first slider image</p>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add Slider
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingSlider ? 'Edit Slider' : 'Add New Slider'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <FileUpload
            label="Slider Image"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
            required={!editingSlider}
            currentImage={editingSlider ? `http://localhost:5000${editingSlider.image_url}` : null}
          />

          {/* Title */}
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter slider title"
          />

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              rows={3}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter slider subtitle"
            />
          </div>

          {/* Link URL */}
          <Input
            label="Link URL"
            name="link_url"
            type="url"
            value={formData.link_url}
            onChange={handleInputChange}
            placeholder="/about-us"
          />

          {/* Display Order */}
          <Input
            label="Display Order"
            name="display_order"
            type="number"
            value={formData.display_order}
            onChange={handleInputChange}
            placeholder="0"
          />

          {/* Is Active */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">
              Active (show on homepage)
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingSlider ? 'Update Slider' : 'Create Slider'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Sliders;