"use client";
import React, { useState } from "react";
import styles from "./Accordion.module.css";
import { ArrowDown } from "lucide-react";
import clsx from "clsx";

type AccordionProps = {
  name: string;
  children: React.ReactNode;
};

const Accordion = ({ name, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.accordion}>
      <h4 className={styles.title} onClick={() => setIsOpen((prev) => !prev)}>
        {name}
        <ArrowDown className={clsx(styles.icon, isOpen && styles.open)} />
      </h4>
      <div className={`${styles.list} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
