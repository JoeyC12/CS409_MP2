// Movie types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
}

// Movie details (extended movie info)
export interface MovieDetails extends Movie {
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

// Genre type
export interface Genre {
  id: number;
  name: string;
}

// Production company type
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

// Production country type
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Spoken language type
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// API response types
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Search parameters
export interface SearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
}

// Sort options
export type SortOption = 'title' | 'release_date' | 'vote_average' | 'popularity';
export type SortOrder = 'asc' | 'desc';

// Filter options
export interface FilterOptions {
  genres: number[];
  yearRange: [number, number];
  ratingRange: [number, number];
}
