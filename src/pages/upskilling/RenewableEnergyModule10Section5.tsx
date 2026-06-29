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
import { V2gFlow } from '@/components/study-centre/diagrams/renewableGapSvg';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm10s5-v2g-definition',
    question:
      'What does V2G (Vehicle-to-Grid) mean + how does it differ from V2H + V2L?',
    options: [
      'V2G exports to the grid; V2H powers the home with no export; V2L powers a load from a vehicle socket',
      'They are three marketing names for the same export-to-grid function',
      'They describe three different EV battery chemistries rather than power-flow modes',
      'They all require the same unidirectional charger and differ only in software',
    ],
    correctIndex: 0,
    explanation:
      'The bidirectional EV charging landscape distinguishes three modes: (1) V2G — EV battery exports back to the public DNO grid through a bidirectional charger; subject to BS 7671 Section 722 + Chapter 82 PEI + EREC G99 / G100 + commercial grid-services / SEG arrangements. The customer earns revenue (typical UK 2025-26 trial £300-700/year). (2) V2H — EV battery powers the home during a power cut (island mode) or during peak tariff windows (consumption mode); no export to grid. Subject to BS 7671 Chapter 82 island-mode requirements (Reg 826.1.1.2.2 N-E switching, Reg 826.1.1.5 island-mode switching device); EV becomes equivalent to a BESS in island mode. (3) V2L — the EV provides AC power output from a socket built into the vehicle (Hyundai IONIQ 5, Kia EV6, MG4, BYD models). Customer plugs a kettle / power tool directly into the EV. Not a charger function; no BS 7671 install scope. UK 2025-26 V2L deployment growing rapidly (most new EVs include it); V2G still limited (Wallbox Quasar, dnata DC, V2X.energy units — expensive specialist hardware); V2H limited but emerging.',
  },
  {
    id: 'm10s5-uk-hardware',
    question:
      'What V2G hardware is actually deployed in UK 2025-26?',
    options: [
      'Widespread already — most domestic EV installs are bidirectional and earn grid revenue today',
      'A single DNO-mandated CCS unit is the only legal V2G charger, fitted at every export site',
      'Limited but growing: Quasar 1 (CHAdeMO) led; CCS emerging at £7-15k; OEM warranty limits remain',
      'Fully mainstream — every new EV ships with a V2G charger fitted as standard equipment',
    ],
    correctIndex: 2,
    explanation:
      'UK 2025-26 V2G hardware reality: (1) Wallbox Quasar 1 — 7.4 kW CHAdeMO bidirectional. The original residential V2G unit. Used in Octopus Power Pack trial (£400-600/year customer revenue 2020-2023). Limitation: CHAdeMO port — only Nissan LEAF + ageing Mitsubishi Outlander PHEV. CHAdeMO fleet ageing as new EVs default to CCS. (2) Quasar 2 — announced CCS-capable bidirectional residential charger; UK 2025-26 deployment limited; £7,000-10,000 unit cost. (3) dnata DC bidirectional — commercial-grade DC bidirectional unit; fleet-focused; UK 2025-26 pilot deployments. (4) V2X.energy / EVgo / others — commercial fleet DC bidirectional units; not residential. (5) ISO 15118-20 + OCPP 2.0.1 Smart Charging Profile + V2G Plug-and-Charge — protocol stack maturing 2024-2025; vehicle + charger + backend ecosystem alignment progressing. (6) OEM warranty constraints — most automakers do NOT warrant high-voltage batteries for V2G cycles. Nissan (LEAF), Hyundai, Kia, Polestar are early adopters with V2G-friendly warranties. VW Group, Tesla, BMW remain V2G-warranty-restrictive in UK 2025-26. (7) Comparison: V2L mainstream (50+ EV models in UK 2025-26 ship with V2L sockets); V2H emerging (Ford F-150 Lightning + Charge Station Pro in US; UK limited); V2G limited residential, growing commercial fleet.',
  },
  {
    id: 'm10s5-bs7671-scope',
    question:
      'What BS 7671 sections cover a V2G install?',
    options: [
      'Only Section 712, treating the V2G charger as a solar PV string on the DC side',
      'Section 722 alone — a V2G charger is just an EV charging point with no generating-set rules',
      'Section 551 only, since the discharging EV is purely a generating set and not an EV charger',
      'Section 722 plus Section 551 (EV as generating set) and Chapter 82, with EREC G99/G100',
    ],
    correctIndex: 3,
    explanation:
      'V2G integration brings BS 7671 layers together: (1) Section 722 EV charging install — the existing requirements for EV charging point: Reg 722.411 (TT or TN earthing arrangements, PME considerations for residential), Reg 722.531.3 (RCD type — Type B for DC fault current capability, OR Type A + DD prevention), Reg 722.511 (BS EN 61851 standard for charger), Reg 722.55.101.0.201 (vehicle inlet standards — BS EN 62196 Type 2 for AC, CCS Type 2 + CHAdeMO for DC fast). (2) Section 551 generating set — V2G EV in discharge mode IS a generating set per Reg 551.1.1 categories (battery + power conversion). Reg 551.7.5 anti-islanding required — EV stops discharging to a dead grid. Reg 551.7.2.1 supply-side connection of the V2G charger (the EV connects through its V2G charger as a generating set). Reg 551.4.2 RCD effectiveness across source combinations. (3) Chapter 82 PEI — V2G adds another source to the multi-source PEI: Reg 826.1.1.1 protection in all modes (now PV + BESS + V2G + DNO combinations); Reg 826.1.1.4 multi-source isolation (V2G charger isolator added to switch count + warning notice update); Reg 826.1.2.1 overcurrent across configurations (V2G discharge contributes to fault current at MET). (4) EREC G99 — V2G charger is an additional generating set; G99 amendment required. (5) EREC G100 — if site has export limit, V2G discharge counts; ELS curtailment hierarchy now includes V2G. (6) Cert evidence: integrated PEI EIC + Section 722 + Section 551 + Chapter 82 + V2G charger DoC + G99 amendment + G100 recommissioning if applicable.',
  },
  {
    id: 'm10s5-economic-case',
    question:
      'What’s the UK 2025-26 economic case for residential V2G?',
    options: [
      'Trials paid ~£300-1,000/year against a £5-9k hardware uplift — viable for early adopters only',
      'Revenue is strong enough that the £5,000-9,000 hardware uplift always pays back inside two years',
      'It is always loss-making because no UK tariff pays for exported vehicle energy at any point',
      'Returns depend only on mileage driven, so the charger hardware cost has no bearing on payback',
    ],
    correctIndex: 0,
    explanation:
      'V2G residential economic landscape UK 2025-26: (1) Octopus Power Pack (original 2020-2023) — Wallbox Quasar + Nissan LEAF customers received £300-450/year for grid-services participation (vehicle made available during DNO / National Grid demand-response events). Trial closed; commercial successor in development. (2) Octopus Intelligent Octopus Go + dynamic tariff arbitrage — not strictly V2G grid-services revenue but customer captures cheap-rate charging + (when V2G hardware allows) discharge during peak tariff window. (3) Tesla Energy Plan + Powerwall + (future V2G) — emerging at scale. (4) Hardware cost: V2G charger £7,000-15,000 vs unidirectional £700-1,500 — £5,000-9,000 uplift. (5) Battery degradation cost — each kWh discharged + recharged adds wear. Modern lithium batteries rated 3,000-5,000 cycles; V2G annual cycling adds 100-300 cycles to the vehicle’s baseline (driving) cycles. OEM warranty exclusion makes this a real customer risk. (6) Total economic case: only viable if customer’s vehicle + charger are V2G-compatible AND OEM warrants AND a paying grid-services tariff is active. UK 2025-26 reality: tens of thousands of trial users not millions; commercial roll-out still ramping; price-friendly hardware emerging. The honest customer conversation: ‘V2G is real, with limited hardware + OEM support; if you have a Nissan LEAF or compatible Hyundai/Kia + Octopus tariff, worth exploring; otherwise wait 2-3 years’.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer asks: "I have a Tesla Model Y. Can I do V2G with my existing Tesla Wall Connector?"',
    options: [
      'No — neither the Model Y nor the Wall Connector is V2G-capable in UK 2025-26',
      'Yes — any Tesla discharges to the grid through a standard Wall Connector once enabled in the app',
      'Yes, provided the customer is on a time-of-use tariff; the hardware itself is irrelevant',
      'Yes, but only the home is powered (V2H); the Wall Connector cannot export to the grid',
    ],
    correctAnswer: 0,
    explanation:
      'Tesla V2G status UK 2025-26: (1) Tesla vehicles — Model 3 / Y / S / X / Cybertruck — hardware capable of bidirectional charging at the battery level but Tesla has not enabled it via firmware in customer-shipping vehicles. Multiple announcements (2022, 2023, 2024) about ‘coming bidirectional support’; UK 2025-26 status: not deployed. (2) Tesla Wall Connector — unidirectional AC charger, no V2G hardware. (3) Tesla’s strategy — they sell Powerwall as the residential storage solution; have less commercial incentive to enable vehicle-to-grid. May change with Tesla Energy Plan evolution. (4) UK 2025-26 V2G-compatible vehicles — Nissan LEAF (CHAdeMO, the original V2G car); Mitsubishi Outlander PHEV (CHAdeMO, ageing); Hyundai IONIQ 5 / 6, Kia EV6 / EV9 (CCS bidirectional ready, OEM-enabled at firmware level in some markets), Polestar (announced); Volvo (announced 2024-2025). Coverage growing but limited 2025-26. (5) Customer honest answer: V2G requires V2G hardware on BOTH sides — vehicle + charger — AND OEM enables it AND a supporting tariff. Tesla customer cannot V2G with their current setup; could buy a separate Nissan LEAF + Wallbox Quasar + Octopus for V2G; or wait for Tesla’s eventual support.',
  },
  {
    question:
      'For a V2G install on a PV + BESS site, what does Chapter 82 Reg 826.1.1.4 require that wasn’t there before V2G?',
    options: [
      'Nothing — the existing PV and BESS isolators already cover the V2G charger as a load',
      'The DNO main switch alone now isolates everything, so the per-source switches can be removed',
      'V2G adds a generating source, so its isolator joins the list, the warning notice is updated, and protection and overcurrent are re-checked',
      'Only the warning notice wording changes; no extra isolator or overcurrent re-check is needed',
    ],
    correctAnswer: 2,
    explanation:
      'V2G transforms the EV from a LOAD into an additional GENERATING SOURCE in the PEI. Chapter 82 implications: (1) Reg 826.1.1.4 multi-source isolation — V2G charger becomes another isolation point. Previous: DNO + PV + BESS = 3 main switches + warning notice. With V2G added: 4 main switches + updated warning notice listing the V2G charger as an additional source. Isolation procedure document updated. (2) Reg 826.1.1.1 protection in all modes — protective design verified for: DNO+PV+BESS+V2G, DNO+PV+BESS, DNO+PV+V2G, DNO+V2G alone, BESS+V2G island (if island-capable), etc. Permutations multiply. (3) Reg 826.1.2.1 overcurrent at every PEI point for every configuration — V2G discharge contributes to fault current at the MET busbar. Worst-case PSCC at main consumer unit recalculated to include V2G contribution (typically ≈1.1× V2G rated current). (4) Reg 826.1.2.2 direction + polarity — V2G adds bidirectional flow through the EV charging circuit; protective devices considered for both directions. (5) Reg 551.7.5 anti-islanding — V2G charger must include LoM detection + disconnect on grid loss. (6) Reg 551.4.2 RCD effectiveness across source combinations — the V2G + PV + BESS + DNO permutations must each maintain RCD effectiveness. (7) EREC G99 amendment required for new generating source. (8) G100 recommissioning if site has export limit. (9) Cert evidence: integrated PEI EIC updated to include V2G + Section 722 + Section 551 anchors + Chapter 82 multi-source updates + G99 amendment + G100 recommissioning if applicable.',
  },
  {
    question:
      'What is ISO 15118-20 and why does it matter for V2G?',
    options: [
      'The BS 7671 regulation number governing EV charging-point RCD selection and earthing',
      'The EV-charger communication standard that adds Plug-and-Charge and bidirectional V2G negotiation, working with an OCPP 2.0.1 backend',
      'The ENA engineering recommendation that replaces G99 for all V2G grid connections',
      'An older, withdrawn protocol superseded for every charging mode by ISO 15118-2',
    ],
    correctAnswer: 1,
    explanation:
      'ISO 15118 family covers EV-charger high-level communication: (1) ISO 15118-2 (2014) — the original "Plug-and-Charge" standard. EV ↔ charger TLS-secured PLC over CCS data channel. Authentication + charge session control. Used for AC + DC unidirectional charging. (2) ISO 15118-20 (2022) — the major revision adding: bidirectional power transfer (V2G) protocol; expanded smart charging; better security; AC + DC wireless. THIS is the V2G enabling standard. (3) OCPP 2.0.1 + ISO 15118-20 integration — OCPP carries V2G session info to the backend (CPO / EMS / billing); ISO 15118-20 handles the EV-charger negotiation. Together: a Tesla / Hyundai / Polestar customer plugs in, vehicle + charger authenticate via PnC, EV battery state communicated, V2G session negotiated based on tariff signal from OCPP backend, bidirectional flow begins. (4) UK 2025-26 deployment — ISO 15118-2 widespread for unidirectional Plug-and-Charge (Electroverse, BP Pulse, IONITY, Tesla Supercharger v3+); ISO 15118-20 emerging but limited vehicle + charger support. Wallbox Quasar 2 + emerging CCS V2G chargers implement it. Vehicle support: Hyundai / Kia first; broader OEM adoption 2025-2027. (5) Why it matters for installer — future-proofing: V2G-ready charger should support ISO 15118-20; backend (CPO / EMS) should support OCPP 2.0.1 + ISO 15118 PnC. Cert evidence: charger product DoC noting protocol versions + commissioning record of backend / vehicle compatibility.',
  },
  {
    question:
      'Why does V2G require a special Type B RCD on the supply circuit?',
    options: [
      'The bidirectional electronics can produce smooth DC fault current that Type B detects, unless an integrated RDC-DD allows a Type A instead (Reg 722.531.3)',
      'No special RCD applies — a standard 30 mA Type A covers every EV charging circuit including bidirectional ones',
      'The RCD type is set by the supply cable size, so a larger cable removes the Type B requirement entirely',
      'A Type AC RCD is correct for V2G because the charger only ever passes alternating current to the grid',
    ],
    correctAnswer: 0,
    explanation:
      'V2G RCD selection follows the same principle as DC EV charging + BESS: (1) Smooth DC fault current capability — V2G charger contains a bidirectional inverter with smooth DC at the EV battery side. A residual fault current at this interface could include smooth DC components that saturate Type A RCDs (which only detect AC + pulsating DC). Type B RCDs detect smooth DC up to specified levels. (2) Reg 722.531.3 — EV charging point shall be protected by an RCD of: (a) Type B, or (b) Type A or F where additional means are provided to prevent DC fault current from exceeding 6 mA (RDC-DD = residual direct current detection device). (3) Modern V2G chargers — Wallbox Quasar + Quasar 2 + emerging CCS V2G — include INTEGRATED RDC-DD (or Type B equivalent inside the unit). Manufacturer DoC declares compliance with BS EN 61851-1 + the RCD type requirement. Where integrated RDC-DD is declared, external supply-side RCD can be Type A (Reg 722.531.3(b) exemption). Where NOT declared, external must be Type B. (4) Reg 551.4.2 RCD effectiveness in multi-source context — V2G as a source must not compromise the RCD architecture; verified at commissioning across source combinations. (5) Cert evidence: V2G charger DoC + RCD type declaration + supply-side RCD specification + commissioning test. UK 2025-26 typical: Type B 30 mA RCBO on the V2G supply circuit OR Type A + manufacturer integrated RDC-DD declaration.',
  },
  {
    question:
      'A V2G install adds a 7 kW bidirectional charger to an existing PV + BESS PEI. The site already has G100 export limit at 3.68 kW. What changes?',
    options: [
      'Nothing changes — the existing G100 ELS already curtails any source it can see',
      'The G100 export limit is lifted automatically because V2G adds demand-side flexibility',
      'The G100 ELS is recommissioned to add V2G as a curtailable source, with new comms, DNO re-acceptance and a fresh certificate',
      'Only the BESS curtailment priority changes; V2G sits outside the ELS hierarchy entirely',
    ],
    correctAnswer: 2,
    explanation:
      'Adding V2G to a G100-limited site triggers full G100 recommissioning: (1) ELS curtailment hierarchy update — the ELS must include V2G in its curtailment priority order. Typical priority: V2G discharge first (most discretionary — customer benefits but doesn’t lose forever-PV-generation), BESS discharge second, PV third. Customer-configurable but conservative defaults common. (2) ELS ↔ V2G communication — ELS controller communicates with V2G charger via OCPP 1.6 Smart Charging Profile or OCPP 2.0.1 (preferred) or proprietary protocol. Curtailment command: ‘reduce discharge power to X kW’ or ‘stop discharge’. (3) Commissioning test — deliberately drive over-generation with V2G + PV + BESS all discharging at peak; verify ELS triggers V2G curtailment first within ENA response time. Second test: V2G alone driving over-export verified. (4) DNO process — customer / installer notifies DNO of V2G addition (G99 amendment); DNO updates connection agreement; customer + DNO confirm G100 limit unchanged (or renegotiate); G100 recommissioning cert filed. (5) EMS coordination — customer’s EMS (vendor or third-party) reads G100 limit + plans V2G + BESS + PV scheduling to minimise curtailment. (6) Cert evidence bundle update: integrated PEI EIC + Section 722 + Section 551 + Chapter 82 + EMS architecture update + G99 amendment + new G100 commissioning cert + EREC correspondence trail.',
  },
  {
    question:
      'In a V2H scenario (no grid export, EV powers home during DNO outage), what additional BS 7671 considerations apply vs grid-following V2G?',
    options: [
      'It is identical to grid-following V2G; anti-islanding alone covers the home-backup case',
      'V2H sits outside Chapter 82 because no energy is exported to the public grid',
      'V2H only needs a manual changeover switch; no N-E switching or grid-forming capability applies',
      'V2H is island mode, so Reg 826.1.1.2.2 N-E switching and grid-forming hardware are required',
    ],
    correctAnswer: 3,
    explanation:
      'V2G vs V2H operational + regulatory distinction: (1) V2G — EV discharges to the live grid in parallel with DNO. Grid-following bidirectional charger. Reg 551.7.5 anti-islanding ensures EV stops discharging if DNO supply lost. Standard chapter 82 PEI direct-feeding mode. (2) V2H — EV discharges to the home in island mode (DNO disconnected). Grid-forming bidirectional charger required (or grid-forming BESS inverter handles island, V2G adds to it). Reg 826.1.1.2.2 N-E switching: when DNO is lost + V2H activates, all DNO live conductors disconnect + local N-E bond establishes (non-overlap). Reg 826.1.1.5 island-mode switching device. The V2G charger must coordinate with the backup gateway: gateway opens DNO contactors + establishes island; V2G charger transitions to grid-forming mode OR follows the BESS grid-forming inverter. (3) UK 2025-26 hardware reality — most V2G chargers are grid-following only (Wallbox Quasar 1). True V2H + V2G dual-mode requires more complex hardware + integration with site backup gateway; very limited residential deployment 2025-26. Ford F-150 Lightning + Charge Station Pro is a US example. Quasar 2 + emerging CCS V2G chargers add V2H capability progressively. (4) V2L vs V2H — V2L (Vehicle-to-Load, e.g. plug a kettle directly into Hyundai IONIQ 5) is NOT V2H — no install scope; vehicle’s onboard inverter feeds a socket on the car. Useful for camping / power tools but not whole-home backup. (5) Cert evidence: V2H install includes Reg 826.1.1.2.2 N-E switching test + Reg 826.1.1.5 island-mode switching verification + V2G charger DoC for island-capable operation.',
  },
];

