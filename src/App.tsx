import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import MoviesByYear from './pages/MoviesByYear';
import MoviesByGenre from './pages/MoviesByGenre';
import Genres from './pages/Genres';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App min-h-screen bg-gray-50">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/movies/year/:year" element={<MoviesByYear />} />
              <Route path="/movies/genre/:genre" element={<MoviesByGenre />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;