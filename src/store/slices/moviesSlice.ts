import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { movieAPI } from '../../services/api';

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

export interface MoviesState {
  movies: Movie[];
  currentMovie: Movie | null;
  genres: Array<{ id: number; name: string }>;
  availableYears: number[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  filters: {
    year?: string;
    genre?: string;
    search?: string;
    sort?: string;
  };
}

const initialState: MoviesState = {
  movies: [],
  currentMovie: null,
  genres: [],
  availableYears: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 50,
    total: 0,
  },
  filters: {
    year: undefined,
    genre: undefined,
    search: undefined,
    sort: 'asc',
  },
};

// Async thunks
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params: { page?: number; year?: string; genre?: string; search?: string } = {}) => {
    const response = await movieAPI.getAllMovies(params);
    return response;
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId: string) => {
    const response = await movieAPI.getMovieById(movieId);
    return response;
  }
);

export const fetchMoviesByYear = createAsyncThunk(
  'movies/fetchMoviesByYear',
  async (params: { year: string; page?: number; sort?: string }) => {
    const response = await movieAPI.getMoviesByYear(params.year, params.page, params.sort);
    return response;
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchMoviesByGenre',
  async (params: { genre: string; page?: number }) => {
    const response = await movieAPI.getMoviesByGenre(params.genre, params.page);
    return response;
  }
);

export const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async () => {
    const response = await movieAPI.getGenres();
    return response;
  }
);

export const fetchAvailableYears = createAsyncThunk(
  'movies/fetchAvailableYears',
  async () => {
    const response = await movieAPI.getAvailableYears();
    return response;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (params: { query: string; page?: number }) => {
    const response = await movieAPI.searchMovies(params.query, params.page);
    return response;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<MoviesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        year: undefined,
        genre: undefined,
        search: undefined,
        sort: 'asc',
      };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      })
      // Fetch movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie';
      })
      // Fetch movies by year
      .addCase(fetchMoviesByYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByYear.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMoviesByYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies by year';
      })
      // Fetch movies by genre
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies by genre';
      })
      // Fetch genres
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch genres';
      })
      // Fetch available years
      .addCase(fetchAvailableYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableYears.fulfilled, (state, action) => {
        state.loading = false;
        state.availableYears = action.payload;
      })
      .addCase(fetchAvailableYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch available years';
      })
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search movies';
      });
  },
});

export const { setFilters, clearFilters, setPage, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
