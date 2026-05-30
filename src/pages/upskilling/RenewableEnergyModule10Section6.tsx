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
import { GridFormingVsFollowing } from '@/components/study-centre/diagrams/renewableM10';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm10s6-grid-following',
    question:
      'What does it mean for an inverter to be "grid-following"?',
    options: [
      'Inverter sets voltage + frequency',
      'A grid-following inverter SYNCHRONISES to the existing grid voltage + frequency reference (the DNO supply or a grid-forming inverter). It does NOT set voltage / frequency itself — it injects current at the phase + frequency it sees from the reference. If the reference disappears (DNO supply lost), the grid-following inverter cannot operate — Reg 551.7.5 anti-islanding disconnects it. UK 2025-26 default: virtually all residential PV / BESS / V2G inverters are grid-following.',
      'Inverter operates standalone',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'Grid-following (also called "grid-feeding" or "current-source" inverter): (1) Operating principle — the inverter synchronises to an external voltage + frequency reference (the grid supply); injects current at the same phase + frequency. PLL (phase-locked loop) tracks the reference. The inverter doesn’t hold the voltage — the grid holds it. (2) Behaviour on grid loss — if the reference (DNO supply) disappears, the inverter has no synchronisation source. It detects loss of mains (RoCoF + voltage / frequency window — note G99 disallows Vector Shift for type-tested generation, so RoCoF is the required loss-of-mains method on the type-tested inverters used in virtually all LCT installs; Vector Shift is legacy / non-type-tested only) and disconnects per Reg 551.7.5 anti-islanding. Cannot continue feeding a dead network. (3) UK 2025-26 default — virtually all small-scale residential PV inverters (SolarEdge, Solis, Huawei, Growatt, Fronius), BESS inverters (most hybrid units), V2G chargers (Wallbox Quasar) are grid-following. Type-tested per ENA G98 / G99 + BS EN 50549 + IEC 62116. (4) Strength — simple, cheaper hardware, mature technology, all UK 2025-26 vendors ship grid-following as the default. (5) Limitation — cannot operate without the grid; no island capability without separate grid-forming inverter or backup gateway. (6) Cert evidence: inverter DoC declares grid-following + ENA type approval + Reg 551.7.5 anti-islanding behaviour verified at commissioning.',
  },
  {
    id: 'm10s6-grid-forming',
    question:
      'What does it mean for an inverter to be "grid-forming"?',
    options: [
      'Same as grid-following',
      'A grid-forming inverter SETS the voltage + frequency reference itself — acts as the voltage source for its local network (island mode). Holds voltage + frequency within specified limits using its own internal control loop, droop control + virtual inertia. Other grid-following inverters can synchronise to it. UK 2025-26: typically the BESS inverter or a dedicated backup gateway provides grid-forming capability. Required for island mode (Reg 826.1.1.2.2 + Reg 826.1.1.5).',
      'Random',
      'Reverse role',
    ],
    correctIndex: 1,
    explanation:
      'Grid-forming (also called "voltage-source" inverter): (1) Operating principle — the inverter HOLDS voltage + frequency at specified setpoints (typically 230 V ±10% and 50 Hz ±1%). Uses droop control (voltage drops with reactive current load, frequency drops with real power load) + virtual inertia (electronic emulation of synchronous-generator mechanical inertia for frequency stability). Doesn’t need an external reference; IS the reference for any other inverters synchronising to it. (2) Use case — island mode operation. When the DNO supply is lost + Reg 826.1.1.2.2 N-E switching transitions to local bond, the grid-forming inverter sets voltage + frequency for the local island. Grid-following inverters (PV, V2G) can then synchronise to the grid-forming voltage + continue contributing power. (3) UK 2025-26 hardware — the BESS inverter typically provides grid-forming when island-capable hardware fitted: Tesla Powerwall (with Backup Gateway 2), SolarEdge StorEdge (with Backup Interface), GivEnergy AIO (with Whole Home Backup), Sonnen, Enphase IQ8 (microinverter + IQ System Controller). The PV inverter often remains grid-following — follows the BESS during island operation. (4) Cost — grid-forming capability is the £2-5k uplift in residential backup-gateway solutions. (5) Reg 826.1.1.5 — island-mode switching device requirement (the backup gateway hardware). Cert evidence: grid-forming inverter DoC + commissioning of island-mode operation + Reg 826.1.1.2.2 N-E switching verification.',
  },
  {
    id: 'm10s6-island-prerequisites',
    question:
      'What does a UK 2025-26 PEI need to be island-capable?',
    options: [
      'Just an inverter',
      'Multiple components must align: (a) grid-forming inverter (typically the BESS inverter); (b) Reg 826.1.1.2.2 N-E switching hardware (backup gateway with controlled non-overlap sequencing); (c) Reg 826.1.1.5 island-mode switching device; (d) sufficient stored energy + load priority configuration (load shedding for non-essential loads); (e) safety architecture verified for island-mode short-circuit current (typically much lower than direct-feeding); (f) commissioning test of grid-loss transition + reverse transition + N-E bond verification. Most UK 2025-26 PEI are NOT island-capable.',
      'Random',
      'Just BESS',
    ],
    correctIndex: 1,
    explanation:
      'Island-capable PEI requirements (all must be in place): (1) Grid-forming inverter — BESS inverter with grid-forming mode + virtual inertia + droop control. Examples: Tesla Powerwall, SolarEdge StorEdge backup, GivEnergy AIO with backup add-on, Sonnen, Enphase IQ8. Cost uplift £2-5k vs grid-following only. (2) Reg 826.1.1.2.2 N-E switching hardware — backup gateway that performs controlled sequence: DNO line off → DNO neutral off → local N-E bond on (no overlap with DNO neutral). Vendor-integrated unit (Tesla Backup Gateway 2, SolarEdge Backup Interface, GivEnergy Whole Home Backup, Enphase IQ System Controller). (3) Reg 826.1.1.5 island-mode switching device — the switch that isolates the PEI from DNO during island operation. Typically integrated into the backup gateway. (4) Stored energy + load priority — BESS sized for expected island duration; load shedding (§10.2) prevents BESS depletion. Critical loads (fridge, freezer, comms, lighting) protected; non-essential (EV charging, heat pump, immersion) shed when BESS low. (5) Island-mode safety architecture — short-circuit current in island is dramatically lower than direct-feeding (inverter-limited to ≈1.1× rated). RCDs work via local N-E bond per Reg 826.1.1.2.2; overcurrent protective devices may not achieve Reg 411 disconnection times — designed to accept this in island mode. (6) Commissioning — simulated grid-loss test verifying transition timing + voltage / frequency stability in island + reverse transition; N-E bond continuity in each state; RCD operation under island fault. Cert evidence bundle: backup gateway DoC + commissioning test results + customer handover documenting island operating mode.',
  },
  {
    id: 'm10s6-virtual-inertia',
    question:
      'What is "virtual inertia" + why does it matter for grid-forming inverters?',
    options: [
      'Random',
      'Virtual inertia = software algorithm in a grid-forming inverter that EMULATES the mechanical inertia of a synchronous generator. Frequency-response behaviour: when load suddenly increases, a traditional generator slows down briefly (kinetic energy from rotating mass supports the load) before its governor responds; virtual inertia in an inverter mimics this with a controlled frequency dip + recovery. Important because: (a) provides stable frequency response during disturbances; (b) supports microgrid stability when multiple inverters parallel; (c) helps National Grid as conventional synchronous generation retires (less natural inertia in the system); (d) emerging requirement for grid-services / microgrid inverters.',
      'Fast spinning',
      'Mistake',
    ],
    correctIndex: 1,
    explanation:
      'Virtual inertia (also "synthetic inertia" or "virtual synchronous machine") explained: (1) Traditional grid — dominated by synchronous generators (gas turbine, nuclear, hydro). Each spinning generator has physical kinetic energy in its rotating mass. When grid load suddenly rises, generator slows briefly (releases kinetic energy as electricity); governor + automatic frequency response then ramps fuel input to restore frequency. The inherent kinetic energy provides FREQUENCY INERTIA — the grid resists fast frequency excursions. (2) Inverter-based generation — PV / BESS / wind inverters have NO mechanical inertia. A grid-following inverter doesn’t respond to frequency excursions inherently — just synchronises to whatever the grid does. (3) UK National Grid + ESO concern — as conventional synchronous generation retires (coal closed 2024; gas declining; new build dominated by inverter-based renewables), system inertia decreases. Frequency excursions become faster + harder to control. Risk of RoCoF (rate of change of frequency) protection trips cascading. (4) Virtual inertia solution — grid-forming inverters with virtual inertia algorithm RESPOND to detected frequency excursions by injecting / withdrawing power proportional to df/dt (rate of frequency change). Emulates the kinetic-energy response of synchronous generators. (5) UK 2025-26 deployment — emerging in commercial / grid-scale BESS (Pillswood 100 MW BESS in Yorkshire, Habitat — grid-forming + virtual inertia); residential rare currently. (6) Microgrid applications — essential when multiple inverters parallel without grid reference; grid-forming inverter with virtual inertia stabilises the local frequency. Cert evidence: grid-forming inverter DoC declares virtual inertia capability + commissioning verification of frequency response.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer with PV + 10 kWh BESS asks: "Will my system keep the lights on during a power cut?". Their hardware is SolarEdge inverter + Energy Bank BESS, no Backup Interface installed.',
    options: [
      'Yes',
      'No — without the SolarEdge Backup Interface (or equivalent backup gateway from another vendor), the system is grid-following only. On DNO loss, Reg 551.7.5 anti-islanding shuts down both PV + BESS — the BESS does NOT power the home. To enable backup, customer needs to retrofit the SolarEdge Backup Interface (£2,000-4,000 hardware + commissioning) which provides Reg 826.1.1.2.2 N-E switching + Reg 826.1.1.5 island-mode switching + grid-forming mode on BESS.',
      'Random',
      'Maybe',
    ],
    correctAnswer: 1,
    explanation:
      'UK 2025-26 typical scenario — customer assumes BESS = backup. Reality: (1) Default hardware — SolarEdge inverter + Energy Bank BESS without Backup Interface = grid-following only. On DNO loss, both PV + BESS disconnect per Reg 551.7.5 anti-islanding. No power to home from BESS. Reg 826.1.3 default behaviour. (2) Customer expectation gap — customer paid for BESS + expects backup during outages. This is one of the most common customer-installer misunderstandings in UK 2025-26 — historically caused complaints + reputation damage. Be explicit at quote stage. (3) Backup retrofit — SolarEdge Backup Interface adds: grid-forming mode on BESS inverter; Reg 826.1.1.2.2 N-E switching hardware; Reg 826.1.1.5 island-mode switching device; commissioning. Hardware cost £2,000-3,000; commissioning + install £1,000-2,000. Total £3,000-5,000 retrofit. (4) Vendor alternatives — Tesla Powerwall + Backup Gateway 2 (£3,000-4,000 uplift); GivEnergy AIO + Whole Home Backup (£2,000-3,000); Enphase IQ8 + IQ System Controller (£2,500-4,000); Sonnen (built-in island capability in some models). (5) Commissioning post-retrofit — simulated grid-loss transition test + N-E bond continuity in each state + island-mode operation duration test (verify BESS holds frequency / voltage in island under expected load) + reverse transition. (6) Cert evidence: backup gateway DoC + retrofit commissioning + customer handover documenting island operating mode + critical-load priority + degraded behaviour expectations.',
  },
  {
    question:
      'A grid-forming inverter operating in island mode encounters a sudden 5 kW load increase (customer turns on electric kettle). What happens?',
    options: [
      'Trips',
      'Grid-forming inverter responds: (1) voltage holds within its setpoint via droop control + reactive current adjustment; (2) frequency briefly dips proportional to df/dt and inverter’s virtual inertia setting — typically 0.1-0.5 Hz dip for a few cycles; (3) inverter real-power output increases to meet new load (drawing from BESS); (4) frequency recovers as power balance restored. If load exceeds inverter’s peak capability (e.g. 7 kW BESS + 5 kW load suddenly = 12 kW > peak), inverter limits its output + frequency droops further + EMS load-shedding may activate.',
      'Random',
      'No effect',
    ],
    correctAnswer: 1,
    explanation:
      'Grid-forming inverter dynamic response to load step: (1) Voltage control — droop control + reactive current adjustment hold voltage at setpoint (±5% typical). Voltage briefly dips a few volts then recovers (sub-second). (2) Frequency control — the immediate response. Grid-forming inverter’s virtual inertia + frequency droop control respond. Without virtual inertia: frequency drops faster + further. With virtual inertia: frequency drops gracefully (mimics synchronous generator behaviour). Typical UK 2025-26 BESS grid-forming: 0.1-0.5 Hz dip for 1-3 seconds, then recovery. (3) Real-power output — inverter ramps real power to meet new load. Energy drawn from BESS (or other sources if available). PV grid-following inverters continue at MPPT generation. (4) BESS state-of-charge — decreases proportional to power drawn. EMS monitors; load-shedding triggers if BESS approaches critical low. (5) Limits — if step-load exceeds inverter peak capability (e.g. customer turns on a 9 kW shower + EV charger simultaneously while in island, BESS rated 5 kW continuous + 7 kW peak), inverter limits output + voltage / frequency droop further + EMS sheds non-essential loads. (6) Cert evidence: grid-forming inverter DoC declares peak vs continuous power + frequency response characteristics + commissioning verifies acceptable response to expected step loads.',
  },
  {
    question:
      'How does Reg 826.1.1.2.2 N-E switching work in practice during a grid-loss transition?',
    options: [
      'Random',
      'Sequence: (1) DNO loss detected (loss-of-mains relay in grid-following inverter / backup gateway: voltage drop, frequency excursion, vector shift, ROCOF); (2) backup gateway opens DNO LINE contactor(s); (3) backup gateway opens DNO NEUTRAL contactor (briefly: PEI has no N-E reference); (4) backup gateway closes LOCAL N-E bond contactor (connects PEI neutral bar to PEI PE bar / local earth electrode); (5) grid-forming inverter transitions from grid-following to grid-forming mode + sets voltage / frequency; (6) PEI now operating as island. Reg 826.1.1.2.2 critically requires steps (3) and (4) do NOT overlap (would short DNO N-E and local N-E together).',
      'Manual',
      'No sequence',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 826.1.1.2.2 N-E switching transition sequence detail: (1) Detection — typically <100ms after DNO supply lost. Methods: voltage drop below threshold; frequency excursion outside window (47-52 Hz typically); vector shift detection (sudden phase angle change); ROCOF threshold exceeded. Built into the loss-of-mains relay (Reg 551.7.5) + backup gateway logic. (2) DNO line disconnection — backup gateway opens phase contactor(s) within ~20-50ms. (3) DNO neutral disconnection — backup gateway opens neutral contactor. At this point the PEI is electrically floating relative to earth (no N-E bond from DNO, none yet from local). RCDs cannot operate correctly. Window <50ms typical. (4) Local N-E bond establishment — backup gateway closes local neutral switch device that bonds the PEI neutral bar to the local earth electrode / PE conductor. PEI now has its own N-E reference for RCD operation. (5) Non-overlap requirement — Reg 826.1.1.2.2 mandates steps (3) and (4) do NOT overlap. If both DNO N-E bond AND local N-E bond were simultaneously in circuit, current would flow through both earthing systems in parallel — risk of unequal earth potential, circulating earth currents, RCD false-trip. The backup gateway hardware enforces non-overlap via interlocked contactors + controlled timing. (6) Grid-forming mode activation — BESS inverter transitions from grid-following (was synchronising to DNO) to grid-forming (now setting voltage + frequency). Sub-second transition. (7) PEI in island mode — grid-forming inverter holds V + f; grid-following inverters (PV) sync to grid-forming; loads served from local sources. (8) Commissioning verification — simulated grid-loss test + N-E continuity measurement at each state + transition timing measurement. Cert evidence: backup gateway DoC + sequence timing diagram + commissioning test result.',
  },
  {
    question:
      'In island mode, the short-circuit current dramatically drops. What does this mean for protective device design?',
    options: [
      'No impact',
      'Reg 826.1.2.1 requires overcurrent calculation at every PEI point for ALL configurations + min + max current magnitudes. Direct-feeding mode max PSCC ≈ 6-25 kA (DNO contribution dominates). Island mode max PSCC ≈ inverter peak ≈ 1.1× rated (e.g. 7 kW BESS ≈ 35 A peak). MCBs may NOT trip within Reg 411 disconnection time in island mode. Mitigation: RCDs work via local N-E bond per Reg 826.1.1.2.2 + Reg 415.1 additional protection 30 mA primary ADS in island; inverter automatic disconnection on persistent fault; designed acceptance of higher ADS time in island. Documented in PEI overcurrent study.',
      'Random',
      'Always higher',
    ],
    correctAnswer: 1,
    explanation:
      'Island-mode short-circuit reality: (1) Direct-feeding mode PSCC — DNO supply provides large prospective short-circuit current (UK 2025-26 typical 6-25 kA at LV consumer position). Plus inverter contribution (≈1.1× rated of each inverter). MCBs trip instantly on a short-circuit; ADS achieved within Reg 411 maximum disconnection times (0.4 s domestic final, 0.1 s some commercial). (2) Island-mode PSCC — only inverter contribution. BESS inverter rated (e.g.) 5 kW continuous, 7 kW peak, current-limited to ≈1.1× rated of peak = ≈35 A at single-phase 230 V. PV grid-following inverter contributes similar. A short-circuit downstream in island sees ≈ 30-50 A available current. (3) MCB trip behaviour — BS EN 60898 Type B MCB needs 3-5× In to trip in 0.1s; Type C needs 5-10× In. A 10 A Type B downstream MCB needs 30-50 A to trip in 0.1s. Island’s 30-50 A available current marginally meets this; sometimes does not. A 32 A circuit downstream may NOT achieve ADS in island. (4) Reg 411 implications — strict Reg 411 ADS times not always achievable in island. Reg 826.1.2.1 explicitly recognises this in its note. (5) Compensation — Reg 415.1 30 mA RCD additional protection becomes the PRIMARY ADS path in island. RCDs operate within 40ms at 5× In on residual current; the local N-E bond per Reg 826.1.1.2.2 ensures the fault-current path exists. Inverter’s own self-protection (loss of feedback, overcurrent self-trip) provides backup. (6) Design + commissioning — PEI overcurrent study calculates min PSCC in each island configuration; identifies circuits where overcurrent ADS not achievable; relies on RCD for those; verifies RCD operation in island at commissioning. Cert evidence: study + per-configuration test results.',
  },
  {
    question:
      'Grid-forming + grid-following inverters can coexist in the same PEI. What’s the typical UK 2025-26 architecture?',
    options: [
      'All grid-forming',
      'BESS inverter = grid-forming (can run as voltage source in island mode); PV inverter = grid-following (always follows whatever reference is present — DNO in direct-feeding, BESS in island); V2G charger = grid-following (in residential UK 2025-26 hardware; commercial fleet grid-forming-capable emerging). Backup gateway coordinates the transition. Vendor-integrated stacks (Tesla, SolarEdge, GivEnergy, Enphase) handle this seamlessly.',
      'Random',
      'Mixed unimportant',
    ],
    correctAnswer: 1,
    explanation:
      'Typical UK 2025-26 mixed-inverter PEI architecture: (1) BESS inverter — grid-forming-capable (Tesla Powerwall + Backup Gateway, SolarEdge StorEdge + Backup Interface, GivEnergy AIO + Whole Home Backup, Enphase IQ8 + IQ Combiner). In direct-feeding mode: operates grid-following (synchronises to DNO). In island mode: transitions to grid-forming (sets voltage + frequency for the island). (2) PV inverter — grid-following only (UK 2025-26 standard for residential). Synchronises to whatever voltage / frequency reference is present — DNO in direct-feeding, BESS grid-forming in island. Continues generating in both modes as long as a reference exists. (3) V2G charger — grid-following in UK 2025-26 residential hardware (Wallbox Quasar). Commercial fleet bidirectional units emerging with grid-forming capability for V2X.energy + dnata DC. (4) Backup gateway / island-mode switching device — the coordination layer. Detects DNO loss; opens DNO contactors; switches N-E bond; signals BESS to transition to grid-forming; ensures other inverters re-synchronise to BESS as new reference. (5) UK 2025-26 vendor stacks — handle this transparently: Tesla Backup Gateway 2 + Powerwall 2/3; SolarEdge Backup Interface + StorEdge + SolarEdge PV inverters; GivEnergy Whole Home Backup + AIO + GivEnergy PV inverter; Enphase IQ8 microinverters + IQ System Controller (microinverter advantage — each one is grid-forming-capable). (6) Commissioning — simulated grid-loss test verifies the transition: BESS grid-forming activates within seconds, PV resynchronises, loads served. Cert evidence: per-inverter DoC noting grid-following or grid-forming + backup gateway DoC + commissioning test result.',
  },
  {
    question:
      'A new microgrid project (5 holiday cottages + shared community PV + BESS, no DNO connection) needs grid-forming. Why is grid-forming essential here?',
    options: [
      'Random',
      'Microgrid with NO DNO connection has no external voltage / frequency reference. Without a grid-forming inverter, all grid-following inverters would have nothing to synchronise to + couldn’t operate. The BESS inverter must be grid-forming + sets the microgrid’s voltage + frequency. Other PV / generator inverters synchronise to the BESS. Multiple BESS inverters in parallel need coordinated grid-forming control (typically one master + others as droop participants). Reg 826 PEI in permanent island mode — no DNO interaction.',
      'Mistake',
      'No need',
    ],
    correctAnswer: 1,
    explanation:
      'Microgrid / permanent off-grid scenario: (1) No DNO reference — the microgrid has no external grid. All voltage + frequency must come from local sources. Grid-following inverters CANNOT operate without an external reference. (2) Grid-forming requirement — at least one inverter (typically the BESS) MUST be grid-forming. Sets V + f for the microgrid. Other PV / wind / generator inverters synchronise to it. (3) BESS sizing — the grid-forming BESS must have enough power capability to support: (a) instantaneous load + (b) frequency-response transients + (c) overcurrent demand under fault conditions. Microgrid BESS oversized vs PV ratio (typically BESS power = peak load × 1.5-2). (4) Multi-BESS parallel — larger microgrids may have multiple BESS units. Coordination: either (a) master / slave (one BESS grid-forms, others follow) or (b) parallel droop (multiple grid-forming BESS share load via droop control + virtual inertia). Advanced topic; commercial microgrid systems implement. (5) Reg 826 application — microgrid is a PERMANENT island. Reg 826.1.1.1 protection in all modes applies (only the island mode); Reg 826.1.1.2.2 N-E switching is permanent (microgrid has its own N-E bond, no DNO); Reg 826.1.2.1 overcurrent based on inverter contribution alone; Reg 826.1.1.5 island-mode switching device may not be needed (no DNO to switch from). Off-grid system. (6) Hardware — commercial microgrid inverters: SMA Sunny Island, Schneider Conext XW Pro, Studer-Innotec, Victron Multiplus II, ABB PVS980. Residential off-grid: Victron, Sonnen, BYD. (7) UK 2025-26 use cases — holiday rental properties off-grid, remote farms, island / Highland sites where DNO connection unavailable / uneconomic, community resilience projects. Cert evidence: microgrid design study + per-inverter DoC + Reg 826 permanent island compliance summary + commissioning test results across operating modes.',
  },
];

