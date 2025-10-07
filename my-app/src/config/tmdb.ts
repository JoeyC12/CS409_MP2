// TMDB API Configuration
export const TMDB_CONFIG = {
  API_KEY: '112d66390b216b300693cf556082843e',
  ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTJkNjYzOTBiMjE2YjMwMDY5M2NmNTU2MDgyODQzZSIsIm5iZiI6MTc1OTY0NzE0Ny4yMiwic3ViIjoiNjhlMjE1YWIxOTI5ODY3ZDVlNjE3NDNjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vF5fbo9Ufl-Sim7phCIPcLFNBmUPoKitXIUB__hLsBA',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
};

// API Endpoints
export const TMDB_ENDPOINTS = {
  SEARCH_MOVIES: '/search/movie',
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED_MOVIES: '/movie/top_rated',
  MOVIE_DETAILS: '/movie',
  GENRES: '/genre/movie/list',
  CONFIGURATION: '/configuration',
};

// Image sizes
export const IMAGE_SIZES = {
  POSTER_SMALL: 'w185',
  POSTER_MEDIUM: 'w342',
  POSTER_LARGE: 'w500',
  BACKDROP_SMALL: 'w300',
  BACKDROP_MEDIUM: 'w780',
  BACKDROP_LARGE: 'w1280',
};
