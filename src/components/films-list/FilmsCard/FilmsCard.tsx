import { MovieRusult } from "@/types/tmdb";
import React from "react";
import TMDBImage from "../../ui/TMDBImage/TMDBImage";
import Rating from "../../film-single/Rating/Rating";
import Title from "../../ui/Title/Title";
import styles from "./FilmsCard.module.css";
import Genres from "../../film-single/Genres/Genres";
import Link from "next/link";

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
            className={"p_mini"}
          />
        </Link>
      </div>

      <Link
        href={`${type}/${movieItem.id}`}
        className={styles.title}
        title={title}
      >
        <div className={styles.title_wrapper}>
          <Title title={title} tag="h3" length={22} />
        </div>
      </Link>
      <div className={styles.bottom}>
        <Rating rating={movieItem.vote_average} size="mini" />
        <Genres filmGenres={movieItem.genre_ids} type={type} count={1} />
      </div>
    </div>
  );
};

export default FilmsCard;
