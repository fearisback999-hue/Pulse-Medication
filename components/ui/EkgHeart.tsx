"use client";

/**
 * EkgHeart — looping video hero.
 * Plays a high-quality cardiac/EKG clip with WebM + MP4 fallbacks,
 * a poster frame for instant paint before the video buffers, and a
 * subtle vignette + live-monitor HUD overlay on top.
 */
export function EkgHeart({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <video
          className="absolute inset-0 w-full h-full object-cover"
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

        {/* Cinematic vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Live monitor HUD */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 font-mono text-xs tracking-[0.2em]">
          <div className="flex items-center gap-2 text-gold-400/80">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LEAD II · LIVE
          </div>
          <div className="self-end text-right">
            <div className="text-gold-300 text-3xl font-bold tracking-tight tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              65
            </div>
            <div className="text-gold-400/70 text-[10px]">BPM · HEART RATE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
