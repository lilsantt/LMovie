import BackdropGallery from "@/components/ui/BackdropGallery/BackdropGallery";
import CastList from "@/components/film-single/CastList/CastList";
import Container from "@/components/layout/Container/Container";
import FilmInfo from "@/components/film-single/FilmInfo/FilmInfo";
import Films from "@/components/films-list/Films/FilmsList";
import { NotFoundInfo } from "@/components/layout/NotFound/NotFoundInfo";
import Section from "@/components/ui/Section/Section";
import TrailerPlayer from "@/components/trailer/TrailerPlayer/TrailerPlayer";
import { METADATA } from "@/constants/metadata";
import { getCachedMovieDetails } from "@/utils/getCachedQueries";
import { Metadata } from "next";
import React from "react";

type MovieDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MovieDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const movieDetails = await getCachedMovieDetails(id, "movie");
  if (!movieDetails) {
    return {
      title: "Фильм не найден",
      description: "Информация о фильме недоступна.",
    };
  }

  const title = `${movieDetails.title} — ${METADATA.siteName}`;
  const description = movieDetails.overview
    ? movieDetails.overview.slice(0, 160) + "..."
    : `Информация о ${movieDetails.title}: акетёры, трейлеры, фото.`;

  return {
    title,
    description,
  };
}

const MovieDetailsPage = async ({ params }: MovieDetailsPageProps) => {
  const { id } = await params;
  const movieDetails = await getCachedMovieDetails(id, "movie");
  if (!movieDetails) {
    return <NotFoundInfo type="FILMS" />;
  }

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
        {movieDetails.credits.cast.length > 0 && (
          <Section title="Актёрский состав">
            <CastList cast={movieDetails.credits.cast} />
          </Section>
        )}
      </Container>
    </div>
  );
};

export default MovieDetailsPage;
