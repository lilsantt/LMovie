import { CastDetails } from "@/types/tmdb";
import React from "react";
import TMDBImage from "../TMDBImage/TMDBImage";
import Link from "next/link";
import styles from "./CastCard.module.css";

type CastCardProps = {
  castItem: CastDetails;
};

const CastCard = ({ castItem }: CastCardProps) => {
  return (
    <div>
      <Link href={`/person/${castItem.id}`} className={styles.card}>
        <div className={styles.mini}>
          <TMDBImage path={castItem.profile_path} className="p_mini" />
        </div>
        <h4 className={styles.title}>{castItem.name}</h4>
        <span className={styles.role}>
          {castItem.character || "Роль не указана"}
        </span>
      </Link>
    </div>
  );
};

export default CastCard;
