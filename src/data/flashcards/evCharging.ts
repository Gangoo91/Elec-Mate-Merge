/**
 * EV charging installations — BS 7671 Section 722 + Approved Document S.
 *
 * Two sources, both checked, neither from recall:
 *
 *  - **BS 7671 Section 722** via `bs7671_facets`, edition
 *    41c1f30d-4f1a-432f-9e2d-61b91290149f = 2018+A4:2026 (the only current
 *    RAG table).
 *  - **Approved Document S** read directly from
 *    `~/Desktop/hav/ApprovedDocS-EV-charging-2021.pdf` — §6.2 and §S1 quoted
 *    from the text, not from a summary. ⚠️ Approved Documents are ENGLAND
 *    only; Scotland and Wales have their own building standards, and the cards
 *    say so where it matters.
 *
 * 🔴 DELIBERATELY ABSENT: the Section 722 RCD rule (Type A vs Type B, and the
 * 6 mA smooth DC detection threshold). It did not come back as a coherent
 * cluster from the RAG, no BS 7671 PDF is held on disk to settle it, and this
 * is exactly the sort of number that gets invented. The one DC card below is
 * attributed to Reg 534.4.7 NOTE 1, which IS what the source says. Add the 722
 * RCD cards only against the printed regulation.
 */
import { FlashcardData } from './types';

