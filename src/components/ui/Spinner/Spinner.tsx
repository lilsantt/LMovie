import React from "react";
import styles from "./Spinner.module.css";

export const Spinner = ({ text }: { text?: string }) => (
  <div className={styles.container}>
    <div className={styles.spinner} />
    {text && <p className={styles.text}>{text}</p>}
  </div>
);
