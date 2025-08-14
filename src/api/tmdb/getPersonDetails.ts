import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { Genre, MovieDetails, PersonDetails } from "@/types/tmdb";
import { TMDB_BASE_URL } from "@/utils/axiosClient";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";

export async function getPersonDetails(
  id: string
): Promise<PersonDetails | null> {
  try {
    const url = new URL(`${TMDB_BASE_URL}/person/${id}`);
    url.searchParams.set("language", "ru-RU");
    url.searchParams.set("append_to_response", "combined_credits,images");
    // url.searchParams.append("append_to_response", "images");

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
    console.error("Ошибка получения деталей человека:", error);
    return null;
  }
}
