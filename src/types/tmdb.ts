export interface PopularMoviesResponse {
  page: number;
  results: MovieRusult[];
  total_pages: number;
  total_results: number;
}

export interface MovieRusult {
  overview: string;
  poster_path: string | null;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string | null;
  id: number;
}
