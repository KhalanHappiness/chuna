import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

// Individual Employee Profile Page
function EmployeeProfilePage({ employee, department, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Green Header Bar */}
      <div className="bg-green-700 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <a href="#" className="hover:underline">MEMBERS PORTAL</a>
            <a href="#" className="hover:underline">BID DATA UPDATE</a>
            <a href="#" className="hover:underline">NEW MEMBER APPLICATION</a>
            <a href="#" className="hover:underline">CAREERS</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CHUNA DT SACCO LTD</h1>
                <p className="text-xs text-green-600">The University Sacco</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <a href="#" className="text-gray-700 hover:text-green-600">HOME</a>
              <a href="#" className="text-gray-700 hover:text-green-600">ABOUT</a>
              <a href="#" className="text-gray-700 hover:text-green-600">PRODUCTS</a>
              <a href="#" className="text-gray-700 hover:text-green-600">MEMBERSHIP</a>
              <a href="#" className="text-gray-700 hover:text-green-600">MEDIA CENTRE</a>
              <a href="#" className="text-gray-700 hover:text-green-600">DOWNLOADS</a>
              <a href="#" className="text-gray-700 hover:text-green-600">CONTACT US</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-green-600 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Staff Directory
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header with gradient background */}
          <div className="relative">
            <div className="h-64 bg-gradient-to-r from-green-400 via-blue-300 to-green-300 overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 gap-2 p-4">
                  {[...Array(64)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full bg-white"
                      style={{
                        width: `${Math.random() * 20 + 10}px`,
                        height: `${Math.random() * 20 + 10}px`,
                        opacity: Math.random() * 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-20 left-8">
              <img
                src={employee.image || 'https://via.placeholder.com/150'}
                alt={employee.name}
                className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="absolute top-0 left-0 w-8 h-8 bg-green-600 rounded-full"></div>
            </div>
          </div>

          <div className="pt-24 px-8 pb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{employee.name}</h1>
              <p className="text-xl text-gray-600 mb-3">{employee.position}</p>
              <div className="flex gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                  {department ? department.name : 'Unknown Department'}
                </span>
                {employee.staffCategory && (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {employee.staffCategory}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Contact Info & Education */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Contact Info
                  </h2>
                  <div className="space-y-4">
                    {employee.email && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                        <a href={`mailto:${employee.email}`} className="text-gray-900 hover:text-green-600 break-all">
                          {employee.email}
                        </a>
                      </div>
                    )}
                    {employee.phone && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Phone</p>
                        <a href={`tel:${employee.phone}`} className="text-gray-900 hover:text-green-600">
                          {employee.phone}
                        </a>
                      </div>
                    )}
                    {!employee.email && !employee.phone && (
                      <p className="text-gray-500 text-sm">No contact information available</p>
                    )}
                  </div>
                </div>

                {employee.education && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Education
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{employee.education}</p>
                  </div>
                )}
              </div>

              {/* Right Column - Bio & Responsibilities */}
              <div className="lg:col-span-2 space-y-6">
                {employee.bio && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                    <p className="text-gray-700 leading-relaxed">{employee.bio}</p>
                  </div>
                )}

                {employee.responsibilities && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Key Responsibilities
                    </h2>
                    <div className="space-y-6">
                      {employee.responsibilities.split('\n').filter(r => r.trim()).map((resp, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-gray-700 leading-relaxed">{resp.trim()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!employee.bio && !employee.responsibilities && (
                  <div className="text-center py-12 text-gray-500">
                    <p>No additional information available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">RELATED LINKS</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Sacco Societies Regulatory Authority</a></li>
                <li><a href="#" className="hover:underline">Kenya Union of Savings and Credit Co-operatives</a></li>
                <li><a href="#" className="hover:underline">Cooperative Bank</a></li>
                <li><a href="#" className="hover:underline">University of Nairobi</a></li>
                <li><a href="#" className="hover:underline">CIC Insurance Group Insurance company</a></li>
                <li><a href="#" className="hover:underline">ICEA LION Group</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">MCHUNA APPLICATION</a></li>
                <li><a href="#" className="hover:underline">Help Desk</a></li>
                <li><a href="#" className="hover:underline">Online Loan Application</a></li>
                <li><a href="#" className="hover:underline">Asset Financing</a></li>
                <li><a href="#" className="hover:underline">Group Loan</a></li>
                <li><a href="#" className="hover:underline">New Member Registration</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">CONTACT INFO</h3>
              <div className="text-sm space-y-2">
                <p>University of Nairobi, Harry Thuku Rd</p>
                <p>+254 758 111 222</p>
                <p><a href="#" className="hover:underline">Email Us</a></p>
                <p className="mt-4">Mon - Fri 8:00 am- 5:00pm</p>
                <p>Sat-Sun CLOSED</p>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-sm">
            <p>© Copyright Chuna Co-operative Savings & Credit Society Ltd 2024. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main Public Staff Directory Component
export default function StaffPage() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedDepartments = localStorage.getItem('chuna-departments-db');
      const storedEmployees = localStorage.getItem('chuna-employees-db');
      
      if (storedDepartments) {
        setDepartments(JSON.parse(storedDepartments));
      }
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const filteredEmployees = selectedDepartment === 'all' 
    ? employees 
    : employees.filter(emp => Number(emp.departmentId) === Number(selectedDepartment));

  const getDepartment = (deptId) => {
    return departments.find(d => Number(d.id) === Number(deptId));
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackToDirectory = () => {
    setSelectedEmployee(null);
  };

  // If viewing employee profile
  if (selectedEmployee) {
    const department = getDepartment(selectedEmployee.departmentId);
    return (
      <EmployeeProfilePage 
        employee={selectedEmployee} 
        department={department}
        onBack={handleBackToDirectory} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Green Header Bar */}
      

     

      {/* Page Header */}
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Our Staff</h1>
          <p className="text-green-100">Meet our dedicated team members</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Department Filter */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => {
            const department = getDepartment(employee.departmentId);
            return (
              <div
                key={employee.id}
                onClick={() => handleEmployeeClick(employee)}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-100 via-blue-50 to-green-50">
                  <img
                    src={employee.image || 'https://via.placeholder.com/300'}
                    alt={employee.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Decorative pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-4 gap-1 p-2">
                      {[...Array(16)].map((_, i) => (
                        <div
                          key={i}
                          className="rounded-full bg-white"
                          style={{
                            width: `${Math.random() * 12 + 6}px`,
                            height: `${Math.random() * 12 + 6}px`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-green-600 transition-colors">
                    {employee.name}
                  </h3>
                  <p className="text-green-600 text-sm font-medium mb-2">
                    {employee.position}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {department ? department.name : 'Unknown Department'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">👥</span>
              </div>
              <p className="text-gray-500 text-lg">No employees found</p>
              <p className="text-gray-400 text-sm mt-2">
                {selectedDepartment === 'all' 
                  ? 'No staff members have been added yet.' 
                  : 'No staff members in this department.'}
              </p>
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
}