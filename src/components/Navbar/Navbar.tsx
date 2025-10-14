"use client";
import { paths } from "@/constants/paths";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import styles from "./Navbar.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import SearchForm from "../SearchForm/SearchForm";
import Logo from "../Logo/Logo";
import Container from "../Container/Container";

const Navbar = () => {
  const [isMenuOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const isActive = (url: string) => {
    if (url === currentPath) {
      return styles.active;
    }
    return "";
  };

  return (
    <nav className={styles.nav}>
      <button
        className={styles.burger}
        onClick={() => setIsOpen(true)}
        aria-label="Открыть меню"
      >
        ☰
      </button>
      {/* Десктоп */}
      <ul className={styles.list}>
        {paths.map((path) => {
          return (
            <li
              className={clsx(styles.item, isActive(path.path))}
              key={path.id}
            >
              <Link href={path.path} className={styles.link}>
                {path.name}
                <path.icon className={styles.icon} />
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Мобильное */}
      <div className={clsx(styles.overlay, isMenuOpen && styles.open)}>
        <Container>
          <div className={styles.top}>
            <Logo />
            <button
              className={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть меню"
            >
              ✕
            </button>
          </div>
          <div className={styles.search}>
            <Suspense fallback={<div>Загрузка...</div>}>
              <SearchForm onSubmit={() => setIsOpen(false)} />
            </Suspense>
          </div>
          <div>
            <span className={styles.menuTitle}>Меню</span>
            <ul className={styles.menu}>
              {paths.map((path) => {
                return (
                  <li
                    className={clsx(styles.item, isActive(path.path))}
                    key={path.id}
                  >
                    <Link
                      href={path.path}
                      className={styles.link}
                      onClick={() => setIsOpen(false)}
                    >
                      {path.name}
                      <path.icon className={styles.icon} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;
