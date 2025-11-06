import React, { useState, useEffect } from 'react';
import { Eye, Target, Users, CheckCircle, Shield, Award, BookOpen, Phone, Mail, MapPin, Clock } from 'lucide-react';

const SupervisoryCommittee = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const committeeMembers = [
    {
      id: 1,
      name: "Dr. Angeline Chopchirchir",
      role: "Member",
      image: "https://www.chunasacco.co.ke/sites/default/files/all-uploads/supervisory/dr-angela.jpg",
    },
    {
      id: 2,
      name: "Mr. Richard Agatu",
      role: "Member", 
      image: "https://www.chunasacco.co.ke/sites/default/files/all-uploads/supervisory/mr-agutu.jpg",
    },
    {
      id: 3,
      name: "Mr. Hezborn Esilkumo",
      role: "Member",
      image: "https://www.chunasacco.co.ke/sites/default/files/all-uploads/supervisory/mr-oeshi.jpg",
    }
  ];

  const mandatePoints = [
    "Internal Audit Committee of the Society ensuring effective control systems",
    "Complementary role to the Management Committee for organizational integrity",
    "Independent oversight and accountability mechanisms",
    "Enhancement of trust among members and stakeholders",
    "Promotion of good governance practices and safeguards"
  ];

  const qualitiesPoints = [
    "Same qualifications as Management Committee members",
    "Basic bookkeeping, accounting, auditing knowledge",
    "Financial management expertise",
    "Independent oversight capabilities",
    "Professional integrity and ethics"
  ];

  const electionPoints = [
    "Conducted in accordance with Rule 28",
    "Relevant society by-laws compliance",
    "Democratic selection process",
    "Three-year term periods",
    "Annual committee renewal processes"
  ];

  const aboutPoints = [
    {
      title: "Section 2 (a) Definition",
      content: "Cooperative Society Act, No. 12 of 1997 (as amended in 2004) provides the legal framework."
    },
    {
      title: "Oversight Committee",
      content: "Supervisory Committee means an oversight committee elected at a General Meeting."
    },
    {
      title: "Legal Establishment", 
      content: "Established under Rule 28 of the Cooperative Society Rules (Legal Notice No. 123 of 2004)."
    },
    {
      title: "Committee Composition",
      content: "Every society shall have a supervisory committee consisting of three members."
    },
    {
      title: "Term Duration",
      content: "Each elected at a general meeting for a period of three years with annual renewals."
    },
    {
      
      content: "The members of the Supervisory Committee shall meet the same qualifications as those of the members of the Management Committee"
    },
    {
      content: " In addition at least one member of the committee shall have basic bookkeeping, accounting, auditing or financial management knowledge. Where no such person is elected, those elected may be taken for basic accounting training."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 mt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-semibold text-sm uppercase tracking-wide">Supervisory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Chuna <span className="text-green-600">Supervisory Committee</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The Supervisory Committee shall examine the books of the credit union or other security, confirm the cash instruments, property and securities of the credit union or other security, confirm the deposits of the members and perform such other duties
            </p>
          </div>

          {/* Key Role Description */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Oversight Role</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  The Supervisory Committee plays a crucial role in maintaining the integrity and sustainability of the Sacco. 
                  By providing independent oversight and accountability mechanisms, it enhances trust among members and 
                  stakeholders, promotes good governance practices, and safeguards the interests of all members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Committee Members</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated supervisory committee members bring extensive experience in financial oversight and governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {committeeMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-82 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Committee Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        COMMITTEE
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-green-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.expertise}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Committee */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image/Visual Side */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white rounded-full p-6 mx-auto mb-6 w-24 h-24 flex items-center justify-center shadow-lg">
                    <Shield className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Oversight & Governance</h3>
                  <p className="text-gray-600">Ensuring transparency and accountability</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About <span className="text-green-600">The Supervisory Committee</span>
              </h2>
              
              <div className="space-y-4">
                {aboutPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-green-100 rounded-full p-1 mt-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{point.title}</h4>
                      <p className="text-gray-600 text-sm">{point.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Column Info Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mandate */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">MANDATE</h3>
              <p className="text-gray-600 mb-6 text-sm">
                The Supervisory Committee serves as the internal Audit Committee of the Society, ensuring effective control systems.
              </p>
              <ul className="space-y-3">
                {mandatePoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualities */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">QUALITIES</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Committee members meet the same qualifications as Management Committee members.
              </p>
              <ul className="space-y-3">
                {qualitiesPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Election */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ELECTION</h3>
              <p className="text-gray-600 mb-6 text-sm">
                The election process is conducted in accordance with Rule 28 and relevant society by-laws.
              </p>
              <ul className="space-y-3">
                {electionPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default SupervisoryCommittee;