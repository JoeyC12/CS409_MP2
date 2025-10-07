import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TMDBService } from '../services/tmdbService';
import { Movie, SortOption, SortOrder } from '../types/movie';
import { getImageUrl } from '../services/tmdbService';
import './Search.css';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('vote_average');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search movies function
  const searchMovies = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await TMDBService.searchMovies({
        query: searchQuery,
        page: page,
      });
      
      setMovies(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to search movies');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounced search
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        searchMovies(value);
      } else {
        setMovies([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  // Sort movies
  const sortMovies = (movies: Movie[], sortBy: SortOption, order: SortOrder): Movie[] => {
    return [...movies].sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'release_date':
          aValue = new Date(a.release_date).getTime();
          bValue = new Date(b.release_date).getTime();
          break;
        case 'vote_average':
          aValue = a.vote_average;
          bValue = b.vote_average;
          break;
        case 'popularity':
          aValue = a.popularity;
          bValue = b.popularity;
          break;
        default:
          return 0;
      }
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Handle sort change
  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
  };

  // Handle order change
  const handleOrderChange = (newOrder: SortOrder) => {
    setSortOrder(newOrder);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (query.trim()) {
      searchMovies(query, page);
    }
  };

  // Get sorted movies
  const sortedMovies = sortMovies(movies, sortBy, sortOrder);

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search Movies</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      {query && (
        <div className="search-controls">
        <div className="sort-controls">
          <div className="sort-section">
            <h4>Sort Movies By:</h4>
            <div className="sort-options">
              <label className="sort-option">
                <input
                  type="radio"
                  name="sortBy"
                  value="vote_average"
                  checked={sortBy === 'vote_average'}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                />
                <span>Rating</span>
              </label>
              
              <label className="sort-option">
                <input
                  type="radio"
                  name="sortBy"
                  value="release_date"
                  checked={sortBy === 'release_date'}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                />
                <span>Release Year</span>
              </label>
              
              <label className="sort-option">
                <input
                  type="radio"
                  name="sortBy"
                  value="title"
                  checked={sortBy === 'title'}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                />
                <span>Title</span>
              </label>
              
              <label className="sort-option">
                <input
                  type="radio"
                  name="sortBy"
                  value="popularity"
                  checked={sortBy === 'popularity'}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                />
                <span>Popularity</span>
              </label>
            </div>
          </div>
          
          <div className="order-section">
            <h4>Sort Order:</h4>
            <div className="order-options">
              <label className="order-option">
                <input
                  type="radio"
                  name="sortOrder"
                  value="desc"
                  checked={sortOrder === 'desc'}
                  onChange={(e) => handleOrderChange(e.target.value as SortOrder)}
                />
                <span>Descending</span>
              </label>
              
              <label className="order-option">
                <input
                  type="radio"
                  name="sortOrder"
                  value="asc"
                  checked={sortOrder === 'asc'}
                  onChange={(e) => handleOrderChange(e.target.value as SortOrder)}
                />
                <span>Ascending</span>
              </label>
            </div>
          </div>
        </div>
        </div>
      )}

      {loading && (
        <div className="loading">Searching movies...</div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {query && !loading && sortedMovies.length === 0 && (
        <div className="no-results">
          No movies found for "{query}"
        </div>
      )}

      {sortedMovies.length > 0 && (
        <>
          <div className="results-info">
            <p>Found {movies.length} movies for "{query}"</p>
          </div>
          
          <div className="movies-grid">
            {sortedMovies.map((movie) => (
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
                      ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                    <p className="movie-overview">
                      {movie.overview.substring(0, 100)}...
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
