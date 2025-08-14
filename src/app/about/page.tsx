import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { Cpu, Database, Film } from "lucide-react";
import { SITE_NAME } from "@/constants/names";
import Container from "@/components/Container/Container";
interface Props {
  className?: string;
}

export default function Page({ className }: Props) {
  return (
    <main className={styles.container}>
      {/* Обложка */}
      <section className={styles.hero}>
        <Image
          src="/about-cover.jpg"
          alt="О нас"
          fill
          className={styles.heroImage}
        />
        <Container>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{SITE_NAME}</h1>
            <p className={styles.heroSubtitle}>
              Сайт для любителей кино, вдохновлённый The Movie Database (TMDB)
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <section className={styles.content}>
          <h2>О проекте</h2>
          <p>
            Этот сайт создан как часть моего портфолио. Здесь собраны подборки
            фильмов, трейлеры и описание картин, предоставленные API TMDB.
            Проект демонстрирует мои навыки работы с <strong>Next.js</strong>,
            интеграцией внешних API и созданием современного UI.
          </p>

          <p>
            Основная идея проекта — создать быстрый и удобный сервис, который
            позволил бы пользователям находить и просматривать информацию о
            фильмах и сериалах без лишних кликов. При этом я уделил особое
            внимание визуальной составляющей, чтобы сайт выглядел современно и
            интуитивно.
          </p>

          <p>
            Все данные для сайта получены через{" "}
            <strong>The Movie Database API</strong>. Это гарантирует
            актуальность информации, наличие качественных изображений, постеров
            и трейлеров. Также это позволяет легко масштабировать проект,
            добавляя новые разделы и функции.
          </p>

          <p>
            При разработке я сосредоточился на оптимизации загрузки страниц и
            использовании возможностей <strong>Next.js</strong> для генерации
            статического и динамического контента. Такой подход обеспечивает
            высокую скорость работы и улучшает SEO, что особенно важно для
            публичных проектов.
          </p>

          <p>
            В будущем планирую расширить функционал, добавив возможность
            создавать собственные подборки фильмов, оставлять отзывы и сохранять
            избранное. Это сделает сайт более интерактивным и полезным для
            постоянных пользователей.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <Film />
              <h3>База фильмов</h3>
              <p>Подробные описания, рейтинги и трейлеры.</p>
            </div>
            <div className={styles.feature}>
              <Database />
              <h3>TMDB API</h3>
              <p>Актуальные данные напрямую из The Movie Database.</p>
            </div>
            <div className={styles.feature}>
              <Cpu />
              <h3>Технологии</h3>
              <p>Проект на Next.js с упором на скорость и удобство.</p>
            </div>
          </div>
        </section>
      </Container>

      {/* Контакты */}
      <section className={styles.contacts}>
        <h2>Контакты</h2>
        <p>
          Email:{" "}
          <a href="mailto:youremail@example.com">youremail@example.com</a>
        </p>
        <p>
          GitHub:{" "}
          <a href="https://github.com/yourusername" target="_blank">
            github.com/yourusername
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a href="https://linkedin.com/in/yourusername" target="_blank">
            linkedin.com/in/yourusername
          </a>
        </p>
      </section>
    </main>
  );
}
