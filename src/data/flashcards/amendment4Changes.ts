/**
 * What changed in BS 7671:2018+A4:2026.
 *
 * The set nobody else will have, and the one most likely to catch out someone
 * working from an older copy — which, in a trade where the Brown Book lives in
 * the van for a decade, is most people.
 *
 * Every card read back from `bs7671_facets`, edition
 * 41c1f30d-4f1a-432f-9e2d-61b91290149f = 2018+A4:2026. Deletions are stated
 * only where a facet explicitly records the deletion; nothing is inferred from
 * a clause merely being absent from a search result, because absence in a RAG
 * is not evidence of deletion in a standard.
 *
 * ⚠️ Not included: the claim that Appendices 7 and 17 were deleted. It is in
 * my notes but did NOT come back from the corpus, and an unverified "this no
 * longer exists" is the most damaging kind of wrong. Add it only against the
 * printed amendment.
 */
import { FlashcardData } from './types';

export const amendment4Changes: FlashcardData[] = [
  // ── Where the big changes are ───────────────────────────────────────────
  {
    id: 'a41',
    question: 'Which chapter of BS 7671 carries the most significant changes in A4:2026?',
    answer:
      'Chapter 41 — Protection against electric shock — and Section 411 (automatic disconnection of supply) in particular. Review 411 afresh rather than assuming the previous edition’s rules survive.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'a42',
    question: 'Which section covering identification and notices was significantly changed by A4:2026?',
    answer:
      'Section 514 (Identification and notices) — a number of significant changes, replacing or modifying earlier requirements and illustrations.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'a43',
    question: 'What brand new section did A4:2026 add to Chapter 53?',
    answer:
      'Section 545 — functional earthing and functional equipotential bonding for information and communication technology (ICT) equipment and systems.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a44',
    question: 'What does the new Section 545 actually cover?',
    answer:
      'Minimum cross-sectional area, identification, electrical continuity of functional bonding conductors, combined protective and functional bonding conductors, and the main functional earthing terminal.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a45',
    question: 'Which two Part 7 sections did A4:2026 change for caravans and EV charging?',
    answer:
      'Section 721 (caravans and motor caravans) and Section 722 (EV charging installations) — covering electrical separation, RCDs, proximity and protective bonding.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'a46',
    question: 'Which Part 7 section got only MINOR changes in A4:2026?',
    answer:
      'Section 715 — extra-low voltage lighting installations. Most of it stands, but still verify the wording rather than assuming.',
    category: 'Regulations',
    difficulty: 'hard',
  },

  // ── Deletions ───────────────────────────────────────────────────────────
  {
    id: 'a47',
    question: 'What happened to Regulation 443.5, the SPD risk assessment method?',
    answer:
      'Deleted. Reg 443.5 is no longer part of the mandatory text and must not be applied as a current requirement.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a48',
    question: 'Which two SPD-related annexes were removed by A4:2026?',
    answer:
      'Annex A443 (examples of calculated risk level, CRL, for use of SPDs) and Annex B443. Neither can be cited as normative any more.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a49',
    question: 'Name two regulations deleted outright in A4:2026 outside of Chapter 44.',
    answer:
      'Regulation 554.4.4 and Regulation 551.8. No operative text remains at either number.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a410',
    question: 'A drawing says "see 514.14 for non-standard colours". What do you do?',
    answer:
      'Treat it as obsolete — 514.14 (non-standard colours) has been deleted, so there is no current text at that number. Find the applicable current clause or the client’s own colour scheme instead.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'a411',
    question: 'Which RCD table was deleted from Appendix 3, and what replaced it?',
    answer:
      'Table 3A — time/current performance criteria for RCDs. Verification is now by the single alternating current test at IΔn; you no longer test against that table.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a412',
    question: 'How should you reference a deleted regulation in a report or certificate?',
    answer:
      'State plainly that it has been deleted in BS 7671:2018+A4:2026 — e.g. "Regulation 554.4.4 has been deleted" — rather than silently citing it or leaving a dangling reference.',
    category: 'Regulations',
    difficulty: 'medium',
  },

  // ── Prosumer installations ──────────────────────────────────────────────
  {
    id: 'a413',
    question: 'What does PEI stand for, and is it within the scope of BS 7671?',
    answer:
      'Prosumer’s low voltage Electrical Installation — a premises that both consumes and produces electricity. Reg 110.1.2 explicitly brings PEI within scope.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'a414',
    question: 'Does BS 7671 cover prosumer installations sited outside a building?',
    answer:
      'Yes — Reg 110.1.2 states the Regulations include prosumer’s low voltage electrical installations INCLUDING those located external to buildings.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a415',
    question: 'Which EV section now has to take account of prosumer installations?',
    answer:
      'Section 722. The A4:2026 update makes reference to prosumer’s electrical installations, so EV charging must be considered alongside on-site generation and storage.',
    category: 'Regulations',
    difficulty: 'hard',
  },

  // ── Notices and certification ───────────────────────────────────────────
  {
    id: 'a416',
    question: 'When can the Regulation 514.12 notices be omitted in a domestic property?',
    answer:
      'Where certification for initial verification, or an EICR complete with the guidance for recipients, has been issued. For domestic or similar premises that certification is an alternative to fixing the notices.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a417',
    question: 'What exactly qualifies as the certificate that removes the 514.12 notice requirement?',
    answer:
      'Either certification for initial verification, or an Electrical Installation Condition Report complete with the guidance for recipients. A bare report without that guidance does not qualify.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a418',
    question: 'Under Reg 644.4.201, when may a Minor Works Certificate be used instead of an EIC?',
    answer:
      'Where the work does NOT include the provision of a new circuit, or the replacement of a distribution board or consumer unit. Either of those pushes you to an EIC.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'a419',
    question: 'Which appendix holds the model forms for the EIC and the Minor Works Certificate?',
    answer:
      'Appendix 6. Reg 644.4.201 defines both certificates as being based on the models given there.',
    category: 'Regulations',
    difficulty: 'easy',
  },
  {
    id: 'a420',
    question: 'What is Section H of the certification paperwork?',
    answer:
      'The Schedule of Inspections — it lists the inspection items to be completed and their outcomes, including intake equipment condition (visual only) and parallel or switched alternative sources of supply.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'a421',
    question: 'Is the Appendix 6 Generic Schedule of Test Results always sufficient?',
    answer:
      'No — it is intended to be broadly applicable, but additional or alternative schedules may be needed for particular installations or special locations. You have to judge whether it fits.',
    category: 'Regulations',
    difficulty: 'hard',
  },

  // ── Other changes and habits ────────────────────────────────────────────
  {
    id: 'a422',
    question: 'What does the commentary at 521.11.201 describe as "a significant change"?',
    answer:
      'The extension of the requirement in Regulation 521.10.202 — its scope and application have been widened, so check where it now bites.',
    category: 'Regulations',
    difficulty: 'hard',
  },
  {
    id: 'a423',
    question: 'Why is working from a pre-A4 copy of BS 7671 genuinely risky?',
    answer:
      'Because A4:2026 both changed clauses and deleted them, and it renumbered content. A rule you remember may now sit at a different number, or not exist at all — and Chapter 41 is among the most changed.',
    category: 'Regulations',
    difficulty: 'medium',
  },
  {
    id: 'a424',
    question: 'What is the safe habit when a clause you expect seems to have moved?',
    answer:
      'Look it up in the current edition rather than relying on the number you remember. A4 renumbered content, so an old number can now point at an entirely different requirement.',
    category: 'Regulations',
    difficulty: 'easy',
  },
];
