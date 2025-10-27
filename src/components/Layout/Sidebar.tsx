import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { 
  HomeIcon, 
  FilmIcon, 
  HeartIcon,
  BookmarkIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { sidebarOpen } = useAppSelector((state) => ({
    sidebarOpen: state.ui.sidebarOpen,
  }));

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'All Movies', href: '/movies', icon: FilmIcon },
    { name: 'Favorites', href: '/favorites', icon: HeartIcon },
    { name: 'Watchlist', href: '/watchlist', icon: BookmarkIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => dispatch({ type: 'ui/toggleSidebar' })}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <button
              onClick={() => dispatch({ type: 'ui/toggleSidebar' })}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
