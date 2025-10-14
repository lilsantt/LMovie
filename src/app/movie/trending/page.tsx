import { getMovies } from "@/api/tmdb/getMovies";
import { NotFoundInfo } from "@/components/NotFound/NotFoundInfo";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import Section from "@/components/Section/Section";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { maxPageCount } from "@/constants/constants";
import { SITE_NAME } from "@/constants/names";
import React from "react";

type SearchParams = {
  p?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  return {
    title: `Популярные фильмы - Страница ${resolvedParams.p || 1}`,
    description: `Смотрите самые популярные фильмы на ${SITE_NAME}. Новинки, рейтинговые хиты и лучшие киноленты недели.`,
  };
}

const MovieTrending = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;

  const movies = await getMovies({
    params: { page: resolvedParams.p || 1 },
    endpoint: TMDB_ENDPOINTS.POPULAR_MOVIES,
  });

  if (!movies) return <NotFoundInfo type="FILMS" />;

  return (
    <div>
      <Section
        title="Популярные фильмы"
        subtitle={`Страница ${movies.page || 1} из ${maxPageCount}`}
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
