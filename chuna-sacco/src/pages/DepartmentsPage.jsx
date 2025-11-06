import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, X, GraduationCap, Briefcase } from 'lucide-react';
import Header from '../components/Header';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('departments');
    if (stored) {
      setDepartments(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Our Departments</h1>
          <p className="text-xl text-green-100">
            Meet the teams that make our organization great
          </p>
        </div>
      </div>

      {/* Departments Content */}
      <div className="max-w-7xl mx-auto p-6">
        {departments.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No departments added yet</p>
          </div>
        ) : (
          departments.map((dept) => (
            <div key={dept.id} className="mb-16">
              {/* Department Info */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  {dept.name}
                </h2>
                <p className="text-gray-600 text-lg mb-4">{dept.description}</p>

                {dept.keyRoles?.length > 0 && (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-gray-700 mb-3 text-lg">
                      Key Responsibilities:
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {dept.keyRoles.map((role, idx) => (
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
              {dept.members?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Team Members
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dept.members.map((member) => (
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
                                <span>{member.email}</span>
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
              )}
            </div>
          ))
        )}
      </div>

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
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
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
                      <p className="font-medium">{selectedMember.email}</p>
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
                  <p className="text-gray-600 leading-relaxed">
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