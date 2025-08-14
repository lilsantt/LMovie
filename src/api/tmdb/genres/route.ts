import { NextResponse } from "next/server";
import { getMovies } from "@/api/tmdb/getMovies";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";
import { getMovieGenres } from "../getGenres";

export async function GET() {
  const data = await getMovieGenres();
  if (!data) {
    return NextResponse.json(
      { error: TMDB_ENDPOINTS.POPULAR_MOVIES.context },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}
