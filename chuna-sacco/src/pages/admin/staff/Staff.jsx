import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Plus, Edit, Trash2, Mail, Phone, Building2, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import FileUpload from '../../../components/common/FileUpload';
import { useSearchParams } from 'react-router-dom';

const Staff = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(searchParams.get('department') || '');
  const [formData, setFormData] = useState({
    department_id: '',
    full_name: '',
    position: '',
    email: '',
    phone: '',
    education: '',
    bio: '',
    display_order: 0,
    is_active: true,
    photo: null,
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [selectedDepartment]);

  const fetchDepartments = async () => {
    try {
      const response = await adminAPI.getDepartments();
      setDepartments(response.data);
    } catch (error) {
      toast.error('Failed to load departments');
      console.error(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const departmentId = selectedDepartment || null;
      const response = await adminAPI.getStaff(departmentId);
      setStaff(response.data);
    } catch (error) {
      toast.error('Failed to load staff');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentFilter = (deptId) => {
    setSelectedDepartment(deptId);
    if (deptId) {
      setSearchParams({ department: deptId });
    } else {
      setSearchParams({});
    }
  };

  const handleOpenModal = (staffMember = null) => {
    if (staffMember) {
      setEditingStaff(staffMember);
      setFormData({
        department_id: staffMember.department_id || '',
        full_name: staffMember.full_name || '',
        position: staffMember.position || '',
        email: staffMember.email || '',
        phone: staffMember.phone || '',
        education: staffMember.education || '',
        bio: staffMember.bio || '',
        display_order: staffMember.display_order || 0,
        is_active: staffMember.is_active,
        photo: null,
      });
    } else {
      setEditingStaff(null);
      setFormData({
        department_id: selectedDepartment || '',
        full_name: '',
        position: '',
        email: '',
        phone: '',
        education: '',
        bio: '',
        display_order: 0,
        is_active: true,
        photo: null,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStaff(null);
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
    data.append('department_id', formData.department_id);
    data.append('full_name', formData.full_name);
    data.append('position', formData.position);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('education', formData.education);
    data.append('bio', formData.bio);
    data.append('display_order', formData.display_order);
    data.append('is_active', formData.is_active);
    
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      if (editingStaff) {
        await adminAPI.updateStaff(editingStaff.id, data);
        toast.success('Staff member updated successfully');
      } else {
        await adminAPI.createStaff(data);
        toast.success('Staff member added successfully');
      }
      
      handleCloseModal();
      fetchStaff();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) {
      return;
    }

    try {
      await adminAPI.deleteStaff(id);
      toast.success('Staff member deleted successfully');
      fetchStaff();
    } catch (error) {
      toast.error('Failed to delete staff member');
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Members</h1>
          <p className="text-gray-600 mt-1">Manage staff across all departments</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={Plus}>
          Add Staff Member
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="card">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedDepartment}
            onChange={(e) => handleDepartmentFilter(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} ({dept.staff_count} staff)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Grid */}
      {staff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <div key={member.id} className="card hover:shadow-lg transition-shadow">
              {/* Photo */}
              <div className="flex justify-center mb-4">
                {member.photo_url ? (
                  <img
                    src={`http://localhost:5000${member.photo_url}`}
                    alt={member.full_name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-primary-100">
                    <span className="text-2xl font-semibold text-gray-500">
                      {member.full_name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.full_name}
                </h3>
                <p className="text-sm text-primary-600 font-medium">
                  {member.position}
                </p>
                
                {member.department && (
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span>{member.department.name}</span>
                  </div>
                )}

                {member.education && (
                  <p className="text-xs text-gray-500">
                    {member.education}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                {member.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <a href={`mailto:${member.email}`} className="hover:text-primary-600 truncate">
                      {member.email}
                    </a>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <a href={`tel:${member.phone}`} className="hover:text-primary-600">
                      {member.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(member)}
                  className="flex-1 text-sm"
                  icon={Edit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(member.id)}
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
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {selectedDepartment ? 'No staff in this department' : 'No staff members yet'}
          </h3>
          <p className="text-gray-600 mb-4">Add your first staff member to get started</p>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add Staff Member
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo */}
          <FileUpload
            label="Photo"
            name="photo"
            onChange={handleInputChange}
            accept="image/*"
            currentImage={editingStaff?.photo_url ? `http://localhost:5000${editingStaff.photo_url}` : null}
          />

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Full Name */}
          <Input
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />

          {/* Position */}
          <Input
            label="Position/Title"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="Finance Manager"
            required
          />

          {/* Email */}
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
          />

          {/* Phone */}
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1234567890"
          />

          {/* Education */}
          <Input
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            placeholder="MBA in Finance"
          />

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Professional background and experience"
            />
          </div>

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
              Active (show on website)
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
              {editingStaff ? 'Update Staff Member' : 'Add Staff Member'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Staff;