const faqs = [
  {
    question: 'When will V2G become mainstream in UK?',
    answer:
      'Honest assessment 2025-26: 5-7 years before V2G is mainstream residential. Barriers being resolved: (1) OEM warranty support — progressing as Nissan / Hyundai / Kia / Polestar / Volvo enable; VW + Tesla + BMW still restrictive; (2) Hardware cost — £7,000-15,000 V2G charger vs £700-1,500 unidirectional, gap closing slowly; (3) Protocol stack — ISO 15118-20 + OCPP 2.0.1 emerging; ecosystem alignment progressing 2024-2027; (4) Commercial tariffs — Octopus Power Pack successor + similar schemes growing; (5) BS 7671 Chapter 82 + Section 722 framework already in place. By 2030: expect 5-10% of UK residential EV chargers to be V2G-capable; by 2035: closer to mainstream.',
  },
  {
    question: 'Can the customer’s existing unidirectional Zappi / Easee / Wallbox be upgraded to V2G?',
    answer:
      'No. V2G requires fundamentally different hardware — bidirectional power electronics, inverter capable of both AC ↔ DC directions, ISO 15118-20 protocol support, additional safety + grid-services hardware. A unidirectional charger cannot be firmware-upgraded to V2G. Customer wanting V2G must replace the charger entirely with a V2G-capable unit (Wallbox Quasar 1 CHAdeMO or Quasar 2 CCS or specialist DC bidirectional). Cost £7,000-15,000 vs disposal of existing unit.',
  },
  {
    question: 'Does V2G interact with vehicle warranty?',
    answer:
      'Yes, significantly. Most automotive OEMs warranty high-voltage batteries based on cycle count + age; V2G adds discharge / recharge cycles beyond normal driving. Nissan (LEAF), Hyundai, Kia, Polestar, Volvo have V2G-friendly warranty policies as of 2025-26 (verify current). VW Group (ID.3 / ID.4 / Audi e-tron), BMW, Mercedes, Tesla, Toyota, Ford UK: V2G typically voids battery warranty or significantly reduces it. Customer must verify warranty status with their OEM BEFORE buying V2G hardware + signing tariff contract. Cert evidence + customer handover acknowledges warranty implication.',
  },
  {
    question: 'How does V2G interact with the customer’s Octopus tariff?',
    answer:
      'Octopus Intelligent Octopus Go / Octopus Energy Plan / future Power Pack successor: provides the cheap-rate charging window + (with V2G hardware) the peak-discharge revenue mechanism. Customer signs Octopus contract — vehicle + charger registered — Octopus has scheduling rights during DNO / National Grid demand-response events. Customer typically gets £300-700/year for grid-services participation + cheap-rate charging savings. Without a supporting tariff, V2G hardware sits idle for revenue purposes; only V2H (powering the home, not exporting) provides ongoing value.',
  },
  {
    question: 'Is V2G safe for the vehicle battery long-term?',
    answer:
      'Open question with cautious optimism. Modern lithium-ion batteries rated 3,000-5,000 cycles to 80% state-of-health. Driving cycles per year typical: 100-200 (full battery cycles). V2G adds 100-300 additional cycles/year if used intensively. Theoretical 5-10 year battery life impact: 5-15% reduced capacity at end of life vs no-V2G. Real-world data from Nissan LEAF + Octopus Power Pack trial 2020-2023 was reassuring but limited. OEM positions vary: Nissan publishes V2G-supportive guidance; Tesla restrictive; others variable. Honest customer answer: ‘expect some additional battery degradation; magnitude debatable; verify warranty position with OEM’.',
  },
];

