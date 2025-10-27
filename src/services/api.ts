import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface Movie {
  imdbId: string;
  title: string;
  genres: Array<{ id: number; name: string }>;
  releaseDate: string;
  budget: string;
  description?: string;
  runtime?: string;
  averageRating?: number;
  originalLanguage?: string;
  productionCompanies?: Array<{ id: number; name: string }>;
  ratings?: Array<{ source: string; rating: string | number }>;
}

export interface MoviesResponse {
  movies: Movie[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    year?: string;
    genre?: string;
    sort?: string;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export const movieAPI = {
  // Get all movies with pagination and filters
  getAllMovies: async (params: {
    page?: number;
    year?: string;
    genre?: string;
    search?: string;
  } = {}): Promise<MoviesResponse> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.year) queryParams.append('year', params.year);
    if (params.genre) queryParams.append('genre', params.genre);
    if (params.search) queryParams.append('search', params.search);

    const response = await api.get(`/movies/all?${queryParams.toString()}`);
    return response.data;
  },

  // Get movie by ID
  getMovieById: async (movieId: string): Promise<Movie> => {
    const response = await api.get(`/movies/${movieId}`);
    return response.data;
  },

  // Get movies by year
  getMoviesByYear: async (year: string, page?: number, sort?: string): Promise<MoviesResponse> => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());
    if (sort) queryParams.append('sort', sort);

    const response = await api.get(`/movies/year/${year}?${queryParams.toString()}`);
    return response.data;
  },

  // Get movies by genre
  getMoviesByGenre: async (genre: string, page?: number): Promise<MoviesResponse> => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page.toString());

    const response = await api.get(`/movies/genre/${genre}?${queryParams.toString()}`);
    return response.data;
  },

  // Search movies
  searchMovies: async (query: string, page?: number): Promise<MoviesResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('q', query);
    if (page) queryParams.append('page', page.toString());

    const response = await api.get(`/movies/search?${queryParams.toString()}`);
    return response.data;
  },

  // Get available years
  getAvailableYears: async (): Promise<number[]> => {
    const response = await api.get('/years/all');
    return response.data.years; // Extract the years array from the response
  },

  // Get all genres
  getGenres: async (): Promise<Genre[]> => {
    const response = await api.get('/genres/all');
    return response.data;
  },

  // Get movie ratings
  getMovieRatings: async (movieId: string) => {
    const response = await api.get(`/ratings/${movieId}`);
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<string> => {
    const response = await api.get('/heartbeat');
    return response.data;
  },
};

// TMDB API for movie posters
const TMDB_API_KEY = 'your_tmdb_api_key_here'; // You'll need to get this from TMDB
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbAPI = {
  // Get movie poster URL
  getMoviePoster: (imdbId: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    // For now, return a placeholder. In production, you'd make an API call to TMDB
    // to get the actual poster URL based on the IMDB ID
    return `https://via.placeholder.com/500x750/1f2937/ffffff?text=${encodeURIComponent('Movie Poster')}`;
  },

  // Search for movie by IMDB ID to get TMDB ID
  searchByImdbId: async (imdbId: string) => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/find/${imdbId}`, {
        params: {
          api_key: TMDB_API_KEY,
          external_source: 'imdb_id',
        },
      });
      return response.data;
    } catch (error) {
      console.error('TMDB API Error:', error);
      return null;
    }
  },
};

export default api;
