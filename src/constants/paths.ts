import { Clapperboard, Film } from "lucide-react";

export const paths = [
  { id: 0, path: "/movie/search", name: "Поиск фильмов", icon: Clapperboard },
  { id: 1, path: "/tv/search", name: "Поиск сериалов", icon: Film },
];

export const footerPaths = [
  {
    name: "Фильмы",

    id: 0,
    childLinks: [
      { id: 1, name: "Популярные фильмы", link: "/movie/trending" },
      { id: 2, name: "Поиск фильмов", link: "/movie/search" },
    ],
  },
  {
    name: "Сериалы",
    id: 3,
    childLinks: [
      { id: 4, name: "Популярные сериалы", link: "/tv/trending" },
      { id: 5, name: "Поиск сериалов", link: "/tv/search" },
    ],
  },
  {
    name: "Информация",
    id: 6,
    childLinks: [{ id: 7, name: "О нас", link: "/about" }],
  },
];
