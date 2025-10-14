import React from "react";
import styles from "./SearchListSkeleton.module.css";
import FilmsCardSkeleton from "@/components/FilmsCard/Skeleton/FilmsCardSkeleton";

const SearchListSkeleton = () => {
  const items = new Array(10).fill(null);
  return (
    <div className={styles.cont}>
      <ul className={styles.list}>
        {items.map((item) => {
          return <FilmsCardSkeleton />;
        })}
      </ul>
    </div>
  );
};

export default SearchListSkeleton;
