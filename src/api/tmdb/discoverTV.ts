import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { PopularMoviesResponse } from "@/types/tmdb";
import { TMDB_BASE_URL } from "@/utils/axiosClient";
import { handleAxiosError } from "@/utils/handleAxiosError";

type SearchOptions = {
  count?: number;
  params?: Record<string, string | number | boolean | undefined>;
};

export async function discoverTVs({
  count,
  params,
}: SearchOptions): Promise<PopularMoviesResponse | null> {
  try {
    const query = new URLSearchParams({
      language: "ru-RU",
      ...Object.fromEntries(
        Object.entries(params || "").map(([k, v]) => [k, String(v)])
      ),
    });

    const url = `${TMDB_BASE_URL}/${
      TMDB_ENDPOINTS.DISCOVER_TV.endpoint
    }?${query.toString()}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("TMDB discoverTV error");

    const data = await res.json();
    const results = count ? data.results.slice(0, count) : data.results;
    return { ...data, results };
  } catch (error) {
    handleAxiosError(error, TMDB_ENDPOINTS.DISCOVER_TV.context);
    return null;
  }
}
