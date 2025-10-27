import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  searchQuery: string;
  selectedYear: string;
  selectedGenre: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  searchQuery: '',
  selectedYear: '',
  selectedGenre: '',
  sortBy: 'asc',
  viewMode: 'grid',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedYear: (state, action: PayloadAction<string>) => {
      state.selectedYear = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedYear = '';
      state.selectedGenre = '';
      state.sortBy = 'asc';
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
  setSearchQuery,
  setSelectedYear,
  setSelectedGenre,
  setSortBy,
  setViewMode,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
