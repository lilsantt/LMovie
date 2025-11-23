import { getMovies } from "@/api/tmdb/getMovies";
import { Endpoint } from "@/types/tmdb";
import React from "react";
import Films from "../Films/FilmsList";

type FilmsSliderProps = {
  endpoint: Endpoint;
  count?: number;
  type: "tv" | "movie";
};

const FilmsSlider = async ({ count, endpoint, type }: FilmsSliderProps) => {
  const films = await getMovies({ count, endpoint });
  if (!films) return;
  return (
    <div>
      <Films films={films.results} type={type} />
    </div>
  );
};

export default FilmsSlider;