export const evCharging: FlashcardData[] = [
  // ── Section 722 scope ───────────────────────────────────────────────────
  {
    id: 'ev1',
    question: 'What does BS 7671 Section 722 apply to?',
    answer:
      'Circuits intended to supply electric vehicles for charging. Applicability is judged on the circuit’s purpose at design and installation — "intended to supply" — not on what happens to be plugged in later.',
    category: 'EV Charging',
    difficulty: 'easy',
  },
  {
    id: 'ev2',
    question: 'Name two things Section 722 explicitly excludes.',
    answer:
      'Inductive (wireless) charging, and charging points for mobility scooters and similar vehicles of 10 A and less. Both exclusions apply regardless of where the installation is.',
    category: 'EV Charging',
    difficulty: 'medium',
  },
  {
    id: 'ev3',
    question: 'Is a domestic socket used only for a mobility scooter covered by Section 722?',
    answer:
      'No — if it draws 10 A or less it falls under the exclusion, so the particular requirements of Section 722 do not apply to it.',
    category: 'EV Charging',
    difficulty: 'medium',
  },
  {
    id: 'ev4',
    question: 'Where are the definitions used by Section 722, such as "electric vehicle", found?',
    answer:
      'Part 2 of BS 7671. Section 722 does not define its own terms — you go back to Part 2 to interpret them.',
    category: 'EV Charging',
    difficulty: 'easy',
  },

  // ── Protective measures prohibited ──────────────────────────────────────
  {
    id: 'ev5',
    question: 'Which two Section 417 protective measures are banned for EV charging installations?',
    answer:
      'Obstacles, and placing out of reach. Reg 722.410.3.5 says they "shall not be used" — flatly, with no exceptions and no partial use alongside other measures.',
    category: 'EV Charging',
    difficulty: 'medium',
  },
  {
    id: 'ev6',
    question: 'Can you mount EV charging equipment high up and call that "placing out of reach"?',
    answer:
      'No. Mounting high, or putting a low barrier in front of it, is exactly what Reg 722.410.3.5 prohibits. Use enclosures, SELV/PELV, electrical separation, double insulation or ADS instead.',
    category: 'EV Charging',
    difficulty: 'medium',
  },
  {
    id: 'ev7',
    question: 'Which two further protective measures does Reg 722.410.3.6 prohibit?',
    answer:
      'Non-conducting location (Reg 418.1) and earth-free local equipotential bonding (Reg 418.2). Again stated without proviso.',
    category: 'EV Charging',
    difficulty: 'hard',
  },
  {
    id: 'ev8',
    question:
      'You find an EV charge point protected only by placing out of reach. What goes on the certificate?',
    answer:
      'It is recorded as non-compliant with Reg 722.410.3.5 on the EIC or EICR, with corrective action recommended. The installation should not be accepted with that as the protective measure.',
    category: 'EV Charging',
    difficulty: 'medium',
  },

  // ── PME / open-PEN ──────────────────────────────────────────────────────
  {
    id: 'ev9',
    question: 'What does the device in Reg 722.411.4.1(c) actually measure?',
    answer:
      'The voltage between the circuit protective conductor of the EV charging equipment and Earth. That measurement is what lets it detect a dangerous condition and disconnect.',
    category: 'EV Charging',
    difficulty: 'hard',
  },
  {
    id: 'ev10',
    question: 'What is Annex A722, and does it carry the force of a requirement?',
    answer:
      'It is INFORMATIVE guidance for TN systems where PME conditions apply. Being informative, it assists interpretation but imposes no additional mandatory requirements of its own.',
    category: 'EV Charging',
    difficulty: 'hard',
  },
  {
    id: 'ev11',
    question: 'Why is PME such a recurring issue on EV charge point installs?',
    answer:
      'Because an open PEN conductor can put the vehicle’s exposed metalwork at a dangerous potential, and the car is touched outdoors, often on wet ground. BS 7671 addresses it in Reg 722.411.4.1 with Annex A722 as guidance.',
    category: 'EV Charging',
    difficulty: 'medium',
  },

  // ── A4:2026 changes ─────────────────────────────────────────────────────
  {
    id: 'ev12',
    question: 'Did A4:2026 change Section 722?',
    answer:
      'Yes — it is flagged as containing significant changes to the regulations for EV charging installations. Always work from the A4:2026 text, not an older copy.',
    category: 'EV Charging',
    difficulty: 'medium',
  },
  {
    id: 'ev13',
    question: 'Which earlier amendment is incorporated into Section 722 in A4:2026?',
    answer:
      'BS 7671:2018+A1:2020 — the EV-specific content from A1:2020 is carried into the A4:2026 version of Section 722, along with further changes.',
    category: 'EV Charging',
    difficulty: 'hard',
  },
  {
    id: 'ev14',
    question: 'What new kind of installation does A4:2026 have Section 722 take account of?',
    answer:
      'Prosumer’s electrical installations — premises that both consume and generate/store, so the EV charging equipment has to be considered alongside generation and storage.',
    category: 'EV Charging',
    difficulty: 'hard',
  },

  // ── RCD / DC ────────────────────────────────────────────────────────────
  {
    id: 'ev15',
    question:
      'What does BS 7671 say a Type A RCD can handle in terms of smooth DC (Reg 534.4.7 NOTE 1)?',
    answer:
      'Tripping is achieved for residual pulsating DC superimposed on a smooth direct current up to 6 mA. Beyond that you are outside what a Type A is credited with.',
    category: 'EV Charging',
    difficulty: 'hard',
  },
  {
    id: 'ev16',
    question: 'Why does DC leakage matter at all for EV charging?',
    answer:
      'Vehicle on-board electronics can produce smooth DC residual current, which can blind an ordinary AC-type RCD so it no longer trips on a real fault. The RCD type has to be chosen for that.',
    category: 'EV Charging',
    difficulty: 'medium',
  },

  // ── Approved Document S (England) ───────────────────────────────────────
  {
    id: 'ev17',
    question:
      'Under Approved Document S, what is the minimum rated output of a new EV charge point?',
    answer:
      'A minimum nominal rated output of 7 kW (§6.2b). ⚠️ Approved Documents are England only — Scotland and Wales have their own standards.',
    category: 'EV Charging',
    difficulty: 'easy',
  },
  {
    id: 'ev18',
    question: 'Tethered or untethered — what does Approved Document S require?',
    answer:
      'A universal (untethered) socket. A tethered unit is acceptable only in exceptional circumstances, such as a self-build where the vehicle requirements are already known (§6.2c).',
    category: 'EV Charging',
    difficulty: 'medium',
  },
  {
    id: 'ev19',
    question: 'What must every new charge point display, per Approved Document S?',
    answer:
      'An indicator showing the equipment’s charging status, using lights or a visual display (§6.2d).',
    category: 'EV Charging',
    difficulty: 'easy',
  },
  {
    id: 'ev20',
    question: 'What charging mode and circuit arrangement does Approved Document S require?',
    answer:
      'A minimum of a Mode 3 specialised system for EV charging, running from a DEDICATED circuit, or equivalent, as defined in BS EN IEC 61851-1 (§6.2e).',
    category: 'EV Charging',
    difficulty: 'medium',
  },
  {
    id: 'ev21',
    question: 'Which standard does Approved Document S require a charge point to be designed to?',
    answer:
      'BS EN 61851 (§6.2a) — alongside the requirements of BS 7671 and the IET Code of Practice for Electric Vehicle Charging Equipment Installation.',
    category: 'EV Charging',
    difficulty: 'medium',
  },
  {
    id: 'ev22',
    question:
      'A new block of flats has 6 dwellings and 4 parking spaces. How many need charge points?',
    answer:
      'All 4. Where there are FEWER parking spaces than dwellings, every associated parking space must have access to a charge point (§S1(2)(a)).',
    category: 'EV Charging',
    difficulty: 'hard',
  },
  {
    id: 'ev23',
    question:
      'A new block of flats has 6 dwellings and 10 parking spaces. How many need charge points?',
    answer:
      '6 — equal to the number of dwellings. Where spaces are the same as or more than dwellings, the number of points equals the number of dwellings (§S1(2)(b)).',
    category: 'EV Charging',
    difficulty: 'hard',
  },
  {
    id: 'ev24',
    question:
      'Besides Part S and BS 7671, name other legislation that can bite on an EV charge point install.',
    answer:
      'Approved Document B (fire safety), Approved Document P (electrical safety in dwellings), the Electricity at Work Regulations 1989 with HSE HSR25, and the Alternative Fuels Infrastructure Regulations 2017.',
    category: 'EV Charging',
    difficulty: 'medium',
  },
];
