import { PopularMoviesResponse } from "@/types/tmdb";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";

export async function getPopularMovies(): Promise<PopularMoviesResponse | null> {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          accept: "application/json",
        },
        params: {
          include_adult: false,
          include_video: false,
          language: "ru",
          page: 1,
          sort_by: "popularity.desc",
        },
      }
    );

    return response.data;
  } catch (error) {
    handleAxiosError(
      error,
      "при получении популярных фильмов getPopularMovies"
    );
    return null;
  }
}
