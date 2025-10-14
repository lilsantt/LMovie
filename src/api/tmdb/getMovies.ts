import { Endpoint, PopularMoviesResponse } from "@/types/tmdb";
import { TMDB_BASE_URL } from "@/utils/axiosClient";
import { handleAxiosError } from "@/utils/handleAxiosError";

type GetMoviesOptions = {
  endpoint: Endpoint;
  params?: Record<string, string | number | boolean | undefined>;
  count?: number;
};

export async function getMovies({
  endpoint,
  params = {},
  count = 6,
}: GetMoviesOptions): Promise<PopularMoviesResponse | null> {
  try {
    const query = new URLSearchParams({
      include_adult: "false",
      include_video: "false",
      language: "ru",
      page: "1",
      sort_by: "popularity.desc",
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    });

    const res = await fetch(
      `${TMDB_BASE_URL}/${endpoint.endpoint}?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
          accept: "application/json",
        },
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();
    const results = data?.results?.length ? data.results.slice(0, count) : [];
    return { ...data, results };
  } catch (error) {
    handleAxiosError(error, endpoint.context);
    return null;
  }
}
