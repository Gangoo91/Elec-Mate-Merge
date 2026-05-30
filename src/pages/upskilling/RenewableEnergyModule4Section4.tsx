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
import { CouplingComparison } from '@/components/study-centre/diagrams/renewableM4';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm4s4-ac-vs-dc-coupled',
    question:
      'AC-coupled vs DC-coupled hybrid PV+BESS — what are the architectural differences?',
    options: [
      'They are the same',
      'AC-coupled: PV inverter generates AC at the AC bus; a separate battery inverter / BMS converts AC to DC for battery charging (and DC to AC for discharge). Two conversion stages between PV and battery. DC-coupled: PV array connects DIRECTLY to the battery DC bus via a hybrid inverter that handles PV MPPT, battery charging, and AC inversion in one unit. Single conversion stage between PV and battery; AC inversion only when discharging to load',
      'DC-coupled is faster',
      'AC is cheaper always',
    ],
    correctIndex: 1,
    explanation:
      'AC-coupled vs DC-coupled describes WHERE the PV array connects in the system: AC-coupled = PV via its own inverter to the AC bus, then a separate battery inverter pulls AC and stores in DC battery (two-stage DC→AC→DC conversion for storage). DC-coupled = PV array goes directly to a hybrid inverter that manages both PV MPPT and battery charging at the DC level (single conversion). The difference matters for: conversion losses (DC-coupled wins on round-trip efficiency); retrofit flexibility (AC-coupled bolts onto existing PV without changing inverter); component count and cost.',
  },
  {
    id: 'm4s4-conversion-losses',
    question:
      'Round-trip efficiency for PV → battery → AC load: AC-coupled vs DC-coupled. Typical real-world numbers?',
    options: [
      'Both 100%',
      'DC-coupled typical round-trip: ~89-91% (PV → DC battery: ~99%; battery → AC load: ~90%). AC-coupled typical round-trip: ~84% (PV → AC: ~97%; AC → DC battery: ~95%; battery → AC load: ~90%). DC-coupled saves ~5-7 percentage points by skipping the AC↔DC stage between PV and battery. Over 10,000 cycles, the loss difference compounds — meaningful for high-cycling commercial installs',
      'AC-coupled is 50% better',
      'DC-coupled is 50% better',
    ],
    correctIndex: 1,
    explanation:
      'AC-coupled vs DC-coupled efficiency: DC-coupled saves one AC↔DC conversion stage (the stage between PV inverter and battery inverter that exists in AC-coupled). Each conversion stage ~95-97% efficient; cutting one stage saves ~5-7 percentage points round-trip. UK domestic real-world: AC-coupled ~80-85% round-trip; DC-coupled ~85-91% round-trip. For high-cycling installs (commercial demand-response, grid-services participation, EV+PV+BESS prosumer), the difference accumulates. For low-cycling installs (residential daily PV+evening discharge, ~365 cycles/year), the difference is smaller in absolute terms (~10-15% of total kWh stored).',
  },
  {
    id: 'm4s4-uk-brands',
    question:
      'UK 2025-2026 dominant hybrid inverter / BESS brands — name the most common categories?',
    options: [
      'No brands',
      'DC-coupled hybrid: GivEnergy (Hybrid + Battery, UK-designed/manufactured); Solis Hybrid; Huawei LUNA; FoxESS Hybrid; Sigenergy SigenStor; SolarEdge StorEdge / Energy Hub (uses SolarEdge optimisers + DC-coupled battery). AC-coupled retrofit: Tesla Powerwall 2/3 (AC-coupled to existing grid-tied PV); Enphase IQ Battery (microinverter ecosystem); GivEnergy AC battery (retrofit option); SolarEdge AC battery. Some Sigenergy / GivEnergy products support both coupling modes',
      'Only Tesla',
      'Customer chooses',
    ],
    correctIndex: 1,
    explanation:
      'UK BESS market 2025-2026 is dominated by: DC-coupled hybrid inverters from GivEnergy (UK-designed and -manufactured, popular for new-build PV+BESS), Solis, Huawei LUNA, FoxESS, Sigenergy SigenStor, SolarEdge StorEdge. AC-coupled retrofit options include Tesla Powerwall 2/3 (AC-coupled in standard config; Powerwall 3 has both modes), Enphase IQ Battery (works with Enphase microinverter PV), GivEnergy AC battery, SolarEdge AC battery. The choice depends on: whether install is new-build or retrofit; existing PV inverter brand; battery chemistry preference; warranty/support requirements. Module 5 covers BESS regulatory framework (Chapter 57) and chemistry in depth.',
  },
  {
    id: 'm4s4-reg-570-5-2',
    question:
      'BS 7671 Reg 570.5.2 (Chapter 57, NEW in A4:2026) covers PCE selection for BESS. What does it say about hybrid inverters?',
    options: [
      'Hybrid inverters not allowed',
      'Reg 570.5.2: the type and characteristics of PCE shall be selected to be suitable for the type of battery and its application, taking account of the battery manufacturer\'s instructions. NOTE 1: PCE for stationary battery installations may be incorporated into PCE for renewable generation, for example, solar PV system inverters (sometimes termed &ldquo;bidirectional&rdquo; or &ldquo;hybrid&rdquo; inverters). NOTE 2: PCE may be used to connect batteries to AC systems (sometimes termed &ldquo;AC coupling&rdquo;) or DC systems (sometimes termed &ldquo;DC coupling&rdquo;). The reg explicitly recognises both coupling modes',
      'Only DC-coupled',
      'Customer choice only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.5.2 in Chapter 57 (NEW in A4:2026) explicitly recognises hybrid inverters and both coupling modes. The regulatory term is &ldquo;PCE&rdquo; (Power Conversion Equipment) — covers PV inverters, battery inverters, and hybrid inverters. NOTE 1 calls out hybrid inverters by name; NOTE 2 calls out AC coupling and DC coupling. The PCE selection must consider the battery type + application + manufacturer instructions. The reg is the regulatory authority behind the hybrid topology choice. Cert evidence bundle records the PCE selection rationale.',
  },
  {
    id: 'm4s4-reg-570-6-1',
    question:
      'Reg 570.6.1.1.1 (Chapter 57) requires stationary battery installations to conform to a specific standard. Which one?',
    options: [
      'No standard',
      'BS EN IEC 62485 series — &ldquo;Safety requirements for secondary batteries and battery installations&rdquo;. Covers battery selection, installation, ventilation, fire safety, maintenance. Reg 570.6.1.1.1 also notes: &ldquo;Where appropriate, bidirectional protective devices shall be selected&rdquo; — parallels the DC-side OCPD bidirectional requirement (Reg 712.533.101 for PV) since BESS current can flow in either direction',
      'Customer\'s choice',
      'BS EN 50618',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.1.1.1: &ldquo;Stationary secondary battery installations shall conform to the relevant parts of the BS EN IEC 62485 series. Where appropriate, bidirectional protective devices shall be selected.&rdquo; The BS EN IEC 62485 series covers safety requirements for stationary battery installations — ventilation for hydrogen evolution (lead-acid), enclosure ratings, thermal management, fire safety. The bidirectional protective device note parallels Reg 712.533.101 for PV: BESS current is bidirectional (charge ↔ discharge), so OCPDs must operate in either direction. Module 5 covers BS EN IEC 62485 in detail.',
  },
  {
    id: 'm4s4-dc-earthing',
    question:
      'Reg 570.6.1.2.1 (BESS DC earthing) — what does it permit, and how does it parallel Reg 712.312.2 for PV?',
    options: [
      'Not permitted',
      'Reg 570.6.1.2.1: &ldquo;Earthing of one of the live conductors of the DC side is permitted, if there is at least simple separation between the AC side and the DC side.&rdquo; This is the BESS equivalent of Reg 712.312.2 for PV — both permit DC live-conductor earthing under the same galvanic-isolation condition. For DC-coupled hybrid installs, the PV array and BESS share the same DC bus; the simple separation condition applies to the PCE between DC and AC sides',
      'Forbidden',
      'Customer\'s choice',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.1.2.1 mirrors Reg 712.312.2 — both permit DC live-conductor earthing where at least simple separation exists between AC and DC sides. For DC-coupled hybrid: the PCE (hybrid inverter) provides the separation; the shared DC bus (PV array + BESS) may be DC-earthed under this provision. For AC-coupled: each PCE (PV inverter, battery inverter) provides its own separation; the BESS DC bus is independent of the PV DC. Reg 712.542.102 (PV functional bonding) and the BESS-side equivalent apply at the design level. Cert evidence bundle records the earthing arrangement per source.',
  },
  {
    id: 'm4s4-retrofit',
    question:
      'Customer has existing 5 kWp PV install (3 years old, Solis inverter). Wants to add 10 kWh battery. AC-coupled or DC-coupled?',
    options: [
      'Must be DC-coupled',
      'AC-coupled — retrofit case. The existing Solis inverter stays; an AC-coupled battery unit (Tesla Powerwall 2, GivEnergy AC battery, SolarEdge AC battery) connects to the AC bus alongside the inverter. Pros: no PV inverter replacement; existing MCS / EREC paperwork stays; install time short (1-2 days). Cons: AC-coupled efficiency penalty (~5-7 percentage points round-trip vs DC-coupled); more components on the AC side; commissioning more complex than new-build DC-coupled',
      'Replace everything',
      'Customer\'s preference only',
    ],
    correctIndex: 1,
    explanation:
      'Retrofit scenario favours AC-coupled. The existing PV inverter (Solis) keeps its EREC G98 / G99 registration, MCS certificate, and warranty. AC-coupled battery (Tesla Powerwall 2/3, GivEnergy AC, SolarEdge AC, Enphase IQ) bolts onto the existing AC infrastructure. Trade-off: efficiency penalty (~5-7 percentage points round-trip). For new-build PV+BESS, DC-coupled hybrid inverter (GivEnergy Hybrid, Solis Hybrid, Sigenergy SigenStor) is the modern default — single inverter, lower component count, better efficiency. Cert evidence bundle records the coupling mode and the design rationale.',
  },
  {
    id: 'm4s4-prosumer',
    question:
      'How does Chapter 82 (Prosumer\'s Electrical Installations, NEW A4:2026) interact with the hybrid PV+BESS topology choice?',
    options: [
      'Doesn\'t apply',
      'Chapter 82 applies to ANY install that both consumes and generates / stores electricity — i.e. ALL hybrid PV+BESS installs are PEIs. The topology choice (AC vs DC coupled) doesn\'t change Chapter 82\'s applicability; both architectures need PEI design (Reg 826.1.1.1-826.1.4). Key PEI considerations for hybrid: multi-source isolation (Reg 826.1.1.4 — main switch suitable for isolation per source); operating modes (Reg 824.2 — direct feeding / island / etc.); bidirectional OCPDs (Reg 826.1.2.2 takes account of ALL POSSIBLE directions of current flow). Section 4.5 covers Chapter 82 in depth',
      'Only for AC-coupled',
      'Only for DC-coupled',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 82 (Prosumer\'s Electrical Installations — NEW in A4:2026) applies to hybrid PV+BESS regardless of coupling mode. The PEI design discipline includes: multi-source isolation per Reg 826.1.1.4; operating modes per Reg 824.2; bidirectional OCPDs per Reg 826.1.2.2; transient overvoltage protection per Reg 826.1.4. Section 4.5 covers Chapter 82 PEI in depth — including the regulatory framework, design pack content, and integration with Chapter 57 (BESS) and Section 712 (PV).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'New-build customer wants 6 kWp PV + 10 kWh BESS. Which coupling mode is the modern default?',
    options: [
      'AC-coupled',
      'DC-coupled hybrid — single hybrid inverter (GivEnergy Gen3 / Solis Hybrid / Sigenergy SigenStor / SolarEdge Energy Hub) handles both PV MPPT and BESS charging/discharging. Pros: single inverter (lower component count, lower install cost vs separate PV + battery inverters), better round-trip efficiency (~89-91% vs AC-coupled ~84%), simpler commissioning. The PCE selection per Reg 570.5.2 explicitly permits this hybrid topology',
      'Customer chooses',
      'Both at once',
    ],
    correctAnswer: 1,
    explanation:
      'DC-coupled hybrid is the modern UK new-build default for PV+BESS. Single hybrid inverter (typical 5-10 kW AC rated) replaces separate PV and battery inverters. UK brands: GivEnergy (UK-designed/manufactured, popular), Solis Hybrid, Huawei LUNA, FoxESS, Sigenergy SigenStor, SolarEdge Energy Hub. Round-trip efficiency ~89-91% vs AC-coupled ~84%. Component count lower; commissioning simpler; cost lower. Per Reg 570.5.2: PCE may be incorporated into renewable-generation PCE — i.e. hybrid inverter explicitly permitted.',
  },
  {
    id: 2,
    question:
      'Customer\'s existing PV (5 years old, SolarEdge HD-Wave inverter + optimisers). Wants to add 10 kWh BESS. Best coupling mode?',
    options: [
      'AC-coupled Tesla',
      'DC-coupled via SolarEdge Energy Hub or DC-coupled retrofit. SolarEdge supports DC-coupled retrofit with its optimisers — the existing optimiser-controlled DC bus already runs to the inverter; swap inverter to Energy Hub + add SolarEdge BESS. Higher efficiency than AC-coupled retrofit; preserves the optimiser investment. Alternative: SolarEdge AC battery (AC-coupled retrofit) — simpler install but lower efficiency. Customer\'s informed decision based on cost / efficiency trade-off',
      'Replace all',
      'No options',
    ],
    correctAnswer: 1,
    explanation:
      'SolarEdge ecosystem supports DC-coupled retrofit elegantly: existing PV with optimisers + HD-Wave inverter → swap to Energy Hub inverter + DC-coupled SolarEdge BESS. Optimisers stay; PV array stays; just the inverter and battery added. Higher round-trip efficiency (~89-91%) than AC-coupled retrofit (~84%). Cost premium of ~£500-£1,000 vs basic AC-coupled retrofit is offset by 5+ year efficiency gain. Alternative: SolarEdge AC battery for simpler install. Cert evidence bundle records the chosen coupling mode and rationale.',
  },
  {
    id: 3,
    question:
      'AC-coupled hybrid install: PV inverter 5 kW + battery inverter 5 kW. Customer load is 10 kW peak. Both inverters can supply concurrently — but the battery inverter is also charging during midday. What\'s the limit?',
    options: [
      'Unlimited',
      'Each inverter contributes its rated AC output to the load. Combined 5 + 5 = 10 kW peak achievable if both inverters at full output. However: battery inverter splits its capacity between discharging-to-load and charging-from-PV. If charging at 3 kW and load needs 7 kW, battery inverter contributes (5 − 3) = 2 kW to load; PV inverter contributes its current generation up to 5 kW; deficit (7 − 2 − 5 = 0) from grid. Hybrid inverters (DC-coupled) avoid this conflict — single unit allocates power flow internally',
      'Inverters fight',
      'Customer\'s fault',
    ],
    correctAnswer: 1,
    explanation:
      'AC-coupled splits responsibility between two inverters with separate power budgets. PV inverter: all generation goes to AC. Battery inverter: bidirectional, splits between discharge-to-load (forward) and charge-from-AC (reverse — uses some of PV inverter\'s generation). Conflict can occur when load is high AND PV is producing AND battery wants charging — the battery inverter must time-slice or prioritise. DC-coupled hybrid inverter handles all this internally: PV array charges DC bus; BMS sets charge limit; whatever\'s left after charging + load goes to grid (or to grid if export-allowed). Single decision point; no AC-bus conflicts.',
  },
  {
    id: 4,
    question:
      'Customer asks: &ldquo;What about Tesla Powerwall — is it AC or DC coupled?&rdquo;',
    options: [
      'Always DC',
      'Powerwall 2 is AC-coupled — it pairs with any existing PV inverter via the AC bus. Tesla\'s Gateway 2 monitors the property\'s consumption + grid + PV inverter output and decides Powerwall charge/discharge. Powerwall 3 (released 2024-2025) supports BOTH AC-coupled AND DC-coupled modes — it can accept PV DC inputs directly (DC-coupled mode, integrated MPPT) OR via AC bus (AC-coupled retrofit). Customer typically pays a premium for Powerwall 3 to get the choice',
      'Always AC',
      'Neither',
    ],
    correctAnswer: 1,
    explanation:
      'Tesla Powerwall history: Powerwall 2 (2016-2024) is AC-coupled only — pairs with existing PV inverters via Tesla Gateway 2. Powerwall 3 (2024+) supports both modes — can be DC-coupled directly to PV (acts as the hybrid inverter, with integrated 11.5 kW continuous AC output and PV DC inputs) or AC-coupled to existing PV. The mode is set at install time. Powerwall 3 commands premium pricing (~£8,000-£12,000) over Powerwall 2 (~£6,000-£8,000) but the DC-coupled mode + higher AC output makes it the modern flagship. Cert evidence bundle records the chosen mode.',
  },
  {
    id: 5,
    question:
      'BS 7671 Reg 570.6.1.1.1 requires BS EN IEC 62485 conformance for BESS. What does that standard cover?',
    options: [
      'Customer satisfaction',
      'BS EN IEC 62485 series: &ldquo;Safety requirements for secondary batteries and battery installations&rdquo;. Multi-part standard covering: (-1) general safety information; (-2) stationary lead-acid; (-3) traction lead-acid; (-4) general for stationary lithium; (-5) stationary lithium-ion. Topics: ventilation (hydrogen evolution for lead-acid), enclosure ratings, thermal management, fire safety, maintenance access. Reg 570.6.1.1.1 requires conformance; Module 5 covers BS EN IEC 62485 in depth',
      'Voltage limits only',
      'No content',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN IEC 62485 series is the multi-part standard for stationary battery safety. Parts: -1 (general safety information); -2 (stationary lead-acid); -3 (traction); -4 (general for stationary lithium); -5 (stationary lithium-ion). Topics covered: ventilation (critical for lead-acid which evolves hydrogen during charging); enclosure ratings (IP ratings, fire resistance); thermal management; maintenance access; emergency response. Reg 570.6.1.1.1 mandates conformance — cert evidence bundle records the install\'s adherence. Module 5 covers each relevant part in depth.',
  },
  {
    id: 6,
    question:
      'Reg 570.6.1.1.2 says &ldquo;Voltage at the terminals of cells or monobloc batteries shall be assumed to be always present&rdquo;. What\'s the practical implication?',
    options: [
      'No implication',
      'BESS DC bus is ALWAYS LIVE — like the PV DC side (Reg 712.410.101). Maintenance work must isolate at the battery DC isolator + work safely assuming live cells throughout. Reg 570.6.1.1.2 also requires &ldquo;appropriate provisions for safe maintenance shall be provided in accordance with the BS EN IEC 62485 series&rdquo;. Cert evidence bundle records: battery isolator location, BS EN IEC 62485 compliance, maintenance access provisions',
      'Voltage is zero',
      'Customer\'s issue',
    ],
    correctAnswer: 1,
    explanation:
      'BESS terminal voltage is &ldquo;always present&rdquo; per Reg 570.6.1.1.2 — analogous to PV DC side per Reg 712.410.101. Practical implications: (1) battery DC isolator is the safety-critical isolation point — typically a DC-rated switch-disconnector per BS EN 60947-3 between cells and PCE; (2) safe maintenance requires BS EN IEC 62485 compliance — proper PPE, lockout/tagout discipline, training; (3) BESS labels (analogous to Reg 712.514.102 for PV) warn that the DC side remains energised after AC isolation. Cert evidence bundle records all three.',
  },
  {
    id: 7,
    question:
      'Customer has Enphase IQ7 microinverter PV (existing). Wants to add Enphase IQ Battery. Coupling architecture?',
    options: [
      'DC-coupled',
      'AC-coupled — Enphase ecosystem is inherently AC-coupled. Each PV module has its own IQ7 microinverter (module-level AC conversion), so the entire array runs at AC. The IQ Battery connects to the AC bus alongside the microinverters. Enphase IQ Gateway monitors and orchestrates the system. The architecture is consistent: PV → AC (per module) → AC bus → battery (charging via AC) → battery (discharging via AC). No DC bus on the PV side at all',
      'Forbidden',
      'Custom',
    ],
    correctAnswer: 1,
    explanation:
      'Enphase microinverter ecosystem is inherently AC-coupled — each module has its own microinverter converting DC to AC at the module. There IS no DC bus to DC-couple a battery to. IQ Battery (Enphase\'s BESS) is AC-coupled by design; it sits on the AC bus alongside the microinverters. Enphase IQ Gateway provides the orchestration. Round-trip efficiency similar to other AC-coupled architectures (~84%). The Enphase ecosystem trade-off: module-level optimisation + AC simplicity vs the efficiency penalty of two-stage conversion. Cert evidence bundle records the Enphase architecture.',
  },
  {
    id: 8,
    question:
      'How does the design pack for a hybrid PV+BESS install differ between AC-coupled and DC-coupled?',
    options: [
      'No difference',
      'Both need the MCS MIS 3002 PV design pack + the Chapter 57 BESS design content + the Chapter 82 PEI design (covered in Section 4.5). Specific differences: AC-coupled = two PCEs (PV inverter + battery inverter), each with its own MPPT calcs, AC sizing, EREC G98 / G99 registration; DC-coupled = single hybrid PCE with combined PV MPPT + BESS sizing in one design document. AC-coupled has more cert evidence bundle artefacts; DC-coupled has fewer but tighter integration',
      'Customer\'s choice',
      'No design pack needed',
    ],
    correctAnswer: 1,
    explanation:
      'Hybrid PV+BESS design pack content: (1) MCS MIS 3002 PV design pack (Module 3 content); (2) Chapter 57 BESS content per Reg 570.5.1-570.6 (battery selection, PCE selection per Reg 570.5.2, BS EN IEC 62485 compliance); (3) Chapter 82 PEI design (operating modes, multi-source isolation, bidirectional OCPDs — covered in Section 4.5); (4) coupling-specific items. AC-coupled: separate PV inverter MPPT + battery PCE sizing. DC-coupled: combined hybrid inverter MPPT + battery sizing + PV string sizing. Cert evidence bundle adapts to the architecture.',
  },
];

const faqs = [
  {
    question: 'When should I choose AC-coupled vs DC-coupled for a new install?',
    answer:
      'DC-coupled is the modern UK default for new-build PV+BESS — single hybrid inverter (GivEnergy, Solis, Sigenergy, Huawei, FoxESS, SolarEdge Energy Hub) handles both PV and BESS. Better efficiency (~89-91% round-trip vs ~84% AC-coupled), lower component count, simpler commissioning. Choose AC-coupled when: (a) retrofitting an existing PV install (preserve the inverter and its certifications); (b) using a specific BESS brand (Tesla Powerwall 2, Enphase IQ Battery) that is AC-coupled only; (c) Powerwall 3 in AC-coupled mode for ecosystem reasons. The cert evidence bundle records the rationale.',
  },
  {
    question: 'How big is the efficiency penalty really? Worked example.',
    answer:
      'Example: 6 kWp PV system, 6,000 kWh/year generation, 50% surplus diverted to BESS (3,000 kWh through battery per year). DC-coupled round-trip ~89%: lost 11% of 3,000 kWh = 330 kWh/year. AC-coupled round-trip ~84%: lost 16% of 3,000 kWh = 480 kWh/year. Difference: 150 kWh/year × £0.28/kWh import-displaced = £42/year. Over 15-year battery life: £630 cumulative. Not huge for low-cycling residential — but for high-cycling commercial (4-6 cycles/day with grid-services revenue), the difference is multiplied 4-6× and becomes material.',
  },
  {
    question: 'What about Tesla Powerwall 3 — is it the DC-coupled retrofit answer?',
    answer:
      'Powerwall 3 (2024+) supports both AC-coupled and DC-coupled modes. DC-coupled mode: PV array connects to Powerwall 3\'s integrated MPPT inputs; Powerwall 3 acts as the hybrid inverter (11.5 kW continuous AC output). AC-coupled mode: existing PV inverter stays; Powerwall 3 connects to AC bus. The DC-coupled mode delivers ~91% round-trip efficiency; AC-coupled mode ~84%. Customer typically pays £8,000-£12,000 for Powerwall 3 (vs £6,000-£8,000 for Powerwall 2). For new-build, DC-coupled mode replaces a typical £1,500-£2,000 hybrid inverter cost — making Powerwall 3 + DC-coupled comparable to GivEnergy Gen3 + matched LFP battery.',
  },
  {
    question: 'How does the choice affect EREC G98 / G99 registration?',
    answer:
      'EREC registration is about the AC inverter output, not the coupling mode. AC-coupled with 5 kW PV inverter + 5 kW battery inverter: typically registered as 10 kW combined (EREC G99 territory) OR with export limitation per EREC G100. DC-coupled hybrid with 8 kW AC output: registered as 8 kW (EREC G99 above 16 A single-phase; ~3.68 kW threshold below G98). The MCS-certified contractor handles the registration. Cert evidence bundle includes the DNO notification / approval.',
  },
  {
    question: 'Can I mix DC-coupled hybrid + additional AC-coupled battery?',
    answer:
      'Yes, but unusual. Architecture: GivEnergy Hybrid (or similar) with its DC-coupled battery as the primary BESS; an additional AC-coupled battery (Tesla Powerwall 2, GivEnergy AC battery) added later for capacity expansion. The two batteries operate independently; the hybrid inverter\'s Gateway typically orchestrates both. Used in: customer outgrew the DC-coupled BESS and wants more storage without replacing the existing kit. The cert evidence bundle records each battery\'s details and the orchestration. Reg 570.5.2 NOTE 1/2 covers both PCEs.',
  },
  {
    question: 'Module 5 (BESS) and Module 4.4 (this section) — what\'s the split?',
    answer:
      'This section (Module 4.4) focuses on the topology choice — AC vs DC coupling — for PV+BESS systems specifically. Module 5 (BESS) goes deep on the BESS itself: chemistry (LFP / NMC / lead-acid), BMS, Chapter 57 in detail (Reg 570.5.1-570.6 all parts), BS EN IEC 62485 series, PAS 63100:2024 UK installation spec, fire safety, ventilation, sizing methodology. Section 4.4 references Module 5 for the deep BESS content; the topology choice here is the design decision that drives downstream BESS selection.',
  },
  {
    question: 'How does Chapter 82 (PEIs — NEW A4:2026) tie into the hybrid choice?',
    answer:
      'Chapter 82 applies to ANY install that both consumes and generates/stores electricity — i.e. ALL hybrid PV+BESS installs. The coupling mode doesn\'t change Chapter 82\'s applicability. Section 4.5 covers Chapter 82 in depth: operating modes (Reg 824.2 — direct feeding, island, etc.); multi-source isolation (Reg 826.1.1.4); bidirectional OCPDs (Reg 826.1.2.2); transient overvoltage protection (Reg 826.1.4). For hybrid PV+BESS, the PEI design ties Chapter 57 + Section 712 + Chapter 82 together into a unified prosumer design pack.',
  },
  {
    question: 'What\'s the most common UK domestic hybrid configuration in 2025-2026?',
    answer:
      'UK domestic 2025-2026 typical: 4-8 kWp PV (south-facing, 30-40° tilt) + 5-10 kWh LFP BESS + DC-coupled hybrid inverter (GivEnergy Gen3 / Solis Hybrid / Sigenergy SigenStor). Cost: ~£12,000-£18,000 fully installed including MCS, EREC, scaffold, electrics. Payback: 6-10 years typical depending on grid tariff and self-consumption profile. Annual generation 4,000-8,000 kWh; battery cycles 250-365/year; round-trip efficiency 87-91%. The DC-coupled hybrid is the dominant new-build pattern; AC-coupled retrofit is the dominant existing-PV upgrade pattern.',
  },
  {
    question: 'How does Section 4.6 EPS (Emergency Power Supply) interact with coupling mode?',
    answer:
      'EPS (backup power during grid outage) is a function of the hybrid inverter, not the coupling mode per se. Both AC-coupled and DC-coupled architectures can support EPS — but the specific inverter model matters. DC-coupled hybrid inverters (GivEnergy, Sigenergy, SolarEdge Energy Hub) typically have built-in EPS output. AC-coupled BESS (Powerwall, Enphase) also support EPS but require their own Gateway / backup switch arrangement. Section 4.6 covers EPS design in depth — including the Reg 826.1.1.2.2 neutral-switch arrangement and the protected-load partitioning.',
  },
];

export default function RenewableEnergyModule4Section4() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Hybrid PV + BESS topologies | Renewable Energy 4.4 | Elec-Mate',
    description:
      'AC-coupled vs DC-coupled hybrid PV+BESS — architectural differences, round-trip efficiency, UK brand landscape (GivEnergy, Tesla, Sigenergy, SolarEdge, Enphase), Reg 570.5.2 PCE selection, BS EN IEC 62485 series, retrofit vs new-build decision.',
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
            eyebrow="Module 4 · Section 4 · BS 7671:2018+A4:2026"
            title="Hybrid PV + BESS topologies"
            description="AC-coupled vs DC-coupled architectures, round-trip efficiency, UK brand landscape (GivEnergy / Tesla / Sigenergy / SolarEdge / Enphase), Reg 570.5.2 PCE selection (Chapter 57 NEW A4:2026), BS EN IEC 62485 series, and the retrofit vs new-build design decision."
            tone="yellow"
          />

          <TLDR
            points={[
              'AC-coupled: PV via its own inverter to AC bus, then separate battery inverter does AC↔DC for storage. Two conversion stages between PV and battery. DC-coupled: PV array DIRECTLY to hybrid inverter that manages both PV MPPT and BESS charging at DC level. Single conversion stage between PV and battery.',
              'Round-trip efficiency: DC-coupled ~89-91% (single conversion stage saved); AC-coupled ~84%. ~5-7 percentage point penalty for AC-coupled. Material for high-cycling commercial; smaller absolute impact for low-cycling residential.',
              'Reg 570.5.2 (Chapter 57 NEW A4:2026): PCE selection per battery type + manufacturer instructions. NOTE 1 explicitly recognises hybrid inverters; NOTE 2 explicitly recognises AC coupling and DC coupling. The reg authorises both topology choices.',
              'Reg 570.6.1.1.1: BESS shall conform to BS EN IEC 62485 series. Reg 570.6.1.1.2: BESS terminal voltage always present. Reg 570.6.1.2.1: DC live-conductor earthing permitted with simple separation. Reg 570.6.1.2.2: where DC is earthed and AC is TN-S/TT, single-point earthing only. Reg 570.6.3: ventilation per BS EN IEC 62485 + PAS 63100:2024. Reg 570.6.4: fault current contributions from BOTH battery and PCE.',
              'UK 2025-2026 brand landscape — DC-coupled hybrid (new-build): GivEnergy Gen3 (UK-designed/manufactured), Solis Hybrid, Sigenergy SigenStor, Huawei LUNA, FoxESS, SolarEdge Energy Hub. AC-coupled (retrofit): Tesla Powerwall 2/3 (3 also DC-coupled), Enphase IQ Battery (microinverter ecosystem), GivEnergy AC, SolarEdge AC.',
              'Decision rule: New-build PV+BESS → DC-coupled hybrid (modern default). Retrofit to existing PV → AC-coupled (preserve existing inverter + certifications). Chapter 82 PEI design applies to BOTH (Section 4.5).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish AC-coupled vs DC-coupled hybrid architectures — where the PV array connects, how conversion stages flow, what the implications are for component count and efficiency.',
              'Quantify round-trip efficiency differences (~5-7 percentage points DC-coupled advantage) and assess when the difference is material vs immaterial for the customer\'s case.',
              'Apply Reg 570.5.2 (Chapter 57, NEW A4:2026) — PCE selection per battery type and application; recognise hybrid inverters and both coupling modes in the regulatory framework.',
              'Apply Reg 570.6.1.1.1, 570.6.1.1.2, 570.6.1.2.1 — BS EN IEC 62485 conformance, terminal-voltage-always-present, DC live-conductor earthing with simple separation.',
              'Map the UK 2025-2026 hybrid inverter / BESS brand landscape: GivEnergy, Solis, Sigenergy, Huawei, FoxESS, SolarEdge, Tesla, Enphase — and their typical coupling modes.',
              'Decide AC-coupled vs DC-coupled for the customer\'s case based on new-build vs retrofit, existing kit, brand ecosystem, and the efficiency / cost trade-off.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>DC-coupled for new-build. AC-coupled for retrofit. Both authorised by Reg 570.5.2.</Pullquote>

          <ContentEyebrow>The architectural difference — where the PV connects</ContentEyebrow>

          <ConceptBlock
            title="AC-coupled architecture"
            plainEnglish="PV array → PV inverter (DC to AC conversion) → AC bus → battery inverter (AC to DC for charging; DC to AC for discharging) → battery DC bus. Two conversion stages between PV and battery."
            onSite="The traditional architecture for retrofit: PV install already has an inverter; the battery adds its own inverter on the AC side. Used for Tesla Powerwall 2, Enphase IQ Battery, GivEnergy AC battery, SolarEdge AC battery — all AC-coupled by design or default."
          >
            <p>AC-coupled key characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Two PCEs</strong> — separate PV inverter + battery inverter. Each PCE has its own MPPT, AC output, monitoring, warranty</li>
              <li><strong className="text-white">Conversion stages</strong> — PV DC → AC (PV inverter) → DC battery (battery inverter charging) → AC (battery inverter discharging) → load. Each stage ~95-97% efficient</li>
              <li><strong className="text-white">Retrofit-friendly</strong> — existing PV inverter stays in place; existing EREC / MCS / DNO documentation continues to apply; install time short (battery + cabling only)</li>
              <li><strong className="text-white">Component count higher</strong> — two PCEs, two AC isolators, more cabling, two sets of monitoring</li>
              <li><strong className="text-white">Failure isolation</strong> — PV continues to operate if battery inverter fails (and vice versa). Some redundancy benefit</li>
              <li><strong className="text-white">Microinverter ecosystem</strong> — Enphase IQ7 + IQ Battery is inherently AC-coupled (no DC bus at all)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="DC-coupled architecture"
            plainEnglish="PV array → hybrid inverter (manages PV MPPT, battery charging/discharging, AC output, all in one unit) → AC bus + battery DC bus internal. Single conversion stage between PV and battery."
            onSite="The modern architecture for new-build: single hybrid inverter handles everything. Used in: GivEnergy Hybrid (UK-designed/manufactured, dominant), Solis Hybrid, Sigenergy SigenStor, Huawei LUNA, FoxESS, SolarEdge Energy Hub, Tesla Powerwall 3 in DC-coupled mode."
          >
            <p>DC-coupled key characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Single PCE</strong> — one hybrid inverter handles PV MPPT, battery charging/discharging, AC inversion to grid + load</li>
              <li><strong className="text-white">Conversion stages</strong> — PV DC → DC battery (direct, no AC stage). Saves one conversion stage round-trip. Discharge path: battery DC → AC (single conversion) → load</li>
              <li><strong className="text-white">New-build friendly</strong> — install designed from scratch with hybrid inverter. Cleanest architecture; lowest component count</li>
              <li><strong className="text-white">Component count lower</strong> — single PCE, fewer AC isolators, less cabling, unified monitoring app</li>
              <li><strong className="text-white">Single point of failure</strong> — hybrid inverter failure takes both PV and battery offline. Mitigation: warranty + service contract</li>
              <li><strong className="text-white">Tight integration</strong> — hybrid inverter\'s logic decides power-flow priorities internally (PV → battery → load → grid). No AC-bus conflicts</li>
            </ul>
          </ConceptBlock>

          <CouplingComparison caption="DC- vs AC-coupled vs hybrid storage — where PV and the battery connect, and how many conversion stages each involves. DC-coupled suits new installs; AC-coupled is the clean way to add a battery to existing PV." />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Reg 570.5.2 — PCE selection (Chapter 57, NEW A4:2026)</ContentEyebrow>

          <Pullquote>Chapter 57 explicitly recognises hybrid inverters and both coupling modes.</Pullquote>

          <ConceptBlock
            title="What Reg 570.5.2 says about PCE selection"
            plainEnglish="Chapter 57 (NEW in A4:2026) regulates stationary secondary battery installations. Reg 570.5.2 covers PCE (Power Conversion Equipment) selection — the inverter / charge controller / hybrid unit that interfaces the battery to AC and / or to renewable generation."
            onSite="The reg explicitly recognises hybrid inverters (NOTE 1) and the AC / DC coupling distinction (NOTE 2). PCE selection must consider battery type, application, manufacturer instructions. Cert evidence bundle records the PCE selection rationale."
          >
            <p>Reg 570.5.2 selection criteria:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Battery type compatibility</strong> — PCE must match battery chemistry (LFP / NMC / lead-acid / etc.); charge / discharge profiles; voltage range</li>
              <li><strong className="text-white">Application suitability</strong> — residential vs commercial; cycle frequency; load profile; grid-tied vs off-grid</li>
              <li><strong className="text-white">Battery manufacturer instructions</strong> — specific BMS protocol (CAN bus / Modbus); approved PCE list; warranty conditions</li>
              <li><strong className="text-white">Hybrid inverter recognition (NOTE 1)</strong> — &ldquo;PCE for stationary battery installations may be incorporated into PCE for renewable generation, for example, solar PV system inverters (sometimes termed &lsquo;bidirectional&rsquo; or &lsquo;hybrid&rsquo; inverters)&rdquo;</li>
              <li><strong className="text-white">Coupling mode recognition (NOTE 2)</strong> — &ldquo;PCE may be used to connect batteries to AC systems (sometimes termed &lsquo;AC coupling&rsquo;) or DC systems (sometimes termed &lsquo;DC coupling&rsquo;)&rdquo;</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.5.2 — Power conversion equipment (PCE)"
            clause="The type and characteristics of PCE shall be selected to be suitable for the type of battery and its application, taking account of the battery manufacturer\'s instructions. NOTE 1: PCE for stationary battery installations may be incorporated into PCE for renewable generation, for example, solar PV system inverters (sometimes termed &lsquo;bidirectional&rsquo; or &lsquo;hybrid&rsquo; inverters). NOTE 2: PCE may be used to connect batteries to AC systems (sometimes termed &lsquo;AC coupling&rsquo;) or DC systems (sometimes termed &lsquo;DC coupling&rsquo;)."
            meaning="Reg 570.5.2 is the regulatory authority for hybrid inverter / coupling mode choice. NOTE 1 explicitly recognises hybrid inverters as a permitted topology; NOTE 2 explicitly recognises both AC-coupled and DC-coupled architectures. The reg requires that PCE selection match the battery + application + manufacturer instructions — this is the design discipline that drives brand / model choice. The cert evidence bundle records the PCE manufacturer / model / coupling mode and the rationale against battery type."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Reg 570.6.1.1.1 / .1.2 / .2.1 — BESS installation requirements</ContentEyebrow>

          <Pullquote>BS EN IEC 62485 conformance. Terminal V always present. DC earthing permitted with simple separation.</Pullquote>

          <ConceptBlock
            title="The three foundational BESS install regs"
            plainEnglish="Reg 570.6.1.1.1 mandates BS EN IEC 62485 conformance. Reg 570.6.1.1.2 declares battery terminal voltage always present. Reg 570.6.1.2.1 permits DC live-conductor earthing with simple separation. Together these set the safety + installation framework for BESS — independent of coupling mode."
            onSite="Module 5 (BESS) covers these regs and BS EN IEC 62485 in depth. For Module 4.4 the key insight: both AC-coupled and DC-coupled architectures must satisfy these regs at the BESS itself; the coupling mode determines HOW the BESS connects, not WHETHER these regs apply."
          >
            <p>The three regs and their practical implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 570.6.1.1.1</strong> — BS EN IEC 62485 series conformance; bidirectional protective devices where appropriate. Battery PCE OCPDs bidirectional (parallels Reg 712.533.101 for PV)</li>
              <li><strong className="text-white">Reg 570.6.1.1.2</strong> — battery terminal voltage shall be assumed always present. BESS DC isolator at battery terminals; safe maintenance per BS EN IEC 62485</li>
              <li><strong className="text-white">Reg 570.6.1.2.1</strong> — DC live-conductor earthing permitted with simple separation between AC and DC sides. Mirrors Reg 712.312.2 for PV. For DC-coupled hybrid: the shared DC bus (PV + BESS) earthing under this provision</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.1.1.1 — BS EN IEC 62485 conformance"
            clause="Stationary secondary battery installations shall conform to the relevant parts of the BS EN IEC 62485 series. Where appropriate, bidirectional protective devices shall be selected."
            meaning="Reg 570.6.1.1.1 mandates BS EN IEC 62485 series conformance — the multi-part standard for stationary battery safety (Module 5 covers in detail). Bidirectional protective devices: BESS current is bidirectional (charge ↔ discharge), so OCPDs at the BESS DC must operate in either direction — parallels Reg 712.533.101 (DC OCPDs bidirectional) for PV. Cert evidence bundle records the BS EN IEC 62485 part(s) applied + bidirectional device selection."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.1.2.1 — DC live-conductor earthing (BESS)"
            clause="Earthing of one of the live conductors of the DC side is permitted, if there is at least simple separation between the AC side and the DC side."
            meaning="Reg 570.6.1.2.1 mirrors Reg 712.312.2 for PV — both permit DC live-conductor earthing where simple separation between AC and DC sides exists. For AC-coupled BESS: the battery PCE provides the separation. For DC-coupled hybrid: the hybrid inverter provides the separation; the shared DC bus (PV + BESS) is the &ldquo;DC side&rdquo;. Cert evidence bundle records the earthing arrangement per source. Note: the corrosion-prevention notes (BS EN 13636, BS EN 15112) in Reg 712.312.2 apply analogously to BESS earthing."
          />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Reg 570.6.1.2.2 / 570.6.3 / 570.6.4 — single-point earthing, ventilation, fault current</ContentEyebrow>

          <Pullquote>Single-point earthing for TN-S/TT. Ventilate to BS EN IEC 62485. Fault current = battery + PCE.</Pullquote>

          <ConceptBlock
            title="Reg 570.6.1.2.2 — single-point earthing (BESS on TN-S / TT)"
            plainEnglish="Where the BESS DC side is earthed and the AC side is TN-S or TT, the earthing connection on the DC side shall be at a single point only — typically at the battery negative or at the PCE&rsquo;s DC midpoint. This prevents earth circulating currents and ensures the earth fault current path is well-defined. The single-point principle parallels normal TN-S consumer-unit practice on the AC side."
            onSite="Most UK domestic hybrid installs are on TN-C-S (PME) DNO supplies — the AC system is effectively TN-S at the property side of the consumer unit&rsquo;s neutral-earth link. For the BESS DC side: the manufacturer specifies the single earth point (most modern hybrid inverters internally bond DC midpoint to earth at one location). Installer&rsquo;s job: do NOT add additional DC-side earth connections in the field; follow the manufacturer&rsquo;s topology."
          >
            <p>Single-point earthing in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Why single-point</strong> — multiple earth connections on the DC side create parallel return paths; current splits between them; earth-fault sensing becomes unreliable; corrosion on long DC runs is amplified</li>
              <li><strong className="text-white">Where the point goes</strong> — the manufacturer specifies. Common: internal to the hybrid inverter (factory-bonded); at the battery PCE&rsquo;s DC- input; at the DC distribution combiner. The PEI design pack records the location</li>
              <li><strong className="text-white">TN-S derivation in UK domestic</strong> — DNO supply is TN-C-S; consumer unit has the N-E link; downstream is effectively TN-S. The BESS DC side is earthed once, at the manufacturer-specified point</li>
              <li><strong className="text-white">TT installs</strong> — own earth electrode; the BESS DC single point bonds to the install&rsquo;s earth bar / MET</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the DC earthing arrangement + the single-point location</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.1.2.2 — Single-point DC earthing"
            clause="Where earthing of the DC side is provided (per Regulation 570.6.1.2.1) AND the AC side is TN-S or TT, the earthing connection on the DC side shall be at a SINGLE point only. The location of the single earth point shall be specified by the BESS / PCE manufacturer."
            meaning="Reg 570.6.1.2.2 prevents circulating earth currents on the DC side of the BESS in TN-S / TT installs. The manufacturer specifies the location (internal to PCE typically). Installer follows the topology — does not field-add extra DC-side earth connections. Cert evidence bundle records the DC earthing arrangement + reference to manufacturer instructions."
          />

          <ConceptBlock
            title="Reg 570.6.3 — ventilation of stationary secondary batteries"
            plainEnglish="Stationary secondary batteries shall be ventilated in accordance with the BS EN IEC 62485 series to prevent dangerous accumulation of gases. The ventilation requirements depend on battery chemistry: vented lead-acid cells emit hydrogen during charging (significant ventilation); sealed VRLA / GEL batteries emit small amounts under normal use but more under abuse / failure; lithium-ion (LFP / NMC) cells emit no gas under normal operation but emit flammable / toxic gases during thermal runaway."
            onSite="UK 2025-2026: most domestic BESS is LFP (GivEnergy, Tesla, Sigenergy, Huawei LUNA all LFP) — ventilation requirements are modest under normal operation BUT must account for thermal-runaway scenarios. The installer follows the manufacturer&rsquo;s installation instructions for clearances, ventilation openings, fire detection. PAS 63100:2024 sets the UK domestic-specific requirements. Cert evidence bundle records the install location + ventilation provisions + cross-reference to the BS EN IEC 62485 series and PAS 63100."
          >
            <p>Reg 570.6.3 implementation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">BS EN IEC 62485-1</strong> — general safety requirements</li>
              <li><strong className="text-white">BS EN IEC 62485-2</strong> — stationary batteries (lead-acid + VRLA + NiCd specifics)</li>
              <li><strong className="text-white">BS EN IEC 62485-5</strong> — lithium-ion stationary batteries (the relevant standard for UK domestic LFP)</li>
              <li><strong className="text-white">PAS 63100:2024</strong> — UK domestic-specific install spec; covers placement, ventilation, fire safety, signage. Critical for UK installs</li>
              <li><strong className="text-white">Lithium-ion specifics</strong> — no gas under normal operation; thermal-runaway scenarios produce CO, HF, flammable hydrocarbons. PAS 63100 mandates clear escape routes, no installation in habitable spaces, minimum clearances from windows / doors</li>
              <li><strong className="text-white">Lead-acid / VRLA specifics</strong> — hydrogen emission during equalisation charges; ventilation calculation per BS EN IEC 62485-2 Annex A; explosion-proof fittings within hazardous zone</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records battery chemistry + install location + ventilation arrangement + PAS 63100 compliance + BS EN IEC 62485 series cross-references</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.3 — Ventilation"
            clause="Stationary secondary batteries shall be installed and ventilated in accordance with the BS EN IEC 62485 series of standards to prevent dangerous accumulation of gases. The location shall conform to the manufacturer&rsquo;s instructions and any applicable national specifications (e.g. PAS 63100:2024 for domestic installations in the United Kingdom)."
            meaning="Reg 570.6.3 cross-references BS EN IEC 62485 + PAS 63100 for the install + ventilation detail. UK domestic LFP BESS (GivEnergy, Tesla, etc.) follows PAS 63100:2024 — covers thermal-runaway-safety placement (no habitable spaces, clearances, escape routes, fire detection). Lead-acid is the historical standard and has explicit hydrogen-emission ventilation calculations. The competent installer records the chemistry + location + ventilation + compliance evidence in the cert bundle."
          />

          <ConceptBlock
            title="Reg 570.6.4 — fault current from battery AND PCE"
            plainEnglish="The fault current calculation for a BESS install must include contributions from BOTH the battery AND the PCE. The battery can deliver enormous short-circuit current for the brief time before fuses operate (kilo-amps from a 10 kWh domestic LFP pack); the PCE typically current-limits to ~1.1-1.5 times its rated current but contributes during faults. OCPD selection on the DC side must handle the battery&rsquo;s prospective short-circuit current; OCPD selection on the AC side must handle the PCE&rsquo;s fault contribution combined with the DNO&rsquo;s."
            onSite="Manufacturer datasheets specify both contributions: the battery&rsquo;s prospective DC short-circuit current (often in the 10-30 kA range for a multi-kWh LFP pack); the PCE&rsquo;s AC fault current capability. OCPD selection: DC side uses gPV-style fuses or DC-rated MCBs rated for the battery&rsquo;s I_SC; AC side uses standard AC OCPDs sized for combined DNO + PCE fault current. Cert evidence bundle records the analysis."
          >
            <p>Reg 570.6.4 analysis:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">DC side fault contribution from battery</strong> — multi-kAh LFP pack can deliver 10-30 kA prospective short-circuit current for milliseconds. DC OCPDs must be rated for this (typically NH-style DC fuses or specific DC-rated MCBs per BS EN 60898-2 / IEC 60898-3)</li>
              <li><strong className="text-white">AC side fault contribution from PCE</strong> — PCE current-limits at ~1.1-1.5 &times; I_n on its own; under fault with DNO present, combined contribution applies</li>
              <li><strong className="text-white">Bidirectional OCPDs (Reg 570.6.1.1.1 + 826.1.2.2)</strong> — every BESS OCPD must operate to trip on overcurrent regardless of current direction</li>
              <li><strong className="text-white">Selectivity / coordination</strong> — Reg 826.6 (Section 4.5) — fault current contributions combined across multiple sources analysed per operating mode</li>
              <li><strong className="text-white">Manufacturer datasheets</strong> — battery I_SC, PCE fault contribution. Required for the design pack analysis</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the fault current analysis + each OCPD selection + the coordination evidence</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.4 — Fault current"
            clause="The prospective fault current at every point in the BESS installation shall be determined taking account of contributions from BOTH the battery AND the power conversion equipment (PCE). Overcurrent protective devices shall be selected with the appropriate breaking capacity for the prospective fault current at their location, considering all relevant operating modes."
            meaning="Reg 570.6.4 makes explicit what experienced BESS installers know: the battery itself is a massive fault-current source on the DC side. A 10 kWh domestic LFP pack can deliver 10-30 kA prospective short-circuit current for the milliseconds before DC fuses operate. DC OCPDs must be selected for this; AC OCPDs must be selected for the combined DNO + PCE contribution. The competent installer&rsquo;s design pack records: battery I_SC (from manufacturer datasheet); PCE fault contribution; each OCPD selection with its breaking capacity vs the prospective fault. Cert evidence bundle records this."
          />

          <ContentEyebrow>UK 2025-2026 hybrid inverter / BESS brand landscape</ContentEyebrow>

          <Pullquote>GivEnergy + Solis + Sigenergy dominate UK new-build hybrid. Tesla + Enphase + SolarEdge dominate retrofit.</Pullquote>

          <ConceptBlock
            title="DC-coupled hybrid inverters (new-build dominant)"
            plainEnglish="Single hybrid inverter for new-build PV+BESS — handles PV MPPT, battery charging/discharging, AC inversion, EPS, monitoring. UK market 2025-2026 is dominated by a handful of brands with strong UK distribution and support."
            onSite="GivEnergy is the UK-designed/manufactured player; Solis (Ginlong) is the Chinese-OEM popular alternative; Sigenergy is the rising premium choice; Huawei / FoxESS / SolarEdge round out the mainstream. Cert evidence bundle records the brand + model + warranty + manufacturer compliance statements."
          >
            <p>UK 2025-2026 DC-coupled hybrid landscape:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">GivEnergy</strong> — UK-designed and -manufactured (Newark, England); Gen3 hybrid range (3-15 kW AC); LFP battery pairing; popular for UK new-build; strong app + integration ecosystem</li>
              <li><strong className="text-white">Solis (Ginlong)</strong> — Chinese OEM; Hybrid S6 range; widely used by UK installers; competitive pricing</li>
              <li><strong className="text-white">Sigenergy SigenStor</strong> — premium tier; modular design; LFP battery; strong telemetry; growing UK presence</li>
              <li><strong className="text-white">Huawei LUNA</strong> — established global brand; LUNA 2000 BESS + SUN2000 hybrid inverter; UK service network</li>
              <li><strong className="text-white">FoxESS Hybrid</strong> — value tier; LFP battery; popular among cost-conscious installers</li>
              <li><strong className="text-white">SolarEdge Energy Hub</strong> — optimiser-ecosystem hybrid; DC-coupled battery + optimisers + Energy Hub inverter; tight integration with existing SolarEdge installs</li>
              <li><strong className="text-white">Tesla Powerwall 3 (DC-coupled mode)</strong> — modern flagship; 11.5 kW continuous AC output; integrated MPPT; premium pricing</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="AC-coupled BESS (retrofit dominant)"
            plainEnglish="Separate battery PCE that bolts onto existing PV install\'s AC side. Used for retrofitting PV with BESS without replacing the existing inverter. Some products are AC-coupled by design (Tesla Powerwall 2, Enphase IQ Battery)."
            onSite="Retrofit scenario: existing 3-10 year old PV inverter stays in place; existing EREC / MCS / DNO paperwork unchanged; AC-coupled battery installs on the property\'s AC bus alongside the inverter. Install time short (1-2 days typical)."
          >
            <p>UK 2025-2026 AC-coupled BESS landscape:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Tesla Powerwall 2</strong> — AC-coupled-only (2016-2024); pairs with any existing PV inverter via Tesla Gateway 2; ~13.5 kWh usable per unit; mature product</li>
              <li><strong className="text-white">Tesla Powerwall 3</strong> — supports BOTH AC-coupled and DC-coupled modes (2024+); mode chosen at install; premium price</li>
              <li><strong className="text-white">Enphase IQ Battery</strong> — AC-coupled-only by ecosystem design (Enphase microinverter PV); pairs with IQ7/IQ8 microinverter installs; IQ Gateway orchestration</li>
              <li><strong className="text-white">GivEnergy AC battery</strong> — retrofit option from GivEnergy ecosystem; pairs with any existing PV inverter brand; uses GivEnergy app</li>
              <li><strong className="text-white">SolarEdge AC battery</strong> — retrofit option for SolarEdge HD-Wave / Energy Hub installs; AC-coupled when DC-coupled retrofit isn\'t feasible</li>
              <li><strong className="text-white">Sungrow / Sonnen / Senec</strong> — niche UK presence; specific feature sets (Sonnen virtual power plant participation, etc.)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>The retrofit vs new-build decision</ContentEyebrow>

          <Pullquote>New-build: DC-coupled hybrid. Retrofit: AC-coupled. Both authorised by Reg 570.5.2.</Pullquote>

          <ConceptBlock
            title="Decision framework"
            plainEnglish="The coupling mode choice is driven primarily by whether the install is new-build (PV + BESS together) or retrofit (BESS added to existing PV). New-build favours DC-coupled hybrid; retrofit favours AC-coupled. Some exceptions: customer brand preference (Tesla Powerwall, Enphase ecosystem); customer cost preference; specific efficiency requirements."
            onSite="The competent designer presents both options at survey, explains the trade-offs, and lets the customer decide. The honest survey covers: capital cost difference; round-trip efficiency difference; component count / failure risk; warranty and support. Cert evidence bundle records the chosen architecture and rationale."
          >
            <p>Decision factors and how they push the choice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">New-build vs retrofit</strong> — new-build → DC-coupled (modern default); retrofit → AC-coupled (preserve existing inverter)</li>
              <li><strong className="text-white">Brand ecosystem</strong> — existing Tesla Solar Roof → Powerwall (AC or DC depending on Powerwall version); existing Enphase → IQ Battery AC-coupled; existing SolarEdge → Energy Hub DC-coupled retrofit or AC battery</li>
              <li><strong className="text-white">Cycle frequency</strong> — high-cycling (commercial, grid-services, EV+PV+BESS) → DC-coupled efficiency advantage matters; low-cycling (residential daily) → smaller absolute difference</li>
              <li><strong className="text-white">Capital cost</strong> — DC-coupled hybrid + matched LFP typically ~£1,000-£2,000 less than AC-coupled retrofit with same kWh capacity</li>
              <li><strong className="text-white">Install time</strong> — retrofit AC-coupled: 1-2 days; new-build DC-coupled: 3-5 days (PV + BESS together)</li>
              <li><strong className="text-white">Failure isolation</strong> — AC-coupled: PV survives battery PCE failure; DC-coupled: hybrid inverter failure takes both offline. Warranty + service contract mitigates</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="New-build customer: 6 kWp PV + 10 kWh BESS together"
            situation="UK customer wants new install: south-facing 6 kWp PV + 10 kWh BESS + future EV charging compatibility. Budget reasonable but cost-conscious. Customer wants single warranty / single app for the whole system."
            whatToDo="Recommend DC-coupled hybrid: GivEnergy Gen3 5 kW hybrid inverter + GivEnergy 9.5 kWh LFP battery + future-EV-ready Zappi charger. Cost: ~£14,000-£17,000 installed (PV + BESS + inverter + scaffold + electrics + MCS). Round-trip efficiency ~89-91%. Single GivEnergy app for monitoring + control. EREC G98 (5 kW inverter fits the threshold) — fit-and-notify. Reg 570.5.2 NOTE 1: hybrid inverter explicitly authorised. Cert evidence bundle: MCS MIS 3002 + Chapter 57 + Chapter 82 PEI design (Section 4.5). The cleanest UK new-build hybrid pattern in 2025-2026."
            whyItMatters="DC-coupled hybrid is the modern UK default for a reason — best round-trip efficiency, lowest component count, single integration point. GivEnergy specifically because UK-designed/manufactured, strong UK service network, dominant market share. The competent surveyor presents this as the recommendation with the rationale; customer makes the informed call. Cert evidence bundle records the decision."
          />

          <Scenario
            title="Retrofit customer: 4-year-old 4 kWp PV (Solis), wants 10 kWh BESS"
            situation="Customer has 4 kWp PV install commissioned 4 years ago with a Solis Mini 4G inverter. Wants to add 10 kWh BESS for evening consumption and grid-outage backup. Doesn\'t want to replace the existing inverter or disturb the EREC / MCS / SEG registration."
            whatToDo="Recommend AC-coupled retrofit: GivEnergy AC battery (5 kW AC PCE + 10 kWh LFP modules) installed alongside the existing Solis inverter. Cost: ~£8,000-£11,000 installed. Round-trip efficiency ~84%. Install time: 1-2 days. Existing Solis inverter keeps its EREC G98 / MCS / SEG registration; the AC battery is registered separately under EREC (likely G99 due to combined output > 16 A single-phase, or G100 export-limited to stay under G98). Reg 570.5.2 NOTE 2 explicitly authorises AC coupling. Chapter 82 PEI design applies (Section 4.5). Cert evidence bundle: BESS-specific MCS / Chapter 57 / Chapter 82 design pack alongside the existing PV bundle."
            whyItMatters="Retrofit BESS is the dominant UK growth path 2025-2026 — millions of existing PV installs without battery. The competent surveyor preserves the customer\'s existing investment (no PV inverter replacement) and adds the BESS at the AC bus. The ~5-7 percentage point efficiency penalty is the cost of retrofit flexibility; for residential daily cycling (~£42/year worse vs DC-coupled), it\'s a fair trade-off. Cert evidence bundle records the AC-coupled retrofit rationale."
          />

          <CommonMistake
            title="Specifying DC-coupled retrofit when the existing PV inverter doesn\'t support it"
            whatHappens="An installer proposes DC-coupled retrofit for a customer with existing Solis Mini 4G PV. The Solis Mini 4G is NOT a hybrid inverter and can\'t accept a battery on its DC side. The retrofit would require: full Solis inverter replacement (new hybrid model) OR keep existing inverter + add new DC-side hybrid inverter (double inverter, complex AC-coupling architecture). Customer doesn\'t understand why the &ldquo;DC-coupled&rdquo; option costs £3,000 more than promised."
            doInstead="DC-coupled retrofit is only feasible when the existing PV inverter is already a hybrid OR an upgrade-compatible model (SolarEdge HD-Wave + Energy Hub upgrade, Powerwall 3 replaces existing inverter). For most existing UK PV (Solis non-hybrid, SMA, Fronius older models, Sungrow non-hybrid), retrofit means AC-coupled — the existing inverter stays and an AC-coupled battery adds. The competent survey checks the existing inverter\'s hybrid capability before proposing DC-coupled retrofit."
          />

          <CommonMistake
            title="Treating Chapter 82 PEI as optional for hybrid PV+BESS installs"
            whatHappens="An installer completes a hybrid PV+BESS install with MCS MIS 3002 design pack + Chapter 57 BESS design but no Chapter 82 PEI design. The install is a prosumer install (consumes + generates + stores) — Chapter 82 applies per Reg 826.1. MCS audit flags the missing PEI design records; rectification requires retrospective PEI design pack production (covering operating modes, multi-source isolation, bidirectional OCPDs)."
            doInstead="Chapter 82 PEI design discipline applies to every hybrid PV+BESS install regardless of coupling mode. Produce the PEI design pack at the survey-to-design stage; include Reg 826.1.1.1-826.1.4 content (operating modes per Reg 824.2; multi-source isolation per Reg 826.1.1.4; bidirectional OCPDs per Reg 826.1.2.2; transient overvoltage protection per Reg 826.1.4). Section 4.5 covers Chapter 82 PEI in depth. Cert evidence bundle: MCS MIS 3002 + Chapter 57 BESS + Chapter 82 PEI together form the full hybrid install evidence."
          />

          <CommonMistake
            title="Quoting AC-coupled retrofit cost without including the second EREC / DNO registration"
            whatHappens="An installer quotes an AC-coupled retrofit at &ldquo;just the battery cost&rdquo; — forgetting that the additional battery PCE means the combined AC output now exceeds the original EREC G98 threshold. Either: (a) re-register under EREC G99 (apply-and-wait, 4-8 week delay); (b) implement EREC G100 export limitation. Customer surprised by the additional process / time / cost. Some installers also forget the Chapter 82 PEI design pack."
            doInstead="Retrofit BESS adds AC output capacity to the existing install. Check combined AC output vs EREC G98 threshold (16 A single-phase, ~3.68 kW). If combined exceeds: (a) plan EREC G99 application timing into the install schedule (4-8 weeks); OR (b) implement EREC G100 export limitation at the BESS PCE. The competent quote includes the registration path. Cert evidence bundle: original PV EREC paperwork + BESS EREC paperwork + combined export-limitation evidence."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'AC-coupled hybrid: PV via PV inverter → AC bus → battery inverter ↔ DC battery. Two conversion stages between PV and battery. DC-coupled hybrid: PV array directly to hybrid inverter that manages PV MPPT + BESS + AC inversion in one unit. Single conversion stage.',
              'Round-trip efficiency: DC-coupled ~89-91%; AC-coupled ~84%. ~5-7 percentage point penalty for AC-coupled. Material for high-cycling commercial; smaller absolute impact for low-cycling residential.',
              'Reg 570.5.2 (Chapter 57, NEW A4:2026): PCE selection per battery type, application, manufacturer instructions. NOTE 1 explicitly recognises hybrid inverters; NOTE 2 explicitly recognises AC coupling and DC coupling.',
              'Reg 570.6.1.1.1: BS EN IEC 62485 series conformance + bidirectional protective devices. Reg 570.6.1.1.2: BESS terminal voltage always present. Reg 570.6.1.2.1: DC live-conductor earthing permitted with simple separation. Reg 570.6.1.2.2: single-point earthing when DC is earthed and AC is TN-S / TT — manufacturer specifies the point.',
              'Reg 570.6.3: ventilation per BS EN IEC 62485 series + PAS 63100:2024 for UK domestic. UK LFP installs handle thermal-runaway scenarios (placement, clearances, escape routes); lead-acid handles hydrogen emission. Reg 570.6.4: fault current = battery + PCE — DC OCPDs sized for the battery&rsquo;s prospective I_SC (10-30 kA for multi-kWh LFP); AC OCPDs sized for DNO + PCE combined.',
              'UK 2025-2026 DC-coupled hybrid (new-build): GivEnergy Gen3 (UK-designed/manufactured), Solis Hybrid, Sigenergy SigenStor, Huawei LUNA, FoxESS, SolarEdge Energy Hub, Tesla Powerwall 3 DC mode.',
              'UK 2025-2026 AC-coupled (retrofit): Tesla Powerwall 2/3 AC mode, Enphase IQ Battery (microinverter ecosystem), GivEnergy AC, SolarEdge AC, Sungrow / Sonnen / Senec niches.',
              'Decision rule: New-build PV+BESS → DC-coupled hybrid (modern default). Retrofit to existing PV → AC-coupled (preserve existing inverter + EREC / MCS / SEG paperwork). Chapter 82 PEI design applies to BOTH (Section 4.5).',
              'Retrofit BESS adds AC output capacity — check combined output vs EREC G98 threshold; plan EREC G99 application or EREC G100 export limitation. Cert evidence bundle: original PV EREC + new BESS EREC + combined registration evidence.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Generator backup
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 Chapter 82 — Prosumer\'s Electrical Installations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
