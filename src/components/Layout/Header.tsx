import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { 
  Bars3Icon, 
  HeartIcon, 
  BookmarkIcon,
  HomeIcon,
  FilmIcon
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favorites, watchlist } = useAppSelector((state) => ({
    favorites: state.favorites.favorites,
    watchlist: state.favorites.watchlist,
  }));

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center space-x-2">
              <FilmIcon className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">MovieDB</span>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              title="Home"
            >
              <HomeIcon className="h-6 w-6" />
            </Link>
            
            <Link
              to="/movies"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              title="All Movies"
            >
              <FilmIcon className="h-6 w-6" />
            </Link>
            
            <Link
              to="/favorites"
              className="relative p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              title="Favorites"
            >
              <HeartIcon className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <Link
              to="/watchlist"
              className="relative p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              title="Watchlist"
            >
              <BookmarkIcon className="h-6 w-6" />
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
