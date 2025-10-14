import { MovieRusult, MultiSearchResult, PersonDetails } from "@/types/tmdb";
import React from "react";
import FilmsCard from "../FilmsCard/FilmsCard";
import PersonCard from "../PersonCard/PersonCard";
import styles from "./SearchList.module.css";

type SearchListProps = {
  items: MultiSearchResult[];
  checkType?: boolean;
  type?: "tv" | "movie";
};

const SearchList = ({
  items,
  checkType = false,
  type = "movie",
}: SearchListProps) => {
  return (
    <div className={styles.cont}>
      {items.length === 0 && <p>Ничего не найдено</p>}
      <ul className={styles.list}>
        {items.map((item) => {
          if (checkType)
            return (
              <FilmsCard
                movieItem={item as MovieRusult}
                type={type}
                key={item.id}
              />
            );
          if (item.media_type === "movie")
            return (
              <li key={item.id}>
                <FilmsCard movieItem={item as MovieRusult} type="movie" />
              </li>
            );
          else if (item.media_type === "tv")
            return (
              <li key={item.id}>
                <FilmsCard movieItem={item as MovieRusult} type="tv" />
              </li>
            );
          else if (item.media_type === "person")
            return (
              <li key={item.id}>
                <PersonCard titleLength={15} person={item as PersonDetails} />
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default SearchList;
