import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.
// AFDD requirements, prohibitions and exemptions match the canonical text.

const published = '2026-05-17';
const modified = '2026-05-17';

export const a4AFDDChangesConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-a4-2026-afdd-changes',
  title:
    'BS 7671 A4:2026 — AFDD Changes Explained (Item 4.23 + Test Column 30) | Elec-Mate',
  description:
    'Amendment 4 added AFDD (Arc Fault Detection Device) inspection item 4.23 and EICR test results column 30. What\'s mandatory, what\'s prohibited (medical IT, EV charging exemption), what evidence inspectors need and the operational test.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'A4:2026 Change',
  badgeIcon: 'Zap',
  breadcrumbLabel: 'A4 AFDD Changes',
  heroPrefix: 'BS 7671 A4:2026',
  heroHighlight: 'AFDD',
  heroSuffix: 'Changes (Item 4.23 + Column 30)',
  heroSubtitle:
    'Amendment 4 (January 2026) formally added AFDD (Arc Fault Detection Device) recognition across the BS 7671 model forms: a new inspection item 4.23, a new schedule-of-test-results column 30, and a clearer regulatory map of where AFDDs are required, recommended, or prohibited. This guide explains every A4 AFDD touch-point.',
  keyTakeaways: [
    'AFDDs detect arcing faults that conventional MCBs and RCDs miss — they protect against fire caused by series and parallel arcing in installation wiring.',
    'A4:2026 added EICR inspection item 4.23 for AFDD presence and operational status, plus test results column 30 for the AFDD test record.',
    'AFDDs are mandatory in specific circuits per A4:2026 — see Regulation 421.1.7 and its sub-clauses for the controlling rules in standard installations.',
    'AFDDs are explicitly prohibited in medical locations of group 0 and group 2 (Regulation 710.421.1.7), and in any circuit supplied by a medical IT system (Regulation 710.421.1.7.101).',
    'EV charging equipment conforming to BS EN 61851 series is exempt from AFDD requirements under Regulation 722.421.1.7.201 — manufacturer declaration or test report is acceptable evidence.',
    'Operational acceptance: every AFDD must show clear operational indication (status LED) or pass a functional test. Absent or failed indication means the device is recorded as defective and remedial action is required.',
  ],
  sections: [
    {
      id: 'what-is-an-afdd',
      heading: 'What an AFDD Is and Why A4 Matters',
      tocLabel: 'What is an AFDD',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An Arc Fault Detection Device (AFDD) is a protective device that detects the characteristic high-frequency current signatures of arcing faults — both series arcs (loose terminals, broken conductors) and parallel arcs (cable damage, line-to-line or line-to-neutral arcing). Conventional MCBs trip on overload or short-circuit; RCDs trip on residual current. Neither reliably detects the low-current, intermittent arcs that cause most electrical fires.',
        },
        {
          type: 'paragraph',
          text:
            'BS 7671 has recognised AFDD as a protective device since Amendment 2 (2022), but A4:2026 went further: it formally added AFDD lines to the standard EICR model form (item 4.23) and the test results schedule (column 30). That means every A4-compliant EICR records the presence, type and operational status of every AFDD in the installation — and where AFDDs should have been fitted but were not.',
        },
      ],
    },
    {
      id: 'where-afdd-required',
      heading: 'Where AFDDs are Required Under A4',
      tocLabel: 'Where required',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Regulation 421.1.7 of BS 7671:2018+A4:2026 sets the controlling rules for AFDD requirements in standard installations. The wording uses "shall" — making the requirement mandatory where the conditions apply.',
        },
        {
          type: 'list',
          items: [
            'Higher-risk premises identified in 421.1.7 (the precise list depends on the regulation\'s current sub-clauses — verify against your A4:2026 copy at the design stage).',
            'Specific Part 7 installations — for example, Regulation 710.421.1.201 sets AFDD installation requirements within Chapter 71 for non-prohibited medical contexts.',
            'Where a design risk assessment identifies arcing as a foreseeable initiating mechanism for fire (Regulation 422 considerations).',
            'Where a manufacturer specifies AFDD protection for a particular fitting — the manufacturer\'s requirement combines with BS 7671.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Recommendation vs requirement',
          text:
            'A4:2026 is clearer about the difference between "AFDD shall be used" (mandatory in named circuits) and "AFDD is recommended" (best practice in many circuits). Where AFDD is recommended but not required, absence is typically a C3 ("Improvement recommended") on the EICR; where required and missing, the classification is C2.',
        },
      ],
    },
    {
      id: 'where-afdd-prohibited',
      heading: 'Where AFDDs are Prohibited',
      tocLabel: 'Where prohibited',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 strengthened the medical-location prohibitions. AFDDs are explicitly prohibited in:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Medical locations of group 0 and group 2 — Regulation 710.421.1.7 ("AFDDs shall not be used in circuits in medical locations of group 0 and 2").',
            'Any circuit supplied by an IT system specified as a medical IT system per Regulation 710.411.6 — Regulation 710.421.1.7.101 ("AFDDs shall not be used in circuits supplied by IT systems specified as medical IT systems").',
            'Group 1 medical locations are not in the explicit prohibition list — designers must consult related regulations before fitting AFDDs there.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'If you find an AFDD on a prohibited circuit',
          text:
            'When an AFDD is discovered on a medical IT system circuit during EICR, the responsible person or installer shall remove or disable the AFDD to comply with Regulation 710.421.1.7.101. The change is recorded on the circuit documentation and the client informed.',
        },
      ],
    },
    {
      id: 'ev-charging-exemption',
      heading: 'EV Charging Exemption',
      tocLabel: 'EV charging exemption',
      blocks: [
        {
          type: 'paragraph',
          text:
            'EV charging equipment that conforms to the BS EN 61851 series is exempt from the AFDD requirements under Regulation 722.421.1.7.201. The exemption recognises that the protective architecture built into the charge point\'s internal control electronics provides equivalent fault-detection capability.',
        },
        {
          type: 'list',
          items: [
            'Acceptance evidence: manufacturer declaration of conformity to BS EN 61851 series.',
            'Markings on the charge point indicating compliance with the standard.',
            'Datasheets or test reports demonstrating the equivalent protection.',
            'Where evidence is not available, the standard AFDD requirements re-apply to that EV charging final circuit.',
          ],
        },
      ],
    },
    {
      id: 'eicr-item-4-23',
      heading: 'EICR Inspection Item 4.23 — How to Complete It',
      tocLabel: 'EICR item 4.23',
      blocks: [
        {
          type: 'paragraph',
          text:
            'On the A4:2026 model EICR, item 4.23 records the presence and operational status of AFDDs across the inspected installation. The inspector records one of:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Acceptable — AFDDs are fitted where required, all show correct operational indication or pass the functional test.',
            'Unacceptable — AFDDs are missing on circuits where required (C2), or AFDD operational indication is absent / failed (C2 typically, C3 if intermittent and circuit is otherwise compliant).',
            'Improvement recommended — AFDD is not required but would be advisable (C3).',
            'Limitation / Not applicable — non-applicable installation (e.g., EV-only circuit with BS EN 61851 compliance evidence).',
          ],
        },
      ],
    },
    {
      id: 'test-column-30',
      heading: 'Test Results Column 30 — What to Record',
      tocLabel: 'Test column 30',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The A4:2026 Schedule of Test Results added column 30 for AFDD-specific test data. Per-circuit, the column records:',
        },
        {
          type: 'list',
          items: [
            'Whether an AFDD is fitted (Y/N).',
            'AFDD type / model where fitted.',
            'Test result: operational indication present (LED status) and/or functional test passed.',
            'Where the AFDD has an inbuilt self-test, the date of the last successful self-test reported.',
            'Where AFDD is absent on a circuit where it is required, a cross-reference to the corresponding Section K observation.',
          ],
        },
      ],
    },
    {
      id: 'operational-test',
      heading: 'The Functional Test in Practice',
      tocLabel: 'Functional test',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 sets a clear acceptance criterion: every AFDD shall show clear operational indication (status LED or equivalent) or pass a functional test demonstrating operational readiness. If indication is absent or the functional test fails, the AFDD is recorded as defective and remedial action is required.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Visually confirm the AFDD status indicator (green LED, "ready" indication, or equivalent per manufacturer).',
            'Operate the test button on the AFDD — the device should disconnect and the indicator should change state.',
            'Reset the device and confirm it returns to the operational state.',
            'For AFDDs with internal self-test capability, read the self-test history if accessible (some smart RCBOs / AFDDs log this).',
            'Record the result in test column 30 and, if any failure, raise a Section K observation with appropriate C-code.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Do I need an AFDD on every domestic circuit under A4:2026?',
      answer:
        'No. A4:2026 does not introduce a blanket "AFDD on every circuit" requirement. Regulation 421.1.7 specifies the contexts where AFDD protection is mandatory — primarily in higher-risk premises and named locations. In standard owner-occupied dwellings, AFDD requirements remain risk-based and circuit-specific. Many electricians install all-RCBO + AFDD consumer units as a future-proof default, but it is not mandated for every domestic circuit.',
    },
    {
      question: 'What\'s the difference between Regulation 421.1.6 and 421.1.7?',
      answer:
        '421.1.6 and 421.1.7 are companion regulations within the protection-against-thermal-effects family. 421.1.6 addresses general protective measures including conventional overcurrent protection and the role of RCDs in limiting fire risk. 421.1.7 specifically addresses AFDD requirements — the contexts where AFDD protection is mandatory or strongly recommended, and the special prohibitions in Part 7 locations (medical, EV charging).',
    },
    {
      question: 'Can I retrofit AFDDs to an existing consumer unit?',
      answer:
        'Sometimes. Many modern AFDDs are dimensioned to fit a standard DIN-rail slot in a current-standards consumer unit — an MCB or RCBO can often be swapped for an AFDD-RCBO combination device. Older consumer units may not have the depth or busbar configuration to accept an AFDD. Where retrofit is not practical, full consumer unit replacement is the cleaner path, especially as A4 also brings the luminaire RCD requirement (411.3.4) and other model-form changes — a single consumer unit replacement addresses multiple A4 compliance gaps at once.',
    },
    {
      question: 'Does an AFDD replace the need for an RCD?',
      answer:
        'No — they protect against different fault modes. RCDs detect residual current (earth leakage) and are mandatory under Regulation 411.3.3 for socket-outlets and now 411.3.4 for luminaires. AFDDs detect arcing fault current and are required where 421.1.7 applies. In practice, modern consumer-unit RCBOs include both RCD and AFDD functions in a single DIN-rail device, but they are still functionally separate protective measures.',
    },
    {
      question: 'How do I record an AFDD on a circuit that\'s prohibited from having one?',
      answer:
        'If during EICR inspection you find an AFDD on a circuit where AFDDs are prohibited (medical IT, group 0/2 medical location), record a C2 observation in Section K identifying the prohibition (cite Regulation 710.421.1.7 or 710.421.1.7.101 as applicable). The remedial action is to remove or disable the AFDD. Update test results column 30 to "removed — non-compliant with [regulation cite]" once the work is complete.',
    },
    {
      question: 'Are AFDDs required for EV chargers under A4:2026?',
      answer:
        'EV charging equipment conforming to the BS EN 61851 series is exempt from AFDD requirements under Regulation 722.421.1.7.201 — the charge point\'s internal protection electronics provide equivalent fault-detection capability. The exemption is conditional on evidence of conformity to BS EN 61851 (manufacturer declaration, datasheet, test report). For charge points without that evidence, the standard AFDD requirements re-apply.',
    },
    {
      question: 'What\'s the cost implication of A4 AFDD changes for a typical EICR?',
      answer:
        'For a domestic owner-occupied EICR, the additional time to verify and record AFDD presence under item 4.23 + column 30 is minor — a few minutes per circuit. The cost impact comes when remedial work is needed: retrofitting AFDDs typically costs £40-£80 per circuit at trade prices, or £700-£1,500 for a full all-RCBO + AFDD consumer unit replacement. For landlords under PRS Regs 2020, an EICR with C2 observations on missing AFDDs triggers a 28-day remedial window with associated cost exposure.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) — All Changes',
      description: 'Overview of every A4:2026 change including luminaire RCD, TN-C-S and the new model forms.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection (411.3.4)',
      description: 'The other major Chapter 41 change in Amendment 4 — 30 mA RCD on AC luminaire final circuits.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/afdd-arc-fault-detection',
      title: 'AFDD Arc Fault Detection — Full Guide',
      description: 'What AFDDs detect, how they differ from RCDs, when to specify them.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-section-710-medical-locations',
      title: 'BS 7671 Section 710 Medical Locations',
      description: 'Where AFDDs are explicitly prohibited — and the related medical IT system rules.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital A4:2026 EICR with item 4.23 AFDD inspection and column 30 test recording.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/eicr-code-c2-potentially-dangerous',
      title: 'EICR Code C2 — Potentially Dangerous',
      description: 'How missing-required-AFDD observations are recorded on the EICR Section K.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Issue A4:2026-compliant EICRs',
  ctaSubheading:
    'Elec-Mate\'s digital EICR ships the A4:2026 model form: item 4.23 AFDD inspection, test results column 30, per-circuit AFDD status. 7-day free trial.',
};
