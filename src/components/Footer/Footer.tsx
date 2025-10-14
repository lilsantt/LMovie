import React from "react";
import Container from "../Container/Container";
import styles from "./Footer.module.css";
import { footerPaths } from "@/constants/paths";
import Link from "next/link";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <ul className={styles.list}>
            {footerPaths.map((path) => {
              return (
                <li key={path.id} className={styles.cell}>
                  <h5>{path.name}</h5>
                  {path.childLinks && (
                    <ul className={styles.childList}>
                      {path.childLinks.map((child) => {
                        return (
                          <li key={child.id}>
                            <Link href={child.link} className={styles.link}>
                              {child.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <Logo />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
