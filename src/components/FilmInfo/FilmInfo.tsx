import { DetailedGenres, MovieDetails } from "@/types/tmdb";
import React from "react";
import Rating from "../Rating/Rating";
import TMDBImage from "../TMDBImage/TMDBImage";
import PersonList from "../PersonList/PersonList";
import styles from "./FilmInfo.module.css";
import Container from "../Container/Container";
import Title from "../Title/Title";
import Link from "next/link";
import { getYear } from "@/utils/formatDate";
import { Timer } from "lucide-react";

type Props = {
  movieDetails: MovieDetails;
  type?: "tv" | "movie";
};

const FilmInfo = ({ movieDetails, type = "movie" }: Props) => {
  function getPeopleListByJobName(jobName: string) {
    return (
      movieDetails?.credits.crew.filter((person) => person.job === jobName) ||
      []
    );
  }
  const direcotrs = getPeopleListByJobName("Director");
  const writers = getPeopleListByJobName("Story");
  const novels = getPeopleListByJobName("Novel");
  const screenplay = getPeopleListByJobName("Writer");
  const storyEditor = getPeopleListByJobName("Screenplay");

  const allWriters = writers
    .concat(novels)
    .concat(screenplay)
    .concat(storyEditor);
  const producers = getPeopleListByJobName("Producer");

  const getRuntimeValue = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;
    return `${hours} ч. ${minutes} м. `;
  };

  const getEpAndSeasonsCount = (seasonsCount: number, epCount: number) => {
    return `${seasonsCount} сезон${
      seasonsCount > 1 && seasonsCount < 5 ? "а" : seasonsCount >= 5 ? "ов" : ""
    }, ${epCount} серий`;
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.gradient}></div>
        <div className={styles.backdrop}>
          <TMDBImage
            path={movieDetails.backdrop_path}
            size="original"
            className="fz"
          />
        </div>
        <Container>
          <div className={styles.content}>
            <div className={styles.wrap}>
              <div className={styles.poster}>
                <TMDBImage path={movieDetails.poster_path} className="fw" />
              </div>
              <div className={styles.box}>
                <Title
                  title={movieDetails.title || movieDetails.name}
                  color="white"
                />
                <div className={styles.subinfo}>
                  {movieDetails.release_date || movieDetails.first_air_date ? (
                    <span className={styles.release}>
                      {type === "movie"
                        ? getYear(movieDetails.release_date)
                        : getYear(movieDetails.first_air_date)}
                    </span>
                  ) : null}
                  <Rating rating={movieDetails.vote_average} />
                  {movieDetails.runtime > 0 ||
                  movieDetails.episode_run_time > 0 ? (
                    <span className={styles.length}>
                      <Timer className={styles.lengthIcon} />
                      {type === "movie"
                        ? getRuntimeValue(movieDetails.runtime)
                        : getRuntimeValue(movieDetails.episode_run_time)}
                    </span>
                  ) : null}
                  {movieDetails.number_of_seasons &&
                  movieDetails.number_of_episodes ? (
                    <span>
                      {getEpAndSeasonsCount(
                        movieDetails.number_of_seasons,
                        movieDetails.number_of_episodes
                      )}
                    </span>
                  ) : null}
                </div>
                <div className="info">
                  <ul className={styles.list}>
                    <li>
                      <span>Жанры</span>{" "}
                      <div className="">
                        {movieDetails.genres.map((genre, i) => {
                          if (typeof genre === "number") return null;
                          return (
                            <Link href={`/genres/${genre.id}`} key={genre.id}>
                              {genre.name}
                              {i !== movieDetails.genres.length - 1 &&
                                ",\u00A0"}
                            </Link>
                          );
                        })}
                      </div>
                    </li>
                    {movieDetails.overview ? (
                      <li>
                        <span>Описание</span>
                        {movieDetails.overview}
                      </li>
                    ) : (
                      <li>
                        <span>Описание</span>
                        Не указано
                      </li>
                    )}
                    <li>
                      <span>Режиссёры</span>
                      {movieDetails.created_by?.length || direcotrs?.length ? (
                        <PersonList
                          list={
                            type === "tv" ? movieDetails.created_by : direcotrs
                          }
                        />
                      ) : (
                        "Не известно"
                      )}
                    </li>
                    <li>
                      <span>Сценаристы</span>
                      {allWriters?.length ? (
                        <PersonList list={allWriters} />
                      ) : (
                        "Не известно"
                      )}
                    </li>
                    <li>
                      <span>Продюсеры</span>
                      {producers?.length ? (
                        <PersonList list={producers} />
                      ) : (
                        "Не известно"
                      )}
                    </li>
                    <li>
                      <span>Бюджет</span>{" "}
                      {`${
                        movieDetails.budget
                          ? "$" + movieDetails.budget
                          : "Не известно"
                      }`}
                    </li>
                    <li>
                      <span>Сборы</span>
                      {`${
                        movieDetails.revenue
                          ? "$" + movieDetails.revenue
                          : "Не известно"
                      }`}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FilmInfo;
