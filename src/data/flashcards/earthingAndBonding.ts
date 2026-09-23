import { FlashcardData } from './types';

/**
 * Earthing and bonding — rewritten 23 Sep 2026.
 *
 * WHAT CHANGED AND WHY
 * --------------------
 * This deck averaged 338 characters an answer with 18 of its 25 cards running
 * past 300 — the worst of the decks people actually study. A card you have to
 * scroll is not a flashcard: nobody can honestly answer "did I know that"
 * against a paragraph, and since the self-marking now drives the spaced
 * repetition schedule, the noise went straight into the scheduling. Each
 * multi-fact card has been split into recall-sized ones, and every card
 * carries the regulation it comes from so a learner can check it and so the
 * content can be verified rather than trusted.
 *
 * FACTUAL ERRORS FIXED, each checked against BS 7671 in the RAG:
 *
 *  1. The old deck said "for supply neutral conductors exceeding 35 mm² the
 *     minimum main bonding conductor size is 6 mm²". That is backwards. The
 *     6 mm² minimum applies where the distributor's PEN conductor is 10 mm²
 *     or LESS; where the PEN is 35 mm² or less Table 54.8 requires 10 mm²,
 *     and above that the table requires more, not less.
 *
 *  2. It gave "TT = typically 21 ohms or higher" as a Ze value. Nothing in
 *     BS 7671 or GN3 supports 21 Ω — it is the same unsupported figure that
 *     had to be removed from a quiz question earlier this year. The
 *     supportable figure is the 200 Ω stability warning in Note 2 to
 *     Table 41.5, and that is what the card now teaches.
 *
 *  3. It listed construction sites among places a PME earth "must NOT be
 *     used". Reg 704.411.3.1 RESTRICTS PME there — it is permitted where
 *     extraneous-conductive-parts can be reliably bonded, with a Note
 *     pointing at BS 7375. Stated as a ban, that is an overclaim.
 *
 *  4. The PME prohibitions for caravan parks and marinas are about socket-
 *     outlet protective conductors specifically (Regs 708.553.1.14 and
 *     709.553.1.14), not a blanket ban across the section.
 *
 * 🔴 A NOTE ON Reg 411.3.1.2. The deck this replaced carried a warning that
 * in A4:2026 that clause is about disconnection TIMES, not bonding, and the
 * first draft of this rewrite duly cited it for bonding anyway. The RAG is
 * genuinely split: one facet describes it as setting the categories for
 * Table 41.1, while Reg 542.4.1(d) cross-refers to it for bonding and its
 * last paragraph deals with telecommunication cables and main equipotential
 * bonding. Rather than stake cards on a contested sub-number, every bonding
 * card here cites the parent Reg 411.3.1, or 544.1.2 where the point is the
 * connection itself. Do not "tidy" these back to 411.3.1.2 without settling
 * the question against the printed standard.
 */
