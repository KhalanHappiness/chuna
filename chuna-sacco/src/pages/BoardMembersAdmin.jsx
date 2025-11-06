import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Users, Save, X, Image } from 'lucide-react';

export default function BoardMembersManagement() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    role: '',
    description: '',
    category: 'executive',
    image: null,
    imagePreview: null,
    imageUrl: '',
    uploadMethod: 'file'
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    try {
      const stored = localStorage.getItem('board-members-db');
      if (stored) {
        setMembers(JSON.parse(stored));
      }
    } catch (error) {
      setMembers([]);
    }
  };

  const saveMembers = (updatedMembers) => {
    try {
      localStorage.setItem('board-members-db', JSON.stringify(updatedMembers));
      setMembers(updatedMembers);
    } catch (error) {
      alert('Failed to save members');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
          imagePreview: reader.result,
          imageUrl: ''
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      imageUrl: url,
      image: url,
      imagePreview: url
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.position || !formData.image) {
      alert('Please fill in all required fields and upload an image');
      return;
    }

    if (editingMember) {
      const updatedMembers = members.map(m =>
        m.id === editingMember.id
          ? { ...formData, id: editingMember.id, updatedAt: new Date().toISOString() }
          : m
      );
      saveMembers(updatedMembers);
    } else {
      const newMember = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      saveMembers([...members, newMember]);
    }

    resetForm();
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    const isUrl = member.image && (member.image.startsWith('http://') || member.image.startsWith('https://'));
    setFormData({
      name: member.name,
      position: member.position,
      role: member.role,
      description: member.description,
      category: member.category,
      image: member.image,
      imagePreview: member.image,
      imageUrl: isUrl ? member.image : '',
      uploadMethod: isUrl ? 'url' : 'file'
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      saveMembers(members.filter(m => m.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      role: '',
      description: '',
      category: 'executive',
      image: null,
      imagePreview: null,
      imageUrl: '',
      uploadMethod: 'file'
    });
    setEditingMember(null);
    setShowModal(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ boardMembers: members }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'board-members.json';
    link.click();
  };

  const executiveMembers = members.filter(m => m.category === 'executive');
  const boardMembers = members.filter(m => m.category === 'board');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Board Members Management</h1>
          <p className="text-gray-600 mt-1">Manage executive and board members</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportData}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Save size={18} />
            Export JSON
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Members</p>
              <p className="text-3xl font-bold text-gray-900">{members.length}</p>
            </div>
            <Users className="text-green-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Executive Board</p>
              <p className="text-3xl font-bold text-gray-900">{executiveMembers.length}</p>
            </div>
            <Users className="text-blue-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Board Members</p>
              <p className="text-3xl font-bold text-gray-900">{boardMembers.length}</p>
            </div>
            <Users className="text-purple-600" size={40} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Board Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {executiveMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {executiveMembers.length === 0 && (
            <div className="col-span-4 text-center py-8 text-gray-500">
              No executive members added yet
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Board Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {boardMembers.length === 0 && (
            <div className="col-span-4 text-center py-8 text-gray-500">
              No board members added yet
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image *
                </label>
                
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, uploadMethod: 'file', imageUrl: '', image: null, imagePreview: null })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.uploadMethod === 'file'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, uploadMethod: 'url', image: null, imagePreview: null })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.uploadMethod === 'url'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Use URL
                  </button>
                </div>

                {formData.imagePreview && (
                  <div className="mb-4">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={() => {
                        setFormData({ ...formData, imagePreview: null });
                        alert('Failed to load image from URL');
                      }}
                    />
                  </div>
                )}

                {formData.uploadMethod === 'file' && (
                  <div>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Image size={20} />
                      {formData.image ? 'Change Image' : 'Upload Image'}
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended: 400x400px, Max 5MB
                    </p>
                  </div>
                )}

                {formData.uploadMethod === 'url' && (
                  <div>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={handleUrlChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Enter a direct link to an image
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mr. Kelah Omwando"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., Chairman"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role/Title
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., EXECUTIVE"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of experience and expertise..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="executive">Executive Board Member</option>
                  <option value="board">Board Member</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingMember ? 'Update Member' : 'Add Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MemberCard({ member, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-64 object-cover"
        />
        {member.role && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            {member.role}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
        <p className="text-green-600 text-sm font-medium mb-2">{member.position}</p>
        {member.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{member.description}</p>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(member)}
            className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
          >
            <Edit2 size={14} />
            Edit
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}