/**
 * PAT — maintaining portable electrical equipment.
 *
 * Source: `~/Desktop/hav/HSE-HSG107-Maintaining-portable-equipment.pdf`,
 * read from the PDF text. HSG107 is HSE guidance (free, Crown copyright) and
 * is the document the PAT Testing course and the in-app PAT certificate both
 * ultimately answer to.
 *
 * 🔴 The single most valuable thing in this set is what HSG107 does NOT say:
 * there is no legally mandated PAT interval, and "PAT testing" is only the
 * third of three levels of maintenance. Most people asking about PAT are
 * asking the wrong question, and the cards say so.
 *
 * ⚠️ HSG107's Table 1 gives SUGGESTED INITIAL intervals as a starting point
 * for a maintenance plan — not durations to be quoted as requirements. The
 * cards deliberately teach the risk-assessment principle rather than a table
 * of numbers that would be read as law.
 */
import { FlashcardData } from './types';

export const patTesting: FlashcardData[] = [
  // ── The three levels ────────────────────────────────────────────────────
  {
    id: 'pat1',
    question: 'What are the three levels of maintenance for portable equipment in HSG107?',
    answer:
      'User checks, formal visual inspection, and combined inspection and test (the bit people call "PAT"). Testing is the third and least frequent level, not the whole system.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat2',
    question: 'Who can carry out user checks and formal visual inspections?',
    answer:
      'They do not require an electrician. HSG107 describes a straightforward, inexpensive system where user checks and formal visual inspections can be done by a suitably instructed person.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat3',
    question: 'What should a user look for before using equipment?',
    answer:
      'Damage to the supply cable (fraying or cuts), a cracked plug or bent pins, taped or inadequate joints, the outer sheath not secured where it enters the plug (coloured cores showing), wet or contaminated equipment, damaged casing, loose parts or screws, and burn marks or discolouration.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'pat4',
    question: 'When should a user check be made?',
    answer:
      'When the equipment is taken into use, and during use. It is not a once-a-year event — and it applies equally to extension leads, plugs and sockets.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat5',
    question: 'Why is a combined inspection and test needed at all if visual checks catch most faults?',
    answer:
      'Because some faults cannot be seen — loss of earth integrity such as a broken earth wire inside a flexible cable, deterioration of insulation, or internal contamination. Only a combined visual inspection and test finds those reliably.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'pat6',
    question: 'Name the three situations where a combined inspection and test is likely to be justified.',
    answer:
      'Where there is reason to suppose the equipment is defective and visual examination cannot confirm it; after any repair or modification; and at periods appropriate to the equipment, its use and its environment.',
    category: 'Safety',
    difficulty: 'hard',
  },

  // ── Frequency — the big misconception ───────────────────────────────────
  {
    id: 'pat7',
    question: 'How often must portable appliances be tested by law?',
    answer:
      'There is no fixed legal interval. Determining frequency is a matter of judgement by the dutyholder, based on an assessment of risk — carried out as part of the general risk assessment.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat8',
    question: 'What is HSG107 Table 1 actually for?',
    answer:
      'It gives SUGGESTED INITIAL intervals — starting points when implementing a maintenance plan, for anticipated average use. It is not a schedule of legal requirements.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'pat9',
    question: 'What happens to intervals under more demanding conditions of use?',
    answer:
      'They shorten — more demanding conditions require more frequent formal visual inspections and/or combined inspections and tests. A site drill is not a desk lamp.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat10',
    question: 'Name factors that shape how often equipment should be examined.',
    answer:
      'Frequency of use and duty cycle, the environment it is used in, and analysis of previous records of maintenance, formal visual inspection and combined inspection and testing.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'pat11',
    question: 'Why do previous records matter when setting intervals?',
    answer:
      'Because they are evidence. If a class of equipment keeps failing, the interval is too long; if nothing ever fails, the interval may be shortened unnecessarily. The plan is meant to respond to what you find.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Classes ─────────────────────────────────────────────────────────────
  {
    id: 'pat12',
    question: 'How does Class I equipment achieve safety?',
    answer:
      'It relies on its exposed metallic parts being effectively earthed. Lose that earth connection and the exterior can become live — with potentially fatal results.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat13',
    question: 'How does Class II equipment achieve safety?',
    answer:
      'Through high-integrity insulation — double insulated construction. It does not have, and does not need, an earth connection to remain safe.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat14',
    question: 'You cannot see a double-insulation symbol on an appliance. What do you assume?',
    answer:
      'That it is Class I. HSG107 is explicit — if the symbol is not visible, assume the equipment is a Class I appliance and treat it accordingly.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'pat15',
    question: 'What voltage does HSG107 treat as capable of giving a fatal shock?',
    answer:
      'More than 50 V AC or 120 V DC. Above that, equipment is assumed to be at a voltage that can kill.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'pat16',
    question: 'What is the scope limit of HSG107?',
    answer:
      'It covers Class I and Class II equipment. Other classes fall outside its guidance.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat17',
    question: 'A client insists everything must be "PAT tested annually". How do you answer?',
    answer:
      'Explain that there is no such legal requirement — the duty is to maintain equipment so it is safe, using user checks, formal visual inspection and, where justified, combined inspection and test, at intervals set by risk assessment.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'pat18',
    question: 'Do extension leads and plugs need the same attention as appliances?',
    answer:
      'Yes — HSG107 applies the user checks explicitly to extension leads, plugs and sockets. They are among the most abused items on any site.',
    category: 'Safety',
    difficulty: 'easy',
  },
];
