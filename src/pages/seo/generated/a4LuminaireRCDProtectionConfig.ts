import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.
// Regulation 411.3.4 wording and acceptance criteria match the canonical text.

const published = '2026-05-17';
const modified = '2026-05-17';

export const a4LuminaireRCDProtectionConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
  title:
    'BS 7671 A4:2026 — Luminaire RCD Protection (Regulation 411.3.4) | Elec-Mate',
  description:
    'Amendment 4 introduced Regulation 411.3.4: AC final circuits supplying luminaires in domestic premises require additional 30 mA RCD protection. What it means, what proof inspectors need, and how to record it on the EICR.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'A4:2026 Change',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'A4 Luminaire RCD Protection',
  heroPrefix: 'BS 7671 A4:2026',
  heroHighlight: 'Luminaire RCD',
  heroSuffix: 'Protection (411.3.4)',
  heroSubtitle:
    'Amendment 4 (January 2026) added Regulation 411.3.4 to BS 7671:2018: AC final circuits supplying luminaires in domestic premises must have additional protection by a 30 mA RCD. This guide explains the scope, the inspection evidence required, the EICR item 5.12 entry, and how to remediate non-compliant installations.',
  keyTakeaways: [
    'Regulation 411.3.4 mandates additional RCD protection (≤ 30 mA residual operating current) on AC final circuits supplying luminaires in domestic premises.',
    'The requirement is limited to domestic (household) premises — non-domestic and commercial premises are not in scope of this specific regulation.',
    'EICR inspection item 5.12 now covers luminaire RCD protection — an installation without RCD-protected luminaire circuits in a domestic dwelling is a C2 observation (potentially dangerous).',
    'Evidence of compliance: consumer unit labelling clearly associating each luminaire final circuit with an RCD whose rated residual operating current does not exceed 30 mA.',
    'Existing domestic installations without RCD-protected luminaire circuits are NOT immediately unsafe — but become non-compliant on the next EICR cycle and require remediation (consumer unit replacement, RCBO upgrade, or RCD addition to existing circuits).',
    'Luminaires installed in display stands (commercial / exhibition contexts) have a parallel 30 mA RCD requirement as an alternative to SELV/PELV protection.',
  ],
  sections: [
    {
      id: 'what-changed',
      heading: 'What Amendment 4 Added',
      tocLabel: 'What changed',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026, published 15 April 2026, introduced Regulation 411.3.4. The regulation is a direct mandatory requirement using "shall" — there is no discretionary language. The text applies wherever the conditions are met.',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Regulation 411.3.4 (paraphrased)',
          text:
            'Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires.',
        },
        {
          type: 'paragraph',
          text:
            'Before A4:2026, RCD additional protection was mandatory for socket-outlet circuits (Regulation 411.3.3) and for cables concealed in walls without earthed metallic covering (Regulation 522.6.202). Luminaire final circuits were not specifically covered by an RCD mandate — A4 closed that gap.',
        },
      ],
    },
    {
      id: 'scope-and-applicability',
      heading: 'Where 411.3.4 Applies',
      tocLabel: 'Scope',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The regulation applies specifically and is intentionally bounded. Three conditions must all be true:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'The premises are domestic (household) — used as a dwelling. Not commercial, not industrial, not communal-area-of-MDU.',
            'The circuit is an AC final circuit — not DC, not a distribution circuit feeding a sub-distribution board.',
            'The circuit supplies luminaires — lighting fittings, not socket-outlets that incidentally feed lamps.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Mixed-purpose circuits',
          text:
            'If a final circuit supplies both luminaires and other current-using equipment, the most onerous additional-protection requirement applies. Where luminaires are present, the 30 mA RCD requirement of 411.3.4 must be met for that circuit.',
        },
      ],
    },
    {
      id: 'inspection-item-5-12',
      heading: 'EICR Inspection Item 5.12',
      tocLabel: 'EICR item 5.12',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The A4:2026 model form for the Electrical Installation Condition Report Schedule of Inspections explicitly added luminaire RCD protection under item 5.12. Inspectors check this item on every domestic EICR and record one of:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Acceptable — every AC final circuit supplying luminaires has 30 mA RCD additional protection.',
            'Unacceptable — one or more luminaire final circuits lack 30 mA RCD additional protection. Recorded as C2 observation.',
            'Improvement recommended — context where C3 applies (rare for this item).',
            'Limitation / Not applicable — non-domestic premises, or no AC circuits supplying luminaires.',
          ],
        },
      ],
    },
    {
      id: 'evidence-required',
      heading: 'What Evidence the Inspector Needs',
      tocLabel: 'Evidence',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The acceptance criterion for compliance with Regulation 411.3.4 is specific. The inspector needs to demonstrate that each AC luminaire final circuit is RCD-protected at 30 mA or less:',
        },
        {
          type: 'list',
          items: [
            'Consumer unit labelling clearly identifying each luminaire final circuit, with the associated protective device (RCBO or RCD) marked with its rated residual operating current.',
            'Schedule of test results showing RCD trip times within Table 41.1 limits (for the relevant test current multiple).',
            'Photograph of consumer unit interior showing the RCBOs / RCDs on the luminaire circuits (industry good practice).',
            'For shared-RCD configurations (multiple circuits under one RCD), confirmation via the schedule of circuit details that the luminaire circuit is on a 30 mA RCD-protected bank.',
          ],
        },
      ],
    },
    {
      id: 'remediation',
      heading: 'How to Remediate a Non-Compliant Installation',
      tocLabel: 'Remediation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Many existing domestic installations — particularly those installed before BS 7671:2008+A2 — have luminaire final circuits with no RCD additional protection. Common remediation options:',
        },
        {
          type: 'list',
          items: [
            'Replace the consumer unit with a current-standards all-RCBO board — each circuit gets its own 30 mA RCBO. Most thorough and gives full A4:2026 compliance across all 411.3 requirements.',
            'Replace individual MCBs with 30 mA RCBOs on the luminaire final circuits only — cheaper but circuit-specific. Verify that the existing consumer unit can accept the replacement RCBO and that adjacent circuits don\'t need re-balancing.',
            'Add a 30 mA RCD upstream of the affected circuits — workable for older boards that can\'t accept RCBOs, but loses the per-circuit fault isolation.',
            'For specific high-value installations (heritage / Listed building), specify the remediation to the responsible person with a phased schedule — typically aligned with planned redecoration or rewire.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Issue an EIC or Minor Works Certificate for the remedial work',
          text:
            'Whichever remediation path is chosen, the work itself must be certified — an Electrical Installation Certificate (full board replacement) or Minor Works Certificate (single-circuit upgrade) — and provided to the responsible person and (for rented properties) the local authority under PRS Regs 2020.',
        },
      ],
    },
    {
      id: 'commercial-context',
      heading: 'A Note on Commercial Premises and Display Stands',
      tocLabel: 'Commercial context',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Regulation 411.3.4 itself is scoped to domestic premises. But commercial premises have parallel rules that should be checked:',
        },
        {
          type: 'list',
          items: [
            'Luminaires installed in display stands have a separate 30 mA RCD requirement as an alternative to SELV/PELV protection — the rated residual operating current must be exactly 30 mA. Devices with a different rated residual current do not meet the stated protection method.',
            'Exhibition installations (Section 711) and similar temporary commercial scenarios have section-specific RCD requirements that may exceed the basic Chapter 41 rules.',
            'Commercial premises lighting circuits feeding socket-outlets (e.g. desk lamps via socket-outlets) inherit the Regulation 411.3.3 RCD requirement on those socket-outlets regardless of the luminaire-specific 411.3.4 rule.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is 411.3.4 retrospective — do I need to upgrade every existing house?',
      answer:
        'BS 7671 regulations are not retrospective in the sense of forcing existing-installation upgrades. However, the next EICR for any domestic premises will be assessed against A4:2026, and a non-compliant luminaire final circuit becomes a C2 observation requiring remedial action. For rented properties under PRS Regs 2020, that C2 triggers a 28-day remedial timeline. For owner-occupied properties, there\'s no statutory timeline — but the responsible person now has documented notice that the installation departs from current standards.',
    },
    {
      question: 'Does an old wired-in light bulb pendant count as a "luminaire"?',
      answer:
        'Yes. A luminaire is any apparatus that distributes, filters or transforms light from one or more lamps. A pendant rose with a wired-in lampholder is a luminaire. A bayonet ceiling rose with a separate lamp is a luminaire. The lamp itself is part of the luminaire assembly. Wherever a final circuit terminates at one of these, 411.3.4 applies in domestic premises.',
    },
    {
      question: 'What about emergency lighting circuits in a domestic dwelling?',
      answer:
        'Emergency lighting in domestic premises (rare — typically only in larger HMOs and some flats) is still a luminaire final circuit and falls under 411.3.4. The 30 mA RCD requirement applies. For HMO common areas with emergency lighting, the wider Section 41 + BS 5266 requirements also apply alongside 411.3.4.',
    },
    {
      question: 'Can I share one 30 mA RCD between the luminaire circuit and other circuits?',
      answer:
        'Yes — a single 30 mA RCD can protect multiple final circuits, provided each protected circuit meets its specific additional-protection requirements. However, shared RCD configurations sacrifice fault isolation: a fault on a socket-outlet circuit would trip the same RCD that\'s protecting the luminaire circuit, plunging the area into darkness. Most A4-compliant new installations use all-RCBO consumer units so each circuit has its own residual-current protection.',
    },
    {
      question: 'Does the 30 mA RCD need to be Type A?',
      answer:
        'Not specifically by Regulation 411.3.4 — but other parts of BS 7671 (and practical considerations) push you toward Type A or higher. Type AC RCDs may not detect DC fault current components produced by modern LED drivers and dimmers. Selecting a Type A RCD (or Type F for installations with frequency-converter loads) is professional good practice for luminaire final circuits supplying LED lighting. Type AC is still permitted by 411.3.4 but increasingly inadvisable.',
    },
    {
      question: 'How does this affect the EICR overall assessment?',
      answer:
        'An installation in a domestic dwelling without 30 mA RCD protection on its luminaire final circuits attracts a C2 ("potentially dangerous") observation under EICR item 5.12. Any C2 makes the overall EICR assessment "unsatisfactory" — regardless of how many other observations are recorded. The remedial action must be completed and a follow-up certificate issued (for rented properties within 28 days under PRS Regs 2020).',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) — All Changes',
      description: 'Overview of every A4:2026 change including AFDD, TN-C-S (PNB) and the new model forms.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c2-potentially-dangerous',
      title: 'EICR Code C2 — Potentially Dangerous',
      description: 'How missing luminaire RCD protection is recorded on the EICR Section K.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital EICR with A4:2026 model form including item 5.12 luminaire RCD check.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Verify ADS compliance per Regulation 411 for luminaire final circuits.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/eicr-missing-rcd-socket-outlet',
      title: 'Missing RCD on Socket-Outlet (Regulation 411.3.3)',
      description: 'The longer-standing RCD requirement that also affects EICR outcomes.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-section-710-medical-locations',
      title: 'BS 7671 Section 710 Medical Locations',
      description: 'Where RCD requirements diverge from the general rules (no RCDs on medical IT circuits).',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Comply with A4:2026 on every EICR',
  ctaSubheading:
    'Elec-Mate\'s digital EICR includes the A4:2026 model form with item 5.12 luminaire RCD protection, automatic schedule-of-test-results column population, and per-observation regulation cite. 7-day free trial.',
};
