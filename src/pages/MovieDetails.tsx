import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchMovieById } from '../store/slices/moviesSlice';
import { toggleFavorite, toggleWatchlist } from '../store/slices/favoritesSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { 
  ArrowLeftIcon,
  HeartIcon,
  BookmarkIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  LanguageIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { currentMovie, loading, error } = useAppSelector((state) => state.movies);
  const { favorites, watchlist } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [dispatch, id]);

  const isFavorite = currentMovie ? favorites.includes(currentMovie.imdbId) : false;
  const isInWatchlist = currentMovie ? watchlist.includes(currentMovie.imdbId) : false;

  const handleToggleFavorite = () => {
    if (currentMovie) {
      dispatch(toggleFavorite(currentMovie.imdbId));
    }
  };

  const handleToggleWatchlist = () => {
    if (currentMovie) {
      dispatch(toggleWatchlist(currentMovie.imdbId));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !currentMovie) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Error loading movie</div>
        <p className="text-gray-500 mt-2">{error}</p>
        <button
          onClick={() => navigate('/movies')}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getRatingColor = (rating?: number) => {
    if (!rating) return 'text-gray-400';
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back
      </button>

      {/* Movie Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:flex">
          {/* Movie Poster */}
          <div className="md:w-1/3">
            <img
              src={`https://via.placeholder.com/400x600/1f2937/ffffff?text=${encodeURIComponent(currentMovie.title)}`}
              alt={currentMovie.title}
              className="w-full h-96 md:h-full object-cover"
            />
          </div>

          {/* Movie Info */}
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentMovie.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {formatDate(currentMovie.releaseDate)}
                  </div>
                  {currentMovie.runtime && (
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {currentMovie.runtime}
                    </div>
                  )}
                  <div className="flex items-center">
                    <LanguageIcon className="h-4 w-4 mr-1" />
                    {currentMovie.originalLanguage || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-3 rounded-full transition-colors ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={handleToggleWatchlist}
                  className={`p-3 rounded-full transition-colors ${
                    isInWatchlist 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white'
                  }`}
                  title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                  {isInWatchlist ? (
                    <BookmarkSolidIcon className="h-6 w-6" />
                  ) : (
                    <BookmarkIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <StarIcon className={`h-5 w-5 mr-1 ${getRatingColor(currentMovie.averageRating)}`} />
              <span className={`text-lg font-semibold ${getRatingColor(currentMovie.averageRating)}`}>
                {currentMovie.averageRating ? `${currentMovie.averageRating.toFixed(1)}/10` : 'N/A'}
              </span>
              <span className="text-gray-500 ml-2">Average Rating</span>
            </div>

            {/* Budget */}
            {currentMovie.budget && currentMovie.budget !== 'N/A' && (
              <div className="flex items-center mb-4">
                <CurrencyDollarIcon className="h-5 w-5 text-green-600 mr-1" />
                <span className="text-gray-700">Budget: {currentMovie.budget}</span>
              </div>
            )}

            {/* Genres */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {currentMovie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            {currentMovie.description && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Overview</h3>
                <p className="text-gray-600 leading-relaxed">{currentMovie.description}</p>
              </div>
            )}

            {/* Production Companies */}
            {currentMovie.productionCompanies && currentMovie.productionCompanies.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Production Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {currentMovie.productionCompanies.map((company) => (
                    <span
                      key={company.id}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ratings */}
      {currentMovie.ratings && currentMovie.ratings.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ratings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentMovie.ratings.map((rating, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{rating.source}</span>
                <span className="text-lg font-semibold text-primary-600">
                  {typeof rating.rating === 'number' ? rating.rating.toFixed(1) : rating.rating}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
