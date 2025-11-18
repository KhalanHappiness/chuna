import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/axios';
import { Plus, Edit, Trash2, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import FileUpload from '../../components/common/FileUpload';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAward, setEditingAward] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
    display_order: 0,
    icon: null,
  });

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await adminAPI.getAwards();
      setAwards(response.data);
    } catch (error) {
      toast.error('Failed to load awards');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (award = null) => {
    if (award) {
      setEditingAward(award);
      setFormData({
        title: award.title || '',
        year: award.year || new Date().getFullYear(),
        description: award.description || '',
        display_order: award.display_order || 0,
        icon: null,
      });
    } else {
      setEditingAward(null);
      setFormData({
        title: '',
        year: new Date().getFullYear(),
        description: '',
        display_order: 0,
        icon: null,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAward(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('year', formData.year);
    data.append('description', formData.description);
    data.append('display_order', formData.display_order);
    
    if (formData.icon) {
      data.append('icon', formData.icon);
    }

    try {
      if (editingAward) {
        await adminAPI.updateAward(editingAward.id, data);
        toast.success('Award updated successfully');
      } else {
        await adminAPI.createAward(data);
        toast.success('Award created successfully');
      }
      
      handleCloseModal();
      fetchAwards();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this award?')) return;

    try {
      await adminAPI.deleteAward(id);
      toast.success('Award deleted successfully');
      fetchAwards();
    } catch (error) {
      toast.error('Failed to delete award');
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
          <h1 className="text-2xl font-bold text-gray-900">Awards</h1>
          <p className="text-gray-600 mt-1">Manage organization awards and recognitions</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={Plus}>
          Add Award
        </Button>
      </div>

      {/* Awards Grid */}
      {awards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <div key={award.id} className="card hover:shadow-lg transition-shadow">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                {award.icon_url ? (
                  <img
                    src={`http://localhost:5000${award.icon_url}`}
                    alt={award.title}
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-10 h-10 text-yellow-600" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="text-center space-y-2 mb-4">
                <p className="text-sm font-semibold text-primary-600">{award.year}</p>
                <h3 className="text-lg font-semibold text-gray-900">
                  {award.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {award.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t">
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(award)}
                  className="flex-1 text-sm"
                  icon={Edit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(award.id)}
                  icon={Trash2}
                  className="text-sm"
                >
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No awards yet</h3>
          <p className="text-gray-600 mb-4">Add your first award</p>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add Award
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingAward ? 'Edit Award' : 'Add New Award'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <FileUpload
            label="Icon/Image"
            name="icon"
            onChange={handleInputChange}
            accept="image/*"
            currentImage={editingAward?.icon_url ? `http://localhost:5000${editingAward.icon_url}` : null}
          />

          <Input
            label="Award Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Best Cooperative Society"
            required
          />

          <Input
            label="Year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleInputChange}
            min="1900"
            max={new Date().getFullYear() + 10}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Brief description of the award"
            />
          </div>

          <Input
            label="Display Order"
            name="display_order"
            type="number"
            value={formData.display_order}
            onChange={handleInputChange}
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingAward ? 'Update' : 'Create'} Award
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Awards;