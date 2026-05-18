import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// BS 7671 Chapter 43 — Overcurrent Protection (Exam Prep) — apprentice / electrician / employer content.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const EighteenthEditionChapter43OvercurrentProtectionExamConfig: GeneratedGuideConfig = {
  pagePath: '/guides/18th-edition-chapter-43-overcurrent-protection-exam',
  title: 'BS 7671 Chapter 43 — Overcurrent Protection (Exam Prep)',
  description: 'Chapter 43 covers overcurrent protection — protective device selection, discrimination, cable adiabatic. The second-most-tested chapter after 41.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Exam Prep',
  badgeIcon: 'GraduationCap',
  breadcrumbLabel: 'BS 7671 Chapter 43 — Overcurrent...',
  heroPrefix: 'BS 7671 Chapter 43 — Overcurrent Protection (Exam Prep):',
  heroHighlight: 'Complete 2026 Guide',
  heroSuffix: '— For UK Electrical Trade',
  heroSubtitle:
    'Chapter 43 covers overcurrent protection — protective device selection, discrimination, cable adiabatic. The second-most-tested chapter after 41. This guide is for electricians studying for the 18th Edition exam — Chapter 43 deep-dive.',
  keyTakeaways: [
    'Protective devices must operate before cable damage threshold — I_n ≤ I_b ≤ I_z (rated ≥ design ≥ tabulated).',
    'Discrimination: upstream device must operate AFTER downstream device for the same fault — critical in large installations.',
    'Adiabatic equation: S ≥ √(I²t)/k for cable cross-section under short-circuit conditions.',
    'Section 433 covers overload protection; Section 434 covers short-circuit protection.',
    'Type B (3-5×In trip), Type C (5-10×In), Type D (10-20×In) — selection depends on the load inrush.',
    'A4:2026 makes small adjustments — most Chapter 43 content remains unchanged from A3:2024.',
  ],
  sections: [
    {
      id: 'device-selection',
      heading: 'Protective Device Selection (Section 433)',
      tocLabel: 'Protective Device Selecti...',
      blocks: [
        {
          type: 'paragraph',
          text: 'The fundamental rule: I_n ≤ I_b ≤ I_z, where I_n is the device rating, I_b is the design current, I_z is the cable\u2019s current-carrying capacity at the installation method, ambient, grouping etc. Plus: I_2 ≤ 1.45 × I_z (the device must operate within the cable\u2019s short-time overcurrent capability). Type B for resistive loads (lighting, sockets), Type C for inductive loads (motors, fluorescent), Type D for very high inrush (transformers, large motors).',
        },
      ],
    },
    {
      id: 'discrimination',
      heading: 'Discrimination Between Devices',
      tocLabel: 'Discrimination Between De...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Critical when you have downstream devices feeding circuits. The upstream device must NOT operate when a downstream device clears a fault. Discrimination is achieved by: time-current characteristics (slower upstream device), current rating (substantially higher upstream), or specific manufacturer charts. The exam often shows a one-line diagram and asks "is discrimination achieved between the 32A Type B downstream and the 100A Type B upstream?" Look up the time-current curves.',
        },
      ],
    },
    {
      id: 'adiabatic-equation',
      heading: 'Adiabatic Equation for Short-Circuit',
      tocLabel: 'Adiabatic Equation for Sh...',
      blocks: [
        {
          type: 'paragraph',
          text: 'For short-circuit protection of cable: S ≥ √(I²t) / k, where I is the short-circuit current, t is the device clearing time, k is the cable insulation constant (115 for thermoplastic copper, 76 for thermoplastic aluminium). The exam will give you I_pf and ask "what is the minimum cpc cross-section under fault conditions?" Compute S, compare against the actual cable cpc, confirm compliance. Practice 20+ of these.',
        },
      ],
    },
    {
      id: 'fuses-vs-mcbs',
      heading: 'Fuses vs MCBs vs RCBOs',
      tocLabel: 'Fuses vs MCBs vs RCBOs',
      blocks: [
        {
          type: 'paragraph',
          text: 'BS 88-3 fuses (still common on industrial supplies) — non-resettable, high breaking capacity. BS EN 60898 MCBs (most domestic / commercial) — resettable, lower breaking capacity. BS EN 61009 RCBOs — MCB + 30mA RCD combined. Exam questions often test which protective device is appropriate for a given application (e.g. "what device protects a 32A radial in a domestic kitchen?" — typical answer 32A RCBO Type A or B).',
        },
      ],
    },
    {
      id: 'a4-2026-changes',
      heading: 'A4:2026 Changes to Chapter 43',
      tocLabel: 'A4:2026 Changes to Chapte...',
      blocks: [
        {
          type: 'paragraph',
          text: 'Most Chapter 43 content is unchanged. A4:2026 clarifications: improved guidance on discrimination calculations, integration with Chapter 443 SPD coordination, and updated examples in the Appendices. The exam tests the same core principles as A3:2024.',
        },
      ],
    },
    {
      id: 'practice-questions',
      heading: 'Typical Exam Questions on Chapter 43',
      tocLabel: 'Typical Exam Questions on...',
      blocks: [
        {
          type: 'paragraph',
          text: '"A 32A circuit has measured I_pf of 1.5kA. With a Type B 32A MCB (clearing time 0.1s at fault current), what is the minimum cpc cross-section?" Calculate S = √(1500² × 0.1) / 115 = 4.13mm² — so minimum 4.0mm² cpc. "Type B vs Type C for a 3kW motor circuit — which is correct?" (Type C — motor inrush 5-7× In.) Practice these systematically.',
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
    { question: 'Who is this guide for?', answer: 'This guide is written for electricians studying for the 18th Edition exam — Chapter 43 deep-dive. The advice is practical, UK-specific, and based on current 2026 regulations.' },
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
      description: 'Related guide for electricians studying for the 18th Edition exam — Chapter 43 deep-dive.',
      icon: 'GraduationCap',
      category: 'Guide',
    },
    {
      href: '/tools/adiabatic-equation-calculator',
      title: 'Adiabatic Equation Calculator',
      description: 'Related guide for electricians studying for the 18th Edition exam — Chapter 43 deep-dive.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator',
      description: 'Related guide for electricians studying for the 18th Edition exam — Chapter 43 deep-dive.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/guides/spd-chapter-443-a4-2026',
      title: 'SPD Chapter 443 A4:2026',
      description: 'Related guide for electricians studying for the 18th Edition exam — Chapter 43 deep-dive.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/mock-exams-electrician',
      title: 'Mock Exams',
      description: 'Related guide for electricians studying for the 18th Edition exam — Chapter 43 deep-dive.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-18th-edition-guide',
      title: '18th Edition Guide',
      description: 'Related guide for electricians studying for the 18th Edition exam — Chapter 43 deep-dive.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Start Free with Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK electrical apprentices, electricians, and business owners using Elec-Mate. 7-day free trial.',
};
