import Link from "next/link";
import { Home } from "lucide-react";
import styles from "./NotFoundContent.module.css";

export default function NotFoundContent() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.description}>
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link href="/" className={styles.button}>
          <Home size={20} />
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
