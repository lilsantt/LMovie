import { getMovies } from "@/api/tmdb/getMovies";
import { getUpcomingMoviesWithTrailers } from "@/api/tmdb/getUpcomingMovieTrailers";
import { About } from "@/components/About/About";
import Films from "@/components/Films/FilmsList";
import PopularFilmList from "@/components/PopularFilmList/PopularFilmList";
import Section from "@/components/Section/Section";
import UpcomingTrailers from "@/components/UpcomingTrailers/UpcomingTrailers";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";

export default async function Home() {
  const [popularMovies, trendingTV, upcomingTrailers] = await Promise.all([
    getMovies({
      count: 10,
      endpoint: TMDB_ENDPOINTS.POPULAR_MOVIES,
    }),
    getMovies({
      count: 10,
      endpoint: TMDB_ENDPOINTS.TRENDING_TV_SHOWS,
    }),
    getUpcomingMoviesWithTrailers(4),
  ]);

  return (
    <div>
      {popularMovies && <PopularFilmList movies={popularMovies.results} />}
      <Section>
        <About />
      </Section>
      {trendingTV && (
        <Section
          title="Популярные сериалы"
          link="tv/trending"
          linkTitle="Посмотреть все"
        >
          <Films films={trendingTV.results} type="tv" />
        </Section>
      )}
      {popularMovies && (
        <Section
          title="Популярные фильмы"
          link="movie/trending"
          linkTitle="Посмотреть все"
        >
          <Films films={popularMovies.results} type="movie" />
        </Section>
      )}
      {upcomingTrailers && (
        <Section title="Последние трейлеры">
          <UpcomingTrailers trailers={upcomingTrailers} />
        </Section>
      )}
    </div>
  );
}
