"use client";

import React, { useRef } from "react";
import styles from "./FilmsList.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilmsCard from "../FilmsCard/FilmsCard";
import { MovieRusult } from "@/types/tmdb";

type Props = {
  films: MovieRusult[];
  type: "movie" | "tv";
};

const FilmsSlider = ({ films, type }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.navButton} onClick={() => scroll("left")}>
        <ChevronLeft />
      </button>

      <div className={styles.slider} ref={sliderRef}>
        {films.map((film) => (
          <div key={film.id} className={styles.slide}>
            <FilmsCard movieItem={film} type={type} />
          </div>
        ))}
      </div>

      <button className={styles.navButton} onClick={() => scroll("right")}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default FilmsSlider;
