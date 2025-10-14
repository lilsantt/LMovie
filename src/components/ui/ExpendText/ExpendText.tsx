"use client";
import { useState } from "react";
import styles from "./ExpendText.module.css";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ExpandableText = ({
  text,
  maxLength = 300,
  className = "",
}: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text || text.length <= maxLength) {
    return <p className={className}>{text}</p>;
  }

  const displayText = isExpanded ? text : `${text.slice(0, maxLength)}...`;

  return (
    <div className={clsx(styles.container, className)}>
      <p
        className={styles.text}
        style={{ maxHeight: isExpanded ? "none" : "150px" }}
      >
        {displayText}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={clsx(styles.button, isExpanded && styles.expanded)}
      >
        {isExpanded ? "Свернуть" : "Показать всё"}
        {isExpanded ? (
          <ArrowUp className={styles.icon} />
        ) : (
          <ArrowDown className={styles.icon} />
        )}
      </button>
    </div>
  );
};

export default ExpandableText;
