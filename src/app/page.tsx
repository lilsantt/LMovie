import { About } from "@/components/layout/About/About";
import Films from "@/components/films-list/Films/FilmsList";
import PopularFilmList from "@/components/popular-films/PopularFilmList/PopularFilmList";
import Section from "@/components/ui/Section/Section";
import UpcomingTrailers from "@/components/trailer/UpcomingTrailers/UpcomingTrailers";
import { getHomeData } from "@/utils/getHomeData";

export default async function Home() {
  const { popularMovies, trendingTV, upcomingTrailers } = await getHomeData();
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
