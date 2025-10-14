import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { MovieWithTrailer, Video } from "@/types/tmdb";
import { TMDB_BASE_URL } from "@/utils/axiosClient";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";

export async function getUpcomingMoviesWithTrailers(
  limit = 6
): Promise<MovieWithTrailer[]> {
  const collected: MovieWithTrailer[] = [];
  const today = new Date().toISOString().split("T")[0];

  let page = 1;
  const maxPages = 5;

  try {
    while (collected.length < limit && page <= maxPages) {
      const discoverRes = await axios.get(
        `${TMDB_BASE_URL}/${TMDB_ENDPOINTS.DISCOVER_MOVIE.endpoint}`,
        {
          params: {
            language: "ru-RU",
            sort_by: "popularity.desc",
            "primary_release_date.gte": today,
            with_release_type: "2|3",
            region: "RU",
            page,
          },
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          },
        }
      );

      const movies = discoverRes.data.results;

      for (const movie of movies) {
        if (collected.length >= limit) break;

        try {
          const videosRes = await axios.get(
            `${TMDB_BASE_URL}/movie/${movie.id}/videos`,
            {
              params: {
                language: "ru-RU",
              },
              headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
              },
            }
          );

          const trailers: Video[] = videosRes.data.results;
          const trailer = trailers.find(
            (v) => v.type === "Trailer" && v.site === "YouTube" && !!v.key
          );

          if (trailer) {
            collected.push({
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              trailer,
            });
          }
        } catch {}
      }

      page++;
    }

    return collected;
  } catch (error) {
    handleAxiosError(
      error,
      "При получении последних трейлеров getUpcomingMovieTrailers"
    );
    return [];
  }
}
