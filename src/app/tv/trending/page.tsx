import { getMovies } from "@/api/tmdb/getMovies";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import Section from "@/components/Section/Section";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
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
    title: `Популярные сериалы - Страница ${resolvedParams.p || 1}`,
    description: `Лучшие сериалы прямо сейчас. Откройте для себя топовые телешоу на ${SITE_NAME}: драмы, комедии и новинки.`,
  };
}

const TVTrendingPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;

  const movies = await getMovies({
    params: { page: resolvedParams.p || 1 },
    endpoint: TMDB_ENDPOINTS.TRENDING_TV_SHOWS,
  });

  if (!movies) return;

  return (
    <div>
      <Section
        title="Популярные сериалы"
        subtitle={`Страница ${movies.page} из ${movies.total_pages}`}
      >
        <SearchList items={movies.results} checkType type="tv" />
      </Section>
      <Pagination
        currentPage={movies.page}
        totalPages={movies.total_pages}
        getPageLink={(page) => `/tv/trending?p=${page}`}
      />
    </div>
  );
};

export default TVTrendingPage;
