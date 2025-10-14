import React from "react";
import styles from "./FilmsCardSkeleton.module.css";

const FilmsCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.bottom}>
        <div className={styles.rating} />
        <div className={styles.genre} />
      </div>
    </div>
  );
};

export default FilmsCardSkeleton;
