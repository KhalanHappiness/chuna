import React, { useState, useEffect } from 'react';
import { Download, Search, FileText, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const DownloadsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api/public';
  const FLASK_BASE_URL = 'http://localhost:5000';

  // Fetch downloads from API
  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/downloads`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch downloads');
      }
      
      const data = await response.json();
      setDownloads(data.forms || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error loading downloads:', error);
      setError('Failed to load downloads. Please try again later.');
      setDownloads([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDownloads = downloads.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredDownloads.slice(startIndex, endIndex);

  // Handle download
  const handleDownload = async (item) => {
    setDownloadingId(item.id);
    
    try {
      // Log for debugging
      console.log('Download item:', item);
      console.log('File URL:', item.file_url);
      
      // Construct full URL for the file - properly encode the URL
      const fileUrl = item.file_url.startsWith('http') 
        ? item.file_url 
        : `${FLASK_BASE_URL}${item.file_url}`;
      
      // Encode the URL properly to handle spaces and special characters
      const encodedUrl = fileUrl.split('/').map((part, index) => {
        // Don't encode the protocol (http://) or domain parts
        if (index < 3) return part;
        return encodeURIComponent(part);
      }).join('/');
      
      console.log('Encoded file URL:', encodedUrl);
      
      // Fetch as blob to ensure binary download
      const response = await fetch(encodedUrl);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      // Get the blob
      const blob = await response.blob();
      
      // Create a download link with the blob
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = item.title + '.' + (item.file_type || 'pdf').toLowerCase();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
      
      // Track download count on backend
      try {
        await fetch(`${API_BASE_URL}/downloads/${item.id}/track`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // Update local state to reflect new count
        setDownloads(prevDownloads => 
          prevDownloads.map(d => 
            d.id === item.id 
              ? { ...d, download_count: (d.download_count || 0) + 1 }
              : d
          )
        );
      } catch (trackError) {
        console.log('Could not track download:', trackError);
      }
      
    } catch (error) {
      console.error('Download failed:', error);
      console.error('Error details:', error.message);
      alert(`Failed to download ${item.title}. Error: ${error.message}`);
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading downloads...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg font-semibold mb-2">Error Loading Downloads</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadDownloads}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 mt-28">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Downloads</h1>
          <p className="text-xl text-gray-500">Access all your important documents and forms</p>
        </div>
      </div>

      {/* Downloads Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Display</label>
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">downloads per page</span>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Downloads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-red-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">
                              {(item.download_count || 0)} downloads
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.category && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {item.category}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.file_type || 'PDF'}</div>
                        <div className="text-sm text-gray-500">{item.file_size || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.upload_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDownload(item)}
                          disabled={downloadingId === item.id}
                          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all ${
                            downloadingId === item.id
                              ? 'bg-gray-400 cursor-not-allowed text-white'
                              : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg transform hover:scale-105'
                          }`}
                        >
                          <Download className={`h-4 w-4 ${downloadingId === item.id ? 'animate-bounce' : ''}`} />
                          <span>{downloadingId === item.id ? 'Downloading...' : 'Download'}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {searchTerm ? 'No downloads match your search' : 'No downloads available'}
                      </p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="mt-2 text-green-600 hover:text-green-700 text-sm"
                        >
                          Clear search
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredDownloads.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredDownloads.length)} of {filteredDownloads.length} downloads
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm rounded ${
                      currentPage === pageNum
                        ? 'bg-green-600 text-white'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && <span className="text-gray-500">...</span>}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadsPage;