import React, { Suspense } from "react";
import Logo from "../../ui/Logo/Logo";
import Container from "../Container/Container";
import SearchForm from "../../search/SearchForm/SearchForm";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Logo />
          <div className={styles.search}>
            <Suspense fallback={<div>Загрузка...</div>}>
              <SearchForm />
            </Suspense>
          </div>
          <Navbar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
