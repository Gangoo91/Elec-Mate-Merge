import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 Chapter 82 (Prosumer's Electrical Installations),
// IET Guidance Note 3 (Inspection & Testing, 9th Edition) Reg 3.18, and the IET
// On-Site Guide Chapter 12 (Reg 12.1).

const published = '2026-05-17';
const modified = '2026-05-29';

export const prosumerLVInstallationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/prosumer-low-voltage-electrical-installation',
  title: "Prosumer's Low Voltage Electrical Installation (BS 7671 A4:2026 Chapter 82) | Elec-Mate",
  description:
    'A "prosumer" installation both consumes and produces electricity — solar PV, battery storage, EV V2G, wind, CHP.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'A4:2026 New Term',
  badgeIcon: 'Battery',
  breadcrumbLabel: 'Prosumer LV Installation',
  heroPrefix: "Prosumer's Low Voltage",
  heroHighlight: 'Electrical Installation',
  heroSuffix: '(BS 7671 Chapter 82)',
  heroSubtitle:
    'BS 7671:2018+A4:2026 introduced "Prosumer\'s low voltage electrical installation(s)" as a distinct installation type governed by the new Chapter 82 (Part 8 — Functional Requirements). This guide explains what counts as a prosumer installation, why Chapter 82 adds dedicated inspection requirements, and what UK electricians must check on every installation that both consumes and produces electricity.',
  keyTakeaways: [
    'A "prosumer" installation BOTH consumes energy from the supply AND produces energy that may be exported or used on-site — a combination of traditional "consumer" and "generator" roles.',
    'Typical UK prosumer sources (OSG Reg 12.1): photovoltaic (PV) generators, battery energy storage systems (BESS), small wind turbines, micro-CHP units, and EV vehicle-to-grid (V2G) arrangements where the EV exports back to the grid.',
    'Chapter 82 (Part 8 — Functional Requirements) of BS 7671:2018+A4:2026 is the regulatory home for prosumer electrical installations (PEIs). It provides requirements for the design, erection and verification of all low-voltage installations that include local production and/or storage of energy (Reg 722.826.3.201).',
    'Reg 110.1.2 explicitly brings PEIs — including those located external to buildings — within the scope of BS 7671, covering roof-mounted and ground-mounted PV arrays alike.',
    'Prosumer-specific inspection points under Chapter 82: bidirectional power flow, isolation arrangements per Reg 826.1.1.4 (a switch-disconnector per source plus warning notice or interlock), labelling per Reg 514.15.1, earthing co-ordination, and RCD type selection.',
    'Documentation obligation (GN3 Reg 3.18): the results of prosumer inspection items must be recorded separately and attached to the main EIC or EICR report — a distinct procedural requirement beyond the standard schedule.',
    'Section 712 (Solar PV) and the IET Code of Practice for Electrical Energy Storage Systems provide the supporting detailed requirements that Chapter 82 verifies compliance with.',
  ],
  sections: [
    {
      id: 'what-is-a-prosumer',
      heading: 'What is a Prosumer Installation?',
      tocLabel: 'What is a prosumer',
      blocks: [
        {
          type: 'paragraph',
          text: 'The word "prosumer" combines "producer" and "consumer" — an installation that does both. Traditionally, BS 7671 treated electrical installations as either consumers (drawing power from the grid) or generators (feeding power to the grid). A4:2026 formally recognises that modern UK installations increasingly do both — and need their own inspection treatment under the new Chapter 82. Regulation 110.1.2 explicitly brings prosumer\'s low voltage electrical installations (PEIs) within the scope of BS 7671, including those located external to buildings — so roof-mounted PV arrays, ground-mounted solar fields, and externally sited BESS enclosures all fall within scope.',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            '**Photovoltaic (PV) generators** — the most common UK prosumer source. The grid supplies what the PV cannot; the system exports surplus. (OSG Reg 12.1)',
            '**Battery energy storage systems (BESS)** — stores PV or off-peak grid energy for later use; may also export to the grid in V2G or ancillary service roles. (OSG Reg 12.1)',
            '**Small wind turbines** — uncommon at domestic scale in the UK, but a recognised prosumer source under OSG Reg 12.1 where present.',
            '**Micro-CHP units** — combined heat and power with grid synchronisation; increasingly seen in district heating schemes. (OSG Reg 12.1)',
            '**EV vehicle-to-grid (V2G)** — the EV battery exports back to the grid during peak hours. Growing under DNO V2G trials.',
          ],
        },
      ],
    },
    {
      id: 'why-item-14',
      heading: 'Why Chapter 82 Added Dedicated Prosumer Requirements',
      tocLabel: 'Why Chapter 82',
      blocks: [
        {
          type: 'paragraph',
          text: "Before A4:2026, prosumer installations were inspected under the general electrical installation rules with some cross-references to Section 712 (Solar PV) and the IET Code of Practice. A4:2026 introduced Chapter 82 because prosumer installations have specific failure modes that don't exist in traditional consumer-only installations:",
        },
        {
          type: 'list',
          items: [
            '**Bidirectional power flow** — protective devices and bonding must accommodate fault current flowing in either direction.',
            '**Isolation arrangements (Reg 826.1.1.4)** — "switched off" at the consumer unit no longer means "isolated from generation" if the PV or battery can back-feed the busbar. Chapter 82 requires a switch-disconnector per source, a durable warning notice, or a suitable interlock.',
            '**Labelling (Reg 514.15.1)** — the responsible person, future electricians, and emergency services need clear warning notices at the origin, the meter position, the consumer unit, and every point of isolation.',
            "**Earthing co-ordination** — solar PV DC strings, battery storage and the AC distribution system must share an earthing strategy that doesn't create earth loops or compromise protective device operation.",
            '**Separate documentation (GN3 Reg 3.18)** — prosumer inspection results must be recorded separately and attached to the main EIC or EICR report.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Chapter 82 makes prosumer compliance explicit',
          text: 'Before A4:2026, an inspector could complete an EIC without explicitly addressing prosumer equipment — any non-compliances surfaced as general observations against Sections 4, 5 or 6. Chapter 82 makes prosumer-specific inspection mandatory and clearly identified in the report (Reg 722.826.3.201).',
        },
      ],
    },
    {
      id: 'what-to-check',
      heading: 'What Chapter 82 Prosumer Inspection Actually Covers',
      tocLabel: 'What to check',
      blocks: [
        {
          type: 'paragraph',
          text: 'When confirming prosumer compliance under Chapter 82, you are verifying the prosumer-specific items below are all in order:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            "**G98/G99 compliance** — the inverter's grid-connection compliance with ENA Engineering Recommendation G98 (small-scale generation) or G99 (larger systems). DNO notification or approval where required. (ENA Engineering Recommendations — not a BS 7671 requirement, but must be checked as part of the overall compliance picture.)",
            '**Anti-islanding protection** — the inverter automatically disconnects from the grid on grid failure within the time specified by the applicable ENA Engineering Recommendation (G98 or G99). The specific time threshold is set by the ENA, not by BS 7671.',
            '**Type B RCD where required** — solar PV and battery storage with DC fault current production paths require Type B RCDs (or Type AC/A with proven DC fault detection). Type AC alone is generally NOT acceptable for prosumer circuits.',
            "**Earthing arrangement** — the AC side's earthing system and the DC side's earthing strategy are co-ordinated and don't create harmful earth loops. For battery storage, the BESS earthing follows the manufacturer's requirements and the IET Code of Practice for Electrical Energy Storage Systems.",
            '**Isolation and switching (Reg 826.1.1.4)** — a main switch suitable for isolation (e.g. a switch-disconnector) is provided for each source of supply. A durable warning notice is permanently fixed so that any person operating any one switch is warned of the need to operate all such switches to achieve isolation. Alternatively, a suitable interlock system is provided.',
            '**Labelling (Reg 514.15.1)** — durable warning notices at: (a) the origin of the installation, (b) the meter position if remote from the origin, (c) the consumer unit or distribution board, and (d) all points of isolation of all sources of supply.',
            "**Surge protection** — SPDs on the DC PV string per Section 712 and manufacturer's requirements.",
            '**Energy storage specific** — battery cell thermal monitoring, ventilation, fire-rated enclosure where required by manufacturer or by the IET Code of Practice.',
          ],
        },
      ],
    },
    {
      id: 'g98-vs-g99',
      heading: 'G98 vs G99 — Grid Connection Engineering Recommendations',
      tocLabel: 'G98 vs G99',
      blocks: [
        {
          type: 'paragraph',
          text: "The Energy Networks Association (ENA) Engineering Recommendations G98 and G99 govern how UK prosumer installations connect to the public distribution network. The installer's job is to verify G98/G99 compliance and complete the DNO notification or application:",
        },
        {
          type: 'list',
          items: [
            '**ENA G98** — small-scale generation. "Notify" process — the inverter must be type-approved per the G98 product specification, and the DNO is informed after commissioning within the period specified in G98. Thresholds and notification windows are set by the ENA Engineering Recommendation, not by BS 7671.',
            '**ENA G99** — larger generation. "Apply" process — DNO approval required BEFORE installation, including capacity studies on the local network if necessary.',
            '**G99 fast-track** — for type-approved equipment within agreed capacity envelopes, a faster approval pathway exists but DNO communication is still required.',
            '**Type approval database** — the ENA maintains a published list of type-approved G98/G99 inverters. Check the installed equipment is on the list before signing off the prosumer Chapter 82 inspection.',
          ],
        },
      ],
    },
    {
      id: 'typical-defects',
      heading: 'Typical Prosumer Inspection Defects',
      tocLabel: 'Typical defects',
      blocks: [
        {
          type: 'paragraph',
          text: 'During EICR inspection of existing prosumer installations, the following defects are commonly found and become coded observations:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            '**Missing G98 notification or G99 approval** — the inverter is installed but the DNO was never informed. Typically C2 because the grid network may not be designed for the export capacity; potential damage to other consumers or distribution equipment.',
            '**Inappropriate RCD type** — Type AC RCD on a circuit with PV / battery DC fault current paths. Typically C2 — the RCD may not detect DC fault components, leaving the circuit effectively unprotected.',
            "**Anti-islanding test failure** — the inverter doesn't disconnect from the grid within the time required by the applicable ENA Engineering Recommendation (G98 or G99) when grid failure is simulated. C1 if the system continues exporting (live-island hazard); C2 if it disconnects but takes longer than required.",
            '**Inadequate isolation arrangements** — no DC isolator between PV string and inverter; no AC isolator separate from the main consumer unit. C2 typically.',
            '**Missing or incorrect labelling** — no warning notice at the consumer unit indicating PV / battery presence. C2 or C3 depending on whether other warning provisions exist.',
            '**Earthing conflicts** — PV DC string earthed both at the inverter and at the array, creating an earth loop. Typically C3 unless symptoms of fault current circulation are present.',
            "**Battery storage installed without manufacturer's ventilation provision** — overheating risk. C2 typically.",
          ],
        },
      ],
    },
    {
      id: 'documentation',
      heading: 'Documentation You Need',
      tocLabel: 'Documentation',
      blocks: [
        {
          type: 'paragraph',
          text: 'A compliant prosumer installation has a paper trail beyond the EIC itself:',
        },
        {
          type: 'list',
          items: [
            '**EIC (BS 7671) for the AC installation** — covers the consumer-side circuits including the prosumer interface.',
            '**MCS certificate (where applicable)** — Microgeneration Certification Scheme certificate for the PV / battery / heat pump installation. Required for feed-in tariffs (legacy) and Smart Export Guarantee.',
            '**G98 notification or G99 approval** — DNO confirmation of grid connection compliance.',
            "**Manufacturer's installation certificate** — the inverter and battery storage manufacturer's commissioning certificate showing the equipment was correctly set up.",
            '**Circuit diagrams and labelling schedule** — typically required by the IET Code of Practice for Electrical Energy Storage Systems for installations over a threshold.',
            '**Battery storage specific risk assessment** — fire and thermal runaway considerations, especially for installations in occupied buildings.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Critical: prosumer results must be recorded separately',
          text: 'GN3 Regulation 3.18 requires that results of prosumer inspection items are recorded separately and attached to the main electrical installation report — they cannot simply be folded into the standard schedule. Inspectors who complete the general schedule without a separate prosumer annex are not meeting this obligation.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'My customer has solar PV but no battery — does Chapter 82 still apply?',
      answer:
        "Yes. Solar PV alone makes the installation a prosumer — it both consumes from the grid (when PV output is insufficient) and produces (exporting surplus). Chapter 82 applies, the G98/G99 notification is still required, and the same inspection points (anti-islanding, RCD type, isolation per Reg 826.1.1.4, labelling per Reg 514.15.1) apply. The battery makes the inspection more involved but isn't necessary for prosumer classification under BS 7671.",
    },
    {
      question:
        'What\'s the difference between "anti-islanding" and just disconnecting the inverter?',
      answer:
        'Anti-islanding specifically refers to the inverter detecting that the grid has failed (the grid is no longer present at the inverter\'s output terminals) and ceasing to export within the time window required by the applicable ENA Engineering Recommendation (G98 or G99). A "live island" is a dangerous scenario where the inverter continues to energise the local network as if it were the grid, exposing utility workers to live conductors on what they believe is an isolated section. Anti-islanding protection is verified during type-testing of the inverter and confirmed as part of the G98/G99 compliance check. The specific disconnection time threshold is defined by the ENA Engineering Recommendations, not by BS 7671 directly.',
    },
    {
      question: 'Can I install a battery storage system without notifying the DNO?',
      answer:
        'A battery storage system that does NOT export to the grid (i.e., used only for self-consumption and never feeding power back to the network) typically does not require G98/G99 notification — but the inverter still requires the appropriate G99 / G98 type approval if it has the technical capability to export, even if export is disabled by configuration. Most modern hybrid inverters CAN export, so the conservative practice is to notify under G98 regardless of the intended export mode. Verify with the DNO and the inverter manufacturer.',
    },
    {
      question: 'Does Chapter 82 apply to a standalone (off-grid) solar installation?',
      answer:
        'Strictly, no — a fully off-grid installation is not a prosumer installation because it does not consume from or produce to the public network. However, the technical requirements that Chapter 82 encapsulates (RCD type selection, isolation arrangements, labelling, earthing co-ordination) still matter for off-grid safety and should be addressed via the relevant general sections. The IET Code of Practice for Off-Grid Solar PV Systems provides additional guidance.',
    },
    {
      question: "What's the difference between Type A and Type B RCDs for prosumer installations?",
      answer:
        "Type AC RCDs detect AC residual current only. Type A detect AC plus pulsating DC. Type F detect AC, pulsating DC, and limited DC fault current. Type B detect AC, pulsating DC, and smooth DC fault current up to specified levels. Prosumer installations with PV strings or battery storage often have DC fault current paths that traditional Type AC won't reliably detect. The minimum specification depends on the inverter topology — some inverter manufacturers specify Type B downstream, others permit Type A. Always consult the inverter's installation manual.",
    },
    {
      question: 'Does an EICR inspection of an existing PV installation include Chapter 82 checks?',
      answer:
        'Yes — Chapter 82 applies to verification of existing prosumer installations as well as new work (Reg 722.826.3.201). The prosumer-specific inspection points (anti-islanding, RCD type, isolation per Reg 826.1.1.4, labelling per Reg 514.15.1) must be considered, and in line with GN3 Reg 3.18 the prosumer results must be recorded separately and attached to the EICR. On the EICR Schedule of Inspection, issues typically surface under items such as: item 2.0 (parallel or switched alternative sources of supply), item 5.0 (protective measures other than ADS), item 6.0 (additional protection), and item 11.0 (identification and notices). Issues raised may result in C1 / C2 / C3 observations depending on the specific defect found.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-eic-model-form',
      title: 'A4:2026 EIC Model Form Changes',
      description: 'A4:2026 EIC model form changes including prosumer inspection under Chapter 82.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description: 'Master index of every A4:2026 change including the new prosumer term.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/solar-pv-certificate',
      title: 'Solar PV Certificate',
      description: 'Digital certificate for the AC side of a solar PV prosumer installation.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/section-712-solar-pv',
      title: 'BS 7671 Section 712 Solar PV',
      description:
        'The DC-side and array-side requirements that complement the AC prosumer inspection.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection',
      description:
        'How RCD type selection matters across the whole installation, including prosumer circuits.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/eic-certificate',
      title: 'EIC Certificate Tool',
      description: 'Digital A4:2026 EIC with Chapter 82 prosumer inspection workflow built in.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Inspect prosumer installations with confidence',
  ctaSubheading:
    "Elec-Mate's digital A4:2026 EIC includes the Chapter 82 prosumer inspection workflow — G98/G99 compliance check, anti-islanding test recording, RCD type verification, labelling audit per Reg 514.15.1, and a separate prosumer annex to satisfy GN3 Reg 3.18. 7-day free trial.",
};
