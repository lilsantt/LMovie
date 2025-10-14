import { searchFilms } from "@/api/tmdb/searchFilms";
import Container from "@/components/Container/Container";
import { NotFoundInfo } from "@/components/NotFound/NotFoundInfo";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import Section from "@/components/Section/Section";
import { SITE_NAME } from "@/constants/names";
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
      } | ${SITE_NAME}`
    : `Поиск фильмов и сериалов | ${SITE_NAME}`;

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
      page: resolvedParams.p,
    },
  });

  if (!films) {
    return <NotFoundInfo type="SEARCH" />;
  }

  return (
    <div>
      <Container>
        <Section
          title={`Поиск по "${resolvedParams.s?.replaceAll("+", " ")}"`}
          subtitle={`Страница ${resolvedParams.p || 1} из ${films.total_pages}`}
        >
          {films?.results.length > 0 ? (
            <SearchList items={films?.results} />
          ) : (
            <span>Ничего не найдено</span>
          )}
        </Section>
        <Section>
          <Pagination
            currentPage={films.page}
            totalPages={films.total_pages}
            getPageLink={(page) => `/genres/1?p=${page}&s=${resolvedParams.s}`}
          />
        </Section>
      </Container>
    </div>
  );
};

export default GenresPage;
