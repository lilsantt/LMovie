import { Video } from "@/types/tmdb";

interface SingleTrailerPlayerProps {
  video: Video | null;
}

export default function SingleTrailerPlayer({
  video,
}: SingleTrailerPlayerProps) {
  if (!video) return <p>Трейлер не найден</p>;

  return (
    <div>
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${video.key}?rel=0&showinfo=0&modestbranding=1&controls=1`}
        title={video.name}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          borderRadius: "12px",
          width: "100%",
          maxWidth: "500px",
          height: "168px",
        }}
      ></iframe>
    </div>
  );
}
