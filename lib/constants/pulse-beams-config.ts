export const enrollBeams = [
  {
    path: "M0 220H269",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["0%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 1.5,
        delay: 0,
      },
    },
    connectionPoints: [
      { cx: 0, cy: 220, r: 3 },
      { cx: 269, cy: 220, r: 4 },
    ],
  },
  {
    path: "M858 220H589",
    gradientConfig: {
      initial: { x1: "100%", x2: "100%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["100%", "0%", "0%"],
        x2: ["100%", "10%", "10%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 1.5,
        delay: 0.8,
      },
    },
    connectionPoints: [
      { cx: 858, cy: 220, r: 3 },
      { cx: 589, cy: 220, r: 4 },
    ],
  },
  {
    path: "M429 0V170C429 175.523 433.477 180 439 180H520C525.523 180 530 184.477 530 190V217",
    gradientConfig: {
      initial: { x1: "40%", x2: "50%", y1: "-40%", y2: "-20%" },
      animate: {
        x1: ["40%", "40%", "40%"],
        x2: ["50%", "50%", "50%"],
        y1: ["-40%", "100%", "200%"],
        y2: ["-20%", "120%", "220%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.4,
      },
    },
    connectionPoints: [
      { cx: 429, cy: 0, r: 3 },
      { cx: 530, cy: 217, r: 4 },
    ],
  },
  {
    path: "M429 434V280C429 274.477 424.523 270 419 270H340C334.477 270 330 265.523 330 260V217",
    gradientConfig: {
      initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
      animate: {
        x1: ["40%", "40%", "40%"],
        x2: ["50%", "50%", "50%"],
        y1: ["160%", "0%", "-40%"],
        y2: ["180%", "20%", "-20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 1.2,
      },
    },
    connectionPoints: [
      { cx: 429, cy: 434, r: 3 },
      { cx: 330, cy: 217, r: 4 },
    ],
  },
  {
    path: "M150 434V350C150 344.477 154.477 340 160 340H380C385.523 340 390 335.523 390 330V250",
    gradientConfig: {
      initial: { x1: "20%", x2: "30%", y1: "160%", y2: "180%" },
      animate: {
        x1: ["20%", "20%", "50%"],
        x2: ["30%", "30%", "60%"],
        y1: ["160%", "-20%", "-40%"],
        y2: ["180%", "0%", "-20%"],
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 1.8,
        delay: 0.6,
      },
    },
    connectionPoints: [
      { cx: 150, cy: 434, r: 3 },
      { cx: 390, cy: 250, r: 4 },
    ],
  },
  {
    path: "M708 0V120C708 125.523 703.523 130 698 130H500C494.477 130 490 134.477 490 140V210",
    gradientConfig: {
      initial: { x1: "60%", x2: "70%", y1: "-40%", y2: "-20%" },
      animate: {
        x1: ["60%", "60%", "30%"],
        x2: ["70%", "70%", "40%"],
        y1: ["-40%", "100%", "200%"],
        y2: ["-20%", "120%", "220%"],
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 1.8,
        delay: 1.0,
      },
    },
    connectionPoints: [
      { cx: 708, cy: 0, r: 3 },
      { cx: 490, cy: 210, r: 4 },
    ],
  },
];

export const enrollGradientColors = {
  start: "#C9A84C",
  middle: "#E0C372",
  end: "#D4AD4B",
};
