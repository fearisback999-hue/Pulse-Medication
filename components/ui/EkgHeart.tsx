"use client";

/**
 * EkgHeart — looping video hero.
 * Scales to fill the column height and bleeds wider as needed so the
 * clip stays large and fully uncropped (object-contain = no cropping).
 */
export function EkgHeart({ className }: { className?: string }) {
  return (
    <div
      className={`${className ?? ""} flex items-center justify-center overflow-visible`}
    >
      <video
        className="h-full w-auto max-w-none min-w-full object-contain"
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
