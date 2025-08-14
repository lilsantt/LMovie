import React from "react";
import styles from "./PersonCard.module.css";
import Link from "next/link";
import Title from "../Title/Title";
import TMDBImage from "../TMDBImage/TMDBImage";
import { PersonDetails } from "@/types/tmdb";
type PersonCardProps = {
  person: PersonDetails;
};

const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <div>
      <div className={styles.image}>
        <Link href={`/person/${person.id}`}>
          <TMDBImage
            path={person.profile_path}
            alt={person.name}
            className={"mini"}
          />
        </Link>
      </div>
      <div className=""></div>
      <Link href={`/person/${person.id}`}>
        <Title title={person.name || "Не указано"} tag="h3" />
      </Link>
      <span>{person.known_for_department}</span>
    </div>
  );
};

export default PersonCard;
