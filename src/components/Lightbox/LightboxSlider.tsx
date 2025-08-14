import React, { useEffect, useState } from "react";
import styles from "./LightboxSlider.module.css";

type LightboxSliderProps = {
  images: { src: string; alt?: string }[];
  startIndex: number;
  onClose: () => void;
};

const LightboxSlider = ({
  images,
  startIndex,
  onClose,
}: LightboxSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt || ""}
        />
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <button className={styles.prevBtn} onClick={prev}>
          ‹
        </button>
        <button className={styles.nextBtn} onClick={next}>
          ›
        </button>
        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default LightboxSlider;
