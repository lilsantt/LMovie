import { discoverTVs } from "@/api/tmdb/discoverTV";
import Container from "@/components/Container/Container";
import { NotFound } from "@/components/NotFound/NotFound";
import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";
import Section from "@/components/Section/Section";
import Sidebar from "@/components/Sidebar/Sidebar";
import { SITE_NAME } from "@/constants/names";
import React from "react";

type TVSearchPageProps = {
  searchParams: {
    genres?: string;
    year_gte?: string;
    year_lte?: string;
    rating_gte?: string;
    rating_lte?: string;
    p?: string;
  };
};

export async function generateMetadata(searchParams: TVSearchPageProps) {
  const title = `Поиск сериалов — ${
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

const TVSearchPage = async ({ searchParams }: TVSearchPageProps) => {
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

  const films = await discoverTVs({ params: apiParams });
  if (!films) return <NotFound type="TV" />;

  return (
    <div className="flex">
      <Container>
        <aside>
          <Sidebar />
        </aside>
        <main className="flex-1 flex">
          <Section
            title="Поиск сериалов"
            subtitle={`Страница ${page || 1} из ${films.total_pages}`}
          >
            <SearchList items={films.results} type="tv" checkType />
          </Section>
          <Section>
            <Pagination
              currentPage={page}
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

export default TVSearchPage;
