import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Plus, Edit, Trash2, Mail, Phone, UserSquare2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import FileUpload from '../../../components/common/FileUpload';

const BoardMembers = () => {
  const [boardMembers, setBoardMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    category: 'Board',
    email: '',
    phone: '',
    education: '',
    bio: '',
    display_order: 0,
    is_active: true,
    photo: null,
  });

  const categories = ['Executive', 'Board', 'Supervisory'];

  useEffect(() => {
    fetchBoardMembers();
  }, []);

  const fetchBoardMembers = async () => {
    try {
      const response = await adminAPI.getBoard();
      setBoardMembers(response.data);
    } catch (error) {
      toast.error('Failed to load board members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = selectedCategory === 'all' 
    ? boardMembers 
    : boardMembers.filter(m => m.category === selectedCategory);

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        full_name: member.full_name || '',
        position: member.position || '',
        category: member.category || 'Board',
        email: member.email || '',
        phone: member.phone || '',
        education: member.education || '',
        bio: member.bio || '',
        display_order: member.display_order || 0,
        is_active: member.is_active,
        photo: null,
      });
    } else {
      setEditingMember(null);
      setFormData({
        full_name: '',
        position: '',
        category: 'Board',
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
    setEditingMember(null);
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
    data.append('full_name', formData.full_name);
    data.append('position', formData.position);
    data.append('category', formData.category);
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
      if (editingMember) {
        await adminAPI.updateBoardMember(editingMember.id, data);
        toast.success('Board member updated successfully');
      } else {
        await adminAPI.createBoardMember(data);
        toast.success('Board member added successfully');
      }
      
      handleCloseModal();
      fetchBoardMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this board member?')) {
      return;
    }

    try {
      await adminAPI.deleteBoardMember(id);
      toast.success('Board member deleted successfully');
      fetchBoardMembers();
    } catch (error) {
      toast.error('Failed to delete board member');
      console.error(error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Executive': 'bg-purple-100 text-purple-800',
      'Board': 'bg-blue-100 text-blue-800',
      'Supervisory': 'bg-green-100 text-green-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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
          <h1 className="text-2xl font-bold text-gray-900">Board Members</h1>
          <p className="text-gray-600 mt-1">Manage board of directors and committee members</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={Plus}>
          Add Board Member
        </Button>
      </div>

      {/* Category Filter */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({boardMembers.length})
          </button>
          {categories.map((cat) => {
            const count = boardMembers.filter(m => m.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Board Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="card hover:shadow-lg transition-shadow">
              {/* Category Badge */}
              <div className="flex justify-end mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(member.category)}`}>
                  {member.category}
                </span>
              </div>

              {/* Photo */}
              <div className="flex justify-center mb-4">
                {member.photo_url ? (
                  <img
                    src={`http://localhost:5000${member.photo_url}`}
                    alt={member.full_name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-100"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-primary-100">
                    <span className="text-3xl font-semibold text-gray-500">
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
                
                {member.education && (
                  <p className="text-xs text-gray-500">
                    {member.education}
                  </p>
                )}
              </div>

              {/* Bio Preview */}
              {member.bio && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {member.bio}
                </p>
              )}

              {/* Contact */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                {member.email && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <a href={`mailto:${member.email}`} className="hover:text-primary-600 truncate">
                      {member.email}
                    </a>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
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
            <UserSquare2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {selectedCategory === 'all' ? 'No board members yet' : `No ${selectedCategory} members`}
          </h3>
          <p className="text-gray-600 mb-4">Add your first board member to get started</p>
          <Button onClick={() => handleOpenModal()} icon={Plus}>
            Add Board Member
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingMember ? 'Edit Board Member' : 'Add New Board Member'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo */}
          <FileUpload
            label="Photo"
            name="photo"
            onChange={handleInputChange}
            accept="image/*"
            currentImage={editingMember?.photo_url ? `http://localhost:5000${editingMember.photo_url}` : null}
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
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
            placeholder="Chairman"
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
            placeholder="MBA, Harvard Business School"
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
              rows={5}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Professional background, experience, and achievements"
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
              {editingMember ? 'Update Board Member' : 'Add Board Member'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BoardMembers;