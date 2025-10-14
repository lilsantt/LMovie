"use client";
import React, { useState } from "react";
import styles from "./BackdropGallery.module.css";
import LightboxSlider from "../Lightbox/LightboxSlider";
import useMediaQuery from "@/hooks/useMediaQuery";

type Backdrop = {
  file_path: string;
};

type BackdropGalleryProps = {
  backdrops: Backdrop[];
};

// Функция для получения URL через прокси
const getImageUrl = (filePath: string, size: string = "w780") => {
  return `/api/tmdb/images?path=${encodeURIComponent(filePath)}&size=${size}`;
};

const getOriginalImageUrl = (filePath: string) => {
  return `/api/tmdb/images?path=${encodeURIComponent(filePath)}&size=original`;
};

const BackdropGallery: React.FC<BackdropGalleryProps> = ({ backdrops }) => {
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!backdrops || backdrops.length === 0) {
    return <p>Изображения не найдены.</p>;
  }

  const lightboxImages = backdrops.map((img) => ({
    src: getOriginalImageUrl(img.file_path),
    alt: "Backdrop",
  }));

  const visibleCount = isMobile ? 4 : 10;
  const limitedBackdrops = backdrops.slice(0, visibleCount);

  return (
    <div className={styles.grid}>
      {limitedBackdrops.map((backdrop, index) => (
        <img
          key={backdrop.file_path}
          src={getImageUrl(backdrop.file_path)}
          alt="Backdrop"
          loading="lazy"
          className={styles.image}
          onClick={() => setStartIndex(index)}
        />
      ))}
      {startIndex !== null && (
        <LightboxSlider
          images={lightboxImages}
          startIndex={startIndex}
          onClose={() => setStartIndex(null)}
        />
      )}
    </div>
  );
};

BackdropGallery.displayName = "BackdropGallery";

export default BackdropGallery;
