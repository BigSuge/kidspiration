export function HomepageGlowfestVideo() {
  return (
    <div className="relative w-full h-full" data-name="Homepage Glowfest Video">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/KIDSPIRATION_GLOWFEST_HD.mp4"
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

export function HomepageImpactVideo() {
  return (
    <div className="relative w-full h-full" data-name="Homepage Impact Video">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/KIDSPIRATION_IMPACT.mp4"
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
