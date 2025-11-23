import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import LayoutWrapper from "@/components/layout/LayoutWrapper/LayoutWrapper";
import { getMovieGenres, getTVGenres } from "@/api/tmdb/getGenres";
import { GenresProvider } from "@/context/GenresContext";
import { METADATA } from "@/constants/metadata";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: METADATA.siteName,
  description: METADATA.description,
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
