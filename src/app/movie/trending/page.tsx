import { getMovies } from "@/api/tmdb/getMovies";
import { NotFound } from "@/components/NotFound/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import Section from "@/components/Section/Section";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { SITE_NAME } from "@/constants/names";
import React from "react";

type MovieTrendingPageProps = {
  searchParams: { s?: string; p?: string };
};

export async function generateMetadata({
  searchParams,
}: MovieTrendingPageProps) {
  return {
    title: `Популярные фильмы - Страница ${searchParams.p || 1}`,
    description: `Смотрите самые популярные фильмы на ${SITE_NAME}. Новинки, рейтинговые хиты и лучшие киноленты недели.`,
  };
}

const MovieTrending = async ({ searchParams }: MovieTrendingPageProps) => {
  const movies = await getMovies({
    params: { page: searchParams.p || 1 },
    endpoint: TMDB_ENDPOINTS.POPULAR_MOVIES,
  });
  if (!movies) return <NotFound type="FILMS" />;
  return (
    <div>
      <Section
        title="Популярные фильмы"
        subtitle={`Страница ${movies.page || 1} из ${movies.total_pages || 1}`}
      >
        <SearchList items={movies.results} checkType />
      </Section>
      <Pagination
        currentPage={movies.page}
        totalPages={movies.total_pages}
        getPageLink={(page) => `/movie/trending?p=${page}`}
      />
    </div>
  );
};

export default MovieTrending;
