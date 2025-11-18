import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Plus, Edit, Trash2, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';

const Values = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingValue, setEditingValue] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_class: 'fa-solid fa-heart',
    display_order: 0,
  });

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      const response = await adminAPI.getValues();
      setValues(response.data);
    } catch (error) {
      toast.error('Failed to load values');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (value = null) => {
    if (value) {
      setEditingValue(value);
      setFormData({
        title: value.title || '',
        description: value.description || '',
        icon_class: value.icon_class || 'fa-solid fa-heart',
        display_order: value.display_order || 0,
      });
    } else {
      setEditingValue(null);
      setFormData({
        title: '',
        description: '',
        icon_class: 'fa-solid fa-heart',
        display_order: 0,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingValue(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingValue) {
        await adminAPI.updateValue(editingValue.id, formData);
        toast.success('Value updated successfully');
      } else {
        await adminAPI.createValue(formData);
        toast.success('Value created successfully');
      }
      
      handleCloseModal();
      fetchValues();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this value?')) return;

    try {
      await adminAPI.deleteValue(id);
      toast.success('Value deleted successfully');
      fetchValues();
    } catch (error) {
      toast.error('Failed to delete value');
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
          <h1 className="text-2xl font-bold text-gray-900">Core Values</h1>
          <p className="text-gray-600 mt-1">Manage organizational values</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={Plus}>
          Add Value
        </Button>
      </div>

      {/* Values Grid */}
      {values.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <div key={value.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary-600" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {value.description}
              </p>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(value)}
                  className="flex-1 text-sm"
                  icon={Edit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(value.id)}
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
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No values yet</h3>
          <p className="text-gray-600 mb-4">Add your first core value</p>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add Value
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingValue ? 'Edit Value' : 'Add New Value'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Integrity"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Describe this value"
            />
          </div>

          <Input
            label="Icon Class (Font Awesome)"
            name="icon_class"
            value={formData.icon_class}
            onChange={handleInputChange}
            placeholder="fa-solid fa-heart"
          />

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
              {editingValue ? 'Update' : 'Create'} Value
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Values;