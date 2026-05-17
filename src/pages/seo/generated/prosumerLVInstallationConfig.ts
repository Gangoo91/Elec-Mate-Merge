import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the BS 7671:2018+A4:2026 (18th Edition) Electrical Installation
// Certificate model form Schedule of Inspections item 14.0, plus IET
// Guidance Note 3 (Inspection & Testing, 9th Edition) and the IET On-Site
// Guide.

const published = '2026-05-17';
const modified = '2026-05-17';

export const prosumerLVInstallationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/prosumer-low-voltage-electrical-installation',
  title:
    'Prosumer\'s Low Voltage Electrical Installation (BS 7671 A4:2026 Item 14.0) | Elec-Mate',
  description:
    'A "prosumer" installation both consumes and produces electricity — solar PV, battery storage, EV V2G, wind, CHP. The new BS 7671:2018+A4:2026 EIC Schedule of Inspections item 14.0 explained.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'A4:2026 New Term',
  badgeIcon: 'Battery',
  breadcrumbLabel: 'Prosumer LV Installation',
  heroPrefix: 'Prosumer\'s Low Voltage',
  heroHighlight: 'Electrical Installation',
  heroSuffix: '(EIC Item 14.0)',
  heroSubtitle:
    'BS 7671:2018+A4:2026 introduced "Prosumer\'s low voltage electrical installation(s)" as a new inspection item (14.0) on the Electrical Installation Certificate Schedule of Inspections. This guide explains what counts as a prosumer installation, why it needs its own inspection point, and what UK electricians must check on every installation that both consumes and produces electricity.',
  keyTakeaways: [
    'A "prosumer" installation BOTH consumes energy from the supply AND produces energy that may be exported or used on-site — a combination of traditional "consumer" and "generator" roles.',
    'Typical UK prosumer installations: solar PV + battery storage + grid connection (most common); EV vehicle-to-grid (V2G); domestic wind; CHP with grid synchronisation; hybrid solar systems with islanding capability.',
    'Item 14.0 of the A4:2026 EIC Schedule of Inspections is dedicated to prosumer installations — every EIC issued under A4:2026 must consider whether the installation contains prosumer equipment and check it accordingly.',
    'Prosumer-specific inspection points: bidirectional power flow consideration, anti-islanding protection (G98/G99 compliance for grid connection), additional disconnection and isolation arrangements, prosumer-specific labelling, and earthing co-ordination between consumer and generation sides.',
    'For installations WITHOUT prosumer equipment: mark item 14.0 as N/A. The inspection item is conditional — it applies only where on-site generation / storage exists.',
    'Section 712 (Solar PV) and the IET Code of Practice for Electrical Energy Storage Systems provide the supporting detailed requirements that item 14.0 verifies compliance with.',
  ],
  sections: [
    {
      id: 'what-is-a-prosumer',
      heading: 'What is a Prosumer Installation?',
      tocLabel: 'What is a prosumer',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The word "prosumer" combines "producer" and "consumer" — an installation that does both. Traditionally, BS 7671 treated electrical installations as either consumers (drawing power from the grid) or generators (feeding power to the grid). A4:2026 formally recognises that modern UK installations increasingly do both — and need their own inspection treatment.',
        },
        {
          type: 'list',
          tone: 'info',
          items: [
            '**Solar PV + battery + grid** — by far the most common UK prosumer arrangement. The grid supplies what the PV + battery cannot; the system exports surplus when PV generation exceeds load.',
            '**EV vehicle-to-grid (V2G)** — the EV battery can export back to the grid during peak hours, returning to charging mode off-peak. Still uncommon but growing under DNO V2G trials.',
            '**Hybrid solar + battery with islanding** — the system can disconnect from the grid during a fault and supply critical loads from battery / PV alone. Common in rural and resilience-focused installations.',
            '**Domestic wind turbine + grid** — uncommon in the UK at domestic scale, but technically a prosumer arrangement where present.',
            '**Combined Heat and Power (CHP)** — typically commercial, but increasingly seen in district heating systems with grid synchronisation.',
          ],
        },
      ],
    },
    {
      id: 'why-item-14',
      heading: 'Why Item 14.0 Got Its Own Inspection Point',
      tocLabel: 'Why item 14.0',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Before A4:2026, prosumer installations were inspected under the general electrical installation rules with some cross-references to Section 712 (Solar PV) and the IET Code of Practice. A4 added item 14.0 because prosumer installations have specific failure modes that don\'t exist in traditional consumer-only installations:',
        },
        {
          type: 'list',
          items: [
            '**Bidirectional power flow** — protective devices and bonding must accommodate fault current flowing in either direction.',
            '**Anti-islanding protection** — the prosumer must NOT continue exporting to the grid when the grid supply is lost (a "live island" is dangerous to anyone working on the supposedly-isolated network).',
            '**Isolation arrangements** — "switched off" at the consumer unit no longer means "isolated from generation" if the PV or battery can back-feed the busbar.',
            '**Labelling** — the responsible person, future electricians, and emergency services need clear signage indicating multiple sources of supply.',
            '**Earthing co-ordination** — solar PV DC strings, battery storage and the AC distribution system must share an earthing strategy that doesn\'t create earth loops or compromise protective device operation.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'A dedicated inspection item makes prosumer compliance visible',
          text:
            'Before A4:2026, an inspector could complete an EIC without explicitly considering prosumer equipment — the system would be inspected under general rules and any non-compliances surfaced as observations against Sections 4, 5 or 6. Item 14.0 makes prosumer-specific inspection mandatory and visible on every EIC.',
        },
      ],
    },
    {
      id: 'what-to-check',
      heading: 'What Item 14.0 Inspection Actually Covers',
      tocLabel: 'What to check',
      blocks: [
        {
          type: 'paragraph',
          text:
            'When you tick "Acceptable" against item 14.0 on the EIC Schedule of Inspections, you\'re confirming the prosumer-specific items below are all in order:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            '**G98/G99 compliance** — the inverter\'s grid-connection compliance with ENA Engineering Recommendation G98 (small-scale, typically <16 A per phase) or G99 (larger systems). DNO notification or approval where required.',
            '**Anti-islanding protection** — the inverter automatically disconnects from the grid on grid failure within the time specified by G98/G99 (typically <2 seconds).',
            '**Type B RCD where required** — solar PV and battery storage with DC fault current production paths require Type B RCDs (or Type AC/A with proven DC fault detection). Type AC alone is generally NOT acceptable for prosumer circuits.',
            '**Earthing arrangement** — the AC side\'s earthing system and the DC side\'s earthing strategy are co-ordinated and don\'t create harmful earth loops. For battery storage, the BESS earthing follows the manufacturer\'s requirements and the IET Code of Practice for Electrical Energy Storage Systems.',
            '**Isolation and switching** — dedicated isolators for the PV DC string, the battery storage DC side, the AC inverter output, and the grid connection. Labelling clearly indicating each isolator\'s function and the order of operation for safe isolation.',
            '**Labelling** — warning notices at the origin / meter position indicating multiple sources of supply (Regulation 514). Warning at the consumer unit. Warning at each isolation point.',
            '**Surge protection** — SPDs on the AC side per Section 443 risk assessment; SPDs on the DC PV string per Section 712 / manufacturer\'s requirements.',
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
          text:
            'The Energy Networks Association (ENA) Engineering Recommendations G98 and G99 govern how UK prosumer installations connect to the public distribution network. The installer\'s job is to verify G98/G99 compliance and complete the DNO notification or application:',
        },
        {
          type: 'list',
          items: [
            '**ENA G98** — small-scale single-phase generation (typically up to 16 A per phase, so up to 3.68 kW single-phase or 11.04 kW three-phase). "Notify" process — the inverter must be type-approved per the G98 product specification, and the DNO is informed within 28 days of commissioning.',
            '**ENA G99** — larger generation. "Apply" process — DNO approval required BEFORE installation, including capacity studies on the local network if necessary.',
            '**G99 fast-track** — for type-approved equipment within agreed capacity envelopes, a faster approval pathway exists but DNO communication is still required.',
            '**Type approval database** — the ENA maintains a published list of type-approved G98/G99 inverters. Check the installed equipment is on the list before signing off the prosumer inspection.',
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
          text:
            'During EICR inspection of existing prosumer installations, the following defects are commonly found and become coded observations:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            '**Missing G98 notification or G99 approval** — the inverter is installed but the DNO was never informed. Typically C2 because the grid network may not be designed for the export capacity; potential damage to other consumers or distribution equipment.',
            '**Inappropriate RCD type** — Type AC RCD on a circuit with PV / battery DC fault current paths. Typically C2 — the RCD may not detect DC fault components, leaving the circuit effectively unprotected.',
            '**Anti-islanding test failure** — the inverter doesn\'t disconnect from the grid within the G98/G99 time when grid failure is simulated. C1 if the system continues exporting (live-island hazard); C2 if disconnects but takes longer than required.',
            '**Inadequate isolation arrangements** — no DC isolator between PV string and inverter; no AC isolator separate from the main consumer unit. C2 typically.',
            '**Missing or incorrect labelling** — no warning notice at the consumer unit indicating PV / battery presence. C2 or C3 depending on whether other warning provisions exist.',
            '**Earthing conflicts** — PV DC string earthed both at the inverter and at the array, creating an earth loop. Typically C3 unless symptoms of fault current circulation are present.',
            '**Battery storage installed without manufacturer\'s ventilation provision** — overheating risk. C2 typically.',
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
          text:
            'A compliant prosumer installation has a paper trail beyond the EIC itself:',
        },
        {
          type: 'list',
          items: [
            '**EIC (BS 7671) for the AC installation** — covers the consumer-side circuits including the prosumer interface.',
            '**MCS certificate (where applicable)** — Microgeneration Certification Scheme certificate for the PV / battery / heat pump installation. Required for feed-in tariffs (legacy) and Smart Export Guarantee.',
            '**G98 notification or G99 approval** — DNO confirmation of grid connection compliance.',
            '**Manufacturer\'s installation certificate** — the inverter and battery storage manufacturer\'s commissioning certificate showing the equipment was correctly set up.',
            '**Circuit diagrams and labelling schedule** — typically required by the IET Code of Practice for Electrical Energy Storage Systems for installations over a threshold.',
            '**Battery storage specific risk assessment** — fire and thermal runaway considerations, especially for installations in occupied buildings.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'My customer has solar PV but no battery — does item 14.0 still apply?',
      answer:
        'Yes. Solar PV alone makes the installation a prosumer — it both consumes from the grid (when PV output is insufficient) and produces (exporting surplus). Item 14.0 applies, the G98/G99 notification is still required, and the same inspection points (anti-islanding, RCD type, isolation, labelling) apply. The battery makes the inspection more involved but isn\'t necessary for prosumer classification.',
    },
    {
      question: 'What\'s the difference between "anti-islanding" and just disconnecting the inverter?',
      answer:
        'Anti-islanding specifically refers to the inverter detecting that the grid has failed (the grid is no longer present at the inverter\'s output terminals) and ceasing to export within a strict time window — typically less than 2 seconds for G98 / G99 compliant inverters. A "live island" is a dangerous scenario where the inverter continues to energise the local network as if it were the grid, exposing utility workers to live conductors on what they believe is an isolated section. Anti-islanding protection is mandatory under G98/G99 and is verified during type-testing of the inverter.',
    },
    {
      question: 'Can I install a battery storage system without notifying the DNO?',
      answer:
        'A battery storage system that does NOT export to the grid (i.e., used only for self-consumption and never feeding power back to the network) typically does not require G98/G99 notification — but the inverter still requires the appropriate G99 / G98 type approval if it has the technical capability to export, even if export is disabled by configuration. Most modern hybrid inverters CAN export, so the conservative practice is to notify under G98 regardless of the intended export mode. Verify with the DNO and the inverter manufacturer.',
    },
    {
      question: 'Does item 14.0 apply to a standalone (off-grid) solar installation?',
      answer:
        'Strictly, no — a fully off-grid installation isn\'t a prosumer because it doesn\'t consume from or produce to the public network. However, the inspection points covered by item 14.0 (RCD selection, isolation, labelling, earthing co-ordination) still matter for off-grid safety. In practice, an inspector reviewing an off-grid installation will typically mark item 14.0 as N/A but apply the underlying technical requirements via the other inspection sections. The IET Code of Practice for Off-Grid Solar PV Systems provides additional guidance.',
    },
    {
      question: 'What\'s the difference between Type A and Type B RCDs for prosumer installations?',
      answer:
        'Type AC RCDs detect AC residual current only. Type A detect AC plus pulsating DC. Type F detect AC, pulsating DC, and limited DC fault current. Type B detect AC, pulsating DC, and smooth DC fault current up to specified levels. Prosumer installations with PV strings or battery storage often have DC fault current paths that traditional Type AC won\'t reliably detect. The minimum specification depends on the inverter topology — some inverter manufacturers specify Type B downstream, others permit Type A. Always consult the inverter\'s installation manual.',
    },
    {
      question: 'Does an EICR inspection of an existing PV installation also check item 14.0?',
      answer:
        'The EICR model form (which is separate from the EIC) doesn\'t have an exact "item 14.0" — the EICR Schedule of Inspection uses different numbering. However, the prosumer-specific inspection points (anti-islanding, RCD type, isolation, labelling) are covered under various EICR items: item 2.0 (parallel or switched alternative sources of supply), item 5.0 (protective measures other than ADS), item 6.0 (additional protection), item 11.0 (identification and notices). Issues raised against any of these may result in C1 / C2 / C3 observations depending on the specific defect found.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-eic-model-form',
      title: 'A4:2026 EIC Model Form Changes',
      description: 'Where item 14.0 sits within the new Schedule of Inspections (items 1.0 to 14.0).',
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
      description: 'The DC-side and array-side requirements that complement the AC prosumer inspection.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection',
      description: 'How RCD type selection matters across the whole installation, including prosumer circuits.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/eic-certificate',
      title: 'EIC Certificate Tool',
      description: 'Digital A4:2026 EIC with item 14.0 prosumer inspection workflow built in.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Inspect prosumer installations with confidence',
  ctaSubheading:
    'Elec-Mate\'s digital A4:2026 EIC has the full item 14.0 prosumer inspection workflow — G98/G99 compliance check, anti-islanding test recording, RCD type verification, labelling audit. 7-day free trial.',
};
