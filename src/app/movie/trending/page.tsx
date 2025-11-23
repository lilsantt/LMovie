import { getMovies } from "@/api/tmdb/getMovies";
import { NotFoundInfo } from "@/components/layout/NotFound/NotFoundInfo";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchList from "@/components/search/SearchList/SearchList";
import Section from "@/components/ui/Section/Section";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { MAX_PAGE_COUNT } from "@/constants/constants";
import { METADATA } from "@/constants/metadata";
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
    description: `Смотрите самые популярные фильмы на ${METADATA.siteName}. Новинки, рейтинговые хиты и лучшие киноленты недели.`,
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
        subtitle={`Страница ${movies.page || 1} из ${MAX_PAGE_COUNT}`}
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
