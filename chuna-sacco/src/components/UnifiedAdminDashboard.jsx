// UnifiedAdminDashboard.jsx
import React, { useState } from 'react';
import { Menu, LayoutDashboard, FileText, Users, Briefcase } from 'lucide-react';
import DashboardOverview from '../pages/DashboardOverview';
import FormsUploadDashboard from '../pages/FormsUploadDashboard';
import BoardMembersManagement from '../pages/BoardMembersAdmin';
import StaffManagement from '../pages/Staffmanagement';
import DepartmentManagementPage from '../pages/DepartmentManagementPage';

export default function UnifiedAdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
              activeSection === 'dashboard' ? 'bg-green-600' : 'hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveSection('forms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
              activeSection === 'forms' ? 'bg-green-600' : 'hover:bg-gray-800'
            }`}
          >
            <FileText size={20} />
            {sidebarOpen && <span>Forms Management</span>}
          </button>

          <button
            onClick={() => setActiveSection('board')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
              activeSection === 'board' ? 'bg-green-600' : 'hover:bg-gray-800'
            }`}
          >
            <Users size={20} />
            {sidebarOpen && <span>Board Members</span>}
          </button>

          {/* NEW: Staff Management Button */}
          <button
            onClick={() => setActiveSection('staff')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeSection === 'staff' ? 'bg-green-600' : 'hover:bg-gray-800'
            }`}
          >
            <Briefcase size={20} />
            {sidebarOpen && <span>Staff Management</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          {sidebarOpen && (
            <div className="text-sm text-gray-400">
              <p className="font-medium text-white mb-1">Chuna SACCO</p>
              <p>Admin Dashboard</p>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        {activeSection === 'dashboard' && <DashboardOverview />}
        {activeSection === 'forms' && <FormsUploadDashboard />}
        {activeSection === 'board' && <BoardMembersManagement />}
        {activeSection === 'staff' && <DepartmentManagementPage />} 
      </div>
    </div>
  );
}