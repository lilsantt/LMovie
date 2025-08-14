import Link from "next/link";
import React from "react";

type Props = {};

const SearchTypes = (props: Props) => {
  return (
    <div>
      <Link href={"/movie/search"}>Поиск по фильма</Link>
      <Link href={"/tv/search"}>Поиск по сериалам</Link>
    </div>
  );
};

export default SearchTypes;
