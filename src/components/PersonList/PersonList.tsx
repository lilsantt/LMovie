import { CastDetails, CrewDetails } from "@/types/tmdb";
import Link from "next/link";
import React from "react";
import styles from "./PersonList.module.css";

interface PersonListProps {
  list: CrewDetails[];
}

const PersonList = ({ list }: PersonListProps) => {
  return (
    <ul className={styles.list}>
      {list.map((person, i) => {
        return (
          <li key={person.id}>
            <Link href={`/person/${person.id}`} className={styles.link}>
              {person.name}
              {i !== list.length - 1 && ",\u00A0"}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PersonList;
