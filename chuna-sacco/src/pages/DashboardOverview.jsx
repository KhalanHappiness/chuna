import React, { useState, useEffect } from 'react';
import { FileText, Download, Users } from 'lucide-react';

export default function DashboardOverview() {
  const [forms, setForms] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    try {
      const storedForms = localStorage.getItem('chuna-forms-db');
      const storedMembers = localStorage.getItem('board-members-db');
      if (storedForms) setForms(JSON.parse(storedForms));
      if (storedMembers) setMembers(JSON.parse(storedMembers));
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }, []);

  const totalDownloads = forms.reduce((sum, f) => sum + f.downloads, 0);
  const executiveMembers = members.filter(m => m.category === 'executive');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to Chuna SACCO Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <p className="text-3xl font-bold text-gray-900">{totalDownloads}</p>
            </div>
            <Download className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Board Members</p>
              <p className="text-3xl font-bold text-gray-900">{members.length}</p>
            </div>
            <Users className="text-purple-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Executive Board</p>
              <p className="text-3xl font-bold text-gray-900">{executiveMembers.length}</p>
            </div>
            <Users className="text-yellow-600" size={40} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Recent Forms</h2>
          <div className="space-y-3">
            {forms.slice(0, 5).map(form => (
              <div key={form.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-green-600" />
                  <div>
                    <p className="font-medium text-sm">{form.title}</p>
                    <p className="text-xs text-gray-500">{form.downloads} downloads</p>
                  </div>
                </div>
              </div>
            ))}
            {forms.length === 0 && (
              <p className="text-gray-500 text-center py-4">No forms uploaded yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Recent Board Members</h2>
          <div className="space-y-3">
            {members.slice(0, 5).map(member => (
              <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.position}</p>
                </div>
              </div>
            ))}
            {members.length === 0 && (
              <p className="text-gray-500 text-center py-4">No members added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}