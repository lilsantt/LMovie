import { getMovieGenres } from "@/api/tmdb/getGenres";
import { getMovies } from "@/api/tmdb/getMovies";
import { searchFilms } from "@/api/tmdb/searchFilms";
import FilterGenre from "@/components/Filters/FilterGenre/FilterGenre";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import Section from "@/components/Section/Section";
import Sidebar from "@/components/Sidebar/Sidebar";
import Accordion from "@/components/ui/Accordion/Accordion";
import SearchTypes from "@/components/ui/SearchTypes/SearchTypes";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import React from "react";

type GenresProps = {
  searchParams: { s?: string; p?: string };
};

const GenresPage = async ({ searchParams }: GenresProps) => {
  const films = await searchFilms({
    params: {
      query: searchParams.s,
      page: searchParams.p,
    },
  });
  if (!films) return;
  console.log(films, searchParams.s);
  return (
    <div>
      <Section
        title={`Поиск по "${searchParams.s}"`}
        subtitle={`Страница ${searchParams.p} из ${films.total_pages}`}
      >
        {films?.results.length > 0 ? (
          <SearchList items={films?.results} />
        ) : (
          <span>Ничего не найдено</span>
        )}
      </Section>
      <Pagination
        currentPage={films.page}
        totalPages={films.total_pages}
        getPageLink={(page) => `/genres/1?p=${page}&s=${searchParams.s}`}
      />
    </div>
  );
};

export default GenresPage;
