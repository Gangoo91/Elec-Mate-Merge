import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the BS 7671:2018+A4:2026 (18th Edition) model form for the
// Electrical Installation Condition Report (published 15 April 2026) which
// explicitly separates TN-C-S (PME) and TN-C-S (PNB) as distinct earthing
// arrangement options in Section I. Also references IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-18';

export const a4TnCsPnbEarthingConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
  title: 'BS 7671 A4:2026 — TN-C-S (PNB) Earthing Arrangement',
  description:
    'Amendment 4 (January 2026) formally split TN-C-S into two distinct earthing arrangements on the EICR/EIC model form: TN-C-S (PME) and TN-C-S (PNB).',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'A4:2026 Change',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'A4 TN-C-S (PNB) Earthing',
  heroPrefix: 'BS 7671 A4:2026',
  heroHighlight: 'TN-C-S (PNB)',
  heroSuffix: 'Earthing Arrangement',
  heroSubtitle:
    'Amendment 4 split the previous single TN-C-S option on the BS 7671 model forms into two distinct earthing arrangements: TN-C-S (PME) and TN-C-S (PNB). This guide explains the difference, when each applies, and what the new Section I tick-box choice means for design and inspection decisions.',
  keyTakeaways: [
    "TN-C-S (PME) — Protective Multiple Earthing. The combined protective-and-neutral (PEN) conductor is on the distributor's side. Most UK domestic and small commercial installations.",
    "TN-C-S (PNB) — Protective Neutral Bonding. The combined PEN conductor is on the consumer's side, typically from a privately-owned HV/LV transformer. Most large industrial and some institutional sites.",
    'Before A4:2026, both arrangements were ticked as "TN-C-S" on the EICR Section I. From A4 onwards, the certificate distinguishes them explicitly — the choice affects bonding, RCD selection, EV charger compatibility and earth electrode requirements.',
    'PME arrangements: the distributor accepts responsibility for the integrity of the PEN conductor up to the supply terminals. The installer is responsible for the bonding requirements within the installation.',
    'PNB arrangements: the installation owner is responsible for the integrity of the PEN conductor from the privately-owned transformer to the point where it splits into separate N and PE. Different bonding and earthing rules apply.',
    'EICR observation context: where the certificate previously recorded "TN-C-S" without distinguishing PME from PNB, this is no longer compliant with the A4:2026 model form. A re-issue of the EICR using the A4 form is good practice at the next periodic inspection.',
  ],
  sections: [
    {
      id: 'what-changed-a4',
      heading: 'What Changed in A4:2026',
      tocLabel: 'What changed',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Electrical Installation Condition Report (EICR), Electrical Installation Certificate (EIC) and Minor Electrical Installation Works Certificate (MEIWC) model forms in BS 7671:2018+A4:2026 published 15 April 2026 separate the previously single TN-C-S option into two distinct tick-boxes:',
        },
        {
          type: 'list',
          items: [
            "TN-C-S (PME) — the supply is a TN-C-S system with Protective Multiple Earthing on the distributor's side.",
            'TN-C-S (PNB) — the supply is a TN-C-S system with Protective Neutral Bonding within the installation, typically downstream of a privately-owned transformer.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why this matters',
          text: 'PME and PNB look very similar on paper — both have a combined PEN conductor at some point. The location of that PEN/N split changes which party (distributor or installation owner) is responsible for its integrity, and triggers different bonding and protection rules in BS 7671. A4 made the distinction visible on the certificate so the responsible person and any subsequent inspector know which set of rules applies.',
        },
      ],
    },
    {
      id: 'tn-cs-pme-explained',
      heading: 'TN-C-S (PME) — Protective Multiple Earthing',
      tocLabel: 'TN-C-S (PME)',
      blocks: [
        {
          type: 'paragraph',
          text: 'TN-C-S (PME) is the most common UK supply arrangement for domestic and small commercial premises. The distributor provides a combined protective-and-neutral (PEN) conductor from the substation to the cut-out at each property. Inside the property, the PEN conductor is split into separate N and PE conductors at the supply terminals — typically at the meter or main switch.',
        },
        {
          type: 'list',
          items: [
            'The distributor accepts responsibility for the integrity of the PEN conductor up to the supply terminals.',
            'The PEN conductor is earthed at multiple points along the distribution network (hence "Protective Multiple Earthing").',
            'The earthing terminal of the installation is connected to the supplied PEN conductor at the point of split — this provides the means of earthing.',
            'The installer is responsible for the consumer-side bonding to extraneous-conductive-parts and for the protective conductor arrangement within the installation.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'PME bonding requirements',
          text: 'Main protective bonding conductor sizes for PME installations are governed by Regulation 544.11 and Table 54.8. Where the PME supply PEN conductor is 35 mm² or less (the most common domestic and small commercial case), the minimum copper main protective bonding conductor is 10 mm². Larger PEN conductors require proportionally larger bonding conductors — consult Table 54.8 for the full schedule. This reflects the higher fault current that can flow through the PEN under broken-neutral conditions in a PME network.',
        },
      ],
    },
    {
      id: 'tn-cs-pnb-explained',
      heading: 'TN-C-S (PNB) — Protective Neutral Bonding',
      tocLabel: 'TN-C-S (PNB)',
      blocks: [
        {
          type: 'paragraph',
          text: "TN-C-S (PNB) is typically used in larger commercial, industrial and institutional sites where the supply originates at a privately-owned HV/LV transformer (often a substation on the customer's land). Between the transformer secondary and the main LV distribution board there is a combined PEN conductor — and downstream of that distribution board, the conductor splits into separate N and PE for the rest of the installation.",
        },
        {
          type: 'list',
          items: [
            'The installation owner is responsible for the privately-owned transformer and the PEN conductor from its secondary terminals to the point of split into N and PE.',
            'The PEN conductor is typically bonded to the consumer\'s earthing system at the secondary side of the transformer (hence "Protective Neutral Bonding").',
            'The point of split (where PEN becomes separate N and PE) is the installation\'s "means of earthing" reference point.',
            'Downstream of the split, the installation behaves like a standard TN-S system — separate N and PE conductors throughout.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: "Where you'll see PNB in practice",
          text: 'Large hospitals, university campuses, manufacturing plants, data centres, large retail parks with their own substation, water treatment works, motorway-services electrical infrastructure. Any site where the customer takes HV supply and steps it down to LV themselves typically operates under PNB rather than PME.',
        },
      ],
    },
    {
      id: 'pme-vs-pnb-differences',
      heading: 'Practical Differences for Design and Inspection',
      tocLabel: 'PME vs PNB',
      blocks: [
        {
          type: 'paragraph',
          text: 'The choice between PME and PNB affects several specific BS 7671 decisions:',
        },
        {
          type: 'list',
          items: [
            'Main protective bonding conductor sizing — PME sizing rules (Regulation 544.11, Table 54.8) apply where the supply is PME. For a PEN conductor of 35 mm² or less the minimum bonding conductor is 10 mm² copper; larger PEN conductors scale upward per Table 54.8. PNB sizing follows the standard TN-S rules once downstream of the split.',
            'EV charger installation — PME supplies have specific additional requirements for EV charging final circuits to mitigate broken-neutral risk (Chapter 72 / Section 722 of BS 7671 and associated IET guidance). A4:2026 also introduced Regulation 722.311.201, which permits load curtailment (automatic or manual load reduction or disconnection) to be taken into account when determining maximum demand — directly relevant to multi-charger installations on PNB industrial and campus sites. PNB installations downstream of the privately-owned transformer have different exposure to broken-neutral effects and must be assessed separately.',
            'Distributor consultation — modifications affecting the means of earthing on a PME supply require consultation with the distributor. PNB installations have no equivalent distributor relationship (because the PEN is privately owned).',
            'Earthing electrode requirements — PME supplies do not require a separate consumer earth electrode (the PEN provides the means of earthing). PNB installations may also use the privately-owned transformer earthing system, but check the design documentation.',
            "Maintenance ownership — PME network maintenance is the distributor's responsibility. PNB network maintenance is the consumer's responsibility — including testing, earth electrode resistance verification and condition reports on the privately-owned transformer earthing.",
            'PEN conductor boundary — BS 7671 Regulation 543.4.2 (NOTE) and the Electricity Safety, Quality and Continuity Regulations (ESQCR) require that the PEN conductor shall not continue within the consumer installation. Installers must ensure correct separation into distinct N and PE conductors at the supply boundary and that bonding is completed at that point. This is a statutory obligation on all PME-supplied installations.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'ESQCR requirement: PEN must not enter the consumer installation',
          text: 'Regulation 543.4.2 (NOTE) of BS 7671 and the ESQCR both require that the PEN conductor is separated into individual neutral (N) and protective (PE) conductors at the incoming supply termination. The combined PEN must not continue as a single combined conductor within the consumer installation. Inspectors should verify this separation is present and correctly bonded at the boundary — record any deficiency as a C2 or C3 observation on the EICR as appropriate.',
        },
      ],
    },
    {
      id: 'eicr-recording',
      heading: 'How to Record TN-C-S on the A4:2026 EICR',
      tocLabel: 'EICR recording',
      blocks: [
        {
          type: 'paragraph',
          text: 'Section I of the A4:2026 EICR model form has the earthing-arrangement tick-boxes. The inspector ticks one of:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'TN-C — combined PEN throughout. Rare in UK installations.',
            'TN-S — separate N and PE throughout. Older UK supplies and on-site generation arrangements.',
            "TN-C-S (PME) — distributor's PEN conductor, multiple earthing on the network. Most common UK domestic/small commercial.",
            'TN-C-S (PNB) — privately-owned PEN within the installation, downstream of a privately-owned transformer. Larger industrial/institutional sites.',
            'TT — installation earth electrode, no distributor earth provided. Common in some rural and older overhead-supply areas.',
            'IT — isolated/IT earthing. Specialised applications (some hospitals, mines, industrial).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: "If you're not sure which TN-C-S to tick",
          text: "Trace the supply backwards from the consumer unit to where the conductor splits from PEN into separate N and PE. If that split is at the cut-out / supply terminals provided by the distributor, it's TN-C-S (PME). If the split is downstream of a privately-owned transformer (substation on the customer's land), it's TN-C-S (PNB). When in doubt, consult the original installation documentation or the distributor / private network owner.",
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Inspector checks for PME installations (GN3 Ch.8, Reg 8.2)',
          text: 'IET Guidance Note 3 (9th Edition, Chapter 8, Reg 8.2) requires inspectors to verify and record the following on PME (TN-C-S) installations: (1) PEN conductor integrity — confirm the combined PEN is terminated correctly at the supply boundary and has not continued within the consumer installation contrary to ESQCR. (2) Continuity of main protective bonding conductors — verify that all extraneous-conductive-parts are correctly bonded and continuity is satisfactory. (3) Adequacy of precautions — confirm that any special precautions required for PME supplies (such as supplementary bonding in high-risk locations) are in place. Record any deficiencies in Section K of the EICR.',
        },
      ],
    },
    {
      id: 'existing-eicrs',
      heading: 'What About Existing Pre-A4 EICRs?',
      tocLabel: 'Existing EICRs',
      blocks: [
        {
          type: 'paragraph',
          text: 'EICRs issued before 15 April 2026 used the previous model form which had a single "TN-C-S" option without the PME/PNB distinction. Those reports remain valid for their stated periodic inspection interval — A4 is not retrospective.',
        },
        {
          type: 'list',
          items: [
            'At the next periodic inspection (typically 5 or 10 years later for domestic), the EICR will be issued on the A4 form and will record TN-C-S (PME) or TN-C-S (PNB) specifically.',
            'For installations where the inspector is unable to determine PME vs PNB from physical evidence and no documentation is available, the appropriate response is an FI (further investigation required) on Section K, with a note explaining what the investigation needs to establish.',
            'No remedial work is triggered solely by the change from "TN-C-S" to "TN-C-S (PME)" or "TN-C-S (PNB)" on the form — the underlying installation is unchanged. The change is purely in how the arrangement is recorded.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is TN-C-S (PNB) a new earthing arrangement created by A4:2026?',
      answer:
        'No — the underlying arrangement (a privately-owned combined PEN conductor downstream of an installation\'s own HV/LV transformer) has existed in UK practice for decades. What A4:2026 did was formally codify the term "TN-C-S (PNB)" on the BS 7671 model forms so that EICRs, EICs and Minor Works Certificates can distinguish it from "TN-C-S (PME)". The change is in documentation precision, not in the electrical engineering.',
    },
    {
      question: 'Do I need to redo old EICRs to record PNB instead of TN-C-S?',
      answer:
        "No. EICRs are point-in-time records; the form in use at the time of inspection was correct. The next periodic inspection (under A4) will record the arrangement using the new terminology. There's no statutory requirement to re-issue earlier EICRs, but where an installation is being significantly modified or a change-of-use occurs, the new design certificate (EIC) will use the A4 terminology naturally.",
    },
    {
      question: 'My EV charger installation guide mentions PME — does it apply to PNB too?',
      answer:
        "Not always. The PME-specific requirements for EV chargers (Chapter 72 / Section 722 of BS 7671 and the IET Code of Practice for EV Charging Equipment Installation) are designed for the distributor-owned PME network, where a broken neutral upstream can cause dangerous voltages on accessible metalwork. A4:2026 added Regulation 722.311.201, which allows load curtailment — automatic or manual load reduction or disconnection — to be factored into maximum demand calculations, easing the capacity constraint on multi-charger sites. PNB installations downstream of a privately-owned transformer have different broken-neutral exposure characteristics — consult the latest IET guidance for EV charging on PNB supplies, and verify the manufacturer's installation instructions specify both supply types.",
    },
    {
      question: 'Can I tick both "TN-C-S (PME)" and "TN-C-S (PNB)" if the installation has both?',
      answer:
        'In principle yes — a large site may have a PME-supplied entry building plus a privately-owned-transformer-fed PNB area. The EICR is typically issued per installation per certificate; if the inspection covers multiple installations or supply origins, each should be recorded separately. The A4 model form provides for "Other sources of supply" in Section I (with a tick-box and reference to a continuation sheet) — this is the correct place to record the secondary supply origin.',
    },
    {
      question: 'Does Section H of the new EICR show all the attached schedules?',
      answer:
        'Yes — Section H lists the continuation sheets and the attached Schedule of Inspection plus the Schedule of Circuit Details and Schedule of Test Results. The new A4 model forms preserve this structure but the underlying schedules have additional columns (reference method, maximum permitted Zs, AFDD test column 30, SPD type per board) as covered in the separate A4 Schedule of Tests guide.',
    },
    {
      question: 'Where does the maximum demand fit into the PME vs PNB question?',
      answer:
        'Maximum demand is recorded on Section J ("Particulars of Installation") of the A4:2026 EICR — typically as kVA and amperes per phase. The maximum demand figure is the same regardless of whether the supply is PME or PNB; the distinction matters for earthing/bonding decisions, not for load calculation. Where the maximum demand approaches the supply capacity (whether PME-distributor or PNB-private-transformer), the inspector may flag for further investigation.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) — All Changes',
      description:
        'Overview of every A4:2026 change including AFDD, luminaire RCD and new model forms.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-schedule-of-tests',
      title: 'A4:2026 Schedule of Tests New Columns',
      description:
        'Reference method, maximum permitted Zs, SPD type, "Supplied from" — every new column explained.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'A4:2026 AFDD Changes',
      description: 'New inspection item 4.23 and test results column 30 for AFDD recording.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description:
        'Digital A4:2026 EICR with TN-C-S (PME) and TN-C-S (PNB) earthing arrangement options.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Verify ADS compliance for TN systems — PME or PNB arrangements both supported.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/earthing-arrangements',
      title: 'Earthing Arrangements Overview',
      description: 'TN-C, TN-S, TN-C-S, TT, IT — every UK earthing arrangement compared.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Tick the right earthing arrangement every time',
  ctaSubheading:
    "Elec-Mate's A4:2026 digital EICR has TN-C-S (PME) and TN-C-S (PNB) as separate options, with built-in guidance on which applies based on the installation type. 7-day free trial.",
};
