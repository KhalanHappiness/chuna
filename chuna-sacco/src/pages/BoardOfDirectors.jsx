import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Award, 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  UserCheck,
  Shield,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';

export default function BoardOfDirectors() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    try {
      const stored = localStorage.getItem('board-members-db');
      if (stored) {
        setMembers(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load board members:', error);
    } finally {
      setLoading(false);
    }
  };

  const executiveMembers = members.filter(m => m.category === 'executive');
  const boardMembers = members.filter(m => m.category === 'board');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading board members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-16 mt-28 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-white text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            THE BOARD
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Members Of The Board</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            The board of directors has the ultimate decision-making authority and responsibility 
            for directing and controlling the affairs of the SACCO and providing effective and 
            efficient management of overall operations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Executive Board Members Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-yellow-100 rounded-full text-yellow-800 text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              EXECUTIVE LEADERSHIP
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Executive Board Members</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our executive team provides strategic direction and ensures operational excellence
            </p>
          </div>

          {executiveMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {executiveMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No executive members available</p>
            </div>
          )}
        </section>

        {/* Board Members Section */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              BOARD MEMBERS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Board Members</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to our cooperative's success and member welfare
            </p>
          </div>

          {boardMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {boardMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No board members available</p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Become part of a SACCO led by experienced professionals committed to your financial success
          </p>
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg text-lg">
            BECOME A MEMBER
          </button>
        </section>
      </div>
    </div>
  );
}

// Member Card Component
function MemberCard({ member }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-gray-200">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
          }}
        />
        {/* Role Badge */}
        {member.role && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {member.role}
            </span>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-green-600 font-semibold mb-3">{member.position}</p>
        
        {member.description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {member.description}
          </p>
        )}
      </div>
    </div>
  );
}
