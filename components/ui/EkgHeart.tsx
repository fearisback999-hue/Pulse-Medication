"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EkgHeart — cinematic cardiac monitor.
 *
 * Layering, back to front:
 *   1. Aurora glow bed + chromatic vignette
 *   2. Scrolling monitor grid (parallax)
 *   3. Faint full EKG trace, twice (echo)
 *   4. R-wave flash (whole scene)
 *   5. Pulse rings exploding from the heart
 *   6. Anatomical heart silhouette with chambers, aorta hint,
 *      arterial gold "lightning" that ignites on every beat
 *   7. Bright comet head + tracer dot sweeping the waveform
 *   8. Sparks scattering on R-wave strike
 *   9. Monitor chrome (BPM/SpO₂/labels)
 *
 * Every animation is synced to BEAT so the tracer crossing the
 * QRS spike, the heart's "lub-dub," the flash, and the spark burst
 * all happen on the same frame.
 */

const BEAT = 0.92; // ~65 BPM
const R_WAVE = 0.46; // fraction of cycle at QRS peak

// Lead II waveform sweeping across the full 800-wide canvas.
// Baseline at y=420; P wave, QRS spike, T wave at proportional heights.
const EKG_PATH =
  "M -60 420 H 240 Q 262 388 284 420 H 360 L 372 438 L 392 250 L 414 506 L 428 420 H 520 Q 555 360 590 420 H 880";

// Anatomical-ish heart silhouette (richer than a Valentine):
// ventricles bottom-left, atria + aorta-stub top-right.
const HEART = `
M 400 612
C 332 568 252 502 218 432
C 192 376 198 314 240 280
C 282 246 340 252 380 296
C 396 280 412 270 432 268
C 458 256 488 254 514 268
C 558 290 588 332 590 384
C 592 432 568 472 528 506
L 480 348
C 472 322 446 308 422 326
C 420 328 418 332 418 336
L 446 412
L 444 442
L 470 540
C 444 560 420 582 400 612 Z
`;

// Inner chamber detail (left ventricle hint, septum)
const HEART_INNER = `
M 286 366
C 312 350 344 354 360 380
L 370 462
C 348 482 322 484 304 462
C 286 440 282 396 286 366 Z
`;

// Arterial "lightning" — the coronaries / aorta lighting up
const ARTERY_PATHS = [
  "M 418 268 C 420 246 442 240 460 254 C 474 264 478 282 472 298",
  "M 380 296 C 374 322 358 348 332 370",
  "M 460 320 C 484 348 498 388 488 432",
  "M 360 380 C 388 408 414 430 446 442",
];

