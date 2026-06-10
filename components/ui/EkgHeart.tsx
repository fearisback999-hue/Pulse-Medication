"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EkgHeart — a cinematic cardiac-monitor animation.
 *
 * A glowing heart beats in lockstep with a gold EKG trace that sweeps
 * through its center: faint full waveform underneath, a bright comet
 * segment chasing a glowing tracer dot, pulse rings firing on every
 * R-wave, all over a soft monitor grid.
 *
 * Every animation shares BEAT so the lub-dub lands exactly when the
 * tracer crosses the QRS spike.
 */

// One cardiac cycle, in seconds (~64 BPM).
const BEAT = 0.94;
// Fraction of the cycle at which the tracer hits the R-wave peak.
const R_WAVE = 0.45;

// Lead II waveform: flat baseline → P wave → QRS complex (centered) → T wave.
const EKG_PATH =
  "M -60 400 H 270 Q 288 372 306 400 H 372 L 382 416 L 398 256 L 416 466 L 428 400 H 520 Q 545 358 570 400 H 860";

const heartPath =
  "M400 593 L361 558 C264 471 200 413 200 342 C200 284 245 239 303 239 C336 239 367 254 386 278 L400 296 L414 278 C433 254 464 239 497 239 C555 239 600 284 600 342 C600 413 536 471 439 558 L400 593 Z";

export function EkgHeart({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  // Lub-dub: small pre-beat (atrial), big beat on the R-wave, relax.
  const beatTimes = [0, R_WAVE - 0.13, R_WAVE - 0.05, R_WAVE + 0.04, R_WAVE + 0.16, 0.8, 1];
  const beatScale = reduceMotion
    ? [1, 1, 1, 1, 1, 1, 1]
    : [1, 1, 1.025, 1.075, 1.015, 1.04, 1];

  return (
    <div className={className}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Ambient glow bed behind everything */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-red-500/[0.07] blur-3xl pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] aspect-square rounded-full bg-gold-500/[0.06] blur-3xl" />

        <svg
          viewBox="0 0 800 800"
          className="relative w-full h-full max-h-full"
          fill="none"
          aria-label="Animated heart beating in sync with an EKG rhythm"
          role="img"
        >
          <defs>
            <radialGradient id="ekg-heart-body" cx="38%" cy="32%" r="80%">
              <stop offset="0%" stopColor="#FF6B7E" />
              <stop offset="38%" stopColor="#E8364E" />
              <stop offset="78%" stopColor="#9E1B30" />
              <stop offset="100%" stopColor="#6E0F20" />
            </radialGradient>
            <linearGradient id="ekg-heart-rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0C372" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#E0C372" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="ekg-trace-gold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
              <stop offset="55%" stopColor="#D4AD4B" />
              <stop offset="100%" stopColor="#FFE9A8" />
            </linearGradient>
            <filter id="ekg-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ekg-line-glow" x="-30%" y="-200%" width="160%" height="500%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="ekg-dot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFDF4" />
              <stop offset="35%" stopColor="#FFE9A8" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </radialGradient>
            <clipPath id="ekg-frame">
              <rect x="0" y="0" width="800" height="800" rx="24" />
            </clipPath>
          </defs>

          {/* Monitor grid */}
          <g opacity="0.05" stroke="#C9A84C" strokeWidth="1">
            {Array.from({ length: 15 }, (_, i) => (
              <line key={`v${i}`} x1={(i + 1) * 50} y1="0" x2={(i + 1) * 50} y2="800" />
            ))}
            {Array.from({ length: 15 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={(i + 1) * 50} x2="800" y2={(i + 1) * 50} />
            ))}
          </g>

          {/* Pulse rings — fire on every R-wave */}
          {!reduceMotion &&
            [0, 0.5].map((delayFrac) => (
              <motion.circle
                key={delayFrac}
                cx="400"
                cy="412"
                r="190"
                stroke="#C9A84C"
                strokeWidth="1.5"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [0.9, 1.75], opacity: [0.3, 0] }}
                transition={{
                  duration: BEAT * 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: BEAT * (R_WAVE + delayFrac),
                }}
                style={{ transformOrigin: "400px 412px" }}
              />
            ))}

          {/* The heart — beats with the trace */}
          <motion.g
            animate={{ scale: beatScale }}
            transition={{
              duration: BEAT,
              repeat: Infinity,
              times: beatTimes,
              ease: "easeOut",
            }}
            style={{ transformOrigin: "400px 412px" }}
          >
            {/* Halo */}
            <path d={heartPath} fill="#E8364E" opacity="0.35" filter="url(#ekg-soft-glow)" />
            {/* Body */}
            <path d={heartPath} fill="url(#ekg-heart-body)" />
            {/* Gold rim light */}
            <path d={heartPath} stroke="url(#ekg-heart-rim)" strokeWidth="2.5" fill="none" />
            {/* Specular highlight */}
            <ellipse cx="330" cy="305" rx="58" ry="38" fill="#FFFFFF" opacity="0.16" transform="rotate(-24 330 305)" />
          </motion.g>

          <g clipPath="url(#ekg-frame)">
            {/* Faint resting waveform */}
            <path d={EKG_PATH} stroke="#C9A84C" strokeWidth="2" opacity="0.16" />

            {/* Bright comet segment sweeping the waveform */}
            <motion.path
              d={EKG_PATH}
              pathLength={1000}
              stroke="url(#ekg-trace-gold)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#ekg-line-glow)"
              strokeDasharray="170 830"
              initial={{ strokeDashoffset: 1170 }}
              animate={reduceMotion ? undefined : { strokeDashoffset: [1170, 170] }}
              transition={{ duration: BEAT, repeat: Infinity, ease: "linear" }}
            />

            {/* Tracer dot riding the waveform */}
            {!reduceMotion && (
              <circle r="13" fill="url(#ekg-dot)">
                <animateMotion
                  dur={`${BEAT}s`}
                  repeatCount="indefinite"
                  path={EKG_PATH}
                  calcMode="linear"
                />
              </circle>
            )}
          </g>

          {/* Monitor chrome: BPM readout */}
          <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
            <motion.circle
              cx="588"
              cy="84"
              r="5"
              fill="#E8364E"
              animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
              transition={{ duration: BEAT, repeat: Infinity, times: [0, R_WAVE, 1] }}
            />
            <text x="606" y="96" fill="#E0C372" fontSize="34" fontWeight="700" letterSpacing="1">
              64
            </text>
            <text x="652" y="96" fill="#C9A84C" fontSize="15" opacity="0.7" letterSpacing="2">
              BPM
            </text>
            <text x="60" y="96" fill="#C9A84C" fontSize="14" opacity="0.45" letterSpacing="4">
              LEAD II
            </text>
            <text x="60" y="738" fill="#C9A84C" fontSize="13" opacity="0.4" letterSpacing="3">
              SINUS RHYTHM
            </text>
            <text x="620" y="738" fill="#C9A84C" fontSize="13" opacity="0.4" letterSpacing="2">
              25 mm/s
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
