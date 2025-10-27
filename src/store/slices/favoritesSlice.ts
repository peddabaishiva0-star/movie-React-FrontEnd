import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './moviesSlice';

export interface FavoritesState {
  favorites: string[]; // Array of movie IDs
  watchlist: string[]; // Array of movie IDs
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    addToWatchlist: (state, action: PayloadAction<string>) => {
      if (!state.watchlist.includes(action.payload)) {
        state.watchlist.push(action.payload);
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(id => id !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    },
    toggleWatchlist: (state, action: PayloadAction<string>) => {
      const index = state.watchlist.indexOf(action.payload);
      if (index > -1) {
        state.watchlist.splice(index, 1);
      } else {
        state.watchlist.push(action.payload);
      }
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('favorites');
    },
    clearWatchlist: (state) => {
      state.watchlist = [];
      localStorage.removeItem('watchlist');
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  addToWatchlist,
  removeFromWatchlist,
  toggleWatchlist,
  clearFavorites,
  clearWatchlist,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
