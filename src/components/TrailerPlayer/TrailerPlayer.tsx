import { Video } from "@/types/tmdb";
import styles from "./TrailerPlayer.module.css";

interface TrailerPlayerProps {
  videos: Video[];
}

export default function TrailerPlayer({ videos }: TrailerPlayerProps) {
  const trailer =
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos.find((v) => v.type === "Teaser" && v.site === "YouTube");

  if (!trailer) return <p>Трейлер не найден</p>;

  return (
    <div className={styles.trailer}>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.iframe}
      ></iframe>
    </div>
  );
}
