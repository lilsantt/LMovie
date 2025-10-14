"use client";

import { X } from "lucide-react";
import styles from "./TrailerModal.module.css";
import { useEffect } from "react";

interface TrailerModalProps {
  videoKey: string;
  onClose: () => void;
}

export default function TrailerModal({ videoKey, onClose }: TrailerModalProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <X size={24} />
        </button>
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&controls=1`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
