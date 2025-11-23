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
    title: `Популярные сериалы - Страница ${resolvedParams.p || 1}`,
    description: `Лучшие сериалы прямо сейчас. Откройте для себя топовые телешоу на ${METADATA.siteName}: драмы, комедии и новинки.`,
  };
}

const TVTrendingPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;

  const movies = await getMovies({
    params: { page: resolvedParams.p || 1 },
    endpoint: TMDB_ENDPOINTS.TRENDING_TV_SHOWS,
  });

  if (!movies) return <NotFoundInfo type="TV" />;

  return (
    <div>
      <Section
        title="Популярные сериалы"
        subtitle={`Страница ${movies.page} из ${MAX_PAGE_COUNT}`}
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
