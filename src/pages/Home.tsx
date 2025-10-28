import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard/MovieCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { 
  FilmIcon, 
  CalendarIcon, 
  TagIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, pagination } = useAppSelector((state) => state.movies);
  const { favorites, watchlist } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  const stats = [
    {
      name: 'Total Movies',
      value: pagination.total || 0,
      icon: FilmIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Favorites',
      value: favorites.length,
      icon: HeartIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      name: 'Watchlist',
      value: watchlist.length,
      icon: CalendarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Genres',
      value: '20+',
      icon: TagIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to MovieDB</h1>
        <p className="text-xl text-primary-100 mb-6">
          Discover, explore, and manage your favorite movies with our comprehensive movie database.
        </p>
        <div className="flex space-x-4">
          <Link 
            to="/movies" 
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Movies
          </Link>
          <Link 
            to="/favorites" 
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            View Favorites
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Movies */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Movies</h2>
          <Link 
            to="/movies" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.imdbId} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/movies/year" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CalendarIcon className="h-6 w-6 text-primary-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Browse by Year</div>
              <div className="text-sm text-gray-500">Find movies from specific years</div>
            </div>
          </Link>
          <Link 
            to="/genres" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <TagIcon className="h-6 w-6 text-primary-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Browse by Genre</div>
              <div className="text-sm text-gray-500">Explore different movie genres</div>
            </div>
          </Link>
          <Link 
            to="/movies" 
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FilmIcon className="h-6 w-6 text-primary-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">All Movies</div>
              <div className="text-sm text-gray-500">View complete movie collection</div>
            </div>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
