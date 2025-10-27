import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMoviesByYear, setPage } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard/MovieCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Pagination from '../components/UI/Pagination';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const MoviesByYear: React.FC = () => {
  const { year } = useParams<{ year: string }>();
  const dispatch = useAppDispatch();
  const { movies, loading, pagination } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (year) {
      dispatch(fetchMoviesByYear({ 
        year, 
        page: pagination.page,
        sort: 'asc'
      }));
    }
  }, [dispatch, year, pagination.page]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Movies from {year}
        </h1>
        <p className="text-gray-600">
          Showing {movies.length} of {pagination.total} movies
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No movies found for {year}</div>
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

export default MoviesByYear;
