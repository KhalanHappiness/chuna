import { useEffect, useState } from 'react';
import { adminAPI } from '../api/axios';
import { 
  Users, 
  Building2, 
  Package, 
  FileText, 
  Newspaper,
  TrendingUp,
  Image,
  UserSquare2 
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [recentDownloads, setRecentDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data.stats);
      setRecentNews(response.data.recent_news || []);
      setRecentDownloads(response.data.recent_downloads || []);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.total_products || 0,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Staff Members',
      value: stats?.total_staff || 0,
      icon: Users,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Departments',
      value: stats?.total_departments || 0,
      icon: Building2,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Board Members',
      value: stats?.total_board_members || 0,
      icon: UserSquare2,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'News Articles',
      value: stats?.total_news || 0,
      icon: Newspaper,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      title: 'Downloadable Forms',
      value: stats?.total_downloads || 0,
      icon: FileText,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Slider Images',
      value: stats?.total_sliders || 0,
      icon: Image,
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600'
    },
    {
      title: 'Total Views',
      value: '12.5K',
      icon: TrendingUp,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent News</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentNews.length > 0 ? (
              recentNews.map((news) => (
                <div key={news.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Newspaper className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {news.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {news.category} • {new Date(news.publish_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No recent news</p>
            )}
          </div>
        </div>

        {/* Recent Downloads */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Forms</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentDownloads.length > 0 ? (
              recentDownloads.map((form) => (
                <div key={form.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {form.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {form.category} • {form.file_size} • {form.download_count} downloads
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No recent forms</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center group">
            <Image className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Add Slider</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center group">
            <Newspaper className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Add News</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center group">
            <Users className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Add Staff</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center group">
            <Package className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Add Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;