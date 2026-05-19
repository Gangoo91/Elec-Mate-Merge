import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 SEO page — content sourced from the in-app course at
// src/pages/apprentice-courses/AM2Module*Section*.tsx, grounded in the NET
// assessment specification. No invented timings, weightings or procedures.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2SectionBConfig: GeneratedGuideConfig = {
  pagePath: '/guides/am2-section-b-inspection-testing-certification',
  title: 'AM2 Section B — Inspection, Testing + Certification (3h 30min)',
  description:
    'AM2 Section B: 3 hours 30 minutes of inspection, testing and certification. GN3 dead-then-live sequence, IR, EFLI, RCDs, EIC paperwork — what assessors look for.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'AM2 Section B',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Section B',
  heroPrefix: 'AM2 Section B:',
  heroHighlight: 'AM2 Section B — Inspection, Testing + Certification',
  heroSuffix: '— 3 hours 30 minutes — GN3 sequence',
  heroSubtitle:
    'Section B is the inspection, testing and certification phase. 3 hours 30 minutes to verify your install in the correct IET Guidance Note 3 order — dead tests first, then live tests, then complete the EIC paperwork. The sequence is non-negotiable — testing live before all dead tests are satisfactory is an instant fail.',
  keyTakeaways: [
    'Section B is 3 hours 30 minutes of inspection, testing and EIC certification.',
    'The test sequence must follow IET Guidance Note 3 (GN3) order. Assessors mark the sequence as much as the readings.',
    'Continuity of protective conductors is the FIRST test — before insulation resistance, polarity, EFLI or any live work.',
    'Insulation resistance is tested at 500V DC for circuits up to 500V. Minimum acceptable IR is 1.0 MΩ per BS 7671 Table 64.',
    'Live testing only begins after ALL dead tests are complete and satisfactory. Testing live before is an instant fail.',
    'The EIC schedule must be completed accurately — wrong readings, missing entries or unsigned sections lose marks.',
  ],
  sections: [
    {
      id: 'what-section-b-covers',
      heading: 'What Section B covers',
      tocLabel: 'What Section B covers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Section B is the verification stage. You inspect your installation against BS 7671, perform the full test sequence in GN3 order, record every reading on the EIC schedule, and sign the certificate. The assessor watches your method, your test instrument use, your sequence discipline and your paperwork accuracy. Section B is where many candidates lose marks not through technical error but through poor sequence — testing live before dead tests are confirmed, or jumping between tests rather than completing each cleanly.',
        },
      ],
    },
    {
      id: 'gn3-test-sequence',
      heading: 'The GN3 test sequence (the order matters)',
      tocLabel: 'The GN3 test sequence (the o…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Continuity of protective conductors — first test, every time. R1 + R2 method or long-lead method.',
            'Continuity of ring final circuit conductors — if the install includes a ring circuit.',
            'Insulation resistance — at 500V DC for circuits up to 500V. Test L-L, L-N, L-E and N-E as appropriate.',
            'Polarity (dead) — verify L, N and E are correctly connected at every accessory.',
            'Earth electrode resistance — if a TT installation or local electrode is present.',
            'Live testing — only after all dead tests above are complete and satisfactory.',
            'Polarity (live) — verify with a voltage indicator at the supply.',
            'Earth fault loop impedance (Zs) — at every final circuit.',
            'Prospective fault current (Ipf) — at the origin and the furthest point.',
            'RCD testing — operating times at ½× rated, 1× rated, 5× rated. Trip times within BS 7671 limits.',
            'Functional testing — switching, isolators, interlocks, RCDs all operate correctly.',
          ],
        },
      ],
    },
    {
      id: 'what-assessors-look-for',
      heading: 'What assessors mark you on in Section B',
      tocLabel: 'What assessors mark you on i…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Following GN3 order — dead tests in sequence before any live work.',
            'Correct test voltage — 500V for IR on circuits up to 500V; lower for ELV.',
            'Safe instrument use — GS38-compliant probes, fused leads, calibration sticker visible.',
            'Accurate reading + recording — every value on the EIC schedule, no blanks.',
            'Recognising results — knowing when a reading is out of range and acting on it.',
            'Completing the EIC + Schedule of Inspections + Schedule of Test Results in full.',
            'Signing and dating the certificate appropriately.',
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common mistakes in Section B',
      tocLabel: 'Common mistakes in Section B',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Skipping the continuity test on the protective conductor.',
            'Testing IR with the wrong voltage (250V instead of 500V on a 230V circuit).',
            'Going live before all dead tests are complete and satisfactory.',
            'Not proving the voltage indicator before live testing.',
            'Leaving cells blank on the EIC schedule — every cell must have a value or "N/A".',
            'Wrong RCD trip-time pass/fail criteria — confusing the limits for different RCD types.',
            'Forgetting to sign the certificate or wrong date.',
          ],
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Study with Elec-Mate',
      tocLabel: 'Study with Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Elec-Mate apprentice tier covers every AM2 section in detail — 8 modules across ~16.5 hours, 40+ pages of NET-grounded content, plus the AM2 Testing Simulator and Mock Day. Built specifically for UK NVQ Level 3 candidates preparing for the practical assessment.',
        },
        {
          type: 'callout',
          tone: 'info',
          heading: 'AM2 Mock Day — practice under real timings',
          body: 'The Elec-Mate AM2 Mock Day mirrors the real assessment phases with the actual NET timings. Times you on each phase and scores you against the readiness rubric — the closest practice you can get to the real day.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How long is Section B of the AM2?',
      answer:
        'Section B (Inspection, Testing + Certification) is 3 hours 30 minutes. Within that window you complete the full GN3 test sequence on your composite installation from Section A, record every reading on the EIC schedule, and sign the certificate. Time pressure is moderate but not extreme — sequence discipline matters more than speed.',
    },
    {
      question: 'What is the test sequence for the AM2?',
      answer:
        'The AM2 test sequence follows IET Guidance Note 3 (GN3): continuity of protective conductors, continuity of ring final conductors, insulation resistance, polarity (dead), earth electrode resistance if TT, then live testing — polarity (live), earth fault loop impedance Zs, prospective fault current Ipf, RCD operating times, then functional testing. Dead tests must all be satisfactory before any live test.',
    },
    {
      question: 'What is the minimum insulation resistance value?',
      answer:
        'For most circuits operating up to 500V, BS 7671 sets a minimum insulation resistance of 1.0 MΩ. Test voltage is 500V DC. SELV and PELV circuits use 250V DC test voltage. Some critical circuits (fire alarm, emergency lighting) may have higher minimum thresholds — check the relevant BS standard for the application.',
    },
    {
      question: 'When can I start live testing in the AM2?',
      answer:
        'Only after ALL dead tests are complete and satisfactory. This is the single most enforced rule in Section B. Live testing before dead tests are confirmed is an instant fail — it shows the assessor that you do not understand the sequence or the safety reasoning behind it. Confirm every dead test is in the satisfactory range before energising.',
    },
    {
      question: 'What goes wrong with the EIC paperwork?',
      answer:
        "Most paperwork mistakes are mechanical: blank cells, wrong reference to drawings, missing signature, missing date, wrong installation address. Every cell on the EIC schedule needs a value — even N/A counts. Cross-check the schedule against the installation before you sign. Assessor's first action on the certificate is to count the blanks.",
    },
  ],
  faqHeading: 'AM2 Section B — FAQ',
  relatedPages: [
    {
      href: '/guides/am2-overview-and-structure',
      title: 'AM2 Assessment Structure',
      description: 'What AM2 is, the 6 sections, marking criteria + common fail patterns.',
      icon: 'GraduationCap',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-a-composite-installation',
      title: 'AM2 Section A — Composite Installation (8.5h)',
      description: 'The longest section: cable, containment, terminations, time management.',
      icon: 'Wrench',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-c-safe-isolation',
      title: 'AM2 Section C — Safe Isolation (45 min)',
      description: '10-step procedure + 10-point test sequence + six critical fails.',
      icon: 'Lock',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-d-fault-diagnosis',
      title: 'AM2 Section D — Fault Diagnosis (2h)',
      description: 'Typical NET faults + the logical method assessors mark you on.',
      icon: 'Search',
      category: 'AM2',
    },
  ],
};