export function EkgHeart({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Lub-dub: subtle atrial bump, hard ventricular contraction at R, recoil, relax
  const beatTimes = [0, R_WAVE - 0.14, R_WAVE - 0.05, R_WAVE + 0.03, R_WAVE + 0.15, 0.78, 1];
  const beatScale = reduce ? [1, 1, 1, 1, 1, 1, 1] : [1, 1, 1.022, 1.085, 1.015, 1.045, 1];

  return (
    <div className={className}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Aurora bed */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] aspect-square rounded-full bg-red-500/[0.09] blur-[80px] pulse-slow" />
        <div className="absolute top-[42%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-square rounded-full bg-gold-500/[0.10] blur-[70px]" />
        <div className="absolute top-[58%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square rounded-full bg-rose-600/[0.08] blur-[90px]" />

        <svg
          viewBox="0 0 800 800"
          className="relative w-full h-full max-h-full"
          fill="none"
          aria-label="Cinematic animated heart in sync with an EKG monitor"
          role="img"
        >
          <defs>
            {/* Heart body — deep crimson with hot red core */}
            <radialGradient id="hb" cx="40%" cy="32%" r="85%">
              <stop offset="0%" stopColor="#FF8294" />
              <stop offset="22%" stopColor="#F0445C" />
              <stop offset="55%" stopColor="#B91D38" />
              <stop offset="85%" stopColor="#6E1226" />
              <stop offset="100%" stopColor="#3B0814" />
            </radialGradient>

            {/* Subtle inner chamber (darker) */}
            <radialGradient id="hi" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#1A0309" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1A0309" stopOpacity="0" />
            </radialGradient>

            {/* Gold rim light + arteries */}
            <linearGradient id="rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0.9" />
            </linearGradient>

            {/* Bright comet for trace */}
            <linearGradient id="comet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
              <stop offset="55%" stopColor="#FFD56A" />
              <stop offset="92%" stopColor="#FFFDF4" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Tracer dot core */}
            <radialGradient id="dot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFE9A8" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </radialGradient>

            {/* Background vignette */}
            <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
              <stop offset="60%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
            </radialGradient>

            {/* R-wave flash — soft scene-wide */}
            <radialGradient id="flash" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#E8364E" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>

            {/* Glow filters */}
            <filter id="bloom" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="14" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="linebloom" x="-30%" y="-300%" width="160%" height="700%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softbloom" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            {/* Clip the trace to a "monitor window" */}
            <clipPath id="frame">
              <rect x="0" y="0" width="800" height="800" rx="20" />
            </clipPath>

            {/* Scrolling grid pattern */}
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.18" />
            </pattern>
            <pattern id="grid-major" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.3" />
            </pattern>
          </defs>

          {/* Scrolling monitor grid */}
          <g clipPath="url(#frame)">
            <motion.g
              animate={reduce ? undefined : { x: [0, -40] }}
              transition={{ duration: BEAT, repeat: Infinity, ease: "linear" }}
            >
              <rect x="-40" y="0" width="880" height="800" fill="url(#grid)" />
              <rect x="-40" y="0" width="880" height="800" fill="url(#grid-major)" />
            </motion.g>
          </g>

          {/* R-wave full-scene flash */}
          {!reduce && (
            <motion.rect
              x="0"
              y="0"
              width="800"
              height="800"
              fill="url(#flash)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.9, 0.3, 0] }}
              transition={{
                duration: BEAT,
                repeat: Infinity,
                times: [0, R_WAVE - 0.04, R_WAVE, R_WAVE + 0.1, R_WAVE + 0.3],
                ease: "easeOut",
              }}
            />
          )}

          {/* Pulse rings */}
          {!reduce &&
            [0, 0.45, 0.85].map((d, i) => (
              <motion.circle
                key={i}
                cx="400"
                cy="420"
                r="180"
                stroke="#C9A84C"
                strokeWidth={1.5 - i * 0.3}
                strokeOpacity="0.6"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: [0.85, 1.8], opacity: [0.45 - i * 0.1, 0] }}
                transition={{
                  duration: BEAT * 2.1,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: BEAT * (R_WAVE + d),
                }}
                style={{ transformOrigin: "400px 420px" }}
              />
            ))}

          {/* Heart group — gentle "breath" sway + beat scale */}
          <motion.g
            animate={reduce ? undefined : { y: [0, -6, 0, -3, 0] }}
            transition={{ duration: BEAT * 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "400px 420px" }}
          >
            <motion.g
              animate={{ scale: beatScale }}
              transition={{ duration: BEAT, repeat: Infinity, times: beatTimes, ease: "easeOut" }}
              style={{ transformOrigin: "400px 420px" }}
            >
              {/* Outer halo */}
              <path d={HEART} fill="#E8364E" opacity="0.4" filter="url(#bloom)" />

              {/* Body */}
              <path d={HEART} fill="url(#hb)" />

              {/* Chamber shadow */}
              <path d={HEART_INNER} fill="url(#hi)" />

              {/* Soft surface texture — diagonal striations like muscle fiber */}
              <g opacity="0.12" stroke="#FFFFFF" strokeWidth="1" fill="none">
                <path d="M 300 320 Q 360 360 420 410" />
                <path d="M 320 380 Q 380 420 440 470" />
                <path d="M 290 430 Q 350 460 410 500" />
                <path d="M 340 500 Q 400 530 460 540" />
              </g>

              {/* Specular highlight */}
              <ellipse
                cx="318"
                cy="310"
                rx="58"
                ry="36"
                fill="#FFFFFF"
                opacity="0.22"
                transform="rotate(-24 318 310)"
                filter="url(#softbloom)"
              />
              <ellipse cx="312" cy="304" rx="22" ry="12" fill="#FFFFFF" opacity="0.55" transform="rotate(-24 312 304)" />

              {/* Gold arteries — flash bright on the R-wave */}
              {ARTERY_PATHS.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="#FFE9A8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#linebloom)"
                  initial={{ opacity: 0.2 }}
                  animate={reduce ? undefined : { opacity: [0.2, 0.25, 1, 0.6, 0.25] }}
                  transition={{
                    duration: BEAT,
                    repeat: Infinity,
                    times: [0, R_WAVE - 0.05, R_WAVE, R_WAVE + 0.12, 1],
                    delay: i * 0.03,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Gold rim outline */}
              <path d={HEART} stroke="url(#rim)" strokeWidth="2.5" fill="none" />
            </motion.g>
          </motion.g>

          {/* Waveform layer */}
          <g clipPath="url(#frame)">
            {/* Echo trace — two faint copies offset for depth */}
            <path d={EKG_PATH} stroke="#C9A84C" strokeWidth="1.5" opacity="0.1" />
            <path d={EKG_PATH} stroke="#C9A84C" strokeWidth="2" opacity="0.18" />

            {/* Bright comet head sweeping waveform */}
            <motion.path
              d={EKG_PATH}
              pathLength={1000}
              stroke="url(#comet)"
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#linebloom)"
              strokeDasharray="190 810"
              initial={{ strokeDashoffset: 1190 }}
              animate={reduce ? undefined : { strokeDashoffset: [1190, 190] }}
              transition={{ duration: BEAT, repeat: Infinity, ease: "linear" }}
            />

            {/* Tracer dot */}
            {!reduce && (
              <>
                <circle r="9" fill="url(#dot)" filter="url(#linebloom)">
                  <animateMotion dur={`${BEAT}s`} repeatCount="indefinite" path={EKG_PATH} calcMode="linear" />
                </circle>
                <circle r="3.5" fill="#FFFFFF">
                  <animateMotion dur={`${BEAT}s`} repeatCount="indefinite" path={EKG_PATH} calcMode="linear" />
                </circle>
              </>
            )}

            {/* R-wave spark burst */}
            {!reduce &&
              Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const dx = Math.cos(angle) * 80;
                const dy = Math.sin(angle) * 80;
                return (
                  <motion.circle
                    key={i}
                    cx={400}
                    cy={250}
                    r="2.5"
                    fill="#FFE9A8"
                    filter="url(#linebloom)"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], x: [0, dx], y: [0, dy] }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      repeatDelay: BEAT - 0.4,
                      delay: BEAT * R_WAVE,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
          </g>

          {/* Vignette over everything */}
          <rect x="0" y="0" width="800" height="800" fill="url(#vignette)" pointerEvents="none" />

          {/* Monitor chrome */}
          <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
            {/* Status row */}
            <motion.circle
              cx="64"
              cy="62"
              r="5"
              fill="#5DD68A"
              animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: BEAT, repeat: Infinity, times: [0, R_WAVE, 1] }}
            />
            <text x="80" y="68" fill="#C9A84C" fontSize="13" opacity="0.75" letterSpacing="3">
              LEAD II · MONITORING
            </text>

            {/* HR readout */}
            <motion.text
              x="568"
              y="74"
              fill="#FFE9A8"
              fontSize="42"
              fontWeight="800"
              letterSpacing="1"
              animate={reduce ? undefined : { opacity: [0.85, 1, 0.85] }}
              transition={{ duration: BEAT, repeat: Infinity, times: [0, R_WAVE, 1] }}
            >
              65
            </motion.text>
            <text x="640" y="74" fill="#C9A84C" fontSize="14" opacity="0.7" letterSpacing="2">
              BPM
            </text>
            <text x="568" y="92" fill="#C9A84C" fontSize="10" opacity="0.5" letterSpacing="2">
              HEART RATE
            </text>

            {/* SpO2 readout */}
            <text x="60" y="724" fill="#C9A84C" fontSize="10" opacity="0.5" letterSpacing="2">
              SpO₂
            </text>
            <text x="60" y="752" fill="#FFE9A8" fontSize="28" fontWeight="700" letterSpacing="1">
              98<tspan fontSize="14" fill="#C9A84C" opacity="0.7"> %</tspan>
            </text>

            {/* Sweep speed */}
            <text x="610" y="752" fill="#C9A84C" fontSize="11" opacity="0.45" letterSpacing="3">
              SINUS · 25 mm/s
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
