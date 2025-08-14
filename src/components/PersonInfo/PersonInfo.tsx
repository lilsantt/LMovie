import React from "react";
import TMDBImage from "../TMDBImage/TMDBImage";
import { PersonDetails } from "@/types/tmdb";
import styles from "./PersonInfo.module.css";

type PersonInfoProps = {
  personDetails: PersonDetails;
};

const PersonInfo = ({ personDetails }: PersonInfoProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.avatar}>
        <TMDBImage path={personDetails.profile_path} className="mini" />
      </div>
      <div className={styles.info}>
        <h1 className={styles.name}>{personDetails.name}</h1>
        <ul className={styles.list}>
          <li>
            <span>Пол</span> {genderType(personDetails.gender)}
          </li>
          {personDetails.place_of_birth && (
            <li>
              <span>Место рождения</span>
              {personDetails.place_of_birth}
            </li>
          )}
          <li>
            <span>Дата рождения: </span>
            {personDetails.birthday || "Не указано"}
          </li>
          {personDetails.deathday && (
            <li>
              <span>Дата смерти: </span>
              {personDetails.deathday || "Не указано"}
            </li>
          )}
          <li>
            <span>Биография: </span>
            <p>{personDetails.biography || "Не указано"}</p>
          </li>
          <li>
            <span>Работа:</span>
            {personDetails.known_for_department}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PersonInfo;

const genderType = (type: string) => {
  let gender = "Не индентифицирован";
  switch (+type) {
    case 2:
      gender = "Мужской";
      break;
    case 1:
      gender = "Женский";
      break;
  }
  return gender;
};
