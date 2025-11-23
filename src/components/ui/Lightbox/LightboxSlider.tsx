import React, { useEffect, useState } from "react";
import styles from "./LightboxSlider.module.css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
          alt={images[currentIndex].alt || "изображение"}
        />
        <button className={styles.closeBtn} onClick={onClose}>
          <X className={styles.icon} />
        </button>
        <button className={styles.prevBtn} onClick={prev}>
          <ChevronLeft className={styles.icon} />
        </button>
        <button className={styles.nextBtn} onClick={next}>
          <ChevronRight className={styles.icon} />
        </button>
        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default LightboxSlider;
