import React from "react";
import Section from "../Section/Section";
import { TEXTS } from "@/constants/texts";

type NotFoundType = "SEARCH" | "TV" | "FILMS" | "PERSON";

interface Props {
  title?: string;
  description?: string;
  type: NotFoundType;
  children?: React.ReactNode;
}

export const NotFoundInfo: React.FC<Props> = ({
  type,
  children,
  title,
  description,
}) => {
  const finalTitle =
    title || (type ? TEXTS[type].NOT_FOUND.TITLE : "Не найдено");
  const finalDescription =
    description || (type ? TEXTS[type].NOT_FOUND.DESCRIPTION : "");

  return (
    <div style={{ paddingTop: "16px" }}>
      <Section title={finalTitle}>
        <span>{finalDescription}</span>
        {children}
      </Section>
    </div>
  );
};
