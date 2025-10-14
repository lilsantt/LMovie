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
    const requestParams = {
      language: "ru-RU",
      ...params,
    };

    const res = await axios.get(
      `${TMDB_BASE_URL}/${TMDB_ENDPOINTS.SEARCH.endpoint}`,
      {
        params: requestParams,
        paramsSerializer: {
          encode: (value) => encodeURIComponent(value),
        },
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    handleAxiosError(error, TMDB_ENDPOINTS.SEARCH.context);
    return null;
  }
}
