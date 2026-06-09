import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-29';

export const cableSizeForElectricShowerConfig: GeneratedGuideConfig = {
  pagePath: '/guides/cable-size-for-electric-shower',
  title: 'Cable Size for an Electric Shower (8.5 / 9.5 / 10.8 kW)',
  description:
    'Cable size for UK electric showers explained: 6 mm² for most 8.5 kW units, 10 mm² for 9.5 kW and most 10.5/10.8 kW units.',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Cable Sizing',
  badgeIcon: 'Cable',
  breadcrumbLabel: 'Cable Size for Shower',
  heroPrefix: 'Cable Size for an',
  heroHighlight: 'Electric Shower',
  heroSuffix: '(8.5 / 9.5 / 10.8 kW)',
  heroSubtitle:
    'The most-asked UK domestic cable-sizing question after the EV charger. Short answer: 6 mm² twin-and-earth for most 8.5 kW units on short runs; 10 mm² for 9.5 kW and many 10.5/10.8 kW units. This guide walks the BS 7671 Section 701 + Appendix 4 process including RCD selection and the bathroom-zone implications.',
  answerBox: {
    question: 'What size cable do I need for an electric shower?',
    answer:
      'For most UK domestic showers: 6 mm² twin-and-earth suits an 8.5 kW unit (≈37 A) on a short, well-ventilated run, while 9.5 kW (≈41 A) and 10.5–10.8 kW (≈46–47 A) units take 10 mm². Longer runs or cable in insulation can push you to 16 mm². Every shower also needs a 30 mA RCD (BS 7671 701.411.3.3) and a double-pole isolator outside the bathroom zones.',
  },
  keyTakeaways: [
    '**8.5 kW shower (37 A)** — 6 mm² twin-and-earth typically suffices for short runs in good thermal conditions. Verify with BS 7671 Appendix 4 calculation.',
    '**9.5 kW shower (41 A)** — 10 mm² twin-and-earth is the standard UK practice; 6 mm² is borderline and typically fails voltage drop on longer runs.',
    '**10.5-10.8 kW shower (46-47 A)** — 10 mm² for short runs, possibly 16 mm² for longer runs depending on derating.',
    'Showers ARE in BS 7671 Section 701 (Locations Containing a Bath or Shower) — Regulation 701.411.3.3 requires 30 mA RCD protection on the shower circuit irrespective of cable size.',
    'A dedicated shower isolator (typically 45 A or 50 A double-pole) outside the bathroom zones is mandatory under Regulation 701.512.3 — switching arrangements within the location are restricted.',
    'The supply cable run from consumer unit to isolator and then to the shower terminal must satisfy current-carrying capacity (Iz), voltage drop (≤3% or 5% target), and disconnection time per Regulation 411.3.2 — all three checks always.',
  ],
  sections: [
    {
      id: 'short-answer',
      heading: 'The Short Answer',
      tocLabel: 'Short answer',
      blocks: [
        {
          type: 'paragraph',
          text: 'For a typical UK domestic electric shower installation, the cable size most often specified is:',
        },
        {
          type: 'list',
          tone: 'pricing',
          items: [
            '**7.5 kW shower (~33 A) on short run** → 6 mm² twin-and-earth with 40 A MCB / RCBO.',
            '**8.5 kW shower (~37 A) on short run** → 6 mm² twin-and-earth with 40 A protective device, voltage drop checked.',
            '**9.5 kW shower (~41 A)** → 10 mm² twin-and-earth with 50 A protective device. 6 mm² typically too small.',
            '**10.5-10.8 kW shower (~46-47 A)** → 10 mm² twin-and-earth with 50 A protective device on short runs; longer runs may need 16 mm².',
            '**11 kW+ shower** → 10 mm² minimum, 16 mm² for longer runs or where grouping/temperature derating applies; verify with Appendix 4.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Always verify against the actual installation',
          text: 'These are starting points, not final answers. Every shower installation requires the full BS 7671 sizing calculation against the specific cable route, reference method, ambient temperature, grouping factor, and supply earthing arrangement. Use the calculator linked at the end of this guide or perform the calculation yourself.',
        },
      ],
    },
    {
      id: 'design-current',
      heading: 'Calculating Design Current',
      tocLabel: 'Design current',
      blocks: [
        {
          type: 'paragraph',
          text: 'Design current (Ib) for an electric shower is the rated power divided by the nominal supply voltage. For UK domestic installations the nominal voltage is 230 V, so Ib (A) = rated power (W) ÷ 230.',
        },
        {
          type: 'list',
          tone: 'pricing',
          items: [
            '**7.5 kW** → 7,500 ÷ 230 ≈ **33 A** → 40 A device → 6 mm² (short run)',
            '**8.5 kW** → 8,500 ÷ 230 ≈ **37 A** → 40 A device → 6 mm² (short run, vd checked)',
            '**9.5 kW** → 9,500 ÷ 230 ≈ **41 A** → 45 A device → 10 mm²',
            '**10.5 kW** → 10,500 ÷ 230 ≈ **46 A** → 50 A device → 10 mm²',
            '**10.8 kW** → 10,800 ÷ 230 ≈ **47 A** → 50 A device → 10 mm²',
            '**11.5 kW** → 11,500 ÷ 230 ≈ **50 A** → 50 A device → 10 mm² (16 mm² on long runs)',
          ],
        },
        {
          type: 'paragraph',
          text: "Electric showers operate at maximum power for the full duration of use — there is no diversity to apply, so Ib is the full nameplate current. The protective device is the next standard MCB / RCBO rating at or above Ib: typically 40 A for 7.5–8.5 kW, 45 A or 50 A for 9.5 kW, and 50 A for 10.5–11.5 kW. The cable column above is the usual UK starting point; every run must still pass the three checks in the next section against its own length, reference method and ambient temperature.",
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Confirm the voltage on site',
          text: 'Some supplies sit closer to 240 V, which lowers Ib slightly, while the worst case for voltage drop is the declared 230 V. Use the nameplate kW and 230 V for sizing — never assume the shower runs below its rating.',
        },
      ],
    },
    {
      id: 'cable-sizing-checks',
      heading: 'The Three Cable Sizing Checks',
      tocLabel: 'Three checks',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cable sizing for a shower (same as for any load) is a three-stage check. The cable size selected must satisfy all three:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Current-carrying capacity (Iz)** — the cable must carry Ib continuously. Iz is read from BS 7671 Appendix 4 tables for the chosen cable type and reference method, adjusted by Ca (ambient temperature) and Cg (grouping).',
            '**Voltage drop** — total voltage drop from origin to load must not exceed 3% for lighting or 5% for "other" circuits (Regulation 525). Designing to 3% is good practice for shower circuits.',
'**Disconnection time at calculated Zs** — under BS 7671:2018+A4:2026 the Table 41.1 maximum disconnection times (0.4 s for a 230 V TN circuit) apply to final circuits rated up to 63 A with socket-outlets, and up to 32 A supplying only fixed equipment (Regulation 411.3.2.2). A shower is fixed equipment above 32 A, so the 5 s TN limit of Regulation 411.3.2.3 applies — but the mandatory 30 mA RCD (Regulation 701.411.3.3) brings the actual disconnection time far below that anyway.',
          ],
        },
      ],
    },
    {
      id: 'worked-example',
      heading: 'Worked Example — 9.5 kW Shower, 12 m Run',
      tocLabel: 'Worked example',
      blocks: [
        {
          type: 'paragraph',
          text: 'A 9.5 kW shower installed in a first-floor bathroom, 12 m cable route from consumer unit (in the ground-floor under-stair cupboard) up to the shower isolator outside the bathroom and then through to the shower unit. TN-C-S (PME) supply.',
        },
        {
          type: 'list',
          items: [
            '**Design current** Ib = 9,500 / 230 = 41.3 A. Protective device: 45 A Type B MCB or 45 A 30 mA Type A RCBO.',
            '**Cable selection trial** — 10 mm² twin-and-earth (6242Y), reference method 100 (clipped direct or laid in thermally insulating wall) — Iz from Appendix 4 = 64 A.',
            '**Derating** — assume Ca = 1.0 (UK 30°C ambient), Cg = 1.0 (single circuit). Adjusted Iz = 64 A. Ib (41.3 A) < Iz (64 A) — passes.',
            '**Voltage drop** — 10 mm² 6242Y voltage drop ≈ 4.4 mV/A/m. For 12 m at 41.3 A: 4.4 × 41.3 × 12 / 1000 = 2.18 V ≈ 0.95% of 230 V. Passes comfortably.',
            '**Disconnection time** — verify Zs at the shower. On a 12 m run of 10 mm² with proper bonding, Zs at the shower is typically 0.3-0.5 Ω. Maximum permitted Zs for a 45 A Type B MCB at 5 s (Table 41.3): around 1.0 Ω with corrections. Passes — and the RCD provides additional protection bringing actual disconnection well within Section 701 requirements.',
          ],
        },
      ],
    },
    {
      id: 'section-701-implications',
      heading: 'BS 7671 Section 701 — Bathroom Zone Implications',
      tocLabel: 'Section 701 zones',
      blocks: [
        {
          type: 'paragraph',
          text: 'An electric shower is installed in a Section 701 location (a location containing a bath or shower), so the cable size is only half the job — the zone, RCD, IP-rating and bonding rules apply to the whole circuit. The headline requirements are below; the [Section 701 bathrooms complete guide](/guides/section-701-bathrooms-complete-guide) covers the zone geometry in full.',
        },
        {
          type: 'list',
          items: [
            '**Regulation 701.411.3.3** — additional protection by RCD with rated residual operating current not exceeding 30 mA shall be provided for all low voltage circuits in the location.',
            '**Regulation 701.512.3** — switching, control and accessories in the location are restricted. The shower must have a dedicated isolator OUTSIDE the bathroom zones (typically a 45 A or 50 A double-pole switch in the airing cupboard, on the landing, or just outside the bathroom door). Zone accessory rules: Zone 0 — no switchgear or accessories whatsoever; Zone 1 — only switches of SELV circuits at &lt;=12 V AC RMS or 30 V ripple-free DC (SELV source must be outside zones 0, 1 and 2); Zone 2 — no switches or socket-outlets except SELV (Section 414) and shaver supply units complying with BS EN 61558-2-5. Pull-cord insulating cords and switches incorporated in fixed current-using equipment suitable for the zone are exempt from these restrictions.',
            '**Regulation 701.512.2** — electrical equipment in zones 1 and 2 must have minimum IP rating IPX4. The shower itself is normally rated to its installation position by the manufacturer.',
            '**Cable concealment** — cable concealed in walls of the location at depth less than 50 mm must either be mechanically protected, run within Earthed metallic conduit / trunking, or be 30 mA RCD protected. The RCD requirement of 701.411.3.3 covers the shower circuit naturally.',
            '**Regulation 411.3.4 (A4:2026) — bathroom lighting circuits** — in domestic premises, AC final circuits supplying luminaires must have additional 30 mA RCD protection (Regulation 411.3.4). When quoting for a new shower installation, check whether the consumer unit already provides RCBO or split-load RCD coverage for the bathroom lighting circuit. If lighting circuits are on an unprotected MCB, A4:2026 compliance requires an upgrade — this is a practical consequence that commonly affects shower installation quotes and should be identified at the initial survey stage.',
            '**Supplementary bonding (Regulation 701.415.2)** — supplementary protective equipotential bonding is required in every room containing a bath or shower, connecting the protective conductor terminals of each circuit to accessible extraneous-conductive-parts (metallic water/waste pipes, central heating, accessible structural metalwork). Omission is only permitted when ALL three conditions are met: (d) all final circuits of the location comply with Regulation 411.3.2 automatic disconnection; (e) all final circuits have additional RCD protection per Regulation 415.1.1; and (f) all extraneous-conductive-parts are effectively connected to the main protective equipotential bonding per Regulation 411.3.1.2. Where any condition is not met, supplementary bonding is mandatory regardless of when the installation was carried out.',
          ],
        },
      ],
    },
    {
      id: 'isolator-selection',
      heading: 'Shower Isolator Selection',
      tocLabel: 'Isolator',
      blocks: [
        {
          type: 'paragraph',
          text: 'The shower isolator is the dedicated double-pole switch that disconnects both line and neutral from the shower unit. It sits between the consumer unit / RCBO and the shower itself. Selection:',
        },
        {
          type: 'list',
          items: [
            '**Current rating** — equal to or greater than the protective device rating. For a 45 A RCBO, use a 45 A or 50 A isolator. For a 50 A RCBO, use a 50 A or higher isolator. Standard UK fittings are 45 A and 50 A.',
            '**Pole configuration** — double-pole (DP) — switches both line and neutral simultaneously. Single-pole isolators are not acceptable for a shower.',
            '**Location** — outside the bathroom zones. Typical positions: airing cupboard, landing wall, hallway just outside the bathroom door.',
            '**Pull-cord vs wall-switch** — both are acceptable. Pull-cord switches (BS 3676) are common above the bath where the user can reach them — note this is a different requirement from the BS 7671 Section 701 zone-3 restriction (no switching within the location).',
            '**Mechanical interlock** — some installers prefer a locked-off / locked-on key isolator for maintenance scenarios. Not strictly required by BS 7671 but useful good practice.',
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common Shower Cable Sizing Mistakes',
      tocLabel: 'Common mistakes',
      blocks: [
        {
          type: 'list',
          tone: 'warning',
          items: [
            '**Using 6 mm² for a 9.5 kW shower** — 6 mm² twin-and-earth has Iz around 47 A in the most favourable reference method. For a 41 A continuous load, this fails the voltage-drop check on most runs over 8-10 m. Default to 10 mm² for 9.5 kW unless the calculation explicitly justifies 6 mm².',
            '**Not accounting for cable in roof insulation** — Reference Method 101 (cable in thermally insulating wall) gives lower Iz than the same cable clipped direct. Many real installations have part of the route in loft insulation — apply the correct reference method to the worst-case section.',
            '**Forgetting the RCD** — Regulation 701.411.3.3 requires 30 mA RCD on every shower circuit. A 40 A Type B MCB with no RCD is non-compliant regardless of cable size.',
            '**Omitting the dedicated isolator** — installing the shower directly from the consumer unit with no dedicated isolator outside the bathroom is non-compliant with Regulation 701.512.3.',
            "**Mixing a 7.5 kW protective device with a 9.5 kW shower upgrade** — when upgrading the shower without upgrading the protective device, the old 40 A MCB may protect 6 mm² cable that is now overloaded by the 9.5 kW unit. Always re-check the whole circuit (cable, device and isolator) when changing the shower rating — the same discipline applies to the [cooker circuit](/guides/cable-size-for-cooker-circuit) and the [EV charger circuit](/guides/cable-size-for-ev-charger).",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can I use 6 mm² cable for a 9.5 kW shower?',
      answer:
        '6 mm² twin-and-earth has an Iz of around 47 A in the most favourable reference method (clipped direct in free air, 30°C ambient, no grouping). A 9.5 kW shower draws 41 A continuous. Current-carrying capacity check passes — but voltage drop typically fails on runs over 8-10 m, and the disconnection-time check becomes tight. The UK standard is to fit 10 mm² for 9.5 kW showers as a default, only stepping down to 6 mm² if the design calculation explicitly justifies it for a very short run.',
    },
    {
      question: 'What protective device do I install for a 10.5 kW shower?',
      answer:
        '10.5 kW at 230 V is approximately 46 A. The next standard protective device rating is 50 A. Use a 50 A Type B MCB or, preferably, a 50 A 30 mA Type A RCBO. Type A (or higher) is preferred over Type AC because modern showers with electronic temperature controls can produce DC fault current components. Combine the RCBO with a 50 A double-pole isolator outside the bathroom zones.',
    },
    {
      question: 'Does an electric shower need its own circuit?',
      answer:
        'Yes — practically and by good design practice. An electric shower is a continuous high-power load (40-50 A) that cannot share a final circuit with other loads. The dedicated circuit also makes RCD protection cleaner (Regulation 701.411.3.3), allows the dedicated isolator (701.512.3), and simplifies fault diagnosis. A shower sharing a circuit with any other equipment would require the cable and protective device to be sized for the combined maximum demand, and the additional load typically exceeds standard domestic cable capacities anyway.',
    },
    {
      question: 'Can the shower isolator be inside the bathroom?',
      answer:
        'No. Regulation 701.512.3 of BS 7671:2018+A4:2026 restricts switching, control and accessories within a Section 701 location (bath or shower location). The dedicated isolator must be outside the bathroom zones — typical positions are the airing cupboard, landing wall, or hallway just outside the bathroom door. A pull-cord switch ABOVE the bath / shower for switching is permitted by BS 7671 because the pull-cord ENGAGE point is in the location but the switching mechanism is in the ceiling void — but this is rarely the isolator itself, more often a shower controller.',
    },
    {
      question: 'How does the cable run affect the size?',
      answer:
        'Three factors of the run change the required size: (a) length — longer runs have higher voltage drop, often requiring an upsize; (b) reference method — cable clipped direct in free air has higher Iz than cable in thermally insulating wall or in conduit, often differing by 20-30%; (c) grouping with other loaded cables — if the shower cable runs through a trunking or conduit with other loaded circuits, Cg reduces Iz. The combined effect of a 15 m run in roof insulation alongside other lighting circuits can require stepping a 9.5 kW shower cable from 10 mm² to 16 mm².',
    },
    {
      question: 'What about voltage drop on a long run?',
      answer:
        'BS 7671 Regulation 525 sets the voltage-drop maximum at 3% for lighting and 5% for "other" circuits. A shower is "other" — so the technical maximum is 5%. In practice, designing to 3% leaves headroom for future modifications and ensures the shower performs at its rated power. On longer runs (>15 m) the voltage drop calculation often dictates the cable size — 10 mm² may technically satisfy current-carrying capacity but fail voltage drop, requiring 16 mm². Calculator below does the maths.',
    },
    {
      question: 'Can I fit a socket outlet near the shower?',
      answer:
        'Standard socket-outlets (13 A BS 1363) are prohibited within 2.50 m horizontally of the boundary of zone 1 — this is the Rule in Regulation 701.512.3. In practice, this means a socket outlet on a wall adjacent to the shower or bath is almost always within the exclusion distance and cannot be installed. Exceptions are: SELV socket-outlets complying with Section 414 of BS 7671, and shaver supply units that comply with BS EN 61558-2-5 (the standard shaver socket found in bathrooms), which may be installed in zone 2. A standard socket-outlet outside the bathroom door, beyond the 2.50 m horizontal distance from the zone 1 boundary, is acceptable.',
    },
    {
      question: 'Do I need a Type A RCD or is Type AC enough?',
      answer:
        'Modern UK showers with electronic temperature controls and SCR / triac-based heating element switching can produce DC fault current components. Type AC RCDs may not detect these reliably, leading to a failure-to-trip on a DC-component earth fault. Type A RCDs reliably detect AC and pulsating DC fault currents and are the appropriate default for shower installations. Type AC is still permitted by 701.411.3.3 itself but increasingly inadvisable. Some inspectors flag Type AC on a modern shower circuit as a C3 ("Improvement recommended").',
    },
  ],
  relatedPages: [
    {
      href: '/tools/cable-sizing-calculator',
      title: 'Cable Sizing Calculator (BS 7671 Appendix 4)',
      description:
        'Free interactive calculator that does the Iz / voltage drop / Zs checks for any shower cable run.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/tools/voltage-drop-calculator',
      title: 'Voltage Drop Calculator',
      description:
        'Verify the 3% / 5% voltage drop limit per Regulation 525 for the shower cable run.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/cable-size-for-ev-charger',
      title: 'Cable Size for an EV Charger',
      description:
        'Same three-check process applied to the other major UK domestic cable-sizing question.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/section-701-bathrooms-complete-guide',
      title: 'BS 7671 Section 701 Bathrooms Complete Guide',
      description:
        'The wider zone, RCD, equipment IP and bonding requirements for bathroom installations.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection',
      description:
        'Why all-RCBO consumer units have become the default — bathroom lighting circuits get the same RCD as the shower.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/earth-loop-impedance-calculator',
      title: 'Earth Loop Impedance (Zs) Calculator',
      description: 'Check Zs at the shower satisfies the disconnection-time requirement.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Size shower cables in seconds',
  ctaSubheading:
    "Elec-Mate's Cable Sizing Calculator runs all three BS 7671 checks (Iz / voltage drop / Zs) and includes Section 701 zone reminders for bathroom installations. 7-day free trial.",
};
