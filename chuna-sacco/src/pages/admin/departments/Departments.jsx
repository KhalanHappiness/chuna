import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Plus, Edit, Trash2, Users, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import { useNavigate } from 'react-router-dom';

const Departments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    key_responsibilities: '',
    icon_class: 'fa-solid fa-building',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await adminAPI.getDepartments(true); // Include staff count
      setDepartments(response.data);
    } catch (error) {
      toast.error('Failed to load departments');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (department = null) => {
    if (department) {
      setEditingDepartment(department);
      setFormData({
        name: department.name || '',
        slug: department.slug || '',
        description: department.description || '',
        key_responsibilities: department.key_responsibilities || '',
        icon_class: department.icon_class || 'fa-solid fa-building',
        display_order: department.display_order || 0,
        is_active: department.is_active,
      });
    } else {
      setEditingDepartment(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        key_responsibilities: '',
        icon_class: 'fa-solid fa-building',
        display_order: 0,
        is_active: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDepartment(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Auto-generate slug from name
      if (name === 'name' && !editingDepartment) {
        const slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        setFormData(prev => ({ ...prev, slug }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDepartment) {
        await adminAPI.updateDepartment(editingDepartment.id, formData);
        toast.success('Department updated successfully');
      } else {
        await adminAPI.createDepartment(formData);
        toast.success('Department created successfully');
      }
      
      handleCloseModal();
      fetchDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleDelete = async (id, staffCount) => {
    if (staffCount > 0) {
      toast.error('Cannot delete department with staff members. Remove staff first.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this department?')) {
      return;
    }

    try {
      await adminAPI.deleteDepartment(id);
      toast.success('Department deleted successfully');
      fetchDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete department');
      console.error(error);
    }
  };

  const handleViewStaff = (departmentId) => {
    navigate(`/admin/staff?department=${departmentId}`);
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
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-1">Manage organizational departments</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/admin/staff')}
            icon={Users}
          >
            View All Staff
          </Button>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add Department
          </Button>
        </div>
      </div>

      {/* Departments Grid */}
      {departments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="card hover:shadow-lg transition-shadow">
              {/* Icon Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex items-center gap-2">
                  {dept.is_active ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
              </div>

              {/* Department Info */}
              <div className="space-y-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {dept.name}
                </h3>
                
                {dept.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {dept.description}
                  </p>
                )}

                {/* Staff Count */}
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{dept.staff_count} staff member{dept.staff_count !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <Button
                  variant="secondary"
                  onClick={() => handleViewStaff(dept.id)}
                  className="flex-1 text-sm"
                >
                  View Staff
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(dept)}
                  icon={Edit}
                  className="text-sm"
                >
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(dept.id, dept.staff_count)}
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
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments yet</h3>
          <p className="text-gray-600 mb-4">Create your first department to get started</p>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add Department
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingDepartment ? 'Edit Department' : 'Add New Department'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <Input
            label="Department Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Finance Department"
            required
          />

          {/* Slug */}
          <Input
            label="Slug (URL-friendly name)"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder="finance-department"
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Brief description of the department"
            />
          </div>

          {/* Key Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Responsibilities
            </label>
            <textarea
              name="key_responsibilities"
              value={formData.key_responsibilities}
              onChange={handleInputChange}
              rows={4}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Main responsibilities and functions"
            />
          </div>

          {/* Icon Class */}
          <Input
            label="Icon Class (Font Awesome)"
            name="icon_class"
            value={formData.icon_class}
            onChange={handleInputChange}
            placeholder="fa-solid fa-building"
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
              Active (visible on website)
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
              {editingDepartment ? 'Update Department' : 'Create Department'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Departments;