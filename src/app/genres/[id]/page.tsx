import { searchFilms } from "@/api/tmdb/searchFilms";
import Container from "@/components/Container/Container";
import { NotFound } from "@/components/NotFound/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import Section from "@/components/Section/Section";
import { SITE_NAME } from "@/constants/names";
import React from "react";

type GenresProps = {
  searchParams: { s?: string; p?: string };
};

export async function generateMetadata(searchParams: GenresProps) {
  const title = searchParams.searchParams.s
    ? `Поиск: "${searchParams.searchParams.s?.replaceAll("+", " ")}"${
        searchParams.searchParams.p
          ? ` – Страница ${searchParams.searchParams.p}`
          : ""
      } | ${SITE_NAME}`
    : `Поиск фильмов и сериалов | ${SITE_NAME}`;
  const description = `Ищите сериалы быстро и удобно! Наш сервис использует TMDB API, чтобы предоставить актуальные данные о сериалах, трейлерах и описаниях.`;

  return {
    title,
    description,
  };
}

const GenresPage = async ({ searchParams }: GenresProps) => {
  const films = await searchFilms({
    params: {
      query: searchParams.s,
      page: searchParams.p,
    },
  });
  if (!films) {
    return <NotFound type="SEARCH" />;
  }
  return (
    <div>
      <Container>
        <Section
          title={`Поиск по "${searchParams.s?.replaceAll("+", " ")}"`}
          subtitle={`Страница ${searchParams.p || 1} из ${films.total_pages}`}
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
            getPageLink={(page) => `/genres/1?p=${page}&s=${searchParams.s}`}
          />
        </Section>
      </Container>
    </div>
  );
};

export default GenresPage;
