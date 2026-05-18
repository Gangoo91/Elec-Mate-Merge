import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// BS 7671 Appendix 4 — Cable Current Rating (Exam Prep) — apprentice / electrician / employer content.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const EighteenthEditionAppendix4CableCurrentRatingExamConfig: GeneratedGuideConfig = {
  pagePath: '/guides/18th-edition-appendix-4-cable-current-rating-exam',
  title: 'BS 7671 Appendix 4 — Cable Current Rating (Exam Prep)',
  description: 'Appendix 4 is the most-used part of BS 7671 in the exam — current-carrying capacity, installation methods, grouping factors, voltage drop.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Exam Prep',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'BS 7671 Appendix 4 — Cable Curre...',
  heroPrefix: 'BS 7671 Appendix 4 — Cable Current Rating (Exam Prep):',
  heroHighlight: 'Complete 2026 Guide',
  heroSuffix: '— For UK Electrical Trade',
  heroSubtitle:
    'Appendix 4 is the most-used part of BS 7671 in the exam — current-carrying capacity, installation methods, grouping factors, voltage drop. Master Appendix 4 navigation and you save minutes per question. This guide is for electricians revising Appendix 4 for the 18th Edition exam.',
  keyTakeaways: [
    'Appendix 4 tables: 4D1A to 4D5A cover most common cable types (twin and earth, SWA, single insulated).',
    'Installation Method (Reference Method A-G) is the column you look up first — wrong method = wrong reading.',
    'Correction factors: ambient temperature (Ca), grouping (Cg), thermal insulation (Ci) — multiply all together.',
    'Voltage drop is in mV/A/m — multiply by current and length to get total volt drop.',
    'A4:2026 keeps Appendix 4 structure largely unchanged from A3:2024.',
    'Tab the most-used tables (4D1A, 4D2A, 4D4A) in your physical book before the exam.',
  ],
  sections: [
    {
      id: 'navigation',
      heading: 'Appendix 4 Navigation',
      tocLabel: 'Appendix 4 Navigation',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tables are organised: 4D1A / 4D1B — single-core thermoplastic (PVC) insulated. 4D2A / 4D2B — multi-core thermoplastic (twin and earth, three-core etc). 4D4A / 4D4B — single-core LSF (lower smoke). 4D5A / 4D5B — multi-core SWA armoured. The "A" tables give current-carrying capacity; the "B" tables give voltage drop. Plus Tables 4A — installation method (Reference Method) selection. Tables 4B / 4C — correction factors.',
        },
      ],
    },
    {
      id: 'reference-methods',
      heading: 'Reference Methods (Tables 4A1, 4A2)',
      tocLabel: 'Reference Methods (Tables...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Method A — in conduit in a thermally insulated wall. Method B — in conduit on a wall. Method C — clipped direct. Method D — buried direct in ground. Method E — multi-core in free air. Method F — multi-core in free air with spacing. Method G — single-core in free air with spacing. Reference Method is the SINGLE biggest factor in cable current-carrying capacity — wrong method gives wildly wrong answers.',
        },
      ],
    },
    {
      id: 'correction-factors',
      heading: 'Correction Factors (Tables 4B1, 4C)',
      tocLabel: 'Correction Factors (Table...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ambient temperature (Ca) — 30°C is the reference; higher ambient reduces capacity. Grouping (Cg) — Table 4C1 / 4C2 for multiple cables in containment. Thermal insulation (Ci) — Table 52.2; cables in or surrounded by insulation are reduced (e.g. 0.78 for cable above insulating ceiling). Multiply ALL applicable factors together: I_z_actual = I_z_tabulated × Ca × Cg × Ci.',
        },
      ],
    },
    {
      id: 'voltage-drop',
      heading: 'Voltage Drop Calculation',
      tocLabel: 'Voltage Drop Calculation',
      blocks: [
        {
          type: 'paragraph',
          text: 'Voltage drop = (mV/A/m × I_b × L) / 1000 in volts. Compare to the 3% / 5% limits in Reg 525.202 (3% for lighting, 5% for other circuits, both at 230V nominal). For example: 2.5mm² T&E Method C, 32A circuit, 30m length, mV/A/m = 18 (from Table 4D2B). Volt drop = (18 × 32 × 30) / 1000 = 17.3V = 7.5% — fails the 5% limit. Increase cable size.',
        },
      ],
    },
    {
      id: 'three-phase-correction',
      heading: 'Three-Phase Voltage Drop',
      tocLabel: 'Three-Phase Voltage Drop',
      blocks: [
        {
          type: 'paragraph',
          text: 'For three-phase, the voltage drop in mV/A/m tables is the per-phase value. The line-to-line voltage drop = √3 × per-phase drop. The 5% limit applies to the line-to-line nominal voltage (400V), so 5% = 20V line-to-line = 11.5V per phase. Get this mixed up and you under-size three-phase cables.',
        },
      ],
    },
    {
      id: 'practice-strategy',
      heading: 'Appendix 4 Exam Strategy',
      tocLabel: 'Appendix 4 Exam Strategy',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tab Table 4D2A (twin and earth current carrying), Table 4D2B (twin and earth voltage drop), Table 4A2 (installation method), Table 4C1 (grouping factors), and Table 4B1 (ambient correction). Practice 20+ cable-sizing scenarios before the exam — given the load, length, method, ambient and grouping, work out the cable size to comply with both current capacity AND voltage drop.',
        },
      ],
    },
    {
      id: 'study-with-elec-mate',
      heading: 'Use Elec-Mate to Track and Study',
      tocLabel: 'Elec-Mate',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate is built for UK electrical apprentices, qualified electricians, and business owners. Unit revision, AM2 mocks, OJT tracking, quoting, certification — all in one place. 7-day free trial.',
        },
      ],
    },
  ],
  faqs: [
    { question: 'Who is this guide for?', answer: 'This guide is written for electricians revising Appendix 4 for the 18th Edition exam. The advice is practical, UK-specific, and based on current 2026 regulations.' },
    { question: 'How does Elec-Mate help with this?', answer: 'Elec-Mate covers every part of the UK electrical apprentice + electrician journey. Unit revision, AM2 mocks, OTJ tracking, quoting, certification, scheme paperwork. 7-day free trial.' },
    { question: 'Is the content updated for 2026?', answer: 'Yes — every page reflects 2026 regulatory thresholds, scheme fees, and market rates as of May 2026. We update annually as rules change.' },
    { question: 'What if I need specific advice for my situation?', answer: 'Speak to: your college tutor (apprentices), your scheme operator (NICEIC, NAPIT, ELECSA, Stroma for qualified electricians), your accountant (for business owners). Elec-Mate\u2019s AI specialist can also answer specific scenario questions instantly.' },
    { question: 'How long does it take to act on this guide?', answer: 'Most actionable items can be completed within 1-12 weeks. Longer commitments (qualification, scheme membership) are noted explicitly in the text.' },
    { question: 'Where can I find more guides like this?', answer: 'See our full apprentice + qualification hub at elec-mate.com/guides — every unit revision page, AM2 deep-dive, year-by-year plan, and business owner guide is indexed there.' },
  ],
  howToHeading: 'Five-Step Action Plan',
  howToDescription: 'Based on the guide above.',
  howToSteps: [
    { name: 'Read the full guide above', text: 'Get familiar with every section. Details matter — skim then read carefully.' },
    { name: 'Identify your priority', text: 'Pick the single most important action for your situation today.' },
    { name: 'Take a concrete step within 7 days', text: 'Inertia is the biggest barrier. Do ONE concrete thing this week.' },
    { name: 'Track progress in Elec-Mate', text: 'Use the Elec-Mate dashboard for the relevant tier (apprentice, electrician, business owner).' },
    { name: 'Review in 90 days', text: 'Most decisions need a 90-day review. Did it work? Adjust and try the next thing.' },
  ],
  relatedPages: [
    {
      href: '/guides/18th-edition-amendment-4-2026-exam-prep',
      title: '18th Edition A4:2026 Exam Prep',
      description: 'Related guide for electricians revising Appendix 4 for the 18th Edition exam.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator',
      description: 'Related guide for electricians revising Appendix 4 for the 18th Edition exam.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/tools/cable-volt-drop-three-phase',
      title: 'Voltage Drop Calculator',
      description: 'Related guide for electricians revising Appendix 4 for the 18th Edition exam.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/guides/correction-factors-guide',
      title: 'Correction Factors Guide',
      description: 'Related guide for electricians revising Appendix 4 for the 18th Edition exam.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/mock-exams-electrician',
      title: 'Mock Exams',
      description: 'Related guide for electricians revising Appendix 4 for the 18th Edition exam.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-18th-edition-guide',
      title: '18th Edition Guide',
      description: 'Related guide for electricians revising Appendix 4 for the 18th Edition exam.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Start Free with Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK electrical apprentices, electricians, and business owners using Elec-Mate. 7-day free trial.',
};
