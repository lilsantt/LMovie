"use client";
import React from "react";
import styles from "./SearchForm.module.css";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

type SearchFormProps = {
  searchParams: { s?: string };
};

const SearchForm = ({ searchParams }: SearchFormProps) => {
  const searchQuery = useSearchParams().get("s");
  return (
    <div>
      <form action="/genres/1" method="GET" className={styles.form}>
        <input
          name="s"
          placeholder="Поиск..."
          className={styles.search}
          defaultValue={searchQuery ? searchQuery : ""}
        />
        <Search className={styles.icon} />
      </form>
    </div>
  );
};

export default SearchForm;
