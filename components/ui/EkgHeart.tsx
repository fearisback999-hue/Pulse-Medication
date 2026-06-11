"use client";

/**
 * EkgHeart — looping video hero filling the entire column edge-to-edge.
 * Uses object-cover so the clip fills the whole highlighted area; the
 * monitor stays centered so only the empty side gutters get trimmed.
 */
export function EkgHeart({ className }: { className?: string }) {
  return (
    <div className={className}>
      <video
        className="w-full h-full object-cover object-center"
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
