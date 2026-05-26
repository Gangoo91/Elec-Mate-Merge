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
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm4s7-multi-source-erec',
    question:
      'EREC G98 / G99 registration for a hybrid PV+BESS install — what counts toward the AC output capacity?',
    options: [
      'Only PV',
      'Both PV inverter rated AC AND BESS inverter rated AC count toward the registered capacity. Reg 551.7.2.1 (UPDATED A4:2026): stationary batteries shall be considered a GENERATING SET, NOT a load — the BESS PCE\'s AC output adds to the install\'s registered generation capacity. For DC-coupled hybrid (single hybrid inverter): inverter AC output is the registration figure. For AC-coupled (separate PV + BESS inverters): COMBINED AC output figures into the registration',
      'Customer chooses',
      'Only BESS',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.2.1 is critical for hybrid PV+BESS registration: stationary batteries treated as generating set (NOT load) means the BESS PCE\'s AC output adds to the install\'s registered generation. For DC-coupled hybrid (single 5 kW hybrid inverter): registered as 5 kW AC. For AC-coupled (5 kW PV inverter + 5 kW BESS inverter): registered as 10 kW AC combined. The 16 A single-phase threshold (~3.68 kW) is exceeded by AC-coupled retrofits — typically triggers EREC G99 application or EREC G100 export limitation. Cert evidence bundle records the registration calculation.',
  },
  {
    id: 'm4s7-bidirectional-device',
    question:
      'Reg 551.7.1(c) (NEW in A4:2026) — what does it require for hybrid PV+BESS installs?',
    options: [
      'No requirement',
      'A suitable protective device shall be provided where energy flow is bidirectional. Hybrid PV+BESS installs have bidirectional flow at multiple points: PV export to grid; grid charging BESS; BESS discharging to load + grid. The protective device at the source-connection point (typically the AC interface between hybrid inverter and consumer unit) must operate bidirectionally — current can flow either direction during normal operation, and the device must trip on fault regardless of direction',
      'Customer\'s choice',
      'No effect',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.1(c) is the NEW A4:2026 source-connection rule for bidirectional energy flow. Hybrid PV+BESS has bidirectional flow inherently — that\'s the whole point. The protective device (typically a DC-rated MCB per BS EN 60898-2/IEC 60898-3 or a bidirectional AC MCB) must operate in either direction. Parallels Reg 712.533.101 (PV DC bidirectional OCPDs) + Reg 570.6.1.1.1 (BESS bidirectional protective devices) + Reg 826.1.2.2 (PEI bidirectional throughout). The cert evidence bundle records the device\'s bidirectional capability with manufacturer datasheet evidence.',
  },
  {
    id: 'm4s7-g100-hybrid',
    question:
      'EREC G100 export limitation for a hybrid PV+BESS install — how does it work?',
    options: [
      'Doesn\'t apply',
      'EREC G100 limits AC export to a DNO-approved threshold. For hybrid PV+BESS: the combined export (PV generation + BESS discharge to grid) is measured at the supply tail by a current transformer (CT); the hybrid inverter (or external export-control device) modulates output to limit total export. Common use cases: (a) keep combined install under EREC G98 threshold to avoid G99 delay; (b) comply with G99 conditional approval limiting export; (c) avoid DNO network constraint refusal. Cert evidence bundle records the G100 limit + verification testing',
      'Customer\'s preference',
      'No control',
    ],
    correctIndex: 1,
    explanation:
      'EREC G100 export limitation works at the install\'s grid-connection point: a CT on the supply tail measures NET grid power flow; when net export exceeds the configured limit, the hybrid inverter (or external device) reduces output. For hybrid PV+BESS: the inverter has to allocate between PV → BESS charging (no export contribution) + PV/BESS → loads (no export contribution) + PV/BESS → grid (export contribution). G100 logic prioritises self-consumption + BESS charging before grid export. Common UK use: keep combined export ≤ 16 A AC single-phase (G98 threshold ~3.68 kW) for fit-and-notify simplicity vs G99 delay. Verification testing per EREC G100 spec at commissioning.',
  },
  {
    id: 'm4s7-g98-threshold',
    question:
      'UK customer wants 5 kWp PV + 10 kWh BESS via DC-coupled GivEnergy Gen3 5 kW hybrid inverter. EREC registration path?',
    options: [
      'G98 fit-and-notify',
      '5 kW hybrid inverter AC output = ~21.7 A at 230 V — exceeds the EREC G98 16 A single-phase threshold (~3.68 kW). Options: (a) EREC G99 application — submit before install, wait 4-8 weeks for DNO assessment; (b) EREC G100 export limitation — configure inverter to limit AC export to ≤16 A (3.68 kW), keep install under G98 fit-and-notify; (c) reduce inverter size to 3.68 kW (16 A AC) — smaller hybrid model. Customer-informed decision; cert evidence bundle records the chosen path',
      'No registration',
      'G99 always',
    ],
    correctAnswer: 1,
    correctIndex: 1,
    explanation:
      '5 kW hybrid inverter exceeds G98 threshold (16 A = ~3.68 kW single-phase). Three paths: (a) G99 — formal application + DNO assessment, 4-8 week typical timeline. Best when no export limit acceptable. (b) G100 export limit — limit export to ≤16 A via inverter config or external device, keep G98 fit-and-notify, install faster. Best when self-consumption + BESS charging absorbs most surplus. (c) Downsize inverter — 3.68 kW hybrid (smaller GivEnergy / Solis model). Best for budget-conscious customers willing to give up peak export capacity. Cert evidence bundle records the choice + the EREC paperwork.',
  },
  {
    id: 'm4s7-ac-coupled-erec',
    question:
      'AC-coupled retrofit: existing 5 kWp PV (Solis 4 kW inverter, registered EREC G98) + adding 10 kWh BESS with separate 5 kW battery inverter. EREC implications?',
    options: [
      'No change',
      'New combined AC output = 4 + 5 = 9 kW (~39 A at 230 V) — well above G98 16 A threshold. The original PV inverter\'s G98 registration STAYS but is now joined by the BESS PCE. Options: (a) submit EREC G99 application for the COMBINED install (cover both PV + BESS); (b) EREC G100 export limit on the combined output to ≤16 A. The DNO may treat this as an alteration to the existing install or as a new application. Cert evidence bundle records the new registration paperwork',
      'Original G98 unchanged',
      'No paperwork',
    ],
    correctIndex: 1,
    explanation:
      'AC-coupled retrofit BESS adds AC generation capacity. The combined install\'s AC output (PV + BESS) typically exceeds the G98 threshold. The original PV G98 paperwork stays valid for the PV alone — but the BESS addition requires its own registration covering the combined operation. The DNO\'s approach varies: some require a NEW G99 application; some treat as alteration to existing. The competent installer engages the DNO at design stage to clarify. The cert evidence bundle includes: original PV G98 + new BESS G99 / G100 paperwork + combined DNO approval letter.',
  },
  {
    id: 'm4s7-bs-en-50549',
    question:
      'BS EN 50549-1 — what is it and how does it relate to EREC G98 / G99?',
    options: [
      'A type of cable',
      'BS EN 50549-1: &ldquo;Requirements for generating plants to be connected in parallel with distribution networks — Part 1: Connection to a LV distribution network — Generating plants up to and including Type B&rdquo;. The technical standard underpinning UK EREC G98 / G99 anti-islanding, V/freq trip thresholds, and protection settings. UK PV inverters carry BS EN 50549-1 type approval as the basis for G98 / G99 compliance. The cert evidence bundle records the inverter\'s BS EN 50549-1 type-approval certificate',
      'Customer\'s preference',
      'BS 7671 chapter',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 50549-1 is the European harmonised standard for parallel-connected generating plants (up to Type B = ~1 MW). It defines: anti-islanding methodology + test procedures; V/freq trip thresholds and disconnection times; loss-of-mains detection methods; frequency-watt response (frequency-dependent active power reduction); voltage-VAR response (voltage-dependent reactive power); ride-through behaviour for grid disturbances. UK EREC G98 / G99 is the OPERATIONAL framework (registration process + DNO interface); BS EN 50549-1 is the TECHNICAL standard the inverter must comply with. Modern UK hybrid inverters (GivEnergy, Tesla, Sigenergy, SolarEdge) carry BS EN 50549-1 type approval. The cert evidence bundle records the type-approval certificate.',
  },
  {
    id: 'm4s7-g100-verification',
    question:
      'EREC G100 verification testing at commissioning — what does the installer test?',
    options: [
      'Nothing',
      'EREC G100 specifies the verification procedure: (1) simulate over-export by reducing the local load while PV / BESS is producing — measure that export does NOT exceed the configured limit; (2) test the response time of the export-control device (typical spec ≤5 s response to load drop); (3) test the failure mode — if export-control device fails (CT cable disconnected, signal lost), the system should default to a SAFE state (typically full export limitation OR full inverter shutdown). Cert evidence bundle records the test results + control device manufacturer compliance',
      'Customer\'s job',
      'Just visual',
    ],
    correctIndex: 1,
    explanation:
      'EREC G100 verification at commissioning is the audit trail proving the install respects the configured export limit. Critical tests: (1) OVER-EXPORT simulation — reduce local load (e.g. turn off all loads on a sunny day) while PV+BESS is producing; measure net export at the supply tail; verify the limit is enforced; (2) RESPONSE TIME — sudden load drop (e.g. fridge cycle ending); measure how quickly the inverter reduces output to maintain the limit; typical spec ≤5 s; (3) FAILURE MODE — disconnect the CT cable; system should default to safe state (full limit or inverter shutdown). Modern hybrid inverters (GivEnergy, Sigenergy, SolarEdge) have built-in G100 verification logging that records each event. The cert evidence bundle includes the commissioning test results.',
  },
  {
    id: 'm4s7-multi-source-coordination',
    question:
      'Hybrid PV+BESS+EV install — how do EREC G98 / G99 / G100 coordinate the multiple sources?',
    options: [
      'Each separate',
      'The EREC paperwork covers the INSTALL\'s grid-export capacity — what AC current the install can push to the grid. PV inverter, BESS inverter, V2G (vehicle-to-grid) EV charger all contribute. The DNO cares about TOTAL export. The install must coordinate: G98 fit-and-notify covers up to 16 A; above 16 A, G99 application + possibly G100 export limit. The competent install includes export-control logic that respects the combined limit regardless of which source is producing. Cert evidence bundle records each source + the combined coordination',
      'Customer\'s preference',
      'No coordination needed',
    ],
    correctIndex: 1,
    explanation:
      'Multi-source hybrid installs (PV + BESS + V2G EV) need export coordination. The DNO\'s concern is total install-to-grid export. EREC paperwork covers the install as a unit, not per-source. Practical implementation: hybrid inverter with built-in G100 export control measures NET grid flow + modulates ALL sources to respect the configured limit. For V2G integration (still emerging in UK 2025-2026): the V2G EV charger reports its export contribution to the inverter\'s coordination logic. The combined system respects the EREC limit. Cert evidence bundle: original PV registration + BESS registration + V2G registration (where applicable) + combined-export verification.',
  },
  {
    id: 'm4s7-bs-en-61439',
    question:
      'Reg 551.7.2.2 (NEW A4:2026) — when does it apply, and which BS EN 61439 part is most relevant for a typical UK domestic hybrid PV+BESS install?',
    options: [
      'Doesn\'t apply',
      'Reg 551.7.2.2 applies whenever a generating set (including PV inverter, BESS PCE, hybrid inverter) is connected via a low-voltage switchgear / controlgear assembly. For UK domestic, the consumer unit IS the assembly — typically BS EN 61439-3 (Distribution Boards intended to be operated by Ordinary persons — DBO). Most UK CE-marked domestic consumer units comply. For commercial / industrial installs the relevant standard is BS EN 61439-1 (general rules) + BS EN 61439-2 (Power Switchgear and Controlgear assemblies). The PEI design pack records the assembly + manufacturer\'s type-test certificate',
      'BS EN 61439-1 only',
      'No standard required',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.2.2 (NEW A4:2026) ties source-connection panels to the BS EN 61439 series. Three parts apply per scale: BS EN 61439-1 (general rules — always applies as parent standard); BS EN 61439-2 (PSC — Power Switchgear and Controlgear — for commercial / industrial distribution); BS EN 61439-3 (DBO — Distribution Boards for ordinary persons — the typical UK domestic consumer unit). Most UK CE-marked CUs are tested to BS EN 61439-3. For commercial source connections via custom panels, the panel manufacturer provides a BS EN 61439-1/-2 type-test certificate as the cert evidence. Cert evidence bundle records the assembly reference, the BS EN 61439 part, and the manufacturer\'s declaration.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Customer\'s install: 6 kWp PV + GivEnergy 9.5 kWh BESS via Gen3 5 kW hybrid inverter. Customer wants &ldquo;fastest possible&rdquo; install. Best EREC path?',
    options: [
      'G99 — full registration',
      'EREC G100 export limit to ≤16 A AC (~3.68 kW) — keeps the install under G98 fit-and-notify (28-day notification, no DNO pre-approval wait). The 5 kW hybrid inverter is configured (via GivEnergy app) to limit export to 16 A. Local self-consumption + BESS charging absorbs surplus above the limit. Trade-off: peak export capacity capped at 3.68 kW; some PV surplus may go uncaptured if BESS full + loads minimal. For typical UK domestic with EV / heat pump self-consumption, the cap rarely binds',
      'Customer doesn\'t need EREC',
      'Wait for grid upgrade',
    ],
    correctAnswer: 1,
    explanation:
      'EREC G100 export limit is the fastest path for installs that exceed G98 threshold. Configure the GivEnergy Gen3 to limit AC export to 16 A (3.68 kW) — keeps install under G98 fit-and-notify. Customer install commissioned and notified within 28 days. The export cap rarely binds in practice because: (a) midday surplus typically charges BESS first; (b) most UK domestic loads (especially heat pump + EV charging) absorb significant midday generation. Where surplus DOES exceed the cap (rare bright midday on weekend with full BESS), the excess is curtailed — not exported, but also not wasted (PV inverter reduces output, modules cool). Cert evidence bundle: EREC G98 notification + G100 export-limit verification.',
  },
  {
    id: 2,
    question:
      'AC-coupled retrofit: existing 4 kWp PV (Solis 3.68 kW inverter, G98) + adding 10 kWh BESS with GivEnergy AC battery (5 kW PCE). Customer doesn\'t want export limit. Path?',
    options: [
      'G98 stays',
      'EREC G99 application for the combined install (3.68 + 5 = ~37.7 A combined). Submit before BESS install; wait 4-8 weeks for DNO assessment. The DNO assesses the local network capacity for the combined export. Approval typically granted without conditions for typical UK suburban networks; some constrained networks may approve with G100 export limit conditions. The cert evidence bundle records: original PV G98 + new combined G99 application + DNO approval letter + any conditions',
      'No paperwork',
      'Same G98',
    ],
    correctAnswer: 1,
    explanation:
      'Combined 8.68 kW (3.68 + 5) AC capacity exceeds G98 threshold significantly. Without export limit, EREC G99 application is the route. DNO assesses: voltage rise at supply tail under combined export; thermal capacity of feeder cables; harmonic injection; protection coordination. Typical UK suburban: 4-8 week timeline; approval granted. Constrained networks: approval may have conditions (G100 limit, peak-export curtailment, etc.). Cert evidence bundle: original PV G98 + new G99 paperwork. Customer informed of the timeline + any conditions imposed by DNO.',
  },
  {
    id: 3,
    question:
      'Customer asks: &ldquo;Why does my hybrid install need a different EREC application than my neighbour\'s pure PV install?&rdquo;. Their AC capacities are both 5 kW. Explain.',
    options: [
      'No difference',
      'Reg 551.7.2.1 treats stationary batteries as GENERATING SETS not loads. The neighbour\'s pure PV: 5 kW PV inverter, G99 covers PV generation. Customer\'s hybrid: 5 kW hybrid inverter handling PV + BESS, but the BESS PCE adds generation capacity even when PV isn\'t producing (BESS can discharge to grid). The DNO\'s perspective: the install can export 5 kW from PV (sunny) OR from BESS (any time) OR combined — the &ldquo;always-on&rdquo; export capability triggers more careful assessment. Same paperwork (G99), different DNO consideration',
      'Customer pays more tax',
      'Same paperwork',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.7.2.1 (UPDATED A4:2026): stationary batteries shall be considered a generating set, NOT a load. This matters for EREC: a pure PV install can export only when PV is generating (daylight, weather-dependent). A hybrid PV+BESS install can export ANY TIME (BESS discharge) — including peak grid-demand evening periods. The DNO considers this in network assessment. Paperwork-wise: same G98 / G99 / G100 framework applies; but DNO\'s technical assessment differs (the BESS adds &ldquo;dispatchable&rdquo; capacity). For some networks, the assessment is more conservative for hybrid; for others, more favourable (BESS can support grid services). Cert evidence bundle records the DNO approval + any conditions.',
  },
  {
    id: 4,
    question:
      'Reg 551.7.1(c) bidirectional protective device — practical implementation for a hybrid PV+BESS install at the consumer unit?',
    options: [
      'No device needed',
      'A bidirectional MCB / RCBO at the source-connection point in the consumer unit. Types: BS EN 60898-2 / IEC 60898-3 DC-rated MCBs (suitable for AC + bidirectional); some AC MCBs are explicitly bidirectional per manufacturer datasheet. The device sits between the hybrid inverter AC output and the consumer unit busbar; trips on overcurrent regardless of which direction the current was flowing. Plus the Reg 551.7.1(d) source-connection rule: device on its own circuit, NOT on the load side of the main RCD',
      'Always one-way',
      'Customer chooses',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.7.1(c) (NEW A4:2026) bidirectional protective device at the source connection. Practical: select an MCB / RCBO with manufacturer-confirmed bidirectional capability. Examples: BS EN 60898-2 (industrial DC-rated MCBs that are also AC-bidirectional); BS IEC 60898-3 (DC-rated). The device sits on the source\'s dedicated circuit from the CU busbar. Combined with Reg 551.7.1(d) (NEW A4:2026): device on its own circuit, NOT on the load side of the main RCD. The cert evidence bundle records the device manufacturer / model / bidirectional capability statement.',
  },
  {
    id: 5,
    question:
      'EREC G100 verification commissioning — installer simulates over-export by switching off all loads on a sunny day. Measured net export at supply tail = 4.2 kW. Configured G100 limit = 16 A AC (3.68 kW). Pass or fail?',
    options: [
      'Pass',
      'FAIL — exports above the configured limit. Investigation: (1) hybrid inverter\'s G100 setting verify; (2) CT clamp orientation + signal verification; (3) response time of the inverter to the measured net export; (4) any signal cable damage / EMI affecting the CT measurement; (5) firmware version vs latest. Likely fix: re-configure G100 settings in inverter app; verify CT orientation; re-test. Cert evidence bundle records the initial fail + the rectification + final pass result',
      'Pass — close enough',
      'Customer\'s problem',
    ],
    correctAnswer: 1,
    explanation:
      'EREC G100 verification: install MUST respect the configured limit. Measured 4.2 kW vs configured 3.68 kW = 14% over — fail. Diagnostic priority: (1) verify G100 setting in inverter app (typo? wrong unit?); (2) CT clamp orientation matches manufacturer arrow; (3) response-time test — the inverter\'s reduction speed when load drops; (4) signal cable + EMI immunity; (5) firmware update may have changed behaviour. Resolution: re-configure; verify CT; re-test. Pass once measured net export ≤ configured limit. Cert evidence bundle records both the fail + rectification — important for MCS / DNO audit trail.',
  },
  {
    id: 6,
    question:
      'How does the EREC G98 / G99 process change for installs using V2G (vehicle-to-grid) EV chargers?',
    options: [
      'No change',
      'V2G adds a NEW generation source (the EV battery via bidirectional charger). The EREC paperwork must include the V2G capacity. UK 2025-2026: V2G is emerging — only a few approved V2G chargers (Quasar / Wallbox Quasar, Indra V2H, Octopus / Ohme V2G in trials). Each V2G charger has its own EREC type-approval; the install\'s EREC registration includes the V2G charger\'s AC output capacity. Coordination required between PV inverter + BESS PCE + V2G charger to respect combined EREC limit',
      'No EVs allowed',
      'V2G is just a load',
    ],
    correctAnswer: 1,
    explanation:
      'V2G (vehicle-to-grid) inverts the EV charger\'s usual role — the EV battery becomes a dispatchable energy source. UK 2025-2026 V2G market: Wallbox Quasar / Quasar 2; Indra V2H (vehicle-to-home, similar concept); Octopus / Ohme V2G trials with select customers. Each V2G charger carries its own EREC type-approval (BS EN 50549-1 compliance). Install with V2G + PV + BESS: combined EREC capacity = PV inverter + BESS PCE + V2G charger AC output. Coordination logic in the hybrid inverter (or V2G charger\'s management software) ensures combined export respects the EREC limit. Cert evidence bundle records each source + the combined coordination.',
  },
  {
    id: 7,
    question:
      'BS EN 50549-1 anti-islanding window — what V and freq thresholds and trip times apply for UK domestic hybrid inverters?',
    options: [
      'No thresholds',
      'BS EN 50549-1 specifies: V trip thresholds 0.85-1.10 pu (UK 196-253 V on 230 V nominal); freq trip thresholds 47.5-51.5 Hz (UK on 50 Hz nominal). Anti-islanding trip times: typical 0.2 s for major excursions; 2-5 s for minor excursions; ride-through requirements for short transient dips. UK EREC G99 specifies the operational settings. Modern hybrid inverters (GivEnergy, Tesla, Sigenergy) ship with UK-specific BS EN 50549-1 / EREC G99 profiles loaded',
      'Customer chooses',
      'No standard',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50549-1 anti-islanding window (typical UK domestic): V 196 V (0.85 × 230) to 253 V (1.10 × 230); freq 47.5 to 51.5 Hz on 50 Hz nominal. Trip times scaled by excursion severity: V/freq just outside the &ldquo;normal&rdquo; window (say 0.85-0.88 V) — longer trip time (1-5 s) allowing ride-through; V/freq well outside (e.g. &lt;0.85 V) — fast trip (0.2 s). Plus EREC G99 specifies additional UK-specific settings. Modern hybrid inverters ship with UK regional profiles pre-loaded — installer just selects &ldquo;UK&rdquo; in the commissioning app. Cert evidence bundle records the inverter\'s BS EN 50549-1 type-approval certificate + the configured regional profile.',
  },
  {
    id: 8,
    question:
      'Cert evidence bundle for the EREC dimension of a hybrid PV+BESS install — what documents?',
    options: [
      'None',
      '(1) Original PV inverter EREC G98 / G99 paperwork (if pre-existing); (2) BESS EREC G98 / G99 paperwork for the BESS PCE; (3) Combined-install EREC G99 application + DNO approval letter; (4) EREC G100 verification testing results (if export-limited); (5) BS EN 50549-1 type approval certificates for each PCE (PV inverter, BESS inverter / hybrid inverter, V2G charger if applicable); (6) Reg 551.7.1(c) bidirectional protective device manufacturer datasheet; (7) DNO confirmation of receipt + final approval. Plus the cross-references to MCS / Chapter 57 / Chapter 82 design packs',
      'Customer\'s problem',
      'No documents',
    ],
    correctAnswer: 1,
    explanation:
      'Hybrid install EREC cert evidence: (1) EREC G98 / G99 paperwork — original PV (if retrofit) + new BESS (if separate) OR combined for new-build; (2) DNO approval letter (G99 path); (3) G100 export-limit verification (if applicable); (4) BS EN 50549-1 type-approval certificates per PCE; (5) Reg 551.7.1(c) bidirectional device datasheet; (6) DNO confirmation. The MCS-certified contractor assembles this alongside MCS MIS 3002 PV pack + Chapter 57 BESS pack + Chapter 82 PEI pack into the cert evidence bundle. Module 4.8 covers commissioning + cert evidence bundle assembly in depth.',
  },
];

const faqs = [
  {
    question: 'Why is Reg 551.7.2.1 important for hybrid PV+BESS EREC?',
    answer:
      'Reg 551.7.2.1 (UPDATED A4:2026): stationary batteries shall be considered a generating set, NOT a load. This means: BESS PCE\'s AC output ADDS to the install\'s registered generation capacity for EREC purposes. Pre-A4 some interpretations treated BESS as a load (charging from grid) and a source (discharging to grid) — ambiguous for EREC. A4:2026 clarifies: BESS is a generating set, full stop. AC-coupled retrofit adding 5 kW battery PCE adds 5 kW to the EREC registration. Cert evidence bundle records the registration based on this clarification.',
  },
  {
    question: 'EREC G98 vs G99 vs G100 — quick recap for hybrid installs',
    answer:
      'EREC G98 (≤16 A single-phase, ~3.68 kW): fit-and-notify within 28 days of commissioning. Simplest path. EREC G99 (above 16 A): apply-and-wait, 4-8 weeks DNO assessment. Required when combined AC capacity exceeds threshold + no export limit. EREC G100: export limitation — limit grid export to ≤16 A or to DNO-approved threshold. Keeps install under G98 OR satisfies G99 conditional approval. For hybrid PV+BESS: typical UK domestic 5 kW hybrid (~21.7 A) exceeds G98 — choice between G99 (no export limit) or G100 (export limit, faster install). Cert evidence bundle records the chosen path.',
  },
  {
    question: 'How does G100 export-limit logic work in a DC-coupled hybrid?',
    answer:
      'DC-coupled hybrid inverter has internal logic to allocate power: PV generation → (a) loads (priority 1, no export); (b) BESS charging (priority 2, no export); (c) grid export (priority 3, capped by G100 limit). When PV production exceeds (loads + BESS charge capacity), the surplus would flow to grid as export. The G100 logic measures net grid flow via supply-tail CT; reduces inverter output to keep net export ≤ configured limit. Result: BESS prioritised; export capped; some PV may be curtailed if BESS full + loads minimal + sunny. Curtailment is rare in practice for typical UK domestic with EV / heat pump self-consumption.',
  },
  {
    question: 'What\'s the typical EREC G99 timeline for hybrid installs?',
    answer:
      'UK typical 2025-2026: 4-8 weeks DNO assessment after application submission. Variability by DNO: UK Power Networks ~4-6 weeks; SP Energy Networks ~5-7 weeks; SSE ~6-8 weeks; Northern Powergrid ~4-6 weeks; National Grid Electricity Distribution ~5-7 weeks. Assessment looks at: local network voltage rise capacity; thermal capacity; harmonic injection; protection coordination; combined export forecast. Approval typically granted; conditions imposed for constrained networks (G100 limit, peak-export curtailment, etc.). Cert evidence bundle records timeline + conditions.',
  },
  {
    question: 'Can a hybrid install be EREC-registered before BESS commissioning?',
    answer:
      'EREC registration is typically tied to install commissioning. G98 fit-and-notify: notification within 28 days OF commissioning. G99: application BEFORE commissioning, approval before commissioning, commissioning notification AFTER commissioning. For hybrid PV+BESS install: register the combined capacity from the start; commission per the registration; submit commissioning notification per G98 / G99 process. Phased commissioning (PV first, BESS later) is sometimes done — original PV G98 + later BESS G99 / G100 update. Cert evidence bundle records each phase.',
  },
  {
    question: 'How does G100 verification differ between AC-coupled and DC-coupled hybrid?',
    answer:
      'Same verification spec applies — but the implementation differs. DC-coupled hybrid: single inverter with built-in CT + G100 logic; verification tests the inverter\'s internal export limitation. AC-coupled (separate PV inverter + BESS PCE): the export-limit device may be: (a) built into one PCE (typically the BESS PCE) which acts as the export controller; (b) external device with a CT that signals both PCEs. AC-coupled coordination is more complex; some legacy AC-coupled installs need retrofit of an external G100 device. Cert evidence bundle records the implementation approach.',
  },
  {
    question: 'Does the bidirectional protective device per Reg 551.7.1(c) need to be at every source connection?',
    answer:
      'Yes — Reg 551.7.1(c) (NEW A4:2026) requires a bidirectional protective device where energy flow is bidirectional. In a hybrid install: bidirectional flow at the hybrid inverter\'s AC output (PV → grid + BESS → grid + grid → BESS); bidirectional flow at the AC-coupled BESS PCE\'s connection. Each source connection needs the bidirectional device. Examples of compliant devices: BS EN 60898-2 industrial DC-rated MCBs (also AC-bidirectional capable); manufacturer-confirmed bidirectional AC MCBs. Cert evidence bundle records each device + its bidirectional capability statement.',
  },
  {
    question: 'Section 4.8 commissioning — how does it tie into EREC paperwork?',
    answer:
      'EREC commissioning notification is one component of the cert evidence bundle assembled at handover. Section 4.8 covers the integrated commissioning workflow: BS EN 62446-1 PV commissioning + BESS commissioning per BS EN IEC 62485 + Chapter 82 PEI verification + EREC G98 / G99 / G100 verification + customer handover. The cert evidence bundle integrates ALL of these into the customer-deliverable package. EREC paperwork is the DNO-facing dimension; the rest is the install-quality dimension. Both are required for a complete cert evidence bundle.',
  },
  {
    question: 'How do UK SEG (Smart Export Guarantee) tariffs interact with EREC paperwork?',
    answer:
      'SEG is the UK\'s replacement for the old Feed-in Tariff — pays customers for exported electricity. Each licensed electricity supplier offers SEG tariffs. Customer signs up for SEG with their chosen supplier after EREC commissioning + DNO confirmation. The SEG paperwork is independent of EREC but builds on it — the supplier verifies the customer has valid EREC registration + DNO confirmation before paying for export. Cert evidence bundle becomes the customer\'s SEG application supporting documentation. Module 1 Section 5 covers SEG economics in depth.',
  },
];

export default function RenewableEnergyModule4Section7() {
  const navigate = useNavigate();

  useSEO({
    title:
      'EREC G98 / G99 / G100 for hybrid | Renewable Energy 4.7 | Elec-Mate',
    description:
      'EREC G98 / G99 / G100 for hybrid PV+BESS — multi-source export capacity, Reg 551.7.1(c) bidirectional protective device, Reg 551.7.2.1 batteries as generating sets, BS EN 50549-1 type approval, G100 verification testing.',
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
            eyebrow="Module 4 · Section 7 · BS 7671:2018+A4:2026"
            title="EREC G98 / G99 / G100 for hybrid"
            description="Multi-source export capacity, Reg 551.7.1(c) bidirectional protective device (NEW A4:2026), Reg 551.7.2.1 stationary batteries treated as generating sets, BS EN 50549-1 type approval, G100 verification testing for hybrid PV+BESS installs."
            tone="yellow"
          />

          <TLDR
            points={[
              'EREC G98 / G99 / G100 framework applies to hybrid PV+BESS — but the AC capacity calculation INCLUDES the BESS PCE per Reg 551.7.2.1 (UPDATED A4:2026: batteries treated as generating set, NOT load).',
              'DC-coupled hybrid: single hybrid inverter AC output is the registration figure. AC-coupled: COMBINED PV inverter + BESS PCE AC outputs. Typical UK 5 kW hybrid (~21.7 A) exceeds G98 threshold (16 A); options: G99, G100, or downsize.',
              'Reg 551.7.1(c) NEW A4:2026: bidirectional protective device at source connection. Reg 551.7.1(d) NEW A4:2026: source NOT on load side of main RCD. Both apply to hybrid PV+BESS at the consumer-unit interface.',
              'BS EN 50549-1 is the technical standard underpinning UK EREC G98 / G99 anti-islanding + V/freq trip behaviour. UK hybrid inverters (GivEnergy / Tesla / Sigenergy / SolarEdge) carry BS EN 50549-1 type approval; ship with UK regional profiles.',
              'EREC G100 export limitation: CT on supply tail measures net export; hybrid inverter modulates output to keep net export ≤ configured limit. Verification testing at commissioning: over-export simulation + response time + failure mode.',
              'Cert evidence bundle EREC dimension: G98 / G99 paperwork + DNO approval + G100 verification (if applicable) + BS EN 50549-1 type approvals + Reg 551.7.1(c) bidirectional device datasheet + DNO confirmation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate hybrid install combined AC output capacity per Reg 551.7.2.1 (stationary batteries as generating sets); determine EREC G98 / G99 / G100 path.',
              'Apply Reg 551.7.1(c) NEW A4:2026 bidirectional protective device at the source connection; coordinate with Reg 551.7.1(d) source-not-on-load-side rule.',
              'Specify the EREC G99 application content for hybrid installs; understand DNO assessment criteria + typical 4-8 week timeline.',
              'Configure EREC G100 export limitation in the hybrid inverter; run verification testing per EREC G100 spec at commissioning.',
              'Identify BS EN 50549-1 type-approval requirements for hybrid inverter brands; configure UK regional profiles per EREC G99.',
              'Assemble the EREC dimension of the cert evidence bundle: paperwork, DNO approval, G100 verification, type-approval certificates, bidirectional device datasheets, DNO confirmation.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Batteries count as generating sets (Reg 551.7.2.1). Combined AC capacity drives EREC path. G98 fit / G99 wait / G100 limit.</Pullquote>

          <ContentEyebrow>Reg 551.7.2.1 — batteries as generating sets (UPDATED A4:2026)</ContentEyebrow>

          <ConceptBlock
            title="The A4:2026 clarification on BESS classification"
            plainEnglish="A4:2026 updated Reg 551.7.2.1 to clarify that stationary batteries shall be considered a generating set, NOT a load. This matters for EREC: the BESS PCE\'s AC output capacity ADDS to the install\'s registered generation."
            onSite="Pre-A4 ambiguity: BESS charges from grid (load behaviour) AND discharges to grid (source behaviour). Different DNO interpretations led to inconsistent registration. A4:2026 settles it: BESS is a generating set for EREC purposes. Practical effect: hybrid installs are registered for COMBINED AC output (PV + BESS + V2G if applicable)."
          >
            <p>Reg 551.7.2.1 practical implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">DC-coupled hybrid (single inverter)</strong> — register the inverter\'s AC output rating (e.g. 5 kW GivEnergy Gen3 → ~21.7 A → G99 territory)</li>
              <li><strong className="text-white">AC-coupled (separate PV + BESS inverters)</strong> — register COMBINED AC output (4 kW PV + 5 kW BESS = 9 kW → ~39 A → well above G98 threshold)</li>
              <li><strong className="text-white">Retrofit BESS to existing PV</strong> — the original PV registration stays but the BESS addition typically triggers updated EREC paperwork (G99 application or G100 limit)</li>
              <li><strong className="text-white">V2G EV chargers</strong> — also count as generating sets when in V2G export mode. Combined PV + BESS + V2G registered together</li>
              <li><strong className="text-white">DNO perspective</strong> — &ldquo;always-on&rdquo; export capability from BESS (vs PV which is daytime-only weather-dependent) may affect DNO assessment</li>
              <li><strong className="text-white">SEG tariff</strong> — exported kWh paid per SEG agreement regardless of source (PV or BESS or V2G)</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.2.1 — Stationary batteries as generating sets (UPDATED A4:2026)"
            clause="The generating set shall be installed on the supply side of all the protective devices for the final circuits of a distribution board. For the purposes of this regulation, stationary secondary batteries in accordance with Chapter 57 shall be considered a generating set and not a load. NOTE: For the intent of this regulation a source of generation should be installed on its own dedicated circuit."
            meaning="Reg 551.7.2.1 UPDATED in A4:2026 explicitly classifies stationary batteries as generating sets, not loads. Two practical consequences: (1) the BESS PCE&rsquo;s AC output adds to the install&rsquo;s registered generation capacity for EREC purposes — combined PV + BESS AC output drives the G98 / G99 / G100 decision; (2) the generating set must be on a dedicated circuit at the supply side of all final-circuit protective devices — i.e. it cannot share a circuit with general loads. Combined with Reg 551.7.1(c) protective-device selection per Reg 530.3.201 and Reg 551.7.1(d) source-not-on-load-side-of-RCD, the A4:2026 source-connection regs apply to hybrid PV+BESS installs throughout. Cert evidence bundle records the dedicated source circuit + the registration capacity calculation."
          />

          <ConceptBlock
            title="Reg 551.7.2.2 — LV switchgear assembly for the source connection"
            plainEnglish="Where a generating set (PV inverter, BESS PCE, hybrid inverter, genset) is connected via a low-voltage switchgear or controlgear assembly, that assembly shall comply with the BS EN 61439 series. This covers commercial / larger hybrid installs where source connections go through a custom-built switchgear / distribution board rather than a single MCB position in a domestic consumer unit."
            onSite="For UK domestic hybrid PV+BESS (≤10 kW total): the source typically connects via a dedicated way in the consumer unit + bidirectional MCB — the consumer unit is the assembly. For light commercial / SME (10-50 kW): source connection often goes via a dedicated panel built per BS EN 61439-1 + -2 (PSC / distribution board) or BS EN 61439-3 (DBO — distribution boards intended to be operated by ordinary persons). For larger commercial / industrial (50 kW+): purpose-built switchgear panel built to BS EN 61439-1/-2 standards. The panel manufacturer provides the type-test certificate and the as-built documentation."
          >
            <p>Reg 551.7.2.2 in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">BS EN 61439-1</strong> — general rules for low-voltage switchgear and controlgear assemblies</li>
              <li><strong className="text-white">BS EN 61439-2</strong> — power switchgear and controlgear assemblies (PSC) — the typical reference for commercial / industrial distribution boards</li>
              <li><strong className="text-white">BS EN 61439-3</strong> — distribution boards intended to be operated by ordinary persons (DBO) — applies to domestic consumer units. Most UK domestic CUs are CE-marked to this</li>
              <li><strong className="text-white">Domestic install</strong> — the consumer unit IS the assembly. Source connects via dedicated way + bidirectional MCB (Reg 551.7.1(c)) + busbar-side connection (Reg 551.7.1(d)). CU manufacturer&rsquo;s type-test certificate is the evidence</li>
              <li><strong className="text-white">Commercial / industrial</strong> — source connection panel built per BS EN 61439-1/-2 with type-test from panel manufacturer. The PEI design pack records the panel manufacturer, the assembly reference + the type-test certificate</li>
              <li><strong className="text-white">Source-side switchgear specifics</strong> — switchgear at the source connection point must accommodate: bidirectional OCPDs; the multi-source isolation per Reg 826.1.1.4; labelling per Reg 537.1.6 (identifying isolation purpose + the source it isolates)</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the assembly reference, the BS EN 61439 series declaration, the manufacturer&rsquo;s type-test certificate, the as-built schedule</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.2.2 — LV switchgear assembly rated current (NEW A4:2026)"
            clause="When a generating set is used as an additional source of supply in parallel with another source and the generating set is connected via a low voltage switchgear and controlgear assembly then the assembly shall be selected so that its rated current meets one of the following criteria: (a) I_na &ge; I_n(i) + I_g(s); (b) I_na &ge; I_n(i); (c) I_na &ge; I_cxs(max); or (d) I_na &ge; I_lr. Where indent (d) is used: (e) diversity shall not be used for load control, and (f) a warning notice shall be attached in a visible position on the LV assembly identifying the maximum permitted connected load (I_lr). NOTE: Refer to ENA Engineering Recommendation G100 for appropriate customer&rsquo;s export and import limitation scheme requirements."
            meaning="Reg 551.7.2.2 (NEW A4:2026) sets a SIZING rule for the LV switchgear assembly at the source connection. The rated current of the assembly (I_na) must be at least equal to one of four totals — covering scenarios from full unrestricted current flow to G100 export-limitation schemes. For UK domestic hybrid PV+BESS in a CU compliant with BS EN 61439-3, this is normally straightforward: the CU&rsquo;s rated current must accommodate the OCPD and the generating set output. For commercial installs with bespoke panels (BS EN 61439-1/-2 type-tested), the panel manufacturer&rsquo;s rating + the design pack calculation evidence the compliance. Where option (d) is used, a warning notice on the assembly is mandatory. Cert evidence bundle records the assembly reference, the chosen criterion (a-d), and the I_na justification."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Reg 551.7.1(c) — bidirectional protective device (NEW A4:2026)</ContentEyebrow>

          <Pullquote>Bidirectional MCB at source connection. Pairs with Reg 551.7.1(d) source-not-on-load-side rule.</Pullquote>

          <ConceptBlock
            title="The new A4:2026 source-connection regs"
            plainEnglish="A4:2026 added two new indents to Reg 551.7.1: (c) bidirectional protective device required where energy flow is bidirectional; (d) source not on load side of an RCD protecting other parts of the install. Both apply to hybrid PV+BESS at the consumer-unit interface."
            onSite="Modern UK consumer units may need re-architecture for hybrid installs to satisfy Reg 551.7.1(d) — the source must have its own circuit from the busbar (NOT downstream of the main RCD). Plus the bidirectional protective device per Reg 551.7.1(c). Module 3 Section 6 covers Reg 551.7.1(d) implementation in depth."
          >
            <p>The two new A4:2026 regs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 551.7.1(c) — bidirectional protective device</strong> — required where energy flow is bidirectional. Hybrid PV+BESS: current can flow either way at the source connection (export OR import for BESS charging from grid). The protective device (MCB / RCBO) must operate in either direction</li>
              <li><strong className="text-white">Reg 551.7.1(d) — source not on load side of RCD</strong> — source must connect to the busbar BEFORE the main RCD (or on its own circuit). Module 3 Section 6 covers in depth</li>
              <li><strong className="text-white">Compatible devices</strong> — BS EN 60898-2 industrial DC-rated MCBs (also AC-bidirectional); BS IEC 60898-3 DC-rated MCBs; manufacturer-confirmed AC bidirectional MCBs</li>
              <li><strong className="text-white">Manufacturer evidence</strong> — datasheet statement confirming bidirectional capability + tripping behaviour from either direction</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — device manufacturer / model / datasheet extract + the Reg 551.7.1(c)/(d) compliance statement</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.1 — Connection of generating sets in parallel (UPDATED A4:2026)"
            clause="When a generating set is used as an additional source of supply in parallel with another source, all of the following conditions shall be fulfilled: (a) protection against thermal effects in accordance with Chapter 42 and protection against overcurrent in accordance with Chapter 43 shall remain effective in all situations; (b) where an RCD is providing additional protection in accordance with Regulation 415.1 for a circuit connecting the generator set to the installation, the RCD shall disconnect all live conductors, including the neutral conductor; (c) protective devices shall be selected in accordance with Regulation 530.3.201; (d) except where the RCD disconnects all live conductors, including the neutral conductor, a source of supply shall not be connected to the load side of any RCD providing additional protection in accordance with Regulation 415.1 that is shared with other circuits."
            meaning="Reg 551.7.1 redrafted in A4:2026, adding indents (c) and (d). Indent (c) routes protective-device selection via Reg 530.3.201 — which states: &lsquo;Selection and erection of equipment for protection shall take account of appropriate use of either a unidirectional protective device or a bidirectional protective device.&rsquo; In practice for hybrid PV+BESS at the source connection, a bidirectional device is required because current flows either way (export OR import for BESS charging from grid). Indent (d) prevents a source being connected to the load side of an RCD that serves other circuits — the source must be on its own circuit from the busbar or on an RCD that disconnects all live conductors (incl. neutral). Both apply to hybrid PV+BESS at the consumer-unit interface; cert evidence bundle records compliance with both."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>EREC G98 / G99 / G100 — three paths</ContentEyebrow>

          <Pullquote>G98 fit-and-notify ≤16 A. G99 apply-and-wait above. G100 export limit keeps you under G98.</Pullquote>

          <ConceptBlock
            title="EREC G98 — fit-and-notify (≤16 A single-phase)"
            plainEnglish="EREC G98 covers generating plant up to 16 A single-phase (or 16 A per phase three-phase). Fit-and-notify process: install + commission, then notify DNO within 28 days of commissioning. Most UK domestic PV-only installs fit G98; hybrid PV+BESS often exceeds the threshold without export limit."
            onSite="G98 threshold: 16 A AC single-phase ≈ 3.68 kW; 16 A per phase three-phase ≈ 11 kW. Modern UK hybrid inverters typically 5-10 kW AC — exceed G98 single-phase. Options: G99 application OR G100 export limit (covered below)."
          >
            <p>G98 process for hybrid installs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">When G98 applies</strong> — combined AC output ≤ 16 A single-phase; the install qualifies for fit-and-notify</li>
              <li><strong className="text-white">For hybrid PV+BESS</strong> — typically requires either small hybrid inverter (3.68 kW) OR EREC G100 export limit to ≤16 A</li>
              <li><strong className="text-white">Notification timeline</strong> — within 28 days of commissioning, submit the G98 notification online to the DNO. Standard form covers: installation address, MPAN, generator type (PV+BESS), capacity, inverter manufacturer/model, MCS cert reference, commissioning date</li>
              <li><strong className="text-white">DNO response</strong> — receipt acknowledgement typically within 5-10 working days; rarely objects for sub-4 kWp installs</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — G98 notification + DNO acknowledgement + MCS certificate</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EREC G99 — apply-and-wait (above 16 A)"
            plainEnglish="EREC G99 covers generating plant above 16 A single-phase. Apply-and-wait process: submit application to DNO BEFORE install; wait 4-8 weeks for DNO assessment; install + commission; submit commissioning notification. Required for typical UK 5+ kW hybrid inverter installs without export limit."
            onSite="UK 2025-2026: G99 is the formal path for hybrid PV+BESS with combined AC capacity above G98. DNO assesses the local network impact + may approve unconditionally OR with G100 export limit conditions."
          >
            <p>G99 process for hybrid installs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">When G99 applies</strong> — combined AC output above 16 A single-phase, no export limit acceptable</li>
              <li><strong className="text-white">Application submission</strong> — BEFORE commissioning. Documentation: install design pack (single-line schematic, component schedule, capacity calculations); MCS-certified contractor reference; site address + MPAN</li>
              <li><strong className="text-white">DNO assessment</strong> — voltage rise capacity; thermal capacity; harmonic injection; protection coordination; combined export forecast. Typical timeline 4-8 weeks (UK DNO variability)</li>
              <li><strong className="text-white">DNO response options</strong> — (a) approve unconditionally; (b) approve with conditions (G100 export limit, peak-export curtailment, supply upgrade); (c) reject (rare; usually network capacity constraint)</li>
              <li><strong className="text-white">After approval</strong> — install + commission; submit G99 commissioning notification</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — G99 application + DNO approval letter (with any conditions) + commissioning notification + DNO confirmation</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EREC G100 — export limitation"
            plainEnglish="EREC G100 covers export-limited installs. Used to keep installs under G98 threshold (fit-and-notify path) OR comply with G99 conditional approval. The hybrid inverter (or external device) limits net grid export to a configured threshold via a CT measuring the supply tail."
            onSite="UK 2025-2026 G100 is widely used for hybrid PV+BESS to avoid G99 4-8 week delay. Hybrid inverter\'s built-in G100 logic + verification testing at commissioning is the standard implementation."
          >
            <p>G100 process for hybrid installs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">G100 implementation</strong> — hybrid inverter\'s built-in CT measurement of supply-tail net flow + export-control logic. Modern brands (GivEnergy, Sigenergy, SolarEdge, Tesla) all support this</li>
              <li><strong className="text-white">Configured limit</strong> — typically 16 A AC (3.68 kW) to keep under G98 threshold; OR DNO-approved limit per G99 conditional approval</li>
              <li><strong className="text-white">Logic priority</strong> — PV → loads (priority 1); PV → BESS (priority 2); PV → grid export (priority 3, capped at limit). Surplus above limit is curtailed at inverter</li>
              <li><strong className="text-white">Verification testing</strong> — at commissioning per EREC G100 spec: over-export simulation; response time; failure mode. Cert evidence bundle records test results</li>
              <li><strong className="text-white">Failure mode</strong> — if CT cable disconnected / damaged: system defaults to SAFE state (typically full limit or inverter shutdown). Verify at commissioning</li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="EREC decision tree for hybrid PV+BESS — three-branch flowchart. Branch 1 (≤16 A combined AC): G98 fit-and-notify, 28-day notification. Branch 2 (above 16 A, no export limit): G99 apply-and-wait, 4-8 weeks DNO assessment. Branch 3 (above 16 A, with export limit): G100 export limit to ≤16 A or DNO-approved level, may keep under G98. Annotated with Reg 551.7.2.1 (batteries as generating sets) + Reg 551.7.1(c) bidirectional device + BS EN 50549-1 type approval."
            filename="renewable/m4s7-erec-decision-tree.png"
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>BS EN 50549-1 — the technical standard</ContentEyebrow>

          <Pullquote>UK EREC operational. BS EN 50549-1 technical. UK regional profiles loaded on UK inverters.</Pullquote>

          <ConceptBlock
            title="BS EN 50549-1 anti-islanding + protection requirements"
            plainEnglish="BS EN 50549-1 is the European harmonised standard for parallel-connected generating plant (up to Type B ~ 1 MW). Defines: anti-islanding methodology + tests; V/freq trip thresholds + disconnection times; loss-of-mains detection; frequency-watt + voltage-VAR response; ride-through behaviour."
            onSite="UK EREC G98 / G99 is the OPERATIONAL framework (registration process); BS EN 50549-1 is the TECHNICAL standard the inverter must comply with. UK hybrid inverters (GivEnergy, Tesla, Sigenergy, SolarEdge, Huawei) ship with BS EN 50549-1 type approval + UK regional profiles."
          >
            <p>BS EN 50549-1 key requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Anti-islanding</strong> — inverter must detect loss of mains + disconnect within trip window. Test methods include passive (V/freq monitoring) + active (frequency-shift injection)</li>
              <li><strong className="text-white">V trip thresholds</strong> — typical 0.85-1.10 pu of nominal (196-253 V on 230 V UK); EREC G99 may tighten</li>
              <li><strong className="text-white">Freq trip thresholds</strong> — typical 47.5-51.5 Hz on 50 Hz nominal; EREC G99 may tighten</li>
              <li><strong className="text-white">Trip times</strong> — typical 0.2 s for major V/freq excursions; 2-5 s for minor; ride-through for short transients</li>
              <li><strong className="text-white">Frequency-watt response</strong> — inverter reduces active power output when frequency exceeds 50.2 Hz (UK setting); supports grid frequency stability</li>
              <li><strong className="text-white">Voltage-VAR response</strong> — inverter provides reactive power to support grid voltage; configurable per DNO requirements</li>
              <li><strong className="text-white">Type approval certificate</strong> — independent test-lab certificate confirming compliance. UK inverter brands carry this for UK product approval</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.5 — BS EN 50549-1 reference for small generators"
            clause="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4. NOTE: For a generating set with an output not exceeding 16 A intended to operate in parallel with a system for distribution of electricity to the public, the requirements are given in BS EN 50549-1."
            meaning="Reg 551.7.5 references BS EN 50549-1 as the technical standard for small generating plants (≤16 A) intended to operate in parallel with the public network. The inverter\'s BS EN 50549-1 type approval is the technical evidence underpinning the EREC G98 / G99 registration. Cert evidence bundle records the type approval certificate."
          />

          <InlineCheck {...inlineChecks[5]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>EREC paperwork in the cert evidence bundle</ContentEyebrow>

          <Pullquote>Original PV EREC + new BESS EREC + combined registration + G100 verification + BS EN 50549-1 type approval + DNO confirmation.</Pullquote>

          <ConceptBlock
            title="The EREC dimension of the cert evidence bundle"
            plainEnglish="The cert evidence bundle for a hybrid PV+BESS install integrates the EREC paperwork alongside the technical design packs (MCS MIS 3002 PV, Chapter 57 BESS, Chapter 82 PEI, BS EN 62446-1 commissioning). The EREC paperwork is the DNO-facing dimension."
            onSite="Module 4.8 covers the integrated commissioning + cert evidence bundle assembly in depth. Section 4.7 focuses on the EREC content within the bundle."
          >
            <p>EREC paperwork in the cert evidence bundle:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">G98 / G99 application form</strong> — completed online via DNO portal; the original submission record</li>
              <li><strong className="text-white">DNO approval letter (G99 only)</strong> — DNO\'s assessment outcome + any conditions imposed (G100 export limit, peak curtailment, supply upgrade requirements)</li>
              <li><strong className="text-white">EREC G100 verification testing record</strong> — commissioning-stage tests of the export-limit function: over-export simulation; response time; failure mode</li>
              <li><strong className="text-white">BS EN 50549-1 type approval certificates</strong> — per PCE in the install (PV inverter, BESS PCE, V2G charger). Manufacturer-supplied; included by datasheet reference</li>
              <li><strong className="text-white">Reg 551.7.1(c) bidirectional protective device datasheet</strong> — manufacturer datasheet extract confirming bidirectional capability</li>
              <li><strong className="text-white">DNO commissioning confirmation</strong> — DNO\'s acknowledgement of receipt + final approval after commissioning notification submitted</li>
              <li><strong className="text-white">For AC-coupled retrofit</strong> — also include the ORIGINAL PV install\'s G98 paperwork + any modifications to reflect the BESS addition</li>
              <li><strong className="text-white">Combined-install registration</strong> — where DNO requires updated registration for the combined hybrid (vs separate per-source), the combined paperwork</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[7]} />

          <InlineCheck {...inlineChecks[8]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="UK 6 kWp + 10 kWh BESS new-build — G99 application path"
            situation="Customer 4-bed semi-detached in suburban UK Power Networks area: 6 kWp PV + GivEnergy 9.5 kWh BESS + Gen3 5 kW hybrid inverter. Customer wants the full 5 kW export capability (no G100 limit), accepts the G99 application timeline."
            whatToDo="EREC G99 application: submit before install via UK Power Networks online portal. Application content: site address + MPAN; install design (PV 6 kWp, hybrid inverter 5 kW AC, BESS 9.5 kWh LFP); MCS-certified contractor reference; expected commissioning date. UK Power Networks assessment: ~6 weeks typical for suburban networks. Approval letter confirms: combined AC output 5 kW (~21.7 A) at single-phase; no G100 export limit required; install proceeds. After commissioning: submit G99 commissioning notification online; UK Power Networks confirmation typically within 5-10 working days. Cert evidence bundle includes: G99 application + UK Power Networks approval letter + commissioning notification + DNO confirmation + BS EN 50549-1 type approval for GivEnergy Gen3 + Reg 551.7.1(c) bidirectional device datasheet."
            whyItMatters="G99 application is the standard path for hybrid installs above the G98 threshold without export limit. The 4-8 week timeline is the cost of full export capability. Customer-informed at survey of the timeline trade-off. Cert evidence bundle is the durable record."
          />

          <Scenario
            title="UK 6 kWp + 10 kWh BESS new-build — G100 export limit path"
            situation="Same install as above but customer wants &ldquo;fastest possible&rdquo; commissioning — can\'t wait for G99. Willing to accept G100 export limit at 16 A."
            whatToDo="EREC G100 export limit path: configure GivEnergy Gen3 to limit AC export to 16 A (3.68 kW) via the GivEnergy app. Install proceeds without G99 application — fits under G98 fit-and-notify. After commissioning: G100 verification testing per EREC spec (over-export simulation: turn off all loads + measure net export; verify capped at 16 A; record response time; verify failure mode by disconnecting CT temporarily). Submit G98 fit-and-notify within 28 days. Cert evidence bundle includes: G98 notification + G100 verification test record + GivEnergy export-limit configuration screenshot + DNO confirmation. Customer informed that peak export is capped; surplus above the cap is curtailed (typically &lt;5% of annual generation in practice)."
            whyItMatters="G100 path is fast — fits under G98 fit-and-notify. Modern hybrid inverters have built-in G100 logic + verification. The 16 A cap is rarely binding for typical UK domestic with EV / heat pump self-consumption. The customer\'s informed decision: speed vs peak export capability. Cert evidence bundle records the rationale."
          />

          <CommonMistake
            title="Not accounting for the BESS in EREC capacity per Reg 551.7.2.1"
            whatHappens="An installer treats the BESS as a &ldquo;load&rdquo; (pre-A4 interpretation) and registers an AC-coupled retrofit BESS install\'s EREC based only on the PV inverter\'s 4 kW capacity. The combined PV + BESS PCE is actually 9 kW AC. MCS / DNO audit flags the missing BESS in the EREC registration; rectification requires retrospective G99 application + new DNO approval."
            doInstead="Reg 551.7.2.1 (UPDATED A4:2026): batteries treated as generating sets, NOT loads. Always include the BESS PCE\'s AC output in the EREC registration capacity calculation. For AC-coupled retrofit: combined AC capacity = PV inverter + BESS inverter. For DC-coupled hybrid: single inverter\'s AC output. The competent installer engages the DNO at design stage to clarify the combined registration. Cert evidence bundle records the calculation."
          />

          <CommonMistake
            title="Missing Reg 551.7.1(c) bidirectional protective device at the consumer unit"
            whatHappens="An installer fits a standard unidirectional AC MCB at the hybrid inverter\'s source connection in the consumer unit. Reg 551.7.1(c) NEW A4:2026 requires bidirectional capability for source connections with bidirectional energy flow. MCS audit flags as major finding under A4:2026; rectification requires fitting a bidirectional MCB (e.g. BS EN 60898-2 industrial DC-rated)."
            doInstead="Specify Reg 551.7.1(c)-compliant bidirectional MCB at design stage: BS EN 60898-2 industrial DC-rated MCB (also AC-bidirectional); BS IEC 60898-3 DC-rated; manufacturer-confirmed AC bidirectional MCBs. The device sits on the source\'s dedicated circuit from the CU busbar (per Reg 551.7.1(d)). Manufacturer datasheet extract confirms bidirectional capability. Cert evidence bundle records the device + the Reg 551.7.1(c)/(d) compliance evidence."
          />

          <CommonMistake
            title="EREC G100 commissioned without verification testing"
            whatHappens="An installer configures G100 export limit in the hybrid inverter app but doesn\'t run the EREC G100 verification testing at commissioning. The install commissions and registers under G98 fit-and-notify. Months later, customer\'s smart meter data shows occasional 4+ kW grid exports — the G100 logic isn\'t actually limiting correctly (CT cable issue or firmware bug). MCS / DNO audit flags the missing verification + the actual breach of the G98 threshold."
            doInstead="Always run EREC G100 verification at commissioning per the EREC spec: (1) over-export simulation — drop loads while PV+BESS producing; verify export capped at configured limit; (2) response time — measure how quickly inverter reduces output to maintain the limit; typical spec ≤5 s; (3) failure mode — disconnect CT cable; system defaults to safe state. Document each test in the cert evidence bundle. The verification testing is the audit trail proving the install respects the EREC G100 / G98 threshold."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 551.7.2.1 (UPDATED A4:2026): stationary batteries treated as generating sets, NOT loads. BESS PCE\'s AC output ADDS to the install\'s registered generation capacity for EREC.',
              'Reg 551.7.1(c) NEW A4:2026: bidirectional protective device at source connection. Reg 551.7.1(d) NEW A4:2026: source NOT on load side of main RCD. Both apply to hybrid PV+BESS.',
              'EREC G98 (≤16 A single-phase, ~3.68 kW): fit-and-notify within 28 days. For hybrid: typically requires small inverter (3.68 kW) or G100 export limit.',
              'EREC G99 (above 16 A): apply-and-wait, 4-8 weeks DNO assessment. UK typical timeline for hybrid PV+BESS installs without export limit. DNO may approve with G100 limit conditions.',
              'EREC G100 export limitation: hybrid inverter\'s built-in CT measurement + export-control logic; configured limit (typically 16 A) keeps install under G98 OR satisfies G99 conditional approval.',
              'BS EN 50549-1 is the technical standard underpinning UK EREC. UK hybrid inverters (GivEnergy / Tesla / Sigenergy / SolarEdge / Huawei) carry type approval; ship with UK regional profiles for V/freq trip + frequency-watt + voltage-VAR.',
              'EREC G100 verification testing at commissioning: over-export simulation; response time; failure mode. Cert evidence bundle records test results.',
              'Cert evidence bundle EREC dimension: G98 / G99 paperwork + DNO approval + G100 verification (if applicable) + BS EN 50549-1 type approvals + Reg 551.7.1(c) bidirectional device datasheet + DNO confirmation + (for retrofit) original PV EREC.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Hybrid inverter &amp; EPS
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.8 Commissioning hybrid &amp; off-grid
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
