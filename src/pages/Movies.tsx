import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchMovies, setFilters, setPage, fetchGenres, fetchAvailableYears } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard/MovieCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Pagination from '../components/UI/Pagination';
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

const Movies: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, pagination, filters, genres, availableYears } = useAppSelector((state) => state.movies);
  const { viewMode } = useAppSelector((state) => state.ui);
  
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  useEffect(() => {
    dispatch(fetchMovies({ 
      page: pagination.page,
      ...filters 
    }));
  }, [dispatch, pagination.page, filters]);

  // Fetch genres and years when component mounts
  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchAvailableYears());
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchQuery }));
  };

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const clearFilters = () => {
    dispatch(setFilters({ 
      search: undefined,
      year: undefined,
      genre: undefined,
      sort: 'asc'
    }));
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Movies</h1>
          <p className="text-gray-600">
            Showing {movies.length} of {pagination.total} movies
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </form>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => dispatch({ type: 'ui/setViewMode', payload: 'grid' })}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            >
              <Squares2X2Icon className="h-4 w-4" />
            </button>
            <button
              onClick={() => dispatch({ type: 'ui/setViewMode', payload: 'list' })}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            >
              <ListBulletIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={filters.year || ''}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Years</option>
                {availableYears?.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <select
                value={filters.genre || ''}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Genres</option>
                {genres?.map(genre => (
                  <option key={genre.id} value={genre.name}>{genre.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sort || 'asc'}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="asc">Release Date (Ascending)</option>
                <option value="desc">Release Date (Descending)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Movies Grid/List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No movies found</div>
          <p className="text-gray-400 mt-2">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <>
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "space-y-4"
          }>
            {movies.map((movie) => (
              <MovieCard key={movie.imdbId} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.total > pagination.limit && (
            <Pagination
              currentPage={pagination.page}
              totalPages={Math.ceil(pagination.total / pagination.limit)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Movies;
