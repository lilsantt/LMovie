import { Genre, MovieRusult } from "@/types/tmdb";
import React from "react";
import TMDBImage from "../TMDBImage/TMDBImage";
import Rating from "../Rating/Rating";
import Title from "../Title/Title";
import styles from "./FilmsCard.module.css";
import Genres from "../Genres/Genres";
import Link from "next/link";
import { title } from "process";

type FilmsCardProps = {
  movieItem: MovieRusult;
  type: "tv" | "movie";
};

const FilmsCard = ({ movieItem, type }: FilmsCardProps) => {
  const title = movieItem.name || movieItem.title;
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Link href={`/${type}/${movieItem.id}`} title={title}>
          <TMDBImage
            path={movieItem.poster_path}
            alt={movieItem.title}
            className={"mini"}
          />
        </Link>
      </div>

      <Link
        href={`${type}/${movieItem.id}`}
        className={styles.title}
        title={title}
      >
        <Title title={title} tag="h3" length={22} />
      </Link>
      <div className={styles.bottom}>
        <Rating rating={movieItem.vote_average} color="black" size="mini" />
        <Genres filmGenres={movieItem.genre_ids} type={type} count={1} />
      </div>
    </div>
  );
};

export default FilmsCard;
