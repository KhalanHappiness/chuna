import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Award, 
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function BoardOfDirectors() {
  const [boardData, setBoardData] = useState({
    executive: [],
    board: [],
    supervisory: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = 'http://localhost:5000/api/public';
  const FLASK_BASE_URL = 'http://localhost:5000';

  // Fetch board members from API
  useEffect(() => {
    loadMembers();
  }, [])

  const loadMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/board`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch board members');
      }

      const data = await response.json();
      
      // The API returns { executive: [...], board: [...], supervisory: [...] }
      setBoardData({
        executive: data.executive || [],
        board: data.board || [],
        supervisory: data.supervisory || []
      });

    } catch (error) {
      console.error('Failed to load board members:', error);
      setError('Failed to load board members. Please try again later.');
      setBoardData({ executive: [], board: [], supervisory: [] });
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg font-semibold mb-2">Error Loading Board Members</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadMembers}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Retry
          </button>
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

          {boardData.executive.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {boardData.executive.map((member) => (
                <MemberCard key={member.id} member={member} flaskBaseUrl={FLASK_BASE_URL} />
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
        <section className="mb-16">
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

          {boardData.board.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {boardData.board.map((member) => (
                <MemberCard key={member.id} member={member} flaskBaseUrl={FLASK_BASE_URL} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No board members available</p>
            </div>
          )}
        </section>

        {/* Supervisory Committee Section */}
        {boardData.supervisory.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-4">
                <Users className="w-4 h-4 mr-2" />
                SUPERVISORY COMMITTEE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Supervisory Committee</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ensuring transparency and accountability in our operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {boardData.supervisory.map((member) => (
                <MemberCard key={member.id} member={member} flaskBaseUrl={FLASK_BASE_URL} />
              ))}
            </div>
          </section>
        )}

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
function MemberCard({ member, flaskBaseUrl }) {
  // Construct full image URL
  const imageUrl = member.photo_url 
    ? (member.photo_url.startsWith('http') 
        ? member.photo_url 
        : `${flaskBaseUrl}${member.photo_url}`)
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&size=400&background=10b981&color=fff`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-gray-200">
        <img
          src={imageUrl}
          alt={member.full_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&size=400&background=10b981&color=fff`;
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.full_name}</h3>
        <p className="text-green-600 font-semibold mb-3">{member.position}</p>
        
        {member.bio && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {member.bio}
          </p>
        )}

        {/* Contact Info */}
        <div className="space-y-2 text-sm text-gray-500">
          {member.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span className="truncate">{member.email}</span>
            </div>
          )}
          {member.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>{member.phone}</span>
            </div>
          )}
        </div>

        {member.education && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">EDUCATION</p>
            <p className="text-sm text-gray-700">{member.education}</p>
          </div>
        )}
      </div>
    </div>
  );
}