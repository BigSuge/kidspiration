export default function GlowfestVideo() {
  return (
    <div className="relative w-full h-full" data-name="Glowfest Video">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://kidspiration.org/videos/kids_vid.mp4"
        controls
        controlsList="nodownload"
        playsInline
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}