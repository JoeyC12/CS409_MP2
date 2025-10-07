import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TMDBService } from '../services/tmdbService';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/tmdbService';
import './Home.css';

const Home: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [popularResponse, topRatedResponse] = await Promise.all([
          TMDBService.getPopularMovies(1),
          TMDBService.getTopRatedMovies(1)
        ]);
        
        setPopularMovies(popularResponse.results.slice(0, 6));
        setTopRatedMovies(topRatedResponse.results.slice(0, 6));
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MovieDB</h1>
          <p>Discover amazing movies and explore the world of cinema</p>
          <div className="hero-buttons">
            <Link to="/search" className="btn btn-primary">
              Search Movies
            </Link>
            <Link to="/gallery" className="btn btn-secondary">
              Browse Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="movies-section">
        <div className="section-header">
          <h2>Popular Movies</h2>
        </div>
        <div className="movies-grid">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={getImageUrl(movie.poster_path, 'w342')}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                  <div className="movie-rating">
                    {movie.vote_average.toFixed(1)} / 10
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Movies Section */}
      <section className="movies-section">
        <div className="section-header">
          <h2>Top Rated Movies</h2>
        </div>
        <div className="movies-grid">
          {topRatedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={getImageUrl(movie.poster_path, 'w342')}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-year">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                  <div className="movie-rating">
                    {movie.vote_average.toFixed(1)} / 10
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
