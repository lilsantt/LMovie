import React, { JSX } from "react";
import styles from "./Title.module.css";
import clsx from "clsx";

type TitleProps = {
  title: string;
  tag?: keyof JSX.IntrinsicElements;
  color?: "black" | "white";
  length?: number;
};

const Title = ({
  title,
  tag: Tag = "h1",
  color = "black",
  length,
}: TitleProps) => {
  return (
    <Tag className={clsx(styles.title, styles[color])}>
      {length && length < title.length ? title.slice(0, length) + "..." : title}
    </Tag>
  );
};

export default Title;
