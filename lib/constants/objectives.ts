export const COURSE_OBJECTIVES = [
  "Describe normal cardiac anatomy and flow of blood through the heart",
  "Identify the parts of the cardiac conduction system and their function",
  "Describe the origin and spread of the electrical impulse through the heart",
  "Identify the waves and intervals of the cardiac cycle and state their normal values",
  "State the 5 steps of rhythm interpretation",
  "Understand pacemakers — coding, normal function, loss of capture, loss of sensing",
  "State commonly used drugs and the correct dosage used to treat each arrhythmia",
  "Illustrate proper electrode and lead wire placement for a 5-wire system and a 3-wire system to obtain lead V1 (or MCL1) and V6 (or MCL6)",
  "Identify a comprehensive range of arrhythmias from a rhythm strip",
] as const;

export const ARRHYTHMIA_GROUPS = [
  {
    title: "Sinus Rhythms",
    items: [
      "Sinus rhythm",
      "Sinus bradycardia",
      "Sinus tachycardia",
      "Sinus arrhythmia",
      "Sinus arrest",
      "Sinus exit block",
    ],
  },
  {
    title: "Atrial Rhythms",
    items: [
      "Premature atrial complexes (PACs)",
      "Wandering atrial pacemaker (WAP)",
      "Multi-focal atrial tachycardia (MAT)",
      "Atrial tachycardia",
      "Atrial flutter",
      "Atrial fibrillation",
      "Supraventricular tachycardia (SVT)",
    ],
  },
  {
    title: "Junctional & Ventricular Rhythms",
    items: [
      "Junctional rhythm",
      "Accelerated junctional rhythm",
      "Junctional tachycardia",
      "Premature ventricular complexes (PVCs)",
      "Idioventricular rhythm",
      "Accelerated ventricular rhythm",
      "Ventricular tachycardia (VT)",
      "Ventricular fibrillation (VF)",
    ],
  },
  {
    title: "AV Blocks & Conduction Disorders",
    items: [
      "First degree AV block",
      "Second degree AV block (Type I and Type II)",
      "High grade AV block",
      "Third degree AV block",
      "Asystole",
      "Right and left bundle branch block",
    ],
  },
] as const;
