import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TMDBService } from '../services/tmdbService';
import { Movie, Genre } from '../types/movie';
import { getImageUrl } from '../services/tmdbService';
import './Gallery.css';

const Gallery: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [moviesResponse, genresResponse] = await Promise.all([
          TMDBService.getPopularMovies(1),
          TMDBService.getGenres()
        ]);
        
        setMovies(moviesResponse.results);
        setGenres(genresResponse.genres);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const filteredMovies = movies.filter(movie => 
    selectedGenres.length === 0 || 
    movie.genre_ids.some(id => selectedGenres.includes(id))
  );

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Movie Gallery</h1>
        <p>Browse movies by genre</p>
      </div>

      <div className="genre-filters">
        <h3>Filter by Genre:</h3>
        <div className="genre-buttons">
          {genres.map(genre => (
            <button
              key={genre.id}
              onClick={() => handleGenreToggle(genre.id)}
              className={`genre-btn ${selectedGenres.includes(genre.id) ? 'active' : ''}`}
            >
              {genre.name}
            </button>
          ))}
        </div>
        {selectedGenres.length > 0 && (
          <button
            onClick={() => setSelectedGenres([])}
            className="clear-filters-btn"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="gallery-info">
        <p>
          Showing {filteredMovies.length} movies
          {selectedGenres.length > 0 && ` in selected genres`}
        </p>
      </div>

      <div className="movies-grid">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-overlay">
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
    </div>
  );
};

export default Gallery;
