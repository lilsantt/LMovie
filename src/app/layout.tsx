import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import { getMovieGenres, getTVGenres } from "@/api/tmdb/getGenres";
import { GenresProvider } from "@/context/GenresContext";
import { SITE_NAME } from "@/constants/names";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Лучший сервис о фильмах и сериалах",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [movieGenres, tvGenres] = await Promise.all([
    getMovieGenres(),
    getTVGenres(),
  ]);
  return (
    <html lang="ru">
      <body className={`${dmSans.variable}`}>
        <LayoutWrapper>
          <Header />
          <GenresProvider movieGenres={movieGenres} tvGenres={tvGenres}>
            <main style={{ flex: 1 }}>{children}</main>
          </GenresProvider>
          <Footer />
        </LayoutWrapper>
      </body>
    </html>
  );
}
