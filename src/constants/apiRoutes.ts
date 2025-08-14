import { Endpoint } from "@/types/tmdb";
import { title } from "process";

interface TMDBEndpoints {
  POPULAR_MOVIES: Endpoint;
  TRENDING_TV_SHOWS: Endpoint;
  MOVIE_GENRES: Endpoint;
  TV_SHOWS_GENRES: Endpoint;
  MOVIE_DETAILS: Endpoint;
  PERSON_DETAILS: Endpoint;
  SEARCH: Endpoint;
  DISCOVER_MOVIE: Endpoint;
  DISCOVER_TV: Endpoint;
}

export const TMDB_ENDPOINTS: TMDBEndpoints = {
  POPULAR_MOVIES: {
    endpoint: "discover/movie",
    context: "при получении популярных фильмов POPULAR_MOVIES",
    title: "Популярные фильмы",
  },
  TRENDING_TV_SHOWS: {
    endpoint: "trending/tv/day",
    context: "при получении трендовых сериалов TRENDING_TV_SHOWS",
    title: "Популярные сериалы",
  },
  MOVIE_GENRES: {
    endpoint: "genre/movie/list",
    context: "при получении жанров кино MOVIE_GENRES",
    title: "Жанры кино",
  },
  TV_SHOWS_GENRES: {
    endpoint: "genre/tv/list",
    context: "при получении жанров сериалов TV_SHOWS_GENRES",
    title: "Жанры сериалов",
  },
  MOVIE_DETAILS: {
    endpoint: "movie",
    context: "при получении деталей о кино MOVIE_DETAILS",
    title: "Детали кино",
  },
  PERSON_DETAILS: {
    endpoint: "person",
    context: "при получении информации о человеке PERSON_DETAILS",
    title: "Детали человека",
  },
  SEARCH: {
    endpoint: "search/multi",
    context: "при поиске SEARCH",
    title: "Поиск",
  },
  DISCOVER_MOVIE: {
    endpoint: "discover/movie",
    context: "при поиске фильмов DISCOVER_MOVIE",
    title: "Поиск фильмов",
  },
  DISCOVER_TV: {
    endpoint: "discover/tv",
    context: "при поиске сериалов DISCOVER_TV",
    title: "Поиск сериалов",
  },
} as const;
