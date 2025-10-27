import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleFavorite, toggleWatchlist } from '../../store/slices/favoritesSlice';
import { Movie } from '../../store/slices/moviesSlice';
import { 
  HeartIcon, 
  BookmarkIcon, 
  StarIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const { favorites, watchlist } = useAppSelector((state) => state.favorites);

  const isFavorite = favorites.includes(movie.imdbId);
  const isInWatchlist = watchlist.includes(movie.imdbId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(movie.imdbId));
  };

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWatchlist(movie.imdbId));
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).getFullYear();
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
    <Link
      to={`/movies/${movie.imdbId}`}
      className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-105"
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] bg-gray-200 overflow-hidden">
        <img
          src={`https://via.placeholder.com/300x450/1f2937/ffffff?text=${encodeURIComponent(movie.title)}`}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <HeartSolidIcon className="h-4 w-4" />
            ) : (
              <HeartIcon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={handleToggleWatchlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isInWatchlist 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white'
            }`}
            title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {isInWatchlist ? (
              <BookmarkSolidIcon className="h-4 w-4" />
            ) : (
              <BookmarkIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Rating Badge */}
        {movie.averageRating && (
          <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
            <StarIcon className="inline h-3 w-3 mr-1" />
            {movie.averageRating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <CalendarIcon className="h-3 w-3 mr-1" />
          {formatDate(movie.releaseDate)}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-2">
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
            >
              {genre.name}
            </span>
          ))}
          {movie.genres.length > 2 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              +{movie.genres.length - 2}
            </span>
          )}
        </div>

        {/* Budget */}
        {movie.budget && movie.budget !== 'N/A' && (
          <div className="text-xs text-gray-500">
            Budget: {movie.budget}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
