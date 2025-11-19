import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  Newspaper, 
  Building2, 
  Users, 
  UserSquare2, 
  Package, 
  FileText,
  Info,
  Award,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import chunaLogo from '../../assets/chuna.png'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Sliders', icon: Image, path: '/admin/sliders' },
    { name: 'News & Updates', icon: Newspaper, path: '/admin/news' },
    { name: 'Departments', icon: Building2, path: '/admin/departments' },
    { name: 'Staff Members', icon: Users, path: '/admin/staff' },
    { name: 'Board Members', icon: UserSquare2, path: '/admin/board' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Downloadable Forms', icon: FileText, path: '/admin/forms' },
    { name: 'About Content', icon: Info, path: '/admin/about' },
    { name: 'Core Values', icon: Heart, path: '/admin/values' },
    { name: 'Awards', icon: Award, path: '/admin/awards' },
  ];

  return (
    <div 
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo/Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            
             <img 
                src={chunaLogo} 
                alt="Chuna DT Sacco Logo" 
                className="h-8 sm:h-10 lg:h-12 w-auto hover:opacity-90 transition-opacity"
              />
            
          
          </div>
          
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="font-medium text-sm">{item.name}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;