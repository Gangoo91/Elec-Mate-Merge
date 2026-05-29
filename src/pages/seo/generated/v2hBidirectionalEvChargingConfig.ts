import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026,
// Section 722 + Chapter 82 Prosumer's Electrical Installations), IET Code of Practice for Electric Vehicle Charging
// Equipment Installation (5th Edition), Engineering Recommendation G98/G99 and
// the Electric Vehicles (Smart Charge Points) Regulations 2021.

const published = '2026-05-17';
const modified = '2026-05-18';

export const v2hBidirectionalEvChargingConfig: GeneratedGuideConfig = {
  pagePath: '/guides/v2h-bidirectional-ev-charging',
  title: 'V2H Bidirectional EV Charging Installation Guide (UK) — BS',
  description:
    'Vehicle-to-Home (V2H) bidirectional EV charging installation guide for UK electricians — V2G vs V2H vs V2L, CHAdeMO vs CCS, ISO 15118-20…',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'EV Charging — Bidirectional',
  badgeIcon: 'Zap',
  breadcrumbLabel: 'V2H Bidirectional EV Charging',
  heroPrefix: 'V2H Bidirectional',
  heroHighlight: 'EV Charging',
  heroSuffix: '— UK Installation Guide',
  heroSubtitle:
    "Vehicle-to-Home (V2H) bidirectional charging turns a parked electric vehicle into a multi-tens-of-kWh home battery — large enough to run a typical UK household for several days off-grid and to arbitrage Octopus Intelligent tariffs profitably. For UK electricians, the install brings together BS 7671 Section 722, Chapter 82 (Prosumer's Electrical Installations), the IET Code of Practice for EV Charging (5th Edition), Engineering Recommendation G99, and the Electric Vehicles (Smart Charge Points) Regulations 2021. This guide walks through the technology, the architecture choices, the DNO paperwork and the EICR implications.",
  keyTakeaways: [
    'V2G (Vehicle-to-Grid), V2H (Vehicle-to-Home) and V2L (Vehicle-to-Load) are three distinct modes — V2G feeds the public network and requires G99 export approval; V2H feeds the dwelling only and may sit under G98 if appropriately rated; V2L is a portable AC socket on the vehicle for tools and appliances.',
    'CHAdeMO vehicles (notably the Nissan Leaf and e-NV200) have supported bidirectional DC for nearly a decade; CCS vehicles only gained mainstream bidirectional support with ISO 15118-20 from 2024-2026, with model availability still patchy as of 2026.',
    'V2H installations split between DC-coupled (charger handles both rectification and inversion, vehicle exports raw DC) and AC-coupled (vehicle exports AC via its onboard inverter, charger acts as a contactor and meter) — the architecture drives the inverter selection and the BS 7671 Chapter 82 prosumer treatment.',
    "BS 7671:2018+A4:2026 Chapter 82 governs Prosumer's Electrical Installations (PEIs) — a V2H charger that exports into the dwelling is a prosumer source and must be designed to Chapter 82 alongside Section 722. Section 712 governs solar PV systems only (Reg 711.42). Reg 570.4 explicitly cross-references Section 722 and Chapter 82 for vehicle-to-installation supply.",
    'Reg 722.311.201 (A4:2026) explicitly permits EV load curtailment — automatic or manual load reduction or disconnection — to be factored into maximum demand calculations. For V2H installs where discharge reduces peak demand, this can justify a smaller incoming supply or avoid an upgrade.',
    'G99 (Engineering Recommendation) governs DNO notification for any generation that can export to the public network. A pure-V2H install with no export and a verifiable export-limit device may stay under G98 thresholds, but most modern bidirectional chargers default to G99.',
    'Island-mode (off-grid) operation requires a transfer switch, neutral-earth bonding considerations under the Electricity Safety, Quality and Continuity Regulations 2002, and careful EICR coding under BS 7671:2018+A4:2026.',
  ],
  sections: [
    {
      id: 'v2g-v2h-v2l',
      heading: 'V2G vs V2H vs V2L — The Three Bidirectional Modes',
      tocLabel: 'V2G, V2H, V2L',
      blocks: [
        {
          type: 'paragraph',
          text: 'Three acronyms get used interchangeably in marketing copy, but they describe materially different installations with materially different paperwork. Before specifying a charger, the electrician must know which one the client actually wants — the DNO notification, the inverter rating and the BS 7671 treatment all change.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'V2G — Vehicle-to-Grid. The vehicle exports power into the public distribution network and surplus is sold to the grid via a flexibility platform such as Octopus Power Pack. Always G99 notifiable. Requires a smart export meter and an export limit on the inverter.',
            'V2H — Vehicle-to-Home. The vehicle exports power into the dwelling only. No power is sold to the grid; surplus household generation can charge the vehicle. The most common architecture for UK homeowners because the economic case is tariff arbitrage. May sit under G98 with a verifiable export-limit device, but most installations default to G99.',
            'V2L — Vehicle-to-Load. The vehicle provides a standalone AC outlet (typically 13 A or 16 A) via an adapter or built-in socket. No charger involved, no DNO interaction, no BS 7671 prosumer treatment. Examples: Kia EV6, Hyundai Ioniq 5, Ford F-150 Lightning.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Which one is the client actually asking for?',
          text: 'When a client says "bidirectional charger" they almost always mean V2H — lower bills via tariff arbitrage and backup for outages. Only a small minority want true V2G with grid export. Confirm before quoting — V2G needs a flexibility platform contract, export meter and full G99 notification.',
        },
        {
          type: 'paragraph',
          text: 'For the underlying BS 7671 framework that governs all three modes, see our [Section 722 EV charging A4:2026 changes guide](/guides/section-722-ev-charging-a4-2026-changes). For the Chapter 82 prosumer interaction rules that apply to V2H and V2G, see our [prosumer A4:2026 guide](/guides/section-712-prosumer-a4-2026).',
        },
      ],
    },
    {
      id: 'chademo-vs-ccs',
      heading: 'CHAdeMO vs CCS — Which Vehicles Actually Support Bidirectional?',
      tocLabel: 'CHAdeMO vs CCS',
      blocks: [
        {
          type: 'paragraph',
          text: 'The connector determines whether bidirectional charging works at all. The two DC fast-charge standards on the UK road — CHAdeMO and CCS Combo 2 — have very different bidirectional histories.',
        },
        {
          type: 'list',
          items: [
            'CHAdeMO — the Japanese DC standard, designed bidirectional from the outset (CHAdeMO 0.9 supported V2X in 2010). The Nissan Leaf, e-NV200 and Mitsubishi Outlander PHEV have been the UK fleet for early V2H trials. Being phased out on new vehicles but the installed base supports bidirectional today via Wallbox, Indra, dcbel and EVTec.',
            'CCS Combo 2 — the European DC standard, originally unidirectional. Bidirectional CCS requires ISO 15118-20, which only reached production in 2024-2025. As of 2026, support is patchy — confirmed on certain VW ID. models, Polestar 3, BYD Atto 3, MG4 (firmware) and a growing list of Hyundai/Kia E-GMP vehicles.',
            'Type 2 (AC) — most home chargers use Type 2, which is AC only. Bidirectional AC via Type 2 exists (vehicle inverter does the conversion) but is rare; Renault was the early advocate.',
            'Tesla NACS — Tesla has publicly committed to bidirectional on the Cybertruck and later models, but UK rollout remains limited as of mid-2026.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Check the specific vehicle, not just the brand',
          text: 'Bidirectional capability is firmware-controlled and model-year-specific. A 2024 Hyundai Ioniq 5 may not support bidirectional via CCS while a 2026 Ioniq 5 of the same trim does. Always check the manufacturer documentation for the specific model year and trim before specifying the charger.',
        },
      ],
    },
    {
      id: 'iso-15118-20',
      heading: 'ISO 15118-20 — The Communication Protocol That Makes V2X Work',
      tocLabel: 'ISO 15118-20',
      blocks: [
        {
          type: 'paragraph',
          text: 'ISO 15118 defines how an EV and a charger talk beyond the basic "cable plugged in" pilot signal. ISO 15118-2 (2014) defined Plug & Charge and basic high-level communication. ISO 15118-20 (2022) is the bidirectional extension — the standard that turns the vehicle from a passive load into a managed two-way power source.',
        },
        {
          type: 'list',
          items: [
            'ISO 15118-20 defines bidirectional power transfer (BPT) for AC and DC, scheduled export sessions, the safety handshake for power-flow reversal, and the cryptographic identity that ties a vehicle to a tariff or flexibility contract.',
            'Without ISO 15118-20 (or the older CHAdeMO 0.9+ protocol), the vehicle and charger cannot agree on direction of flow. A charger that only speaks ISO 15118-2 cannot draw power from a vehicle.',
            'ISO 15118-20 requires TLS-secured Power Line Communication over the CCS pilot wire plus a Plug & Charge digital certificate chain — significantly more demanding than basic CP/PE signalling on a Mode 3 unidirectional charger.',
            'The CharIN consortium maintains conformance testing. Look for "CharIN tested for bidirectional power transfer" in datasheets — "ISO 15118-20 ready" is sometimes used for hardware that has not yet completed conformance.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For UK installs in 2026, the practical implication is that the charger and vehicle must be a matched pair from a tested compatibility list. Wallbox Quasar 2, Indra V2H, dcbel r16 and EVTec hybrid units publish compatibility matrices — treat these as gospel.',
        },
      ],
    },
    {
      id: 'dc-vs-ac-architectures',
      heading: 'DC-Coupled vs AC-Coupled Bidirectional Architectures',
      tocLabel: 'DC vs AC architectures',
      blocks: [
        {
          type: 'paragraph',
          text: 'A bidirectional charger converts between the DC inside the vehicle battery and the AC inside the dwelling. Where that conversion happens — inside the charger (DC-coupled) or inside the vehicle (AC-coupled) — drives the inverter rating, the cable size, the BS 7671 treatment and the cost.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'DC-coupled bidirectional — the charger contains a full bidirectional inverter. The vehicle exports raw DC over the CHAdeMO or CCS pilot; the charger converts to 230 V AC and feeds the consumer unit. Typical rating 7-11 kW for V2H, up to 22 kW for commercial V2G. Examples: Wallbox Quasar 2, Indra V2H, EVTec hybrid.',
            "AC-coupled bidirectional — the vehicle's onboard inverter does the conversion. The charger is essentially a smart contactor with metering and ISO 15118-20 comms. Lower charger cost, limited by the vehicle's onboard inverter (typically 7-11 kW). Examples: certain Renault models, Wallbox Pulsar in V2H mode.",
            'Split-architecture — a DC charger feeds a separate hybrid solar/battery inverter. Vehicle and home battery share the inverter. Examples: dcbel r16, Sigenergy SigenStor with EV add-on. More complex but one inverter handles solar, home battery and V2H — useful where the customer already has PV.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why this matters for the install',
          text: 'A DC-coupled charger is the prosumer source under BS 7671 Chapter 82 and needs a substantial AC feed (typically 32-40 A radial). An AC-coupled charger has the same supply but the vehicle is the prosumer source. The Chapter 82 cabling, isolation and labelling requirements apply to whichever device is the AC-side inverter — get the architecture wrong on the design and the isolation arrangements end up in the wrong place.',
        },
      ],
    },
    {
      id: 'inverter-requirements',
      heading: 'Inverter Requirements — UPS-Style vs Grid-Tied',
      tocLabel: 'Inverter requirements',
      blocks: [
        {
          type: 'paragraph',
          text: "A bidirectional EV charger's inverter has to do two jobs normally done by two products. In grid-tied mode it synchronises with the public supply. In island mode (grid down) it becomes the voltage and frequency reference for the dwelling — the role of an uninterruptible power supply.",
        },
        {
          type: 'list',
          items: [
            'Grid-tied operation must comply with G99 Type Tested (or G98 if eligible) — anti-islanding, vector shift, RoCoF limits and the voltage/frequency envelope from the relevant ENA Engineering Recommendation.',
            'Island-mode operation requires the inverter to be a true grid-forming source — black-start into a dead load, 230 V ± 10% and 50 Hz ± 1%, tolerating motor starts (fridges, heat pumps) without collapsing voltage.',
            'Transfer between modes requires a transfer switch (manual or automatic) and protection against back-feeding the grid during an outage. The transfer switch is a Chapter 82 component and must be labelled, isolatable and accessible.',
            'Neutral-earth bonding in island mode must be re-established at the inverter or a dedicated bonding contactor — otherwise RCD protection will not operate for L-PE faults.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Not every bidirectional charger supports island mode',
          text: 'Many cheaper bidirectional units only support grid-tied export — when the grid goes down, the charger disconnects under G99 anti-islanding and the household loses power even though the vehicle is full. If the customer wants backup during an outage, confirm true grid-forming island-mode capability and specify a transfer switch. Often a £1,000-£2,000 cost premium over basic V2H.',
        },
      ],
    },
    {
      id: 'section-712-prosumer',
      heading: "BS 7671 Chapter 82 — Prosumer's Electrical Installations",
      tocLabel: 'Chapter 82 prosumer',
      blocks: [
        {
          type: 'paragraph',
          text: 'BS 7671:2018+A4:2026 introduced Chapter 82 — Prosumer\'s Electrical Installations (PEIs) — for dwellings that both consume and produce electricity. A V2H bidirectional EV charger is a prosumer source, and Chapter 82 governs how it integrates with the rest of the installation (Reg 722.826.3.201 confirms Chapter 82 applies wherever local production or storage of energy is present). Section 712 governs solar PV systems only; Reg 570.4 cross-references "Section 722 and Chapter 82" specifically for vehicle-to-installation supply.',
        },
        {
          type: 'list',
          items: [
            'Identification — the prosumer source must be labelled at the consumer unit, source enclosure and any isolation point, identifying the source as "Vehicle-to-Home — bidirectional" and warning that the source remains live after grid disconnection.',
            'Isolation — a dedicated, lockable isolator between the prosumer source and the rest of the installation. Typically a 40 A DP isolator local to the unit, in addition to supply isolation at the consumer unit.',
            'Protective coordination in all operating modes — Reg 826.1.1.1 requires that protection of persons and property is provided in every intended operating mode of a PEI, including both grid-tied and island mode. Where ADS is relied upon, the earthing arrangement may differ between modes and shall be designed accordingly.',
            'PEN conductor prohibition (Reg 722.312.2.1) — a circuit supplying EV charging equipment on a TN system shall not include a PEN conductor. On TN-C-S (PME) supplies, the combined neutral-earth must be separated upstream of the EV circuit.',
            'RCD selection — Section 722 requires Type B (or Type A with separate DC fault detection) for EV charging. The same applies to bidirectional units, with additional consideration where DC injection could occur during export.',
            "Load curtailment and maximum demand (Reg 722.311.201) — automatic or manual load curtailment, including reduction or disconnection of the EV load, may be taken into account when determining maximum demand. Where a V2H charger's discharge reduces peak demand on the installation, this is permissible in the demand calculation.",
            "Overcurrent coordination — the prosumer source contributes fault current. The breaker at the consumer unit must coordinate with the inverter's downstream protection so a fault doesn't trip both and de-energise the dwelling.",
          ],
        },
        {
          type: 'paragraph',
          text: 'For a deeper walk-through of the prosumer rules introduced in A4:2026, see our [Section 712 prosumer A4:2026 guide](/guides/section-712-prosumer-a4-2026). For the EV-specific Section 722 changes, see our [Section 722 EV charging A4:2026 changes](/guides/section-722-ev-charging-a4-2026-changes).',
        },
      ],
    },
    {
      id: 'g99-dno-notification',
      heading: 'G99 DNO Notification — Thresholds and Timelines',
      tocLabel: 'G99 DNO notification',
      blocks: [
        {
          type: 'paragraph',
          text: 'Engineering Recommendation G99 governs the connection of generation to the UK distribution network. If a V2H installation can export to the grid — even briefly — it falls under G99. The G98 framework covers single-phase installations up to 16 A per phase (3.68 kW) with a "fit and inform" approach; anything larger needs prior DNO approval under G99.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'G98 Type Tested — micro-generation up to 16 A per phase, with a Type Tested device on the ENA register. Installer connects and notifies the DNO within 28 days. A small V2H unit with verifiable export limit at 3.68 kW per phase can sometimes sit here, but most bidirectional chargers exceed this rating.',
            'G99 Fast Track — single Type Tested units up to 11 kW (single-phase) or 17 kW (three-phase) where the network has capacity. Application via the ENA Connect Direct portal; DNO responds within 10 working days. Most domestic V2H installs sit here.',
            "G99 Full Application — above Fast Track or where the network can't accommodate without study. Up to 65 working days plus any reinforcement costs. Rare for V2H, common for commercial V2G.",
            'Export limitation — a Type Tested export limitation device on the inverter can keep a high-rated unit within a lower G98/G99 threshold. The DNO will require evidence (commissioning print-out, datasheet, photos) that the limit is enforced.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Notify the DNO before energising — not after',
          text: 'G99 Fast Track requires prior approval. Installing a bidirectional charger and only notifying afterwards is non-compliant and can lead to disconnection orders. Build the 10-working-day response into the project programme — start the application as soon as equipment is selected.',
        },
      ],
    },
    {
      id: 'island-mode',
      heading: 'Island-Mode Operation — Loss of Mains',
      tocLabel: 'Island-mode operation',
      blocks: [
        {
          type: 'paragraph',
          text: 'The most compelling V2H pitch is "you keep the lights on when the grid goes down". Delivering this requires a transfer switch, careful earthing design and a clear understanding of which circuits will be supplied during an outage.',
        },
        {
          type: 'list',
          items: [
            'Transfer switch — disconnects the dwelling from the grid and connects it to the inverter when the grid fails. Manual (cheaper, customer operated) or automatic (seamless). A Chapter 82 component — must be labelled and accessible.',
            'Backup-only consumer unit — many V2H installs use a sub-CU fed via the transfer switch, supplying only the circuits the customer wants kept live (lighting, fridge, broadband, heating controls). Reduces inverter load and extends run-time.',
            'Whole-house backup — possible with a larger inverter (11 kW+) and whole-house transfer switch, but the load profile must be managed (no electric showers, no immersion). Heat pumps may run if the inverter has enough surge capacity.',
            'Neutral-earth bonding — in island mode the dwelling is no longer referenced to the substation neutral. A bond must be re-established at the inverter side of the transfer switch, otherwise RCDs cannot trip on L-PE faults. Chapter 82 Reg 826.1.1.1 requires that ADS protection remains effective in every intended operating mode of the PEI — earthing arrangements may differ between grid-tied and island mode and shall be designed to maintain protection in both.',
            'Loss-of-mains — when the grid returns, the inverter must detect this and re-synchronise gracefully. G99 specifies the timings; the Type Tested certificate confirms compliance.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'How long will the vehicle keep the lights on?',
          text: 'A typical UK household consumes 8-12 kWh per day. A 60 kWh battery can supply the dwelling for 5-7 days if drained to a low SOC. In practice most V2H installs set a 20-30% reserve so the vehicle remains drivable, giving 3-5 days of practical backup — far longer than any home battery on the market.',
        },
      ],
    },
    {
      id: 'tariff-arbitrage',
      heading: 'Tariff Arbitrage — The Financial Case',
      tocLabel: 'Tariff arbitrage',
      blocks: [
        {
          type: 'paragraph',
          text: 'The economic case for V2H rests on the spread between cheap overnight electricity (Octopus Intelligent, Octopus Go, EDF GoElectric) and expensive daytime electricity. A vehicle charged at 7-10p/kWh and discharged during the 4-7pm peak at 30-40p/kWh saves the spread, less round-trip efficiency losses (typically 72-81% round-trip).',
        },
        {
          type: 'list',
          items: [
            'Octopus Intelligent — 7p/kWh overnight (typically 23:30-05:30, extended to other slots when grid conditions favour it). A vehicle charged at 7p and discharged at 28p saves roughly 21p/kWh less losses. With 8 kWh of daily arbitrage, roughly £500-£600 saved per year.',
            'Octopus Power Pack / Flexibility — pays the customer for grid services (frequency response, peak shaving). Typical 2025-2026 earnings £400-£900 per year on top of arbitrage. Requires V2G capability, not just V2H.',
            'Battery degradation cost — manufacturer data suggests 0.5-1.5p/kWh wear cost on modern LFP and NMC chemistries. Dwarfed by the tariff spread for most calculations, but must be modelled.',
            'Capital recovery — a V2H charger with installation typically costs £4,000-£7,000 in 2026. Payback 5-9 years for arbitrage alone, faster with V2G flexibility income.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For the broader smart-tariff context that V2H plugs into, see our [smart EV charging guide](/guides/smart-ev-charging). For the underlying unidirectional install that precedes any bidirectional upgrade, see [EV charger installation](/guides/ev-charger-installation).',
        },
      ],
    },
    {
      id: 'eicr-coding',
      heading: 'EICR Coding for V2H Installations',
      tocLabel: 'EICR coding',
      blocks: [
        {
          type: 'paragraph',
          text: 'A bidirectional EV charger is a relatively new beast on a periodic inspection — by 2026 inspectors are starting to encounter them on EICRs. Coding follows prosumer-install logic with EV-specific overlays from Section 722.',
        },
        {
          type: 'list',
          items: [
            'C1 — missing prosumer labelling that prevents an isolator being identified, absence of the lockable isolator required by Chapter 82, broken or bypassed island-mode bonding contactor leaving the inverter floating during an outage.',
            'C2 — Type AC or Type A RCD without separate DC fault detection on a bidirectional unit (Section 722 requires Type B or A+DC-detection), PEN conductor present in the EV charging circuit on a TN-C-S (PME) supply contrary to Reg 722.312.2.1, inadequate overcurrent coordination, G99 unit installed without DNO notification.',
            'C3 — older bidirectional unit without ISO 15118-20 (functional but limited to compatible vehicles), absence of a backup consumer unit on an island-mode install, manual transfer switch where automatic would be preferable.',
            'FI — vehicle compatibility uncertain, manufacturer firmware not at the version on the ENA Type Tested register, no documented commissioning records.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The inverter remains live after grid disconnection',
          text: 'Even after the main switch is off, a bidirectional charger can have the vehicle as a live source. Safe isolation must isolate the vehicle too — disconnect the charging cable or lock off the local isolator while the vehicle is unplugged. A Chapter 82 requirement that gets missed on inspections of hastily-commissioned units.',
        },
      ],
    },
    {
      id: 'battery-warranty',
      heading: 'Battery Warranty — Cycle Counting Implications',
      tocLabel: 'Battery warranty',
      blocks: [
        {
          type: 'paragraph',
          text: 'Vehicle manufacturers vary on whether V2H/V2G affects the battery warranty. Some explicitly support it (Nissan); others are silent; others exclude V2X from cover.',
        },
        {
          type: 'list',
          items: [
            'Nissan Leaf / e-NV200 — V2H explicitly supported via the OEM CHAdeMO interface. Warranty unaffected for sanctioned use through approved chargers.',
            'Hyundai / Kia E-GMP — V2L explicitly supported. V2H/V2G via ISO 15118-20 increasingly supported on 2025-2026 models, with warranty cover for usage within manufacturer cycle limits.',
            'VW MEB — bidirectional rolled out from 2024 firmware on ID.4, ID.5 and ID.7. Warranty cover applies through approved chargers and ISO 15118-20 sessions.',
            'Tesla — historically resistant; public commitments made for Cybertruck and later models. UK warranty treatment remains contractual brand-by-brand.',
            'Cycle counting — modern NMC and LFP chemistries are rated for 2,000-4,000 full cycles to 70-80% state of health. A V2H install averaging 8 kWh per day from a 60 kWh battery is roughly 50 full cycles per year — well within manufacturer envelopes.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Read the warranty before you sell the system',
          text: 'A customer who finds the install voids their battery warranty will not be happy. Ask them to confirm with the vehicle manufacturer or dealer that bidirectional usage is permitted under their warranty, and document the confirmation in the project file.',
        },
      ],
    },
    {
      id: 'building-regs-part-p',
      heading: 'Building Regulations Part P — Notifiable Status',
      tocLabel: 'Part P notifiable',
      blocks: [
        {
          type: 'paragraph',
          text: 'Part P covers electrical safety in dwellings in England and Wales (Scotland and Northern Ireland have parallel arrangements). A V2H bidirectional charger installation is notifiable — via a Competent Person Scheme (NICEIC, NAPIT, Stroma, ELECSA) or direct notification to local authority Building Control.',
        },
        {
          type: 'list',
          items: [
            "Notifiable — a new circuit (the charger's dedicated supply) is always notifiable. Replacing a consumer unit is notifiable. Adding a sub-CU for island-mode backup is notifiable.",
            'Competent Person Scheme — a registered electrician self-certifies through their scheme provider, who issues the Building Regulations compliance certificate and notifies the local authority.',
            'Non-registered work — homeowner must notify Building Control directly before work starts and pay an inspection fee. Third-party inspection may be required.',
            'EIC and EICR — Part P notification sits alongside, not in place of, the BS 7671 documentation. An EIC is still required on completion.',
            'DNO notification — Part P is a Building Regulations matter; G99 is an Engineering Recommendation matter. Both are required and not interchangeable.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For an end-to-end view of the surrounding install — cable sizing, RCD selection, supply upgrade considerations and certification — see [cable size for EV charger](/guides/cable-size-for-ev-charger) and [V2G installation guide](/guides/v2g-installation-guide) which dives deeper into the grid-export variant of bidirectional charging.',
        },
      ],
    },
  ],
  howToHeading: 'How to Specify and Install a V2H Bidirectional Charger',
  howToDescription:
    "The end-to-end sequence from initial customer conversation to commissioned, DNO-notified, EICR-friendly V2H install — based on BS 7671:2018+A4:2026 Section 722 and Chapter 82 (Prosumer's Electrical Installations), G99, the IET Code of Practice for EV Charging (5th Edition) and the Electric Vehicles (Smart Charge Points) Regulations 2021.",
  howToSteps: [
    {
      name: 'Confirm V2H vs V2G vs V2L with the customer',
      text: 'Establish whether the customer wants tariff arbitrage only (V2H), grid export and flexibility income (V2G), or a portable AC outlet on the vehicle (V2L). The DNO paperwork, inverter rating and BS 7671 treatment differ for each. Most domestic customers want V2H — confirm before quoting.',
    },
    {
      name: 'Verify vehicle compatibility against the charger matrix',
      text: "Take the exact vehicle make, model, model year, trim and software version. Cross-reference against the charger manufacturer's compatibility matrix (Wallbox Quasar 2, Indra V2H, dcbel r16, EVTec hybrid) and the ISO 15118-20 conformance status. Document the match in the design file.",
    },
    {
      name: 'Survey the supply, consumer unit and earthing arrangement',
      text: 'Confirm meter-tail capacity, consumer unit spare ways, earthing arrangement (TN-C-S/PNB, TN-S or TT) and the route to the charger location. A 7-11 kW bidirectional unit typically needs a 32-40 A radial. Check A4:2026 Section 722 earthing requirements for the supply type.',
    },
    {
      name: 'Submit the G99 (or G98) application to the DNO',
      text: 'Use the ENA Connect Direct portal to submit a G99 Fast Track application for the specific Type Tested unit. Most domestic V2H units complete in 10 working days. Do not energise before approval. Where an export limiter keeps the install under G98, lodge a G98 fit-and-inform notification instead.',
    },
    {
      name: 'Install per BS 7671 Section 722 and Chapter 82',
      text: 'Install the dedicated supply with Type B RCD (or Type A with DC fault detection), lockable local isolator, prosumer labelling per Chapter 82, and the earthing arrangements required for the supply type. On TN-C-S (PME) supplies ensure no PEN conductor is present in the EV circuit (Reg 722.312.2.1). For island-mode, fit the transfer switch and backup-only consumer unit with neutral-earth bonding correctly configured. Issue the EIC on completion.',
    },
    {
      name: 'Commission, notify via CPS and brief the customer',
      text: 'Commission per manufacturer instructions, verify bidirectional operation with the actual customer vehicle, confirm anti-islanding under G99, and notify Building Control via the relevant Competent Person Scheme. Brief the customer on the transfer switch, SOC reserve, tariff configuration and the safe-isolation procedure.',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between V2H and V2G?',
      answer:
        'V2H (Vehicle-to-Home) feeds the dwelling only — no export to the public network, the economic case rests on tariff arbitrage. V2G (Vehicle-to-Grid) feeds the public network — surplus is sold to the grid via a flexibility platform. V2G is always G99 notifiable and requires an export meter; V2H may sit under G98 if the inverter is small enough or an export limiter is fitted, but most modern bidirectional chargers default to G99.',
    },
    {
      question: 'Which UK vehicles actually support bidirectional charging in 2026?',
      answer:
        "The Nissan Leaf and e-NV200 (CHAdeMO) have supported V2H for nearly a decade. CCS bidirectional via ISO 15118-20 reached production in 2024-2025 and is now supported on certain VW ID. models, Polestar 3, BYD Atto 3, MG4 (firmware), and an expanding list of Hyundai/Kia E-GMP vehicles. Always check the specific model year and trim against the charger manufacturer's compatibility matrix — capability is firmware-controlled and not consistent across model years of the same vehicle.",
    },
    {
      question: 'Do I need a DNO notification for a V2H install if no power is exported?',
      answer:
        'Yes, unless the inverter is small enough to fall under G98 and an export-limiting device prevents any back-feed. Most domestic V2H units are 7-11 kW and exceed the G98 single-phase threshold, so a G99 Fast Track application is required even where the design intent is no export. The DNO will want evidence the limiter is enforced — Type Tested device, commissioning print-out and photos.',
    },
    {
      question: 'Will V2H keep my lights on when the grid goes down?',
      answer:
        'Only if the charger has true island-mode (grid-forming) capability and a transfer switch is fitted. Many cheaper units only support grid-tied export and disconnect under G99 anti-islanding when the grid fails. Island-mode capable units (Wallbox Quasar 2, dcbel r16, Indra V2H Smart) can run a typical UK household for several days from a 60-80 kWh battery, subject to SOC reserve and load profile. Often a £1,000-£2,000 premium over basic grid-tied V2H.',
    },
    {
      question: 'Does using V2H damage the vehicle battery?',
      answer:
        "Every kWh cycled contributes to long-term degradation, but the effect is modest. A V2H install averaging 8 kWh per day from a 60 kWh battery is roughly 50 full cycles per year, well within manufacturer envelopes (NMC and LFP are rated for 2,000-4,000 full cycles to 70-80% state of health). The bigger question is warranty — confirm with the vehicle manufacturer that bidirectional usage is permitted under the specific vehicle's warranty before installing.",
    },
    {
      question: 'Is a V2H installation notifiable under Building Regulations Part P?',
      answer:
        'Yes. A V2H install always involves a new dedicated circuit, and any new circuit in a dwelling is notifiable under Part P. A Competent Person Scheme registered electrician self-certifies via their scheme. An unregistered installer must notify Building Control directly before work starts. Part P notification is separate from G99 DNO notification — both are required.',
    },
    {
      question: 'How does V2H interact with BS 7671 Chapter 82?',
      answer:
        "A V2H bidirectional charger is a Prosumer's Electrical Installation (PEI) under BS 7671:2018+A4:2026 Chapter 82 — not Section 712, which governs solar PV systems. The installation must include prosumer labelling, a dedicated lockable isolator, and protective coordination with the dwelling's main earthing and bonding. Reg 826.1.1.1 requires ADS protection to remain effective in every intended operating mode (grid-tied and island mode). On TN-C-S (PME) supplies, Reg 722.312.2.1 prohibits a PEN conductor in the EV charging circuit. Type B RCDs are required by Section 722, and overcurrent coordination must account for the inverter's fault current contribution.",
    },
    {
      question: 'What is the typical payback period for a V2H installation?',
      answer:
        'For arbitrage alone, a typical UK household with 8 kWh of daily arbitrage on Octopus Intelligent (7p vs 28-32p peak) saves roughly £500-£600 per year. Against a 2026 install cost of £4,000-£7,000, payback is 7-12 years for arbitrage alone. V2G flexibility income (Octopus Power Pack) can add £400-£900 per year and shorten payback to 4-7 years. Most customers also value the backup-power capability.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/section-722-ev-charging-a4-2026-changes',
      title: 'Section 722 EV Charging — A4:2026 Changes',
      description:
        'The BS 7671 Section 722 amendments brought in by Amendment 4:2026 — RCD selection, earthing for TN-C-S/PNB supplies…',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/section-712-prosumer-a4-2026',
      title: 'Section 712 Prosumer — A4:2026',
      description:
        "The expanded prosumer rules in Amendment 4:2026 — BS 7671 Chapter 82 (Prosumer's Electrical Installations) alongside Section 712 (solar PV) — labelling, isolation, protective coordination for generation and storage.",
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/v2g-installation-guide',
      title: 'V2G Installation Guide',
      description:
        'Vehicle-to-Grid — the grid-export variant of bidirectional charging, with full G99 notification…',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/cable-size-for-ev-charger',
      title: 'Cable Size for EV Charger',
      description:
        'Cable sizing for EV charging circuits — voltage drop, current-carrying capacity…',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/smart-ev-charging',
      title: 'Smart EV Charging',
      description:
        'The Electric Vehicles (Smart Charge Points) Regulations 2021 — randomised delay, default off-peak settings…',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/guides/ev-charger-installation',
      title: 'EV Charger Installation',
      description:
        'The end-to-end unidirectional EV charger install — the foundation a V2H upgrade is built on top of, covering BS 7671 Section 722…',
      icon: 'Wrench',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Specify and certify your next V2H install with confidence',
  ctaSubheading:
    'Elec-Mate gives UK electricians the tools to design, install and certify bidirectional EV charging to BS 7671:2018+A4:2026 — Section 722 EV charging logic, Chapter 82 prosumer labelling and isolation, G99 notification checklists, EIC and EICR generation, all on the Electrician subscription. 7-day free trial, cancel anytime.',
};
