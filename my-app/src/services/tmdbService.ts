import axios from 'axios';
import { TMDB_CONFIG, TMDB_ENDPOINTS } from '../config/tmdb';
import { Movie, MovieDetails, TMDBResponse, SearchParams, Genre } from '../types/movie';

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: TMDB_CONFIG.BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_CONFIG.ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// API service class
export class TMDBService {
  // Search movies
  static async searchMovies(params: SearchParams): Promise<TMDBResponse<Movie>> {
    try {
      const response = await tmdbApi.get(TMDB_ENDPOINTS.SEARCH_MOVIES, {
        params: {
          query: params.query,
          page: params.page || 1,
          include_adult: params.include_adult || false,
          year: params.year,
          primary_release_year: params.primary_release_year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  }

  // Get popular movies
  static async getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    try {
      const response = await tmdbApi.get(TMDB_ENDPOINTS.POPULAR_MOVIES, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  // Get top rated movies
  static async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    try {
      const response = await tmdbApi.get(TMDB_ENDPOINTS.TOP_RATED_MOVIES, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  }

  // Get movie details
  static async getMovieDetails(movieId: number): Promise<MovieDetails> {
    try {
      const response = await tmdbApi.get(`${TMDB_ENDPOINTS.MOVIE_DETAILS}/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  // Get genres
  static async getGenres(): Promise<{ genres: Genre[] }> {
    try {
      const response = await tmdbApi.get(TMDB_ENDPOINTS.GENRES);
      return response.data;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  }

  // Get configuration (for image URLs)
  static async getConfiguration(): Promise<any> {
    try {
      const response = await tmdbApi.get(TMDB_ENDPOINTS.CONFIGURATION);
      return response.data;
    } catch (error) {
      console.error('Error fetching configuration:', error);
      throw error;
    }
  }
}

// Utility functions
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
