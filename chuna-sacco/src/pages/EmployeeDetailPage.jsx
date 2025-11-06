 import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = () => {
    try {
      const storedEmployees = localStorage.getItem('chuna-employees-db');
      const storedDepartments = localStorage.getItem('chuna-departments-db');
      
      if (storedEmployees) {
        const employees = JSON.parse(storedEmployees);
        const emp = employees.find(e => e.id === parseInt(id));
        
        if (emp) {
          setEmployee(emp);

          if (storedDepartments) {
            const departments = JSON.parse(storedDepartments);
            const dept = departments.find(d => d.id === emp.departmentId);
            setDepartment(dept);
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load employee:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => navigate('/staff')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Staff
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Employee not found</p>
            <button
              onClick={() => navigate('/staff')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Return to Staff Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/staff')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Staff
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Employee Photo */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-8">
              <img
                src={employee.image}
                alt={employee.name}
                className="w-full aspect-square object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                }}
              />
              {employee.staffCategory && (
                <div className="p-4 bg-gray-50 border-t">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Staff Category
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {employee.staffCategory}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Employee Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Name and Position */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {employee.name}
              </h1>
              <p className="text-green-600 font-medium text-lg mb-1">
                {employee.position}
              </p>
              {department && (
                <p className="text-gray-500">
                  {department.name}
                </p>
              )}
            </div>

            {/* Contact Info */}
            {(employee.email || employee.phone) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Contact Info
                </h2>
                <div className="space-y-3">
                  {employee.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="text-gray-400" size={20} />
                      <a
                        href={`mailto:${employee.email}`}
                        className="text-green-600 hover:text-green-700 hover:underline"
                      >
                        {employee.email}
                      </a>
                    </div>
                  )}
                  {employee.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="text-gray-400" size={20} />
                      <a
                        href={`tel:${employee.phone}`}
                        className="text-green-600 hover:text-green-700 hover:underline"
                      >
                        {employee.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Education */}
            {employee.education && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Education
                </h2>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {employee.education}
                </div>
              </div>
            )}

            {/* Responsibilities */}
            {employee.responsibilities && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Key Responsibilities
                </h2>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {employee.responsibilities}
                </div>
              </div>
            )}

            {/* Bio/Description */}
            {employee.bio && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  About
                </h2>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {employee.bio}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}