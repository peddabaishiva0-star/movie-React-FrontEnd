import React, { useEffect } from 'react';

import { fetchMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard/MovieCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const Watchlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const { watchlist } = useAppSelector((state) => state.favorites);
  const { movies, loading } = useAppSelector((state) => state.movies);

  // Filter movies to show only watchlist
  const watchlistMovies = movies.filter(movie => watchlist.includes(movie.imdbId));

  useEffect(() => {
    if (watchlist.length > 0) {
      // Fetch movies for watchlist IDs
      dispatch(fetchMovies({}));
    }
  }, [dispatch, watchlist]);

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <BookmarkIcon className="h-8 w-8 text-blue-500 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Watchlist</h1>
          <p className="text-gray-600">
            {watchlist.length} movie{watchlist.length !== 1 ? 's' : ''} to watch
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : watchlistMovies.length === 0 ? (
        <div className="text-center py-12">
          <BookmarkIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-500 text-lg">Your watchlist is empty</div>
          <p className="text-gray-400 mt-2">Add movies you want to watch later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlistMovies.map((movie) => (
            <MovieCard key={movie.imdbId} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
