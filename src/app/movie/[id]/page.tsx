import { getMovieDetails } from "@/api/tmdb/getMovieDetails";
import BackdropGallery from "@/components/BackdropGallery/BackdropGallery";
import CastList from "@/components/CastList/CastList";
import Container from "@/components/Container/Container";
import FilmInfo from "@/components/FilmInfo/FilmInfo";
import Films from "@/components/Films/FilmsList";
import Section from "@/components/Section/Section";
import TrailerPlayer from "@/components/TrailerPlayer/TrailerPlayer";
import { SITE_NAME } from "@/constants/names";
import { MovieDetails } from "@/types/tmdb";
import { getCachedMovieDetails } from "@/utils/getCachedQueries";
import { Metadata } from "next";
import React from "react";

type MovieDetailsPageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: MovieDetailsPageProps): Promise<Metadata> {
  const movieDetails = await getCachedMovieDetails(params.id, "movie");
  if (!movieDetails) {
    return {
      title: "Фильм не найден",
      description: "Информация о фильме недоступна.",
    };
  }

  const title = `${movieDetails.title} — ${SITE_NAME}`;
  const description = movieDetails.overview
    ? movieDetails.overview.slice(0, 160) + "..."
    : `Информация о ${movieDetails.title}: акетёры, трейлеры, фото.`;

  return {
    title,
    description,
  };
}

const MovieDetailsPage = async ({ params }: MovieDetailsPageProps) => {
  const movieDetails = await getCachedMovieDetails(params.id, "movie");
  if (!movieDetails) return;

  return (
    <div>
      <FilmInfo movieDetails={movieDetails} />
      <Container>
        {movieDetails.videos.results.length > 0 && (
          <Section title="Трейлер">
            <TrailerPlayer videos={movieDetails.videos.results} />
          </Section>
        )}
        {movieDetails.images.backdrops.length > 0 && (
          <Section title="Изображения">
            <BackdropGallery backdrops={movieDetails.images.backdrops} />
          </Section>
        )}
        {movieDetails.similar.results.length > 0 && (
          <Section title="Похожие фильмы">
            <Films films={movieDetails.similar.results} type="movie" />
          </Section>
        )}
        <Section title="Актёрский состав">
          <CastList cast={movieDetails.credits.cast} />
        </Section>
      </Container>
    </div>
  );
};

export default MovieDetailsPage;
