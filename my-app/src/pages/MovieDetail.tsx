import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TMDBService } from '../services/tmdbService';
import { MovieDetails } from '../types/movie';
import { getImageUrl, formatDate, formatRuntime } from '../services/tmdbService';
import './MovieDetail.css';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const movieDetails = await TMDBService.getMovieDetails(parseInt(id));
        setMovie(movieDetails);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handlePrevious = () => {
    if (movie && movie.id > 1) {
      navigate(`/movie/${movie.id - 1}`);
    }
  };

  const handleNext = () => {
    if (movie) {
      navigate(`/movie/${movie.id + 1}`);
    }
  };

  if (loading) {
    return (
      <div className="movie-detail-container">
        <div className="loading">Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail-container">
        <div className="error">{error || 'Movie not found'}</div>
      </div>
    );
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail">
        <div className="movie-poster-section">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="movie-poster-large"
          />
        </div>

        <div className="movie-info-section">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
          
          <div className="movie-meta">
            <div className="meta-item">
              <strong>Release Date:</strong> {formatDate(movie.release_date)}
            </div>
            <div className="meta-item">
              <strong>Runtime:</strong> {formatRuntime(movie.runtime)}
            </div>
            <div className="meta-item">
              <strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10
            </div>
            <div className="meta-item">
              <strong>Status:</strong> {movie.status}
            </div>
          </div>

          <div className="movie-genres">
            <strong>Genres:</strong>
            <div className="genre-tags">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="movie-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>

          {movie.production_companies.length > 0 && (
            <div className="production-companies">
              <h3>Production Companies</h3>
              <div className="companies-list">
                {movie.production_companies.map(company => (
                  <div key={company.id} className="company-item">
                    {company.logo_path && (
                      <img
                        src={getImageUrl(company.logo_path, 'w92')}
                        alt={company.name}
                        className="company-logo"
                      />
                    )}
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="navigation-buttons">
            <button
              onClick={handlePrevious}
              className="nav-btn prev-btn"
              disabled={movie.id <= 1}
            >
              ← Previous
            </button>
            <button
              onClick={() => navigate('/')}
              className="nav-btn home-btn"
            >
              Home
            </button>
            <button
              onClick={handleNext}
              className="nav-btn next-btn"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {movie.backdrop_path && (
        <div 
          className="movie-backdrop"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`
          }}
        />
      )}
    </div>
  );
};

export default MovieDetail;