export const earthingAndBonding: FlashcardData[] = [
  // ── Earthing systems ──────────────────────────────────────────────────
  {
    id: 'eb1',
    question: 'What does TN-S stand for?',
    answer:
      'Terre-Neutre-Séparé — separate neutral and protective conductors throughout the supply.',
    reference: 'BS 7671 Part 2, definitions of earthing arrangements',
    category: 'Earthing Systems',
    difficulty: 'easy',
  },
  {
    id: 'eb2',
    question: 'On a TN-S supply, what usually provides the earth?',
    answer: 'The lead sheath or steel wire armour of the supply cable.',
    reference: 'BS 7671 Part 2, TN-S arrangement',
    category: 'Earthing Systems',
    difficulty: 'easy',
  },
  {
    id: 'eb3',
    question: 'What does PEN stand for?',
    answer: 'Protective Earth and Neutral — one conductor doing both jobs in the supply network.',
    reference: 'BS 7671 Part 2, definition of PEN conductor',
    category: 'Earthing Systems',
    difficulty: 'easy',
  },
  {
    id: 'eb4',
    question: 'On a TN-C-S supply, where is the PEN conductor split into neutral and earth?',
    answer: "At the cut-out, in the consumer's installation.",
    reference: 'BS 7671 Part 2, TN-C-S (PME) arrangement',
    category: 'Earthing Systems',
    difficulty: 'medium',
  },
  {
    id: 'eb5',
    question: 'On a TT system, how is the earth provided?',
    answer: "By the consumer's own earth electrode, usually a driven rod.",
    reference: 'BS 7671 Part 2, TT arrangement',
    category: 'Earthing Systems',
    difficulty: 'easy',
  },
  {
    id: 'eb6',
    question: 'Why does a TT installation always need an RCD?',
    answer:
      'The loop impedance through the general mass of earth is too high for an overcurrent device to disconnect in time.',
    reference: 'BS 7671 Reg 411.5.2 — RCD for fault protection on TT',
    category: 'Earthing Systems',
    difficulty: 'medium',
  },
  {
    id: 'eb7',
    question: 'What is an IT earthing system?',
    answer: 'The source is isolated from earth, or connected to it through a high impedance.',
    reference: 'BS 7671 Part 2, IT arrangement',
    category: 'Earthing Systems',
    difficulty: 'hard',
  },
  {
    id: 'eb8',
    question: 'Where would you find an IT system in the UK?',
    answer:
      'Specialist places where a first fault must not cut the supply — operating theatres, some industrial processes.',
    reference: 'BS 7671 Part 2; Section 710 for medical locations',
    category: 'Earthing Systems',
    difficulty: 'hard',
  },
  {
    id: 'eb9',
    question: 'What carries the fault current back to the transformer on a TN-S system?',
    answer:
      'A wholly metallic path: cpc, main earthing terminal, earthing conductor, cable sheath.',
    reference: 'BS 7671 Part 2, earth fault loop on TN systems',
    category: 'Earthing Systems',
    difficulty: 'medium',
  },
  {
    id: 'eb10',
    question: 'Which part of a TT earth fault loop is NOT metallic?',
    answer: 'The general mass of earth, between the two electrodes.',
    reference: 'BS 7671 Part 2, earth fault loop on TT systems',
    category: 'Earthing Systems',
    difficulty: 'medium',
  },
  {
    id: 'eb11',
    question: 'What is an exposed-conductive-part?',
    answer: 'Metalwork of the installation that is not live, but could become live under fault.',
    reference: 'BS 7671 Part 2, definitions',
    category: 'Earthing Systems',
    difficulty: 'easy',
  },
  {
    id: 'eb12',
    question: 'What is an extraneous-conductive-part?',
    answer:
      'Metalwork that is not part of the installation but can introduce a potential, usually earth potential.',
    reference: 'BS 7671 Part 2, definitions',
    category: 'Earthing Systems',
    difficulty: 'easy',
  },
  {
    id: 'eb13',
    question: 'Give two examples of an extraneous-conductive-part.',
    answer: 'Metal water or gas service pipes, and structural steelwork.',
    reference: 'BS 7671 Reg 411.3.1 (protective equipotential bonding); Reg 544.1.2',
    category: 'Earthing Systems',
    difficulty: 'easy',
  },

  // ── Main earthing terminal ────────────────────────────────────────────
  {
    id: 'eb14',
    question: 'What connects to the main earthing terminal?',
    answer:
      'The earthing conductor, the main protective bonding conductors, and the circuit protective conductors.',
    reference: 'BS 7671 Reg 542.4.1',
    category: 'MET',
    difficulty: 'easy',
  },
  {
    id: 'eb15',
    question: 'Why must the main earthing terminal stay accessible?',
    answer: 'So the earthing conductor can be disconnected to test the earthing arrangement.',
    reference: 'BS 7671 Reg 542.4.2',
    category: 'MET',
    difficulty: 'easy',
  },

  // ── Main protective bonding ───────────────────────────────────────────
  {
    id: 'eb16',
    question: 'Minimum main protective bonding conductor where the supply PEN is 35 mm² or less?',
    answer: '10 mm² copper, or the copper equivalent in another material.',
    reference: 'BS 7671 Table 54.8',
    category: 'Main Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb17',
    question: 'When does the 6 mm² minimum for main bonding apply?',
    answer:
      "Where the distributor's PEN conductor is 10 mm² copper equivalent or less. Above that, size from Table 54.8.",
    reference: 'BS 7671 Reg 544.1.1 and Table 54.8',
    category: 'Main Bonding',
    difficulty: 'hard',
  },
  {
    id: 'eb18',
    question: "What must you do if the distributor's PEN conductor size is unknown?",
    answer:
      'Ask the distributor for the copper equivalent size before choosing the bonding conductor.',
    reference: 'BS 7671 Reg 544.1.1',
    category: 'Main Bonding',
    difficulty: 'hard',
  },
  {
    id: 'eb19',
    question: 'Where is main bonding connected when the gas meter is INSIDE the building?',
    answer: 'Within 600 mm of the meter outlet union.',
    reference: 'BS 7671 Reg 544.1.2',
    category: 'Main Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb20',
    question: 'Where is main bonding connected when the meter is OUTSIDE the building?',
    answer: 'At the point of entry of the service into the building.',
    reference: 'BS 7671 Reg 544.1.2',
    category: 'Main Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb21',
    question: 'Which side of the meter must main bonding connect to?',
    answer: "The consumer's side.",
    reference: 'BS 7671 Reg 544.1.2',
    category: 'Main Bonding',
    difficulty: 'easy',
  },
  {
    id: 'eb22',
    question: 'Is main bonding required on a TT installation, or only on TN?',
    answer: 'On every system where extraneous-conductive-parts are present.',
    reference: 'BS 7671 Reg 411.3.1 (protective equipotential bonding)',
    category: 'Main Bonding',
    difficulty: 'easy',
  },
  {
    id: 'eb23',
    question:
      'A plastic water main enters the building but the internal pipework is copper. Bond it?',
    answer: 'Test continuity to earth first — bond it only if it can introduce a potential.',
    reference: 'BS 7671 Part 2, definition of extraneous-conductive-part',
    category: 'Main Bonding',
    difficulty: 'hard',
  },
  {
    id: 'eb24',
    question: 'Main bonding to the gas is missing on a PME supply. What EICR code?',
    answer: 'C1 — danger present.',
    reference: 'BS 7671 Reg 411.3.1; IET Guidance Note 3 on EICR coding',
    category: 'Main Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb25',
    question: 'Why is missing main bonding on a PME supply so dangerous?',
    answer:
      'If the PEN conductor fails, the unbonded pipework can sit at a very different potential from the installation.',
    reference: 'BS 7671 Reg 411.3.1; ESQCR on PME',
    category: 'PME',
    difficulty: 'hard',
  },

  // ── Supplementary bonding ─────────────────────────────────────────────
  {
    id: 'eb26',
    question:
      'Minimum supplementary bonding conductor between two extraneous-conductive-parts, mechanically protected?',
    answer: '2.5 mm² copper.',
    reference: 'BS 7671 Reg 544.2.3',
    category: 'Supplementary Bonding',
    difficulty: 'easy',
  },
  {
    id: 'eb27',
    question: 'Minimum supplementary bonding conductor where it is NOT mechanically protected?',
    answer: '4 mm² copper.',
    reference: 'BS 7671 Reg 544.2.3',
    category: 'Supplementary Bonding',
    difficulty: 'easy',
  },
  {
    id: 'eb28',
    question: 'How many conditions must be met to omit supplementary bonding in a bathroom?',
    answer: 'Three, and all of them.',
    reference: 'BS 7671 Reg 701.415.2',
    category: 'Supplementary Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb29',
    question: 'First condition for omitting supplementary bonding in a bathroom?',
    answer:
      'Every final circuit in the location meets the disconnection times for automatic disconnection.',
    reference: 'BS 7671 Reg 701.415.2, via Reg 411.3.2',
    category: 'Supplementary Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb30',
    question: 'Second condition for omitting supplementary bonding in a bathroom?',
    answer: 'Every final circuit in the location is protected by a 30 mA RCD.',
    reference: 'BS 7671 Reg 701.415.2',
    category: 'Supplementary Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb31',
    question: 'Third condition for omitting supplementary bonding in a bathroom?',
    answer: 'All extraneous-conductive-parts are connected to the main protective bonding.',
    reference: 'BS 7671 Reg 701.415.2',
    category: 'Supplementary Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb32',
    question: 'Where supplementary bonding IS required, what gets joined together?',
    answer:
      'Every simultaneously accessible exposed-conductive-part and extraneous-conductive-part, including the circuit cpcs.',
    reference: 'BS 7671 Reg 415.2.1',
    category: 'Supplementary Bonding',
    difficulty: 'medium',
  },

  // ── PME ───────────────────────────────────────────────────────────────
  {
    id: 'eb33',
    question: 'What happens to an installation if the PEN conductor breaks on a PME supply?',
    answer: 'It loses its earth reference, and bonded metalwork can rise towards line potential.',
    reference: 'BS 7671 Reg 411.4; ESQCR on PME',
    category: 'PME',
    difficulty: 'hard',
  },
  {
    id: 'eb34',
    question: 'Why is main bonding sized larger on a PME supply?',
    answer: 'The bonding may have to carry neutral return current if the PEN fails.',
    reference: 'BS 7671 Table 54.8, PME columns',
    category: 'PME',
    difficulty: 'medium',
  },
  {
    id: 'eb35',
    question: 'At a caravan park, what must a socket-outlet protective conductor never connect to?',
    answer: 'A PME earthing facility.',
    reference: 'BS 7671 Reg 708.553.1.14',
    category: 'PME',
    difficulty: 'hard',
  },
  {
    id: 'eb36',
    question: 'At a marina, what must a socket-outlet protective conductor never connect to?',
    answer: 'A PME earthing facility.',
    reference: 'BS 7671 Reg 709.553.1.14',
    category: 'PME',
    difficulty: 'hard',
  },
  {
    id: 'eb37',
    question: 'Is a PME earth banned on a construction site?',
    answer: 'Not banned — restricted. It needs reliable bonding of extraneous-conductive-parts.',
    reference: 'BS 7671 Reg 704.411.3.1, and its Note referring to BS 7375',
    category: 'PME',
    difficulty: 'hard',
  },
  {
    id: 'eb38',
    question:
      'Which regulation stops a PME earth reaching the cpc contact of an outdoor EV charging point?',
    answer: '722.411.4.1. The test is where the vehicle charges, not the charger rating.',
    reference: 'BS 7671 Reg 722.411.4.1',
    category: 'PME',
    difficulty: 'hard',
  },
  {
    id: 'eb49',
    question: 'Can a PME earth be used for a mobile or transportable unit?',
    answer: 'No, unless one of the two conditions in the regulation is met.',
    reference: 'BS 7671 Reg 717.411.4',
    category: 'PME',
    difficulty: 'hard',
  },

  // ── Earth electrodes ──────────────────────────────────────────────────
  {
    id: 'eb39',
    question: 'What is the formula behind the maximum earth electrode resistance on a TT system?',
    answer: 'RA × IΔn must not exceed 50 V.',
    reference: 'BS 7671 Reg 411.5.3',
    category: 'Earth Electrodes',
    difficulty: 'medium',
  },
  {
    id: 'eb40',
    question: 'Maximum RA for a 30 mA RCD, from that formula?',
    answer: '1667 Ω — 50 divided by 0.03.',
    reference: 'BS 7671 Table 41.5, 30 mA row',
    category: 'Earth Electrodes',
    difficulty: 'medium',
  },
  {
    id: 'eb41',
    question: 'Above what electrode resistance does BS 7671 warn the value may be unstable?',
    answer: '200 Ω — it can drift as the soil dries or freezes.',
    reference: 'BS 7671 Note 2 to Table 41.5',
    category: 'Earth Electrodes',
    difficulty: 'hard',
  },
  {
    id: 'eb42',
    question: 'What is the three-terminal method used for?',
    answer: 'Measuring the resistance of an earth electrode.',
    reference: 'IET Guidance Note 3, earth electrode resistance testing',
    category: 'Earth Electrodes',
    difficulty: 'medium',
  },
  {
    id: 'eb43',
    question: 'In the three-terminal test, where does the potential spike go?',
    answer: 'At 62% of the distance from the electrode to the current spike.',
    reference: 'IET Guidance Note 3, fall-of-potential method',
    category: 'Earth Electrodes',
    difficulty: 'hard',
  },
  {
    id: 'eb44',
    question: 'Why is the three-terminal test repeated with the potential spike moved?',
    answer:
      'To confirm the readings sit on a plateau, so the result is the true electrode resistance.',
    reference: 'IET Guidance Note 3, fall-of-potential method',
    category: 'Earth Electrodes',
    difficulty: 'hard',
  },

  // ── On site ───────────────────────────────────────────────────────────
  {
    id: 'eb45',
    question: 'You measure Ze of 0.8 Ω. Which earthing system does that suggest?',
    answer: 'TN-S. A PME supply is usually lower.',
    reference: 'IET Guidance Note 3, typical Ze by earthing arrangement',
    category: 'Earthing Systems',
    difficulty: 'medium',
  },
  {
    id: 'eb46',
    question: 'What does a Ze of tens or hundreds of ohms tell you about the supply?',
    answer:
      'It is a TT system — the loop runs through the ground rather than a metallic conductor.',
    reference: 'BS 7671 Part 2, TT arrangement',
    category: 'Earthing Systems',
    difficulty: 'medium',
  },
  {
    id: 'eb47',
    question: 'Before deciding that pipework needs no bonding, what must you do?',
    answer: 'Test its continuity to earth.',
    reference: 'BS 7671 Part 2, definition of extraneous-conductive-part',
    category: 'Main Bonding',
    difficulty: 'medium',
  },
  {
    id: 'eb48',
    question: 'What do you do about bonding when a gas service is replaced with plastic?',
    answer:
      'Retest for continuity to earth. Keep the bonding where any metallic pipework could still introduce a potential.',
    reference: 'BS 7671 Reg 544.1.2; IET Guidance Note 8',
    category: 'Main Bonding',
    difficulty: 'hard',
  },
];
