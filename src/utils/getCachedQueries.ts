import { getMovieDetails } from "@/api/tmdb/getMovieDetails";
import { getPersonDetails } from "@/api/tmdb/getPersonDetails";
import { MovieDetails, PersonDetails } from "@/types/tmdb";
import { cache } from "react";

export const getCachedPersonDetails = cache(
  async (id: string): Promise<PersonDetails | null> => {
    return await getPersonDetails(id);
  }
);
export const getCachedMovieDetails = cache(
  async (id: string, type: "movie" | "tv"): Promise<MovieDetails | null> => {
    return await getMovieDetails(id, type);
  }
);
