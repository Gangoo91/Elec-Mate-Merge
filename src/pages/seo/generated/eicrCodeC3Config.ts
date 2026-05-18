import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.
// C1/C2/C3/FI classification rules and procedures match GN3 Section 3.

const published = '2026-05-17';
const modified = '2026-05-18';

export const eicrCodeC3Config: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-code-c3-improvement-recommended',
  title:
    'EICR Code C3 — Improvement Recommended | When (and When',
  description:
    'EICR code C3 explained: when "improvement recommended" is the right classification, when it would actually be a C2 in disguise…',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'EICR Observation Code',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'EICR Code C3',
  heroPrefix: 'EICR Code',
  heroHighlight: 'C3',
  heroSuffix: '— Improvement Recommended',
  heroSubtitle:
    'C3 means the installation departs from current BS 7671 — but neither danger nor potential danger is present. Unlike C1 and C2, a C3 does NOT make the EICR "unsatisfactory". This guide explains the exact decision boundary, the most common C3 observations on UK reports, and how to write a C3 that the responsible person will actually act on.',
  keyTakeaways: [
    'C3 means "Improvement recommended." The installation departs from current BS 7671 but does not create danger or potential danger — neither C1 nor C2 applies.',
    'C3 observations do NOT make the overall EICR assessment "unsatisfactory". A report with only C3 observations remains "satisfactory" overall.',
    'C3 shall NOT be used where C1 or C2 evidence exists — the inspector cannot downgrade for convenience or commercial reasons.',
    'Common C3 territory: pre-A4 wiring that pre-dates current requirements but was compliant when installed; "old colours" cables; non-A4 model form artefacts; older but functional consumer units.',
    'A well-written C3 still recommends specific improvement work — vague "could be improved" notes have no remedial value and undermine the report.',
    'C3 observations don\'t trigger the 28-day PRS Regs remedial window in rented properties — but a landlord may still choose to address them at the next maintenance opportunity.',
  ],
  sections: [
    {
      id: 'c3-definition',
      heading: 'What C3 Means',
      tocLabel: 'Definition',
      blocks: [
        {
          type: 'paragraph',
          text:
            'C3 is defined as "Improvement recommended." The classification applies where an observed condition departs from the current edition of BS 7671 in a way that an improvement would address, but the departure does not create danger or potential danger.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'C3 keeps the EICR "satisfactory"',
          text:
            'Unlike C1 and C2, a C3 observation does not change the overall report assessment. An EICR with only C3 observations is recorded as "satisfactory" — the responsible person is informed of potential improvements but no urgent action is required.',
        },
      ],
    },
    {
      id: 'c3-decision-rule',
      heading: 'The C3 Decision Rule (Strict)',
      tocLabel: 'When C3 is allowed',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671 / GN3 are unusually explicit about when C3 can be used. The rule reads as an acceptance criterion:',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cannot use C3 if evidence supports C1 or C2',
          text:
            'C3 ("Improvement recommended") shall be attributed only where C1 ("Danger present") or C2 (potentially dangerous / non-compliant) do not apply. Practitioners shall not use C3 if evidence supports C1 or C2 classifications.',
        },
        {
          type: 'paragraph',
          text:
            'This is to stop commercial pressure (or politeness) from softening serious findings into reassuring "improvement" recommendations. Every inspector encounters the temptation: "the report looks better with no C2s." The acceptance criterion makes that downgrade professional misconduct.',
        },
      ],
    },
    {
      id: 'c3-examples',
      heading: 'Genuine C3 Observations',
      tocLabel: 'C3 examples',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Conditions where C3 is the correct classification — improvement is genuinely recommended but no danger, present or potential, exists:',
        },
        {
          type: 'list',
          items: [
            'Wiring installed under a previous edition of BS 7671 that remains safe, but uses now-superseded methods (e.g. older colour codes in industrial wiring where a clear ID label is present and circuits are functional).',
            'A consumer unit with spare ways but no AFDD where AFDDs are recommended (not required) under A4:2026.',
            'A pre-A4 EICR-compliant installation that does not yet meet the A4:2026 schedule of test results columns — the existing test results remain valid, but the new format would be an improvement at the next inspection cycle.',
            'Use of older but compliant Type AC RCDs in installations where Type A is now generally preferred (outside medical locations where Type AC is explicitly prohibited).',
            'A circuit identification chart not in the latest A4:2026 model form layout, but accurate and legible.',
            'Cable management arrangements that meet older standards (BS EN 50085-2-1) but not the latest IET Code of Practice recommendations on fire-rated sealing.',
          ],
        },
      ],
    },
    {
      id: 'c3-not-c3',
      heading: 'NOT C3 — These Are C2',
      tocLabel: 'Common downgrade mistakes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'These observations are sometimes mis-classified as C3 but should be C2 because the condition is potentially dangerous, not merely a "departure from current standards":',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Missing main protective bonding to extraneous-conductive-parts — C2 (potentially dangerous under fault conditions), not C3.',
            'Plastic consumer unit in HMO escape route — C2 (combustibility / Regulation 421.1.201 with HMO context), not C3.',
            'Missing RCD on a socket-outlet circuit intended for general use — C2 (potential shock risk per Regulation 411.3.3), not C3.',
            'Damaged but contained cable sheath — C2 (degraded protection, foreseeable progression to exposed conductors), not C3.',
            'Borrowed neutral across separate final circuits — C2 (potential for unexpected energisation during isolation), not C3.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The downgrade temptation',
          text:
            'If you find yourself reaching for C3 to "keep the report satisfactory," the chances are high that the evidence supports C2. Re-read the acceptance criterion: C3 shall not be used where evidence supports C1 or C2.',
        },
      ],
    },
    {
      id: 'c3-writing-good-c3',
      heading: 'How to Write a C3 That Gets Acted On',
      tocLabel: 'Writing good C3s',
      blocks: [
        {
          type: 'paragraph',
          text:
            'C3 observations don\'t trigger the legal remedial timeline that C1/C2 trigger — so the responsible person can choose to ignore them. A well-written C3 helps them make an informed decision rather than dismissing the recommendation:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'State the specific BS 7671:2018+A4:2026 regulation the installation departs from.',
            'Describe the practical benefit of the improvement (e.g., "fitting a Type A RCD would extend protection against DC fault current components from modern electronic loads").',
            'Note the typical timeline for addressing the improvement (e.g., "at the next scheduled maintenance opportunity, or sooner if the consumer unit is replaced for any other reason").',
            'Avoid vague language like "this could be improved" — name the specific improvement.',
            'Where the C3 relates to a pre-A4 installation, note that the previous edition was complied with at the time of installation — this avoids implying the original installer was non-compliant.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Does a C3 observation make an EICR "unsatisfactory"?',
      answer:
        'No. Only C1 ("Danger present") and C2 ("Potentially dangerous") observations make the overall EICR assessment "unsatisfactory". An EICR with only C3 observations remains "satisfactory" overall — the responsible person is informed of recommended improvements but no urgent or remedial action is required.',
    },
    {
      question: 'Can I assign C3 to a defect that\'s borderline C2?',
      answer:
        'No. BS 7671 / GN3 are explicit: C3 shall not be used where evidence supports C1 or C2. If a defect could reasonably be classified as either C2 or C3 — and the C2 case is supported by evidence — the inspector must use C2. The acceptance criterion exists precisely to prevent commercial-pressure downgrading.',
    },
    {
      question: 'How long does a landlord have to address a C3?',
      answer:
        'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 only require remedial action on C1 and C2 observations within 28 days. C3 observations are recommendations, not legal requirements — the landlord may choose to address them at the next maintenance opportunity, at the next EICR, when refurbishing, or not at all. The inspector should still record the C3 clearly so the responsible person can make an informed decision.',
    },
    {
      question: 'Is "no AFDD" automatically a C3 under A4:2026?',
      answer:
        'It depends on the location. Amendment 4 (2026) requires AFDDs in some specific circuits (e.g. AFDD-recommended residential consumer-unit configurations under specific risk categories) and prohibits them in others (medical locations group 0 and 2, medical IT systems). Where AFDDs are recommended but not required, absence is typically a C3 in the existing installation context. Where they are required and missing, the classification is C2 because the protection deficiency creates potential danger.',
    },
    {
      question: 'Should pre-2008 plastic consumer units be C2 or C3?',
      answer:
        'It depends on context. Regulation 421.1.201 mandates non-combustible consumer units in domestic premises (introduced January 2016 in BS 7671:2008+A3). For a plastic consumer unit installed pre-2016: in a normal owner-occupied dwelling away from an escape route, C3 is generally appropriate. In an HMO, in an escape route, under a wooden staircase, or with visible heat damage / signs of arcing, C2 becomes the correct classification because the combustibility presents potential danger in that specific context. Document the rationale either way.',
    },
    {
      question: 'Can I list a C3 observation in Section K alongside C1/C2 observations?',
      answer:
        'Yes — all observations regardless of classification are recorded in Section K of the EICR. Each gets a single classification code. The overall assessment is "unsatisfactory" if any C1, C2 or FI codes are present; if only C3 observations are recorded, the overall remains "satisfactory."',
    },
    {
      question: 'Do I need to take photos of C3 observations?',
      answer:
        'Industry good practice but not BS 7671-mandated. Photos help the responsible person understand the recommendation and make commissioning decisions easier later. They also protect the inspector if the classification is later disputed. Every modern digital EICR app supports per-observation photos — use them for C3s as well as C1/C2s.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-code-c1-danger-present',
      title: 'EICR Code C1 — Danger Present',
      description: 'The most serious classification — immediate action before the inspector leaves.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c2-potentially-dangerous',
      title: 'EICR Code C2 — Potentially Dangerous',
      description: 'Urgent remedial action needed — makes the EICR "unsatisfactory".',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-fi-further-investigation',
      title: 'EICR Code FI — Further Investigation Required',
      description: 'When the inspector cannot conclude without additional testing.',
      icon: 'Search',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital EICR aligned to BS 7671:2018+A4:2026 with full C1/C2/C3/FI workflow.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) Summary',
      description: 'What changed in A4:2026 — affects C3 classification of pre-A4 installations.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-observation-codes-explained',
      title: 'EICR Observation Codes — All Codes',
      description: 'Overview of the C1, C2, C3 and FI classification system with worked examples.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Write better C3 observations',
  ctaSubheading:
    'Elec-Mate\'s digital EICR app auto-suggests the correct regulation cite for each C3 observation and lets you save reusable wording. 7-day free trial.',
};