export default function RenewableEnergyModule10Section5() {
  const navigate = useNavigate();

  useSEO({
    title: 'V2G — Vehicle-to-Grid bidirectional EV charging | Renewable Energy 10.5 | Elec-Mate',
    description:
      'V2G (Vehicle-to-Grid) + V2H + V2L — bidirectional EV charging integration in UK 2025-26 PEI. BS 7671 Section 722 + Section 551 + Chapter 82. Wallbox Quasar 1 (CHAdeMO) + Quasar 2 (CCS) hardware. ISO 15118-20 + OCPP 2.0.1 protocols. OEM warranty constraints (Nissan / Hyundai / Kia friendly; Tesla / VW restrictive). Octopus Power Pack economics.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-10')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 10
          </button>

          <PageHero
            eyebrow="Module 10 · Section 5 · BS 7671:2018+A4:2026 · Section 722 + 551 + Chapter 82"
            title="V2G — Vehicle-to-Grid bidirectional charging"
            description="V2G (Vehicle-to-Grid), V2H (Vehicle-to-Home), V2L (Vehicle-to-Load). Bidirectional EV charging integration with the UK 2025-26 PEI. The EV battery becomes another generating source under Section 551 + Chapter 82. UK 2025-26 reality: Wallbox Quasar 1 (CHAdeMO) + emerging Quasar 2 (CCS), Octopus Power Pack successor schemes, ISO 15118-20 + OCPP 2.0.1 maturing, OEM warranty constraints significant. Not mainstream yet — limited but growing."
            tone="yellow"
          />

          <TLDR
            points={[
              'V2G = bidirectional EV charging where the vehicle battery exports to the public grid; V2H = EV powers home in island mode (no grid export); V2L = EV provides AC power output from a socket built into the vehicle.',
              'BS 7671 framework: Section 722 EV charging install + Section 551 generating set (EV in discharge mode) + Chapter 82 PEI (multi-source) + EREC G99 amendment + G100 if export-limited.',
              'UK 2025-26 hardware: Wallbox Quasar 1 (7.4 kW CHAdeMO bidirectional, Nissan LEAF compatible); Quasar 2 (CCS announced, deployment limited); dnata DC + V2X.energy for commercial fleet. Hardware cost £7k-15k vs £700-1.5k for unidirectional.',
              'OEM warranty constraints significant: Nissan / Hyundai / Kia / Polestar / Volvo V2G-friendly; VW Group / Tesla / BMW / Mercedes restrictive in UK 2025-26. Customer must verify before investing.',
              'Reg 722.531.3 RCD: V2G charger contains smooth-DC bidirectional electronics; Type B RCD OR Type A + manufacturer integrated RDC-DD per BS EN 61851-1.',
              'Reg 826.1.1.4 multi-source isolation update: V2G adds another isolation point + warning notice update. Reg 826.1.2.1 overcurrent across configurations recalculated to include V2G discharge contribution.',
              'EREC G99 amendment required for V2G addition. G100 recommissioning if site has export limit — ELS curtailment hierarchy updated (typically V2G curtailed first).',
              'ISO 15118-20 + OCPP 2.0.1: emerging protocol stack for V2G session negotiation + grid-services backend integration. UK 2025-26 deployment limited but progressing.',
              'V2H requires island-mode capability: Reg 826.1.1.2.2 N-E switching + Reg 826.1.1.5 island-mode switching device + grid-forming bidirectional charger or coordinated backup gateway.',
              'Economic case: Octopus Power Pack successor + similar schemes £500-1,000/year for compatible customers; hardware uplift £5-9k; battery cycle cost + OEM warranty risk. Niche viability UK 2025-26, mainstream 2030+.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish V2G (grid export), V2H (island home backup), V2L (vehicle socket load).',
              'Apply Section 722 + Section 551 + Chapter 82 BS 7671 framework to a V2G install.',
              'Identify UK 2025-26 V2G hardware landscape: Wallbox Quasar 1/2, CHAdeMO vs CCS, ISO 15118-20.',
              'Apply Reg 722.531.3 RCD requirement for V2G (Type B or Type A + integrated RDC-DD).',
              'Update Chapter 82 multi-source isolation + overcurrent across configurations to include V2G.',
              'Identify the EREC G99 amendment + G100 recommissioning triggers for V2G addition.',
              'Articulate OEM warranty + battery cycle considerations for V2G customer conversations.',
              'Compose the V2G cert evidence bundle: integrated PEI EIC + Section 722 + 551 + Chapter 82 + G99 + G100 + EMS architecture + customer handover.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            V2G is the most regulation-intensive single feature in M10. EV (Section 722) + generating set (Section 551) + multi-source PEI (Chapter 82) + DNO interface (G99 + G100) + commercial tariff (Octopus) + OEM warranty + protocol stack (ISO 15118-20) — all converge on one charger.
          </Pullquote>

          <ContentEyebrow>What V2G is + the UK 2025-26 hardware reality</ContentEyebrow>

          <ConceptBlock
            title="V2G vs V2H vs V2L — the bidirectional charging trio"
            plainEnglish="Three distinct bidirectional EV use modes: V2G exports to the public grid (commercial revenue); V2H powers the home in island mode (backup during outage); V2L provides AC output from a socket on the vehicle (camping, power tools). Each requires different hardware + has different BS 7671 + regulatory scope. UK 2025-26: V2L mainstream (50+ EV models ship with V2L); V2G + V2H limited but growing."
            onSite="Customer conversation clarity matters: ‘do you want to export to the grid + earn revenue (V2G) or just power your home during outages (V2H) or run a kettle from the boot at a campsite (V2L)?’. Each answer leads to different hardware + cost + scope. Don’t conflate them."
          >
            <p>The three modes in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">V2G —
                  Vehicle-to-Grid</strong> — bidirectional charger discharges
                EV battery to the public DNO grid. Customer earns grid-services
                revenue (Octopus Power Pack successor: £300-700/year). Subject
                to full Section 722 + Section 551 + Chapter 82 + EREC G99 + G100
                + ISO 15118-20 + OCPP 2.0.1 + OEM warranty
              </li>
              <li>
                <strong className="text-white">V2H —
                  Vehicle-to-Home</strong> — bidirectional charger powers the
                home during DNO outage (island mode) or during peak-tariff windows
                (load-shifting, no export). Subject to Section 722 + Section 551 +
                Chapter 82 ISLAND-MODE requirements (Reg 826.1.1.2.2 N-E switching
                + Reg 826.1.1.5 island-mode switching device + grid-forming
                bidirectional charger or coordinated backup gateway)
              </li>
              <li>
                <strong className="text-white">V2L —
                  Vehicle-to-Load</strong> — vehicle provides AC power output
                via a socket integrated into the EV (Hyundai IONIQ 5, Kia EV6,
                MG4, BYD, Ford F-150 Lightning). Camping kettle, power tools,
                emergency lighting. NO charger install scope — it’s a feature
                of the vehicle. No BS 7671 install scope (the load plugged in is
                covered by its own product compliance). UK 2025-26 mainstream
              </li>
              <li>
                <strong className="text-white">V2X umbrella</strong>
                — industry term covering all bidirectional EV uses (V2G + V2H
                + V2L + V2B Vehicle-to-Building). OCPP 2.0.1 + ISO 15118-20
                support V2X session negotiation
              </li>
              <li>
                <strong className="text-white">Hardware
                  separation</strong> — V2L is purely a vehicle feature
                (built-in socket). V2G + V2H both require bidirectional CHARGER
                hardware. V2H requires additional island-mode capability (grid-
                forming + N-E switching coordination)
              </li>
              <li>
                <strong className="text-white">UK 2025-26
                  customer-facing reality</strong> — V2L: ask vehicle features.
                V2G: ask whether vehicle + charger + OEM warranty + tariff align.
                V2H: ask whether site has backup gateway + V2G charger supports
                island mode (rare currently)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — V2L: no install evidence needed (vehicle
                feature). V2G + V2H: integrated PEI EIC + Section 722 + 551 +
                Chapter 82 + V2G charger DoC + EREC + EMS + customer handover
                noting OEM warranty implications
              </li>
            </ul>
          </ConceptBlock>

          <V2gFlow caption="Vehicle-to-Grid: the EV charges off-peak and feeds back at peak through a bidirectional charger." />

          <ConceptBlock
            title="UK 2025-26 V2G hardware landscape"
            plainEnglish="V2G hardware deployment is limited but growing in UK 2025-26. Wallbox Quasar 1 (CHAdeMO) was the residential V2G workhorse for the Octopus Power Pack trial (2020-2023). Newer CCS-bidirectional hardware (Quasar 2, dnata DC, V2X.energy) emerging but expensive + limited supply. Commercial fleet bidirectional units (ABB Terra, Wallbox commercial range) progressing faster than residential."
            onSite="Practical installer reality 2025-26: V2G installs are specialist work — limited hardware availability, OEM verification needed, tariff confirmation needed, protocol stack still maturing. Most customer V2G enquiries should be paused-and-verified rather than rapid-quoted."
          >
            <p>UK 2025-26 V2G hardware status:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Wallbox Quasar 1</strong>
                — 7.4 kW single-phase CHAdeMO bidirectional. Octopus Power Pack
                trial workhorse 2020-2023. CHAdeMO compatibility: Nissan LEAF (UK
                widespread; ageing fleet), Mitsubishi Outlander PHEV (small UK
                fleet). £5,000-7,000 unit cost. Discontinued in some markets
                as CCS becomes default
              </li>
              <li>
                <strong className="text-white">Wallbox Quasar 2</strong>
                — 7.4 kW (single-phase) / 11 kW (three-phase) CCS bidirectional.
                Announced 2022; UK 2025-26 deployment limited. ISO 15118-20 +
                OCPP 2.0.1 compatible. £7,000-10,000 unit cost
              </li>
              <li>
                <strong className="text-white">dnata DC bidirectional</strong>
                — commercial fleet DC bidirectional unit. CCS. ~11-22 kW
                power. £10,000-15,000. UK 2025-26 pilot deployments
              </li>
              <li>
                <strong className="text-white">V2X.energy</strong> —
                commercial bidirectional units; fleet-focused. UK 2025-26 emerging
              </li>
              <li>
                <strong className="text-white">ABB Terra series</strong>
                — commercial DC fast chargers; some models bidirectional-capable
                for fleet use. £20,000+ per unit
              </li>
              <li>
                <strong className="text-white">EVgo / Fortum / others</strong>
                — emerging commercial bidirectional product lines as ISO
                15118-20 matures
              </li>
              <li>
                <strong className="text-white">Cost gap</strong>
                — V2G charger £7-15k vs unidirectional Zappi / Easee /
                Wallbox Pulsar £700-1.5k. £5-9k uplift = the dominant
                economic barrier to V2G adoption. Gap closing slowly
              </li>
              <li>
                <strong className="text-white">Future
                  trajectory</strong> — ISO 15118-20 + OCPP 2.0.1 ecosystem
                alignment 2024-2027 should reduce cost premium as volumes grow;
                OEM warranty expansion (more brands V2G-friendly); commercial
                tariff schemes (Octopus successor + competitors) expanding. UK
                2030: 5-10% of new chargers V2G; 2035: meaningful market share
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.531.3 (interpretation) — EV charging RCD requirements"
            clause="The EV charging point shall be protected by an RCD complying with one of: (a) Type B RCD; or (b) Type A RCD or Type F RCD in conjunction with additional means (residual direct current detection device, RDC-DD) to prevent DC fault current from exceeding 6 mA. The RDC-DD may be integrated within the EV charging equipment per BS EN 61851-1."
            meaning="V2G chargers contain bidirectional power electronics with smooth DC fault current capability at the EV battery interface, similar to BESS inverters + DC fast chargers. The Reg 722.531.3 RCD selection logic: (a) install a Type B RCD on the supply circuit (covers AC, pulsating DC, smooth DC) — the safest, most conservative path; or (b) install a Type A / F RCD on the supply circuit IF the charger’s manufacturer DoC declares integrated RDC-DD per BS EN 61851-1 that limits smooth DC residual to <6 mA at the EV interface. Modern V2G chargers (Wallbox Quasar 1 + 2) declare integrated RDC-DD; Type A supply-side RCBO acceptable. Where DoC absent or unclear, default to Type B. Cert evidence bundle: V2G charger product DoC + supply-side RCD specification + commissioning test of RCD operation per Reg 643. Reg 551.4.2 multi-source effectiveness: in a V2G + PV + BESS PEI, RCD architecture must remain effective across every source combination + commissioning verified per combination."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 integration: Section 722 + 551 + Chapter 82</ContentEyebrow>

          <Pullquote>
            V2G turns the EV from a load into a source. The moment that happens, Section 722 alone is not enough — Section 551 generating-set rules apply, Chapter 82 multi-source rules apply, EREC G99 amendment applies. The install’s complexity multiplies.
          </Pullquote>

          <ConceptBlock
            title="V2G as a generating set under Section 551"
            plainEnglish="A V2G EV in discharge mode IS a generating set per Reg 551.1.1 category (e) batteries + (f) other suitable sources (the EV + bidirectional charger together). Reg 551.7.5 anti-islanding required; Reg 551.7.2.1 supply-side connection; Reg 551.4.2 RCD effectiveness across source combinations. All the per-technology M9 rules apply uniformly."
            onSite="The mental shift: V2G isn’t just ‘a fancier EV charger’ — it’s a battery + inverter sitting on wheels, attached to the home electrical system, capable of feeding power back. Same Section 551 architecture as a static BESS, with extra complexity (the source can leave — drive away)."
          >
            <p>V2G under Section 551:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 551.1.1
                  classification</strong> — V2G EV is a generating set
                (battery + bidirectional inverter together). Categorically in scope
                of Section 551 framework
              </li>
              <li>
                <strong className="text-white">Reg 551.7.5
                  anti-islanding</strong> — V2G charger must detect DNO supply
                loss + cease discharging. Built into the V2G charger’s control
                (RoCoF + voltage / frequency windows — G99 disallows Vector Shift
                for type-tested generation, so RoCoF is the required loss-of-mains
                method on the type-tested inverters used in virtually all LCT installs;
                Vector Shift is legacy / non-type-tested only). Verified at
                commissioning per ENA G99 or G98 procedure
              </li>
              <li>
                <strong className="text-white">Reg 551.7.2.1
                  supply-side</strong> — V2G charger connects on supply side of
                protective devices, identical to BESS inverter or PV inverter.
                Battery (the EV) is the source, charger is the inverter, both sit
                upstream of the consumer unit RCDs
              </li>
              <li>
                <strong className="text-white">Reg 551.4.2 RCD
                  effectiveness</strong> — V2G adds another source combination
                to the PEI. Per-source RCD + central RCD architecture verified
                effective for: V2G alone, V2G + PV, V2G + BESS, V2G + PV + BESS,
                etc.
              </li>
              <li>
                <strong className="text-white">Reg 551.6
                  control</strong> — manual + automatic control of V2G discharge
                handled by OCPP backend + EMS + ELS (if G100); customer-side
                control via vendor app
              </li>
              <li>
                <strong className="text-white">EREC G99
                  amendment</strong> — adding a V2G source to existing PEI
                requires G99 amendment notifying the DNO of the new generating
                set + capacity. DNO updates connection agreement
              </li>
              <li>
                <strong className="text-white">EREC G100
                  recommissioning</strong> — if site has export limit, V2G
                added to curtailment hierarchy. New G100 cert filed
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — Section 722 EV charging section + Section
                551 generating set updates + Chapter 82 multi-source updates +
                V2G charger product DoC + commissioning test result per source
                combination
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="V2G under Chapter 82 multi-source PEI"
            plainEnglish="V2G addition to an existing PV + BESS PEI transitions a 2-source site into a 3-source site. Chapter 82 requirements multiply: Reg 826.1.1.1 protection in all NEW operating-mode combinations; Reg 826.1.1.4 multi-source isolation updated with V2G charger as a per-source switch; Reg 826.1.2.1 overcurrent at every PEI point recalculated to include V2G discharge contribution; Reg 826.1.2.2 directional considerations as V2G adds bidirectional energy flow on the EV charging circuit."
            onSite="Practical impact: existing customer with PV + BESS + planned V2G addition = the PEI EIC must be re-issued with the V2G integration. Multi-source warning notice updated. EMS reconfigured to include V2G. EREC G99 amended. If G100 applies, recommissioned. The V2G install is the most regulation-intensive single feature in M10 — budget commissioning time accordingly."
          >
            <p>Chapter 82 implications of V2G addition:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 826.1.1.1
                  protection in all modes</strong> — add V2G to source-
                combination matrix. Existing PV+BESS+DNO had ~7 configurations;
                add V2G → ~15 configurations. Each verified
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.4
                  multi-source isolation</strong> — V2G charger isolator added
                to per-source isolation list. Warning notice updated. UK 2025-26
                typical 5-source PEI: DNO + PV AC + PV DC + BESS AC + BESS DC +
                V2G charger isolator = 6+ isolation points
              </li>
              <li>
                <strong className="text-white">Reg 826.1.2.1
                  overcurrent</strong> — V2G discharge contributes to fault
                current at MET. Worst-case PSCC recalculated at main consumer
                unit considering DNO + PV + BESS + V2G simultaneous max output.
                Modest contribution (V2G ≈7.4 kW → ≈32 A); breaker
                breaking capacity check
              </li>
              <li>
                <strong className="text-white">Reg 826.1.2.2 direction
                  + polarity</strong> — V2G adds bidirectional energy flow on
                the EV charging circuit. Protective devices selected considering
                both directions; reverse-current relays where applicable
              </li>
              <li>
                <strong className="text-white">Reg 826.1.3 outage
                  behaviour</strong> — with V2G in PEI, on DNO loss: either
                (a) V2G + BESS + PV all disconnect (Reg 551.7.5 default —
                most UK 2025-26 V2G chargers grid-following only); or (b) V2G
                joins island mode (V2H, rare, requires grid-forming V2G hardware
                + backup gateway coordination)
              </li>
              <li>
                <strong className="text-white">Reg 826.1.4 surge
                  protection</strong> — V2G charging cycles add switching
                events; SPD review per Reg 826.1.4
              </li>
              <li>
                <strong className="text-white">EMS coordination</strong>
                — EMS includes V2G in priority logic: V2G discharge to home
                or to grid based on tariff + customer preference + OCPP scheduling
                + ELS limit
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — integrated PEI EIC updated; Chapter 82 compliance summary;
                Section 722 + 551 + 826 cross-references; V2G charger DoC; EMS
                architecture diagram; OCPP backend record; EREC correspondence;
                customer handover with OEM warranty note
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.2.2 — Direction + polarity considerations"
            clause="Selection and erection of overcurrent protective devices shall take account of all possible directions of current flow and polarity. Connection of a source of supply via switchgear or controlgear assemblies shall comply with Regulation 551.7.2."
            meaning="Reg 826.1.2.2 is the directional-protection requirement of Chapter 82 PEI. In a single-source install, current flows in one direction (DNO → load); protective devices selected accordingly. In a multi-source PEI with bidirectional flow (PV exports, BESS charges + discharges, V2G charges + discharges), current can flow in either direction at any given protective device. Selection considerations: (1) Circuit breakers + RCBOs — most BS EN 60898 / BS EN 61009 devices are bidirectional by design (don’t care about flow direction); good for most PEI applications. (2) Fuses — bidirectional by design. (3) Switch-disconnectors per Reg 537.2 — bidirectional for isolation. (4) Directional relays — used in some commercial PEI for fault discrimination across multi-source sites; specifies the direction current must flow to trip. (5) Polarity — single-phase polarity matters at the L-N + L-E connections; V2G + BESS source connection must maintain correct polarity through the bidirectional inverter (this is the inverter’s product compliance; verify via manufacturer DoC + commissioning). Cert evidence: PEI overcurrent study notes directional + polarity considerations per protective device + commissioning verifies correct operation under bidirectional flow."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Nissan LEAF customer adding V2G to existing PV + BESS — Octopus Power Pack successor"
            situation="Customer with 5 kWp PV + 10 kWh BESS (installed 2021). Customer owns a 40 kWh Nissan LEAF (2020 model, CHAdeMO). Has an existing 7 kW Zappi unidirectional EV charger. Octopus Energy customer on Intelligent Octopus Go tariff. Wants to upgrade to V2G hardware to participate in Octopus Power Pack successor scheme (£500-700/year estimated revenue)."
            whatToDo="V2G addition workflow. (1) Verify OEM warranty: Nissan LEAF 40 kWh with V2G is one of the FEW UK 2025-26 OEM-supported V2G vehicles — Nissan’s warranty position is broadly V2G-friendly though customer should verify current terms. (2) Verify tariff: Octopus Power Pack successor scheme open + paying £500-1,000/year for compatible vehicles. (3) Hardware: replace Zappi unidirectional with Wallbox Quasar 1 (CHAdeMO bidirectional, £5,000-7,000) or Quasar 2 (if customer’s next vehicle will be CCS — future-proof). (4) BS 7671 install: Section 722 EV charging point (Reg 722.411 earthing, Reg 722.531.3 RCD Type A + Wallbox integrated RDC-DD per Quasar DoC, Reg 722.511 BS EN 61851-1 charger). Section 551 generating set additions (Reg 551.7.5 anti-islanding, Reg 551.7.2.1 supply-side, Reg 551.4.2 multi-source RCD). Chapter 82 updates (Reg 826.1.1.4 multi-source isolation now 4-source PV+BESS+V2G+DNO, warning notice updated, Reg 826.1.2.1 overcurrent recalculated with V2G contribution, Reg 826.1.2.2 directional flow). (5) EREC G99 amendment: notify DNO of V2G addition + new generating capacity (7.4 kW). DNO updates connection agreement. (6) G100 not applicable (no export limit). (7) Commissioning: BS 7671 Reg 643 Part 6 + Reg 551.7.5 anti-islanding test on V2G + Reg 551.4.2 multi-source RCD verification across PV+BESS+V2G combinations + Wallbox Quasar self-test + OCPP backend connection + Octopus tariff registration. (8) EMS: existing vendor EMS continues; Octopus tariff + Octopus Power Pack backend manages V2G discharge scheduling. (9) Cert evidence bundle: integrated PEI EIC (supersedes 2021 PV+BESS EIC) + Section 722 + 551 + Chapter 82 + Wallbox Quasar DoC + Nissan LEAF warranty acknowledgement note + EREC G99 amendment + Octopus tariff record + commissioning verification. Annual customer economics: £500-700 Octopus Power Pack + £200 cheap-rate charging savings + (PV + BESS continued) = £700-900/year net new from V2G upgrade. Hardware payback £5,000-7,000 / £700 = 7-10 years."
            whyItMatters="This is the UK 2025-26 canonical V2G install — Nissan LEAF + Wallbox Quasar 1 CHAdeMO + Octopus Power Pack successor. The hardware + OEM + tariff alignment is the key. Customer experience: payback 7-10 years, requires customer engagement with Octopus + vehicle availability for grid events. Installer scope: most regulation-intensive single install in M10 — budget 1-2 days commissioning time + Reg 826 multi-source recommissioning across configurations + EREC + EMS coordination + customer handover with OEM warranty note. Cert evidence bundle is substantial."
          />

          <Scenario
            title="Fleet depot V2G — 8×22 kW bidirectional CCS chargers for last-mile delivery vans"
            situation="Last-mile delivery company depot. 8 electric vans (Ford E-Transit, Renault Master E-Tech, or similar CCS-bidirectional models). Vans return to depot 16:00-18:00 daily; depart 06:00-08:00 next morning. Customer wants V2G to: (a) reduce import during evening peak by discharging fleet batteries during 16:00-19:00 high-DUoS window; (b) participate in National Grid demand-response markets via OCPP backend. Depot has existing 200 A three-phase service + 30 kWp PV + 50 kWh BESS."
            whatToDo="Commercial fleet V2G PEI integration. (1) Hardware: 8×22 kW commercial CCS bidirectional chargers (Wallbox Quasar 2 commercial, dnata DC, V2X.energy — specialist commercial fleet supplier). £80,000-150,000 capex for 8 units. (2) Vehicle OEM warranty: Ford E-Transit + Renault Master E-Tech — verify each manufacturer’s V2G warranty position; UK 2025-26 still evolving for commercial fleet. (3) Backend: OCPP 2.0.1 commercial platform (Monta, Driivz, Has-to-be, Octopus Electroverse commercial) managing 8 chargers + scheduling + grid-services revenue capture. (4) BS 7671 install: each charger Section 722 + Section 551 generating set + Chapter 82 multi-source. PEI now 4-source: DNO + PV + BESS + 8×V2G fleet. Reg 826.1.1.4 isolation: per-charger isolators + master charger-bay isolator + DNO + PV + BESS = 11+ isolation points + comprehensive warning notice. Reg 826.1.2.1 overcurrent: worst-case 8 chargers × 22 kW = 176 kW discharge potential at MET; PSCC + breaking capacity check; main service capacity (200 A 3-phase ≈ 138 kW) becomes constraint — EMS load-coordination needed. (5) EREC G99 — formal application for new commercial-scale generating capacity (170+ kW). DNO design review. (6) EREC G100 — likely export limit (the depot might be capped at 50-100 kW export based on local network). ELS hierarchy with V2G fleet curtailable first. (7) Commissioning: comprehensive multi-source testing + OCPP backend integration + grid-services revenue verification. (8) Cert evidence: substantial — integrated PEI EIC + per-charger Section 722 records + Section 551 generating set summary + Chapter 82 compliance + G99 + G100 + OCPP backend + per-vehicle OEM warranty notes + commissioning verification. Capex £80-150k + £30-50k civils + £10-20k EMS / OCPP integration + £5-10k cert + commissioning. Annual revenue: £5,000-15,000 grid services + import reduction £2,000-5,000 + PV / BESS continued = £7,000-20,000/year. Payback 7-12 years."
            whyItMatters="Commercial fleet V2G is a more economically defensible UK 2025-26 V2G use case than residential — vehicles are predictably parked + connected during evening peak + can be aggregated at scale. Hardware costs amortise over commercial fleet operations. UK 2025-26 reality: tens of pilot fleet deployments; growing to hundreds. The installer scope expands from ‘BS 7671 EV charging install’ to ‘commercial PEI design + EMS / OCPP integration + EREC G99/G100 + grid-services backend’ — distinct commercial model."
          />

          <CommonMistake
            title="Quoting V2G without confirming vehicle OEM warranty"
            whatHappens="Installer quotes a V2G upgrade to a customer with a Tesla Model 3. Customer pays £7,000 for the Wallbox Quasar 2 + install. Six months later, Tesla refuses a battery warranty claim citing the customer’s V2G usage. Customer faces £10,000+ battery replacement cost. Customer sues installer. Reputation + legal damage."
            doInstead="Always verify OEM warranty BEFORE quoting V2G. UK 2025-26 V2G-friendly: Nissan (LEAF), Hyundai, Kia, Polestar, Volvo. UK 2025-26 V2G-restrictive: Tesla, VW Group (ID.3/4, Audi e-tron), BMW, Mercedes EQ, Toyota, Ford (consumer cars; commercial vans different). Restrictions change — verify current OEM position before each quote. Customer handover acknowledgement of warranty status MANDATORY. Cert evidence bundle includes the OEM warranty confirmation document or screenshot. If customer’s vehicle is V2G-restrictive: decline the install or proceed only with customer’s explicit written acknowledgement of warranty risk."
          />

          <CommonMistake
            title="Treating V2G install as a regular EV charger install"
            whatHappens="Installer fits V2G charger as if it were a Zappi / Easee unidirectional — Section 722 install + Type A RCD + supply circuit + commissioning. Ignores: Section 551 generating-set rules (Reg 551.7.5 anti-islanding), Chapter 82 multi-source updates (Reg 826.1.1.4 isolation + Reg 826.1.2.1 overcurrent), EREC G99 amendment (DNO not notified of new generating source), EMS coordination, G100 recommissioning. Site fails inspection; DNO catches the unnotified generating set; multi-source isolation warning notice missing; customer at risk on a half-compliant install."
            doInstead="V2G install is a SECTION 722 + SECTION 551 + CHAPTER 82 install. Treat it as the multi-source PEI integration it is. Budget commissioning time accordingly (1-2 days vs ½ day for a unidirectional charger). Quote at the right price reflecting the regulatory scope. Cert evidence bundle: integrated PEI EIC superseding any prior EICs + Section 722 + Section 551 + Chapter 82 + V2G charger DoC + EREC G99 amendment + G100 if applicable + EMS architecture + customer handover with OEM warranty note. Don’t cut corners on a V2G install — the regulatory + safety + insurance exposure is real."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'V2G (Vehicle-to-Grid) = bidirectional EV charging exporting to public grid. V2H (Vehicle-to-Home) = EV powers home in island mode. V2L (Vehicle-to-Load) = EV provides AC socket on vehicle for direct load. Different hardware, different scope.',
              'BS 7671 framework: Section 722 (EV install) + Section 551 (EV as generating set in discharge) + Chapter 82 (multi-source PEI integration) + EREC G99 amendment + EREC G100 if export-limited.',
              'UK 2025-26 hardware: Wallbox Quasar 1 (CHAdeMO, Nissan LEAF), Quasar 2 (CCS), dnata DC + V2X.energy (commercial fleet). Cost £7-15k vs £700-1.5k unidirectional. £5-9k uplift.',
              'OEM warranty: V2G-friendly = Nissan / Hyundai / Kia / Polestar / Volvo. V2G-restrictive UK 2025-26 = Tesla, VW Group, BMW, Mercedes, Toyota, Ford (consumer). Always verify before quoting.',
              'Reg 722.531.3 RCD: Type B OR Type A + integrated RDC-DD per BS EN 61851-1 in V2G charger DoC.',
              'Section 551 application: V2G EV in discharge = generating set per Reg 551.1.1. Reg 551.7.5 anti-islanding, Reg 551.7.2.1 supply-side, Reg 551.4.2 multi-source RCD effectiveness across PV + BESS + V2G + DNO combinations.',
              'Chapter 82 updates: Reg 826.1.1.1 protection in all NEW configurations; Reg 826.1.1.4 multi-source isolation + V2G charger isolator added + warning notice updated; Reg 826.1.2.1 overcurrent recalculated with V2G discharge contribution; Reg 826.1.2.2 bidirectional flow + polarity.',
              'EREC G99 amendment required for V2G addition. EREC G100 recommissioning if site export-limited — V2G typically curtailed first in priority hierarchy.',
              'ISO 15118-20 + OCPP 2.0.1: emerging protocol stack for V2G session negotiation + grid-services backend. UK 2025-26 limited deployment, growing.',
              'V2H requires island-mode capability: Reg 826.1.1.2.2 N-E switching + Reg 826.1.1.5 island-mode switching device + grid-forming V2G or coordinated backup gateway. UK 2025-26 rare residential.',
              'Economic case UK 2025-26: Octopus Power Pack successor + similar £500-1,000/year for compatible customers; hardware uplift £5-9k; battery cycle cost + OEM warranty risk. Payback 7-10 years for niche viable case.',
              'Mainstream timeline: tens of thousands of trial users 2025-26; ISO 15118-20 ecosystem alignment 2024-2027; 5-10% residential V2G by 2030; meaningful market share by 2035.',
              'Cert evidence bundle: integrated PEI EIC + Section 722 + 551 + Chapter 82 + V2G charger DoC + EREC G99 amendment + G100 if applicable + EMS architecture + OCPP backend record + OEM warranty acknowledgement + customer handover.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                10.4 EREC G100 export limit
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                10.6 Grid-forming vs grid-following inverters
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
