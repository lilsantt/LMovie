import styles from "./About.module.css";

export const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>LMovies</h1>
        <p className={styles.subtitle}>удобный поиск кино и сериалов</p>

        <div className={styles.searchWrapper}>
          <div className={styles.pulse}></div>
          <div className={styles.searchIcon}>🔍</div>
        </div>
      </div>
    </div>
  );
};
