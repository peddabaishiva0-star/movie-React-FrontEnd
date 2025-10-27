import React, { useEffect } from 'react';

import { RootState } from '../store';
import { fetchMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard/MovieCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const { movies, loading } = useAppSelector((state) => state.movies);

  // Filter movies to show only favorites
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.imdbId));

  useEffect(() => {
    if (favorites.length > 0) {
      // Fetch movies for favorite IDs
      dispatch(fetchMovies({}));
    }
  }, [dispatch, favorites]);

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
          <p className="text-gray-600">
            {favorites.length} favorite movie{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : favoriteMovies.length === 0 ? (
        <div className="text-center py-12">
          <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-500 text-lg">No favorite movies yet</div>
          <p className="text-gray-400 mt-2">Start adding movies to your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.imdbId} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
