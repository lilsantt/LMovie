import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { MultiSearchResponse } from "@/types/tmdb";
import { TMDB_BASE_URL } from "@/utils/axiosClient";
import { handleAxiosError } from "@/utils/handleAxiosError";
import axios from "axios";

type SearchOptions = {
  params?: Record<string, string | number | boolean | undefined>;
};

export async function searchFilms({
  params,
}: SearchOptions): Promise<MultiSearchResponse | null> {
  try {
    const res = await axios.get(
      `${TMDB_BASE_URL}/${TMDB_ENDPOINTS.SEARCH.endpoint}`,
      {
        params: {
          language: "ru-RU",
          ...params,
        },
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          Accept: "accept: application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    handleAxiosError(error, TMDB_ENDPOINTS.SEARCH.context);
    return null;
  }
}