const faqs = [
  {
    question: 'Why is grid-following the UK 2025-26 default for residential inverters?',
    answer:
      'Simplicity + cost + maturity. Grid-following inverters use a phase-locked loop (PLL) tracking the grid voltage reference — simpler hardware + control algorithm than grid-forming. ENA G98 / G99 type-test approval focused historically on grid-following behaviour + anti-islanding safety. The DNO grid provides the stable voltage / frequency reference; residential install needs only the simpler inverter. Cost £500-1,500 for a typical 3-5 kW grid-following inverter vs £2,000+ for grid-forming-capable equivalents. UK 2025-26 reality: 95%+ of residential PV / BESS / V2G inverters grid-following.',
  },
  {
    question: 'Does every UK 2025-26 BESS install include grid-forming capability?',
    answer:
      'No. Most UK 2025-26 BESS installs are direct-feeding only (no backup capability). Customer pays £3,000-5,000 for the BESS — simple self-consumption + ToU arbitrage — no backup gateway. To enable backup, customer adds: SolarEdge Backup Interface, Tesla Backup Gateway 2, GivEnergy Whole Home Backup, Enphase IQ System Controller etc. Hardware uplift £2-5k + commissioning. Customer choice at quote stage. Be explicit: ‘is your BESS for cost savings only, or do you also want backup during power cuts?’ — different products.',
  },
  {
    question: 'How long can a typical UK 2025-26 backup-capable PEI run in island mode?',
    answer:
      'Depends on BESS capacity vs load. Typical home: 10 kWh BESS, expected island load 0.5-1 kW continuous (critical loads only after load shedding) = 10-20 hours BESS-only. With PV contribution during daylight: indefinitely (subject to weather + battery cycling). Without PV (overnight outage): 10-20 hours then BESS depleted. UK 2025-26 power-cut typical duration: minutes to hours; rarely overnight. Most residential backup sizing assumes 6-12 hours coverage as the design target. Customer-facing: ‘your BESS keeps the lights on, fridge running, comms working for X hours; not unlimited’.',
  },
  {
    question: 'Can a grid-following inverter be firmware-upgraded to grid-forming?',
    answer:
      'Generally no — grid-forming requires different control algorithms + sometimes different hardware (faster current control loops, virtual inertia computation, expanded reactive power range). Most UK 2025-26 residential grid-following inverters cannot become grid-forming via firmware. Some vendor stacks support ‘backup retrofit’ where adding the backup gateway hardware unlocks grid-forming mode in the existing BESS inverter — but the underlying inverter hardware is grid-forming-capable from manufacture, just disabled until backup gateway present (Tesla, SolarEdge approach). Verify per vendor + per model.',
  },
  {
    question: 'Why does virtual inertia matter for the UK grid?',
    answer:
      'As conventional synchronous generation (coal, gas, nuclear) retires, the UK grid loses natural mechanical inertia. Frequency excursions become faster + harder to control. National Grid ESO procures synthetic inertia services from grid-scale BESS (Pillswood 100 MW + similar) with grid-forming + virtual inertia. UK 2025-26 residential virtual inertia is rare — not typically required by ENA G99 yet — but commercial BESS ≥ 1 MW increasingly mandated to support frequency response + virtual inertia. The technology direction is clear: as renewable penetration grows, virtual inertia capability becomes standard.',
  },
];

