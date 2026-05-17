import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition) model form for the Schedule
// of Test Results, plus IET Guidance Note 3 (Inspection & Testing, 9th
// Edition) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-17';

export const a4ScheduleOfTestsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-a4-2026-schedule-of-tests',
  title:
    'BS 7671 A4:2026 — New Schedule of Test Results Columns Explained | Elec-Mate',
  description:
    'Amendment 4 (January 2026) added new columns to the BS 7671 Schedule of Test Results: reference method, maximum permitted Zs, SPD type per board, "Supplied from" field, maximum demand, AFDD column 30. Every new column explained with what to record.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'A4:2026 Model Form',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'A4 Schedule of Tests',
  heroPrefix: 'BS 7671 A4:2026',
  heroHighlight: 'Schedule of Tests',
  heroSuffix: 'New Columns',
  heroSubtitle:
    'Amendment 4 introduced new columns to the Schedule of Circuit Details and Schedule of Test Results. Every electrician issuing certificates under A4:2026 needs to know what each new column captures, where the data comes from, and how to record it correctly. This guide walks through every change.',
  keyTakeaways: [
    'A4:2026 model forms came into effect 15 April 2026 — every EIC, EICR and Minor Works Certificate issued from that date forward should use the new layout.',
    'New columns on the Schedule of Circuit Details: reference method, maximum permitted Zs, "Supplied from" identifier, maximum demand (kVA/A), SPD type per board.',
    'New column on the Schedule of Test Results: column 30 for AFDD test recording.',
    'Section D of the EIC / EICR now requires a safety alerts and product recalls disclaimer — the certificate is point-in-time and post-issue alerts must be checked separately.',
    '"Consumer\'s isolator" terminology was replaced with "Consumer\'s means of isolation" across the model forms — same concept, more precise language.',
    'The A3:2024 model form was formally withdrawn on 15 October 2026 — certificates issued after that date on the old form are non-compliant with the current edition.',
  ],
  sections: [
    {
      id: 'overview',
      heading: 'What Changed and When',
      tocLabel: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 published 15 April 2026. The most visible day-to-day change for inspecting electricians is the new model form layout — every BS 7671 certificate, including the Schedule of Circuit Details and Schedule of Test Results, was redesigned. The A3:2024 form was formally withdrawn six months later, on 15 October 2026, after which it should not be used.',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'A3 → A4 transition window',
          text:
            'Between 15 April and 15 October 2026 either A3:2024 or A4:2026 forms were acceptable. From 15 October 2026 onwards, certificates must use the A4:2026 layout. Software providers (Elec-Mate included) shipped A4-compliant templates aligned to the April 2026 effective date.',
        },
      ],
    },
    {
      id: 'reference-method-column',
      heading: 'Reference Method Column',
      tocLabel: 'Reference method',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 added a "Reference method" column to the Schedule of Circuit Details. The column records the BS 7671 Appendix 4 installation reference method (A, B, C, D, E, F or G) used to size the cable. Previously this was sometimes recorded narratively in the Description column; A4 makes it a dedicated field.',
        },
        {
          type: 'list',
          items: [
            'Method A — single core in conduit (enclosed in thermally insulating wall).',
            'Method B — multi-core in conduit (enclosed in thermally insulating wall).',
            'Method C — multi-core or single core direct in wall, ceiling or floor.',
            'Method D — buried direct in ground.',
            'Method E — multi-core in free air or on perforated cable tray.',
            'Method F — single core in trefoil in free air.',
            'Method G — single core in flat formation in free air.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why this matters for verification',
          text:
            'The reference method directly governs the current-carrying capacity (Iz) of the cable. By making it a dedicated column, inspectors can verify at a glance that the protective device rating (In) doesn\'t exceed Iz after any grouping or temperature derating — a quick check that often surfaces cable-sizing non-compliance.',
        },
      ],
    },
    {
      id: 'max-permitted-zs',
      heading: 'Maximum Permitted Zs Column',
      tocLabel: 'Max permitted Zs',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The new "Maximum permitted Zs" column on the Schedule of Circuit Details records the highest acceptable earth fault loop impedance for that protective device at the relevant disconnection time. The inspector then compares this value to the measured Zs in the Schedule of Test Results column.',
        },
        {
          type: 'list',
          items: [
            'For each circuit, look up the protective device type, rating and required disconnection time (0.4 s or 5 s in TN; 0.2 s or 1 s in TT).',
            'Read the maximum permitted Zs from BS 7671 Table 41.2 (TN, fuses), Table 41.3 (TN, MCBs), Table 41.4 (TT, fuses), or Table 41.5 (TT, MCBs).',
            'Apply the 0.95 correction factor for temperature where the published values are for cold conductors and the measurement is taken at operating temperature — though many digital tools (including Elec-Mate) apply this correction automatically.',
            'Record the value in the new column for direct comparison with the measured Zs.',
          ],
        },
      ],
    },
    {
      id: 'spd-type-per-board',
      heading: 'SPD Type per Board (T1/T2/T3/N/A)',
      tocLabel: 'SPD type per board',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 added an SPD declaration field per distribution board on the Schedule of Circuit Details. Each board records which type(s) of surge protective device are fitted (or that none are fitted), using the standard SPD type codes:',
        },
        {
          type: 'list',
          items: [
            'T1 (Type 1) — protects against direct lightning strikes and induced surges. Fitted at the origin of the installation where a lightning protection system is present.',
            'T2 (Type 2) — protects against indirect lightning effects and switching transients. Typical fit at the main consumer unit in standard domestic and commercial installations.',
            'T3 (Type 3) — fine protection for sensitive equipment. Fitted at sub-distribution boards or local to equipment.',
            'N/A — no SPD fitted to this board.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'A4:2026 risk assessment for SPDs',
          text:
            'A4 retained the risk-assessment approach to SPD selection (Regulation 443.4) but the new column makes the actual fitted type a visible field. For installations where the risk assessment shows SPD is required and the column shows "N/A", the EICR raises a coded observation.',
        },
      ],
    },
    {
      id: 'supplied-from',
      heading: '"Supplied From" Field',
      tocLabel: 'Supplied from',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 added a "Supplied from" field per distribution board on the Schedule of Circuit Details. The field records the upstream source of the board\'s supply — typically the upstream distribution board reference, or "Mains" / "Origin" for the main board.',
        },
        {
          type: 'list',
          items: [
            'For the main consumer unit: "Origin" or the distribution company\'s service reference.',
            'For a sub-distribution board: the reference of the upstream board (e.g., "DB1") and the circuit on that board that supplies this sub-board.',
            'For a temporary or supplementary supply (e.g., generator backup): the source identification clearly.',
            'For installations with parallel paths or transfer schemes: each parallel source recorded.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'This change makes the upstream/downstream topology of the installation explicit on the certificate — invaluable for fault investigation, future modification, and inspection planning.',
        },
      ],
    },
    {
      id: 'max-demand',
      heading: 'Maximum Demand (kVA / A) Field',
      tocLabel: 'Maximum demand',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 added a Maximum Demand field per distribution board. The field records the designed or measured maximum load on the board, expressed in kVA, kW, or amperes per phase as appropriate.',
        },
        {
          type: 'list',
          items: [
            'For new installations (EIC): the design maximum demand from the load schedule calculation.',
            'For periodic inspections (EICR): the measured or estimated maximum demand at the time of inspection, or the original design figure where measurement is not practicable.',
            'For three-phase boards: per-phase values + total, to show phase balance.',
            'Where the maximum demand approaches the supply capacity, a flag in the inspection notes for further-investigation observation (FI) may be appropriate.',
          ],
        },
      ],
    },
    {
      id: 'afdd-column-30',
      heading: 'Column 30 — AFDD Test Results',
      tocLabel: 'Column 30 AFDD',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Column 30 of the Schedule of Test Results records the AFDD test outcome for each circuit. For a full explanation of the AFDD test procedure and acceptance criteria, see the A4 AFDD Changes guide. In summary, column 30 records:',
        },
        {
          type: 'list',
          items: [
            'Whether an AFDD is fitted on the circuit (Y/N).',
            'AFDD type / model where fitted.',
            'Test result: operational indication present and/or functional test passed.',
            'Date of last self-test where the device has self-test capability.',
          ],
        },
      ],
    },
    {
      id: 'section-d-safety-alerts',
      heading: 'Section D — Safety Alerts and Product Recalls Disclaimer',
      tocLabel: 'Section D disclaimer',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 added a standard disclaimer to Section D of the EIC and EICR. The disclaimer makes explicit that the certificate is a point-in-time record and that the responsible person must check independently for post-issue safety alerts and product recalls affecting the installation.',
        },
        {
          type: 'list',
          items: [
            'OPSS (Office for Product Safety and Standards) issues product recall alerts that may affect installed equipment after the certificate date.',
            'NICEIC, NAPIT and other registration bodies publish their own safety alerts about specific products.',
            'The IET issues technical bulletins that may flag retrospective concerns about specific installation methods or products.',
            'The responsible person is advised on the EIC / EICR to check these sources periodically for items relevant to the installed equipment.',
          ],
        },
      ],
    },
    {
      id: 'terminology-changes',
      heading: 'Terminology Updates',
      tocLabel: 'Terminology',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 tightened terminology across the model forms. Key change visible on every certificate:',
        },
        {
          type: 'list',
          items: [
            '"Consumer\'s means of isolation" replaced "Consumer\'s isolator" — same component (the means provided by the consumer for isolation of the installation from the supply), more precise language reflecting the variety of switching arrangements.',
            'Various smaller wording updates to regulation references and Section headings to align with the A4 main text.',
            'The Schedule of Inspections numbering was adjusted to accommodate item 4.23 (AFDD) and item 5.12 (Luminaire RCD).',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Do I have to use the A4:2026 form on every certificate from 15 April 2026?',
      answer:
        'Strictly, A3:2024 forms remained acceptable until 15 October 2026 — a six-month transition window. From 15 October 2026 onwards, certificates issued on the A3 form are non-compliant with the current edition. Best practice is to switch to A4 templates immediately when your software provider issues them, which is what most certificate platforms (including Elec-Mate) did at the April 2026 effective date.',
    },
    {
      question: 'Where do I get the reference method letter for an existing installation?',
      answer:
        'For existing installations, the original design documentation should specify the reference method. Where that\'s not available, infer it from physical inspection: cable in conduit chased into a plaster wall is typically Method A or B; cable direct in plaster is Method C; SWA buried in ground is Method D; cables on a tray run is Method E. Record the inferred method in the column with a note that it\'s based on physical inspection (not original design records) — this becomes part of the as-installed evidence.',
    },
    {
      question: 'What if the maximum permitted Zs from the table is lower than measured?',
      answer:
        'That\'s a non-compliance — the earth fault loop impedance is too high for the protective device to achieve the required disconnection time. Record the measured Zs in the test results column, the permitted maximum in the new column, and raise a Section K observation. The classification is typically C2 (potentially dangerous — fault disconnection may not occur within required time, exposing persons to dangerous voltages under fault conditions). Remedial action: investigate the cause (long cable run, high resistance joint, poor earthing) and remediate before re-test.',
    },
    {
      question: 'How do I record maximum demand on an EICR for an existing installation?',
      answer:
        'For periodic inspection, you record the measured or estimated maximum demand at the time of inspection. Methods: instantaneous reading from a fitted maximum-demand indicator at the supply; calculated from a connected-load schedule with diversity factors applied per Appendix 9; or the original design figure where measurement and recalculation are not practicable. Document the method used. For three-phase boards, record per-phase to show balance — phase imbalance can flag a need for re-balancing during remedial work.',
    },
    {
      question: 'What\'s the difference between SPD Type 1, 2 and 3?',
      answer:
        'Type 1 SPDs protect against direct lightning strikes — fitted at the origin of installations with a lightning protection system. They handle the highest energy levels. Type 2 SPDs protect against indirect lightning effects (induced surges from nearby strikes) and switching transients — typical fit at the main consumer unit in standard domestic and commercial installations. Type 3 SPDs provide fine protection for sensitive electronic equipment and are fitted at sub-distribution boards or local to specific equipment. Many modern installations use a coordinated cascade (T1 at origin → T2 at main DB → T3 at sub-DBs near sensitive loads).',
    },
    {
      question: 'Why was "Consumer\'s isolator" changed to "Consumer\'s means of isolation"?',
      answer:
        'The previous "Consumer\'s isolator" terminology implied a specific switch type — typically a 100 A double-pole disconnector. In practice, the means provided for isolation can be a main switch in the consumer unit, a dedicated isolator at the meter cupboard, or other arrangements. "Means of isolation" is the more accurate technical term and aligns with the broader BS 7671 language. The function is unchanged: it\'s still the device the consumer can operate to isolate the installation from the supply, and it\'s still inspected and tested under the standard procedures.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) — All Changes',
      description: 'Overview of every A4:2026 change including AFDD, luminaire RCD, terminology updates.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'A4:2026 AFDD Changes (Item 4.23 + Column 30)',
      description: 'Deep dive on the new AFDD inspection item and test results column.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection (411.3.4)',
      description: 'The 30 mA RCD requirement added to domestic luminaire final circuits.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital EICR using the A4:2026 model form with every new column live.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Auto-derives the maximum permitted Zs from device type, rating and disconnection time.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator',
      description: 'Built on BS 7671 Appendix 4 reference methods A-G — populates the new column directly.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Issue A4:2026 certificates with confidence',
  ctaSubheading:
    'Elec-Mate ships the full A4:2026 model form — every new column auto-populated where possible, every reg cite linked. 7-day free trial.',
};
