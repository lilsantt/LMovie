import React from "react";
import PopularFilmsSlider from "../PopularFilmsSlider/PopularFilmsSlider";
import { MovieRusult } from "@/types/tmdb";

type PopularFilmListProps = {
  count?: number;
  movies: MovieRusult[];
};

const PopularFilmList = async ({ count = 6, movies }: PopularFilmListProps) => {
  return (
    <div>
      <PopularFilmsSlider films={movies.slice(0, count)} />
    </div>
  );
};

export default PopularFilmList;
