import React from "react";
import styles from "./Pagination.module.css";
import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getPageLink: (page: number) => string;
};

const Pagination = ({
  currentPage,
  totalPages,
  getPageLink,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const maxVisible = 7;
  const maxPagesCount = 500;
  const pages: (number | string)[] = [];

  if (totalPages > maxPagesCount) totalPages = maxPagesCount;

  const addPage = (page: number | string) => {
    pages.push(page);
  };

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      addPage(i);
    }
  } else {
    addPage(1);

    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) {
      addPage("...");
    }

    for (let i = left; i <= right; i++) {
      addPage(i);
    }

    if (right < totalPages - 1) {
      addPage("...");
    }

    addPage(totalPages);
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav className={styles.pagination}>
      <ul>
        {prevPage && (
          <li>
            <Link href={getPageLink(prevPage)}>&laquo;</Link>
          </li>
        )}

        {pages.map((page, idx) =>
          page === "..." ? (
            <li key={`ellipsis-${idx}`} className={styles.ellipsis}>
              ...
            </li>
          ) : (
            <li key={page}>
              <Link
                href={getPageLink(page as number)}
                className={page === currentPage ? styles.active : ""}
              >
                {page}
              </Link>
            </li>
          )
        )}

        {nextPage && (
          <li>
            <Link href={getPageLink(nextPage)}>&raquo;</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
