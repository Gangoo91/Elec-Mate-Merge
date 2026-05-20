import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// BS 7671 Chapter 41 — Protection Against Electric Shock (Exam Prep) — apprentice / electrician / employer content.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const EighteenthEditionChapter41ProtectionAgainstElectricShockExamConfig: GeneratedGuideConfig =
  {
    pagePath: '/guides/18th-edition-chapter-41-protection-against-electric-shock-exam',
    title: 'BS 7671 Chapter 41 — Protection Against Electric Shock',
    description:
      'Chapter 41 is the single most-tested chapter in the 18th Edition exam — Automatic Disconnection of Supply (ADS), maximum Zs values, RCD requirements…',
    datePublished: published,
    dateModified: modified,
    readingTime: 11,
    badge: 'Exam Prep',
    badgeIcon: 'GraduationCap',
    breadcrumbLabel: 'BS 7671 Chapter 41 — Protection ...',
    heroPrefix: 'BS 7671 Chapter 41 — Protection Against Electric Shock (Exam Prep):',
    heroHighlight: 'Complete 2026 Guide',
    heroSuffix: '— For UK Electrical Trade',
    heroSubtitle:
      'Chapter 41 is the single most-tested chapter in the 18th Edition exam — Automatic Disconnection of Supply (ADS), maximum Zs values, RCD requirements, and the protective measures hierarchy. This guide is for electricians studying for the 18th Edition exam — Chapter 41 deep-dive.',
    keyTakeaways: [
      'ADS (Automatic Disconnection of Supply) under Section 411 is the primary protective measure for most installations.',
      'Disconnection times: 0.4s for ≤32A final circuits on TN system, 0.2s on TT system. 5s for distribution circuits..',
      'Maximum Zs values are in Tables 41.3 (for protective devices in BS EN 60898 / BS EN 61009) — memorise the common ones.',
      'Section 415 covers additional protection — 30mA RCDs for sockets up to 32A, supplementary equipotential bonding in special locations.',
      'Section 411.3.3 — RCD additional protection for socket circuits (the famous "30mA RCD" rule).',
      'A4:2026 changes Chapter 41 slightly — clarifications on TN-C-S (PNB) earthing and RDC-DD for EV circuits.',
    ],
    sections: [
      {
        id: 'ads-hierarchy',
        heading: 'The ADS Hierarchy',
        tocLabel: 'The ADS Hierarchy',
        blocks: [
          {
            type: 'paragraph',
            text: 'Chapter 41 establishes a protective hierarchy: (1) Basic protection — preventing contact with live parts (insulation, barriers). (2) Fault protection via ADS — disconnecting fault current within the required time. (3) Additional protection — 30mA RCD as a final safety net. Most exam questions test the ADS calculations. Memorise: Ohm\u2019s Law applied to the fault circuit: I_fault = U_o / Z_fault, where Z_fault = R_phase + R_neutral + R_cpc (or Z_e + R_1 + R_2 in measurement terms).',
          },
        ],
      },
      {
        id: 'disconnection-times',
        heading: 'Disconnection Times by Earthing System',
        tocLabel: 'Disconnection Times by Ea...',
        blocks: [
          {
            type: 'paragraph',
            text: 'Final circuits ≤32A: TN system 0.4s. TT system 0.2s. Distribution circuits and final circuits >32A: TN 5s, TT 1s. The exam tests whether you can identify which case applies. The Zs you measure must be ≤ the value in Table 41.3 for the protective device + nominal voltage. RCDs change the calculation — if the circuit has a 30mA RCD upstream, you can use the higher RCD-based Zs values in Table 41.5.',
          },
        ],
      },
      {
        id: 'max-zs-tables',
        heading: 'Maximum Zs Tables (41.3, 41.4, 41.5)',
        tocLabel: 'Maximum Zs Tables (41.3, ...',
        blocks: [
          {
            type: 'paragraph',
            text: 'Table 41.3 — fuses to BS 88-3 (common on industrial supplies). Table 41.4 — circuit breakers Type B / C / D to BS EN 60898 (most domestic / commercial). Table 41.5 — RCDs (1A operates within 1s, but for ADS purposes typically just need to confirm the 30mA RCD operates within the times). Memorise Type B 6A / 16A / 32A Zs values — they come up every exam.',
          },
        ],
      },
      {
        id: 'section-415-additional-protection',
        heading: 'Section 415 — Additional Protection',
        tocLabel: 'Section 415 — Additional ...',
        blocks: [
          {
            type: 'paragraph',
            text: '30mA RCD protection is mandatory for: sockets up to 32A in dwellings (Reg 411.3.3). Final circuits supplying mobile equipment ≤32A outdoors. Circuits supplying luminaires in dwellings (Reg 411.3.4). Special locations (700-series). A4:2026 added: Reg 421.1.7.101 — AFDD mandatory in HMOs, care homes, residential high-rise (also Chapter 4-related).',
          },
        ],
      },
      {
        id: 'special-locations-link',
        heading: 'Cross-Reference: 700-Series Special Locations',
        tocLabel: 'Cross-Reference: 700-Seri...',
        blocks: [
          {
            type: 'paragraph',
            text: 'Chapter 41 protection requirements extend through the Section 700-series (Section 701 bathrooms, 702 swimming pools, 705 agricultural, 706 caravan parks, 710 medical, 717 mobile units, 722 EV charging, 740 amusement parks, 753 floor and ceiling heating). The exam regularly asks "what additional protection is required in Section 70X?" — typically supplementary bonding + 30mA RCD + reduced Zs.',
          },
        ],
      },
      {
        id: 'practice-questions',
        heading: 'Typical Exam Questions on Chapter 41',
        tocLabel: 'Typical Exam Questions on...',
        blocks: [
          {
            type: 'paragraph',
            text: '"A 32A radial circuit in 4mm² has a measured Zs of 1.2Ω. Is this compliant for a Type B MCB?" (Reg 411.4.4 Type B 32A — maximum Zs 1.37Ω at 230V using Cmin 0.95 — compliant.) "What is the maximum disconnection time for a 16A socket circuit on a TT system?" (0.2s.) "Reg 411.3.3 requires RCD protection on what circuits?" (Sockets ≤32A in dwellings.) Practice 30+ of these.',
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
      {
        question: 'Who is this guide for?',
        answer:
          'This guide is written for electricians studying for the 18th Edition exam — Chapter 41 deep-dive. The advice is practical, UK-specific, and based on current 2026 regulations.',
      },
      {
        question: 'How does Elec-Mate help with this?',
        answer:
          'Elec-Mate covers every part of the UK electrical apprentice + electrician journey. Unit revision, AM2 mocks, OTJ tracking, quoting, certification, scheme paperwork. 7-day free trial.',
      },
      {
        question: 'Is the content updated for 2026?',
        answer:
          'Yes — every page reflects 2026 regulatory thresholds, scheme fees, and market rates as of May 2026. We update annually as rules change.',
      },
      {
        question: 'What if I need specific advice for my situation?',
        answer:
          'Speak to: your college tutor (apprentices), your scheme operator (NICEIC, NAPIT, ELECSA, Stroma for qualified electricians), your accountant (for business owners). Elec-Mate\u2019s AI specialist can also answer specific scenario questions instantly.',
      },
      {
        question: 'How long does it take to act on this guide?',
        answer:
          'Most actionable items can be completed within 1-12 weeks. Longer commitments (qualification, scheme membership) are noted explicitly in the text.',
      },
      {
        question: 'Where can I find more guides like this?',
        answer:
          'See our full apprentice + qualification hub at elec-mate.com/guides — every unit revision page, AM2 deep-dive, year-by-year plan, and business owner guide is indexed there.',
      },
    ],
    howToHeading: 'Five-Step Action Plan',
    howToDescription: 'Based on the guide above.',
    howToSteps: [
      {
        name: 'Read the full guide above',
        text: 'Get familiar with every section. Details matter — skim then read carefully.',
      },
      {
        name: 'Identify your priority',
        text: 'Pick the single most important action for your situation today.',
      },
      {
        name: 'Take a concrete step within 7 days',
        text: 'Inertia is the biggest barrier. Do ONE concrete thing this week.',
      },
      {
        name: 'Track progress in Elec-Mate',
        text: 'Use the Elec-Mate dashboard for the relevant tier (apprentice, electrician, business owner).',
      },
      {
        name: 'Review in 90 days',
        text: 'Most decisions need a 90-day review. Did it work? Adjust and try the next thing.',
      },
    ],
    relatedPages: [
      {
        href: '/guides/18th-edition-amendment-4-2026-exam-prep',
        title: '18th Edition A4:2026 Exam Prep',
        description:
          'Related guide for electricians studying for the 18th Edition exam — Chapter 41 deep-dive.',
        icon: 'GraduationCap',
        category: 'Guide',
      },
      {
        href: '/tools/earth-loop-impedance-calculator',
        title: 'Earth Loop Impedance Calculator',
        description:
          'Related guide for electricians studying for the 18th Edition exam — Chapter 41 deep-dive.',
        icon: 'Calculator',
        category: 'Guide',
      },
      {
        href: '/tools/disconnection-time-calculator',
        title: 'Disconnection Time Calculator',
        description:
          'Related guide for electricians studying for the 18th Edition exam — Chapter 41 deep-dive.',
        icon: 'Calculator',
        category: 'Guide',
      },
      {
        href: '/guides/bs-7671-a4-2026-afdd-changes',
        title: 'AFDD Changes A4:2026',
        description:
          'Related guide for electricians studying for the 18th Edition exam — Chapter 41 deep-dive.',
        icon: 'ShieldCheck',
        category: 'Guide',
      },
      {
        href: '/guides/mock-exams-electrician',
        title: 'Mock Exams',
        description:
          'Related guide for electricians studying for the 18th Edition exam — Chapter 41 deep-dive.',
        icon: 'ClipboardCheck',
        category: 'Guide',
      },
      {
        href: '/guides/bs-7671-18th-edition-guide',
        title: '18th Edition Guide',
        description:
          'Related guide for electricians studying for the 18th Edition exam — Chapter 41 deep-dive.',
        icon: 'BookOpen',
        category: 'Guide',
      },
    ],
    ctaHeading: 'Start Free with Elec-Mate',
    ctaSubheading:
      'Join 1,000+ UK electrical apprentices, electricians, and business owners using Elec-Mate. 7-day free trial.',
  };
