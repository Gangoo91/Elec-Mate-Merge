import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, and the
// IET Code of Practice for Electric Vehicle Charging Equipment Installation
// (5th Edition).

const published = '2026-05-17';
const modified = '2026-05-17';

export const cableSizeForEVChargerConfig: GeneratedGuideConfig = {
  pagePath: '/guides/cable-size-for-ev-charger',
  title:
    'What Cable Size Do I Need for an EV Charger? (7 kW, 22 kW) | UK Sizing Guide | Elec-Mate',
  description:
    'Cable size for UK EV chargers explained: 6 mm² for most 7 kW domestic chargers, 10 mm² or 16 mm² for 22 kW three-phase. Cable type, route, derating factors, BS 7671 reference method and Section 722 compliance.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Cable Sizing',
  badgeIcon: 'Cable',
  breadcrumbLabel: 'Cable Size for EV Charger',
  heroPrefix: 'Cable Size for an',
  heroHighlight: 'EV Charger',
  heroSuffix: '(7 kW / 22 kW)',
  heroSubtitle:
    'The single most-asked cable-sizing question for UK domestic electricians. The short answer: 6 mm² twin-and-earth or 6 mm² SWA for a typical 32 A 7 kW single-phase home charger; 10 mm² or 16 mm² for a 22 kW three-phase unit. This guide walks the full sizing process including Section 722 PME mitigation requirements.',
  keyTakeaways: [
    'Typical 7 kW single-phase domestic EV charger: 32 A rated, 6 mm² twin-and-earth or 6 mm² SWA on most short runs — verify with full BS 7671 Appendix 4 calculation for your specific cable route, reference method and length.',
    'Typical 22 kW three-phase EV charger: 32 A per phase, 10 mm² four-core SWA for most short runs, stepping to 16 mm² for longer runs (typically >20-30 m depending on derating).',
    'BS 7671 Section 722 EV Charging governs the installation. Regulation 722.411.4.1 addresses PME open-PEN risk mitigation — a real concern on PME supplies feeding outdoor EV chargers.',
    'Three sizing checks matter: current-carrying capacity (Iz after derating), voltage drop (typically ≤ 3% from origin to charge point), and disconnection time at the calculated Zs.',
    'Reference method matters: cable in trunking vs buried direct vs free air all give different Iz values. The A4:2026 EICR/EIC Schedule of Circuit Details has a dedicated "Reference method" column to record the chosen method.',
    'Cable type matters: 6242Y (twin-and-earth) for clipped-direct routes through habitable spaces is fine; 6241X (SWA) for outdoor / buried / exposed runs; 6491X (single core) only inside conduit or trunking.',
  ],
  sections: [
    {
      id: 'short-answer',
      heading: 'The Short Answer (Most Common Scenarios)',
      tocLabel: 'Short answer',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For the typical UK domestic EV charger installation, the cable size most often specified is:',
        },
        {
          type: 'list',
          tone: 'pricing',
          items: [
            '**7 kW single-phase (32 A) charger, short run (under ~25 m), clipped-direct or in trunking through habitable space** → 6 mm² twin-and-earth (6242Y) or 6 mm² SWA (6241X) for buried/outdoor sections.',
            '**7 kW single-phase (32 A) charger, longer run (25-50 m)** → 10 mm² typically required to meet voltage-drop and disconnection-time targets. Calculate to confirm.',
            '**22 kW three-phase (32 A per phase) charger, short run (under ~20 m)** → 10 mm² four-core SWA.',
            '**22 kW three-phase (32 A per phase) charger, longer run (20-50 m)** → 16 mm² four-core SWA.',
            '**Three-phase 22 kW on very long runs (>50 m)** → 25 mm² or 35 mm² four-core SWA — voltage drop usually governs at this scale.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'These are starting points, not final answers',
          text:
            'Every EV charger installation must have its cable size calculated against BS 7671 Appendix 4 for the specific route, reference method, ambient temperature, grouping factor and load. Use the calculator linked at the end of this guide or perform the full design calculation yourself.',
        },
      ],
    },
    {
      id: 'three-checks',
      heading: 'The Three Cable Sizing Checks',
      tocLabel: 'Three checks',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Cable sizing for an EV charger (or any other load) is a three-stage check. The cable size you select must satisfy all three:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Current-carrying capacity (Iz)** — the cable must carry the design current Ib continuously without exceeding its maximum permitted conductor temperature. Iz is read from BS 7671 Appendix 4 tables (4D1A / 4D2A / 4D4A / 4E4A etc.) for the chosen cable type and reference method, then adjusted for ambient temperature (Ca) and grouping (Cg).',
            '**Voltage drop** — total voltage drop from the origin of the installation to the load must not exceed 3% for lighting circuits or 5% for other circuits (Regulation 525). For an EV charger, you typically design to 3% to leave headroom for the addition of other loads.',
            '**Disconnection time at calculated Zs** — the protective device must disconnect within the time specified in Tables 41.2 to 41.6 for the relevant disconnection time (0.4 s for fixed equipment ≤32 A in TN systems). This means Zs at the charger end must be below the maximum permitted Zs for the device.',
          ],
        },
      ],
    },
    {
      id: 'seven-kw-walkthrough',
      heading: 'Worked Example — 7 kW Single-Phase Charger, 20 m Run',
      tocLabel: '7 kW worked example',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A typical UK domestic EV charger installation: 7 kW, 32 A, 230 V, single-phase. Cable route 20 m from consumer unit to outdoor wall-mounted charge point on a TN-C-S (PME) supply.',
        },
        {
          type: 'list',
          items: [
            '**Design current (Ib)** = 7,000 W / 230 V ≈ 30.4 A. Round up to 32 A for the protective device (Type B MCB or 30 mA Type A RCBO).',
            '**Cable selection trial** — 6 mm² twin-and-earth (6242Y), reference method 100 (clipped direct or laid in a thermally insulating wall) — Iz from Appendix 4 = 47 A (single-phase, twin-and-earth, 70°C PVC, 30°C ambient, no grouping).',
            '**Derating** — assume Ca = 1.0 (typical UK 30°C ambient), Cg = 1.0 (single circuit). Adjusted Iz = 47 A. Ib (32 A) < Iz (47 A) — passes current capacity check.',
            '**Voltage drop** — 6 mm² 6242Y voltage drop per Appendix 4 ≈ 7.3 mV/A/m for two-core cable. For 20 m at 32 A: 7.3 × 32 × 20 / 1000 = 4.67 V ≈ 2.0% of 230 V. Passes voltage drop check (target ≤3%).',
            '**Disconnection time** — verify Zs at the charge point against the maximum permitted Zs for the chosen RCBO. Typical 32 A Type A 30 mA RCBO has a maximum permitted Zs around 1.37 Ω (Table 41.3 for Type B MCB equivalent, with RCD ensuring 0.4 s disconnection). Measured Zs typically well below this on a short PME run — pass.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Conclusion for this scenario',
          text:
            '6 mm² twin-and-earth, 32 A Type A 30 mA RCBO, satisfies all three checks for a 7 kW EV charger on a 20 m run.',
        },
      ],
    },
    {
      id: 'twenty-two-kw-walkthrough',
      heading: 'Worked Example — 22 kW Three-Phase Charger, 30 m Run',
      tocLabel: '22 kW worked example',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A 22 kW three-phase charger drawing 32 A per phase, 30 m cable route to an external location, on a TN-C-S (PME) supply.',
        },
        {
          type: 'list',
          items: [
            '**Design current per phase (Ib)** = 22,000 / (√3 × 400) ≈ 32 A. Protective device: 32 A Type C MCB or 32 A 30 mA Type A RCBO.',
            '**Cable selection trial** — 10 mm² four-core SWA, reference method E (in free air or on cable tray) — Iz from Appendix 4 typically around 51 A for four-core 10 mm² 70°C PVC SWA.',
            '**Derating** — for buried portions (Method D), apply the relevant table; for fully buried 10 mm² four-core SWA, Iz is around 47 A. Ib (32 A) < Iz (47 A) — passes.',
            '**Voltage drop** — 10 mm² three-phase voltage drop per Appendix 4 ≈ 4.4 mV/A/m for three-phase + neutral SWA. For 30 m at 32 A: 4.4 × 32 × 30 / 1000 = 4.22 V ≈ 1.06% of 400 V. Passes comfortably.',
            '**Disconnection time** — verify Zs at the charger. Three-phase 32 A device on a TN-C-S supply with proper bonding typically meets the 0.4 s requirement easily on 30 m of 10 mm² SWA — confirm with measurement.',
          ],
        },
      ],
    },
    {
      id: 'pme-open-pen-mitigation',
      heading: 'PME Open-PEN Conductor Mitigation (Regulation 722.411.4.1)',
      tocLabel: 'PME open-PEN',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671 Section 722 — EV Charging — addresses a specific safety concern with outdoor EV chargers on PME supplies. If the distributor\'s combined PEN conductor breaks upstream of the installation ("open-PEN"), the metal casing of an outdoor charger and any connected EV bodywork could become live at supply potential — a fatal shock hazard.',
        },
        {
          type: 'paragraph',
          text:
            'Three approved mitigation methods are commonly used:',
        },
        {
          type: 'list',
          items: [
            '**Open-PEN detection device** — a charger built with onboard voltage monitoring that disconnects the charging output if the PEN conductor fails. Many modern UK charge points have this built-in (e.g. Wallbox Pulsar Plus, Project EV, certain Ohme units).',
            '**TT earthing arrangement for the EV charging circuit** — installing a dedicated earth electrode for the EV charger circuit, electrically separated from the PME earthing system. Requires the charger to be on a TT-style RCD with appropriate disconnection arrangements.',
            '**Earth-mat or earth-rod with sufficient resistance** — less commonly used now that open-PEN detection chargers are widely available.',
        ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'TN-C-S (PNB) supplies have different exposure',
          text:
            'The open-PEN risk addressed by 722.411.4.1 is specific to distributor-owned PME supplies. TN-C-S (PNB) installations downstream of a privately-owned transformer have different broken-neutral exposure and the mitigation requirements may differ — consult the latest IET Code of Practice for EV charging.',
        },
      ],
    },
    {
      id: 'cable-type-selection',
      heading: 'Cable Type — Twin-and-Earth, SWA, or Single Core?',
      tocLabel: 'Cable type',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Choose cable type by the route. For an EV charger feed:',
        },
        {
          type: 'list',
          items: [
            '**6242Y twin-and-earth** — fine for routes entirely inside the dwelling (e.g. consumer unit to a charger on the inside of the garage wall). Not suitable for outdoor exposed runs, buried direct, or where cable abuse is foreseeable.',
            '**6241X SWA (Steel Wire Armoured)** — the workhorse for EV chargers. Suitable for buried direct (most common for external charger feeds), exterior wall surface mounting, and routes through outbuildings. Available as two-core for single-phase, four-core for three-phase.',
            '**6491X single core** — only inside conduit or trunking. Sometimes used for the final tail from a junction to the charger inside a metal enclosure, but rarely the main feed.',
            '**6491B single core for armouring earth** — where SWA is used and the armour serves as the CPC, ensure the design verifies that the armour\'s resistance meets BS 7671 requirements for the protective conductor.',
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common Cable Sizing Mistakes',
      tocLabel: 'Common mistakes',
      blocks: [
        {
          type: 'list',
          tone: 'warning',
          items: [
            '**Skipping the disconnection-time check** — many installers verify Iz and voltage drop, but forget to verify Zs against the maximum permitted Zs for the protective device. A cable that passes the first two checks can still fail the third on a long run or high-resistance termination.',
            '**Ignoring grouping factor** — when the EV charger cable runs alongside other loaded circuits (consumer unit to outbuilding feeding lights + sockets + charger), the grouping factor reduces Iz. Apply Cg from Table 4C1.',
            '**Using PVC tables for thermosetting cable (or vice versa)** — XLPE/EPR (90°C thermosetting) cables have higher Iz than PVC (70°C thermoplastic) of the same CSA. Match the cable specification to the table.',
            '**Forgetting the PME open-PEN mitigation** — installing a generic 32 A RCBO on a PME outdoor charger circuit without addressing 722.411.4.1 is a C2 observation on the next EICR.',
            '**Sizing on rated power only, not actual continuous current** — Ib is the actual current the load draws. A 7 kW charger nameplate-rated at 32 A draws very close to 32 A continuously when charging. Don\'t use the historical 80% rule that\'s appropriate for socket-outlet loading — EV charging is a steady-state load.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can I use 4 mm² cable for a 7 kW EV charger?',
      answer:
        '4 mm² twin-and-earth (Iz around 36 A in the most favourable reference method) might just satisfy the current-carrying capacity check for a 32 A charger on a very short run, but voltage drop typically fails beyond ~10-15 m. Most professional UK installers default to 6 mm² for 7 kW chargers because it provides headroom for voltage drop and grouping factors. 4 mm² may be acceptable for a 16 A charger (3.6 kW) on a short run.',
    },
    {
      question: 'What protective device do I install for a 7 kW EV charger?',
      answer:
        'A 32 A Type A 30 mA RCBO is the most common choice. Type A is preferred over Type AC because modern EV chargers can produce DC fault current components — Type AC RCDs may not detect these reliably. Some installers specify Type F (or higher) for chargers with frequency-converter electronics. Confirm the charger\'s installation manual — many manufacturers (e.g. Wallbox) require Type A as a minimum; some (e.g. certain Tesla Wall Connectors) require Type B for full DC fault detection.',
    },
    {
      question: 'Does the EV charger need a separate consumer unit?',
      answer:
        'Not required by BS 7671, but increasingly common in practice. Reasons to use a dedicated EV charging consumer unit: simpler load management, dedicated 32 A RCBO + isolator, clear separation for fault diagnosis, easier upgrade to three-phase later. Reasons against: extra cost, additional point of failure, more cable terminations. For most domestic 7 kW installations, fitting a dedicated RCBO in the existing consumer unit (if it has a spare way) is the simpler approach.',
    },
    {
      question: 'How does cable size change for a 22 kW three-phase charger?',
      answer:
        'A 22 kW three-phase charger draws 32 A per phase. The three-phase cable carries this current per core in a four-core (3 phase + neutral) configuration. 10 mm² four-core SWA handles up to ~50 A per core in free air and is the typical starting point for runs up to 20 m. For longer runs, voltage drop usually governs and 16 mm² becomes the practical choice. For very long runs (>50 m) at full 22 kW, 25 mm² or 35 mm² may be needed.',
    },
    {
      question: 'What about voltage drop on a long run?',
      answer:
        'BS 7671 Regulation 525 caps voltage drop at 3% for lighting and 5% for "other" circuits. EV charging is "other" — so 5% is the technical maximum — but designing to 3% leaves headroom and matches the lighting limit (sensible if the same supply also feeds lighting). On a long run (say 50 m), 6 mm² 7 kW would exceed 3% — step up to 10 mm² and recheck. Calculator below does the maths.',
    },
    {
      question: 'Do I need to consider grouping if the EV cable shares a trench with other cables?',
      answer:
        'Yes. BS 7671 Appendix 4 Table 4C1 (and equivalents for buried installations) gives grouping factors Cg that reduce Iz when multiple loaded cables share a trench, conduit, tray or trunking. A grouping factor of 0.8 means the cable\'s effective Iz is 80% of the un-grouped value. Apply Cg in your sizing calculation; the practical effect is that you often step up one size when the EV cable is grouped with other heavily-loaded cables.',
    },
    {
      question: 'Should I install conduit / trunking even where not strictly required?',
      answer:
        'For SWA buried direct, no — the armouring provides the mechanical protection BS 7671 requires. For 6242Y twin-and-earth running through a roof void or down through an external wall to an outdoor charger, conduit is sensible mechanical protection even where not strictly mandated. Confirm against the IET Code of Practice for EV Charging Equipment Installation for the latest practical guidance on cable management.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator (BS 7671 Appendix 4)',
      description: 'Free interactive calculator that does the Iz / voltage drop / Zs checks for any EV charger cable run.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/voltage-drop-calculator',
      title: 'Voltage Drop Calculator',
      description: 'Verify the 3% / 5% voltage drop limit per Regulation 525 for any cable length.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Check that Zs at the charger end satisfies the 0.4 s disconnection time per Regulation 411.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
      title: 'TN-C-S (PME) vs (PNB) Earthing',
      description: 'Why the supply earthing arrangement matters for the EV charger open-PEN mitigation.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'AFDD Changes A4:2026 — EV Charging Exemption',
      description: 'EV chargers conforming to BS EN 61851 are exempt from the standard AFDD requirements.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/ev-charger-certificate',
      title: 'EV Charger Certificate',
      description: 'Digital EV charger installation certificate with PME open-PEN mitigation declaration.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Size EV charger cables in seconds',
  ctaSubheading:
    'Elec-Mate\'s Cable Sizing Calculator runs all three BS 7671 checks (Iz / voltage drop / Zs) and the EV-specific Section 722 mitigation prompts for you. 7-day free trial.',
};
