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
import { AntiIslandingDecisionTree } from '@/components/study-centre/diagrams/renewableM11';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm11s7-reg-551-7-5',
    question:
      'What is Reg 551.7.5 verbatim, and why is it the categorical safety anchor for generating sets?',
    options: [
      'Random',
      '"Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4." Anti-islanding is non-negotiable: if a generator keeps exporting to a "dead" DNO supply, engineers servicing the network can be killed by an unexpectedly live cable. The NOTE confirms G98 compliance ≤16 A per phase deems Reg 551.7 met',
      'Not safety critical',
      'Optional',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.5 verbatim from BS 7671: "Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4." The categorical safety requirement: anti-islanding protection MUST exist for any generating set that may operate in parallel with the DNO supply. Why: if a generator continues to export when the DNO supply is lost (line down, fault clearance, planned outage), the DNO\'s network downstream of the disconnection point is unexpectedly live — DNO engineer servicing what should be a dead network can be fatally shocked. The NOTE: "For a generating set with an output not exceeding 16 A intended to operate in parallel with a system for distribution of electricity to the public, the requirements of Regulation 551.7 are deemed to be met by compliance with the relevant requirements of EREC G98." This deems G98 fast-track compliant. M11 §7 covers the mechanics + DNO-witnessed test methodology in depth.',
  },
  {
    id: 'm11s7-loss-of-mains',
    question:
      'What is "Loss of Mains" (LoM) protection, and what methods detect it?',
    options: [
      'Random',
      'LoM = the protection that detects the public supply has been lost and disconnects the generating set. Methods: (1) Vector shift — sudden phase angle jump in voltage waveform when DNO disconnects. Important: G99 disallows Vector Shift for type-tested generation, so RoCoF (with voltage / frequency protection) is the standard required LoM method for the type-tested inverters used in virtually all LCT installs (PV, BESS, micro-CHP); VS is legacy and only appears on older or non-type-tested sites. (2) ROCOF — Rate of Change of Frequency, frequency drift when generation no longer matches load. (3) Voltage / frequency deviation — measured against Reg 551.7.4 declared values. (4) Active anti-islanding — inverter injects small disturbances + watches for grid response; absence of response = no grid. ENA EREC G99 specifies test methodology',
      'Same as RCD',
      'No methods',
    ],
    correctIndex: 1,
    explanation:
      'Loss of Mains (LoM) protection detects loss of the public supply + disconnects the generating set per Reg 551.7.5. CRITICAL G99 caveat: G99 (Issue 2, 2025) disallows Vector Shift for type-tested generation — the 2018 G99 amendment (implementing the Authority\'s DC0079 decision) removed VS and introduced RoCoF requirements for type-tested generation. So for the type-tested G98/G99 inverters used in virtually all LCT installs (PV, BESS, micro-CHP), the required LoM method is RoCoF plus voltage / frequency protection, NOT Vector Shift. Vector Shift is now legacy and only appears on some older or non-type-tested installations (e.g. larger sites with bespoke G99 protection relays). The methods below are described for completeness; apply the caveat above when selecting LoM for a real install. Detection methods: (1) Vector shift — sudden phase angle jump in voltage waveform when DNO disconnects (typical threshold 6-12° shift). Fast (~100 ms) but disallowed by G99 for type-tested generation (legacy / non-type-tested sites only). (2) ROCOF (Rate of Change of Frequency) — frequency drifts when generation no longer matches load post-disconnection. Typical threshold 0.5-1.0 Hz/s. The standard required LoM method for type-tested generation under G99. (3) Voltage / frequency deviation — measured against Reg 551.7.4 declared values; UK grid 230/400 V ±10%, 50 Hz ±0.5 Hz typically. (4) Active anti-islanding — inverter injects small disturbances (small frequency or voltage perturbations) + watches for grid response. Grid present = response detected; grid absent = no response → inverter trips. (5) Sandia frequency shift, slip-mode frequency shift, impedance measurement — variants of active methods. (6) ENA EREC G99 specifies test methodology — DNO-witnessed simulated grid-loss test verifies LoM operates within the required time. (7) Combined methods — modern inverters use multiple methods in parallel for reliability. Cert evidence: LoM type per manufacturer DoC + commissioning test result.',
  },
  {
    id: 'm11s7-erec-g99-process',
    question:
      'What is the EREC G99 anti-islanding test process at commissioning?',
    options: [
      'Random',
      'EREC G99 commissioning includes a DNO-witnessed (or manufacturer-verified, depending on agreement) simulated grid-loss test. Sequence: (1) DNO + installer agree test date. (2) Generation operating in parallel + exporting per design. (3) Test method: physical disconnection at point of supply (DNO operates), or simulated via switching adjacent to the generator. (4) Verify generator disconnects within G99-specified time (typically <1 second from grid loss). (5) Repeat for multiple conditions if required. (6) DNO commissioning certificate issued',
      'No test',
      'Customer tests',
    ],
    correctIndex: 1,
    explanation:
      'EREC G99 anti-islanding commissioning test process: (1) Pre-test agreement — installer + DNO agree test date + scope; some DNOs witness physically, others accept manufacturer-verified test + reported result. (2) Generation operating in parallel + exporting per design — generator (PV / BESS / wind / CHP) connected to DNO + exporting at design current. (3) Test method — primary: physical disconnection at point of supply (DNO operator opens supply switch); alternative: simulated via adjacent switching (e.g. main switch in customer\'s supply panel). Care to ensure safe test conditions. (4) Verify generator disconnects — within G99-specified time (typically <1 s from grid loss to generator output zero). Inverter / generator controller anti-islanding operates per Reg 551.7.5. (5) Multiple test conditions if required — different load levels, different time of day, multiple sources operating in PEI. (6) Test record — DNO commissioning certificate issued; G99 reference attached; cert evidence bundle records the test method + result + DNO sign-off. (7) UK 2025-26 reality: most G99 generators are inverter-coupled (PV / BESS / modern wind) — anti-islanding is built into inverter electronics; manufacturer DoC declares G99 compliance + factory test results. DNO may accept this + simulate test rather than physical disconnection. Larger / synchronous generators typically require physical disconnection test.',
  },
  {
    id: 'm11s7-vector-rocof',
    question:
      'Vector shift vs ROCOF — what is the difference in detection mechanism?',
    options: [
      'Same thing',
      'Vector shift = detection based on sudden change in PHASE ANGLE of the voltage waveform. When DNO disconnects, the generator\'s voltage phase shifts relative to its loaded steady-state position (load is no longer balanced by grid). Typical trip threshold 6-12° shift. ROCOF = detection based on RATE OF CHANGE OF FREQUENCY. After DNO disconnect, the generator\'s frequency drifts (generation no longer matches load). Typical threshold 0.5-1.0 Hz/s. Vector shift = fast (~100 ms); ROCOF = slightly slower but more selective on grid frequency disturbances. Note: G99 disallows Vector Shift for type-tested generation, so RoCoF (with voltage / frequency protection) is the required LoM method for the type-tested inverters in virtually all LCT installs; VS is legacy / non-type-tested sites only',
      'No difference',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'Vector shift vs ROCOF — two distinct detection mechanisms. G99 caveat up front: G99 (Issue 2, 2025) disallows Vector Shift for type-tested generation — the 2018 amendment (Authority DC0079 decision) removed VS and mandated RoCoF. So for the type-tested inverters used in virtually all LCT installs (PV, BESS, micro-CHP), RoCoF (with voltage / frequency protection) is the required LoM method, not Vector Shift; VS is legacy and only on older or non-type-tested sites. (1) Vector shift — measures the PHASE ANGLE of the generator\'s voltage waveform vs a reference (typically the previous cycle\'s zero crossing). When DNO disconnects, the load is no longer balanced by grid + the generator\'s phase angle jumps as it tries to balance against just the local load. Sudden shift indicates disconnection. Trip thresholds typically 6-12° depending on settings. Fast detection (~50-100 ms) but disallowed by G99 for type-tested generation (legacy / non-type-tested sites only). (2) ROCOF — measures the RATE OF CHANGE OF FREQUENCY (df/dt). After DNO disconnect, the generator frequency drifts because generation doesn\'t exactly match load (small imbalance → frequency drift). Typical trip threshold 0.5-1.0 Hz/s. Slightly slower (needs ~100-200 ms to compute reliable df/dt). More selective on grid frequency events (real frequency disturbances on the grid show different df/dt patterns vs an actual disconnect). The standard required LoM method for type-tested generation under G99. (3) Combined approach — modern type-tested inverters use RoCoF + voltage / frequency + active methods in parallel; trip on whichever triggers first (Vector Shift not used on type-tested units). (4) DNO settings — UK 2025-26 DNOs have published recommended ROCOF thresholds to balance false-trip rate vs detection time. Cert evidence: settings per manufacturer DoC + commissioning test results.',
  },
];

