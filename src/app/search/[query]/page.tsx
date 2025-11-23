import { searchFilms } from "@/api/tmdb/searchFilms";
import { NotFoundInfo } from "@/components/layout/NotFound/NotFoundInfo";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchList from "@/components/search/SearchList/SearchList";
import Section from "@/components/ui/Section/Section";
import { METADATA } from "@/constants/metadata";
import React from "react";

type SearchParams = {
  s?: string;
  p?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  const title = resolvedParams.s
    ? `Поиск: "${resolvedParams.s?.replaceAll("+", " ")}"${
        resolvedParams.p ? ` – Страница ${resolvedParams.p}` : ""
      } | ${METADATA.siteName}`
    : `Поиск фильмов и сериалов | ${METADATA.siteName}`;

  const description = `Ищите сериалы быстро и удобно! Наш сервис использует TMDB API, чтобы предоставить актуальные данные о сериалах, трейлерах и описаниях.`;

  return {
    title,
    description,
  };
}

const GenresPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;

  const films = await searchFilms({
    params: {
      query: resolvedParams.s,
      page: resolvedParams.p || 1,
    },
  });
  if (!films) return <NotFoundInfo type="SEARCH" />;

  return (
    <div>
      <div style={{ paddingTop: "16px" }}>
        <Section
          title={`Поиск по "${resolvedParams.s
            ?.replaceAll("+", " ")
            .slice(0, 20)}"`}
          subtitle={`Страница ${resolvedParams.p || 1} из ${films.total_pages}`}
        >
          {films?.results.length > 0 ? (
            <SearchList items={films?.results} />
          ) : (
            <span>Ничего не найдено</span>
          )}
        </Section>
      </div>
      <Section>
        <Pagination
          currentPage={films.page}
          totalPages={films.total_pages}
          getPageLink={(page) => `/search/1?p=${page}&s=${resolvedParams.s}`}
        />
      </Section>
    </div>
  );
};

export default GenresPage;
