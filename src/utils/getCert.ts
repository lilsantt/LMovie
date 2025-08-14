import { AdultRating } from "@/types/tmdb";

const getCertInfo = (country: string, ratings: AdultRating[]) => {
  return (
    ratings
      .find((r) => r.iso_3166_1 === country)
      ?.release_dates.find((d) => d.certification)
      ?.certification.trim() || null
  );
};

export const getCert = (ratings: AdultRating[]) => {
  return (
    getCertInfo("RU", ratings) ||
    getCertInfo("US", ratings) ||
    getCertInfo("GB", ratings) ||
    null
  );
};
