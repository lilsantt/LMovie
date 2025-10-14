"use client";

import { createContext, useContext } from "react";
import { Genre } from "@/types/tmdb";

type GenresContextType = {
  movieGenres: Genre[];
  tvGenres: Genre[];
};

const GenresContext = createContext<GenresContextType>({
  movieGenres: [],
  tvGenres: [],
});

export const useGenres = () => useContext(GenresContext);

type GenresProviderProps = {
  children: React.ReactNode;
  movieGenres: Genre[] | null;
  tvGenres: Genre[] | null;
};

export function GenresProvider({
  children,
  movieGenres,
  tvGenres,
}: GenresProviderProps) {
  if (!movieGenres || !tvGenres) return;
  return (
    <GenresContext.Provider value={{ movieGenres, tvGenres }}>
      {children}
    </GenresContext.Provider>
  );
}
