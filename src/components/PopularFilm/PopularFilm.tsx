import React from "react";
import Title from "../Title/Title";
import { MovieRusult } from "@/types/tmdb";
import Rating from "../Rating/Rating";
import styles from "./PopularFilm.module.css";
import Button from "../ui/Button/Button";
import Image from "next/image";
import TMDBImage from "../TMDBImage/TMDBImage";
import Container from "../Container/Container";
import Link from "next/link";
import { CirclePlay } from "lucide-react";

type PopularFilmProps = {
  movieData: MovieRusult;
};

const PopularFilm = ({ movieData }: PopularFilmProps) => {
  //   const popularMovies = getPopularMovies(1);
  return (
    <div className={styles.film}>
      <TMDBImage
        path={movieData.backdrop_path}
        size="original"
        className={"fw"}
      />
      <Container>
        <div className={styles.info}>
          <Title tag="h1" title={movieData.title} color="white" />
          <Rating rating={movieData.vote_average} />
          <p className={styles.description}>{movieData.overview}</p>

          <Link href={`/movie/${movieData.id}`} className={styles.button}>
            <Button name="Подробнее" icon={CirclePlay} />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default PopularFilm;
