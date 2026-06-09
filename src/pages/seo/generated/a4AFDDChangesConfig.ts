import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.
// AFDD requirements, prohibitions and exemptions match the canonical text.

const published = '2026-05-17';
const modified = '2026-05-18';

export const a4AFDDChangesConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-a4-2026-afdd-changes',
  title:
    'BS 7671 A4:2026 — AFDD Changes Explained (Reg 421.1.7 + Item 4.23)',
  description:
    'Amendment 4 redrafted Regulation 421.1.7 to make AFDDs mandatory in four premises types and added EICR inspection item 4.23. What\'s mandatory, what\'s prohibited (medical, medical IT, EV charging exemption), what evidence inspectors need and the operational test.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'A4:2026 Change',
  badgeIcon: 'Zap',
  breadcrumbLabel: 'A4 AFDD Changes',
  heroPrefix: 'BS 7671 A4:2026',
  heroHighlight: 'AFDD',
  heroSuffix: 'Changes (Reg 421.1.7 + Item 4.23)',
  heroSubtitle:
    'Amendment 4 redrafted Regulation 421.1.7 so that AFDDs (Arc Fault Detection Devices) conforming to BS EN 62606 are now mandatory — not just recommended — in four premises types, and added a dedicated AFDD line to the redrafted Condition Report inspection schedule (item 4.23). This guide maps every A4 AFDD touch-point: where required, where recommended, where prohibited, and how to record it.',
  answerBox: {
    question: 'What did BS 7671 Amendment 4 (A4:2026) change for AFDDs?',
    answer:
      'A4:2026 redrafted Regulation 421.1.7 so AFDDs (to BS EN 62606) are now mandatory on single-phase AC final circuits supplying socket-outlets up to 32 A in high-rise residential buildings, HMOs, purpose-built student accommodation and care homes. For all other premises they are recommended. A4 also added EICR inspection item 4.23 to confirm AFDD operation.',
  },
  keyTakeaways: [
    'A4:2026 redrafted Regulation 421.1.7: AFDDs conforming to BS EN 62606 are now MANDATORY (the wording is "shall") on single-phase AC final circuits supplying socket-outlets rated up to 32 A in four named premises types — previously this was only a recommendation.',
    'The four mandatory premises are: high-rise residential buildings (HRRBs), houses in multiple occupation (HMOs), purpose-built student accommodation, and care homes. For all other premises AFDDs are recommended, not required.',
    'AFDDs detect series and parallel arcing faults that conventional MCBs (overload/short-circuit) and RCDs (residual current) cannot — they protect against fire from arcing in installation wiring.',
    'Where used, AFDDs shall be placed at the origin of the circuit they protect (Regulation 421.1.7), and shall conform to BS EN 62606.',
    'AFDDs are prohibited in medical locations of group 0, 1 and 2 (Regulation 710.421.1.7) and in any circuit supplied by a medical IT system (Regulation 710.421.1.7.101). EV charging equipment conforming to the BS EN 61851 series is exempt under Regulation 722.421.1.7.201.',
    'A4 redrafted the model forms: the EICR inspection schedule now carries item 4.23 — "Confirmation of indication that AFDD(s) are operational" (cross-referencing 421.1.7, 532.6 and 651.2(e)) — and the schedule of test results was split into a separate schedule of circuit details and schedule of test results.',
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
            'BS 7671 has recognised AFDD as a protective device for some years, but A4:2026 went further: it redrafted Regulation 421.1.7 to make AFDDs a requirement (not just a recommendation) in named premises, and it added a dedicated AFDD line to the redrafted Condition Report inspection schedule — item 4.23, "Confirmation of indication that AFDD(s) are operational". So every A4-compliant EICR now explicitly records whether AFDD operation has been confirmed, and flags where AFDDs should have been fitted but were not.',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            'MCB / fuse — trips on overload and short-circuit only. Cannot detect a low-current arc that never exceeds the rated current.',
            'RCD — trips on residual (earth-leakage) current. A series or line-to-line arc produces no residual current, so an RCD does not see it.',
            'AFDD (BS EN 62606) — analyses the high-frequency current signature of an arc and disconnects. This is the only one of the three that targets arcing faults directly.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Series vs parallel arcs',
          text:
            'A series arc forms in line with the load — a loose terminal, a broken strand, a damaged flex — and the current stays at or below the load current, so overcurrent protection never operates. A parallel arc forms between conductors (line-to-line or line-to-neutral), often from crushed or nailed cable. An AFDD is designed to recognise both signatures.',
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
            'Regulation 421.1.7 of BS 7671:2018+A4:2026 is the controlling rule. The redrafted wording reads that AFDDs conforming to BS EN 62606 "shall be provided" for single-phase AC final circuits supplying socket-outlets with a rated current not exceeding 32 A in four specific premises types. "Shall" makes this a requirement, not a recommendation, in those premises.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'High-rise residential buildings (HRRBs) — assumed to mean residential buildings over 18 m in height or more than six storeys, whichever is reached first.',
            'Houses in multiple occupation (HMOs).',
            'Purpose-built student accommodation.',
            'Care homes.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The requirement is scope-limited: it applies to single-phase AC final circuits supplying socket-outlets rated up to 32 A. Where AFDDs are used, Regulation 421.1.7 requires them to be placed at the origin of the circuit being protected (for busbar systems to BS EN 61439-6 and powertrack to BS EN 61534, the AFDD may sit elsewhere). Fitting an AFDD does not remove the need for the other protective measures in BS 7671.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Recommendation vs requirement',
          text:
            'For all premises other than the four named above, Regulation 421.1.7 recommends AFDDs for single-phase AC final circuits supplying socket-outlets up to 32 A — it does not mandate them. On an EICR, a missing AFDD where 421.1.7 requires one (e.g. an HMO socket circuit) is typically a C2; where AFDDs are only recommended, their absence is usually an improvement recommendation (C3). See [EICR Code C2 — Potentially Dangerous](/guides/eicr-code-c2-potentially-dangerous) for how these are coded.',
        },
        {
          type: 'paragraph',
          text:
            'Outside the standard installations covered by 421.1.7, specific Part 7 locations have their own AFDD rules — for example, Regulation 710.421.1.201 sets installation requirements for AFDDs within medical locations (Section 710), and the EV charging rules in Section 722 (below) provide a conditional exemption.',
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
            'Circuits in medical locations of group 0, 1 and 2 — Regulation 710.421.1.7 ("AFDDs shall not be used in circuits in medical locations of group 0, 1 and 2"). All three medical-location groups are covered by this prohibition.',
            'Any circuit supplied by an IT system specified as a medical IT system in Regulation 710.411.6 — Regulation 710.421.1.7.101 ("AFDDs shall not be used in circuits supplied by IT systems specified as medical IT systems"). The standard states no exception to this.',
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
            'Regulation 722.421.1.7.201 states that AFDDs are not required for circuits supplying EV charging equipment conforming to the BS EN 61851 series that incorporate socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2. The exemption reflects the fault-detection capability built into compliant charge-point electronics.',
        },
        {
          type: 'list',
          items: [
            'Conformity to the BS EN 61851 series, with socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2 — this is the condition the exemption is built on.',
            'Acceptable evidence includes the manufacturer\'s declaration of conformity, markings on the charge point, and datasheets or test reports.',
            'Where that evidence is not available, the standard AFDD requirements re-apply to that EV charging final circuit.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For the wider EV charging picture — RCD types, PEN-fault protection and the rest of Section 722 — see the [BS 7671 Amendment 4 (2026) overview](/guides/bs-7671-amendment-4-2026).',
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
            'On the A4:2026 Condition Report inspection schedule, item 4.23 reads "Confirmation of indication that AFDD(s) are operational" and cross-references Regulations 421.1.7, 532.6 and 651.2(e). The inspector confirms, across the inspected installation, that fitted AFDDs are operational — and identifies where AFDDs are required but absent. Item 4.23 is typically completed as one of:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Acceptable — AFDDs are fitted where required and all confirm operational indication or pass the manual test.',
            'Unacceptable — AFDDs are missing on circuits where 421.1.7 requires them (typically C2), or fitted AFDD operational indication is absent or failed.',
            'Improvement recommended — AFDD is recommended but not required for the premises (typically C3).',
            'Limitation / Not applicable — for example an EV charging circuit covered by the BS EN 61851 series exemption.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why three cross-references',
          text:
            'Item 4.23 ties three regulations together: 421.1.7 (the requirement to provide AFDDs), 532.6 (the selection and erection rules for AFDDs — installed at the origin of the final circuit, in AC single-phase circuits not exceeding 230 V, conforming to BS EN 62606) and 651.2 (periodic inspection). The inspection item is the point where all three are checked on a Condition Report.',
        },
      ],
    },
    {
      id: 'schedule-of-test-results',
      heading: 'Recording AFDDs on the Schedule of Test Results',
      tocLabel: 'Schedule of test results',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 redrafted the model forms so that the single-page generic schedule of test results was split into a separate schedule of circuit details and a separate schedule of test results. AFDD information is captured per circuit alongside the rest of the protective-device data. Practically, that means recording, circuit by circuit:',
        },
        {
          type: 'list',
          items: [
            'Whether an AFDD is fitted to the circuit, and its type / model where it is.',
            'Confirmation of operational indication — the status indication is present (and, where the device has a manual test facility, that the test facility operates per the manufacturer\'s instructions).',
            'For an AFDD with an automatic self-test function, the manufacturer\'s instructions should be taken into account when interpreting the test-button behaviour.',
            'Where an AFDD is required by Regulation 421.1.7 but absent, a cross-reference to the corresponding observation on the Condition Report (item 4.23).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Form layout differs by certificate body',
          text:
            'A4 standardised the data to be captured, but the exact box layout and any internal numbering vary between certificate templates and software. The key is that the schedule of test results carries the per-circuit AFDD status and that it agrees with item 4.23 on the inspection schedule.',
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
            'Functional testing of AFDDs falls under the functional-testing requirements of Part 6 (Regulation 643.10): where an AFDD is installed, the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturer\'s recommendations. This functional check does not replace the type-test carried out to the device\'s product standard. The On-Site Guide also advises that an AFDD with a manual test facility should be operated six-monthly by the user.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Visually confirm the AFDD status indication is showing operational (green LED, "ready" indication, or equivalent per the manufacturer).',
            'Operate the test button — the device should disconnect and the indication should change state.',
            'Reset the device and confirm it returns to the operational state. Where the AFDD also has an automatic self-test function, follow the manufacturer\'s instructions on test-button behaviour.',
            'Record the per-circuit result on the schedule of test results and confirm item 4.23 ("AFDD(s) operational") on the inspection schedule.',
            'If indication is absent or the test fails, record the AFDD as defective, raise an observation on the Condition Report with the appropriate classification code, and advise remedial action.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'User instruction: six-monthly test',
          text:
            'Where an installation includes an AFDD with a manual test facility, the user instructions should tell the occupier to test it six-monthly by pressing the test button — and to seek expert advice if the device does not disconnect. It is good practice to leave a clear AFDD test notice with the documentation at handover.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Do I need an AFDD on every domestic circuit under A4:2026?',
      answer:
        'No. A4:2026 does not introduce a blanket "AFDD on every circuit" rule. Regulation 421.1.7 makes AFDDs mandatory only on single-phase AC final circuits supplying socket-outlets up to 32 A in four premises types: high-rise residential buildings, HMOs, purpose-built student accommodation and care homes. For a standard owner-occupied house they are recommended, not required. Many electricians fit AFDD-RCBOs as a future-proof default, but it is not mandated for every domestic circuit.',
    },
    {
      question: 'Which premises must have AFDDs under A4:2026?',
      answer:
        'Regulation 421.1.7 names four: high-rise residential buildings (taken as over 18 m or more than six storeys), houses in multiple occupation (HMOs), purpose-built student accommodation, and care homes. In those premises, AFDDs conforming to BS EN 62606 shall be provided on single-phase AC final circuits supplying socket-outlets rated up to 32 A, placed at the origin of the circuit. For all other premises the same protection is recommended.',
    },
    {
      question: 'Can I retrofit AFDDs to an existing consumer unit?',
      answer:
        'Sometimes. Many modern AFDDs are dimensioned to fit a standard DIN-rail slot in a current-standards consumer unit — an MCB or RCBO can often be swapped for an AFDD-RCBO combination device. Older consumer units may not have the depth or busbar configuration to accept an AFDD. Where retrofit is not practical, full consumer unit replacement is the cleaner path, especially as A4 also brings the luminaire RCD requirement (411.3.4) and other model-form changes — a single consumer unit replacement addresses multiple A4 compliance gaps at once.',
    },
    {
      question: 'Does an AFDD replace the need for an RCD?',
      answer:
        'No — they protect against different fault modes. RCDs detect residual (earth-leakage) current; under A4 Regulation 411.3.3 applies to socket-outlets rated up to 32 A, and the new Regulation 411.3.4 requires 30 mA RCD additional protection for luminaire final circuits in domestic (household) premises. AFDDs detect arcing fault current and are required where Regulation 421.1.7 applies. Modern consumer-unit devices often combine RCD and AFDD functions in one DIN-rail unit, but they remain functionally separate protective measures.',
    },
    {
      question: 'How do I record an AFDD on a circuit that\'s prohibited from having one?',
      answer:
        'If during an inspection you find an AFDD on a circuit where AFDDs are prohibited — a medical location of group 0, 1 or 2, or a circuit supplied by a medical IT system — record an observation on the Condition Report citing Regulation 710.421.1.7 or 710.421.1.7.101 as applicable. The remedial action is to remove or disable the AFDD; the change is recorded on the circuit documentation and the client informed.',
    },
    {
      question: 'Are AFDDs required for EV chargers under A4:2026?',
      answer:
        'EV charging equipment conforming to the BS EN 61851 series is exempt from AFDD requirements under Regulation 722.421.1.7.201 — the charge point\'s internal protection electronics provide equivalent fault-detection capability. The exemption is conditional on evidence of conformity to BS EN 61851 (manufacturer declaration, datasheet, test report). For charge points without that evidence, the standard AFDD requirements re-apply.',
    },
    {
      question: 'What\'s the cost implication of A4 AFDD changes for a typical EICR?',
      answer:
        'For a domestic owner-occupied EICR, the extra time to verify and record AFDD status under item 4.23 and on the schedule of test results is minor — a few minutes per circuit. The real cost comes with remedial work. As indicative market guidance only (not a quote), AFDD-RCBO retrofits are often in the region of £40-£80 per circuit at trade prices, and a full consumer unit replacement frequently lands around £700-£1,500. Under the PRS electrical safety regulations, an EICR with a C2 on a required-but-missing AFDD starts a 28-day remedial window.',
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
      description: 'Digital A4:2026 EICR with item 4.23 AFDD inspection and per-circuit AFDD status on the schedule of test results.',
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
    'Elec-Mate\'s digital EICR ships the A4:2026 model form: item 4.23 AFDD inspection, the redrafted schedule of test results, and per-circuit AFDD status.',
};
