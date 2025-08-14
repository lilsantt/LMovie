import React from "react";
import FilterGenre from "../Filters/FilterGenre/FilterGenre";
import styles from "./Sidebar.module.css";
import Accordion from "../ui/Accordion/Accordion";
import Filter from "../Filters/Filter/Filter";
import { getMovieGenres } from "@/api/tmdb/getGenres";
import SearchTypes from "../ui/SearchTypes/SearchTypes";
type Props = {};

const Sidebar = async (props: Props) => {
  const genres = await getMovieGenres();
  if (!genres) return;
  return (
    <div className={styles.sidebar}>
      <Accordion name="Фильтры">
        <Filter genres={genres} />
      </Accordion>
    </div>
  );
};

export default Sidebar;
