import { METADATA } from "@/constants/metadata";
import Link from "next/link";
import React from "react";
import Title from "../Title/Title";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Title title={METADATA.siteName} tag="h2" color="white" />
    </Link>
  );
};

export default Logo;
