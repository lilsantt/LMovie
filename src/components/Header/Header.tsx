import React from "react";
import Logo from "../Logo/Logo";
import Container from "../Container/Container";
import SearchForm from "../SearchForm/SearchForm";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Logo />
          <div className={styles.search}>
            <SearchForm />
          </div>
          <Navbar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
