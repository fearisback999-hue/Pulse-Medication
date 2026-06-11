"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EkgHeart — cinematic cardiac-monitor sequence.
 *
 * Opening shot (~7s, plays once):
 *   1. Camera opens tight on the glowing heart as it beats
 *   2. Tracks right along the EKG trace
 *   3. Follows the signal DOWN a telemetry wire — drawing itself as
 *      the camera descends — until it reaches the end
 *   4. Holds on the arrival spark, then pulls all the way out to
 *      reveal a telemetry ward: patients sitting below, unwell,
 *      connected to the rhythm we just followed
 *
 * Then the scene settles into an endless synced loop: heart lub-dub,
 * comet sweeping the waveform, arteries flaring, pulse rings, and a
 * signal pulse running down the wire to the patients on every few
 * beats. The HUD (BPM / SpO₂ / labels) stays fixed like a monitor
 * overlay while the camera moves.
 */

const BEAT = 0.92; // ~65 BPM
const R_WAVE = 0.46; // fraction of cycle at QRS peak
const INTRO = 7; // seconds for the camera sequence

// ----- World layout (800x800) ------------------------------------
// Heart sits upper-center; waveform passes through it at y=300;
// the trace exits right and dives down a wire to the patients.

// Lead II waveform through the heart (baseline y=300)
const EKG_PATH =
  "M -60 300 H 230 Q 252 278 274 300 H 342 L 354 313 L 372 182 L 392 362 L 404 300 H 496 Q 528 258 560 300 H 708";

// Telemetry wire: trace end → curls down → arrives at the patients
const WIRE_PATH =
  "M 708 300 C 762 330 770 394 718 430 L 612 468 l -18 -52 -26 92 -16 -40 L 472 502 C 418 522 400 558 400 598 L 400 636";

// Anatomical heart silhouette (world coords, center ≈ 400,284 after transform)
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

const HEART_INNER = `
M 286 366
C 312 350 344 354 360 380
L 370 462
C 348 482 322 484 304 462
C 286 440 282 396 286 366 Z
`;

const ARTERY_PATHS = [
  "M 418 268 C 420 246 442 240 460 254 C 474 264 478 282 472 298",
  "M 380 296 C 374 322 358 348 332 370",
  "M 460 320 C 484 348 498 388 488 432",
  "M 360 380 C 388 408 414 430 446 442",
];

// ----- Camera keyframes -------------------------------------------
// Focus point (cx,cy) at zoom s maps to translate(400-s*cx, 400-s*cy).
const CAM = {
  // focus:      heart hold      pan right    wire top     wire mid     wire low     arrival      hold         wide
  x: [-400, -400, -1136, -1318, -1040, -728, -560, -560, 0],
  y: [-168, -168, -320, -627, -728, -800, -1088, -1088, 0],
  scale: [2.0, 2.0, 2.4, 2.4, 2.4, 2.4, 2.4, 2.4, 1],
  times: [0, 0.15, 0.3, 0.42, 0.52, 0.62, 0.72, 0.8, 1],
};

