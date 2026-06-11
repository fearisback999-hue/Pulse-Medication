"use client";

/**
 * EkgHeart — looping video hero.
 * Plays the cardiac/EKG clip fully in frame (object-contain so nothing
 * gets cropped), with WebM + MP4 fallbacks and a poster for first paint.
 */
export function EkgHeart({ className }: { className?: string }) {
  return (
    <div className={className}>
      <video
        className="w-full h-full object-contain"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/video/hero-poster.jpg"
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
