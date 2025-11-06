import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, User, Mail, Phone } from 'lucide-react';
import UnifiedAdminDashboard from '../components/UnifiedAdminDashboard';

const DepartmentManagementPage = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [showDeptForm, setShowDeptForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [editingMember, setEditingMember] = useState(null);

  const [deptForm, setDeptForm] = useState({
    name: '',
    description: '',
    keyRoles: ''
  });

  const [memberForm, setMemberForm] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    education: '',
    image: '',
    bio: '',
    responsibilities: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('departments');
    if (stored) {
      setDepartments(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const handleDeptSubmit = () => {
    if (!deptForm.name || !deptForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingDept) {
      setDepartments(
        departments.map((d) =>
          d.id === editingDept.id
            ? {
                ...d,
                ...deptForm,
                keyRoles: deptForm.keyRoles.split('\n').filter((r) => r.trim())
              }
            : d
        )
      );
      setEditingDept(null);
    } else {
      const newDept = {
        id: Date.now(),
        ...deptForm,
        keyRoles: deptForm.keyRoles.split('\n').filter((r) => r.trim()),
        members: []
      };
      setDepartments([...departments, newDept]);
    }
    setDeptForm({ name: '', description: '', keyRoles: '' });
    setShowDeptForm(false);
  };

  const handleMemberSubmit = () => {
    if (!selectedDept || !memberForm.name || !memberForm.title) {
      alert('Please fill in all required fields');
      return;
    }

    const memberData = {
      ...memberForm,
      responsibilities: memberForm.responsibilities
        .split('\n')
        .filter((r) => r.trim())
    };

    if (editingMember) {
      setDepartments(
        departments.map((d) =>
          d.id === selectedDept.id
            ? {
                ...d,
                members: d.members.map((m) =>
                  m.id === editingMember.id ? { ...m, ...memberData } : m
                )
              }
            : d
        )
      );
      setEditingMember(null);
    } else {
      const newMember = {
        id: Date.now(),
        ...memberData
      };
      setDepartments(
        departments.map((d) =>
          d.id === selectedDept.id
            ? { ...d, members: [...d.members, newMember] }
            : d
        )
      );
    }
    setMemberForm({
      name: '',
      title: '',
      email: '',
      phone: '',
      education: '',
      image: '',
      bio: '',
      responsibilities: ''
    });
    setShowMemberForm(false);
  };

  const deleteDept = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter((d) => d.id !== id));
      if (selectedDept?.id === id) setSelectedDept(null);
    }
  };

  const deleteMember = (deptId, memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setDepartments(
        departments.map((d) =>
          d.id === deptId
            ? { ...d, members: d.members.filter((m) => m.id !== memberId) }
            : d
        )
      );
    }
  };

  const editDept = (dept) => {
    setDeptForm({
      name: dept.name,
      description: dept.description,
      keyRoles: dept.keyRoles.join('\n')
    });
    setEditingDept(dept);
    setShowDeptForm(true);
  };

  const editMember = (member) => {
    setMemberForm({
      name: member.name,
      title: member.title,
      email: member.email || '',
      phone: member.phone || '',
      education: member.education || '',
      image: member.image || '',
      bio: member.bio || '',
      responsibilities: member.responsibilities?.join('\n') || ''
    });
    setEditingMember(member);
    setShowMemberForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Department Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage departments and team members
            </p>
          </div>
          <button
            onClick={() => setShowDeptForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus size={20} /> Add Department
          </button>
        </div>

        {departments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              No departments created yet
            </p>
            <button
              onClick={() => setShowDeptForm(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Create Your First Department
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {dept.name}
                    </h2>
                    <p className="text-gray-600 mb-3">{dept.description}</p>
                    {dept.keyRoles?.length > 0 && (
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-700 mb-1">
                          Key Roles:
                        </h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {dept.keyRoles.map((role, idx) => (
                            <li key={idx}>{role}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editDept(dept)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit Department"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteDept(dept.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Delete Department"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Team Members ({dept.members?.length || 0})
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedDept(dept);
                        setShowMemberForm(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <Plus size={16} /> Add Member
                    </button>
                  </div>

                  {dept.members?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dept.members.map((member) => (
                        <div
                          key={member.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                  <User size={24} className="text-green-600" />
                                </div>
                              )}
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  {member.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {member.title}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setSelectedDept(dept);
                                  editMember(member);
                                }}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit Member"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => deleteMember(dept.id, member.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Delete Member"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          {member.email && (
                            <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
                              <Mail size={12} /> {member.email}
                            </p>
                          )}
                          {member.phone && (
                            <p className="text-xs text-gray-600 flex items-center gap-1">
                              <Phone size={12} /> {member.phone}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 mb-2">
                        No members added yet
                      </p>
                      <button
                        onClick={() => {
                          setSelectedDept(dept);
                          setShowMemberForm(true);
                        }}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Add your first member
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Department Form Modal */}
        {showDeptForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {editingDept ? 'Edit' : 'Add'} Department
                </h2>
                <button
                  onClick={() => {
                    setShowDeptForm(false);
                    setEditingDept(null);
                    setDeptForm({ name: '', description: '', keyRoles: '' });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Department Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deptForm.name}
                    onChange={(e) =>
                      setDeptForm({ ...deptForm, name: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Accounting and Finance"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={deptForm.description}
                    onChange={(e) =>
                      setDeptForm({ ...deptForm, description: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe the department's purpose and objectives"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Key Roles (one per line)
                  </label>
                  <textarea
                    value={deptForm.keyRoles}
                    onChange={(e) =>
                      setDeptForm({ ...deptForm, keyRoles: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="4"
                    placeholder="Financial Planning and Analysis&#10;Financial Reporting&#10;Budget Management"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeptSubmit}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium"
                  >
                    {editingDept ? 'Update' : 'Create'} Department
                  </button>
                  <button
                    onClick={() => {
                      setShowDeptForm(false);
                      setEditingDept(null);
                      setDeptForm({ name: '', description: '', keyRoles: '' });
                    }}
                    className="px-6 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Member Form Modal */}
        {showMemberForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {editingMember ? 'Edit' : 'Add'} Member
                </h2>
                <button
                  onClick={() => {
                    setShowMemberForm(false);
                    setEditingMember(null);
                    setMemberForm({
                      name: '',
                      title: '',
                      email: '',
                      phone: '',
                      education: '',
                      image: '',
                      bio: '',
                      responsibilities: ''
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={memberForm.name}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, name: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., John Doe"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={memberForm.title}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, title: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Finance Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={memberForm.email}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, email: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={memberForm.phone}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, phone: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Education
                    </label>
                    <input
                      type="text"
                      value={memberForm.education}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          education: e.target.value
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., MBA in Finance"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={memberForm.image}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, image: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <textarea
                      value={memberForm.bio}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, bio: e.target.value })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows="3"
                      placeholder="Brief biography about the member"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Responsibilities (one per line)
                    </label>
                    <textarea
                      value={memberForm.responsibilities}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          responsibilities: e.target.value
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows="4"
                      placeholder="Financial reporting&#10;Budget oversight&#10;Team management"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleMemberSubmit}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium"
                  >
                    {editingMember ? 'Update' : 'Add'} Member
                  </button>
                  <button
                    onClick={() => {
                      setShowMemberForm(false);
                      setEditingMember(null);
                      setMemberForm({
                        name: '',
                        title: '',
                        email: '',
                        phone: '',
                        education: '',
                        image: '',
                        bio: '',
                        responsibilities: ''
                      });
                    }}
                    className="px-6 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentManagementPage;