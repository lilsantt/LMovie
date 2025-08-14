import Image from "next/image";
import React from "react";
import styles from "./Rating.module.css";
import clsx from "clsx";

type RatingProps = {
  rating: number;
  color?: "black" | "white";
  size?: "mini" | "std";
};

const Rating = ({ rating, color = "white", size = "std" }: RatingProps) => {
  return (
    <div
      className={clsx(styles.rating, size === "mini" ? styles["mini"] : null)}
    >
      <Image
        src="/imdb.svg"
        width={46}
        height={23}
        alt="imdb rating"
        className={styles.image}
      />
      <span
        className={clsx(
          styles.value,
          rating < 5
            ? styles["red"]
            : rating < 7
            ? styles["grey"]
            : styles["green"]
        )}
      >
        {rating != 0 ? rating.toFixed(2) : "N/A"}
      </span>
    </div>
  );
};

export default Rating;
