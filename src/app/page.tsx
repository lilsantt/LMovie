import Image from "next/image";
import styles from "./page.module.css";
import { getPopularMovies } from "@/api/tmdb/getPopularMovies";
import { MovieRusult } from "@/types/tmdb";

export default async function Home() {
  const movies = await getPopularMovies();
  console.log(movies);
  if (!movies) return null;
  return (
    <div className={styles.page}>
      {movies.results.map((movie: MovieRusult) => {
        return (
          <div className="">
            <h2>{movie.title}</h2>
          </div>
        );
      })}
    </div>
  );
}
