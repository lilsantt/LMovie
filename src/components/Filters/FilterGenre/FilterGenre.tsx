"use client";
import { getMovieGenres } from "@/api/tmdb/getGenres";
import { Genre } from "@/types/tmdb";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type FilterGenreProps = {
  genres: Genre[];
};

const FilterGenre = ({ genres }: FilterGenreProps) => {
  const [activeGenres, setActiveGenres] = useState<
    { id: number; name: string }[]
  >([]);

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
