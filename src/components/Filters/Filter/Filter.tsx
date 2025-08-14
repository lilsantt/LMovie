"use client";
import { useCallback, useEffect, useState } from "react";
import Range from "@/components/ui/Range/Range";
import { Genre } from "@/types/tmdb";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Filters.module.css";

export type FilterState = {
  yearRange: [number, number];
  ratingRange: [number, number];
};

const Filter = ({ genres }: { genres: Genre[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(() => {
    return {
      yearRange: [
        Number(searchParams.get("year_gte")) || 1950,
        Number(searchParams.get("year_lte")) || 2025,
      ],
      ratingRange: [
        Number(searchParams.get("rating_gte")) || 0,
        Number(searchParams.get("rating_lte")) || 10,
      ],
    };
  });

  const updateURL = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("year_gte", filters.yearRange[0].toString());
    currentParams.set("year_lte", filters.yearRange[1].toString());
    currentParams.set("rating_gte", filters.ratingRange[0].toString());
    currentParams.set("rating_lte", filters.ratingRange[1].toString());

    if (!currentParams.has("p")) {
      currentParams.set("p", "1");
    }

    router.replace(`./search?${currentParams.toString()}`, { scroll: false });
  }, [filters, router, searchParams]);

  useEffect(() => {
    const timer = setTimeout(updateURL, 500);
    return () => clearTimeout(timer);
  }, [updateURL]);

  const handleChange = (field: keyof FilterState, value: [number, number]) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.filter}>
      <Range
        name="Год выпуска"
        max={2025}
        min={1950}
        stepValue={1}
        value={filters.yearRange}
        fieldName="yearRange"
        onChange={handleChange}
      />
      <Range
        name="Оценка пользователей"
        max={10}
        min={0}
        stepValue={0.1}
        value={filters.ratingRange}
        fieldName="ratingRange"
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
