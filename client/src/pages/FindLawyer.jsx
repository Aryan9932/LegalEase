import React, { useState, useEffect } from 'react';
import { User, MapPin, Phone, Mail, Award, Scale, Search } from 'lucide-react';

const LawyerDisplay = () => {
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/lawyers/getlawyers');
      const data = await response.json();
      setLawyers(data);
      setFilteredLawyers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch lawyers');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  useEffect(() => {
    let filtered = [...lawyers];

    if (searchTerm) {
      filtered = filtered.filter(lawyer =>
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy !== 'all') {
      filtered = filtered.filter(lawyer =>
        lawyer.specialization.toLowerCase().includes(filterBy.toLowerCase())
      );
    }

    setFilteredLawyers(filtered);
  }, [searchTerm, filterBy, lawyers]);

  const getUniqueSpecializations = () => {
    const specializations = lawyers.map(lawyer => lawyer.specialization);
    return [...new Set(specializations)];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lawyers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchLawyers}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Legal Directory</h1>
          <p className="text-gray-600">
            {filteredLawyers.length} {filteredLawyers.length === 1 ? 'lawyer' : 'lawyers'} available
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, specialization, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:w-64">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Specializations</option>
                {getUniqueSpecializations().map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredLawyers.length === 0 ? (
          <div className="text-center py-12">
            <Scale className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No lawyers found matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredLawyers.map((lawyer, index) => (
              <div
                key={lawyer._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      #{index + 1}
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {lawyer.specialization}
                    </span>
                  </div>

                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">{lawyer.name}</h2>
                      <p className="text-gray-600">{lawyer.yearsOfExperience} years of experience</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-800 font-medium truncate">{lawyer.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-800 font-medium">{lawyer.contactNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-800 font-medium">{lawyer.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-500">License</p>
                        <p className="text-gray-800 font-medium">{lawyer.licenseNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredLawyers.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white shadow-lg px-6 py-3 rounded-full hover:shadow-xl transition-all font-medium text-gray-700"
            >
              Back to Top ↑
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerDisplay;
