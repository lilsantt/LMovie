"use client";
import React, { useState } from "react";
import styles from "./BackdropGallery.module.css";
import LightboxSlider from "../Lightbox/LightboxSlider";

type Backdrop = {
  file_path: string;
};

type BackdropGalleryProps = {
  backdrops: Backdrop[];
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

const BackdropGallery = ({ backdrops }: BackdropGalleryProps) => {
  const [startIndex, setStartIndex] = useState<number | null>(null);
  if (!backdrops || backdrops.length === 0) {
    return <p>Изображения не найдены.</p>;
  }

  const lightboxImages = backdrops.map((img) => ({
    src: `https://image.tmdb.org/t/p/original${img.file_path}`,
    alt: "Backdrop",
  }));

  const limitedBackdrops = backdrops.slice(0, 10);

  return (
    <div className={styles.grid}>
      {limitedBackdrops.map((backdrop, index) => (
        <img
          key={backdrop.file_path}
          src={`${IMAGE_BASE_URL}${backdrop.file_path}`}
          alt="Backdrop"
          loading="lazy"
          className={styles.image}
          onClick={() => setStartIndex(index)}
        />
      ))}
      {startIndex && (
        <LightboxSlider
          images={lightboxImages}
          startIndex={startIndex}
          onClose={() => setStartIndex(null)}
        />
      )}
    </div>
  );
};

export default BackdropGallery;
