export function Video({ src }) {
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
