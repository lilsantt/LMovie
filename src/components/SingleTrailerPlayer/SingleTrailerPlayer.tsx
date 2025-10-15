"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import styles from "./SingleTrailerPlayer.module.css";

import TrailerModal from "../TrailerModal/TrailerModal";
import { Video } from "@/types/tmdb";

interface SingleTrailerPlayerProps {
  video: Video | null;
}

export default function SingleTrailerPlayer({
  video,
}: SingleTrailerPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!video) return <p>Трейлер не найден</p>;

  const thumbnail = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

  function checkVideoAviable(thumbnail: string) {
    const img = new Image();
    img.src = thumbnail;
    return img.width !== 0 && img.height !== 0;
  }

  if (!checkVideoAviable(thumbnail))
    return (
      <>
        <div className={styles.preview}>
          <div className={styles.thumbnail} />
          <div className={styles.overlay}>
            <p>Трейлер недоступен</p>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className={styles.preview} onClick={() => setIsOpen(true)}>
        <img src={thumbnail} alt={video.name} className={styles.thumbnail} />
        <div className={styles.overlay}>
          <Play size={64} strokeWidth={1.5} />
        </div>
      </div>

      {isOpen && (
        <TrailerModal
          videoKey={video.key}
          onClose={() => {
            setIsOpen(false);
            document.body.style.overflow = "unset";
          }}
        />
      )}
    </>
  );
}
