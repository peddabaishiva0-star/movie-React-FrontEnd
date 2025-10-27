import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import uiReducer from './slices/uiSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    ui: uiReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
