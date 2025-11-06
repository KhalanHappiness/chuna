import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Plus, Search, Calendar, Tag } from 'lucide-react';

export default function FormsUploadDashboard() {
  const [forms, setForms] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [newForm, setNewForm] = useState({
    title: '',
    categories: '',
    file: null
  });

  // Load forms from storage on mount
  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = () => {
    try {
      const stored = localStorage.getItem('chuna-forms-db');
      if (stored) {
        setForms(JSON.parse(stored));
      }
    } catch (error) {
      console.log('No existing forms found, starting fresh');
      setForms([]);
    }
  };

  const saveForms = (updatedForms) => {
    try {
      localStorage.setItem('chuna-forms-db', JSON.stringify(updatedForms));
      setForms(updatedForms);
    } catch (error) {
      console.error('Error saving forms:', error);
      alert('Failed to save forms');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewForm({ ...newForm, file: { name: file.name, data: reader.result, type: file.type } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!newForm.title || !newForm.categories || !newForm.file) {
      alert('Please fill all fields and select a file');
      return;
    }

    const form = {
      id: Date.now(),
      title: newForm.title,
      categories: newForm.categories.split(',').map(c => c.trim()),
      downloads: 0,
      createdAt: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      uploadedBy: 'Admin',
      file: newForm.file
    };

    const updatedForms = [...forms, form];
    saveForms(updatedForms);
    
    setNewForm({ title: '', categories: '', file: null });
    setShowUploadModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      const updatedForms = forms.filter(f => f.id !== id);
      saveForms(updatedForms);
    }
  };

  const handleDownload = (form) => {
    const updatedForms = forms.map(f => 
      f.id === form.id ? { ...f, downloads: f.downloads + 1 } : f
    );
    saveForms(updatedForms);

    // Create download link
    const link = document.createElement('a');
    link.href = form.file.data;
    link.download = form.file.name;
    link.click();
  };

  const exportDatabase = () => {
    const dataStr = JSON.stringify({ forms }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'db.json';
    link.click();
  };

  const filteredForms = forms.filter(form =>
    form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const displayedForms = filteredForms.slice(0, itemsPerPage);

  return (
     
      
    <div className="p-6">

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forms Management</h1>
          <p className="text-gray-600 mt-1">Upload and manage downloadable forms</p>
        </div>
        <button
          onClick={exportDatabase}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <Download size={18} />
          Export JSON
        </button>
      </div>
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-gray-700">Display</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-gray-600">items per page</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                />
              </div>

              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Upload New Form
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Forms</p>
                <p className="text-3xl font-bold text-gray-900">{forms.length}</p>
              </div>
              <FileText className="text-green-600" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Downloads</p>
                <p className="text-3xl font-bold text-gray-900">
                  {forms.reduce((sum, f) => sum + f.downloads, 0)}
                </p>
              </div>
              <Download className="text-blue-600" size={40} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Categories</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(forms.flatMap(f => f.categories)).size}
                </p>
              </div>
              <Tag className="text-purple-600" size={40} />
            </div>
          </div>
        </div>

        {/* Forms Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="text-red-500" size={24} />
                      <div>
                        <p className="font-medium text-gray-900">{form.title}</p>
                        <p className="text-sm text-gray-500">{form.file.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {form.categories.map((cat, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {form.createdAt ? new Date(form.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    }) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(form.updateDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{form.downloads}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDownload(form)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                        <Download size={14} />
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(form.id)}
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

          {displayedForms.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <p>No forms found</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Upload New Form</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
                <input
                  type="text"
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  placeholder="e.g., Delegates Vetting Form"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categories (comma-separated)</label>
                <input
                  type="text"
                  value={newForm.categories}
                  onChange={(e) => setNewForm({ ...newForm, categories: e.target.value })}
                  placeholder="e.g., General Downloads, Loan Products"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm text-gray-600">
                      {newForm.file ? newForm.file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, XLS, XLSX</p>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Upload Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}