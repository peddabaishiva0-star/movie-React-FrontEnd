import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchMovies, setFilters } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard/MovieCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Pagination from '../components/UI/Pagination';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { movies, loading, pagination } = useAppSelector((state) => state.movies);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      dispatch(setFilters({ search: query }));
      dispatch(searchMovies({ query }));
    }
  }, [dispatch, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setFilters({ search: searchQuery }));
      dispatch(searchMovies({ query: searchQuery }));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(searchMovies({ query: searchQuery, page }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
        <p className="text-gray-600">
          {searchQuery ? `Results for "${searchQuery}"` : 'Search for movies'}
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex space-x-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No movies found</div>
          <p className="text-gray-400 mt-2">Try a different search term</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbId} movie={movie} />
            ))}
          </div>

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

export default Search;
