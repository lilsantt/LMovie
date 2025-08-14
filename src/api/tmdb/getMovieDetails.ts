import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { Genre, MovieDetails } from "@/types/tmdb";
import { TMDB_BASE_URL } from "@/utils/axiosClient";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";

export async function getMovieDetails(
  id: string,
  type: "tv" | "movie"
): Promise<MovieDetails | null> {
  try {
    const url = new URL(`${TMDB_BASE_URL}/${type}/${id}`);
    url.searchParams.set("language", "ru-RU");
    url.searchParams.set(
      "append_to_response",
      "credits,videos,similar,images,release_dates"
    );
    url.searchParams.set("include_image_language", "en,null");

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Ошибка запроса TMDB");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Ошибка получения деталей фильма:", error);
    return null;
  }
}
