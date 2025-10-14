// app/api/tmdb-image/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  const size = searchParams.get("size") || "w500";

  if (!path) {
    return new Response("Missing path", { status: 400 });
  }

  try {
    const tmdbUrl = `https://image.tmdb.org/t/p/${size}${path}`;
    const response = await fetch(tmdbUrl);

    if (!response.ok) throw new Error("Failed to fetch image");

    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=604800",
      },
    });
  } catch (error) {
    return new Response("Image not found", {
      status: 404,
      statusText: (error as Error).message,
    });
  }
}
