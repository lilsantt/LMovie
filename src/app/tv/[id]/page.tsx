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
  const movieDetails = await getCachedMovieDetails(id, "tv");
  if (!movieDetails) {
    return {
      title: "Сериал не найден",
      description: "Информация о сериале недоступна.",
    };
  }

  const title = `${movieDetails.name} — ${METADATA.siteName}`;
  const description = movieDetails.overview
    ? movieDetails.overview.slice(0, 160) + "..."
    : `Информация о ${movieDetails.name}: акетёры, трейлеры, фото.`;

  return {
    title,
    description,
  };
}

const MovieDetailsPage = async ({ params }: MovieDetailsPageProps) => {
  const { id } = await params;
  const movieDetails = await getCachedMovieDetails(id, "tv");
  if (!movieDetails) return <NotFoundInfo type="TV" />;

  return (
    <div>
      <FilmInfo movieDetails={movieDetails} type="tv" />
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
          <Section title="Похожие сериалы">
            <Films films={movieDetails.similar.results} type="tv" />
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
