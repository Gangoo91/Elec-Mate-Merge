import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// AM2 SEO page — content sourced from the in-app course at
// src/pages/apprentice-courses/AM2Module*Section*.tsx, grounded in the NET
// assessment specification. No invented timings, weightings or procedures.

const published = '2026-05-19';
const modified = '2026-05-19';

export const am2SectionEConfig: GeneratedGuideConfig = {
  pagePath: '/guides/am2-section-e-online-knowledge-test',
  title: 'AM2 Section E — Online Knowledge Test (1 hour, 30 Questions)',
  description:
    'AM2 Section E: 60-minute online test, 30 multiple-choice questions on BS 7671, electrical science, H&S, inspection + testing. Format, navigation, prep strategy.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'AM2 Section E',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'AM2 Section E',
  heroPrefix: 'AM2 Section E:',
  heroHighlight: 'AM2 Section E — Online Knowledge Test',
  heroSuffix: '— 1 hour, 30 questions, multiple choice',
  heroSubtitle:
    "Section E is the online knowledge test. 60 minutes, 30 multiple-choice questions covering BS 7671, electrical science, health and safety, and inspection + testing procedures. You can navigate forward and back, flag uncertain questions and return to them. The lowest-time-pressure section of the AM2 — but easy marks are still left on the table by candidates who don't prepare.",
  keyTakeaways: [
    'Section E is 60 minutes for 30 multiple-choice questions — about 2 minutes per question.',
    'Core topics: BS 7671 Wiring Regulations, cable calculations + protective device selection, health + safety requirements, inspection + testing procedures.',
    'You can navigate forward and backwards through the test. Flag questions you are unsure of and return to them.',
    'Open-book or closed-book varies by centre — most centres allow BS 7671 alongside but check before the day.',
    'Pass mark is set per question — get the question right or wrong, no partial credit. Aim to answer every question.',
    'Most candidates who fail Section E ran out of time on tricky questions instead of flagging + moving on.',
  ],
  sections: [
    {
      id: 'what-section-e-covers',
      heading: 'What Section E covers',
      tocLabel: 'What Section E covers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Section E is the online knowledge test — the only written component of the AM2. 60 minutes, 30 multiple-choice questions delivered through the NET online testing platform. Topics: BS 7671 Wiring Regulations (largest weighting), electrical science + theory, cable calculations + protective device selection, health + safety legislation, inspection + testing procedures. Each question has four options; pick one. You can flag questions, navigate forward and back, and review before submitting.',
        },
      ],
    },
    {
      id: 'format',
      heading: 'Test format + navigation',
      tocLabel: 'Test format + navigation',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Duration: 60 minutes total.',
            'Questions: 30 multiple-choice, four options each.',
            'Delivery: online via the NET testing platform at the assessment centre.',
            'Navigation: forward + backwards allowed. Flag uncertain questions.',
            'Review: end-of-test review screen shows answered + flagged + skipped.',
            'No partial credit — each question is right or wrong.',
          ],
        },
      ],
    },
    {
      id: 'topic-areas',
      heading: 'Core topic areas',
      tocLabel: 'Core topic areas',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'BS 7671 Wiring Regulations — Chapter 41 (Protection Against Electric Shock), Chapter 43 (Overcurrent), Chapter 53 (Switchgear), Appendix 4 (Current-Carrying Capacity + Voltage Drop). The biggest section by question count.',
            'Cable calculations + protective device selection — Zs limits, ADMD, cable sizing, MCB / RCBO / RCD types.',
            'Health + safety legislation — HSWA 1974, EAWR 1989, CDM 2015, GS38, Manual Handling Regs.',
            'Inspection + testing procedures — GN3 sequence, test voltages, BS 7671 minimum values.',
            'Electrical science — Ohms Law, single + three-phase calculations, power factor.',
          ],
        },
      ],
    },
    {
      id: 'strategy',
      heading: 'Strategy that picks up easy marks',
      tocLabel: 'Strategy that picks up easy …',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'First pass — answer everything you know quickly. Flag anything you are unsure of and move on.',
            'Second pass — return to flagged questions. Read the question again, eliminate wrong options.',
            'Third pass — never leave a question unanswered. Even an educated guess has a 1-in-4 chance.',
            'Time budget — aim for 2 minutes per question on the first pass. That leaves 30 minutes for review.',
            'Watch for "all of the above" + "none of the above" — they catch out candidates who pattern-match.',
            'BS 7671 questions — if open-book, look up the reg. Do not guess on a reg you can check.',
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common mistakes in Section E',
      tocLabel: 'Common mistakes in Section E',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Spending too long on the first hard question. Flag it and come back.',
            'Leaving questions blank — you lose those marks for certain when an educated guess might have scored.',
            'Misreading the question — especially "NOT" or "EXCEPT" qualifiers.',
            'Not checking which test voltage applies to which circuit (250V vs 500V vs 1000V).',
            'Confusing Type AC / Type A / Type B / Type F RCDs and where each is required.',
            'Forgetting that BS 7671 + GN3 + the On-Site Guide are all separate documents with slightly different scope.',
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
      question: 'How long is the AM2 online knowledge test?',
      answer:
        'Section E is 60 minutes for 30 multiple-choice questions — exactly 2 minutes per question if you spread evenly. The realistic strategy is faster on questions you know (45-60 seconds), slower on tricky ones, with the last 15-20 minutes reserved for reviewing flagged questions.',
    },
    {
      question: 'How many questions are in the AM2 knowledge test?',
      answer:
        '30 multiple-choice questions, each with four options. You select one answer per question. There is no partial credit — each question is right or wrong. The pass threshold is set against the full 30-question paper.',
    },
    {
      question: 'Can I go back to questions I have answered in the AM2 knowledge test?',
      answer:
        'Yes. The online test allows free navigation forward and backwards. You can flag questions you are unsure of and return to them. The end-of-test review screen highlights any unanswered or flagged questions before final submission.',
    },
    {
      question: 'Is the AM2 knowledge test open-book?',
      answer:
        'It depends on the assessment centre. Most centres allow BS 7671 (the IET Wiring Regulations) at the desk during Section E. Some also permit GN3. Confirm with your centre before the day and bring tabbed copies — flicking through BS 7671 unprepared eats into your 60-minute budget. Some questions are designed to be looked up; others rely on memory.',
    },
    {
      question: 'What topics come up in the AM2 knowledge test?',
      answer:
        'BS 7671 dominates — particularly Chapter 41 (shock protection), Chapter 43 (overcurrent), Chapter 53 (switchgear), and Appendix 4 (cable sizing + voltage drop). Cable calculations + protective device selection are heavily tested. H&S legislation (HSWA, EAWR, CDM, GS38) appears every paper. Inspection + testing sequence and instrument use from GN3 round out the question set.',
    },
  ],
  faqHeading: 'AM2 Section E — FAQ',
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
