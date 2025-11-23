"use client";
import React, { useState, FormEvent } from "react";
import styles from "./SearchForm.module.css";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFormProps {
  onSubmit?: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("s") || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit?.();
      router.push(`/search/1?s=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={styles.searchForm}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="s"
          placeholder="Поиск..."
          className={styles.search}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <button type="submit" className={styles.submitButton}>
          <Search className={styles.icon} />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
