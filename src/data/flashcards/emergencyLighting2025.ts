/**
 * BS 5266-1:2025 — emergency lighting.
 *
 * ⚠️ SOURCE CAVEAT, and it matters more here than anywhere else in this
 * library. BS 5266-1 is BSI copyright and is NOT held. The only source is
 * `~/Desktop/hav/NOTE-BS5266-1-2025-emergency-lighting-changes.md`, which is
 * itself a SECONDARY summary compiled from public commentary (BSI Knowledge,
 * NICEIC, IET, lighting industry) and carries an explicit instruction:
 *
 *     "Do not quote clause numbers from this note as if from the standard."
 *
 * So these cards deliberately contain **NO clause numbers**. They teach the
 * shape of the changes and the design illumination values, which are widely
 * published and derive from BS EN 1838. Anyone extending this set must work
 * from a licensed copy of BS 5266-1:2025 / BS EN 1838:2024 — not from here.
 *
 * In force 31 October 2025, superseding BS 5266-1:2016 (withdrawn).
 */
import { FlashcardData } from './types';

export const emergencyLighting2025: FlashcardData[] = [
  {
    id: 'el25_1',
    question: 'When did BS 5266-1:2025 come into force, and what did it replace?',
    answer:
      'In force 31 October 2025, superseding BS 5266-1:2016, which is withdrawn. It is a full revision, not a light touch.',
    category: 'Safety',
    difficulty: 'easy',
  },
  {
    id: 'el25_2',
    question: 'Which two European standards does BS 5266-1:2025 align to?',
    answer:
      'BS EN 1838:2024 for performance, and BS EN 50172:2024 for system requirements.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'el25_3',
    question: 'What three types of lighting are now in scope?',
    answer:
      'Emergency ESCAPE lighting, LOCAL AREA lighting, and STANDBY lighting. The previous edition was primarily about escape lighting.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'el25_4',
    question: 'What is the position on borrowed light in the 2025 edition?',
    answer:
      'Excluded from scope — it cannot be relied upon as a source of emergency illumination.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Resilience ──────────────────────────────────────────────────────────
  {
    id: 'el25_5',
    question: 'What is the new system resilience principle?',
    answer:
      'A single electrical fault must not take out a large portion of the system. The reported figure is a maximum of around 20 luminaires affected by one fault on centrally-supplied final circuits.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'el25_6',
    question: 'What might the resilience requirement mean in practice for circuit design?',
    answer:
      'Separate or segregated circuits — you may no longer be able to hang a whole building’s emergency luminaires off one final circuit.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'el25_7',
    question: 'What supply arrangement is reported for high-risk task areas?',
    answer:
      'A dual-circuit supply — two or more separate circuits.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'el25_8',
    question: 'Where should emergency lighting cables be routed?',
    answer:
      'Through low fire-risk areas wherever practicable — so the thing that has to work during a fire is not routed through the part most likely to be on fire.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Illumination values ─────────────────────────────────────────────────
  {
    id: 'el25_9',
    question: 'What is the minimum illumination on an escape route?',
    answer:
      '1 lux, across the full width of the route — not just along the centre line.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'el25_10',
    question: 'What is the minimum illumination for open (anti-panic) areas?',
    answer:
      'At least 0.5 lux at floor level.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'el25_11',
    question: 'What illumination is required in a high-risk task area?',
    answer:
      'A minimum of 15 lux, OR 10% of the normal lighting level — whichever is HIGHER. A brightly lit workshop therefore needs more than 15 lux.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'el25_12',
    question: 'What is a "point of emphasis" and what does it need?',
    answer:
      'Fire alarm call points, exit doors, firefighting equipment and first-aid points. They need a minimum of 5 lux measured VERTICALLY.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'el25_13',
    question: 'Why does the 5 lux at points of emphasis have to be vertical?',
    answer:
      'Because you are lighting a call point or an extinguisher on a wall so someone can find and use it — a horizontal floor reading tells you nothing about whether the device itself is visible.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Testing and records ─────────────────────────────────────────────────
  {
    id: 'el25_14',
    question: 'What is the routine testing regime for emergency lighting?',
    answer:
      'Unchanged in principle — a monthly functional test plus an annual full-duration test.',
    category: 'Safety',
    difficulty: 'easy',
  },
  {
    id: 'el25_15',
    question: 'What NEW verification requirement did 2025 introduce?',
    answer:
      'Photometric verification — verify initially, and then every 5 years. Previously the light levels were largely a design-stage assumption.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'el25_16',
    question: 'Why does the standard now emphasise staggering tests?',
    answer:
      'To avoid leaving windows with no emergency lighting protection — if you discharge everything at once, the building is unprotected while the batteries recover.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'el25_17',
    question: 'What is expected of records and handover in the 2025 edition?',
    answer:
      'Clear recording of test results, and complete, accessible handover information. Greater emphasis than the 2016 edition placed on it.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'el25_18',
    question: 'You are asked to certify emergency lighting to "the 2016 standard". What do you say?',
    answer:
      'BS 5266-1:2016 is withdrawn — the current code of practice is BS 5266-1:2025, and it is a full revision with expanded scope, resilience requirements and photometric verification.',
    category: 'Safety',
    difficulty: 'medium',
  },
];
