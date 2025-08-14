import { discoverMovies } from "@/api/tmdb/discoverMovies";
import { getMovies } from "@/api/tmdb/getMovies";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import Section from "@/components/Section/Section";
import Sidebar from "@/components/Sidebar/Sidebar";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { PopularMoviesResponse } from "@/types/tmdb";
import React from "react";

type MovieSearchPageProps = {
  searchParams: {
    genres?: string;
    year_gte?: string;
    year_lte?: string;
    rating_gte?: string;
    rating_lte?: string;
    p?: string;
  };
};

const MovieSearchPage = async ({ searchParams }: MovieSearchPageProps) => {
  const {
    genres,
    year_gte,
    year_lte,
    rating_gte,
    rating_lte,
    p = "1",
  } = searchParams;

  const page = Math.max(1, Math.min(Number(p), 500));

  const apiParams = {
    page,
    sort_by: "popularity.desc",
    include_adult: true,
    include_video: false,
    language: "ru-RU",
    ...(genres && { with_genres: genres }),
    ...(year_gte && { "first_air_date.gte": `${year_gte}-01-01` }),
    ...(year_lte && { "first_air_date.lte": `${year_lte}-12-31` }),
    ...(rating_gte && { "vote_average.gte": rating_gte }),
    ...(rating_lte && { "vote_average.lte": rating_lte }),
  };

  const films = await discoverMovies({ params: apiParams });

  if (!films) return null;
  return (
    <div>
      <div className="">
        <Sidebar />
      </div>
      <Section
        title={`Поиск фильмов`}
        subtitle={`Страница ${searchParams.p} из ${films.total_pages}`}
      >
        <SearchList items={films?.results} checkType />
      </Section>
      <Pagination
        currentPage={films.page}
        totalPages={films.total_pages}
        getPageLink={(newPage) => {
          const params = new URLSearchParams();
          if (genres) params.set("genres", genres);
          if (year_gte) params.set("year_gte", year_gte);
          if (year_lte) params.set("year_lte", year_lte);
          if (rating_gte) params.set("rating_gte", rating_gte);
          if (rating_lte) params.set("rating_lte", rating_lte);
          params.set("p", newPage.toString());
          return `./search?${params.toString()}`;
        }}
      />
    </div>
  );
};

export default MovieSearchPage;