const quizQuestions = [
  {
    question:
      'A 5 kW residential PV install. Does it trigger EREC G98 or G99? What does that mean for anti-islanding?',
    options: [
      'Random',
      'G98 fast-track. ≤16 A per phase generation = Type A small-scale. For a 5 kW single-phase PV inverter ~22 A AC rated — JUST EXCEEDS 16 A so technically G99 — most 5 kW inverters are around 22-25 A; verify exactly. If 16 A or below: G98 + Reg 551.7.5 NOTE deems compliant via G98 + manufacturer\'s factory test + DNO post-installation notification. If >16 A: G99 formal application + DNO-witnessed (or manufacturer-verified) test at commissioning. Cert evidence: G98 / G99 reference + manufacturer DoC + test record',
      'Always G99',
      'No EREC',
    ],
    correctAnswer: 1,
    explanation:
      'EREC G98 vs G99 for 5 kW residential PV: (1) G98 Type A threshold — ≤16 A per phase generation. (2) 5 kW single-phase PV inverter — rated AC current ~22-25 A depending on manufacturer + system voltage. Most exceed 16 A by 5-10 A. (3) Threshold technically: 16 A per phase = ~3.7 kW continuous at 230 V single-phase. So 5 kW exceeds the G98 threshold. (4) G99 application — required for PV >16 A per phase. Formal pre-installation application; DNO reviews + issues connection offer; install per offer; commissioning includes anti-islanding test (DNO-witnessed or manufacturer-verified per DNO\'s requirement). (5) G98 path — only applicable for smaller PV (≤3.6 kW typical single-phase). Post-installation notification (after install); no pre-installation DNO approval needed; Reg 551.7.5 NOTE deems compliant via G98 + manufacturer factory test on the inverter. (6) Practical UK 2025-26 — most residential PV (3-7 kWp) requires G99. Larger systems + commercial firmly G99. Smaller (< 3.6 kWp single-phase) may qualify for G98. (7) Cert evidence bundle: G98 / G99 reference + manufacturer DoC declaring anti-islanding compliance + commissioning test record + DNO connection offer (G99) or post-installation notification (G98).',
  },
  {
    question:
      'What does Reg 551.7.4 mean by "deviation of the voltage or frequency at the supply terminals from declared values"?',
    options: [
      'Random',
      'Reg 551.7.4 references the voltage + frequency tolerance windows. UK grid: 230 V ±10% at LV (207-253 V single-phase); 400 V ±10% three-phase; 50 Hz ±0.5 Hz typical operating range. Wider tolerances allowed briefly during grid events. Generator protection (inverter control) monitors against these limits. If voltage or frequency drifts beyond limits, generator trips on under/over-voltage + under/over-frequency protection. Reg 551.7.5 says this trip must prevent reconnection in event of loss of supply',
      'No tolerances',
      'Customer sets',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.7.4 voltage + frequency deviation context: (1) UK grid declared values — 230 V single-phase (line to neutral); 400 V three-phase (line to line); 50 Hz nominal frequency. (2) Tolerance windows — Reg 27 of Electricity Safety, Quality + Continuity Regulations (ESQCR) 2002: voltage 230 V +10% / −6% at customer\'s terminals (216-253 V) at LV; frequency 50 Hz ±1% typical operating (49.5-50.5 Hz) with wider envelope during grid events. (3) Generator protection settings — inverter / generator controller monitors voltage + frequency at supply terminals; if drifts beyond limits, internal protection trips. (4) Reg 551.7.4 + 551.7.5 — if voltage / frequency deviates beyond declared values, this can indicate loss of supply or grid disturbance; generator must disconnect + must not reconnect until grid is back within tolerance. (5) EREC G99 settings — DNO publishes recommended under/over-voltage + under/over-frequency settings per the engineering recommendation. Typical: undervoltage 184 V (80%) for 1.5 s; overvoltage 264 V (115%) for 1 s; underfrequency 47 Hz for 1.5 s; overfrequency 52 Hz for 1 s. (6) Anti-islanding interaction — voltage / frequency monitoring is one of the LoM methods (slower than vector shift / ROCOF but reliable + categorical for sustained deviations). (7) Cert evidence: inverter settings per DNO recommendation + commissioning test + manufacturer DoC.',
  },
  {
    question:
      'A commercial CHP install with synchronous generator — what additional anti-islanding considerations vs inverter-coupled sources?',
    options: [
      'Random',
      'Synchronous generators are harder to detect grid loss because they can maintain voltage + frequency briefly (inertia + field excitation) — making vector shift + ROCOF less reliable + harder to set. EREC G99 typically requires more sophisticated LoM protection: dedicated G99 protection relay (e.g. SEL, Schneider Sepam, ABB REJ) with multiple methods + DNO-mandated settings; physical disconnection test at commissioning more often required than inverter-coupled; longer test sequence. Manufacturer + DNO coordination',
      'Same as inverter',
      'No anti-islanding',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial CHP synchronous generator anti-islanding considerations: (1) Sync generator inertia — rotating mass + field excitation maintain voltage + frequency briefly after grid disconnect; vector shift + ROCOF detection harder + slower. (2) LoM detection challenge — small loaded island may settle into a stable voltage + frequency briefly; detection requires more sensitive thresholds or active probing. (3) Dedicated G99 protection relay — commercial CHP typically uses a dedicated protection relay (Schweitzer SEL-700G, Schneider Sepam, ABB REJ, Siemens SIPROTEC) with multiple LoM methods + DNO-mandated settings. Inverter-coupled small wind / PV / BESS often have built-in LoM in inverter; CHP needs external relay. (4) Settings per DNO — UK 2025-26 DNOs publish recommended G99 protection settings: undervoltage, overvoltage, underfrequency, overfrequency, vector shift, ROCOF + thresholds + times. Customer-specific connection offer may modify. (5) Physical disconnection test at commissioning — sync generators more often require physical DNO supply disconnect test (vs inverter-coupled where manufacturer factory test + simulated grid-loss may suffice). DNO witness typical for larger commercial. (6) Multiple test conditions — load levels, time of day, source configurations; sync generator may need testing across operating range. (7) Cert evidence bundle: G99 connection offer + protection relay manufacturer DoC + DNO-mandated settings + commissioning test record + DNO witness signature.',
  },
  {
    question:
      'What is "active" vs "passive" anti-islanding?',
    options: [
      'Random',
      'Passive anti-islanding = detection based on observing grid characteristics (voltage, frequency, phase angle, ROCOF) without inverter intervention. Vector shift + ROCOF + voltage/frequency monitoring are passive. Active anti-islanding = inverter actively injects small disturbances (small frequency or voltage perturbations) + watches for grid response. Grid present = perturbation absorbed; grid absent = perturbation amplifies → inverter detects + trips. Active methods more reliable in edge cases (matched load + generation) but more complex to test',
      'Passive only',
      'Same thing',
    ],
    correctAnswer: 1,
    explanation:
      'Passive vs active anti-islanding methods: (1) Passive methods — detect grid loss by observing grid characteristics WITHOUT inverter intervention. Vector shift (phase angle), ROCOF (df/dt), voltage / frequency / harmonic monitoring. Simple to implement; established. Limitation: edge cases where local load + generation match closely can mask the grid disconnect (no significant phase / frequency shift). (2) Active methods — inverter ACTIVELY injects small disturbances (frequency shift, voltage perturbation, reactive power probe) + monitors grid response. Grid present absorbs the perturbation (stiff grid); grid absent allows the perturbation to amplify or destabilise the local island (no grid to absorb). Inverter detects the unstable response + trips. (3) Common active methods — Sandia Frequency Shift (SFS), Slip-Mode Frequency Shift (SMS), reactive power perturbation, harmonic injection. (4) Reliability — active methods more reliable in matched-load edge cases (where passive methods can fail); slightly more complex; can interact with sensitive grid-edge equipment. (5) Modern inverters — typically use COMBINED active + passive methods; trip on whichever indicates loss first. (6) EREC G99 testing — verifies the inverter\'s anti-islanding (whatever combination of methods) operates within the required time after grid loss. Manufacturer DoC declares method(s) + factory test results. (7) Cert evidence: inverter manufacturer DoC + LoM method(s) + commissioning test record.',
  },
  {
    question:
      'How does the Reg 551.6 changeover (switched-alternative) arrangement relate to anti-islanding + island-mode operation in a PEI?',
    options: [
      'Random',
      'The Reg 551.6 changeover (switched-alternative) arrangement switches the installation between grid-connected mode + island mode in a PEI per Chapter 82. Different role from anti-islanding: the changeover is a DELIBERATE mode-change; anti-islanding is an AUTOMATIC trip on undetected grid loss. Both work together: anti-islanding fires on grid loss (no changeover operation), then the changeover enables island mode by switching to local supply. Reg 826.1.1.5 switching device for island mode complies with Reg 512.1.2',
      'Same as RCD',
      'No relationship',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.6 changeover arrangement + anti-islanding relationship in PEI: (1) Reg 551.6 switched-alternative (changeover) arrangement — physically switches connection between two supplies: typically DNO supply vs local supply (BESS / generator), with a break-before-make interlock so the two are never paralleled. Used in PEI per Chapter 82 for island-mode operation. (2) Reg 826.1.1.5 — switching devices for island mode shall comply with Reg 512.1.2 + relevant product standard, suitable for isolation. (3) Anti-islanding (Reg 551.7.5) — automatic protection that disconnects generator on UNDETECTED grid loss. Acts independently of the changeover. Categorical safety. (4) Island mode entry — DELIBERATE: customer / EEMS detects grid loss; changeover operates per Reg 826.1.3; local supply (BESS) takes over. Anti-islanding may or may not need to fire depending on architecture. (5) Architecture options — (a) Anti-islanding fires first (generator disconnects from grid); the changeover then operates to connect generator to local loads (now isolated from grid). (b) Changeover operates first (mechanical disconnect of grid); generator then continues serving local load (no anti-islanding needed because grid is mechanically disconnected). (6) Reg 826.1.1.2.2 — when in island mode, all live conductors shall be disconnected from the DNO supply. (7) Modern PEI inverters integrate both functions — anti-islanding firing + island-mode supply takeover. (8) Cert evidence: changeover device manufacturer DoC + anti-islanding type + island-mode commissioning test + Reg 551.6 + Reg 826.1.1.5 compliance.',
  },
  {
    question:
      'What happens at commissioning if the DNO is not available to witness the anti-islanding test?',
    options: [
      'Skip the test',
      'Options: (1) Reschedule for DNO availability — typical G99 commissioning has multi-week lead time + DNO witness coordinated. (2) DNO may accept manufacturer-verified test result — inverter factory test certificate + simulated grid-loss test by installer + reported result; DNO sign-off on documentation. (3) DNO-approved test contractor — some DNOs accept independent test engineer report. (4) Manufacturer self-test feature — modern inverters have built-in test mode; result auto-logged. Never proceed without an anti-islanding verification on record. Cert evidence bundle must contain the test result',
      'Random',
      'No test ever',
    ],
    correctAnswer: 1,
    explanation:
      'DNO not available for anti-islanding test at commissioning — options: (1) Reschedule for DNO availability — G99 commissioning has multi-week lead time; DNO witness coordinated. This is typical for sync generator / commercial sites. (2) DNO accepts manufacturer-verified result — for inverter-coupled sources (PV / BESS / modern wind / micro-CHP), DNO may accept: (a) inverter factory test certificate from manufacturer (G99-compliant inverter ships with type-test record); (b) installer\'s simulated grid-loss test result (e.g. open main switch + observe inverter disconnect); (c) reported via DNO\'s G99 commissioning portal. (3) DNO-approved test contractor — some DNOs accept independent test engineer\'s report (UK 2025-26 various test houses + competent persons). (4) Manufacturer self-test feature — modern inverters have built-in anti-islanding test mode; result auto-logged to inverter memory + portal. Acceptable evidence per DNO. (5) NEVER proceed without anti-islanding verification on record — Reg 551.7.5 is categorical safety; an install with active generation but no anti-islanding evidence is non-compliant + dangerous to DNO engineers. (6) Cert evidence bundle MUST contain: anti-islanding test result + DNO sign-off (or DNO-accepted evidence equivalent) + inverter manufacturer DoC + G98 / G99 reference. EICR scope verifies the evidence exists.',
  },
];

const faqs = [
  {
    question: 'Why is anti-islanding the categorical safety anchor for any grid-paralleled generator?',
    answer:
      'A generator continuing to export to a "dead" DNO supply makes the DNO\'s network unexpectedly live. DNO engineer servicing what they\'ve isolated can be fatally shocked. Reg 551.7.5 prevents this — generator must disconnect on grid loss. Non-negotiable for any source that can export (PV, BESS, wind, CHP).',
  },
  {
    question: 'What\'s the typical anti-islanding disconnection time required?',
    answer:
      'EREC G99 typically specifies <1 second from grid loss to generator output zero. ENA + DNOs have published the exact thresholds. Modern inverters typically disconnect within 50-200 ms. Commissioning test verifies the actual time.',
  },
  {
    question: 'Can anti-islanding nuisance-trip on normal grid events?',
    answer:
      'Yes — RoCoF (and Vector Shift on legacy / non-type-tested sites) can trip on real grid frequency events (large generator trips, line faults). Remember G99 disallows Vector Shift for type-tested generation, so the type-tested inverters in virtually all LCT installs rely on RoCoF + voltage / frequency protection. DNO settings balance false-trip rate vs detection time. UK 2025-26 has tightened settings post-2019 GB Power System Event to reduce false trips while maintaining safety. Manufacturer DoC + DNO settings document the choices.',
  },
  {
    question: 'What about anti-islanding in three-phase generators?',
    answer:
      'Same principle applied per phase — RoCoF + voltage / frequency monitoring per phase or aggregated (Vector Shift only on legacy / non-type-tested sites, since G99 disallows VS for the type-tested generation used in virtually all LCT installs). Three-phase imbalance during grid loss can be an additional detection signal. Inverter / generator controller manages all phases coherently.',
  },
  {
    question: 'Does the anti-islanding test happen only once?',
    answer:
      'Once at commissioning (DNO-witnessed or accepted equivalent). Future re-test typically not required unless significant changes (added generation, equipment swap) or as part of EICR / periodic inspection where the verifier checks the LoM is functional. Manufacturer DoC + factory test + commissioning record + EICR follow-up = the cert evidence chain.',
  },
];

export default function RenewableEnergyModule11Section7() {
  const navigate = useNavigate();

  useSEO({
    title: 'Anti-islanding deep — DNO-witnessed test + LoM | Renewable Energy 11.7 | Elec-Mate',
    description:
      'Reg 551.7.4 + 551.7.5 anti-islanding mechanics. EREC G99 test methodology. ROCOF Loss of Mains detection (required for type-tested generation; G99 disallows Vector Shift on type-tested inverters — VS legacy only). Active anti-islanding. DNO-witnessed commissioning test + G98 self-declared route. Reg 551.6 changeover + Reg 826.1.1.5 island mode.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-11')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 11
          </button>

          <PageHero
            eyebrow="Module 11 · Section 7 · BS 7671 Reg 551.7.4 + 551.7.5 · ENA EREC G99 + G98 · Anti-islanding"
            title="Anti-islanding deep — DNO-witnessed test + Loss of Mains protection"
            description="Reg 551.7.4 + 551.7.5 mechanics. ENA EREC G99 test methodology. ROCOF Loss of Mains detection (required for type-tested generation; G99 disallows Vector Shift on type-tested inverters — VS legacy only). Active vs passive anti-islanding. DNO-witnessed commissioning test + G98 self-declared route. Reg 551.6 changeover + Reg 826.1.1.5 island mode interaction."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 551.7.5 is the categorical anti-islanding requirement — generator must disconnect on grid loss to prevent dangerous islanding. NOTE: G98 compliance ≤16 A per phase deems Reg 551.7 met.',
              'Anti-islanding = automatic trip on UNDETECTED grid loss; different from deliberate changeover operation (Reg 551.6 + Reg 826.1.1.5).',
              'Loss of Mains (LoM) detection methods: ROCOF (rate of change of frequency), voltage / frequency deviation, active anti-islanding (probe + response), and Vector Shift (phase angle jump — LEGACY: G99 disallows VS for type-tested generation, so RoCoF is the standard required method for the type-tested inverters in virtually all LCT installs; VS is only on older / non-type-tested sites).',
              'Modern type-tested inverters combine RoCoF + voltage / frequency + active methods + trip on whichever fires first (not Vector Shift). Disconnect within ~50-200 ms typical.',
              'EREC G98 = Type A fast-track ≤16 A per phase generation; post-installation notification; manufacturer factory test + simulated test at install. Reg 551.7.5 NOTE deems compliant.',
              'EREC G99 = formal pre-installation application for >16 A per phase or synchronous generators; DNO-witnessed (or accepted equivalent) commissioning test.',
              'Synchronous generator (commercial CHP, larger wind): dedicated G99 protection relay (Schweitzer / Schneider / ABB / Siemens); physical disconnection test more often required.',
              'Reg 551.6 changeover + Reg 826.1.1.5 island mode switching — work alongside anti-islanding for PEI operation per Chapter 82. Cert evidence: G99 / G98 + manufacturer DoC + commissioning test.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 551.7.4 + 551.7.5 anti-islanding requirements + understand the categorical safety scope.',
              'Distinguish passive (vector shift, ROCOF, V/f monitoring) vs active anti-islanding methods.',
              'Identify when EREC G98 vs G99 applies + the implications for commissioning + cert evidence.',
              'Coordinate G99 anti-islanding test process: DNO witness, manufacturer-verified, or DNO-accepted equivalent.',
              'Set protection relay parameters for commercial synchronous generator per DNO-mandated G99 settings.',
              'Position anti-islanding alongside Reg 551.6 changeover + Reg 826.1.1.5 island mode in PEI architecture.',
              'Build cert evidence bundle: G99 / G98 reference + manufacturer DoC + commissioning test record + DNO sign-off.',
              'Handle scenarios where DNO witness is delayed + DNO-accepted equivalent paths.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            A generator that won\'t let go of a dead grid kills the engineer fixing the line. Reg 551.7.5 isn\'t optional. Anti-islanding is the most important safety feature in any prosumer install.
          </Pullquote>

          <ContentEyebrow>Reg 551.7.5 + the anti-islanding safety anchor</ContentEyebrow>

          <ConceptBlock
            title="Reg 551.7.5 — the categorical requirement"
            plainEnglish={`Reg 551.7.5: means shall be provided to prevent the connection of a generating set to the public distribution system in the event of loss of that supply or deviation of voltage / frequency from declared values. Anti-islanding is mandatory for any generator that can operate in parallel with the DNO grid — PV, BESS, wind, CHP, hydro. Without it: DNO engineer servicing a "dead" line can be fatally shocked when the customer's generator keeps feeding.`}
            onSite="UK 2025-26 reality: every grid-paralleled generator inverter / controller has integrated anti-islanding. The categorical requirement is universal. Reg 551.7.5 NOTE deems G98 (≤16 A per phase) compliant via the G98 framework; larger via G99 formal application + commissioning test."
          >
            <p>Reg 551.7.5 detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Why it matters</strong>
                — without anti-islanding, a customer\'s generator keeps feeding
                the local network after DNO disconnect. DNO operator believes the
                line is dead (their disconnect operated) + can be killed
                investigating
              </li>
              <li>
                <strong className="text-white">Reg 551.7.4 +
                  551.7.5</strong> — combined: 551.7.4 = automatic switching on
                voltage / frequency deviation; 551.7.5 = prevent reconnection in
                event of loss of supply or deviation
              </li>
              <li>
                <strong className="text-white">Scope</strong> —
                any generating set that can operate in parallel with public supply:
                PV inverter, BESS inverter, wind turbine, CHP (any type), micro-hydro,
                fuel cell. Categorical
              </li>
              <li>
                <strong className="text-white">NOTE — G98 deemed
                  compliant</strong> — "For a generating set with an output not
                exceeding 16 A intended to operate in parallel with a system for
                distribution of electricity to the public, the requirements of
                Regulation 551.7 are deemed to be met by compliance with the
                relevant requirements of EREC G98"
              </li>
              <li>
                <strong className="text-white">G99 path</strong>
                — for generators above 16 A per phase, formal G99 application +
                DNO connection offer + commissioning test. Reg 551.7.5 compliance
                via G99 test record
              </li>
              <li>
                <strong className="text-white">Mechanical
                  implementation</strong> — typically built into inverter electronics
                (PV, BESS, modern wind, micro-CHP) — automatic via control loop.
                For sync generators: dedicated G99 protection relay
              </li>
              <li>
                <strong className="text-white">Test at commissioning</strong>
                — simulated or physical grid-loss test verifies anti-islanding
                operates within required time. DNO-witnessed (G99) or
                manufacturer-verified (G98)
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — Reg 551.7.5 compliance via G98 or G99 reference + manufacturer
                DoC + commissioning test record + DNO sign-off where applicable.
                Categorical part of every PEI cert bundle
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Anti-islanding vs deliberate island mode"
            plainEnglish="Anti-islanding (Reg 551.7.5) = automatic trip on UNDETECTED grid loss; categorical safety; non-negotiable. Island mode (Reg 826.1.1.1, Chapter 82 PEI) = DELIBERATE operation of the installation as an island when grid is detected lost; permitted per Chapter 82 + Reg 826.1.3; managed via Reg 551.6 changeover + Reg 826.1.1.5 island switching device."
            onSite="The two are designed to work together in PEI: anti-islanding fires on grid loss (generator disconnects from grid); the changeover then operates to connect the installation to local supply (BESS) for island mode; the local supply serves the installation in isolation; reconnection to grid requires resynchronisation + the changeover operating in reverse."
          >
            <p>Anti-islanding vs island mode interaction:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Anti-islanding (Reg
                  551.7.5)</strong> — automatic trip on undetected grid loss;
                generator disconnects to prevent dangerous islanding of DNO network;
                categorical safety
              </li>
              <li>
                <strong className="text-white">Island mode (Reg
                  826.1.1.1)</strong> — deliberate operation of the installation
                as an island after grid is detected lost. The customer\'s installation
                is supplied by local source (typically BESS); DNO is disconnected;
                local loads served
              </li>
              <li>
                <strong className="text-white">Reg 826.1.3</strong>
                — when public network is not energised, prosumer operates PEI in
                island mode OR automatically disconnects all local power supplies
              </li>
              <li>
                <strong className="text-white">Sequence in PEI</strong>
                — (1) Grid loss detected by anti-islanding. (2) Generator
                disconnects from grid. (3) Changeover (Reg 551.6) operates
                to switch installation supply from grid to local source. (4) Local
                source (BESS) supplies installation in island mode
              </li>
              <li>
                <strong className="text-white">Modern integrated
                  PEI</strong> — most modern hybrid inverters integrate anti-islanding
                + transfer switch + island-mode supply takeover in a single device.
                Manufacturer DoC declares the integrated function
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.5</strong>
                — switching devices for island mode shall comply with Reg 512.1.2
                + relevant product standard + be suitable for isolation
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.2.2</strong>
                — when in island mode, all live conductors shall be disconnected
                from the DNO supply
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — manufacturer DoC for integrated PEI; commissioning test in both
                modes; Reg 551.7.5 + Reg 551.6 + Reg 826.1.1.5 compliance
                + DNO sign-off
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.5 — Anti-islanding requirement"
            clause="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4. NOTE: For a generating set with an output not exceeding 16 A intended to operate in parallel with a system for distribution of electricity to the public, the requirements of Regulation 551.7 are deemed to be met by compliance with the relevant requirements of EREC G98."
            meaning="Reg 551.7.5 is the categorical anti-islanding safety reg in BS 7671 + the M11 §7 anchor. Three operative elements: (1) Means shall be provided — implementation must exist; mandatory. (2) Prevent the connection... in the event of loss of supply or deviation — anti-islanding on both grid-loss detection + sustained voltage / frequency deviation. (3) NOTE deems G98 compliance for generators ≤16 A per phase intended for parallel operation — fast-track route via the engineering recommendation. Combined with Reg 551.7.4 (automatic switching on deviation): the framework for protection against dangerous islanding. UK 2025-26 implementation: PV / BESS / modern wind / micro-CHP all have integrated anti-islanding in inverter electronics — G98 manufacturer factory test or G99 DNO-witnessed test verifies. Sync generators (commercial CHP, larger wind) need dedicated G99 protection relay. M11 §7 covers the LoM detection methods, the EREC G98 vs G99 paths + the cert evidence bundle. Cert evidence: Reg 551.7.5 compliance via G98 or G99 reference + manufacturer DoC + commissioning test + DNO sign-off."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Loss of Mains detection methods + EREC test process</ContentEyebrow>

          <Pullquote>
            RoCoF catches the frequency drift, voltage / frequency protection backs it up, and active probing catches the matched-load case. G99 disallows Vector Shift for the type-tested inverters used in virtually all LCT installs, so RoCoF is the standard required method — VS is legacy, on older or non-type-tested sites only.
          </Pullquote>

          <ConceptBlock
            title="Loss of Mains (LoM) detection methods detail"
            plainEnglish="LoM methods detect that the DNO supply has been lost + trigger the generator to disconnect per Reg 551.7.5. Four primary families: (1) Vector shift — sudden phase angle jump (NOTE: G99 disallows VS for type-tested generation — legacy / non-type-tested sites only); (2) ROCOF — rate of change of frequency (the standard required method for type-tested generation under G99); (3) Voltage / frequency deviation — measured against Reg 551.7.4 declared values; (4) Active anti-islanding — inverter probes + watches for grid response. The type-tested inverters in virtually all LCT installs use RoCoF + voltage / frequency + active methods, not Vector Shift."
            onSite="UK 2025-26 typical PV / BESS inverter (type-tested): combined RoCoF + V/f monitoring + active anti-islanding — Vector Shift is NOT used because G99 disallows it for type-tested generation (removed by the 2018 amendment implementing the Authority DC0079 decision). Disconnection within 50-200 ms of grid loss. ENA + DNO have published RoCoF settings post-2019 GB Power System Event to balance false-trip rate vs detection time. Manufacturer DoC declares which methods + settings. VS only appears on older / non-type-tested sites with bespoke G99 protection relays."
          >
            <p>LoM detection method detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Vector shift (legacy — disallowed by G99 for type-tested generation)</strong>
                — measures phase angle of voltage waveform; sudden jump (typical
                threshold 6-12°) indicates grid disconnect. Fast (~50-100 ms);
                can nuisance-trip on large motor starts / nearby disturbances.
                G99 removed VS for type-tested generation in the 2018 amendment
                (Authority DC0079 decision); it is now only found on older or
                non-type-tested sites — use RoCoF for the type-tested inverters
                in virtually all LCT installs
              </li>
              <li>
                <strong className="text-white">ROCOF (Rate of Change
                  of Frequency) — the standard required LoM method for
                  type-tested generation under G99</strong> — measures df/dt;
                threshold typically 0.5-1.0 Hz/s. Frequency drifts
                post-disconnect because generation no longer matches load.
                Slightly slower (~100-200 ms); can nuisance-trip on grid
                frequency events. With voltage / frequency protection, this is
                what the type-tested inverters in virtually all LCT installs use
                in place of Vector Shift
              </li>
              <li>
                <strong className="text-white">Voltage / frequency
                  deviation</strong> — measured against Reg 551.7.4 declared
                values. UK grid 230 V ±10%, 50 Hz ±0.5 Hz typical. Inverter trips
                on sustained deviation beyond limits. Slower (1-5 s typical) but
                categorical
              </li>
              <li>
                <strong className="text-white">Active anti-islanding</strong>
                — inverter injects small disturbances (Sandia Frequency Shift,
                Slip-Mode Frequency Shift, reactive power perturbation) + watches
                for grid response. Grid present absorbs; grid absent allows
                disturbance to amplify → inverter detects + trips. Reliable in
                matched-load edge cases
              </li>
              <li>
                <strong className="text-white">Combined approach</strong>
                — modern inverters use multiple methods in parallel; trip on
                whichever indicates loss first
              </li>
              <li>
                <strong className="text-white">UK 2025-26 DNO
                  settings</strong> — post-2019 GB Power System Event, ENA + DNOs
                tightened settings to reduce false trips (especially ROCOF) while
                maintaining safety. Manufacturer + DNO settings documented per
                G99 connection offer
              </li>
              <li>
                <strong className="text-white">Three-phase
                  generators</strong> — same principle per phase or aggregated;
                three-phase imbalance during grid loss is additional signal
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — LoM methods used + DNO-mandated settings + manufacturer DoC +
                commissioning test result
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EREC G98 vs G99 — the two paths"
            plainEnglish="EREC G98 = Type A small-scale ≤16 A per phase, fast-track post-installation notification. Manufacturer factory test + simulated test at install + DNO notification post-install. Reg 551.7.5 NOTE deems compliant. EREC G99 = larger generation, formal pre-installation application; DNO connection offer; commissioning test (DNO-witnessed or accepted equivalent)."
            onSite="UK 2025-26 reality: most domestic PV (>3.6 kWp single-phase, exceeding ~16 A) + all commercial generation goes via G99. G98 applies only to the smallest end — typical 3-4 kWp single-phase + below. Designer + installer plan for G99 from project start; multi-week lead time."
          >
            <p>G98 vs G99 path detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">G98 threshold</strong>
                — generation ≤16 A per phase. At 230 V single-phase ≈ 3.7 kW
                continuous; at 400 V three-phase ≈ 11 kW continuous
              </li>
              <li>
                <strong className="text-white">G98 process</strong>
                — manufacturer ships G98-certified inverter with factory test
                record; installer installs + tests; installer notifies DNO
                within 14 days; no DNO pre-approval needed
              </li>
              <li>
                <strong className="text-white">G99 threshold</strong>
                — generation &gt;16 A per phase OR synchronous generator OR
                inverter not on G98 type-test list
              </li>
              <li>
                <strong className="text-white">G99 process</strong>
                — installer / customer submits pre-installation application to
                DNO; DNO assesses network capability + issues connection offer
                (typical 6-18 weeks); installer accepts + installs per offer;
                commissioning test (DNO-witnessed or accepted equivalent); DNO
                issues commissioning certificate
              </li>
              <li>
                <strong className="text-white">G99 connection offer
                  contents</strong> — DNO-mandated anti-islanding settings;
                generator parameters; protection relay requirements (for sync
                generators); export limit conditions; commissioning test
                requirements; cost recovery
              </li>
              <li>
                <strong className="text-white">G99 sub-categories</strong>
                — A1 (≤50 kW per phase), A2 (50-1 MW), B (&gt;1 MW) — different
                requirements + processes per category
              </li>
              <li>
                <strong className="text-white">Mixed sites</strong>
                — multi-source PEI typically all under one G99 application
                covering combined export. Each source\'s anti-islanding still
                individually compliant
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — G98: installer notification + manufacturer DoC
                + factory test + install test. G99: connection offer + DNO
                commissioning certificate + manufacturer DoC + protection relay
                settings + commissioning test record
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.4 — Automatic switching on deviation"
            clause="Means of automatic switching shall be provided to disconnect the generating set from the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from declared values. For a generating set with an output exceeding 16 A, the type of protection and the sensitivity and operating times depend on the system requirements."
            meaning="Reg 551.7.4 sits alongside Reg 551.7.5 as the operative pair for anti-islanding. Reg 551.7.4 covers the AUTOMATIC SWITCHING mechanism that disconnects generator on grid loss OR sustained voltage / frequency deviation. The second sentence acknowledges that for generators >16 A, the protection type + sensitivity + operating times depend on system requirements — i.e. per DNO G99 mandate. Practical implications: (1) Generator must include automatic switching capability — typically integrated in inverter (PV / BESS / modern wind / micro-CHP) or dedicated protection relay (sync generator). (2) Settings per DNO G99 connection offer for >16 A; per EREC G98 type-test for ≤16 A. (3) Voltage + frequency tolerance per Reg 27 ESQCR + DNO-published settings (typical undervoltage 184 V / 1.5 s; overvoltage 264 V / 1 s; underfrequency 47 Hz / 1.5 s; overfrequency 52 Hz / 1 s). (4) Reg 551.7.4 + Reg 551.7.5 combined: automatic detection + automatic disconnection + prevent reconnection until grid is back within tolerance. (5) Cert evidence: settings per DNO requirement + manufacturer DoC + commissioning test verifying disconnect + reconnect behaviour."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Commissioning test + cert evidence chain</ContentEyebrow>

          <ConceptBlock
            title="The G99 commissioning test in detail"
            plainEnglish="EREC G99 commissioning anti-islanding test: pre-test agreement between installer + DNO; generator operating in parallel at design current; grid-loss simulation (physical disconnection by DNO or simulated by installer); verify generator disconnects within G99 time (typically <1 s); repeat for multiple conditions if required; DNO commissioning certificate issued."
            onSite="UK 2025-26 typical: PV / BESS installs — DNO may accept simulated test by installer + manufacturer DoC, with witness reduced or remote. Commercial sync generator + larger sites — physical DNO disconnection test + DNO operator present. Cert evidence bundle records the method + result."
          >
            <p>G99 commissioning test process:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Pre-test agreement</strong>
                — installer + DNO confirm test date, method, witness scope,
                expected disconnection time per G99 settings, multiple-condition
                scope if applicable
              </li>
              <li>
                <strong className="text-white">Generator operating
                  at design</strong> — generator connected + exporting at design
                current; PEI configuration matches commissioning state; loads
                operating normally
              </li>
              <li>
                <strong className="text-white">Test method 1 —
                  physical disconnection</strong> — DNO operator opens supply
                switch (cut-out / fuse / supply switch). Generator output
                monitored; expected to disconnect within G99-specified time.
                For sync generators + commercial typical
              </li>
              <li>
                <strong className="text-white">Test method 2 —
                  simulated disconnection</strong> — main switch in customer\'s
                supply panel opened; generator monitored; same expected behaviour.
                Often used for inverter-coupled sources where physical DNO
                disconnection is logistically harder
              </li>
              <li>
                <strong className="text-white">Test method 3 —
                  manufacturer self-test</strong> — modern inverters have built-in
                anti-islanding self-test mode that injects a brief simulated
                grid loss + verifies the response internally. Result logged.
                DNO may accept as part of commissioning evidence
              </li>
              <li>
                <strong className="text-white">Verify disconnection
                  time</strong> — measure with monitoring equipment or via inverter
                / relay logging. Typical G99 specifies &lt;1 s; modern inverters
                typically achieve 50-200 ms
              </li>
              <li>
                <strong className="text-white">Multiple conditions</strong>
                — DNO may require tests at different load levels, time of day,
                source configurations. Larger / commercial more common
              </li>
              <li>
                <strong className="text-white">DNO commissioning
                  certificate</strong> — DNO issues certificate confirming test
                witness + sign-off; reference to G99 application + connection
                offer; final document for cert evidence bundle
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Cert evidence bundle — Reg 551.7.5 compliance chain"
            plainEnglish="Cert evidence bundle for anti-islanding compliance: G98 / G99 reference + manufacturer DoC + protection relay settings (where applicable) + commissioning test record + DNO sign-off (where applicable). Plus the integration with Chapter 82 PEI documentation (transfer switch + island mode test if PEI). Future EICR scope verifies the evidence."
            onSite="The cert evidence bundle is what protects: the installer (compliance demonstrated), the customer (insurance + future EICR), the DNO (safety chain), the future home buyer (continued compliance via EICR). Categorical that every PEI install has the full Reg 551.7.5 cert evidence in the bundle."
          >
            <p>Cert evidence bundle elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">G98 or G99 reference</strong>
                — the engineering recommendation under which the generator was
                installed; G98 notification or G99 connection offer + acceptance
              </li>
              <li>
                <strong className="text-white">Manufacturer DoC</strong>
                — inverter / generator controller / protection relay declarations
                of conformity to relevant standards (BS EN 50549 family for
                inverters; specific G99 product approval for protection relays)
              </li>
              <li>
                <strong className="text-white">Protection settings
                  record</strong> — DNO-mandated G99 settings (where applicable):
                undervoltage, overvoltage, underfrequency, overfrequency, vector
                shift, ROCOF + thresholds + operating times. Documented per
                G99 connection offer + verified at commissioning
              </li>
              <li>
                <strong className="text-white">Commissioning test
                  record</strong> — date, method (physical / simulated /
                manufacturer self-test), result, disconnection time measured,
                witness signatory (DNO operator name + signature where
                applicable), reference to G99 application
              </li>
              <li>
                <strong className="text-white">DNO commissioning
                  certificate</strong> — DNO\'s formal commissioning sign-off for
                G99; G98 has post-installation notification record
              </li>
              <li>
                <strong className="text-white">PEI documentation</strong>
                — Chapter 82 PEI architecture diagram, changeover (Reg
                551.6), island mode test record (Reg 826.1.1.5), single-line
                diagram showing source + DNO interface
              </li>
              <li>
                <strong className="text-white">Customer handover
                  pack</strong> — anti-islanding overview for customer reference;
                what to do in grid loss event; reconnection sequence; emergency
                contacts
              </li>
              <li>
                <strong className="text-white">EICR + future
                  inspection</strong> — verifier reviews cert evidence bundle;
                checks settings + functional test of LoM (often via inverter
                self-test mode); records ongoing compliance
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.5 — Switching device for island mode (relevant to anti-islanding)"
            clause="Switching devices for island mode, introduced in Regulation 824.2, shall comply with Regulation 512.1.2 and their relevant product standard, and be suitable for isolation."
            meaning="Reg 826.1.1.5 covers the switching device that enables island-mode operation in a Chapter 82 PEI. Works alongside Reg 551.7.5 anti-islanding: (1) Anti-islanding (Reg 551.7.5) automatically disconnects generator from DNO on grid loss. (2) Island-mode switching (Reg 826.1.1.5 + Reg 551.6 changeover) deliberately switches installation to local supply (BESS) for island operation. The switching device must comply with Reg 512.1.2 (general switching device requirements) + its relevant product standard + be suitable for isolation. Practical implementation: most modern hybrid inverters integrate the anti-islanding + changeover + island-mode supply takeover. The single device handles all three functions per its manufacturer DoC + relevant product standard (BS EN 50549, IEC 62116, etc.). Reg 826.1.1.2.2: when in island mode, all live conductors disconnected from DNO. Reg 826.1.3: prosumer operates PEI in island mode OR automatically disconnects all local power supplies when public network is not energised. Cert evidence: integrated inverter manufacturer DoC + commissioning test in both grid-connected + island modes + Reg 551.7.5 + Reg 551.6 + Reg 826.1.1.5 + Reg 826.1.3 compliance."
          />

          <InlineCheck {...inlineChecks[3]} />

          <AntiIslandingDecisionTree caption="Anti-islanding on type-tested generation uses RoCoF, not Vector Shift — proven at commissioning by a G98 installer test (≤16 A/phase) or a DNO-witnessed G99 test (>16 A/phase)." />

          <SectionRule />

          <Scenario
            title="6 kWp residential PV — G99 commissioning"
            situation="Residential 6 kWp single-phase PV install. Inverter rated 26 A AC (exceeds G98 16 A threshold → G99 path). Customer\'s PEI also includes 13 kWh BESS hybrid inverter. UK 2025-26 commissioning."
            whatToDo="G99 process: (1) Pre-installation — installer submits G99 application to DNO (typically via DNO portal). DNO assesses local network capability (transformer + LV capacity + neighbouring generation). DNO issues connection offer ~6-18 weeks lead time; offer specifies G99 anti-islanding settings (undervoltage, overvoltage, underfrequency, overfrequency, ROCOF thresholds + times — Vector Shift is NOT specified here because G99 disallows VS for the type-tested PV / BESS inverters used in this install). (2) Install per offer — PV + BESS hybrid inverter installed; settings programmed per G99 connection offer. (3) Commissioning test — DNO may accept simulated test for inverter-coupled sources: (a) Generator operating + exporting per design. (b) Installer opens main switch in customer\'s supply panel (simulated grid loss). (c) Inverter detects + disconnects within 200 ms (modern inverter typical). (d) Installer logs result; manufacturer self-test mode also run + result recorded. (e) Reconnection sequence verified: after grid returns + stabilisation period (typical 60 s per G99), inverter reconnects automatically. (4) DNO commissioning certificate — issued post-test on DNO acceptance; references G99 application + connection offer. (5) Cert evidence bundle — G99 application + connection offer + acceptance + manufacturer DoC + protection settings record + commissioning test record + DNO commissioning certificate + integration with PEI documentation (transfer switch + island mode where applicable) + BS 7671 EIC."
            whyItMatters="Typical UK 2025-26 residential PV pattern. G99 multi-week lead time = project plan from day one. Designer / installer coordinates DNO interaction. Customer evidence bundle is comprehensive + insurance-ready. Future EICR scope verifies the cert evidence + LoM functional test. The customer can prove compliance to a future home buyer or insurer."
          />

          <Scenario
            title="Commercial 50 kWe synchronous CHP — full G99 process"
            situation="Local-authority leisure centre, 50 kWe / 100 kWth natural gas CHP unit, three-phase synchronous generator with field excitation. Heat output integrated with pool heating + space heating. Chapter 82 PEI alongside existing 200 kWp PV + 500 kWh BESS. UK 2025-26."
            whatToDo="Full G99 process for sync generator: (1) Pre-installation — comprehensive G99 application: site description, generator manufacturer DoC, fault contribution characteristic (sub-transient / transient / steady-state), proposed protection relay (e.g. Schweitzer SEL-700G or equivalent), settings per DNO recommendation. DNO assesses + may require network study for larger sites. Connection offer lead time 12-26 weeks typical. (2) Install per offer — generator + protection relay + interface switchgear installed per design. Protection relay settings programmed per DNO G99 mandate. (3) Commissioning test — DNO-witnessed physical disconnection test: (a) Generator running at design output + exporting per agreement. (b) DNO operator opens supply switch at commissioning. (c) Protection relay detects + disconnects generator within G99 time (<1 s; typically achievable on modern relay). (d) Multiple test conditions — different load levels, different generation levels, possibly time of day. (e) Test record signed by DNO operator + installer. (4) Reconnection test — after grid returns + stabilisation, generator reconnects per protection relay + interlock with DNO synchronisation check. (5) Site integration test — anti-islanding interaction with PEI (CHP + PV + BESS all in PEI per Chapter 82); changeover (Reg 551.6) + island mode (Reg 826.1.1.5) commissioning if PEI supports island mode. (6) Cert evidence bundle — G99 application + connection offer + acceptance + sync generator manufacturer DoC + protection relay manufacturer DoC + settings record + commissioning test record + DNO commissioning certificate + PEI documentation + BS 7671 EIC + MCS handover (where applicable) + EREC G99 reference."
            whyItMatters="Commercial sync generator = full G99 process + DNO-witnessed test typical. Multi-trade delivery: DNO + LPS specialist (where LPS applicable) + CHP specialist + protection relay engineer + designer / electrician. Cert evidence bundle is multi-document. Customer evidence: comprehensive insurance + audit-ready. EREC G99 reference travels with the install for the lifetime."
          />

          <CommonMistake
            title="Skipping the anti-islanding commissioning test record"
            whatHappens={`Installer commissions a PV install + writes "anti-islanding tested OK" on the EIC without recording the actual test method, time, witness, settings. Future EICR / inspector / insurer cannot verify what was done. If a DNO engineer is harmed by an islanding incident, the install records do not demonstrate Reg 551.7.5 compliance.`}
            doInstead="Cert evidence bundle MUST contain the specific test record: method (physical / simulated / manufacturer self-test), date, generator operating state, measurement of disconnection time, DNO sign-off where applicable (G99), manufacturer DoC + factory test reference (G98), protection settings record. The exercise of documenting is part of the safety chain. Cert evidence bundle without anti-islanding test record = non-compliant + dangerous + indefensible."
          />

          <CommonMistake
            title="Treating G98 as the default + missing G99 trigger"
            whatHappens="Installer assumes a 5 kW single-phase PV = G98. Submits post-installation G98 notification. DNO rejects: PV exceeds 16 A per phase + should have been G99 with pre-installation application. Install is now non-compliant; DNO may require disconnection until G99 process completed; customer + installer in significant difficulty."
            doInstead="ALWAYS verify generator AC output against the 16 A per phase G98 threshold BEFORE quoting / installing. 5 kW single-phase ~22-25 A — exceeds G98. G99 application is required. Multi-week lead time = project plan from day one. UK 2025-26: most residential PV >3.6 kWp + all BESS hybrid inverters + all commercial = G99. Cert evidence: G99 connection offer + acceptance + DNO commissioning certificate."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 551.7.5 is the categorical anti-islanding safety reg — generator must disconnect on grid loss to prevent dangerous islanding of DNO network. Non-negotiable.',
              'Reg 551.7.4 + 551.7.5: automatic switching on voltage / frequency deviation + prevent reconnection in event of loss of supply.',
              'NOTE: G98 ≤16 A per phase compliance deems Reg 551.7 met; larger via G99 formal application + commissioning test.',
              'Loss of Mains (LoM) detection methods: ROCOF (df/dt) + voltage / frequency deviation + active anti-islanding (probe + response). Vector shift (phase angle) is LEGACY — G99 disallows it for type-tested generation, so RoCoF is the standard required method for the type-tested inverters in virtually all LCT installs; VS only on older / non-type-tested sites.',
              'Modern type-tested inverters combine RoCoF + voltage / frequency + active methods (not Vector Shift); disconnect within 50-200 ms typical.',
              'EREC G98 = Type A fast-track ≤16 A per phase; post-installation notification; manufacturer factory test + simulated test at install.',
              'EREC G99 = >16 A per phase or sync generator; pre-installation application; DNO connection offer; commissioning test (DNO-witnessed or accepted equivalent).',
              'Synchronous generators need dedicated G99 protection relay (Schweitzer / Schneider / ABB / Siemens) + physical disconnection test more often required.',
              'Anti-islanding ≠ island mode. Anti-islanding = automatic trip on undetected grid loss. Island mode = deliberate operation via Reg 551.6 changeover + Reg 826.1.1.5 island switching device.',
              'Modern hybrid PEI inverters integrate anti-islanding + transfer switch + island-mode supply takeover in a single device.',
              'Cert evidence bundle: G98 / G99 reference + manufacturer DoC + protection settings record + commissioning test record + DNO sign-off (where applicable) + PEI documentation + EIC.',
              'UK 2025-26 DNO settings tightened post-2019 GB Power System Event to reduce false trips while maintaining safety.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                11.6 Fault contribution multi-source
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                11.8 Commissioning verification — full chain
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
