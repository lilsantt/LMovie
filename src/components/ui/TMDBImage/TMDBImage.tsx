import clsx from "clsx";
import styles from "./TMDBImage.module.css";

type TMDBImageProps = {
  path: string | null;
  alt?: string;
  size?: string;
  className?: string;
  fallbackSrc?: string;
};
export default function TMDBImage({
  path,
  alt = "",
  size = "w500",
  className = "",
  fallbackSrc = "/placeholder.png",
}: TMDBImageProps) {
  if (!path) {
    return (
      <img
        src={fallbackSrc}
        alt="Не найдено"
        className={clsx(styles[className], styles.placeholder)}
      />
    );
  }

  const src = `/api/tmdb/images?path=${encodeURIComponent(path)}&size=${size}`;

  return <img src={src} alt={alt} className={clsx(styles[className])} />;
}
