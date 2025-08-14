type TMDBImageProps = {
  path: string | null;
  alt?: string;
  size?: string;
  className?: string;
  fallbackSrc?: string;
};

import clsx from "clsx";
import styles from "./TMDBImage.module.css";

export default function TMDBImage({
  path,
  alt = "",
  size = "w500",
  className = "",
  fallbackSrc = "/imdb.svg",
}: TMDBImageProps) {
  if (!path) {
    return (
      <img
        src={fallbackSrc}
        alt="Не найдено"
        className={clsx(styles[className])}
      />
    );
  }

  const src = `https://image.tmdb.org/t/p/${size}${path}`;

  return <img src={src} alt={alt} className={clsx(styles[className])} />;
}
