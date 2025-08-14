import React from "react";
import styles from "./Button.module.css";
import { LucideIcon } from "lucide-react";
type ButtonProps = {
  name: string;
  icon?: LucideIcon;
};

const Button = ({ name, icon: Icon }: ButtonProps) => {
  return (
    <button className={styles.button}>
      {name}
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
};

export default Button;
