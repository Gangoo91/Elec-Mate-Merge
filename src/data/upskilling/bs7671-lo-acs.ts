/**
 * BS 7671 18th Edition — Learning Outcomes & Assessment Criteria.
 *
 * Source: City & Guilds 2382 (Level 3 Award in the Requirements for Electrical
 * Installations BS 7671) and the equivalent unit embedded in:
 *   • 5357 Unit 022    (Electrotechnical Apprenticeship Standard)
 *   • 2366-03 Unit 306 (L3 Diploma in Electrotechnical Technology)
 *   • 5393-03 Unit 022 (L3 Electrotechnical in Dwellings)
 *   • EAL 610/3907/X Unit 18ED3-02
 *   • EAL-NETP3 Unit N18ED3/1
 *
 * Live RAG copy: Supabase `qualification_requirements` table (~110 rows for
 * the 18th-edition unit across qualifications).
 *
 * Status: the unit text is still BS 7671:2018 (2022) — the published C&G
 * handbooks have not yet been refreshed for the 2382-26 / A4:2026 award. We
 * teach against A4:2026 regardless; this file just preserves the LO/AC
 * scaffolding so each section can be tagged like the apprentice C&G 2365-02
 * mapping.
 */

export interface AC {
  /** AC code as printed in the C&G handbook (e.g. "1.1"). */
  code: string;
  /** AC text — copied verbatim from the C&G handbook (UK English). */
  text: string;
}

export interface LO {
  /** LO number 1–8. */
  number: number;
  /** LO summary — short, used in section headers. */
  summary: string;
  /** Module in our Study Centre course this LO maps to. */
  module: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  acs: AC[];
}

export const BS7671_UNIT_CITATIONS = [
  'C&G 2382',
  '5357 Unit 022',
  '2366-03 Unit 306',
  '5393-03 Unit 022',
  'EAL 610/3907/X Unit 18ED3-02',
  'EAL-NETP3 Unit N18ED3/1',
] as const;

export const BS7671_LOS: LO[] = [
  {
    number: 1,
    summary: 'Scope, object and fundamental principles',
    module: 1,
    acs: [
      { code: '1.1', text: 'identify the scope of BS 7671' },
      { code: '1.2', text: 'identify the object of BS 7671' },
      { code: '1.3', text: 'identify the fundamental principles of BS 7671.' },
    ],
  },
  {
    number: 2,
    summary: 'Definitions',
    module: 2,
    acs: [
      { code: '2.1', text: 'interpret the definitions used within BS 7671' },
      {
        code: '2.2',
        text: 'relate the definitions to the regulations and appendices of BS 7671.',
      },
    ],
  },
  {
    number: 3,
    summary: 'Assessment of general characteristics (Chapters 31–36)',
    module: 3,
    acs: [
      {
        code: '3.1',
        text: 'interpret the requirements of assessing the general characteristics of electrical installations within the scope of BS 7671 including Chapters 31 (Purpose, supplies and structure), 32 (Classification of external influences), 33 (Compatibility), 34 (Maintainability), 35 (Safety services) and 36 (Continuity of service).',
      },
    ],
  },
  {
    number: 4,
    summary: 'Protection for safety (Chapters 41–46)',
    module: 4,
    acs: [
      {
        code: '4.1',
        text: 'identify the requirements of protection for safety within the scope of BS 7671 including Chapters 41 (Electric shock), 42 (Thermal effects), 43 (Overcurrent), 44 (Voltage disturbances and EMI) and 46 (Isolation and switching).',
      },
      {
        code: '4.2',
        text: 'interpret how this applies to electrical installations within the scope of BS 7671 — protection against electric shock, thermal effects, overcurrent, voltage and electromagnetic disturbances, plus isolation and switching.',
      },
    ],
  },
  {
    number: 5,
    summary: 'Selection and erection of equipment',
    module: 5,
    acs: [
      {
        code: '5.1',
        text: 'identify the requirements for selecting and erecting equipment and interpret how this applies to wiring systems',
      },
      {
        code: '5.2',
        text: 'interpret how this applies to electrical installations within the scope of BS 7671 — common rules; wiring systems; protection, isolation, switching, control and monitoring; earthing arrangements and protective conductors; other equipment; safety services.',
      },
    ],
  },
  {
    number: 6,
    summary: 'Inspection and testing (Chapters 64, 65)',
    module: 6,
    acs: [
      { code: '6.1', text: 'identify the requirements for inspection and testing' },
      {
        code: '6.2',
        text: 'interpret how this applies to electrical installations including Chapter 64 (Initial verification) and Chapter 65 (Periodic inspection and testing).',
      },
    ],
  },
  {
    number: 7,
    summary: 'Special installations or locations (Sections 700–753)',
    module: 7,
    acs: [
      {
        code: '7.1',
        text: 'identify the requirements for special installations including Sections 700, 701 (bath/shower), 702 (swimming pools), 703 (saunas), 704 (construction sites), 705 (agricultural), 706 (restricted-movement), 708 (caravan parks), 709 (marinas), 710 (medical), 711 (exhibitions), 712 (solar PV), 714 (outdoor lighting), 715 (ELV lighting), 717 (mobile units), 721 (caravans), 722 (EV charging), 729 (gangways), 730 (inland navigation shore connections), 740 (fairgrounds), 753 (heating cables).',
      },
      {
        code: '7.2',
        text: 'interpret how these affect the general requirements of the regulations.',
      },
    ],
  },
  {
    number: 8,
    summary: 'Part 8 (Functional requirements) and Appendices',
    module: 8,
    acs: [
      { code: '8.1', text: 'identify the information contained in Part 8 of BS 7671' },
      { code: '8.2', text: 'identify the information in the appendices of BS 7671' },
      {
        code: '8.3',
        text: 'specify how the information contained in the appendices is used to support electrical installation activities.',
      },
    ],
  },
];

/** Lookup helpers ───────────────────────────────────────────────────── */

export function loForModule(module: number): LO | undefined {
  return BS7671_LOS.find((lo) => lo.module === module);
}

export function acByCode(code: string): AC | undefined {
  for (const lo of BS7671_LOS) {
    const ac = lo.acs.find((a) => a.code === code);
    if (ac) return ac;
  }
  return undefined;
}

/**
 * Standard file-header citation used in section files —
 * matches the apprentice 2365-02 pattern.
 */
export function citationForLo(loNumber: number, acCodes: string[]): string {
  return `C&G 2382 / 5357 Unit 022 / LO${loNumber} / AC ${acCodes.join(', ')} (BS 7671:2018+A4:2026)`;
}
