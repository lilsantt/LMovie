import { SITE_NAME } from "@/constants/names";
import Link from "next/link";
import React from "react";
import Title from "../Title/Title";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Title title={SITE_NAME} tag="h2" color="white" />
    </Link>
  );
};

export default Logo;
