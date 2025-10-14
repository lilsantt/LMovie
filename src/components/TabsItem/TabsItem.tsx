import { CombinedCreditsObj } from "@/types/tmdb";
import Link from "next/link";
import React from "react";
import TMDBImage from "../TMDBImage/TMDBImage";
import Genres from "../Genres/Genres";
import Rating from "../Rating/Rating";
import styles from "./TabsItem.module.css";
import { ArrowRight } from "lucide-react";

type TabsItemProps = {
  credit: CombinedCreditsObj;
};

const TabsItem = ({ credit }: TabsItemProps) => {
  return (
    <li>
      <Link
        href={`/${credit.media_type}/${credit.id}`}
        className={styles.link}
        title={credit.name || credit.title || ""}
      >
        <TMDBImage path={credit.poster_path} className="list" />
        <div className={styles.content}>
          <h3 className={styles.title}>{credit.name || credit.title}</h3>
          <div className={styles.info}>
            {credit.release_date && (
              <span>{credit?.release_date.slice(0, 4)}</span>
            )}
            <Rating rating={credit.vote_average} size="mini" />
          </div>
          <Genres
            filmGenres={credit.genre_ids}
            type={credit.media_type as "tv" | "movie" | null}
            count={2}
          />
        </div>
        <ArrowRight className={styles.arrow} />
      </Link>
    </li>
  );
};

export default TabsItem;
