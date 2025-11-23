import { getMovies } from "@/api/tmdb/getMovies";
import { getUpcomingMoviesWithTrailers } from "@/api/tmdb/getUpcomingMovieTrailers";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { ITEMS_PER_SLIDER, TRAILERS_PER_PAGE } from "@/constants/constants";

export const getHomeData = async () => {
  const [popularMovies, trendingTV, upcomingTrailers] = await Promise.all([
    getMovies({
      count: ITEMS_PER_SLIDER,
      endpoint: TMDB_ENDPOINTS.POPULAR_MOVIES,
    }),
    getMovies({
      count: ITEMS_PER_SLIDER,
      endpoint: TMDB_ENDPOINTS.TRENDING_TV_SHOWS,
    }),
    getUpcomingMoviesWithTrailers(TRAILERS_PER_PAGE),
  ]);

  return { popularMovies, trendingTV, upcomingTrailers };
};
