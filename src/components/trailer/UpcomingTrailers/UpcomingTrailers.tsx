import React from "react";
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
            <h4 className={styles.title}>{trailer.title}</h4>
          </li>
        );
      })}
    </ul>
  );
};

export default UpcomingTrailers;