function Patient({
  x,
  pose,
  delay,
}: {
  x: number;
  pose: "slumped" | "chest" | "back";
  delay: number;
}) {
  const reduce = useReducedMotion();
  // Three sick postures: hunched forward, hand on chest, head tilted back
  const body =
    pose === "slumped"
      ? `M ${x - 16} 630 C ${x - 26} 648 ${x - 28} 668 ${x - 20} 686 L ${x - 18} 706 H ${x + 22} L ${x + 18} 668 C ${x + 26} 648 ${x + 14} 632 ${x} 628 Z`
      : pose === "chest"
        ? `M ${x - 14} 622 C ${x - 24} 642 ${x - 24} 670 ${x - 18} 706 H ${x + 20} C ${x + 26} 670 ${x + 24} 640 ${x + 12} 622 Z`
        : `M ${x - 12} 624 C ${x - 24} 646 ${x - 26} 674 ${x - 18} 706 H ${x + 22} C ${x + 28} 668 ${x + 22} 638 ${x + 8} 620 Z`;
  const headCy = pose === "slumped" ? 618 : pose === "back" ? 600 : 606;
  const headCx = pose === "slumped" ? x + 10 : pose === "back" ? x + 6 : x;

  return (
    <motion.g
      animate={reduce ? undefined : { y: [0, -2.5, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* chair */}
      <path
        d={`M ${x - 30} 706 H ${x + 34} M ${x - 26} 706 V 726 M ${x + 30} 706 V 726 M ${x + 26} 706 V 664 H ${x + 34}`}
        stroke="#2A3B58"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* body + head silhouette */}
      <path d={body} fill="#16263F" stroke="#3A4E70" strokeWidth="1" />
      <circle cx={headCx} cy={headCy} r="12" fill="#16263F" stroke="#3A4E70" strokeWidth="1" />
      {/* hand-on-chest pose gets a faint red ache that pulses with the beat */}
      {pose === "chest" && (
        <motion.circle
          cx={x + 2}
          cy={648}
          r="9"
          fill="#E8364E"
          animate={reduce ? undefined : { opacity: [0.08, 0.45, 0.08] }}
          transition={{ duration: BEAT, repeat: Infinity, times: [0, R_WAVE, 1] }}
          filter="url(#softbloom)"
        />
      )}
    </motion.g>
  );
}

export function EkgHeart({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const beatTimes = [0, R_WAVE - 0.14, R_WAVE - 0.05, R_WAVE + 0.03, R_WAVE + 0.15, 0.78, 1];
  const beatScale = reduce ? [1, 1, 1, 1, 1, 1, 1] : [1, 1, 1.022, 1.085, 1.015, 1.045, 1];

  // Wire arrival moment (in seconds, matches camera keyframe 0.72)
  const arrival = INTRO * 0.72;

  return (
    <div className={className}>
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Aurora bed */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-red-500/[0.09] blur-[80px] pulse-slow" />
        <div className="absolute top-[34%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[45%] aspect-square rounded-full bg-gold-500/[0.10] blur-[70px]" />
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[20%] rounded-full bg-gold-500/[0.05] blur-[60px]" />

        <svg
          viewBox="0 0 800 800"
          className="relative w-full h-full max-h-full"
          fill="none"
          aria-label="Camera follows an EKG signal from a beating heart down to monitored patients"
          role="img"
        >
          <defs>
            <radialGradient id="hb" cx="40%" cy="32%" r="85%">
              <stop offset="0%" stopColor="#FF8294" />
              <stop offset="22%" stopColor="#F0445C" />
              <stop offset="55%" stopColor="#B91D38" />
              <stop offset="85%" stopColor="#6E1226" />
              <stop offset="100%" stopColor="#3B0814" />
            </radialGradient>
            <radialGradient id="hi" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#1A0309" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1A0309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="comet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
              <stop offset="55%" stopColor="#FFD56A" />
              <stop offset="92%" stopColor="#FFFDF4" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            <radialGradient id="dot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFE9A8" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
              <stop offset="60%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
            </radialGradient>
            <radialGradient id="flash" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#E8364E" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
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
            <filter id="softbloom" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.16" />
            </pattern>
            <pattern id="grid-major" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.26" />
            </pattern>
            <clipPath id="frame">
              <rect x="0" y="0" width="800" height="800" rx="20" />
            </clipPath>
          </defs>

          {/* ============ CAMERA ============ */}
          <motion.g
            style={{ transformOrigin: "0px 0px" }}
            initial={
              reduce
                ? { x: 0, y: 0, scale: 1 }
                : { x: CAM.x[0], y: CAM.y[0], scale: CAM.scale[0] }
            }
            animate={
              reduce ? undefined : { x: CAM.x, y: CAM.y, scale: CAM.scale }
            }
            transition={{ duration: INTRO, times: CAM.times, ease: "easeInOut" }}
          >
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

            {/* R-wave scene flash */}
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

            {/* Pulse rings from the heart */}
            {!reduce &&
              [0, 0.45, 0.85].map((d, i) => (
                <motion.circle
                  key={i}
                  cx="400"
                  cy="284"
                  r="130"
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
                  style={{ transformOrigin: "400px 284px" }}
                />
              ))}

            {/* ----- HEART (scaled into upper area, center ≈ 400,284) ----- */}
            <g transform="translate(120 -10) scale(0.7)">
              <motion.g
                animate={{ scale: beatScale }}
                transition={{ duration: BEAT, repeat: Infinity, times: beatTimes, ease: "easeOut" }}
                style={{ transformOrigin: "400px 420px" }}
              >
                <path d={HEART} fill="#E8364E" opacity="0.4" filter="url(#bloom)" />
                <path d={HEART} fill="url(#hb)" />
                <path d={HEART_INNER} fill="url(#hi)" />
                <g opacity="0.12" stroke="#FFFFFF" strokeWidth="1" fill="none">
                  <path d="M 300 320 Q 360 360 420 410" />
                  <path d="M 320 380 Q 380 420 440 470" />
                  <path d="M 290 430 Q 350 460 410 500" />
                  <path d="M 340 500 Q 400 530 460 540" />
                </g>
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
                <path d={HEART} stroke="url(#rim)" strokeWidth="2.5" fill="none" />
              </motion.g>
            </g>

            {/* ----- WAVEFORM ----- */}
            <g clipPath="url(#frame)">
              <path d={EKG_PATH} stroke="#C9A84C" strokeWidth="2" opacity="0.18" />
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
            </g>

            {/* ----- TELEMETRY WIRE down to the patients ----- */}
            {/* Faint permanent wire */}
            <path d={WIRE_PATH} stroke="#C9A84C" strokeWidth="1.5" opacity="0.14" />

            {/* Intro: wire draws itself as the camera follows it down */}
            {!reduce && (
              <motion.path
                d={WIRE_PATH}
                pathLength={1000}
                stroke="url(#comet)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#linebloom)"
                strokeDasharray="1000 1000"
                initial={{ strokeDashoffset: 1000, opacity: 1 }}
                animate={{
                  strokeDashoffset: [1000, 1000, 0, 0],
                  opacity: [1, 1, 1, 0.25],
                }}
                transition={{ duration: INTRO, times: [0, 0.3, 0.72, 1], ease: "linear" }}
              />
            )}

            {/* Intro: signal dot riding the wire down */}
            {!reduce && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: INTRO, times: [0, 0.3, 0.32, 0.72, 0.76] }}>
                <circle r="10" fill="url(#dot)" filter="url(#linebloom)">
                  <animateMotion
                    begin={`${INTRO * 0.3}s`}
                    dur={`${INTRO * 0.42}s`}
                    repeatCount="1"
                    fill="freeze"
                    path={WIRE_PATH}
                    calcMode="linear"
                  />
                </circle>
              </motion.g>
            )}

            {/* Loop: a pulse runs down the wire every 3 beats (after intro) */}
            {!reduce && (
              <motion.path
                d={WIRE_PATH}
                pathLength={1000}
                stroke="url(#comet)"
                strokeWidth="2.6"
                strokeLinecap="round"
                filter="url(#linebloom)"
                strokeDasharray="130 870"
                initial={{ strokeDashoffset: 1130, opacity: 0 }}
                animate={{ strokeDashoffset: [1130, 130], opacity: [0.9, 0.9] }}
                transition={{
                  duration: BEAT * 1.6,
                  repeat: Infinity,
                  repeatDelay: BEAT * 1.4,
                  delay: INTRO,
                  ease: "linear",
                }}
              />
            )}

            {/* Arrival burst where the wire meets the ward */}
            {!reduce &&
              Array.from({ length: 10 }).map((_, i) => {
                const a = (i / 10) * Math.PI * 2;
                return (
                  <motion.circle
                    key={i}
                    cx={400}
                    cy={636}
                    r="2.5"
                    fill="#FFE9A8"
                    filter="url(#linebloom)"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [0, Math.cos(a) * 64],
                      y: [0, Math.sin(a) * 64],
                    }}
                    transition={{ duration: 0.55, delay: arrival, ease: "easeOut" }}
                  />
                );
              })}

            {/* ----- THE WARD: patients sitting, unwell ----- */}
            {/* floor glow + floor line */}
            <ellipse cx="400" cy="716" rx="270" ry="24" fill="#C9A84C" opacity="0.05" />
            <line x1="140" y1="726" x2="660" y2="726" stroke="#2A3B58" strokeWidth="2" opacity="0.8" />

            <Patient x={258} pose="slumped" delay={0} />
            <Patient x={400} pose="chest" delay={0.8} />
            <Patient x={544} pose="back" delay={1.6} />

            {/* ward label */}
            <text
              x="400"
              y="762"
              textAnchor="middle"
              fill="#C9A84C"
              fontSize="12"
              opacity="0.45"
              letterSpacing="5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              TELEMETRY WARD · 3 PATIENTS MONITORED
            </text>
          </motion.g>
          {/* ============ /CAMERA ============ */}

          {/* Vignette (fixed) */}
          <rect x="0" y="0" width="800" height="800" fill="url(#vignette)" pointerEvents="none" />

          {/* ----- HUD: fixed monitor overlay, unaffected by camera ----- */}
          <motion.g
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.6, duration: 0.8 }}
          >
            <motion.circle
              cx="64"
              cy="62"
              r="5"
              fill="#5DD68A"
              animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: BEAT, repeat: Infinity, times: [0, R_WAVE, 1] }}
            />
            <text x="80" y="68" fill="#C9A84C" fontSize="13" opacity="0.75" letterSpacing="3">
              LEAD II · LIVE
            </text>

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

            <text x="60" y="110" fill="#C9A84C" fontSize="10" opacity="0.5" letterSpacing="2">
              SpO₂ <tspan fill="#FFE9A8" fontSize="14" fontWeight="700">98%</tspan>
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
