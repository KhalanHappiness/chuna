import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, Building2, Save, X, Image as ImageIcon } from 'lucide-react';

export default function StaffManagement() {
  const [view, setView] = useState('employees');
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    departmentId: '',
    staffCategory: '',
    bio: '',
    education: '',
    responsibilities: '',
    image: null,
    imagePreview: null,
    imageUrl: '',
    uploadMethod: 'file'
  });

  const [departmentForm, setDepartmentForm] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedEmployees = localStorage.getItem('chuna-employees-db');
      const storedDepartments = localStorage.getItem('chuna-departments-db');
      
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      }
      if (storedDepartments) {
        setDepartments(JSON.parse(storedDepartments));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const saveEmployees = (updatedEmployees) => {
    try {
      localStorage.setItem('chuna-employees-db', JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
    } catch (error) {
      alert('Failed to save employees');
    }
  };

  const saveDepartments = (updatedDepartments) => {
    try {
      localStorage.setItem('chuna-departments-db', JSON.stringify(updatedDepartments));
      setDepartments(updatedDepartments);
    } catch (error) {
      alert('Failed to save departments');
    }
  };

  const handleEmployeeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployeeForm({
          ...employeeForm,
          image: reader.result,
          imagePreview: reader.result,
          imageUrl: ''
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmployeeUrlChange = (e) => {
    const url = e.target.value;
    setEmployeeForm({
      ...employeeForm,
      imageUrl: url,
      image: url,
      imagePreview: url
    });
  };

  const handleEmployeeSubmit = () => {
    if (!employeeForm.name || !employeeForm.position || !employeeForm.departmentId || !employeeForm.image) {
      alert('Please fill in all required fields (Name, Position, Department, and Image)');
      return;
    }

    // Convert departmentId to number for consistent comparison
    const deptId = Number(employeeForm.departmentId);

    if (editingEmployee) {
      const updatedEmployees = employees.map(e =>
        e.id === editingEmployee.id
          ? { ...employeeForm, id: editingEmployee.id, departmentId: deptId, updatedAt: new Date().toISOString() }
          : e
      );
      saveEmployees(updatedEmployees);
    } else {
      const newEmployee = {
        id: Date.now(),
        ...employeeForm,
        departmentId: deptId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      saveEmployees([...employees, newEmployee]);
    }

    resetEmployeeForm();
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    const isUrl = employee.image && (employee.image.startsWith('http://') || employee.image.startsWith('https://'));
    setEmployeeForm({
      name: employee.name,
      position: employee.position,
      email: employee.email || '',
      phone: employee.phone || '',
      departmentId: String(employee.departmentId), // Convert to string for select element
      staffCategory: employee.staffCategory || '',
      bio: employee.bio || '',
      education: employee.education || '',
      responsibilities: employee.responsibilities || '',
      image: employee.image,
      imagePreview: employee.image,
      imageUrl: isUrl ? employee.image : '',
      uploadMethod: isUrl ? 'url' : 'file'
    });
    setShowEmployeeModal(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      saveEmployees(employees.filter(e => e.id !== id));
    }
  };

  const resetEmployeeForm = () => {
    setEmployeeForm({
      name: '',
      position: '',
      email: '',
      phone: '',
      departmentId: '',
      staffCategory: '',
      bio: '',
      education: '',
      responsibilities: '',
      image: null,
      imagePreview: null,
      imageUrl: '',
      uploadMethod: 'file'
    });
    setEditingEmployee(null);
    setShowEmployeeModal(false);
  };

  const handleDepartmentSubmit = () => {
    if (!departmentForm.name) {
      alert('Please enter a department name');
      return;
    }

    if (editingDepartment) {
      const updatedDepartments = departments.map(d =>
        d.id === editingDepartment.id
          ? { ...departmentForm, id: editingDepartment.id }
          : d
      );
      saveDepartments(updatedDepartments);
    } else {
      const newDepartment = {
        id: Date.now(),
        ...departmentForm
      };
      saveDepartments([...departments, newDepartment]);
    }

    resetDepartmentForm();
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setDepartmentForm({
      name: department.name,
      description: department.description || ''
    });
    setShowDepartmentModal(true);
  };

  const handleDeleteDepartment = (id) => {
    const hasEmployees = employees.some(e => Number(e.departmentId) === Number(id));
    if (hasEmployees) {
      alert('Cannot delete department with employees. Please reassign or remove employees first.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this department?')) {
      saveDepartments(departments.filter(d => d.id !== id));
    }
  };

  const resetDepartmentForm = () => {
    setDepartmentForm({
      name: '',
      description: ''
    });
    setEditingDepartment(null);
    setShowDepartmentModal(false);
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ employees, departments }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'staff-data.json';
    link.click();
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find(d => Number(d.id) === Number(deptId));
    return dept ? dept.name : 'Unknown Department';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage employees and departments</p>
        </div>
        <button
          onClick={exportData}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Save size={18} />
          Export JSON
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('employees')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === 'employees'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Users size={18} />
            Employees
          </div>
        </button>
        <button
          onClick={() => setView('departments')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === 'departments'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Building2 size={18} />
            Departments
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
            </div>
            <Users className="text-green-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Departments</p>
              <p className="text-3xl font-bold text-gray-900">{departments.length}</p>
            </div>
            <Building2 className="text-blue-600" size={40} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Latest Update</p>
              <p className="text-sm font-medium text-gray-900">
                {employees.length > 0 ? new Date(Math.max(...employees.map(e => new Date(e.updatedAt || e.createdAt)))).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {view === 'employees' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Employees</h2>
            <button
              onClick={() => setShowEmployeeModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Add Employee
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.image}
                          alt={employee.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          {employee.email && (
                            <p className="text-sm text-gray-500">{employee.email}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4 text-gray-600">{getDepartmentName(employee.departmentId)}</td>
                    <td className="px-6 py-4">
                      {employee.staffCategory && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {employee.staffCategory}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditEmployee(employee)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {employees.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users size={48} className="mx-auto mb-4 text-gray-400" />
                <p>No employees added yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'departments' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Departments</h2>
            <button
              onClick={() => setShowDepartmentModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Add Department
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((department) => {
              const employeeCount = employees.filter(e => Number(e.departmentId) === Number(department.id)).length;
              return (
                <div key={department.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900 text-lg">{department.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {employeeCount} {employeeCount === 1 ? 'Employee' : 'Employees'}
                    </span>
                  </div>
                  {department.description && (
                    <p className="text-gray-600 text-sm mb-4">{department.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditDepartment(department)}
                      className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDepartment(department.id)}
                      className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {departments.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Building2 size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No departments added yet</p>
            </div>
          )}
        </div>
      )}

      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h2>
              <button onClick={resetEmployeeForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image *
                </label>
                
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setEmployeeForm({ ...employeeForm, uploadMethod: 'file', imageUrl: '', image: null, imagePreview: null })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      employeeForm.uploadMethod === 'file'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmployeeForm({ ...employeeForm, uploadMethod: 'url', image: null, imagePreview: null })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      employeeForm.uploadMethod === 'url'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Use URL
                  </button>
                </div>

                {employeeForm.imagePreview && (
                  <div className="mb-4">
                    <img
                      src={employeeForm.imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={() => {
                        setEmployeeForm({ ...employeeForm, imagePreview: null });
                        alert('Failed to load image from URL');
                      }}
                    />
                  </div>
                )}

                {employeeForm.uploadMethod === 'file' && (
                  <div>
                    <input
                      type="file"
                      onChange={handleEmployeeImageChange}
                      className="hidden"
                      id="employee-image-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="employee-image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <ImageIcon size={20} />
                      {employeeForm.image ? 'Change Image' : 'Upload Image'}
                    </label>
                  </div>
                )}

                {employeeForm.uploadMethod === 'url' && (
                  <input
                    type="url"
                    value={employeeForm.imageUrl}
                    onChange={handleEmployeeUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={employeeForm.name}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                    placeholder="e.g., Ndunda James"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position *
                  </label>
                  <input
                    type="text"
                    value={employeeForm.position}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, position: e.target.value })}
                    placeholder="e.g., Finance Manager"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={employeeForm.email}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                    placeholder="employee@chunasacco.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={employeeForm.phone}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                    placeholder="+254 700 000 000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department *
                  </label>
                  <select
                    value={employeeForm.departmentId}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, departmentId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Staff Category
                  </label>
                  <input
                    type="text"
                    value={employeeForm.staffCategory}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, staffCategory: e.target.value })}
                    placeholder="e.g., Accounting & Finance Department"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <textarea
                  value={employeeForm.education}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, education: e.target.value })}
                  placeholder="Educational background and qualifications..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Responsibilities
                </label>
                <textarea
                  value={employeeForm.responsibilities}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, responsibilities: e.target.value })}
                  placeholder="List of key responsibilities and duties..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio / About
                </label>
                <textarea
                  value={employeeForm.bio}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, bio: e.target.value })}
                  placeholder="Brief biography or description..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={resetEmployeeForm}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEmployeeSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDepartmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingDepartment ? 'Edit Department' : 'Add New Department'}
              </h2>
              <button onClick={resetDepartmentForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name *
                </label>
                <input
                  type="text"
                  value={departmentForm.name}
                  onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
                  placeholder="e.g., Accounting & Finance"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={departmentForm.description}
                  onChange={(e) => setDepartmentForm({ ...departmentForm, description: e.target.value })}
                  placeholder="Brief description of the department..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={resetDepartmentForm}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDepartmentSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingDepartment ? 'Update Department' : 'Add Department'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}