export default function RenewableEnergyModule10Section6() {
  const navigate = useNavigate();

  useSEO({
    title: 'Grid-forming vs grid-following inverters | Renewable Energy 10.6 | Elec-Mate',
    description:
      'Grid-following (UK 2025-26 default) vs grid-forming inverter operating modes. BS 7671 Chapter 82 island-mode requirements: Reg 826.1.1.2.2 N-E switching non-overlap, Reg 826.1.1.5 island-mode switching device. Virtual inertia. UK 2025-26 vendor backup gateways: Tesla Powerwall, SolarEdge Backup Interface, GivEnergy Whole Home Backup, Enphase IQ8.',
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
            eyebrow="Module 10 · Section 6 · BS 7671:2018+A4:2026 · Chapter 82 island-mode"
            title="Grid-forming vs grid-following inverters"
            description="The architectural choice that determines whether a PEI can island. Grid-following = synchronises to external reference (UK 2025-26 default for almost all residential PV / BESS / V2G). Grid-forming = sets voltage + frequency itself (required for island mode + microgrids). The Chapter 82 framework for both modes: Reg 826.1.1.2.2 N-E switching, Reg 826.1.1.5 island-mode switching device. Virtual inertia. UK 2025-26 vendor backup gateways."
            tone="yellow"
          />

          <TLDR
            points={[
              'Grid-following inverter: synchronises to an external voltage / frequency reference (DNO grid or grid-forming inverter). Cannot operate without a reference. UK 2025-26 default for ~95% of residential PV / BESS / V2G.',
              'Grid-forming inverter: sets voltage + frequency itself. Holds setpoints using droop control + virtual inertia. Required for island mode + microgrids. Typically the BESS inverter in a backup-capable PEI.',
              'Island-mode prerequisites: grid-forming inverter + Reg 826.1.1.2.2 N-E switching hardware + Reg 826.1.1.5 island-mode switching device + stored energy + load priority + safety verification + commissioning of grid-loss transition.',
              'Reg 826.1.1.2.2 N-E switching sequence: DNO line off → DNO neutral off → local N-E bond on. NON-OVERLAPPING. Backup gateway hardware enforces. Prevents circulating earth current + RCD false-trip.',
              'UK 2025-26 backup-capable hardware: Tesla Powerwall + Backup Gateway 2 (£2-4k uplift); SolarEdge StorEdge + Backup Interface; GivEnergy AIO + Whole Home Backup; Enphase IQ8 + IQ System Controller; Sonnen built-in.',
              'Mixed-inverter PEI: BESS grid-forming (when island); PV inverter + V2G charger grid-following + sync to BESS in island. Backup gateway coordinates transition.',
              'Island-mode short-circuit current dramatically lower than direct-feeding: only inverter contribution (≈1.1× rated). Reg 411 ADS via overcurrent may not work; RCDs become primary ADS (Reg 415.1 + local N-E per Reg 826.1.1.2.2). Reg 826.1.2.1 design.',
              'Virtual inertia: software algorithm emulating synchronous-generator mechanical inertia. Grid-forming inverters with virtual inertia stabilise frequency during disturbances. UK 2025-26: emerging in commercial BESS; rare residential.',
              'Microgrid (off-grid, no DNO): grid-forming BESS essential as primary voltage / frequency reference. Multi-BESS parallel via master / slave or droop control. Reg 826 permanent island.',
              'Cert evidence: per-inverter DoC noting grid-following / grid-forming + backup gateway DoC + Reg 826.1.1.2.2 N-E switching verification + commissioning grid-loss transition test + customer handover noting island operating mode + expected duration.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish grid-following + grid-forming inverter operating modes + the underlying control principles.',
              'Identify UK 2025-26 default (grid-following) and the deliberate design choice (grid-forming for island).',
              'Apply Reg 826.1.1.2.2 N-E switching sequence: DNO disconnection → local bond establishment, non-overlapping.',
              'Apply Reg 826.1.1.5 island-mode switching device requirement + hardware options.',
              'Apply Reg 826.1.2.1 to island-mode short-circuit current + the implications for protective device design.',
              'Identify UK 2025-26 backup-capable hardware: Tesla, SolarEdge, GivEnergy, Enphase, Sonnen + cost uplift.',
              'Configure mixed-inverter PEI architecture (BESS grid-forming + PV grid-following + V2G grid-following).',
              'Articulate virtual inertia + its growing importance as the UK grid renewables share increases.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Grid-following synchronises to a reference. Grid-forming IS the reference. The difference is the difference between an inverter that quits when the grid goes dark and one that keeps the lights on.
          </Pullquote>

          <ContentEyebrow>The two inverter modes</ContentEyebrow>

          <ConceptBlock
            title="Grid-following inverter — the UK 2025-26 default"
            plainEnglish="A grid-following (or grid-feeding, current-source) inverter synchronises to the existing voltage + frequency reference — the DNO grid or, in island mode, a grid-forming inverter. It uses a phase-locked loop (PLL) to track the reference + injects current at the same phase. It does NOT hold voltage / frequency itself. On loss of reference, it cannot operate — Reg 551.7.5 anti-islanding disconnects it."
            onSite="Virtually all UK 2025-26 residential PV inverters (SolarEdge, Solis, Huawei, Growatt, Fronius), BESS hybrid inverters in direct-feeding mode, and V2G chargers (Wallbox Quasar) are grid-following. ENA G98 / G99 type-test based on grid-following behaviour. Cost-efficient, mature, well-understood."
          >
            <p>Grid-following characteristics + UK 2025-26 reality:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Control principle</strong>
                — phase-locked loop (PLL) tracks grid voltage + frequency. Inverter
                injects current at same phase + frequency. Current-source behaviour
              </li>
              <li>
                <strong className="text-white">Reference
                  dependency</strong> — must have an external voltage reference to
                operate. Without it (DNO loss), inverter cannot synchronise + must
                disconnect per Reg 551.7.5
              </li>
              <li>
                <strong className="text-white">Reactive power</strong>
                — typically grid-following inverters operate at near-unity power
                factor by default; reactive power control by EMS / ENA G99 directive
              </li>
              <li>
                <strong className="text-white">Grid services</strong>
                — limited capability: voltage / frequency support via reactive
                injection + power curtailment; cannot provide black-start or
                synchronous-inertia services
              </li>
              <li>
                <strong className="text-white">UK 2025-26 default</strong>
                — 95%+ residential PV / BESS / V2G inverters grid-following.
                SolarEdge, Solis, Huawei, Growatt, Fronius, Enphase IQ (microinverters),
                Wallbox Quasar
              </li>
              <li>
                <strong className="text-white">ENA approval</strong>
                — type-tested per ENA G98 (≤16 A per phase) or G99 (larger);
                BS EN 50549 grid-following inverter standard; IEC 62116 anti-islanding
                test
              </li>
              <li>
                <strong className="text-white">Cost</strong> — £500-1,500
                for typical 3-5 kW residential PV inverter; £2,000-5,000 for
                hybrid PV + BESS (still grid-following in direct-feeding mode)
              </li>
              <li>
                <strong className="text-white">Reg 551.7.5
                  anti-islanding</strong> — verified by built-in loss-of-mains
                detection (RoCoF + voltage / frequency window — G99 disallows Vector
                Shift for type-tested generation, so RoCoF is the required method on
                the type-tested inverters used in virtually all LCT installs; Vector
                Shift is legacy / non-type-tested only). Disconnects
                inverter from grid within typical 200-500ms on DNO loss
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — product DoC declares grid-following + ENA type approval +
                anti-islanding method + commissioning record (simulated grid-loss
                test verifying disconnect within ENA specified time)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Grid-forming inverter — the island-mode + microgrid enabler"
            plainEnglish="A grid-forming (or voltage-source, virtual-synchronous-machine) inverter HOLDS voltage + frequency at specified setpoints. Acts as the voltage reference for its local network. Uses droop control (V drops with reactive load, f drops with real-power load) + virtual inertia (electronic emulation of synchronous-generator response). UK 2025-26 typically the BESS inverter in a backup-capable PEI, or the master inverter in a microgrid."
            onSite="UK 2025-26 backup-capable hardware that provides grid-forming: Tesla Powerwall + Backup Gateway 2; SolarEdge StorEdge + Backup Interface; GivEnergy AIO + Whole Home Backup; Enphase IQ8 + IQ System Controller; Sonnen (built-in island in some models). Cost uplift £2-5k vs grid-following-only equivalent. Required for island operation per Reg 826.1.1.5."
          >
            <p>Grid-forming characteristics + UK 2025-26 hardware:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Control principle</strong>
                — voltage-source behaviour. Inverter HOLDS V + f at setpoints
                (230 V ±10%, 50 Hz ±1%). Droop control + virtual inertia + reactive
                power management
              </li>
              <li>
                <strong className="text-white">No reference
                  dependency</strong> — doesn’t need external reference; IS the
                reference. Can operate in standalone island or as master in
                microgrid
              </li>
              <li>
                <strong className="text-white">Droop control</strong>
                — V droops with reactive current load (Q–V droop); f droops
                with real power load (P–f droop). Allows multiple grid-forming
                inverters to share load proportionally
              </li>
              <li>
                <strong className="text-white">Virtual inertia</strong>
                — algorithm emulates mechanical kinetic energy of synchronous
                generator. Provides frequency-response during disturbances. Important
                for grid-scale stability + microgrid stability
              </li>
              <li>
                <strong className="text-white">Reactive power</strong>
                — broader range than grid-following; provides reactive support
                + voltage regulation in island
              </li>
              <li>
                <strong className="text-white">UK 2025-26 residential
                  hardware</strong> — Tesla Powerwall + Backup Gateway 2;
                SolarEdge StorEdge + Backup Interface; GivEnergy AIO + Whole Home
                Backup; Enphase IQ8 + IQ System Controller; Sonnen
              </li>
              <li>
                <strong className="text-white">Cost uplift</strong>
                — £2,000-5,000 over equivalent grid-following-only BESS.
                Backup gateway hardware + commissioning of island operation
              </li>
              <li>
                <strong className="text-white">UK 2025-26 commercial /
                  utility</strong> — grid-forming BESS at 1 MW+ scale
                increasingly mandated by National Grid ESO + DNOs for frequency
                response + virtual inertia services. Pillswood 100 MW BESS
                (Yorkshire, Habitat) is an example
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — product DoC declares grid-forming + virtual inertia
                capability + droop characteristics + commissioning of island-mode
                operation + Reg 826.1.1.2.2 N-E switching verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.5 — Switching device for island mode"
            clause="Switching devices for island mode, introduced in Regulation 824.2, shall comply with Regulation 512.1.2 and their relevant product standard, and be suitable for isolation."
            meaning="Reg 826.1.1.5 mandates the island-mode switching device as part of any island-capable PEI. The device performs the isolation between DNO supply + local PEI when transitioning to island mode. UK 2025-26 reality: this is the BACKUP GATEWAY hardware — Tesla Backup Gateway 2, SolarEdge Backup Interface, GivEnergy Whole Home Backup, Enphase IQ System Controller, Schneider EVlink Pro. The device integrates: (a) main DNO contactors (line + neutral, with controlled non-overlap sequencing per Reg 826.1.1.2.2); (b) local N-E bond switching device; (c) loss-of-mains detection + transition logic; (d) communication with grid-forming inverter (signal to transition to grid-forming mode); (e) reverse-transition logic (when DNO restored: synchronisation check + reconnect). Reg 512.1.2 requires the switching device be suitable for isolation (Reg 537.2 isolation rating). Product standard: BS EN 60947 series for the switching components; vendor product-specific approval for the integrated backup gateway unit. Cert evidence: backup gateway DoC + ENA approval if applicable + commissioning test of grid-loss + reverse transition + isolation verification (Reg 643 testing including the backup gateway). UK 2025-26 typical: vendor-integrated backup gateway is a single product unit + a single commissioning step in the wider PEI install."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Island-mode mechanics + commissioning</ContentEyebrow>

          <Pullquote>
            The transition from grid-connected to island is the most safety-critical sequence in any PEI. Three contactors, one bond change, non-overlapping timing — the backup gateway hardware enforces this; the commissioning test verifies it.
          </Pullquote>

          <ConceptBlock
            title="Reg 826.1.1.2.2 N-E switching sequence in detail"
            plainEnglish="When transitioning from direct-feeding mode to island mode, the backup gateway must execute a specific switching sequence: disconnect DNO line conductors, disconnect DNO neutral, establish local N-E bond — in that order, WITHOUT overlap between the DNO N-E bond and the local N-E bond. The non-overlap requirement prevents circulating earth current + RCD false-trip. The whole sequence completes in <500 ms typical."
            onSite="UK 2025-26 backup gateway hardware (Tesla Backup Gateway 2, SolarEdge Backup Interface, GivEnergy Whole Home Backup, Enphase IQ System Controller) implements this sequence internally with interlocked contactors. Commissioning verifies the sequence via simulated grid-loss test + N-E continuity measurement in each state."
          >
            <p>The full transition sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">T=0: DNO loss
                  detected</strong> — backup gateway detects voltage drop /
                frequency excursion / vector shift / ROCOF outside threshold.
                Detection within 50-100ms
              </li>
              <li>
                <strong className="text-white">T+0-50ms: DNO line
                  disconnects</strong> — backup gateway opens DNO line
                contactor(s). Single-phase or 3-phase as applicable. PEI now electrically
                detached from DNO line(s)
              </li>
              <li>
                <strong className="text-white">T+50-100ms: DNO neutral
                  disconnects</strong> — backup gateway opens DNO neutral
                contactor. PEI now has NO N-E bond. RCDs cannot operate in this
                state — must be brief. Critical safety window
              </li>
              <li>
                <strong className="text-white">T+100-150ms: Local N-E
                  bond establishes</strong> — backup gateway closes local neutral
                switch device that bonds PEI neutral bar to PEI PE bar / local earth
                electrode. PEI now has its own N-E reference. RCDs operational again
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.2.2
                  non-overlap</strong> — the gap between steps (DNO N off, local
                N-E on) prevents BOTH bonds being simultaneously in circuit. If
                overlap occurred, circulating earth current + RCD false-trip + risk
                of unequal earth potential
              </li>
              <li>
                <strong className="text-white">T+200-500ms:
                  Grid-forming activates</strong> — BESS inverter receives
                command from backup gateway, transitions from grid-following to
                grid-forming mode. Sets V + f for the island. PV + V2G inverters
                resynchronise to BESS within 1-2 seconds
              </li>
              <li>
                <strong className="text-white">Reverse transition
                  (DNO restored)</strong> — backup gateway detects stable DNO
                supply for 30-60s minimum; signals BESS to match V + f phase to
                DNO; opens local N-E bond; closes DNO neutral; closes DNO line;
                BESS resumes grid-following. Synchronisation check at each step
              </li>
              <li>
                <strong className="text-white">Commissioning
                  test</strong> — simulated grid-loss (open DNO main switch);
                measure transition time end-to-end; measure N-E continuity in
                direct-feeding state (DNO bond), brief no-bond window, island
                state (local bond); measure island-mode voltage / frequency
                stability under typical load; reverse transition + DNO
                resynchronisation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Island-mode protective device design (Reg 826.1.2.1)"
            plainEnglish="In island mode, short-circuit current is dramatically lower than in direct-feeding mode — only inverter contribution (≈1.1× rated), not DNO’s 6-25 kA. Many MCBs that trip instantly in direct-feeding mode may NOT achieve Reg 411 ADS times on a downstream fault in island. RCDs become the primary ADS path. Reg 826.1.2.1 requires explicit consideration of island min-fault current at every protective device location."
            onSite="Design implication: PEI overcurrent study must cover BOTH direct-feeding max PSCC (cable + breaker breaking capacity) AND island min-fault current (ADS achievability per circuit). RCD architecture per Reg 415.1 + Reg 551.4.2 becomes the primary defence in island. Commissioning: verify RCD operation in island via deliberate fault simulation or controlled test."
          >
            <p>Island-mode protective device considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Direct-feeding PSCC</strong>
                — UK 2025-26 typical 6-25 kA at LV consumer position. DNO
                contribution dominates. Breaking capacity check + Reg 434.5.1
                conditions verified
              </li>
              <li>
                <strong className="text-white">Island PSCC</strong>
                — only inverter contribution. 5 kW BESS → ≈25 A peak;
                7 kW BESS → ≈35 A peak. Dramatically lower than direct-feeding
              </li>
              <li>
                <strong className="text-white">MCB trip behaviour
                  in island</strong> — a 10 A Type B MCB needs 30-50 A to trip
                in 0.1s; available 25-35 A marginal. A 32 A circuit downstream may
                not trip in time. Reg 411 ADS may not be achievable via overcurrent
                alone
              </li>
              <li>
                <strong className="text-white">RCD as primary
                  ADS</strong> — Reg 415.1 30 mA additional protection becomes
                the primary ADS path in island. RCDs operate via the local N-E
                bond per Reg 826.1.1.2.2; trip time 40ms at 5× In on residual
                current
              </li>
              <li>
                <strong className="text-white">Inverter self-
                  protection</strong> — grid-forming BESS inverter detects
                persistent fault (overcurrent, undervoltage) + self-disconnects.
                Backup ADS layer
              </li>
              <li>
                <strong className="text-white">Reg 551.4.2
                  effectiveness</strong> — RCD effectiveness across all source
                combinations including island. Commissioning verifies RCD operation
                in island via controlled test
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — PEI overcurrent study + per-circuit island-mode minimum-fault
                analysis + RCD effectiveness in island commissioning + customer
                handover noting island operating-mode protective characteristics
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.2.1 — Overcurrent magnitude in island mode"
            clause="Overload and short-circuit currents shall be determined at every point of the PEI where a protective device is installed: (a) for all possible configurations of each type of PEI; and (b) for situations corresponding to the minimum and maximum current magnitudes. NOTE 1: The operating mode influences greatly the overcurrent magnitude. In particular, in island mode, the short-circuit current will be much lower than in direct-feeding mode."
            meaning="Reg 826.1.2.1 + its NOTE 1 codify the island-mode short-circuit reality. The DNO supply provides large prospective short-circuit current; remove DNO + only inverter contribution remains; current-limited bidirectional inverters limit at ≈1.1× rated. A circuit that comfortably achieves Reg 411 ADS via overcurrent in direct-feeding may not achieve it in island. The reg requires explicit consideration of this asymmetry. UK 2025-26 design practice: (1) Calculate max PSCC in direct-feeding for breaker breaking capacity + cable thermal protection (this is the high-current case); (2) Calculate min fault current in island per circuit for ADS verification (this is the low-current case where Reg 411 may not be achievable); (3) Where ADS not achievable via overcurrent in island, rely on Reg 415.1 30 mA RCD + the local N-E bond per Reg 826.1.1.2.2 for fault-path completion; (4) Verify at commissioning by simulated fault in island + RCD operation. Cert evidence: PEI overcurrent study covering both extremes + commissioning record of RCD verification in island. The PEI EIC notes the island-mode protective device strategy + customer handover acknowledges the protective architecture in each mode."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <GridFormingVsFollowing caption="Grid-following vs grid-forming inverters — why standard PV/BESS inverters must trip on loss of mains, and how a grid-forming inverter can instead run the building as an island during an outage." />

          <SectionRule />

          <Scenario
            title="Customer adds backup capability to existing PV + BESS — SolarEdge Backup Interface retrofit"
            situation="Customer with 5 kWp PV + 10 kWh SolarEdge Energy Bank BESS installed 2022. No backup gateway. Customer has experienced 3 power cuts in the last year (rural-fringe semi); wants the system to keep the lights + fridge running during outages. Confirms with installer that BESS doesn’t currently provide backup."
            whatToDo="Backup retrofit workflow. (1) Hardware: SolarEdge Backup Interface (compatible with existing SolarEdge StorEdge inverter). Cost £2,500-3,500 retail. Unlocks grid-forming mode in existing BESS inverter (no inverter replacement needed). (2) Install: Backup Interface sits between the DNO supply tail and the main consumer unit. Internally contains: DNO line + neutral contactors (with non-overlap sequencing per Reg 826.1.1.2.2); local N-E bond switch; loss-of-mains detection; communication interface to BESS inverter. Section 537.2 isolation rating. (3) Cable + circuit changes: split the consumer unit into critical-loads circuit (backed up during island) + non-critical (shed in island). Critical loads: lighting, fridge, freezer, comms / WiFi, gas-boiler controls (if applicable). Non-critical: EV charger, immersion heater, electric oven, electric shower. Backup Interface routing handles the segregation. (4) BS 7671 install: Reg 537.2 isolation + Reg 528 segregation + Reg 411 ADS + Reg 415.1 RCD architecture maintained. Update Reg 826.1.1.4 multi-source isolation procedure (now includes Backup Interface). (5) Commissioning: simulated grid-loss test — open DNO main switch + verify Backup Interface transitions PEI to island within specified time, BESS grid-forming activates, PV resynchronises to BESS, critical loads remain energised, non-critical disconnected; measure N-E continuity in each state per Reg 826.1.1.2.2; verify duration (BESS depletion test under representative critical load); reverse transition (restore DNO + verify resync + reconnect); RCD operation in island via controlled test per Reg 551.4.2. (6) Customer handover: documented critical-loads list + expected island duration (e.g. 12-20 hours at 0.5-1 kW critical load) + non-critical shed behaviour + customer-facing app notification (SolarEdge monitoring portal shows island events). (7) Cert evidence: integrated PEI EIC update + Backup Interface DoC + Reg 826.1.1.2.2 commissioning verification + customer-acknowledged operating mode + island-mode protective device analysis. (8) Cost — hardware £2,500-3,500 + install 1-2 days £1,500-2,500 + commissioning + cert £500. Total £4,500-6,500 retrofit."
            whyItMatters="UK 2025-26 backup retrofit is increasingly common as customers experience more power cuts (rural-fringe + climate-driven outages). The hardware-software path is well-trodden by major vendors. The installer scope is substantial: not just hardware swap-in but consumer unit reorganisation + island-mode protective design + commissioning verification. The customer-facing value is clear: keep the lights on during power cuts. Honest expectation-setting on duration matters: ‘your BESS keeps critical loads for X hours, not unlimited’."
          />

          <Scenario
            title="Off-grid holiday cottage microgrid — grid-forming BESS as primary reference"
            situation="Renovation of a remote Highland holiday cottage with no DNO connection (cost-prohibitive overhead line extension £300k+). Customer: 8 kWp PV + 30 kWh BESS + small backup diesel generator (2 kVA) + electric heat pump (5 kW). Off-grid operation year-round; occupancy seasonal."
            whatToDo="Off-grid microgrid design under Reg 826 permanent island. (1) Grid-forming BESS — essential. Hardware: Victron Multiplus II 5 kVA grid-forming inverter + Victron BlueSolar / SmartSolar MPPT + Pylontech or BYD LFP BESS rack. SMA Sunny Island or Schneider Conext XW Pro are alternatives. Grid-forming holds V + f for the microgrid. (2) PV inverter — grid-following (Victron MPPT or SMA Sunny Boy compatible). Synchronises to BESS grid-forming. Produces PV when sun + voltage reference present (always present from BESS). (3) Diesel backup generator — manual start + automatic transfer; charges BESS during extended cloud / heavy load. Auto-stop when BESS reaches 80% SoC. (4) Heat pump — controlled via EMS to operate when PV + BESS reserves available; load-shed during low solar + low BESS. (5) Reg 826 permanent island compliance — Reg 826.1.1.1 protection in (only) island mode; Reg 826.1.1.2 system earthing with own earth electrode (TT or TN-S local arrangement); Reg 826.1.1.2.2 N-E bond locally established + maintained (no DNO transition); Reg 826.1.1.5 island-mode switching not strictly needed (no DNO); Reg 826.1.2.1 overcurrent based on BESS inverter contribution alone (≈5 kVA × 1.1 ≈ 25 A peak fault current); Reg 415.1 RCDs primary ADS; Reg 411 ADS via overcurrent challenging at small loads, RCD compensates. (6) Commissioning — Reg 643 Part 6 + RCD operation in island + BESS grid-forming startup + PV resync + diesel auto-start sequence + heat pump scheduling + load priority in low-SoC scenarios. (7) Cert evidence — off-grid microgrid PEI EIC + Section 712 + Chapter 57 + Section 551 (BESS as generating set + diesel as combustion-engine generating set per Reg 551.1.1(a)) + Reg 826 permanent island compliance summary + Victron / SMA / Schneider product DoC + customer handover with island operating modes + load-shedding behaviour + diesel maintenance schedule. Capex: £30-50k hardware + £5-10k civils + £5-10k labour + commissioning."
            whyItMatters="UK 2025-26 off-grid microgrids are niche but real — Highland holiday cottages, remote farms, island sites, community-resilience pilots. The grid-forming requirement is non-negotiable. Section 551 + Chapter 82 permanent-island compliance + commissioning rigour matters because there’s no DNO fallback. Customer-facing economics: £30-50k off-grid solution vs £100-300k DNO connection extension; off-grid wins on remote sites. Cert evidence bundle is substantial — the microgrid IS the entire electrical install."
          />

          <CommonMistake
            title="Selling BESS as backup without backup gateway"
            whatHappens="Installer quotes a PV + BESS install. Customer asks ‘will it keep the lights on during a power cut?’. Installer answers ‘yes, the BESS will power your home’. Default-grid-following BESS without backup gateway shuts down on DNO loss per Reg 551.7.5. Customer’s next power cut: lights go off; BESS sits idle. Customer complaint; reputation damage."
            doInstead="Be explicit at quote stage. Default BESS = self-consumption + ToU arbitrage; NOT backup. Backup requires: backup gateway hardware (£2-5k uplift) + commissioning of grid-forming mode + critical-loads circuit segregation in consumer unit + Reg 826.1.1.2.2 N-E switching verification. Two products: (a) cost-saving BESS (no backup) — typical £3-5k; (b) backup-capable BESS — typical £6-10k. Quote both options; let customer choose based on their priority. Cert evidence: customer-acknowledged operating mode + expected island duration if applicable."
          />

          <CommonMistake
            title="Forgetting island-mode RCD verification at commissioning"
            whatHappens="Installer completes backup retrofit + verifies the BESS transitions to grid-forming on simulated DNO loss + sees lights stay on. Cert issued. Customer experiences a real power cut + at some point during island operation a downstream fault occurs — RCD doesn’t trip because the N-E bond wasn’t correctly verified. Persons at risk; insurance claim; legal exposure."
            doInstead="Reg 551.4.2 + Reg 826.1.1.2.2 require RCD effectiveness across ALL source combinations including island mode. Commissioning test in island: (1) Verify N-E bond continuity in island mode via multimeter measurement (local neutral bar ↔ local PE bar continuity < ~0.5 Ω); (2) Induce a controlled residual current via RCD test instrument or controlled appliance simulation; (3) Verify RCD operates within Reg 415.1 specified time; (4) Repeat across each source combination (PV alone in island, PV + BESS, BESS alone, V2G + BESS, etc.). Document each test result in the cert evidence bundle. Don’t certify backup capability without verified island-mode RCD operation."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Grid-following inverter: synchronises to external voltage / frequency reference (DNO grid or grid-forming inverter); cannot operate without reference. UK 2025-26 default for ~95% of residential PV / BESS / V2G.',
              'Grid-forming inverter: SETS voltage + frequency itself via droop control + virtual inertia; IS the reference. Required for island mode + microgrids. Typically the BESS inverter in backup-capable PEI.',
              'Island-mode prerequisites: grid-forming inverter + Reg 826.1.1.2.2 N-E switching hardware + Reg 826.1.1.5 island-mode switching device + stored energy + load priority + safety verification + commissioning of grid-loss transition.',
              'Reg 826.1.1.2.2 N-E switching sequence: DNO line off → DNO neutral off → local N-E bond on. NON-OVERLAPPING. Whole sequence <500ms typical.',
              'UK 2025-26 backup-capable hardware: Tesla Powerwall + Backup Gateway 2 (£2-4k); SolarEdge StorEdge + Backup Interface (£2.5-3.5k); GivEnergy AIO + Whole Home Backup (£2-3k); Enphase IQ8 + IQ System Controller (£2.5-4k); Sonnen built-in.',
              'Mixed-inverter PEI: BESS grid-forming (when in island); PV inverter + V2G charger grid-following + sync to BESS in island. Backup gateway coordinates transition.',
              'Island-mode short-circuit current dramatically lower than direct-feeding: only inverter contribution ≈ 1.1× rated (e.g. 5 kW BESS ≈ 25 A peak). Reg 411 ADS via overcurrent may not work in island.',
              'Reg 826.1.2.1: overcurrent calculation at every PEI point for all configurations + min + max current magnitudes. NOTE 1 explicitly recognises island-mode low-current asymmetry.',
              'Reg 415.1 30 mA RCD becomes primary ADS path in island; operates via local N-E bond per Reg 826.1.1.2.2; commissioning verifies RCD operation in island per Reg 551.4.2.',
              'Virtual inertia: software emulation of synchronous-generator mechanical inertia. UK 2025-26 emerging in commercial / grid-scale BESS (≥1 MW); rare residential currently.',
              'Microgrid (off-grid, no DNO): grid-forming BESS essential as primary V / f reference. Multi-BESS parallel via master / slave or droop control. Reg 826 permanent-island PEI.',
              'Cert evidence: per-inverter DoC noting grid-following / grid-forming + backup gateway DoC + Reg 826.1.1.2.2 N-E switching verification + commissioning grid-loss + reverse transition + RCD in island + customer handover with operating modes + duration.',
              'Customer-facing honesty: default BESS = self-consumption only, NOT backup. Backup requires explicit hardware + design + cost uplift. Quote separately; let customer choose.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                10.5 V2G — Vehicle-to-Grid
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                10.7 Multi-source coordination at scale
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
