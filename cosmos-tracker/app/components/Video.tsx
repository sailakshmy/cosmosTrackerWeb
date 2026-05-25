interface VideoProps {
  src: string;
}

export function Video({ src }: VideoProps) {
  return (
    <video
      width="480"
      height="240"
      controls
      preload="none"
      autoPlay
      muted
      playsInline
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
