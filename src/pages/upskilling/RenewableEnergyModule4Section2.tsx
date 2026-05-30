import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm4s2-712-1-scope',
    question:
      'Section 712 of BS 7671:2018+A4:2026 — what does it say about stand-alone (off-grid) PV?',
    options: [
      'Fully covered',
      'Reg 712.1 NOTE: "Requirements for PV power supply systems which are intended for stand-alone operation are under consideration." Section 712 covers grid-connected installs (parallel with grid, switched alternative, or supplying an installation not connected to the grid) but standalone PV systems are not yet fully regulated by Section 712 — off-grid design draws on Section 551 (generating sets), Section 414 (SELV/PELV), manufacturer specs, and the IET CoP for Stand-alone PV Systems',
      'Always covered',
      'Section 712 prohibits off-grid',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.1 scope: "(a) PV generators for supply to an installation which is not connected to a system for distribution of electricity to the public; (b) PV generators for supply to an installation in parallel with a system for distribution of electricity to the public; (c) PV generators for supply to an installation as an alternative to a system for distribution of electricity to the public." Plus the NOTE: "Requirements for PV power supply systems which are intended for stand-alone operation are under consideration." So Section 712 covers PV generators feeding installations — including off-grid (case a) — but does NOT yet fully cover the stand-alone POWER SUPPLY SYSTEM (the integrated PV + battery + load supply for non-installation use). Section 551 (generating sets) is the primary regulatory authority for off-grid PV including battery storage.',
  },
  {
    id: 'm4s2-autonomy-days',
    question:
      'Off-grid PV install — what does "autonomy days" mean and how does it drive battery sizing?',
    options: [
      'Years',
      'The number of days the battery storage must support the load WITHOUT any solar input. Off-grid sizing: pick autonomy days based on the worst-case sun period for the location (UK 3-5 days typical for general loads; up to 7 days for critical loads), then size the battery to (daily load × autonomy days × 1/DoD) where DoD is the depth-of-discharge limit',
      'Customer\'s budget',
      'Doesn\'t apply',
    ],
    correctIndex: 1,
    explanation:
      'Off-grid PV must have battery capacity sufficient to ride through worst-case low-sun periods (cloudy stretches in winter). UK typical: 3-5 days autonomy for general loads (lighting, fridge, occasional power); 5-7 days for critical loads (essential medical, security, remote-monitoring). Battery sizing: daily load (kWh) × autonomy days ÷ DoD = battery kWh nameplate. For example: 5 kWh/day load × 4 days ÷ 0.8 DoD = 25 kWh battery nameplate. UK off-grid installs are typically 10-30 kWh; large rural / remote installs 30-100 kWh.',
  },
  {
    id: 'm4s2-sun-hours',
    question:
      'For UK off-grid PV sizing, what does "peak sun hours" or "sun-hour equivalent" mean?',
    options: [
      'Daylight hours',
      'The daily equivalent of hours at standard solar irradiance (1,000 W/m²). UK varies geographically and seasonally: winter (Dec-Jan) ~0.5-1.5 PSH/day at UK latitudes; summer (Jun-Jul) ~4-6 PSH/day; annual average 2.5-3.0 PSH/day in southern England, lower further north. PV array sizing for off-grid uses the WORST-CASE month (typically December) to ensure adequate generation even in the lowest-sun period',
      'Wattage of inverter',
      'Customer\'s preference',
    ],
    correctIndex: 1,
    explanation:
      'Peak sun hours (PSH) = daily integrated irradiance divided by 1,000 W/m² = effective hours of peak (STC) sun per day. UK winter PSH: ~0.5-1.5 (December worst); UK summer PSH: ~4-6 (July best); annual average ~2.5-3.0 in southern England. Off-grid sizing uses WORST-CASE month to ensure the array generates enough to recharge the battery even in the lowest-sun period. For UK installs: target ~1 PSH winter design point. Array kWp = daily load (kWh) ÷ (PSH × system efficiency ~0.75) = required array nameplate. For example: 5 kWh/day load ÷ (1 × 0.75) = 6.7 kWp at the December design point.',
  },
  {
    id: 'm4s2-battery-pv-ratio',
    question:
      'Typical UK off-grid PV-to-battery sizing ratio — what range, and why?',
    options: [
      '1:1',
      'Typically 1 kWp PV per 2-4 kWh battery. The ratio depends on autonomy days and the location\'s winter PSH. UK off-grid: a 5 kWp array typically pairs with 15-25 kWh of battery (autonomy 3-5 days, daily load ~5 kWh). Lower ratios (1 kWp / 4+ kWh) extend autonomy for critical loads; higher ratios (1 kWp / 1-2 kWh) suit installs with longer summer runs and minimal winter operation',
      '10:1 (PV:battery)',
      'No relationship',
    ],
    correctIndex: 1,
    explanation:
      'UK off-grid PV-to-battery ratio: 1 kWp PV : 2-4 kWh battery. Higher PV / lower battery = good for installs with year-round daily use and shorter autonomy needs (e.g. holiday cottage with summer-only use). Lower PV / higher battery = better for critical loads needing extended winter autonomy (e.g. remote monitoring station, off-grid home with year-round use). The customer\'s usage profile and the location\'s PSH determine the optimal ratio. Sizing tools (PVGIS, IET CoP for Stand-alone PV, manufacturer software) calculate the system for the specific case.',
  },
  {
    id: 'm4s2-generating-set',
    question:
      'How does BS 7671 Section 551 (generating sets) apply to an off-grid PV install?',
    options: [
      'Doesn\'t apply',
      'Section 551 applies fully. Reg 551.1.1: generating sets explicitly include (d) photovoltaic cells and (e) batteries. Reg 551.2.3: off-grid generating sets (not connected to grid, or switched alternative) must have capacity / operating characteristics ensuring no danger / damage on load connection / disconnection due to V or frequency deviation; means provided to AUTOMATICALLY DISCONNECT parts on V / freq excursion. Plus Section 551 isolation, RCD provisions, and overcurrent protection per Reg 551.5',
      'Only Section 712',
      'No regs apply',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.1.1 explicitly lists PV cells and batteries as "generating sets" — Section 551 applies. Critical for off-grid: Reg 551.2.3 requires automatic disconnection on V / freq deviation (the inverter must monitor its output and trip off-load if outside the safe envelope); Reg 551.2.4 requires isolation per Chapter 46 / Section 537 for each source / combination of sources; Reg 551.4.1 requires fault protection for each source / combination that can operate independently. Off-grid installs are particularly sensitive to V / freq excursions (smaller "grid" = larger relative load impact); the BS 7671 framework ensures the install behaves safely.',
  },
  {
    id: 'm4s2-selv-pelv',
    question:
      'When does the SELV / PELV envelope (Reg 712.414.1.1) apply to a UK off-grid PV install?',
    options: [
      'Always',
      'Only when U_oc_max ≤ 120V DC AND nominal V ≤ 30V DC (for basic protection per Reg 712.414.4.5). Small off-grid installs (e.g. 12V / 24V / 48V battery systems on small PV arrays — boats, caravans, garden sheds, small remote cabins) typically fit the SELV / PELV envelope. Larger off-grid (rural homes, smallholdings) exceed 120V DC and operate as Class II per Reg 712.412.101 — same as grid-tied PV',
      'Never',
      'Only commercial',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.414.1.1 sets the SELV / PELV envelope: U_oc_max ≤ 120V DC; Reg 712.414.4.5 requires basic protection where nominal V &gt; 30V DC. Small off-grid systems (boats, caravans, sheds, small cabins) at 12V / 24V / 48V battery + small PV (V_oc_max typically &lt;100V) fit SELV / PELV — simpler protective measures, less stringent insulation. Larger off-grid (typical UK rural home: 5+ kWp PV, 48V or 230V battery system) exceeds 120V DC for the PV side and uses Class II per Reg 712.412.101 (same as grid-tied). The design pack records the chosen envelope.',
  },
  {
    id: 'm4s2-anti-islanding',
    question:
      'For an off-grid PV install, why does anti-islanding protection (the inverter\'s grid-tie trip) NOT apply?',
    options: [
      'Customer doesn\'t want it',
      'Anti-islanding is required for GRID-TIED inverters (the inverter must disconnect from the grid on grid loss to prevent backfeed). An off-grid inverter is the ONLY source — it can\'t be back-feeding a grid that doesn\'t exist. The inverter operates in a different mode (standalone / off-grid mode) without the EREC G98 / G99 anti-islanding requirement. The inverter must instead maintain V / freq within the envelope per Reg 551.2.3 to protect the connected loads',
      'No standards',
      'Magic',
    ],
    correctIndex: 1,
    explanation:
      'Anti-islanding (the inverter trips off-grid on grid loss) is a GRID-TIED concept — it prevents backfeed to a downed grid that could endanger utility workers. An off-grid inverter has no grid to backfeed onto, so anti-islanding doesn\'t apply. The off-grid inverter operates in "standalone mode" or "off-grid mode" — it generates the V / freq for the installation itself, modulating to match load. The inverter still monitors V / freq per Reg 551.2.3 and trips off-load if outside the safe envelope (e.g. overload, undervoltage from depleted battery) — but this is internal protection, not grid-disconnection. EREC G98 / G99 / G100 do NOT apply to standalone off-grid installs.',
  },
  {
    id: 'm4s2-iet-cop',
    question:
      'IET Code of Practice for Stand-alone Photovoltaic Systems — what role does it play alongside BS 7671 Section 712 and Section 551 for off-grid PV?',
    options: [
      'Replaces BS 7671',
      'Complementary operational guidance. BS 7671 Section 712 covers the PV-electrical-equipment aspects but Reg 712.1 NOTE explicitly defers stand-alone PV power supply systems to "under consideration". The IET CoP for Stand-alone Photovoltaic Systems operationalises the design: PSH-based sizing methodology; autonomy days + DoD discipline; off-grid inverter selection; generator integration; SELV/PELV envelope application; commissioning workflow; customer information pack. Cross-references Section 551 (generating sets) + Section 414 (SELV/PELV) + Section 712 where applicable. Cert evidence bundle for MCS-certified off-grid installs references the IET CoP as the design methodology authority',
      'Only for grid-tied',
      'Optional reading',
    ],
    correctIndex: 1,
    explanation:
      'The IET CoP for Stand-alone Photovoltaic Systems fills the operational gap left by Reg 712.1 NOTE. BS 7671 sets the regulatory framework (Section 712 + Section 551 + Section 414); the IET CoP sets the practical design methodology (sizing with PSH and autonomy days, battery selection and DoD, off-grid inverter selection across Victron / Studer / OutBack / Sigenergy etc., generator integration, commissioning). MCS-certified off-grid contractors reference the IET CoP in their design packs. The cert evidence bundle for an off-grid install records: BS 7671 compliance (Section 712 + 551 + 414 where applicable); IET CoP design methodology compliance; manufacturer datasheets; commissioning records; customer handover.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A UK off-grid customer (rural smallholding) has daily electricity load ~6 kWh. Worst-case design month December (PSH ~1.0). Autonomy 4 days. DoD limit 80%. Calculate PV kWp and battery kWh.',
    options: [
      'Both 1 kWh',
      'PV: daily load ÷ (PSH × system efficiency) = 6 ÷ (1 × 0.75) = 8 kWp December design point (larger array than grid-tied would size). Battery: daily load × autonomy ÷ DoD = 6 × 4 ÷ 0.8 = 30 kWh nameplate. Realistic spec: 8 kWp PV + 30 kWh BESS (or split into 2-3 battery units of 10-15 kWh each); generator backup for extended outages or critical winter periods recommended',
      'Too much',
      'Customer should reduce load',
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid sizing: PV sized for WORST-CASE month\'s PSH (December UK ~1 PSH); battery sized for autonomy × daily load ÷ DoD. For 6 kWh/day × 4 days ÷ 0.8 = 30 kWh nameplate battery; PV 8 kWp December-design. The 8 kWp is significantly larger than a grid-tied install would size for the same site (grid-tied uses annual-average PSH ~2.5, giving ~3 kWp for the same daily load). This is the off-grid sizing penalty — PV array must handle the December design point even though most of the year it has surplus. Generator backup is recommended for extended dark periods or critical winter operation.',
  },
  {
    id: 2,
    question:
      'Customer asks "can my off-grid PV install export to the grid as a backup?" Their property has no grid connection at all.',
    options: [
      'Yes — connect when possible',
      'No — there is no grid connection. Off-grid installs are NOT grid-tied. The installation operates as a standalone system per Reg 551.1.1 / 551.2.3; the inverter operates in off-grid mode, generating V and frequency for the property loads. If the customer wants to add grid backup (rare in UK, more common in remote installs), they\'d need to apply for a grid connection through the local DNO — a separate, often costly project. The current install operates as off-grid only',
      'Sometimes',
      'Need a transformer',
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid = no grid connection at all. The installation generates its own V / frequency via the off-grid inverter. To add grid connectivity, the customer would need: (1) DNO connection (typically £5,000-£20,000+ for rural / remote properties); (2) hybrid inverter capable of both grid-tied and off-grid modes; (3) EREC G98 / G99 application; (4) bidirectional protection per Reg 551.7.1(c). This is a major project, not a backup mode the off-grid system can switch into. The honest customer conversation: off-grid is its own design path; adding grid changes the install architecture and the regulatory framework.',
  },
  {
    id: 3,
    question:
      'Customer\'s off-grid site has December PSH ~0.7 and daily load 4 kWh. PV sized at 6 kWp (designed for December). Annual generation modelled at 6,500 kWh (well above the 4 kWh × 365 = 1,460 kWh annual load). Is this oversized?',
    options: [
      'Yes — way too big',
      'No — off-grid sizing inherently oversizes for most of the year. Summer surplus (kWh well above daily load) charges the battery and goes unused once battery is full. The "wasted" summer surplus is the cost of December design adequacy. Modern off-grid installs use diverter loads (electric water heating, EV charging if applicable) to capture summer surplus productively. Generator backup may still be needed for extended winter dark periods even with the oversized array',
      'Customer wasting money',
      'Sell the surplus',
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid PV oversize is INTENTIONAL — the December design point requires a large array; the rest of the year has surplus. Three approaches to manage the surplus: (1) accept it — the array is oversized for most of the year, battery charges quickly, modules sit idle once battery full; (2) divert summer surplus to controllable loads (water heating immersion, EV charging, UFH) capturing economic value; (3) accept summer surplus as overproduction insurance for early-cloud-weather days. Annual generation 6,500 kWh × 25-year life × marginal $ per kWh value = significant total value even with much "wasted" summer kWh.',
  },
  {
    id: 4,
    question:
      'Off-grid PV install — Reg 551.2.3 requires automatic disconnection on V / freq deviation. How does this practically work?',
    options: [
      'Customer manually disconnects',
      'The off-grid inverter monitors its own AC output: undervoltage (battery depleting, load too high) triggers a low-V trip; overvoltage (regulation fault) triggers a high-V trip; over/underfrequency (similarly) triggers a trip. The trip disconnects the inverter from the load circuits; alarm / status indication tells the customer / monitoring system. Modern off-grid inverters (Victron Multiplus / Quattro, Studer Xtender, OutBack Radian) have configurable trip thresholds and reporting via their app / display',
      'No protection',
      'Manual reset only',
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid inverter V / freq protection per Reg 551.2.3: the inverter monitors its output; if V or frequency falls outside the operating envelope (typically 5-10% of nominal V; 1-2 Hz of nominal frequency), the inverter trips off-load. Causes: deep battery discharge (low-V trip; protects battery from damage and prevents reverse-current damage to loads); generator startup transient (transient over-V); overload (load draws beyond inverter capability, V sags). Modern off-grid inverters (Victron, Studer, OutBack, Sigenergy) have configurable thresholds, alarm reporting, and automatic restart on V / freq recovery. The cert evidence bundle records the trip thresholds.',
  },
  {
    id: 5,
    question:
      'Small off-grid PV install for a garden shed: 200W array, 12V battery, 12V DC + 230V AC inverter. Which BS 7671 framework applies?',
    options: [
      'Section 712 only',
      'Combination: the DC battery side typically fits SELV / PELV envelope (Reg 712.414 + 414 series; V_oc_max ≤ 120V DC; nominal ≤ 30V → no basic protection per 712.414.4.5; if nominal &gt; 30V DC, basic protection required). The AC inverter output is 230V — standard BS 7671 Class I or II applies. Plus Section 551 (generating sets, including PV cells and batteries) covers the overall off-grid arrangement. The IET CoP for Stand-alone PV Systems is the operational source',
      'Not regulated',
      'Customer\'s discretion',
    ],
    correctAnswer: 1,
    explanation:
      'Small off-grid installs (boats, caravans, garden sheds, small cabins) typically operate at 12V / 24V / 48V on the DC side — within the SELV / PELV envelope per Reg 712.414.1.1 (U_oc_max ≤ 120V DC). Basic protection required per Reg 712.414.4.5 only where nominal V &gt; 30V DC (so 12V / 24V exempt; 48V requires basic protection). The AC inverter output is standard 230V — applies Class I or II protective measures per BS 7671. Section 551 governs the overall arrangement. The IET CoP for Stand-alone Photovoltaic Systems is the operational reference for design / install. The cert evidence bundle records the chosen envelope.',
  },
  {
    id: 6,
    question:
      'Customer wants to operate their off-grid PV install with their existing EV. Considerations?',
    options: [
      'Just plug in',
      'Off-grid EV charging is feasible but constrained: EV chargers typically require 6 A (1.4 kW) minimum continuous current — the off-grid inverter must be sized to supply this plus other concurrent loads. Standard 5 kVA off-grid inverter (~20A AC continuous) supports 6 A EV + ~12 A other loads simultaneously. For larger EVs needing 16-32 A charging (3.7-7.4 kW), the inverter must be sized accordingly. Battery state-of-charge becomes the binding constraint — depleting battery on EV charging triggers low-V trip',
      'Impossible',
      'Customer can\'t have EV',
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid EV charging is technically feasible but practically constrained by inverter and battery sizing. A 5 kVA off-grid inverter can support 6-13 A EV charging plus normal household load. Faster EV charging (16-32 A) requires larger inverter (10-22 kVA) and larger battery to absorb the load without depleting. Smart energy management (Sigenergy SigenStor, Victron with Cerbo GX) can throttle EV charging based on real-time PV surplus and battery state. The cert evidence bundle records the EV charging mode and the inverter sizing rationale.',
  },
  {
    id: 7,
    question:
      'An off-grid site has battery undervoltage trip events at year 2 — battery depletes more quickly than year 1. Diagnostic approach?',
    options: [
      'Replace battery',
      'Battery degradation is the most likely cause but verify systematically: (a) check battery state-of-health (modern BMS reports SoH; typical Li-ion degrades ~2-3% per year); (b) review load profile (has consumption increased? new appliances?); (c) check PV array (any module damage / cable degradation / shading not present at year 1?); (d) check inverter (any efficiency degradation, fault codes); (e) seasonal effect (did the trip events start in winter, suggesting Dec PSH adequacy issue?). Replace battery only after confirming degradation as root cause',
      'Customer\'s fault',
      'Skip the diagnostic',
    ],
    correctAnswer: 1,
    explanation:
      'Off-grid battery trip events at year 2 are not necessarily battery failure. Systematic diagnostic: (1) SoH via BMS (Li-ion typical 2-3% per year, lead-acid 5-10% per year); (2) load profile changes (new appliances, occupancy changes); (3) PV array degradation (cable, module damage, shading); (4) inverter efficiency (fault codes, telemetry); (5) seasonal effect. Replace battery only after confirming. Premature battery replacement on diagnostic uncertainty is expensive (£5,000-£15,000 for typical 10-30 kWh UK off-grid battery) and may not resolve the issue. The cert evidence bundle records the diagnostic and the chosen rectification.',
  },
  {
    id: 8,
    question:
      'IET Code of Practice for Stand-alone Photovoltaic Systems — how does it relate to BS 7671 Section 712 for off-grid PV?',
    options: [
      'Contradictory',
      'Complementary. BS 7671 Section 712 covers PV electrical installations in scope (a)-(c) but explicitly defers stand-alone "to be considered". The IET CoP for Stand-alone Photovoltaic Systems is the operational guidance: sizing methodology (autonomy days, PSH, battery sizing); generator integration; protective measures (SELV / PELV envelope, Class II); off-grid commissioning workflow; customer information pack. MCS MIS 3002 design pack for off-grid installs typically references the IET CoP as the primary methodology source',
      'No relationship',
      'Same document',
    ],
    correctAnswer: 1,
    explanation:
      'IET CoP for Stand-alone Photovoltaic Systems (current edition) operationalises off-grid PV install design — fills the gap between BS 7671 (which doesn\'t fully cover stand-alone) and the practical install workflow. Covers: sizing methodology with PSH and autonomy days; battery selection and DoD discipline; off-grid inverter selection (Victron, Studer, OutBack, Sigenergy etc.); generator integration; protective measures by V class; commissioning workflow; customer information. Cross-references BS 7671 Section 551 (generating sets), Section 414 (SELV/PELV), and where applicable Section 712. The cert evidence bundle for off-grid MCS-certified installs typically references the IET CoP as the design methodology authority.',
  },
];

const faqs = [
  {
    question: 'Is off-grid PV common in the UK?',
    answer:
      'UK off-grid PV is a niche but established market. Use cases: (1) rural / remote properties with no economically-viable grid connection (DNO connection cost > £15,000); (2) holiday cottages / small farms using PV + battery + generator backup as the main supply; (3) marine / leisure (boats, caravans, motorhomes); (4) emergency / resilience installs (security, off-grid backup for vulnerable customers in unreliable grid areas); (5) ideological / sustainability-driven choice. UK Statista data: ~25,000-40,000 active off-grid PV installs nationally (2024 estimate). Growing slowly with the rise of remote / homestead living.',
  },
  {
    question: 'What\'s the difference between off-grid and grid-tied with grid-loss backup?',
    answer:
      'Two different architectures. Off-grid = no grid connection at all; the install IS the supply. Grid-tied with grid-loss backup (EPS — Emergency Power Supply) = standard grid-tied PV + BESS that can disconnect from the grid on grid-loss and continue supplying critical loads (covered in Section 4.6). EPS systems use a hybrid inverter with backup capability; they still need EREC G98 / G99 grid-tie compliance; they\'re Module 3 / Module 4.6 territory. Off-grid avoids the grid entirely — different regulatory path (Section 551 + IET CoP rather than Section 712 + EREC).',
  },
  {
    question: 'How does grid-tied vs off-grid pricing compare?',
    answer:
      'UK 2024-2026 typical costs (5 kWp install + 10 kWh battery): grid-tied PV + BESS hybrid ~£12,000-£18,000; off-grid PV + BESS ~£15,000-£25,000. Off-grid premium: larger array (sized for worst month, not annual average), larger battery (autonomy days + DoD), generator backup (£1,500-£3,000), more complex inverter (Victron / Studer / OutBack vs standard SolarEdge / GivEnergy), more design effort. For properties without grid connection, the off-grid cost is competitive with the alternative (grid connection £15,000-£30,000+).',
  },
  {
    question: 'Can off-grid PV power an electric heat pump?',
    answer:
      'Technically yes, practically challenging. UK air-source heat pump typical 8 kW thermal output draws 2-3 kW electrical at COP 3-4. Sustained 2-3 kW load on an off-grid inverter requires careful sizing: (a) inverter rated for sustained 3 kW continuous + transient surge for compressor startup (typically 6-9 kW for 1-2 seconds); (b) battery sized for winter heat-pump operation (~30-50 kWh/day for typical UK heating demand); (c) PV array sized for December PSH × heat-pump demand. Practical UK off-grid: 12-16 kWp PV, 40-60 kWh battery, 8-10 kVA inverter; total cost £40,000-£60,000+. Generator backup often added for prolonged cold spells.',
  },
  {
    question: 'How does the customer charge an EV on off-grid?',
    answer:
      'Off-grid EV charging is feasible but constrained. Considerations: (1) inverter capability — must supply EV charge current (6-32 A) plus other concurrent loads without overloading; (2) battery capacity — EV charging at 7 kW for 4 hours = 28 kWh, exceeds many off-grid battery capacities; (3) PV availability — EV charging should ideally coincide with peak PV; (4) smart charging — controllable EV charger (Zappi etc.) modulates to match real-time PV surplus and battery state; (5) generator backup — long EV charging sessions may need generator support. For frequent / heavy EV use, off-grid PV may not be the right architecture — grid connection or hybrid may be better.',
  },
  {
    question: 'What\'s the typical off-grid PV install lifespan?',
    answer:
      'Modules: 25-30 years (typical 80-85% of nameplate by year 25). Battery: 10-15 years for Li-ion / LFP (depending on chemistry and DoD discipline); 5-10 years for lead-acid (now uncommon for new installs). Off-grid inverter: 10-15 years (similar to grid-tied). Generator (backup): 10-20 years (less if used heavily). So an off-grid install requires: battery replacement at ~year 10-15; inverter replacement at ~year 10-15; modules typically run to year 25-30. The cert evidence bundle informs the replacement timeline.',
  },
  {
    question: 'Does an off-grid PV install need to register with the DNO?',
    answer:
      'No — there\'s no grid connection. DNO has no jurisdiction over a standalone install. The install does NOT need EREC G98 / G99 notification (those govern grid-tied installs only). The install DOES need to meet BS 7671 Section 551 (generating sets); appropriate protective measures; and MCS / IET CoP for Stand-alone PV if grant-funded or scheme-certified. The cert evidence bundle is similar to grid-tied (design pack, BS EN 62446-1 commissioning where applicable, customer handover) but without DNO documentation.',
  },
  {
    question: 'How does the MCS scheme cover off-grid PV?',
    answer:
      'MCS MIS 3002 covers grid-tied PV install for grant-funded / certified installs. MCS MIS 3008 (and successor / related standards) covers stand-alone PV systems, but the standard is less mature than the grid-tied counterpart. Off-grid certification for MCS-grant purposes requires: MCS-certified contractor; design pack per the relevant MIS standard (3008 or successor); commissioning per the IET CoP. Off-grid installs without grant funding are not strictly required to be MCS-certified — the customer\'s informed decision.',
  },
  {
    question: 'Can I use grid-tied solar PV modules in an off-grid install?',
    answer:
      'Yes — the modules themselves are agnostic to grid-tied vs off-grid. The difference is in the inverter and the BoS (balance of system): off-grid uses different inverter brands (Victron, Studer, OutBack, Sigenergy off-grid range) and different protective measures. Module performance, lifespan, and warranties are the same. Many UK off-grid installs use the same Hyundai / JA Solar / LONGi / Trina N-type modules as the grid-tied install, with off-grid-compatible inverters and battery systems.',
  },
];

export default function RenewableEnergyModule4Section2() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Off-grid PV design fundamentals | Renewable Energy 4.2 | Elec-Mate',
    description:
      'Off-grid PV in detail — autonomy days, daily energy budget, sun-hours sizing, battery-to-PV ratio. Reg 712.1 NOTE: standalone "under consideration"; Section 551 generating sets is the primary authority; IET CoP for Stand-alone PV is the operational source.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · BS 7671:2018+A4:2026"
            title="Off-grid PV design fundamentals"
            description="The off-grid design path — autonomy days, daily energy budget, sun-hours sizing, battery-to-PV ratio. Reg 712.1 NOTE: standalone PV is &ldquo;under consideration&rdquo;; Section 551 (generating sets) is the primary authority; IET CoP for Stand-alone PV is the operational source."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 712.1 NOTE: "Requirements for PV power supply systems which are intended for stand-alone operation are under consideration". Section 712 doesn\'t fully cover stand-alone — off-grid PV design draws on Section 551 (generating sets), Section 414 (SELV/PELV), manufacturer specs, and the IET CoP for Stand-alone PV Systems.',
              'Off-grid PV sized for WORST-CASE month (UK December PSH ~0.7-1.5). Array kWp = daily load ÷ (PSH × system efficiency ~0.75). Battery kWh = daily load × autonomy days ÷ DoD limit. Typical 1 kWp PV : 2-4 kWh battery.',
              'Reg 551.1.1 explicitly lists PV cells and batteries as generating sets. Reg 551.2.3: automatic disconnection on V / freq deviation. Reg 551.4.1: fault protection per source / combination. Section 551 is the regulatory authority.',
              'Small off-grid installs (boats, caravans, sheds at 12V/24V/48V) fit Reg 712.414.1.1 SELV/PELV envelope (U_oc_max ≤ 120V DC). Larger off-grid (typical UK rural home, 5+ kWp) exceeds 120V DC — Class II per Reg 712.412.101.',
              'Off-grid inverter operates in standalone mode — generates V and freq for the property. No anti-islanding requirement (no grid to backfeed). No EREC G98/G99 (no grid connection). Inverter V/freq trip protects against overload / battery depletion per Reg 551.2.3.',
              'Off-grid sizing intentionally oversizes for most of the year — December design point requires large array; summer surplus often unused or diverted to controllable loads. Generator backup recommended for extended winter dark periods.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 712.1 scope and the NOTE about stand-alone PV; identify when Section 712, Section 551, Section 414, and the IET CoP each apply.',
              'Size an off-grid PV array using worst-case-month PSH and the system-efficiency factor.',
              'Size an off-grid battery using autonomy days and DoD limit; understand the PV-to-battery ratio.',
              'Apply Section 551 generating-set requirements: capacity, V/freq protection, isolation, fault protection.',
              'Identify the SELV/PELV envelope (Reg 712.414.1.1) and when it applies to small off-grid installs.',
              'Plan the generator backup integration for extended winter periods (covered in detail in Section 4.3).',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Reg 712.1 NOTE: stand-alone PV under consideration. Section 551 + IET CoP fills the gap.</Pullquote>

          <ContentEyebrow>Where off-grid sits in the BS 7671 framework</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.1 — Scope (stand-alone NOTE)"
            clause="This section applies to the electrical installation of PV generators intended to supply all or part of an installation and to feed electricity into the public grid or local distribution. … The requirements of this section apply to: (a) PV generators for supply to an installation which is not connected to a system for distribution of electricity to the public; (b) PV generators for supply to an installation in parallel with a system for distribution of electricity to the public; (c) PV generators for supply to an installation as an alternative to a system for distribution of electricity to the public. NOTE: Requirements for PV power supply systems which are intended for stand-alone operation are under consideration."
            meaning="Reg 712.1 covers PV GENERATORS for installations across all three connection scenarios — including off-grid installations (scenario a). The NOTE clarifies that PV POWER SUPPLY SYSTEMS designed specifically for stand-alone operation are not yet fully regulated by Section 712. Practical effect: an off-grid PV install (PV + battery + load supply) draws on Section 551 (generating sets — covers PV cells and batteries), Section 414 (SELV/PELV where applicable), Section 712 for the PV-electrical-installation aspects covered, and the IET CoP for Stand-alone Photovoltaic Systems for the integrated design methodology. The cert evidence bundle records which regulatory framework applies to each install aspect."
          />

          <ConceptBlock
            title="Section 551 (generating sets) — the primary off-grid regulatory authority"
            plainEnglish="Section 551 of BS 7671 covers generating sets, which explicitly include PV cells (Reg 551.1.1(d)) and batteries (Reg 551.1.1(e)). For off-grid PV installs, Section 551 is the primary regulatory authority — it covers capacity / V-freq protection, isolation, fault protection, and overcurrent protection."
            onSite="Off-grid install relies on Section 551 for the core electrical safety framework. The Module 3 Section 712 content (cable, connector, isolator, IMD requirements) still applies to the PV-electrical-equipment aspects — just the overall standalone-system framework draws on Section 551."
          >
            <p>Section 551 key regs for off-grid:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 551.1.1</strong> — generating sets cover PV cells (d), batteries (e), and combustion engines (a) [for backup generators]</li>
              <li><strong className="text-white">Reg 551.2.2</strong> — prospective short-circuit / earth-fault current shall be assessed for each source / combination</li>
              <li><strong className="text-white">Reg 551.2.3</strong> — for installations not connected to grid (or switched alternative): capacity and operating characteristics shall ensure no danger / damage to equipment on load connection / disconnection; means provided to automatically disconnect parts on V / freq excursion</li>
              <li><strong className="text-white">Reg 551.2.4</strong> — provision for isolation per Chapter 46 + Section 537 for each source / combination</li>
              <li><strong className="text-white">Reg 551.4.1</strong> — fault protection for each source / combination that can operate independently</li>
              <li><strong className="text-white">Reg 551.4.3.1</strong> — automatic disconnection of supply (ADS) per Section 411</li>
              <li><strong className="text-white">Reg 551.4.3.2</strong> — switched alternative to grid (where applicable): ADS shall NOT rely on the grid earthed point; suitable means of earthing shall be provided</li>
              <li><strong className="text-white">Reg 551.5</strong> — overcurrent protection located as near as practicable to the generator terminals</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section 414 (SELV/PELV) — for small off-grid installs"
            plainEnglish="Small off-grid installs operating at 12V / 24V / 48V on the DC side fit within the SELV / PELV envelope per Reg 712.414.1.1 (U_oc_max ≤ 120V DC). The protective measures are simpler than Class I or II at higher voltages."
            onSite="Use cases: boats / caravans / motorhomes (typically 12V or 24V); garden sheds / small cabins (12V or 24V); leisure / camping installs (12V or 24V); small remote installs with limited load. Once the install exceeds 120V DC (typical UK rural off-grid home: PV V_oc_max 400-600V DC), Class II per Reg 712.412.101 applies — same as grid-tied PV."
          >
            <p>SELV / PELV envelope details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 712.414.1.1</strong> — U_oc_max ≤ 120V DC for SELV / PELV envelope</li>
              <li><strong className="text-white">Reg 712.414.4.5</strong> — basic protection required where nominal V &gt; 30V DC</li>
              <li><strong className="text-white">12V systems</strong> — SELV / PELV applies; no basic protection required for the DC side (nominal &lt; 30V)</li>
              <li><strong className="text-white">24V systems</strong> — SELV / PELV applies; no basic protection required (nominal &lt; 30V)</li>
              <li><strong className="text-white">48V systems</strong> — SELV / PELV applies; basic protection required (nominal 48V &gt; 30V threshold)</li>
              <li><strong className="text-white">96V systems</strong> — SELV / PELV envelope holds; basic protection required</li>
              <li><strong className="text-white">Above 120V DC</strong> — outside SELV / PELV; Class II per Reg 712.412.101 (same as grid-tied)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Sizing methodology — autonomy, PSH, battery ratio</ContentEyebrow>

          <Pullquote>December PSH design point. Autonomy 3-5 days. 1 kWp : 2-4 kWh.</Pullquote>

          <ConceptBlock
            title="Daily energy budget — the starting point"
            plainEnglish="Off-grid sizing starts with the customer\'s daily electrical load: kWh/day. Calculate by summing each appliance\'s power × daily usage hours, or estimate from smart-meter data, or use UK household typical consumption (3,000-5,000 kWh/year = 8-14 kWh/day average)."
            onSite="Off-grid customers often have lower load than grid-tied counterparts — minimal use of high-draw appliances, conscious consumption. Typical UK off-grid daily loads: small cabin / shed 2-5 kWh; rural cottage 5-10 kWh; full off-grid home 10-20 kWh (with electric heating: 30-50 kWh)."
          >
            <p>Daily load estimation workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Method 1 — itemised</strong>: list each appliance (fridge, lights, EVs, water heating, washing machine) with daily kWh estimate. Sum total</li>
              <li><strong className="text-white">Method 2 — smart-meter data</strong>: where customer has historical consumption, use 12 months of half-hourly data to determine daily averages and worst-case days</li>
              <li><strong className="text-white">Method 3 — typical UK profile</strong>: ~8-14 kWh/day for residential without electric heating; ~30-50 kWh/day with electric heating</li>
              <li><strong className="text-white">Seasonal variation</strong> — winter loads typically higher (lighting, heating, longer indoor occupancy); summer loads lower. Off-grid sizing uses worst-case (typically winter) daily load</li>
              <li><strong className="text-white">Buffer for growth</strong> — add 10-20% buffer for future load growth (EV addition, new appliances)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="PV array sizing — December design point"
            plainEnglish="Off-grid PV sized for the worst-case month\'s peak sun hours (PSH). UK December PSH ~0.7-1.5 (location-dependent). Array kWp = daily load ÷ (PSH × system efficiency ~0.75)."
            onSite="The off-grid sizing penalty: array is significantly larger than a grid-tied install would be for the same daily load. Grid-tied uses annual-average PSH (~2.5-3.0); off-grid uses December (~0.7-1.5). Same daily load, 2-3× larger array. The penalty is the cost of December adequacy."
          >
            <p>Worked example — UK rural cottage:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Daily load: 6 kWh/day (winter design); 4 kWh/day (summer baseline)</li>
              <li>December PSH (Wales / North England rural): ~0.7-1.0 PSH/day</li>
              <li>System efficiency: 0.75 (accounts for inverter conversion, cable losses, dirt, age)</li>
              <li>Required array kWp: 6 ÷ (1.0 × 0.75) = 8 kWp (December design)</li>
              <li>Cross-check summer: 8 kWp × 5 PSH × 0.75 = 30 kWh/day generation — far above 4 kWh load. Summer surplus is the cost of December adequacy</li>
              <li>Annual generation: ~8,500 kWh/year (using annual-average PSH ~3.0)</li>
              <li>Annual load: 4-6 kWh × 365 = ~1,500-2,200 kWh/year</li>
              <li>Surplus diverted to controllable loads or generator-charging or accepted as overproduction</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Battery sizing — autonomy days and DoD"
            plainEnglish="Battery sized for autonomy days × daily load ÷ depth-of-discharge limit. Autonomy days: how long battery must support load without solar input. UK 3-5 days typical; 5-7 days for critical / remote installs. DoD limit: Li-ion typically 80-90% usable; lead-acid (older installs) 50%."
            onSite="Modern UK off-grid batteries: lithium iron phosphate (LFP / LiFePO4) is dominant — long life (10-15+ years), 80-90% usable DoD, safer chemistry than other Li-ion. Lithium NMC less common in off-grid (mostly used in grid-tied BESS). Lead-acid (flooded / sealed) declining — shorter life, lower DoD, more maintenance."
          >
            <p>Battery sizing workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Step 1 — choose autonomy</strong>: typical UK off-grid 3-5 days (general); 5-7 days (critical, e.g. medical equipment, security, vulnerable customer)</li>
              <li><strong className="text-white">Step 2 — choose DoD limit</strong>: LFP typical 80-90% usable; lead-acid 50%</li>
              <li><strong className="text-white">Step 3 — calculate nameplate</strong>: daily load × autonomy days ÷ DoD = battery kWh nameplate</li>
              <li><strong className="text-white">Worked example</strong>: 6 kWh/day × 4 days ÷ 0.85 = 28 kWh battery nameplate (typical Li-ion LFP off-grid)</li>
              <li><strong className="text-white">Practical sizing</strong>: round up to commercial module size (e.g. 30 kWh = 6 × 5 kWh Pylontech modules); allow buffer for growth</li>
              <li><strong className="text-white">Module 5 covers BESS in depth</strong> — chemistry, BMS, Reg 570 (Chapter 57) requirements</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Off-grid inverter behaviour — V/freq protection per Reg 551.2.3</ContentEyebrow>

          <Pullquote>Inverter generates V and freq. Monitors output. Trips off-load on excursion.</Pullquote>

          <ConceptBlock
            title="How an off-grid inverter operates"
            plainEnglish="An off-grid inverter is the ONLY AC source — it generates V and freq for the property. It modulates output to match real-time load demand, drawing energy from the battery as needed. When V or freq strays outside the safe envelope, it trips off-load to protect the loads and the battery."
            onSite="UK off-grid brands: Victron Multiplus / Quattro (popular, 1-15 kVA range); Studer Xtender (high quality, premium); OutBack Radian (US brand, less common in UK); SMA Sunny Island; Sigenergy SigenStor off-grid; Hoymiles AC-MAX off-grid. Inverter functions: AC-side power generation; battery charger (when grid-tied or generator backup present); battery discharger; V/freq protection."
          >
            <p>Reg 551.2.3 — V/freq protection requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Undervoltage trip</strong> — battery depleting; load too high; inverter generates less V. Trip protects battery (deep discharge damage) and loads (V too low for safe operation). Typical threshold: ~95% of nominal V (~218V for 230V nominal)</li>
              <li><strong className="text-white">Overvoltage trip</strong> — regulation fault; generator startup transient; PV oversupply overload. Trip protects loads from V damage. Typical threshold: ~110% of nominal V (~253V for 230V nominal)</li>
              <li><strong className="text-white">Underfrequency trip</strong> — load exceeds inverter capability; inverter modulation hits floor. Trip protects loads from V-sag damage. Typical threshold: ~48 Hz for 50 Hz nominal</li>
              <li><strong className="text-white">Overfrequency trip</strong> — regulation fault; rare in off-grid. Typical threshold: ~52 Hz</li>
              <li><strong className="text-white">Alarm and reporting</strong> — modern off-grid inverters log trip events with timestamps, V/freq at trip, cause. Customer monitoring system (Victron Cerbo GX, Studer Xcom) reports events in real time</li>
              <li><strong className="text-white">Automatic restart</strong> — inverter typically attempts auto-restart on V/freq recovery (battery charged, load normalised). Manual reset for repeated trips</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Rural Scottish smallholding — full off-grid design"
            situation="Customer in remote Scottish Highlands (no grid connection within 2 km). Property: 4-bedroom farmhouse + workshop. Daily electrical load: 18 kWh/day (lighting, fridge, freezer, water pump, occasional power tools, electric kettle). No electric heating (woodstove). December PSH at site ~0.5. Customer accepts generator backup for extended dark periods."
            whatToDo="Off-grid design: PV = 18 ÷ (0.5 × 0.75) = 48 kWp (very large array due to low December PSH and high daily load). Battery = 18 × 4 days × 1/0.85 = 85 kWh. Generator: 5 kVA diesel backup with auto-start linked to BESS low-V trigger (covered in Section 4.3). Inverter: 10 kVA off-grid (Victron Quattro or similar) sized for transient surge handling (water pump startup ~6 kW transient). Customer informed of summer surplus (~70 kWh/day generation vs 18 kWh load) — divert to electric water heating, future EV charging, or accept as overproduction. The cert evidence bundle records the design rationale, sizing calculations, and the generator backup integration."
            whyItMatters="Remote off-grid installs are the most cost-sensitive — the alternative is £50,000+ for DNO grid connection from 2 km away. Even a £50,000 off-grid install becomes attractive in that context. The honest survey models the worst-case month conservatively (December PSH 0.5 in Scotland) and includes generator backup — the customer\'s realistic expectations match the install\'s capability."
          />

          <Scenario
            title="Holiday cottage / barn conversion — seasonal off-grid"
            situation="Customer with a holiday cottage used mainly April-October. Daily load during use: ~8 kWh/day. Worst-case design month March (PSH ~2.0). No need for winter operation (closed Nov-Mar). Generator backup OK but rarely needed."
            whatToDo="Off-grid design with seasonal scope: PV = 8 ÷ (2.0 × 0.75) = 5.3 kWp; battery = 8 × 2 days × 1/0.85 = 19 kWh; small generator backup (3 kVA, manual start). Total cost: ~£18,000-£22,000 (significantly cheaper than full-winter off-grid because PSH design point is March not December). Customer accepts the cottage will not be used in deep winter. The cert evidence bundle records the seasonal scope as a design assumption — if the customer wants winter operation in future, the system would need expansion."
            whyItMatters="Seasonal off-grid is materially cheaper than full-winter off-grid because the design PSH is higher. The honest survey captures the customer\'s actual usage profile and sizes accordingly — not always for the worst possible scenario. Where customer\'s scope is seasonal, design accordingly and document the assumption."
          />

          <CommonMistake
            title="Sizing off-grid using annual-average PSH instead of worst-case month"
            whatHappens="An installer sizes an off-grid PV install using annual-average UK PSH (2.5-3.0 typical) instead of December worst-case. The install works fine April-October but the customer has repeated battery undervoltage trips November-February. The undersized array can\'t recharge the battery during low-sun winter periods."
            doInstead="Always use the WORST-CASE month\'s PSH for off-grid sizing (typically UK December at 0.7-1.5 PSH/day). The array is larger than annual-average sizing would give, but that\'s the point — December adequacy is the binding constraint, summer surplus is the cost. Generator backup recommended for extended winter dark periods even with December-sized array. The cert evidence bundle documents the December design point and the array sizing rationale."
          />

          <CommonMistake
            title="Treating off-grid PV as a Section 712 install with grid-tied design pattern"
            whatHappens="An installer treats an off-grid install the same as grid-tied: standard SolarEdge / GivEnergy hybrid inverter; standard battery; no V/freq protection design; no IET CoP for Stand-alone PV consideration. The install works initially but exhibits problems: V/freq excursions on heavy load; battery damage from deep discharge; no generator backup; customer dissatisfied."
            doInstead="Off-grid PV requires off-grid-specific design: off-grid inverter (Victron, Studer, OutBack, Sigenergy off-grid range); generator backup planning; V/freq protection per Reg 551.2.3; sizing per IET CoP for Stand-alone PV. The Module 3 grid-tied content applies to the PV-electrical-equipment aspects but the SYSTEM architecture is different. The cert evidence bundle reflects the off-grid design path explicitly."
          />

          <CommonMistake
            title="Skipping generator backup integration for cost — customer experiences winter outages"
            whatHappens="An installer sells an off-grid install without generator backup to save customer cost (~£2,000-£3,000 saving). The customer experiences 5-7 day periods in deep winter where battery depletes despite PV-sizing per December design — extended cloud cover beats the design assumption. Customer experiences extended cold / dark periods; relationship with installer damaged."
            doInstead="Recommend generator backup for full-year off-grid installs UNLESS customer explicitly accepts winter outage risk and the design includes very large autonomy battery (7+ days). Generator is the insurance policy against unmodelled extended dark periods. Cost: £1,500-£3,000 for a basic LPG / diesel generator with auto-start integration. The cert evidence bundle records the customer\'s informed decision (with or without generator) and the design implications."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 712.1 NOTE: stand-alone PV "under consideration" — off-grid design draws on Section 551 (generating sets — covers PV cells and batteries), Section 414 (SELV/PELV envelope), manufacturer specs, and the IET CoP for Stand-alone PV Systems.',
              'Off-grid PV sized for WORST-CASE month\'s PSH (UK December ~0.7-1.5). Array kWp = daily load ÷ (PSH × system efficiency 0.75). Battery kWh = daily load × autonomy days ÷ DoD.',
              'Typical UK ratio: 1 kWp PV : 2-4 kWh battery. Higher PV / lower battery for seasonal / year-round daily use; lower PV / higher battery for critical / extended-autonomy.',
              'Section 551 — generating sets covers PV cells (Reg 551.1.1(d)) and batteries (551.1.1(e)). Reg 551.2.3: automatic V/freq disconnection. Reg 551.4.1: fault protection per source.',
              'Off-grid inverter operates in standalone mode — generates V/freq for the property; no anti-islanding (no grid to backfeed); no EREC G98/G99. V/freq trip per Reg 551.2.3 protects loads and battery.',
              'Small off-grid (boats, caravans, sheds at 12V/24V/48V) fits Reg 712.414.1.1 SELV/PELV envelope. Larger off-grid (rural homes) exceeds 120V DC — Class II per Reg 712.412.101 same as grid-tied.',
              'Off-grid sizing intentionally oversizes — December design point requires large array; summer surplus often unused or diverted. Generator backup recommended for extended winter dark periods.',
              'IET Code of Practice for Stand-alone Photovoltaic Systems is the operational methodology source — fills the gap between Section 712 and the practical design workflow.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                PV diverters
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Generator backup integration
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
