import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the BS 7671:2018+A4:2026 (18th Edition) Electrical Installation
// Certificate model form (published 15 April 2026), the EICR model form, the
// MEIWC model form, plus IET Guidance Note 3 (Inspection & Testing, 9th
// Edition) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-18';

export const a4EICModelFormConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-a4-2026-eic-model-form',
  title:
    'BS 7671 A4:2026 — Electrical Installation Certificate (EIC)',
  description:
    'Amendment 4 (January 2026) rebuilt the BS 7671 Electrical Installation Certificate. The new EIC introduces item 14.0 Prosumer LV installations…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'A4:2026 EIC Model Form',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'A4 EIC Model Form',
  heroPrefix: 'BS 7671 A4:2026',
  heroHighlight: 'EIC',
  heroSuffix: 'Model Form Changes',
  heroSubtitle:
    'The Electrical Installation Certificate (EIC) under BS 7671:2018+A4:2026 has new sections, new earthing-arrangement tick-boxes, an expanded Schedule of Inspections (items 1.0 through 14.0 including the new Prosumer LV installation item) and updated terminology. This guide walks every change visible on the canonical IET form.',
  answerBox: {
    question: 'What changed on the BS 7671 A4:2026 Electrical Installation Certificate (EIC)?',
    answer:
      'The A4:2026 EIC adds item 14.0 "Prosumer\'s low voltage electrical installation(s)" to the Section H Schedule of Inspections (now 1.0 to 14.0), splits the TN-C-S earthing tick-box into PME and PNB, and keeps the three-signatory Design / Construction / Inspection & Testing structure. Item 6.0 now covers the new 30 mA RCD requirement for domestic luminaire final circuits (Regulation 411.3.4).',
  },
  keyTakeaways: [
    'The EIC is the certificate issued for new electrical installations, additions and alterations — it is NOT the same as the EICR (which records the condition of an existing installation).',
    'Section H Schedule of Inspections under A4:2026 covers items 1.0 through 14.0 — item 14.0 is the new "Prosumer\'s low voltage electrical installation(s)" inspection point.',
    'Section F earthing-arrangement tick-boxes now distinguish TN-C-S (PME) from TN-C-S (PNB) — same change as on the EICR.',
    'Section C splits certification responsibility into Design, Construction, and Inspection & Testing — three separate signatures with separate liability statements per Regulations 120.3, 133.1.2, 133.1.3 and 133.5.',
    'Section G records Means of Earthing, Maximum Demand, Earth Electrode details, Main Protective Conductors and Main Switch in one consolidated block.',
    'Schedule of Circuit Details and Schedule of Test Results that accompany the EIC use the same updated layout as the EICR — reference method, maximum permitted Zs, SPD type per board, and a dedicated AFDD test column.',
  ],
  sections: [
    {
      id: 'what-is-an-eic',
      heading: 'What an EIC Is and When You Issue One',
      tocLabel: 'What is an EIC',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An Electrical Installation Certificate (EIC) is issued for new electrical installation work, additions, and alterations to an existing installation. It is the design-construction-inspection record of work being put into service, and it must be issued under BS 7671 before the installation can be safely energised and used.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'EIC vs EICR — different documents, different purposes',
          text:
            'The EIC certifies new work or alterations meeting BS 7671. The EICR (Electrical Installation Condition Report) records the condition of an existing installation at a point in time. The EIC has design and construction signatures; the EICR has inspection and testing signatures only.',
        },
        {
          type: 'list',
          items: [
            '**New installation** — the initial certification of a complete new installation. Issue an EIC.',
            '**Addition or alteration introducing a new circuit** — extending an existing installation with one or more new circuits. Issue an EIC.',
            '**Consumer unit / distribution board replacement** — a board swap is explicitly an EIC job under the A4:2026 form notes, even where no new final circuit is added.',
            '**Multiple additions / alterations / remedial works that do not extend to new circuits** — may be certified on a single EIC as an alternative to issuing multiple MEIWCs.',
            '**Minor work with no new circuit** — a single small alteration that does not introduce a new circuit is documented on the [Minor Electrical Installation Works Certificate (MEIWC)](/guides/bs-7671-a4-2026-meiwc-model-form) instead.',
            '**Periodic inspection of an existing installation** — never an EIC. Use an EICR (Electrical Installation Condition Report).',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The original EIC is issued to the person ordering the work and a duplicate is retained by the person issuing the certificate (Regulation 644.4). The certificate is only valid once the Schedule of Inspections is completed and the relevant Schedule(s) of Circuit Details and Schedule(s) of Test Results are attached (Regulation 644.3).',
        },
      ],
    },
    {
      id: 'section-c-signatories',
      heading: 'Section C — Three Separate Certification Signatories',
      tocLabel: 'Section C signatories',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 retains the three-signatory structure that distinguishes EIC liability. Each role attests to compliance with BS 7671:2018 amended to the relevant date, subject to any documented departures (Regulations 120.3, 133.1.2, 133.1.3 and 133.5):',
        },
        {
          type: 'list',
          items: [
            '**For Design** — Designer 1 (and Designer 2 where mutual responsibility for design exists). Attests that the design work is compliant. Departures from BS 7671 and permitted exceptions per Regulation 411.3.3 (with attached risk assessment) are recorded here.',
            '**For Construction** — Constructor. Attests that the installation has been constructed in accordance with the design and BS 7671. Departures from BS 7671 detected during construction are recorded.',
            '**For Inspection and Testing** — Inspector. Attests that the inspection and testing work has been carried out in accordance with BS 7671 and the Schedule of Inspections.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Section E expands signatory details',
          text:
            'Section E records full name, address, postcode and telephone number for each signatory in Section C (Designer 1, Designer 2 where applicable, Constructor, Inspector). This makes the chain of responsibility for the installation explicit — critical for warranty, insurance and future investigation.',
        },
      ],
    },
    {
      id: 'section-f-earthing',
      heading: 'Section F — Earthing Arrangement (PME vs PNB)',
      tocLabel: 'Section F earthing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section F of the A4:2026 EIC has the same earthing-arrangement tick-box list as the EICR:',
        },
        {
          type: 'list',
          items: [
            'TN-C — combined PEN throughout (rare in UK).',
            'TN-S — separate N and PE throughout.',
            'TN-C-S (PME) — distributor\'s combined PEN, Protective Multiple Earthing on the distribution network.',
            'TN-C-S (PNB) — privately-owned combined PEN, Protective Neutral Bonding downstream of a privately-owned transformer.',
            'TT — installation earth electrode, no distributor earth.',
            'IT — isolated/IT system.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Other supply parameters in this section: Number and type of live conductors (AC: 1-, 2-, 3-phase 3-wire or 4-wire, with confirmation of polarity; DC: 2-wire or 3-wire), nominal voltage U/U₀, frequency, prospective fault current Ipf, external earth fault loop impedance Ze, and the supply protective device characteristics (BS EN, type, rated current, breaking capacity).',
        },
      ],
    },
    {
      id: 'section-g-particulars',
      heading: 'Section G — Particulars of Installation',
      tocLabel: 'Section G particulars',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section G consolidates the installation\'s headline characteristics in one block:',
        },
        {
          type: 'list',
          items: [
            '**Means of Earthing** — tick-box for Distributor\'s facility or Installation earth electrode.',
            '**Maximum Demand (load)** — recorded in kVA or A (delete as appropriate).',
            '**Details of Installation Earth Electrode** — where applicable: type (rod, tape etc.), location, and electrode resistance / impedance R_A or Z_e.',
            '**Main Protective Conductors** — earthing conductor material and CSA, main protective bonding conductor material and CSA, with connection/continuity verified tick-boxes.',
            '**Bonding destinations** — tick-boxes for water, gas, oil installation pipes, structural steel, lightning protection system, and "Other" with specify field.',
            '**Main switch (Isolation device / Switch-fuse / Circuit-breaker / RCD etc.)** — location, BS EN, number of poles, current rating, voltage rating, plus either overcurrent device details OR RCD main switch details (Type AC/A/F/B, rated residual operating current IΔn, rated time delay, measured operating time, breaking capacity).',
          ],
        },
      ],
    },
    {
      id: 'schedule-of-inspections',
      heading: 'Section H — Schedule of Inspections (Items 1.0 to 14.0)',
      tocLabel: 'Schedule of Inspections',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The A4:2026 EIC Schedule of Inspections in Section H lists 14 inspection items, each requiring an "Outcome (✓ / N/A)" entry:',
        },
        {
          type: 'list',
          items: [
            '**1.0 Condition of consumer\'s intake equipment (Visual inspection only)** — supplier\'s cut-out, distributor\'s seal, isolation device for the consumer.',
            '**2.0 Parallel or switched alternative sources of supply** — generator backup, UPS, prosumer arrangements with separate supply origins.',
            '**3.0 Protective measure: Automatic Disconnection of Supply (ADS)** — earthing arrangement, protective device selection, disconnection time verification.',
            '**4.0 Basic protection** — insulation of live parts, barriers and enclosures.',
            '**5.0 Protective measures other than ADS** — SELV/PELV, double or reinforced insulation, electrical separation.',
            '**6.0 Additional protection** — 30 mA RCDs on socket-outlets not exceeding 32 A (411.3.3), cables concealed in walls at a depth of less than 50 mm (522.6.202, Table 52.1), and the [new requirement for domestic luminaire final circuits (411.3.4)](/guides/bs-7671-a4-2026-luminaire-rcd-protection).',
            '**7.0 Distribution equipment** — consumer unit / distribution board condition, suitability, identification.',
            '**8.0 Circuits (Distribution and Final)** — circuit wiring, cable types, segregation.',
            '**9.0 Isolation and switching** — emergency switching, functional switching, mechanical maintenance isolation.',
            '**10.0 Current-using equipment (permanently connected)** — fixed equipment selection and connection.',
            '**11.0 Identification and notices** — circuit charts, warning labels, periodic inspection notice.',
            '**12.0 Location(s) containing a bath or shower** — Section 701 compliance.',
            '**13.0 Other special installations or locations** — Part 7 compliance for whichever sections apply.',
            '**14.0 Prosumer\'s low voltage electrical installation(s)** — NEW under A4:2026.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'EIC outcomes are ✓ / N/A — not condition codes',
          text:
            'On the EIC each Schedule of Inspections item takes a simple Outcome entry — a tick to confirm the item is satisfactory, or N/A where it does not apply. This is initial verification of new work, so there are no observation classification codes. The C1 / C2 / C3 / FI condition codes belong to the EICR, which assesses an existing installation. See the [A4:2026 Schedule of Tests changes](/guides/bs-7671-a4-2026-schedule-of-tests) for the measurement columns that accompany this inspection.',
        },
      ],
    },
    {
      id: 'prosumer-item',
      heading: 'New Item 14.0 — Prosumer\'s LV Installation',
      tocLabel: 'Item 14.0 Prosumer',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Item 14.0 is the most distinctive new inspection point on the A4:2026 EIC. A4:2026 introduces an entirely new Chapter 82 covering Prosumer\'s Electrical Installations (PEIs) — low voltage installations that both consume energy from the supply AND produce or store energy that may be exported. BS 7671 defines a prosumer as an entity that can be both a producer and a consumer of electrical energy, combining functions traditionally separated into "consumer" and "generator" installations.',
        },
        {
          type: 'list',
          items: [
            'Solar PV + battery storage + grid connection — the canonical prosumer arrangement.',
            'Wind generation + battery + grid for self-consumption with export.',
            'EV-to-grid (V2G) charging where the vehicle battery exports back to the supply at times.',
            'Combined heat and power (CHP) with grid synchronisation.',
            'Hybrid solar/battery installations with islanding capability for grid-fault back-up.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why prosumer inspection got its own item',
          text:
            'Prosumer installations have bidirectional power flow, anti-islanding protection requirements (G98/G99 compliance for grid connection), specific earthing considerations, additional disconnection and isolation requirements, and labelling needs that distinguish "switched off" from "isolated from generation". A dedicated inspection item makes these checks visible and traceable on every EIC.',
        },
      ],
    },
    {
      id: 'section-d-next-inspection',
      heading: 'Section D — Next Inspection Recommendation',
      tocLabel: 'Section D next inspection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section D of the EIC records the designer\'s recommended periodic inspection interval — the time after which the responsible person should commission the next EICR. The interval is expressed in years or months and is influenced by:',
        },
        {
          type: 'list',
          items: [
            'Installation type (domestic, commercial, industrial, special location).',
            'Foreseeable change of use within the recommended interval.',
            'Tenant turnover frequency for rented properties (PRS Regs 2020 implications in England).',
            'Equipment sensitivity (medical, life-safety, computing infrastructure).',
            'Environmental conditions (corrosive, wet, high-temperature).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Typical intervals (IET Guidance Note 3)',
          text:
            'Domestic owner-occupied: 10 years. Domestic rented: 5 years (statutory under PRS Regs 2020 in England). Commercial: 5 years. Hospitals: 1 year. Caravan parks / marinas: 1 year. Agricultural / horticultural: 3 years (1 year if particularly harsh).',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'When do I issue an EIC instead of an EICR?',
      answer:
        'EIC is for new electrical installation work, additions, or alterations to an existing installation. EICR is for periodic inspection of an existing installation. If you\'re putting new wires in (whether a complete new build or adding a circuit), you issue an EIC. If you\'re assessing the existing condition of wires that someone else (or a past version of you) installed, you issue an EICR. For very small work that doesn\'t add a new circuit, you issue an MEIWC (Minor Electrical Installation Works Certificate) instead of an EIC.',
    },
    {
      question: 'Do I need three different people for the three Section C signatures?',
      answer:
        'Not necessarily. The same person may sign for Design, Construction and Inspection & Testing on a domestic installation where the same competent person fulfilled all three roles. On larger projects with separate designer / contractor / commissioning engineer, each role gets its own signatory. The form supports up to four people (Designer 1, Designer 2, Constructor, Inspector) and Section E records the contact details for each.',
    },
    {
      question: 'What\'s the difference between TN-C-S (PME) and TN-C-S (PNB) on the new EIC?',
      answer:
        'TN-C-S (PME) — the combined PEN conductor is on the distributor\'s side; the distributor accepts responsibility for its integrity up to the supply terminals. TN-C-S (PNB) — the combined PEN is on the consumer\'s side, typically downstream of a privately-owned HV/LV transformer; the installation owner is responsible for its integrity. The choice affects bonding sizing, EV charger compatibility, and broken-neutral exposure. See the dedicated A4 TN-C-S (PNB) guide for the full explanation.',
    },
    {
      question: 'How do I complete item 14.0 if the installation has no prosumer equipment?',
      answer:
        'Mark N/A. Item 14.0 (Prosumer\'s low voltage electrical installation(s)) only applies where the installation includes equipment that both consumes and produces electricity — solar PV, battery storage with export, wind generation, V2G charging, etc. A standard domestic installation with no on-site generation is marked N/A for item 14.0.',
    },
    {
      question: 'What if I find a departure from BS 7671 during design?',
      answer:
        'Record the departure in the "Details of departures from BS 7671 (Regulations 120.3, 133.1.2, 133.1.3 and 133.5)" field in the relevant Section C signature block. Departures are not automatically non-compliance — they are documented design decisions where the designer has chosen an alternative method that achieves equivalent or better safety. Permitted exceptions under Regulation 411.3.3 require a suitable risk assessment to be attached to the certificate (tick the "Risk assessment attached" box).',
    },
    {
      question: 'Does an EIC need a Schedule of Test Results attached?',
      answer:
        'Yes. Section J of the EIC explicitly lists the attached schedules: Schedule of Inspections (Section H is integrated into the certificate), Schedule of Circuit Details, and Schedule of Test Results. The certificate is valid only when the relevant schedules are completed and attached (Regulation 644.3), and the Schedule of Test Results captures the verifiable measurements — continuity, insulation resistance, polarity, earth fault loop impedance Zs, RCD operating time and the AFDD test — that prove the inspection outcome.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary — Every Change',
      description: 'Master index of every A4:2026 change across EIC, EICR and MEIWC.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
      title: 'A4:2026 TN-C-S (PNB) Earthing',
      description: 'The new PME vs PNB split on Section F of the EIC — what each arrangement means.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-schedule-of-tests',
      title: 'A4:2026 Schedule of Tests New Columns',
      description: 'Reference method, maximum permitted Zs, SPD type, the AFDD test column — all attached to the EIC.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection (411.3.4)',
      description: 'The new 30 mA RCD mandate for domestic luminaire final circuits — inspected under EIC item 6.0.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/eic-certificate',
      title: 'EIC Certificate Tool',
      description: 'Digital A4:2026 EIC with all 14 Schedule of Inspections items and three-signatory support.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'A4:2026 AFDD Changes',
      description: 'Where AFDDs are fitted, the manual test facility is verified and recorded on the Schedule of Test Results attached to the EIC.',
      icon: 'Zap',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Issue compliant A4:2026 EICs',
  ctaSubheading:
    'Elec-Mate ships the full A4:2026 EIC model form — three-signatory workflow, 14 Schedule of Inspections items, prosumer-aware item 14.0, all schedules attached. 7-day free trial.',
};
