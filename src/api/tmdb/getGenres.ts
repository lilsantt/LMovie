import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { Genre } from "@/types/tmdb";
import { TMDB_BASE_URL } from "@/utils/axiosClient";
import { handleAxiosError } from "@/utils/handleAxiosError";

export async function getMovieGenres(): Promise<Genre[] | null> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/${TMDB_ENDPOINTS.MOVIE_GENRES.endpoint}?language=ru-RU`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          accept: "application/json",
        },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) throw new Error("Ошибка получения жанров");

    const data = await res.json();
    return data.genres;
  } catch (error) {
    handleAxiosError(error, TMDB_ENDPOINTS.MOVIE_GENRES.context);
    return null;
  }
}

export async function getTVGenres(): Promise<Genre[] | null> {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/${TMDB_ENDPOINTS.TV_SHOWS_GENRES.endpoint}?language=ru-RU`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          accept: "application/json",
        },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) throw new Error("Ошибка получения жанров");

    const data = await res.json();
    return data.genres;
  } catch (error) {
    handleAxiosError(error, TMDB_ENDPOINTS.TV_SHOWS_GENRES.context);
    return null;
  }
}
