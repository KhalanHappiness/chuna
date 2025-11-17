import { useState, useEffect } from 'react';
import { adminAPI } from '../../../api/axios';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import FileUpload from '../../../components/common/FileUpload';

const Board = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    display_order: 0,
    is_active: true,
    image: null,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await adminAPI.getBoard();
      setMembers(response.data);
    } catch (error) {
      toast.error('Failed to load board members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        full_name: member.full_name || '',
        position: member.position || '',
        display_order: member.display_order || 0,
        is_active: member.is_active,
        image: null,
      });
    } else {
      setEditingMember(null);
      setFormData({
        full_name: '',
        position: '',
        display_order: 0,
        is_active: true,
        image: null,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setFormData({
      full_name: '',
      position: '',
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
    data.append('full_name', formData.full_name);
    data.append('position', formData.position);
    data.append('display_order', formData.display_order);
    data.append('is_active', formData.is_active);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingMember) {
        await adminAPI.updateBoardMember(editingMember.id, data);
        toast.success('Board member updated successfully');
      } else {
        await adminAPI.createBoardMember(data);
        toast.success('Board member created successfully');
      }
      
      handleCloseModal();
      fetchMembers()
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
      toast.success('Board Member deleted successfully');
      fetchMembers()
    } catch (error) {
      toast.error('Failed to delete board member');
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
          <h1 className="text-2xl font-bold text-gray-900">Board Members</h1>
          <p className="text-gray-600 mt-1">Manage board members</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={Plus}>
          Add Member
        </Button>
      </div>

      {/* Member Grid */}
      {members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="card group relative overflow-hidden">
              {/* Photo */}
              <div className="flex justify-center mb-4">
                {member.image_url ? (
                  <img
                    src={`http://localhost:5000${member.image_url}`}
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

              

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {member.full_name || 'Untitled'}
                </h3>
                {member.position && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {member.position}
                  </p>
                )}
                
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 mt-4">
                <Button
                  variant="secondary"
                  onClick={() => handleOpenModal(member)}
                  className="flex-1"
                  icon={Edit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(member.id)}
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No board members yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first board member</p>
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
          {/* Image Upload */}
          <FileUpload
            label="Board Member Photo"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
            required={!editingMember}
            currentImage={editingMember ? `http://localhost:5000${editingMember.image_url}` : null}
          />

          {/* Name */}
          <Input
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required={!editingMember}

            placeholder="Enter board member name"
          />

          {/* Position */}
          
            <Input
              label={"Position"}
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required={!editingMember}

              placeholder="Enter board member position"
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
              {editingMember ? 'Update Board Member' : 'Create Board Member'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Board;