import { getUpcomingMoviesWithTrailers } from "@/api/tmdb/getUpcomingMovieTrailers";
import React from "react";
import TrailerPlayer from "../TrailerPlayer/TrailerPlayer";
import TMDBImage from "../TMDBImage/TMDBImage";
import SingleTrailerPlayer from "../SingleTrailerPlayer/SingleTrailerPlayer";
import styles from "./UpcomingTrailers.module.css";
import { MovieWithTrailer } from "@/types/tmdb";

type UpcomingTrailersProps = {
  trailers: MovieWithTrailer[];
};

const UpcomingTrailers = async ({ trailers }: UpcomingTrailersProps) => {
  return (
    <ul className={styles.list}>
      {trailers.map((trailer) => {
        return (
          <li className={styles.item} key={trailer.id}>
            <SingleTrailerPlayer video={trailer.trailer} />
            <h4>{trailer.title}</h4>
          </li>
        );
      })}
    </ul>
  );
};

export default UpcomingTrailers;
