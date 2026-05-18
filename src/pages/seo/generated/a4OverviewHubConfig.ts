import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition) model forms published
// 15 April 2026, plus IET Guidance Note 3 (Inspection & Testing, 9th
// Edition) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-18';

export const a4OverviewHubConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-a4-2026-summary',
  title:
    'BS 7671 A4:2026 — Every Model Form Change Explained',
  description:
    'Comprehensive index to every BS 7671:2018+A4:2026 change: AFDD inspection (item 4.23 + column 30), luminaire RCD protection (Regulation 411.3.4)…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'A4:2026 Hub',
  badgeIcon: 'BookOpen',
  breadcrumbLabel: 'BS 7671 A4:2026',
  heroPrefix: 'BS 7671',
  heroHighlight: 'Amendment 4 (2026)',
  heroSuffix: 'Every Change Explained',
  heroSubtitle:
    'BS 7671:2018+A4:2026 was published 15 April 2026 and the A3:2024 model forms were formally withdrawn six months later on 15 October 2026. This page indexes every change — Chapter 41 protective requirements, AFDD inspection items, model form updates, terminology changes — with deep-dive links to each.',
  keyTakeaways: [
    'BS 7671:2018+A4:2026 was published by the IET on 15 April 2026. From 15 October 2026, all new certificates must use the A4 model forms.',
    'New Chapter 41 requirement: Regulation 411.3.4 — 30 mA RCD additional protection on AC final circuits supplying luminaires in domestic premises.',
    'New EICR inspection item 4.23 records AFDD presence and operational status across the installation.',
    'New Schedule of Test Results column 30 records AFDD test outcomes per circuit.',
    'TN-C-S earthing is now split into TN-C-S (PME) and TN-C-S (PNB) on the certificate model forms.',
    'Schedule of Circuit Details gained new columns: reference method, maximum permitted Zs, SPD type per board, "Supplied from" field and maximum demand.',
    'Terminology: "Consumer\'s means of isolation" replaced "Consumer\'s isolator". Section D includes a safety alerts / product recalls disclaimer.',
  ],
  sections: [
    {
      id: 'timeline',
      heading: 'BS 7671 Amendment Timeline',
      tocLabel: 'Timeline',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018 (the 18th Edition) has been amended four times since publication. The current edition is A4:2026, with A3:2024 having been formally withdrawn six months after A4 was published.',
        },
        {
          type: 'list',
          items: [
            'BS 7671:2018 (18th Edition) — January 2018.',
            'Amendment 1 (A1:2020) — February 2020.',
            'Amendment 2 (A2:2022) — March 2022.',
            'Amendment 4 (A3:2024) — published in 2024 (note: commonly mis-cited as "A3:2022"; the correct version is A3:2024).',
            'Amendment 4 (A4:2026) — published 15 April 2026. A3 withdrawn 15 October 2026.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Effective dates for inspectors',
          text:
            'From 15 April 2026, A4:2026 was the active edition. From 15 October 2026, the A3 model forms are withdrawn and certificates issued on the old forms are non-compliant with the current edition. Software providers (Elec-Mate included) shipped A4-compliant templates at the April 2026 effective date.',
        },
      ],
    },
    {
      id: 'chapter-41-changes',
      heading: 'Chapter 41 — Protection Against Electric Shock',
      tocLabel: 'Chapter 41 changes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 added Regulation 411.3.4 as a new mandatory requirement and tightened several existing Chapter 41 provisions.',
        },
        {
          type: 'list',
          items: [
            '**Regulation 411.3.4 — Luminaire RCD Protection** — AC final circuits supplying luminaires in domestic premises must have 30 mA RCD additional protection. See the deep-dive on this regulation linked below.',
            'Type AC RCD restrictions — Type AC RCDs remain permitted by the general rules but are explicitly prohibited in medical locations of group 1 and group 2 (Section 710) and increasingly inadvisable for installations supplying modern LED lighting (DC fault current components).',
            'Disconnection-time tables (41.2 to 41.6) — small editorial adjustments for clarity; no fundamental change to the 0.4 s / 5 s requirements for TN systems.',
          ],
        },
      ],
    },
    {
      id: 'chapter-42-fire-protection',
      heading: 'Chapter 42 — Protection Against Thermal Effects (AFDDs)',
      tocLabel: 'Chapter 42 — AFDDs',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 strengthened the AFDD (Arc Fault Detection Device) regime — both where required and where prohibited.',
        },
        {
          type: 'list',
          items: [
            '**Regulation 421.1.6 / 421.1.7** — AFDD requirements consolidated and clarified. Standard installations have explicit AFDD obligations in named contexts.',
            '**Medical location prohibitions** — Regulation 710.421.1.7 prohibits AFDDs in medical locations of group 0 and group 2. Regulation 710.421.1.7.101 prohibits AFDDs in any circuit supplied by a medical IT system.',
            '**EV charging exemption** — Regulation 722.421.1.7.201 exempts EV charging equipment conforming to the BS EN 61851 series from the standard AFDD requirements.',
            '**EICR item 4.23** — new inspection item on the A4 model form records AFDD presence and operational status.',
            '**Schedule of Test Results column 30** — new column records the AFDD test outcome per circuit.',
          ],
        },
      ],
    },
    {
      id: 'earthing-arrangements',
      heading: 'Earthing Arrangements — TN-C-S Split',
      tocLabel: 'TN-C-S split',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Section I earthing-arrangement tick-boxes on the A4:2026 EICR/EIC/MEIWC model forms now distinguish two TN-C-S variants:',
        },
        {
          type: 'list',
          items: [
            '**TN-C-S (PME)** — Protective Multiple Earthing on the distributor\'s network. The combined PEN conductor is on the distributor\'s side; split into separate N and PE happens at the cut-out / supply terminals. Most UK domestic and small commercial.',
            '**TN-C-S (PNB)** — Protective Neutral Bonding within the installation. The combined PEN conductor is on the consumer\'s side, typically downstream of a privately-owned transformer. Large industrial, hospitals, universities, data centres, manufacturing sites.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why the split matters',
          text:
            'PME and PNB look similar but the responsibility boundary and broken-neutral exposure are different. PME bonding-sizing rules (544.1.1, Table 54.8) apply to PME but not necessarily to PNB beyond the split. EV charger PME-specific requirements (722.411.4.1) apply differently to PNB. The new tick-box on the form makes the arrangement explicit.',
        },
      ],
    },
    {
      id: 'new-model-forms',
      heading: 'Model Form Updates — EIC, EICR, MEIWC',
      tocLabel: 'Model forms',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 redesigned the BS 7671 model forms. Every certificate type — Electrical Installation Certificate (EIC), Electrical Installation Condition Report (EICR), Minor Electrical Installation Works Certificate (MEIWC) — has updated content alongside its supporting schedules.',
        },
        {
          type: 'paragraph',
          text:
            'Schedule of Circuit Details now records (in addition to the previous content):',
        },
        {
          type: 'list',
          items: [
            '**Supplied from** — upstream source of each distribution board (origin / upstream board reference).',
            '**Maximum demand (kVA/A)** — per-board load declaration, with per-phase split for three-phase boards.',
            '**SPD Type(s)** — T1, T2, T3 or N/A per distribution board.',
            '**Reference method** — BS 7671 Appendix 4 reference method letter (A-G) for each circuit.',
            '**Maximum permitted Zs (Ω)** — per-circuit, derived from device type, rating and required disconnection time.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Schedule of Test Results now includes:',
        },
        {
          type: 'list',
          items: [
            '**Column 30 — AFDD test result** — manual test button operation (where the AFDD has a test button; not all do).',
            'Pre-existing columns for ring-final continuity (r₁, rₙ, r₂), continuity (R₁+R₂ or R₂), insulation resistance at 500 V or 250 V, polarity, Zs measured, disconnection time and RCD test button operation — all retained, with clarified footnotes.',
          ],
        },
      ],
    },
    {
      id: 'section-d-and-terminology',
      heading: 'Section D Disclaimer and Terminology Changes',
      tocLabel: 'Section D + terminology',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section D ("Extent and Limitations of Inspection and Testing") now includes a standard disclaimer making the point-in-time nature of the certificate explicit:',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Standard Section D safety-alerts disclaimer',
          text:
            'No checks for safety alerts, corrective actions or product recalls for electrical equipment forming part of the installation have been made. The responsible person should periodically check OPSS, registration body publications and IET technical bulletins for items affecting installed equipment.',
        },
        {
          type: 'paragraph',
          text:
            'Terminology updates visible on the new forms:',
        },
        {
          type: 'list',
          items: [
            '"Consumer\'s means of isolation" replaced "Consumer\'s isolator" — same component, more precise term to cover the variety of switching arrangements that fulfil this function.',
            'The Schedule of Inspections numbering accommodates item 4.23 (AFDD) and item 5.12 (Luminaire RCD).',
            'Section K observations are now split into two tables: "C1 and C2 OBSERVATION(S)" (affects overall assessment) and "C3 and FI OBSERVATION(S)" (advisory). Same codes, clearer recording.',
          ],
        },
      ],
    },
    {
      id: 'part-7-changes',
      heading: 'Part 7 Special Location Changes',
      tocLabel: 'Part 7 changes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Several Part 7 special-location sections received targeted updates in A4:2026. The most commercially significant for inspectors and installers:',
        },
        {
          type: 'list',
          items: [
            '**Section 710 (Medical Locations)** — AFDD prohibitions in group 0/2 medical locations and on medical IT systems formalised. SELV/PELV voltage limits reduced to 25 V AC RMS or 60 V ripple-free DC.',
            '**Section 712 (Solar PV)** — DC string protection clarifications and battery storage integration requirements.',
            '**Section 722 (EV Charging)** — open-PEN-conductor mitigation requirements expanded; AFDD exemption codified (722.421.1.7.201).',
            '**Section 753 (Floor and Ceiling Heating)** — 30 mA RCD protection clarified across underfloor heating installations.',
            '**Sections 705, 708, 709, 711** — various clarifications and editorial improvements.',
          ],
        },
      ],
    },
    {
      id: 'what-it-means',
      heading: 'What A4:2026 Means for Daily Practice',
      tocLabel: 'Daily practice',
      blocks: [
        {
          type: 'list',
          tone: 'success',
          items: [
            'Every EICR / EIC / MEIWC issued from 15 October 2026 onwards uses the A4 model form. Software providers ship A4 templates by default.',
            'Domestic EICRs check luminaire RCD protection (item 5.12) and AFDD installation (item 4.23) on every job.',
            'TN-C-S installations are recorded as either TN-C-S (PME) or TN-C-S (PNB) on the certificate — pick the right tick-box.',
            'Schedule of Circuit Details captures reference method, maximum permitted Zs, SPD type per board, "Supplied from" and maximum demand.',
            'Section K observations are split into C1/C2 (affects assessment) and C3/FI (advisory) tables.',
            'For private rented properties in England (PRS Regs 2020), new C2 observations from A4-specific defects (missing luminaire RCD, missing required AFDD) trigger the 28-day remedial window.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'When did A4:2026 come into effect?',
      answer:
        'BS 7671:2018+A4:2026 was published by the IET on 15 April 2026. The previous A3:2024 model forms were formally withdrawn six months later on 15 October 2026 — from that date forward, all new certificates must use the A4 forms. Best practice is to switch to A4 templates immediately when the software provider releases them, which most did at the April 2026 effective date.',
    },
    {
      question: 'Is A4:2026 retrospective — do I need to upgrade every existing installation?',
      answer:
        'BS 7671 amendments are not retrospective in the sense of forcing existing-installation upgrades. However, the next EICR for any installation will be assessed against A4:2026, and non-compliances with new A4 mandatory requirements (e.g. missing luminaire RCD protection in a domestic dwelling) become C2 observations requiring remedial action. For rented properties, that C2 triggers a 28-day remedial timeline under PRS Regs 2020. Owner-occupied installations have no statutory timeline but the responsible person is on documented notice.',
    },
    {
      question: 'What\'s the biggest practical change for a domestic electrician under A4?',
      answer:
        'Regulation 411.3.4 — luminaire RCD protection. Many domestic installations have luminaire final circuits without RCD protection. From the next EICR onwards these become C2 observations, and many landlords (private rented sector) will face remedial work to install 30 mA RCBOs or consumer unit upgrades. For new domestic installations, all-RCBO consumer units have effectively become the default rather than an upgrade option.',
    },
    {
      question: 'Did the AFDD rules get more or less strict under A4?',
      answer:
        'Both. A4 added an explicit AFDD inspection item (4.23) and test results column (30) on the model forms, making AFDD recording visible on every EICR. The mandatory-AFDD requirements remain risk-based — there is no blanket "AFDD on every circuit" rule. However, A4 strengthened the medical-location prohibitions (Regulation 710.421.1.7 and 710.421.1.7.101) and codified the EV charging exemption (722.421.1.7.201). Net effect: AFDD recording is more visible, the rules are more precisely scoped.',
    },
    {
      question: 'How is TN-C-S (PNB) different from TN-C-S (PME)?',
      answer:
        'In TN-C-S (PME) the combined PEN conductor is on the distributor\'s side — the supply network. The distributor is responsible for its integrity up to the supply terminals. In TN-C-S (PNB) the combined PEN conductor is on the consumer\'s side — typically downstream of a privately-owned HV/LV transformer at a large industrial or institutional site. The installation owner is responsible for the PEN conductor up to the point where it splits into separate N and PE. The bonding requirements, EV charger compatibility and broken-neutral exposure are different between the two.',
    },
    {
      question: 'Do I need to know A4 if I only do small extensions and Minor Works?',
      answer:
        'Yes. The MEIWC (Minor Electrical Installation Works Certificate) model form was also updated in A4:2026. Even a single new circuit added to an existing installation must be certified on the A4 MEIWC, which has updated terminology and the same Section I earthing-arrangement options as the EIC and EICR. For circuits in domestic premises supplying luminaires, the new 30 mA RCD requirement (411.3.4) applies — adding an under-cabinet light circuit without RCD protection would be non-compliant.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection (411.3.4)',
      description: '30 mA RCD additional protection on domestic AC luminaire final circuits — deep dive.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'A4:2026 AFDD Changes (Item 4.23 + Column 30)',
      description: 'Where AFDDs are required, prohibited and tested under A4:2026.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
      title: 'A4:2026 TN-C-S (PNB) Earthing',
      description: 'The new PME vs PNB tick-box on the certificate, and what each arrangement means.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-schedule-of-tests',
      title: 'A4:2026 Schedule of Tests New Columns',
      description: 'Reference method, maximum permitted Zs, SPD type, "Supplied from" — every new column.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-section-710-medical-locations',
      title: 'BS 7671 Section 710 Medical Locations',
      description: 'How A4:2026 strengthened medical location protections.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital A4:2026 EICR with every new form change supported.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Issue A4:2026 certificates from day one',
  ctaSubheading:
    'Elec-Mate\'s certificate suite is fully A4:2026 aligned — EIC, EICR and Minor Works all using the new model forms. 7-day free trial.',
};
