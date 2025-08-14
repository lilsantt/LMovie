import { CastDetails } from "@/types/tmdb";
import React from "react";
import TMDBImage from "../TMDBImage/TMDBImage";
import Link from "next/link";
import { TMDB_BASE_URL } from "@/utils/axiosClient";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";

type CastCardProps = {
  castItem: CastDetails;
};

const CastCard = ({ castItem }: CastCardProps) => {
  return (
    <div>
      <Link href={`/person/${castItem.id}`}>
        <TMDBImage path={castItem.profile_path} className="mini" />
        <h4>{castItem.name}</h4>
        <span>{castItem.character || "Роль не указана"}</span>
      </Link>
    </div>
  );
};

export default CastCard;
