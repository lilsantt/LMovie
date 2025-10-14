import React from "react";
import styles from "./Sidebar.module.css";
import Accordion from "../ui/Accordion/Accordion";
import Filter from "../Filters/Filter/Filter";
import { getMovieGenres } from "@/api/tmdb/getGenres";
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
