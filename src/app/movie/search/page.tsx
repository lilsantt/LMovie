import { discoverMovies } from "@/api/tmdb/discoverMovies";
import Container from "@/components/Container/Container";
import { NotFound } from "@/components/NotFound/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import SearchListSkeleton from "@/components/SearchList/Skeleton/SearchListSkeleton";
import Section from "@/components/Section/Section";
import Sidebar from "@/components/Sidebar/Sidebar";
import { SITE_NAME } from "@/constants/names";
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

export async function generateMetadata(searchParams: MovieSearchPageProps) {
  const title = `Поиск фильмов — ${
    searchParams.searchParams.p
      ? "Страница   " + searchParams.searchParams.p || 1
      : SITE_NAME
  } | ${SITE_NAME}`;
  const description = `Ищите сериалы быстро и удобно! Наш сервис использует TMDB API, чтобы предоставить актуальные данные о сериалах, трейлерах и описаниях.`;

  return {
    title,
    description,
  };
}

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

  if (!films) return <NotFound type="SEARCH" />;
  return (
    <div>
      <Container>
        <div className="">
          <Sidebar />
        </div>
        <main>
          <Section
            title={`Поиск фильмов`}
            subtitle={`Страница ${searchParams.p || 1} из ${films.total_pages}`}
          >
            {films?.results ? (
              <SearchList items={films?.results} checkType />
            ) : (
              <SearchListSkeleton />
            )}
          </Section>
          <Section>
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
          </Section>
        </main>
      </Container>
    </div>
  );
};

export default MovieSearchPage;
