"use client";

/**
 * EkgHeart — looping video hero.
 * Fills its container completely (object-cover) and zooms the footage
 * in ~40%, anchored toward the monitor on the right, so the subject
 * reads MASSIVE on screen instead of a distant wide shot.
 */
export function EkgHeart({ className }: { className?: string }) {
  return (
    <div className={`${className ?? ""} overflow-hidden`}>
      <video
        className="w-full h-full object-cover object-[70%_45%] scale-[1.4]"
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
