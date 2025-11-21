import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, X, GraduationCap, Briefcase, Loader2 } from 'lucide-react';

// Simple Header Component
const Header = () => (
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
);

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api/public';
  const FLASK_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all departments
      const deptResponse = await fetch(`${API_BASE_URL}/departments`);
      if (!deptResponse.ok) {
        throw new Error('Failed to fetch departments');
      }
      const deptData = await deptResponse.json();

      // Fetch staff for each department
      const departmentsWithStaff = await Promise.all(
        deptData.map(async (dept) => {
          try {
            const staffResponse = await fetch(`${API_BASE_URL}/departments/${dept.slug}`);
            if (!staffResponse.ok) {
              return { ...dept, members: [] };
            }
            const staffData = await staffResponse.json();
            
            // Process staff members
            const members = (staffData.staff || []).map(member => ({
              id: member.id,
              name: member.full_name,
              title: member.position,
              email: member.email,
              phone: member.phone,
              image: member.photo_url ? 
                (member.photo_url.startsWith('http') ? member.photo_url : `${FLASK_BASE_URL}${member.photo_url}`) 
                : null,
              education: member.education,
              bio: member.bio,
            }));

            return {
              id: dept.id,
              name: dept.name,
              description: dept.description,
              keyRoles: dept.key_responsibilities ? 
                dept.key_responsibilities.split('\n').filter(r => r.trim()) : [],
              members: members
            };
          } catch (err) {
            console.error(`Failed to fetch staff for ${dept.name}:`, err);
            return { ...dept, members: [] };
          }
        })
      );

      setDepartments(departmentsWithStaff);
    } catch (err) {
      console.error('Failed to load departments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading departments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Departments</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadDepartments}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeDepartment = departments[activeTab];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Our Departments</h1>
          <p className="text-xl text-green-100">
            Meet the teams that make our organization great
          </p>
        </div>
      </div>

      {departments.length === 0 ? (
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No departments added yet</p>
          </div>
        </div>
      ) : (
        <>
          {/* Department Tabs */}
          <div className="bg-white border-b shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex overflow-x-auto scrollbar-hide">
                {departments.map((dept, index) => (
                  <button
                    key={dept.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex-shrink-0 px-6 py-4 font-semibold text-sm transition-all relative ${
                      activeTab === index
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                    }`}
                  >
                    {dept.name}
                    {dept.members?.length > 0 && (
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                        activeTab === index
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {dept.members.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Department Content */}
          {activeDepartment && (
            <div className="max-w-7xl mx-auto p-6">
              <div className="mb-12">
                {/* Department Info */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    {activeDepartment.name}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    {activeDepartment.description}
                  </p>

                  {activeDepartment.keyRoles?.length > 0 && (
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                      <h3 className="font-semibold text-gray-700 mb-4 text-lg flex items-center gap-2">
                        <Briefcase className="text-green-600" size={20} />
                        Key Responsibilities
                      </h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {activeDepartment.keyRoles.map((role, idx) => (
                          <li key={idx} className="text-gray-600 flex gap-2">
                            <span className="text-green-600 font-semibold">
                              {idx + 1}.
                            </span>
                            <span>{role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Team Members */}
                {activeDepartment.members?.length > 0 ? (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      Team Members ({activeDepartment.members.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {activeDepartment.members.map((member) => (
                        <div
                          key={member.id}
                          onClick={() => setSelectedMember(member)}
                          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                          <div className="p-6">
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-100"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/150';
                                }}
                              />
                            ) : (
                              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-green-100 flex items-center justify-center border-4 border-green-200">
                                <User size={64} className="text-green-600" />
                              </div>
                            )}
                            <h3 className="text-xl font-bold text-center mb-1">
                              {member.name}
                            </h3>
                            <p className="text-green-600 text-center font-medium mb-4">
                              {member.title}
                            </p>
                            <div className="space-y-2 text-sm text-gray-600">
                              {member.email && (
                                <div className="flex items-center gap-2 justify-center">
                                  <Mail size={16} className="text-green-600" />
                                  <span className="truncate">{member.email}</span>
                                </div>
                              )}
                              {member.phone && (
                                <div className="flex items-center gap-2 justify-center">
                                  <Phone size={16} className="text-green-600" />
                                  <span>{member.phone}</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-4 text-center">
                              <span className="text-sm text-green-600 font-medium">
                                Click for more details →
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No team members yet</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Staff members will appear here once they are added to this department.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                {selectedMember.image ? (
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-200">
                    <User size={48} className="text-green-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {selectedMember.name}
                  </h2>
                  <p className="text-xl text-green-600">
                    {selectedMember.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedMember.email && (
                  <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-lg">
                    <Mail className="text-green-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium break-all">{selectedMember.email}</p>
                    </div>
                  </div>
                )}
                {selectedMember.phone && (
                  <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-lg">
                    <Phone className="text-green-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedMember.phone}</p>
                    </div>
                  </div>
                )}
                {selectedMember.education && (
                  <div className="flex items-center gap-3 text-gray-700 md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <GraduationCap className="text-green-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="font-medium">{selectedMember.education}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedMember.bio && (
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    About
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              {selectedMember.responsibilities?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Briefcase className="text-green-600" size={20} />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2 bg-gray-50 p-6 rounded-lg">
                    {selectedMember.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-gray-600 flex gap-2">
                        <span className="text-green-600 font-semibold min-w-[24px]">
                          {idx + 1}.
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;