import React from "react";
import styles from "./PersonCard.module.css";
import Link from "next/link";
import Title from "../Title/Title";
import TMDBImage from "../TMDBImage/TMDBImage";
import { PersonDetails } from "@/types/tmdb";
type PersonCardProps = {
  person: PersonDetails;
  titleLength?: number;
};

const PersonCard = ({ person, titleLength }: PersonCardProps) => {
  return (
    <div>
      <div className={styles.image}>
        <Link href={`/person/${person.id}`}>
          <TMDBImage
            path={person.profile_path}
            alt={person.name}
            className={"p_mini"}
          />
        </Link>
      </div>
      <div className=""></div>
      <Link href={`/person/${person.id}`} className={styles.title}>
        <div className={styles.title_wrapper}>
          <Title
            title={
              titleLength
                ? person.name.slice(0, titleLength) + "..."
                : person.name || "Не указано"
            }
            tag="h3"
          />
        </div>
      </Link>
      <span className={styles.role}>{person.known_for_department}</span>
    </div>
  );
};

export default PersonCard;
