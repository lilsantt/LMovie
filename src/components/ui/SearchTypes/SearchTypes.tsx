import Link from "next/link";
import React from "react";

const SearchTypes = () => {
  return (
    <div>
      <Link href={"/movie/search"}>Поиск по фильма</Link>
      <Link href={"/tv/search"}>Поиск по сериалам</Link>
    </div>
  );
};

export default SearchTypes;
