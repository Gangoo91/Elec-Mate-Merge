import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 SEO page — content sourced from the in-app course at
// src/pages/apprentice-courses/AM2Module*Section*.tsx, grounded in the NET
// assessment specification. No invented timings, weightings or procedures.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2SectionAConfig: GeneratedGuideConfig = {
  pagePath: '/guides/am2-section-a-composite-installation',
  title: 'AM2 Section A — Composite Installation (8h 30min) | NET Spec',
  description:
    'AM2 Section A1 + A2-A5: composite installation. 8 hours 30 minutes — the longest section. Cable, containment, terminations, drawings, time management.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'AM2 Section A',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Section A',
  heroPrefix: 'AM2 Section A:',
  heroHighlight: 'AM2 Section A — Composite Installation',
  heroSuffix: '— 8 hours 30 minutes — the longest section',
  heroSubtitle:
    'Section A is the AM2 composite installation — 8 hours 30 minutes of cable selection, containment, circuit installation, terminations and final connections, all to the drawing and BS 7671. The longest single section by far, and the one most candidates lose marks on through poor first-hour planning.',
  keyTakeaways: [
    'Section A is 8 hours 30 minutes — the longest section by far. About 50% of total AM2 time.',
    'Marked on workmanship, drawing compliance, BS 7671 compliance and time management. Rushed work loses marks even when electrically safe.',
    'Cable size must match the drawing exactly. Using 2.5mm² where the spec calls for 4mm² is non-compliance regardless of whether the install passes testing.',
    'Containment — trunking, conduit, tray — must be installed straight, level, with neat bends. Conduit edges must be deburred or you lose workmanship marks.',
    'ELV and mains conductors must be segregated where the spec requires it. Mixing them is a fail for spec non-compliance + safety breach.',
    'The 8h 30min splits roughly: ~2 hours marking out + containment, ~2 hours cable pulling + dressing, ~2.5 hours terminations + connections, ~2 hours testing + documentation.',
  ],
  sections: [
    {
      id: 'what-section-a-covers',
      heading: 'What Section A actually covers',
      tocLabel: 'What Section A actually covers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Section A is the composite installation. You install a complete electrical installation from drawings — typically including a sub-main, distribution board, multiple final circuits (lighting, power, motor, special-location), containment (conduit, trunking, tray), terminations and accessories. Section A1 covers the risk assessment and initial setup. Section A2-A5 covers the actual installation work. The assessor is watching the whole time — your method, your decisions, your workmanship — not just the finished product.',
        },
      ],
    },
    {
      id: 'time-breakdown',
      heading: 'Time breakdown within Section A (8.5 hours total)',
      tocLabel: 'Time breakdown within Sectio…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Phase 1 — Marking Out + Containment (~2 hours): set out cable routes, mark accessory positions, install trunking, conduit and tray to drawing.',
            'Phase 2 — Cable Pulling + Dressing (~2 hours): pull cables through containment, dress neatly, label at both ends, allow service loops.',
            'Phase 3 — Terminations + Connections (~2.5 hours): make off cable ends, terminate at accessories and distribution board, label every conductor.',
            'Phase 4 — Testing + Documentation (~2 hours): dead tests, live tests, complete the EIC schedule, hand over to the assessor.',
          ],
        },
      ],
    },
    {
      id: 'what-assessors-look-for',
      heading: 'What assessors mark you on',
      tocLabel: 'What assessors mark you on',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Drawing compliance — cable size, circuit count, accessory positions all to spec.',
            'BS 7671 compliance — protective devices, RCD selection, segregation, special-location rules.',
            'Workmanship — trunking lids flush, conduit deburred, bend radii correct, terminations tight.',
            'Cable management — neat dressing, glanded SWA, supported runs, no kinked bends.',
            'Documentation — every circuit labelled, schedule of inspections complete, EIC schedule populated.',
            'Time management — finished on schedule with all sections of the install complete.',
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common mistakes that lose marks',
      tocLabel: 'Common mistakes that lose ma…',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Cutting conduit and not deburring — sharp edges damage cable insulation and fail workmanship.',
            'Pulling cables too tight, not allowing service loops at accessories.',
            'Trunking lid not flush or installed crooked — visible on the assessor walkaround.',
            'SWA glands fitted incorrectly — armouring not properly terminated, lack of earth continuity.',
            'Wrong cable size against the drawing — fail for non-compliance regardless of testing result.',
            'Time over-run on the first phase, leaving inadequate time for terminations + testing.',
            'Missing segregation between ELV and mains where the spec required it.',
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
      question: 'How long is Section A of the AM2?',
      answer:
        'Section A is 8 hours 30 minutes total, split between A1 (Risk Assessment + Initial Setup) and A2-A5 (Composite Installation). Within those 8.5 hours you complete marking out, containment, cable pulling, terminations and final connections. Most centres run it as a fixed schedule with no extensions — you finish on time or the section is incomplete.',
    },
    {
      question: 'What is a composite installation in the AM2?',
      answer:
        'A composite installation in the AM2 is an installation that combines multiple wiring methods on the same job — conduit, trunking, cable tray, SWA, clipping direct. You will typically install a sub-main, a small distribution board, and several final circuits (lighting, power, motor or special location). The point is to demonstrate competence across the range of methods rather than just one.',
    },
    {
      question: 'Can I use a different cable size to what is on the drawing?',
      answer:
        'No. The AM2 marks you on drawing + specification compliance. Even if your alternative cable size is electrically safe and passes testing, using the wrong size loses marks for non-compliance. Always install to the exact spec the drawing calls for. If you genuinely believe the spec is wrong, query it with the assessor before deviating.',
    },
    {
      question: 'Does workmanship really matter, or is it just about it being safe?',
      answer:
        'Workmanship is graded separately from safety. The AM2 marks both — your installation must be safe AND it must be neat, flush, level, deburred, properly labelled. A safe-but-rushed install with sloppy trunking and untidy cable dressing will lose marks. The mindset is: the assessor is photographing every detail, so make it presentable.',
    },
    {
      question: 'How do I manage time across the 8.5 hours of Section A?',
      answer:
        "Use the four-phase mental model: ~2 hours marking out + containment, ~2 hours cable pulling + dressing, ~2.5 hours terminations + connections, ~2 hours testing + documentation. Time-box yourself against those phases and check on the half-hour. The candidates who finish complete are the ones who don't overrun phase 1.",
    },
  ],
  faqHeading: 'AM2 Section A — FAQ',
  relatedPages: [
    {
      href: '/guides/am2-overview-and-structure',
      title: 'AM2 Assessment Structure',
      description: 'What AM2 is, the 6 sections, marking criteria + common fail patterns.',
      icon: 'GraduationCap',
      category: 'AM2',
    },
    {
      href: '/guides/am2-section-b-inspection-testing-certification',
      title: 'AM2 Section B — Inspection + Testing (3.5h)',
      description: 'GN3 dead-then-live sequence + EIC certification.',
      icon: 'ClipboardCheck',
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
