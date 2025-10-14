import React from "react";
import Container from "../Container/Container";
import Section from "../Section/Section";
import { TEXTS } from "@/constants/texts";

type NotFoundType = "SEARCH" | "TV" | "FILMS" | "PERSON";

interface Props {
  className?: string;
  title?: string;
  description?: string;
  type: NotFoundType;
  children?: React.ReactNode;
}

export const NotFound: React.FC<Props> = ({
  className,
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
    <Container>
      <Section title={finalTitle}>
        <span>{finalDescription}</span>
        {children}
      </Section>
    </Container>
  );
};
