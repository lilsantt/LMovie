"use client";

import React, { useEffect, useState, useRef } from "react";
import PopularFilm from "../PopularFilm/PopularFilm";
import { MovieRusult } from "@/types/tmdb";
import styles from "./PopularFilmsSlider.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  films: MovieRusult[];
};

const PopularFilmsSlider = ({ films }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetInterval();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % films.length);
    resetInterval();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + films.length) % films.length);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.sliderInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {films.map((film, index) => (
          <div
            className={`${styles.slide} ${
              index === currentIndex ? styles.active : ""
            }`}
            key={film.title + index}
          >
            <PopularFilm movieData={film} />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={prevSlide}>
          <ArrowLeft />
        </button>
        <button onClick={nextSlide}>
          <ArrowRight />
        </button>
      </div>

      <div className={styles.dots}>
        {films.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularFilmsSlider;
