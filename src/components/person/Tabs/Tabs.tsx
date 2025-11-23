"use client";
import { departmentTranslations } from "@/constants/translations";
import { CombinedCreditsObj } from "@/types/tmdb";
import React, { useState } from "react";
import styles from "./Tabs.module.css";
import TabsItem from "../TabsItem/TabsItem";
import clsx from "clsx";

type TabsProps = {
  crew: CombinedCreditsObj[];
  cast: CombinedCreditsObj[];
};

const Tabs = ({ cast, crew }: TabsProps) => {
  const [activeTab, setActiveTab] = useState("Все");
  const uniqueDepartments = Array.from(
    new Set(crew.map((item) => item.department))
  );

  const removeDuplicatesById = (items: CombinedCreditsObj[]) => {
    const seen = new Map();
    for (const item of items) {
      if (!seen.has(item.id)) {
        seen.set(item.id, item);
      }
    }
    return Array.from(seen.values());
  };

  const filteredCredits = () => {
    if (activeTab === "Все") return removeDuplicatesById([...cast, ...crew]);
    if (activeTab === "Acting") return removeDuplicatesById(cast);
    return removeDuplicatesById(
      crew.filter((item) => item.department === activeTab)
    );
  };
  const tabs = ["Все", "Acting", ...uniqueDepartments];

  return (
    <div className={styles.main}>
      <ul className={styles.tabList}>
        {tabs.map((tab, i) => {
          return (
            <li
              key={i}
              className={clsx(
                styles.tabItem,
                tab === activeTab ? styles.active : null
              )}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              {i === 0 ? tab : departmentTranslations[tab]}
            </li>
          );
        })}
      </ul>
      <ul className={styles.contentList}>
        {filteredCredits()?.map((credit) => {
          return <TabsItem credit={credit} key={credit.id} />;
        })}
      </ul>
    </div>
  );
};

export default Tabs;
