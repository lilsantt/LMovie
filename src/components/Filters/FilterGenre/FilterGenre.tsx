"use client";
import { Genre } from "@/types/tmdb";
import Link from "next/link";

type FilterGenreProps = {
  genres: Genre[];
};

const FilterGenre = ({ genres }: FilterGenreProps) => {
  return (
    <ul>
      {genres.map((genre) => {
        return (
          <li>
            <Link href={`./genres/${genre.id}`}>{genre.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FilterGenre;
