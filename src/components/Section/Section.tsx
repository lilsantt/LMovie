import Link from "next/link";
import React from "react";
import Container from "../Container/Container";
import styles from "./Section.module.css";
import { ArrowRight } from "lucide-react";
import Title from "../Title/Title";

type SectionProps = {
  title?: string;
  link?: string;
  linkTitle?: string;
  subtitle?: string;
  children: React.ReactNode;
};

const Section = ({
  title,
  link = "",
  children,
  subtitle,
  linkTitle,
}: SectionProps) => {
  return (
    <section className={styles.section}>
      <Container>
        <div className="">
          <div className={styles.header}>
            {title && <Title title={title} tag="h2" />}
            <span>{subtitle}</span>
            {link && (
              <Link href={link} className={styles.link}>
                {linkTitle && (
                  <span className={styles.linkTitle}>{linkTitle}</span>
                )}{" "}
                <ArrowRight className={styles.icon} />
              </Link>
            )}
          </div>
        </div>
        <div className="">{children}</div>
      </Container>
    </section>
  );
};

export default Section;
