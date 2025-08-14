"use client";
import { useGenres } from "@/context/GenresContext";
import { Genre } from "@/types/tmdb";
import React from "react";
import styles from "./Genres.module.css";

type GenresProps = {
  filmGenres: number[];
  type: "movie" | "tv" | null;
  count?: 1 | -1;
};

const Genres = ({ filmGenres, type, count = -1 }: GenresProps) => {
  const { movieGenres, tvGenres } = useGenres();
  const genresList = type === "movie" ? movieGenres : tvGenres;
  const filteredGenres = filmGenres.map((genre) => {
    return genresList.find((val) => val.id === genre)?.name;
  });
  return (
    <div>
      <span className={styles.text}>
        {filteredGenres.slice(0, count).join(", ").toLowerCase()}
      </span>
    </div>
  );
};

export default Genres;
