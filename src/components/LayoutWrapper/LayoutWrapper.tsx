import styles from "./LayoutWrapper.module.css";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.wrapper}>{children}</div>;
}
