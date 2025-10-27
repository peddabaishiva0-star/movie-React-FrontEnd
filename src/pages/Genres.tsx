import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchGenres } from '../store/slices/moviesSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { TagIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const Genres: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movies: genres, loading } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Movie Genres</h1>
        <p className="text-gray-600">
          Explore movies by genre
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre: any) => (
            <Link
              key={genre.id}
              to={`/movies/genre/${genre.name}`}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <TagIcon className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">{genre.name}</div>
                <div className="text-sm text-gray-500">View movies</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Genres;
