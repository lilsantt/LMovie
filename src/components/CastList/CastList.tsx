import { CastDetails } from "@/types/tmdb";
import React from "react";
import CastCard from "../CastCard/CastCard";
import styles from "./CastList.module.css";

type CastListProps = {
  cast: CastDetails[];
};

const CastList = ({ cast }: CastListProps) => {
  return (
    <div className={styles.sliderWrapper}>
      <ul className={styles.slider}>
        {cast.map((castItem) => (
          <li className={styles.item} key={castItem.id}>
            <CastCard castItem={castItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CastList;
