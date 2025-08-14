import React from "react";
import styles from "./LayoutWrapper.module.css";

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default LayoutWrapper;
