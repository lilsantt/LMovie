import { paths } from "@/constants/paths";
import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.css";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav>
      <ul className={styles.list}>
        {paths.map((path) => {
          return (
            <li className={styles.item} key={path.id}>
              <Link href={path.path} className={styles.link}>
                {path.name}
              </Link>
              <path.icon className={styles.icon} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
