import { NextResponse } from "next/server";
import { getMovies } from "@/api/tmdb/getMovies";
import { TMDB_ENDPOINTS } from "@/constants/apiRoutes";

export async function GET() {
  const data = await getMovies({
    endpoint: TMDB_ENDPOINTS.POPULAR_MOVIES,
  });
  if (!data) {
    return NextResponse.json(
      { error: TMDB_ENDPOINTS.POPULAR_MOVIES.context },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}
