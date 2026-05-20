import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Package, Tags, MessageSquareQuote,
  Mail, Users, LogOut, ChevronRight
} from 'lucide-react';

const allNavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true, roles: ['admin', 'seller'] },
  { name: 'Products', path: '/admin/products', icon: Package, roles: ['admin', 'seller'] },
  { name: 'Categories', path: '/admin/categories', icon: Tags, roles: ['admin', 'seller'] },
  { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote, roles: ['admin'] },
  { name: 'Contacts', path: '/admin/contacts', icon: Mail, roles: ['admin'] },
  { name: 'Users', path: '/admin/users', icon: Users, roles: ['admin'] },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role || 'seller';

  const navItems = allNavItems.filter(item => item.roles.includes(userRole));

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center">
              <span className="text-sm font-black text-white">OM</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">OM Distribution</h2>
              <p className="text-[11px] text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Management</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#1a1a1a] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.name}</span>
              <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${userRole === 'admin' ? 'bg-red-100' : 'bg-blue-100'}`}>
              <span className={`text-xs font-bold ${userRole === 'admin' ? 'text-red-700' : 'text-blue-700'}`}>
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.email || 'Admin'}</p>
              <p className="text-[11px] text-gray-400 capitalize">{userRole}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
