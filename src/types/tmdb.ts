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
  genre_ids: number[] | [];
  genres: number[] | [] | DetailedGenres[];
  backdrop_path: string | null;
  id: number;
  first_air_date: string;
  origin_country: string[];
  name: string;
  media_type: string | null;
}
export interface DetailedGenres {
  id: number;
  name: string;
}

export interface Endpoint {
  endpoint: string;
  context: string;
  title: string;
}

export type Genre = { id: number; name: string };

export interface CastDetails {
  character: string;
  id: number;
  name: string;
  profile_path: string | null;
  media_type: "tv" | "movie" | null;
  poster_path: string;
  genre_ids: number[];
}

export interface CrewDetails extends CastDetails {
  job: string;
}

export interface Credits {
  cast: CastDetails[];
  crew: CrewDetails[];
}
export interface MovieDetails extends MovieRusult {
  credits: Credits;
  tagline: string;
  budget: number;
  created_by: CrewDetails[];
  revenue: number;
  runtime: number;
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number;
  images: {
    backdrops: [{ file_path: string }];
  };
  similar: {
    results: MovieRusult[];
  };
  videos: {
    results: Video[];
  };
  release_dates: {
    results: AdultRating[];
  };
}

export interface AdultRating {
  iso_3166_1: string;
  release_dates: [{ certification: string }];
}

export interface Video {
  key: string;
  type: string;
  id: string;
  site: string;
  name: string;
}

export interface CombinedCreditsObj extends MovieRusult {
  character: string;
  department: string;
}

export interface CombinedCredits {
  cast: CombinedCreditsObj[];
  crew: CombinedCreditsObj[];
}

export interface PersonDetails {
  id: string;
  profile_path: string;
  birthday: string;
  name: string;
  known_for_department: string;
  gender: string;
  deathday: string | null;
  biography: string | null;
  place_of_birth: string;
  combined_credits: CombinedCredits;
  media_type: string | null;
  images: {
    profiles: [{ file_path: string }];
  };
}

export type MultiSearchResult = MovieRusult | PersonDetails;

export interface MultiSearchResponse {
  page: number;
  results: MultiSearchResult[];
  total_results: number;
  total_pages: number;
}

export type MovieWithTrailer = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  trailer: Video | null;
};
