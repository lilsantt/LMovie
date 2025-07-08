import axios from "axios";

export function handleAxiosError(error: unknown, context = "") {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(
        `Ошибка TMDB API ${context}:`,
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error(`Нет ответа от TMDB ${context}:`, error.message);
    } else {
      console.error(`Ошибка настройки запроса ${context}:`, error.message);
    }
  } else {
    console.error(`Неизвестная ошибка ${context}:`, error);
  }
}
