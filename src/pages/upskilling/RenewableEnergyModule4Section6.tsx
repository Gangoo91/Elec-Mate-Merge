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
    id: 'm4s6-what-is-eps',
    question:
      "Emergency Power Supply (EPS) — what does it do in a hybrid PV+BESS install?",
    options: [
      "Nothing",
      "EPS is the functional implementation of Chapter 82 island mode. When the DNO supply is lost, the EPS contactor disconnects the install from DNO and the hybrid inverter switches to grid-forming mode — generating V and frequency for the protected loads from PV (during day) + BESS. When DNO restored, the inverter syncs back to DNO and the EPS contactor recloses. Switchover time: 20-200 ms typical",
      "Customer manually starts it",
      "Replaces the grid permanently",
    ],
    correctIndex: 1,
    explanation:
      "EPS = Emergency Power Supply. The hybrid inverter has an EPS-output port (separate from the AC-OUT port) that powers a partition of protected loads during grid outage. Modern UK hybrid inverters with EPS: GivEnergy Gen3 (EPS output on dedicated terminals); Tesla Powerwall 2/3 (Backup Gateway 2/3); Sigenergy SigenStor (EPS-capable); SolarEdge Energy Hub (Backup Interface). Switchover: typical 20-100 ms (fast enough for most appliances; some sensitive electronics may need UPS for true uninterruptible). Cert evidence bundle records the EPS configuration + protected-load partition.",
  },
  {
    id: 'm4s6-anti-islanding',
    question:
      "Anti-islanding vs grid-forming — what's the difference in hybrid inverter operation?",
    options: [
      "Same thing",
      "Anti-islanding (grid-following / grid-tied mode): inverter monitors DNO V and freq; tracks the grid; trips off-grid if DNO disappears (EREC G98 / G99 / BS EN 50549-1 requirement). Used for direct feeding mode in Chapter 82 terms. Grid-forming (island / off-grid mode): inverter GENERATES V and freq itself; supplies loads from local sources; not following any external reference. Used for island mode. The EPS function switches the inverter between these two modes during DNO loss / restoration",
      "Customer chooses",
      "No difference",
    ],
    correctIndex: 1,
    explanation:
      "Anti-islanding vs grid-forming are the two inverter modes: ANTI-ISLANDING (grid-following / grid-tied) — inverter MEASURES DNO V/freq and tracks/synchronises; trips off-grid on DNO loss (EREC G98 / G99 anti-islanding test per BS EN 50549-1 / EN 62116). GRID-FORMING (island) — inverter GENERATES V/freq itself; sets the reference for the local loads; not following anything external. The EPS contactor + inverter logic handles the mode transition. Modern hybrid inverters with EPS: bidirectional capability — switch from grid-following to grid-forming on DNO loss (20-100 ms typical); switch back on DNO restoration (re-sync to DNO V/freq, then reclose EPS contactor).",
  },
  {
    id: 'm4s6-protected-load',
    question:
      "Hybrid PV+BESS with EPS — protected vs non-protected loads. Why partition?",
    options: [
      "All loads protected",
      "EPS-protected loads: a subset of the property's circuits wired through the hybrid inverter's EPS output. These continue to function during DNO outages. Typical UK partition: lighting circuit, fridge/freezer, essential sockets, heating controls, internet router. NON-protected loads: high-power circuits (electric shower, oven, kettle, EV charger, heat pump) that exceed the inverter's EPS output capacity. Partition reflects the inverter EPS rating + the BESS energy capacity for desired backup duration",
      "Customer's choice only",
      "Random",
    ],
    correctIndex: 1,
    explanation:
      "Protected-load partition is critical because the EPS output is power-limited (typically 5-11 kW continuous, depending on inverter brand) and the BESS energy is finite (10-30 kWh typical). All-loads-protected would: (a) overload the EPS on high-power loads (e.g. electric shower 8 kW + oven 3 kW + kettle 3 kW = 14 kW peak exceeds typical 5-7 kW EPS); (b) deplete the BESS quickly (high-power loads). The partition selects loads worth backing up vs loads accepted to lose during outage. Typical UK partition: lighting + fridge/freezer + essential sockets + comms + heating controls = 0.5-2 kW total; backup duration 5-20 hours from BESS depending on load + capacity. Cert evidence bundle records the partition + the duration estimate.",
  },
  {
    id: 'm4s6-eps-output-spec',
    question:
      "UK hybrid inverter EPS output specs — what's the typical capacity range and limitations?",
    options: [
      "Same as grid output",
      "Typical UK hybrid inverter EPS output: 3-11 kW continuous AC, depending on brand and model. GivEnergy Gen3: ~5 kW EPS continuous for the 5 kW model; ~7.6 kW for the 7.6 kW model. Tesla Powerwall 2: ~5 kW continuous + 7 kW peak via Backup Gateway. Tesla Powerwall 3: ~11.5 kW continuous. Sigenergy SigenStor: up to ~10 kW continuous per module. Limitations: short-circuit clearing capacity often lower than grid (1.5-2× rated typical); inrush current handling (motors, compressors) may need soft-start consideration",
      "Always 100 kW",
      "Customer's preference",
    ],
    correctIndex: 1,
    explanation:
      "UK hybrid inverter EPS output 2025-2026: GivEnergy Gen3 5 kW / 7.6 kW / 10 kW models with matching EPS output. Tesla Powerwall 2 paired with Backup Gateway 2: ~5 kW continuous / 7 kW peak. Powerwall 3 (2024+): 11.5 kW continuous (industry-leading); supports DC-coupled mode. Sigenergy SigenStor: modular up to 10 kW per unit. Limitations to design around: (a) short-circuit clearing — EPS may not have the fault-current capacity for full grid behaviour; downstream OCPDs may operate slower than expected — needs Reg 411 disconnection-time analysis under EPS mode; (b) motor inrush — heat pump compressor / fridge motor inrush can exceed EPS continuous rating; soft-start or grouped-load management. Cert evidence bundle records the EPS spec.",
  },
  {
    id: 'm4s6-neutral-switching',
    question:
      "EPS implementation — how does Reg 826.1.1.2.2 neutral switching work in practice?",
    options: [
      "Neutral doesn't switch",
      "The EPS contactor (or backup gateway) is a 4-pole switch — all 4 conductors (L1/L2/L3/N for three-phase, or L/N for single-phase) disconnect from DNO during the transition. The inverter's EPS-output stage creates a NEW local neutral that is earth-bonded for the local install. Sequence: (1) inverter detects DNO loss; (2) EPS contactor opens (all 4 conductors); (3) inverter EPS-output stage activates with local N-E bonded; (4) protected loads now on EPS supply. Modern inverters handle this transparently",
      "Customer's job",
      "Only one conductor switches",
    ],
    correctIndex: 1,
    explanation:
      "EPS contactor is typically a 4-pole (single-phase install: 2-pole L+N; three-phase: 4-pole L1+L2+L3+N) switch-disconnector with synchronised contacts. Sequence on DNO loss: (1) inverter detects DNO V/freq excursion (BS EN 50549-1 anti-islanding window); (2) EPS contactor opens all conductors from DNO (typically 20-100 ms); (3) inverter switches from grid-following to grid-forming; (4) EPS-output stage activates with internal N-E bonding; (5) protected loads now supplied from BESS via inverter. Sequence on DNO restoration: (1) inverter detects DNO V/freq; (2) inverter syncs to DNO; (3) EPS contactor closes (with N-E bonding sequence per Reg 826.1.1.2.2); (4) install back to direct feeding mode. Modern hybrid inverters do this transparently — installer\'s job: verify the protected-load partition + EPS spec match the customer's needs.",
  },
  {
    id: 'm4s6-rcd-island',
    question:
      "RCD operation in EPS island mode — does it work the same as direct feeding mode?",
    options: [
      "Same",
      "Yes, but with caveats. The local N-E bonding (per Reg 826.1.1.2.2) provides the reference for RCD operation in island mode — RCDs detect L-E or N-E imbalance. Caveats: (a) prospective fault current is lower in island mode (limited by inverter EPS capacity) — RCDs operate but disconnection times may be different vs grid mode; needs Reg 411 / 712.531.3.5.1 analysis under island conditions; (b) Type B RCD requirement (Reg 712.531.3.5.1) for PV inverter circuits still applies in island mode — DC residual current can still occur during EPS operation",
      "Doesn't work",
      "Customer's problem",
    ],
    correctIndex: 1,
    explanation:
      "RCDs work in EPS island mode because the local N-E bonding (Reg 826.1.1.2.2) provides the reference. But the design must account for: (a) prospective fault current is lower in island mode — inverter's EPS-output stage has limited fault-current capacity (typically 1.5-2× rated current); RCDs still detect residual current but DOWNSTREAM OCPDs may operate slower under lower available fault current — disconnection times per Reg 411 may need re-analysis; (b) Type B RCD requirement per Reg 712.531.3.5.1 applies in both modes — DC residual current is possible during EPS mode just as in grid mode. Cert evidence bundle records the RCD type + Reg 411 disconnection-time analysis under both modes.",
  },
  {
    id: 'm4s6-commissioning',
    question:
      "EPS commissioning — what tests does the installer run before customer handover?",
    options: [
      "None",
      "Standard tests + EPS-specific tests: (1) BS EN 62446-1 PV commissioning (per Module 3.7); (2) manufacturer-specified EPS test — typically a controlled grid-loss simulation (open DNO main isolator while inverter active); verify EPS contactor opens within manufacturer spec time; verify inverter transitions to grid-forming mode; verify protected loads continue operating; verify backup duration estimate matches design; (3) DNO-restoration test — reclose DNO; verify inverter re-syncs; verify EPS contactor recloses; verify install returns to direct feeding; (4) Reg 411 / 712.531.3.5.1 RCD operation under both modes; (5) firmware version recorded",
      "Customer commissions",
      "Skip tests",
    ],
    correctIndex: 1,
    explanation:
      "EPS commissioning extends BS EN 62446-1 with manufacturer-specific tests. Critical tests: (1) DNO loss simulation — open DNO main isolator with inverter active; measure switchover time (manufacturer spec 20-100 ms typical for fast EPS); verify protected loads continue; (2) DNO restoration — reclose DNO; verify inverter sync + EPS contactor close; (3) RCD operation under island mode — protected-load RCBOs should still trip on simulated L-E or N-E fault per Reg 411 disconnection time analysis; (4) firmware versions — hybrid inverters receive frequent firmware updates that can change EPS behaviour; record version at commissioning; (5) protected-load partition verification — open EPS, check ONLY protected circuits remain supplied. Cert evidence bundle records each test + manufacturer-spec compliance.",
  },
  {
    id: 'm4s6-firmware',
    question:
      "Hybrid inverter firmware updates — what's the installer / customer discipline?",
    options: [
      "Never update",
      "Modern hybrid inverters (GivEnergy, Tesla, Sigenergy, SolarEdge) receive periodic firmware updates over-the-air or via app. Updates can change EPS behaviour, anti-islanding parameters, BMS interaction, monitoring data. Discipline: (a) installer records firmware version at commissioning in the cert evidence bundle; (b) customer notified to allow automatic updates per manufacturer policy; (c) major firmware updates may trigger a re-commissioning verification — particularly for safety-critical changes (anti-islanding, EPS transitions); (d) the EICR-style periodic inspection (5-yearly) verifies the current firmware version + any firmware-related design changes",
      "Customer's problem",
      "Updates break installs",
    ],
    correctIndex: 1,
    explanation:
      "Hybrid inverter firmware is the modern UK install\'s evolving software dimension. Updates: GivEnergy GivPortal pushes updates; Tesla updates via Wi-Fi; Sigenergy SigenCloud manages; SolarEdge monitoring portal. Updates can change: anti-islanding behaviour (BS EN 50549-1 compliance refinements); EPS switchover timing; BMS protocols (battery compatibility); monitoring data formats; protective trip thresholds. Discipline: record firmware version at commissioning; record at each EICR-style inspection; verify behaviour after major updates (e.g. spot-check EPS transition still works as designed). Cert evidence bundle has a firmware-version log column. Customer informed of the update lifecycle as part of the handover pack.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Customer asks: 'When the grid goes off, what happens to my install?' Their system: 6 kWp PV + GivEnergy 9.5 kWh BESS + Gen3 hybrid inverter with EPS configured.",
    options: [
      "Everything shuts down",
      "EPS activates automatically. The hybrid inverter detects DNO loss (anti-islanding within 100 ms per EREC G98 / BS EN 50549-1); EPS contactor opens to disconnect DNO; inverter switches from grid-following to grid-forming; protected loads (typically lighting, fridge, sockets, comms) continue operating from BESS. PV continues generating during day, charging BESS and supplying loads. Backup duration: 9.5 kWh BESS / 1 kW protected-load average = ~9 hours of total backup (longer if PV is producing). When grid restored: inverter re-syncs; EPS contactor recloses; install back to direct feeding mode",
      "Customer's problem",
      "Inverter explodes",
    ],
    correctAnswer: 1,
    explanation:
      "EPS-equipped install behaviour during grid outage: automatic transition to island mode; protected loads continue operating from BESS + PV. Backup duration: BESS usable kWh / average protected-load kW. For 9.5 kWh BESS (LFP at 80% DoD = ~7.6 kWh usable) with 1 kW typical protected load: ~7.6 hours backup from battery alone; PV during day extends this by 4-30 kWh depending on weather. Modern UK hybrid PV+BESS with EPS provides 12-48 hour outage resilience for typical UK domestic. Customer informed of the EPS behaviour + duration estimate in the handover pack. Cert evidence bundle records the configuration.",
  },
  {
    id: 2,
    question:
      "Customer wants ALL their loads on EPS protection: 5 kW heat pump + 7 kW EV charger + electric shower + cooker + lighting + sockets. 5 kW EPS rating. Feasible?",
    options: [
      "Yes always",
      "Not as a single protected partition — 5 kW EPS can't supply 15+ kW of simultaneous high-power load. Options: (a) PARTITION the protected loads — lighting + fridge + sockets + comms (~1 kW typical) protected; heat pump / EV / shower / cooker non-protected (accept they're off during outage); (b) LOAD SHED / scheduled — protect everything but allow only one high-power load at a time via energy-management logic; (c) UPGRADE INVERTER — Tesla Powerwall 3 (11.5 kW EPS) or multiple GivEnergy units in parallel. Cert evidence bundle records the chosen approach",
      "Inverter handles it magic",
      "No options",
    ],
    correctAnswer: 1,
    explanation:
      "5 kW EPS rating doesn't cover 15+ kW combined high-power load. Options ranked by cost / complexity: (a) PARTITION — simplest. Protect only the small-load circuits (lighting, fridge, comms, ~1 kW). Heat pump + EV + shower + cooker stay non-protected (off during outage). Backup duration good. Cost: just the installation labour to wire the partition. (b) LOAD SHED — energy-management logic restricts to one high-power load at a time during EPS mode. Some hybrid inverters support this (Sigenergy, advanced GivEnergy with home automation). Cost: ~£500-£1,500 add. (c) UPGRADE INVERTER — Tesla Powerwall 3 11.5 kW EPS; or 2× GivEnergy Gen3 in parallel for 10 kW; or larger BESS to extend duration. Cost: ~£3,000-£8,000 add. Cert evidence bundle records the partition / shed / upgrade decision.",
  },
  {
    id: 3,
    question:
      "EPS commissioning — installer simulates DNO loss by opening the main isolator. Hybrid inverter takes 800 ms to transition. Pass or fail?",
    options: [
      "Pass",
      "FAIL — exceeds typical fast-EPS manufacturer spec (20-100 ms). 800 ms is slow enough to cause: lighting flicker / momentary off (visible to customer); IT equipment reboot (PC, router, modem dropping out); some appliances (microwaves, satellite boxes) needing manual reset after outage. Investigate: firmware version (may need update); EPS configuration in app; specific manufacturer specification (some inverters are slower EPS by design — Tesla Powerwall 2 transitions ~ 200 ms; Powerwall 3 < 100 ms). May be acceptable for the customer's needs but document the actual time in cert evidence bundle",
      "Always pass",
      "Customer's problem",
    ],
    correctAnswer: 1,
    explanation:
      "EPS switchover time varies by manufacturer: fast EPS (GivEnergy Gen3, Sigenergy, Tesla Powerwall 3) < 100 ms; slower EPS (older systems, Tesla Powerwall 2 ~200 ms). 800 ms is materially slower than modern fast-EPS spec — would cause visible / audible disruptions to most appliances. Investigate: (1) firmware version — update if available; (2) EPS configuration parameters; (3) protected-load complexity (some inrush events delay the inverter's transition); (4) manufacturer-specific spec — what's the inverter's documented spec? If 800 ms is the documented spec for this inverter brand / model, customer's expectations need management. Cert evidence bundle records the actual measured switchover time + customer agreement.",
  },
  {
    id: 4,
    question:
      "EPS island mode: customer's protected loads have RCBOs. Simulated L-E fault on a protected circuit. RCBO trips. Pass or fail?",
    options: [
      "Always pass",
      "PASS if the disconnection time meets Reg 411 / 712.531.3.5.1 limits. RCBOs operate on residual current (L-E or N-E imbalance) — the local N-E bonding per Reg 826.1.1.2.2 provides the reference. Test: open the DNO main isolator (force EPS mode); simulate L-E fault on a protected circuit via RCD tester; verify RCBO trips within the specified disconnection time. If trip time exceeds Reg 411 limits (typically ≤0.4 s for final circuits ≤32 A, ≤5 s for distribution), investigate downstream OCPD coordination under reduced inverter fault current",
      "Fail — RCDs don't work in island",
      "Customer's choice",
    ],
    correctAnswer: 1,
    explanation:
      "EPS island mode RCD test: open DNO main isolator + simulate L-E fault on protected circuit. RCBO should trip per Reg 411 disconnection-time limits. The local N-E bonding (Reg 826.1.1.2.2) provides the reference. Caveats: (a) inverter fault current is LIMITED — typically 1.5-2× rated continuous (e.g. 5 kW EPS → ~10-15 kW fault current capacity); downstream OCPDs may operate slower under lower available fault current; (b) Type B RCD per Reg 712.531.3.5.1 still required where applicable; (c) the test must be done at commissioning AND at the 5-yearly EICR-style inspection. Cert evidence bundle records the test result for both modes (direct feeding + island).",
  },
  {
    id: 5,
    question:
      "Customer's GivEnergy hybrid inverter receives an OTA firmware update overnight. Customer reports the EPS switchover feels different (longer, audible relay click). What to do?",
    options: [
      "Ignore",
      "Document the change. Check GivEnergy release notes for the firmware update — what changed? If EPS behaviour deliberately modified (e.g. anti-islanding tightening per BS EN 50549-1 refinement), update the customer information pack to reflect; the cert evidence bundle records the firmware version + behaviour log. If unexpected change, contact GivEnergy support — may be a regression bug being fixed in a later update. Re-test EPS behaviour to verify it still meets Reg 826.1.1.x requirements. The 5-yearly EICR-style inspection captures the firmware version at that point",
      "Reverse the update",
      "Customer's fault",
    ],
    correctAnswer: 1,
    explanation:
      "Hybrid inverter firmware can change EPS behaviour materially. The competent install workflow: (1) record firmware version at commissioning in cert evidence bundle; (2) customer notified to allow automatic updates per manufacturer policy; (3) when customer reports behaviour change, check release notes / changelog; (4) if behaviour is now non-conforming (e.g. trip times no longer meet Reg 411), escalate to manufacturer support; (5) periodic EICR captures the current firmware. Tesla, GivEnergy, Sigenergy, SolarEdge all push firmware updates regularly (monthly to quarterly typical). The customer information pack mentions the update lifecycle.",
  },
  {
    id: 6,
    question:
      "How does the EPS protected-load partition affect the EREC G98 / G99 application?",
    options: [
      "No effect",
      "EREC G98 / G99 governs GRID-CONNECTED operation (direct feeding mode in Chapter 82 terms). EPS / island mode is by definition disconnected from grid — no DNO involvement. So the EPS partition doesn't change the EREC application. However: the inverter\'s rated AC output (used in EREC capacity calculation) is the GRID-TIED rating, not the EPS rating. For a 5 kW hybrid inverter: G98 if ≤ 16 A (3.68 kW typical single-phase); G99 if > 16 A. EREC paperwork is independent of EPS configuration",
      "Need new EREC",
      "Customer's choice",
    ],
    correctAnswer: 1,
    explanation:
      "EREC G98 / G99 / G100 governs grid-connected generation. The PEI's direct feeding mode is grid-connected; EPS / island mode is by definition NOT grid-connected (anti-islanding ensures no backfeed). So the EREC application is based on the grid-tied AC output rating of the inverter (typically the higher of grid-tied and EPS ratings — usually they\'re the same). The protected-load partition is an internal PEI design decision; the DNO doesn\'t care about it. Cert evidence bundle includes both: EREC paperwork (grid-tied capacity) + PEI design pack (EPS partition).",
  },
  {
    id: 7,
    question:
      "Customer experiences a grid outage during the day. PV is producing 4 kW; protected loads need 0.8 kW; BESS at 60% SoC. What happens?",
    options: [
      "BESS depletes immediately",
      "Inverter (in grid-forming island mode) routes PV generation: protected loads receive 0.8 kW; remaining 3.2 kW charges BESS (battery charge rate limited by BMS, typically up to ~1C rate); BESS SoC rises during the outage. If outage extends into evening (no PV): protected loads run from BESS. Net: during day, BESS gains charge; at night, BESS discharges. Backup duration extended significantly. The hybrid inverter\'s logic handles this automatically — customer just sees the install operating as normal",
      "PV exports to grid",
      "Customer dies",
    ],
    correctAnswer: 1,
    explanation:
      "EPS island mode with PV producing + loads + BESS available is the ideal scenario: PV generation goes to (a) protected loads (priority); (b) BESS charging (any surplus). During the outage, BESS SoC tracks the PV-vs-load delta: rises during day when PV > loads; falls at night when BESS supplies loads. Extended outage resilience: 6 kWp PV in UK May-October can generate 20-40 kWh/day; 1 kW protected load consumes 24 kWh/day. Net: PV often covers daily load with surplus charging BESS. For mid-winter outages: PV maybe 5-10 kWh/day vs 1 kW × 24 hr = 24 kWh load — BESS depletes over 2-4 days. Cert evidence bundle records the design assumption.",
  },
  {
    id: 8,
    question:
      "How does EPS interact with EV charging in a PEI?",
    options: [
      "Doesn't",
      "Two architectures: (a) NON-PROTECTED — EV charger on non-EPS side of partition. EV doesn\'t charge during outage. Most common UK approach (EV charging draws too much for EPS partition). (b) PROTECTED-WITH-SHED — EV charger on EPS side with energy-management logic that throttles charging to within EPS capacity (typically 6 A = 1.4 kW single-phase minimum). The smart EV charger (Zappi, Ohme) coordinates with the hybrid inverter via OCPP / API. Cert evidence bundle records the partition + the EV charging behaviour during EPS mode",
      "EV charges off the inverter",
      "Customer's problem",
    ],
    correctAnswer: 1,
    explanation:
      "EV charging during EPS / island mode: trade-off between backup duration and EV charge progress. UK typical: EV charger NON-PROTECTED (option a) — accept that the EV doesn\'t charge during grid outages; saves EPS capacity for the protected loads. Alternative for customers with long outages or essential EV use: EV charger PROTECTED with smart energy management (option b) — EV charges at minimum rate (6 A = 1.4 kW single-phase; some EVs accept 4 A = 1.0 kW) supplemented by PV + BESS. Requires smart EV charger (Zappi, Ohme, Andersen) that supports load throttling and coordinates with the hybrid inverter. Cert evidence bundle records the chosen architecture.",
  },
];

const faqs = [
  {
    question: "Which UK hybrid inverters support EPS, and which don't?",
    answer:
      "EPS-capable UK hybrid inverters (2025-2026): GivEnergy Gen3 (5/7.6/10 kW models, EPS standard); Tesla Powerwall 2 + Backup Gateway 2 (5 kW continuous EPS); Tesla Powerwall 3 (11.5 kW continuous EPS, AC or DC coupled); Sigenergy SigenStor (up to ~10 kW per module, EPS-capable); SolarEdge Energy Hub + Backup Interface (5-10 kW depending on model); Huawei LUNA with backup option; FoxESS Hybrid with backup function. NON-EPS hybrid inverters exist too — typically older models or budget variants. Some pure PV inverters (Solis Mini grid-tied, older SMA, Fronius non-hybrid) have NO EPS — grid-tied operation only. Cert evidence bundle records EPS capability + manufacturer datasheet reference.",
  },
  {
    question: "How long does typical UK domestic EPS provide backup?",
    answer:
      "Backup duration = BESS usable kWh / average protected-load kW (+ any PV contribution). Worked example: 10 kWh BESS (LFP at 80% DoD = 8 kWh usable) + 1 kW typical protected load (lighting + fridge + sockets + comms) = 8 hours backup from BESS alone. With PV producing during day (4-6 kW peak for 6 kWp install, 4-6 hours daily): outage can extend 1-3+ days in good UK weather. For 5-7 day extended outage (rare UK winter event): customer experiences the gap; UPS / portable generator could supplement. Cert evidence bundle records the design duration + the customer's informed expectation.",
  },
  {
    question: "What's the difference between EPS and UPS (Uninterruptible Power Supply)?",
    answer:
      "EPS = a PEI operating in ISLAND MODE per Reg 824.2 — it is part of the Prosumer&rsquo;s Electrical Installation, governed by Chapter 82, and uses the BESS / hybrid inverter as the island source. Switchover from grid to island typically 20-200 ms — fast enough for most appliances but some sensitive electronics may notice the gap. UPS (Uninterruptible Power Supply, true online): a dedicated standalone device — internal battery + double-conversion topology — with &lt;5 ms switchover (online UPS gives effectively zero gap). CRITICALLY: Chapter 82 explicitly states a UPS is NOT part of the PEI — it is a separate user-side device sitting downstream. So a UPS does not bring Chapter 82 obligations on its own; an EPS does. For typical UK domestic protected loads (lights, fridge, sockets, comms), EPS suffices. For mission-critical loads (medical, server, sensitive IT) add a dedicated small UPS DOWNSTREAM of the EPS-protected partition for those specific loads. Cert evidence bundle records the EPS partition (PEI scope) separately from any UPS additions (outside PEI scope).",
  },
  {
    question: "Does the EPS island mode require its own EREC G98 / G99 registration?",
    answer:
      "No — EREC governs GRID-CONNECTED operation. EPS / island mode is by definition disconnected from grid (anti-islanding ensures no backfeed). The EREC application covers the hybrid inverter's grid-tied AC output rating (typically same as EPS rating). No separate registration for the EPS function. However: customer information pack and cert evidence bundle should document the EPS configuration + protected-load partition for future reference (EICR, ownership transfer, fault investigation).",
  },
  {
    question: "Can I retrofit EPS to an existing AC-coupled retrofit BESS?",
    answer:
      "Depends on the BESS PCE. Tesla Powerwall 2 + Backup Gateway 2: EPS retrofit feasible if Backup Gateway isn\'t already installed. GivEnergy AC battery: EPS capability depends on the model; some don\'t support EPS. SolarEdge AC battery: EPS via SolarEdge Backup Interface. Enphase IQ Battery: EPS via Enphase IQ System Controller. Generally easier on a new build to specify EPS from day one. Retrofitting EPS adds: backup gateway / interface unit, partition rewiring, commissioning. Cost: ~£1,500-£3,500 retrofit (in addition to BESS cost). Cert evidence bundle records the retrofit.",
  },
  {
    question: "How does EPS affect the BS EN 62446-1 commissioning workflow?",
    answer:
      "BS EN 62446-1 covers PV-specific commissioning (Module 3 Section 7). EPS adds manufacturer-specific tests: (1) DNO-loss simulation — open main isolator while inverter active; measure switchover time + verify protected loads continue; (2) DNO-restoration test — reclose main isolator; verify sync + EPS contactor close + return to direct feeding; (3) protected-load partition verification — confirm only the partitioned loads receive power during EPS mode; (4) Reg 411 disconnection-time test under island mode (RCBO operation on protected-load fault); (5) firmware version recorded. The cert evidence bundle includes both the BS EN 62446-1 results and the EPS-specific test results.",
  },
  {
    question: "What about three-phase hybrid PV+BESS+EPS installs?",
    answer:
      "Three-phase EPS is available in higher-end hybrid inverters: GivEnergy 3-phase models; Sigenergy SigenStor in 3-phase config; some Huawei LUNA configurations. UK domestic typically single-phase; three-phase appears in commercial / large residential / heat-pump-heavy installs where the load profile justifies the extra cost. Three-phase EPS: 4-pole contactor (L1+L2+L3+N); local 3-phase generation via the inverter; supports 3-phase loads in island mode. Cert evidence bundle records the phase configuration; Reg 826.1.1.2.2 neutral switching scales appropriately.",
  },
  {
    question: "Does the EPS work during a planned DNO outage (e.g. maintenance)?",
    answer:
      "Yes — EPS responds to DNO loss regardless of cause (storm, fault, planned outage). The inverter doesn\'t distinguish — it detects V/freq excursion and transitions to grid-forming. For planned outages, customer can: (a) let EPS handle it automatically (default behaviour); (b) pre-configure the install to specifically prepare for the outage — top up BESS overnight before, conserve protected-load consumption during. Sigenergy / GivEnergy apps allow customer to set BESS to 100% SoC ahead of planned outages.",
  },
  {
    question: "Section 4.7 EREC and Section 4.8 commissioning — how do they tie into EPS?",
    answer:
      "Section 4.7 covers EREC G98 / G99 / G100 for hybrid installs — including the multi-source registration for combined PV+BESS export capacity. EPS doesn\'t directly affect EREC (it\'s island mode = no grid). Section 4.8 covers the integrated commissioning workflow: BS EN 62446-1 for PV + manufacturer EPS tests + BESS commissioning per BS EN IEC 62485 + PEI design pack verification + cert evidence bundle assembly. The EPS configuration is one component of the larger commissioning + cert evidence bundle.",
  },
];

export default function RenewableEnergyModule4Section6() {
  const navigate = useNavigate();

  useSEO({
    title:
      "Hybrid inverter & EPS (Emergency Power Supply) | Renewable Energy 4.6 | Elec-Mate",
    description:
      "EPS implements Chapter 82 island mode — hybrid inverter switches from grid-following to grid-forming on DNO loss; protected-load partition; Reg 826.1.1.2.2 neutral switching; commissioning + firmware discipline.",
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
            eyebrow="Module 4 · Section 6 · BS 7671:2018+A4:2026 · Chapter 82"
            title="Hybrid inverter & EPS (Emergency Power Supply)"
            description="EPS is the functional implementation of Chapter 82 island mode — hybrid inverter switches from grid-following to grid-forming on DNO loss; protected-load partition; Reg 826.1.1.2.2 neutral switching; commissioning + firmware discipline."
            tone="yellow"
          />

          <TLDR
            points={[
              "EPS = Emergency Power Supply — the functional implementation of Chapter 82 island mode (Reg 824.2 + Reg 826.1.3 OPTION A). Modern UK hybrid inverters with EPS: GivEnergy Gen3, Tesla Powerwall 2/3, Sigenergy SigenStor, SolarEdge Energy Hub.",
              "Two inverter modes: ANTI-ISLANDING (grid-following) for direct feeding — tracks DNO V/freq, trips on grid loss per EREC G98/G99 + BS EN 50549-1. GRID-FORMING (island) for EPS — generates V/freq locally, supplies protected loads from PV + BESS.",
              "EPS switchover time: 20-200 ms typical (modern fast EPS < 100 ms). EPS output capacity 3-11 kW continuous depending on brand/model. Lower fault-current capacity than grid — needs Reg 411 disconnection-time analysis under island mode.",
              "Protected-load partition: subset of property circuits wired through EPS output. Typical UK: lighting + fridge + sockets + comms + heating controls (~1 kW total). High-power loads (heat pump, EV, shower, cooker) typically non-protected.",
              "Reg 826.1.1.2.2 neutral switching: 4-pole (or 2-pole single-phase) EPS contactor disconnects ALL conductors from DNO; inverter EPS output stage creates local N-E bonded neutral; RCDs operate using local reference.",
              "Firmware updates: modern hybrid inverters receive OTA updates that can change EPS behaviour. Installer records firmware version at commissioning; periodic EICR captures current version; major updates may trigger re-verification.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain what EPS does and how it implements Chapter 82 island mode in a hybrid PV+BESS install.",
              "Distinguish anti-islanding (grid-following) and grid-forming inverter modes; understand the transition sequence during DNO loss / restoration.",
              "Design the protected-load partition: select which circuits go on EPS output based on the inverter's EPS rating + customer's outage priorities.",
              "Apply Reg 826.1.1.2.2 neutral switching — 4-pole EPS contactor disconnects all conductors from DNO; local N-E bonding for RCD operation in island mode.",
              "Plan the Reg 411 disconnection-time analysis under island mode — EPS fault-current capacity may be lower than grid; OCPDs may operate slower.",
              "Run the EPS-specific commissioning tests: DNO-loss simulation; DNO-restoration sync; protected-load verification; RCD operation under island mode; firmware version recording.",
              "Manage hybrid inverter firmware lifecycle — record at commissioning, monitor for changes, re-verify after major updates.",
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>EPS = Chapter 82 island mode in hardware. Grid-following ↔ grid-forming via Reg 826.1.1.2.2 neutral switching.</Pullquote>

          <ContentEyebrow>EPS — Chapter 82 island mode in hardware</ContentEyebrow>

          <ConceptBlock
            title="What EPS does"
            plainEnglish="EPS (Emergency Power Supply) is the hardware that implements Chapter 82's island mode. When DNO goes off, the EPS contactor opens to disconnect the install from DNO; the hybrid inverter switches from grid-following mode to grid-forming mode; the inverter supplies the protected loads from PV (during day) + BESS. When DNO restored, the reverse happens."
            onSite="EPS is the modern UK domestic outage-resilience standard. 2025-2026 hybrid PV+BESS installs typically include EPS. The protected-load partition (~1 kW typical) gives customer 8-24+ hours backup for the essentials (lighting, fridge, comms) while non-essential high-power loads (heat pump, EV, electric shower) accept they\'ll be off during outage."
          >
            <p>EPS components in a hybrid install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">EPS contactor (or Backup Gateway)</strong> — typically 4-pole (or 2-pole single-phase) switch that disconnects ALL conductors from DNO during EPS mode. Modern inverter brands integrate this; some products (Tesla Backup Gateway) are separate units</li>
              <li><strong className="text-white">Hybrid inverter EPS-output stage</strong> — separate AC output from the grid-tied output; supplies the protected-load partition; can switch from grid-following to grid-forming mode</li>
              <li><strong className="text-white">Protected-load partition</strong> — subset of property circuits wired through the EPS output. Selected at design stage based on outage priorities + EPS capacity</li>
              <li><strong className="text-white">Detection logic</strong> — inverter monitors DNO V/freq; trips on excursion per BS EN 50549-1; transitions to grid-forming</li>
              <li><strong className="text-white">Sync-back logic</strong> — when DNO returns, inverter monitors restored V/freq; syncs in software; EPS contactor recloses; returns to direct feeding</li>
              <li><strong className="text-white">Local N-E bonding</strong> — per Reg 826.1.1.2.2; provides RCD reference in island mode</li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="EPS architecture diagram — hybrid PV+BESS install. DNO supply → main isolator → EPS contactor (4-pole) → split into (a) protected loads circuit (EPS-output side) + (b) non-protected loads circuit (AC-OUT side). Hybrid inverter: grid-tied AC output to non-protected side; EPS-output stage to protected loads + EPS contactor logic. BESS DC bus + PV DC bus into inverter. Annotated with mode transitions: grid-following (DNO-tracking) ↔ grid-forming (local V/freq generation)."
            filename="renewable/m4s6-eps-architecture.png"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Grid-following vs grid-forming</ContentEyebrow>

          <Pullquote>Grid-following = anti-islanding. Grid-forming = island. EPS switches between them.</Pullquote>

          <ConceptBlock
            title="Two inverter modes"
            plainEnglish="The hybrid inverter operates in one of two modes: GRID-FOLLOWING (anti-islanding) for normal grid-tied operation — tracks DNO V/freq; or GRID-FORMING (island) for EPS operation — generates V/freq itself. The EPS transition logic switches between modes."
            onSite="Modern hybrid inverters (GivEnergy, Tesla Powerwall 2/3, Sigenergy, SolarEdge Energy Hub, Huawei LUNA) have bidirectional mode capability. Older grid-tied inverters (non-hybrid) only support grid-following — they trip on DNO loss and stay tripped until DNO returns."
          >
            <p>The two modes in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">GRID-FOLLOWING (anti-islanding)</strong> — inverter MEASURES DNO V and freq; tracks and synchronises; outputs power to grid + load matching the DNO reference. Trips off-grid if DNO V/freq exceeds the BS EN 50549-1 anti-islanding window. EREC G98 / G99 compliance. The default mode for direct feeding</li>
              <li><strong className="text-white">GRID-FORMING (island)</strong> — inverter GENERATES V and freq itself; sets the local reference; supplies protected loads. No external grid reference. Local N-E bonding provides RCD reference. The EPS mode for island operation</li>
              <li><strong className="text-white">Mode transition: GRID-LOSS</strong> — inverter detects DNO excursion (V/freq outside BS EN 50549-1 window); EPS contactor opens; inverter switches to grid-forming mode; protected loads now on EPS. Switchover: 20-200 ms typical (modern fast EPS &lt; 100 ms)</li>
              <li><strong className="text-white">Mode transition: GRID-RESTORATION</strong> — inverter detects DNO V/freq returned to valid range; waits for stability (typical 60-300 s grid-stability delay per EREC G99 / BS EN 50549-1); syncs grid-forming output to DNO V/freq via internal phase-locked loop; EPS contactor recloses; inverter switches back to grid-following mode</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Protected-load partition design</ContentEyebrow>

          <Pullquote>EPS capacity limits the partition. Choose essential loads. Lighting + fridge + sockets + comms = ~1 kW typical UK.</Pullquote>

          <ConceptBlock
            title="What to protect — design discipline"
            plainEnglish="The protected-load partition is a subset of the property's circuits wired through the hybrid inverter's EPS output. These continue to function during DNO outages. The partition is constrained by: (1) the inverter's EPS output capacity (typically 5-11 kW continuous); (2) the BESS usable energy + desired backup duration."
            onSite="UK typical residential partition: lighting circuit; fridge / freezer; essential sockets (one per main room); comms (router, modem, IT cabinet); heating controls (boiler thermostat, heat pump controller — but NOT the heat pump compressor itself). Total ~0.5-2 kW under normal use. Non-protected: high-power loads (electric shower, oven, kettle, EV charger, heat pump compressor) accept they\'re off during outage."
          >
            <p>Typical UK partition choices:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">PROTECTED (typical UK 5 kW EPS)</strong> — lighting circuit (~0.2 kW typical use); fridge + freezer (~0.3-0.5 kW); essential socket circuit per main room (~0.3-0.5 kW intermittent); comms (router / modem / IT, ~0.05-0.1 kW); heating controls + boiler (~0.1-0.3 kW). Total typical 0.8-1.5 kW continuous use; peak ~2-3 kW during fridge compressor cycle</li>
              <li><strong className="text-white">NOT PROTECTED</strong> — electric shower (8-10 kW); oven (3-4 kW); cooker hob (5-7 kW); kettle (3 kW); EV charger (3.6-22 kW); heat pump compressor (3-5 kW); tumble dryer (3 kW); washing machine (2 kW). Customer accepts these off during outage</li>
              <li><strong className="text-white">CONDITIONAL</strong> — heat pump may be in EPS partition for its CONTROLS but not COMPRESSOR (heating off but boiler controls stay live for safe transition); EV charger may be on EPS with smart-charging logic that limits to EPS capacity</li>
              <li><strong className="text-white">Customer input</strong> — partition reflects customer priorities. Some want maximum backup duration (minimal partition); some want maximum functionality (larger partition, shorter duration). Honest survey-stage decision</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Physical implementation of the partition"
            plainEnglish="The partition is implemented at the consumer unit: protected circuits move to a dedicated EPS-side bus bar (or a sub-distribution board fed from the EPS output); non-protected circuits stay on the main bus bar fed from DNO."
            onSite="Two architectures: (a) SPLIT-LOAD CU — modify the existing CU to split bus bars, with one section on EPS output and the other on DNO; (b) DEDICATED EPS SUB-BOARD — install a separate distribution board fed from EPS, move protected circuits there; main CU stays on DNO for non-protected. (b) is cleaner for retrofit; (a) is integrated for new-build."
          >
            <p>Implementation considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Split-load CU</strong> — modify existing CU; split the bus bar into two sections; EPS-side and DNO-side. Each section has its own RCBOs. Common for new-build with fresh CU</li>
              <li><strong className="text-white">Dedicated EPS sub-board</strong> — install a separate small distribution board near the hybrid inverter; protected circuits feed from this; main CU stays for everything else. Cleaner for retrofit (don\'t modify the working CU)</li>
              <li><strong className="text-white">Reg 551.7.1(d) compliance</strong> — both architectures must respect the A4:2026 rule that source connection isn\'t on the load side of an RCD protecting other parts of the installation</li>
              <li><strong className="text-white">RCBOs throughout</strong> — protected circuits have their own RCBOs (sized per the circuit). Operate in both direct feeding mode and EPS island mode</li>
              <li><strong className="text-white">Labelling per Reg 712.514.x</strong> — additional labels on the EPS-side circuits indicating that they\'re supplied from EPS in island mode + remain energised after DNO isolation</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Reg 826.1.1.2.2 neutral switching</ContentEyebrow>

          <Pullquote>4-pole EPS contactor. Local N-E bonding before DNO N disconnected. RCDs work in island mode.</Pullquote>

          <ConceptBlock
            title="How the neutral switching works"
            plainEnglish="When the EPS contactor opens during a DNO loss, ALL live conductors (including neutral) disconnect from DNO. The hybrid inverter's EPS-output stage creates a NEW local neutral that is earth-bonded for the local install. RCDs operate using this local N-E reference."
            onSite="The hybrid inverter handles this transparently — the EPS contactor + inverter logic does the sequencing. The installer's job: verify the design implements Reg 826.1.1.2.2 (which the manufacturer typically guarantees for EPS-capable inverters); test the RCD operation in island mode at commissioning; record in cert evidence bundle."
          >
            <p>The neutral switching sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Direct feeding mode (normal)</strong> — DNO neutral is the reference (TN-C-S PME typical UK); local install bonded to DNO N via main earthing terminal</li>
              <li><strong className="text-white">DNO loss detected</strong> — inverter detects V/freq excursion per BS EN 50549-1 anti-islanding window</li>
              <li><strong className="text-white">EPS contactor opens (typically 20-100 ms)</strong> — all 4 conductors (L1+L2+L3+N for 3-phase, L+N for single-phase) disconnected from DNO simultaneously</li>
              <li><strong className="text-white">Inverter EPS-output stage activates</strong> — generates local V and freq; creates local neutral via inverter output stage</li>
              <li><strong className="text-white">Local N-E bonding via neutral switch device</strong> — per Reg 826.1.1.2.2; inverter\'s internal N-E bonding closes before DNO N disconnected (avoiding overlap that could cause RCD misoperation)</li>
              <li><strong className="text-white">Protected loads supplied</strong> — from the inverter EPS output, with local N-E reference for RCD operation</li>
              <li><strong className="text-white">DNO restored</strong> — inverter detects valid DNO V/freq; waits stability period (60-300 s per BS EN 50549-1); syncs grid-forming output to DNO; EPS contactor recloses; transitions back to direct feeding mode. Reverse sequence on neutral switching</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.2.2 — Neutral conductor in island mode"
            clause="When in island mode, all live conductors shall be disconnected from the DNO supply. To prevent incorrect operation of RCDs the use of a neutral switch device shall connect the neutral and the earth of the PEI without overlapping with switching of the DNO neutral."
            meaning="Reg 826.1.1.2.2 mandates the specific switching sequence during EPS / island mode transitions. The neutral switch device must establish local N-E bonding BEFORE the DNO N is disconnected, to ensure RCDs always have a valid reference. Modern EPS-capable hybrid inverters handle this transparently; the installer's responsibility: verify manufacturer compliance + test RCD operation under island mode at commissioning. Cert evidence bundle records the test result."
          />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>EPS commissioning + firmware lifecycle</ContentEyebrow>

          <Pullquote>DNO-loss test. DNO-restoration test. RCD under island mode. Record firmware version.</Pullquote>

          <ConceptBlock
            title="EPS commissioning tests"
            plainEnglish="EPS commissioning extends BS EN 62446-1 (Module 3 Section 7) with manufacturer-specific tests. The key tests: simulate DNO loss + verify EPS transition; simulate DNO restoration + verify sync-back; verify RCD operation under island mode; record firmware version."
            onSite="The hybrid inverter\'s app + commissioning tool typically guides the installer through the tests. Manufacturer documentation specifies the test sequence + acceptance criteria. Cert evidence bundle records each test result."
          >
            <p>EPS-specific commissioning test sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Test 1 — DNO-loss simulation</strong> — open the DNO main isolator while the inverter is active and producing. Verify: (a) EPS contactor opens within manufacturer spec time (20-200 ms typical); (b) inverter transitions to grid-forming mode; (c) protected loads continue operating; (d) non-protected loads lose supply. Measure actual switchover time</li>
              <li><strong className="text-white">Test 2 — DNO-restoration simulation</strong> — reclose the DNO main isolator while EPS active. Verify: (a) inverter detects DNO V/freq return; (b) sync stability delay (60-300 s typical per BS EN 50549-1); (c) EPS contactor recloses; (d) install transitions back to direct feeding; (e) all loads now supplied</li>
              <li><strong className="text-white">Test 3 — Protected-load verification</strong> — with EPS active, verify ONLY the partitioned circuits receive power. Walk through each room; check the protected vs non-protected mapping matches the design pack</li>
              <li><strong className="text-white">Test 4 — RCD operation under island mode</strong> — with EPS active, simulate L-E fault on a protected circuit via RCD tester. Verify RCBO trips within Reg 411 disconnection-time limits (typically ≤0.4 s for final circuits ≤32 A). Record the trip time</li>
              <li><strong className="text-white">Test 5 — Firmware version recording</strong> — read current firmware version from the inverter app; record in the cert evidence bundle with the commissioning date</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hybrid inverter firmware lifecycle"
            plainEnglish="Modern hybrid inverters receive frequent firmware updates over-the-air (OTA) or via the manufacturer app. Updates can change EPS behaviour, anti-islanding parameters, BMS integration, monitoring data. The installer + customer have a discipline around tracking these changes."
            onSite="Firmware-update discipline: (1) record version at commissioning; (2) customer notified to allow auto-updates per manufacturer policy; (3) record version at each EICR-style inspection; (4) verify behaviour after major updates. Module 3 Section 7 commissioning extends to capture firmware version."
          >
            <p>Firmware lifecycle considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Manufacturer cadence</strong> — typical update frequency: GivEnergy monthly; Tesla quarterly; Sigenergy quarterly; SolarEdge bi-annual; varies by brand</li>
              <li><strong className="text-white">Update mechanism</strong> — OTA via manufacturer cloud; OR via installer / customer app push; OR via USB/SD card for specific firmware levels</li>
              <li><strong className="text-white">Customer auto-update policy</strong> — most manufacturers default to auto-update; customer can opt out via app</li>
              <li><strong className="text-white">Update categories</strong> — security fixes (typically silent); bug fixes (minor behaviour changes); feature additions (new modes, new BMS support); regulatory compliance refinements (BS EN 50549-1 anti-islanding tightening)</li>
              <li><strong className="text-white">Major-update verification</strong> — significant updates affecting EPS or anti-islanding may warrant re-running commissioning Test 1 + Test 2 + Test 4 to verify behaviour still meets design</li>
              <li><strong className="text-white">EICR-style periodic inspection</strong> — verifies current firmware version + behaviour; updates the cert evidence bundle firmware-version log</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="GivEnergy hybrid + EPS install — design, partition, commissioning"
            situation="Customer 4-bed UK detached: 6 kWp PV + GivEnergy 9.5 kWh LFP BESS + GivEnergy Gen3 5 kW hybrid inverter with EPS. Customer wants outage resilience for lighting + fridge + comms + heating controls + a few sockets per room."
            whatToDo="Design: partition ~1.5 kW continuous protected load (lighting + fridge/freezer + 4 socket circuits + boiler + IT cabinet). Implementation: split-load CU with EPS-side bus bar fed from GivEnergy Gen3 EPS output; DNO-side bus bar for shower / oven / kettle / EV charger / heat pump compressor. Backup duration: 9.5 kWh BESS at 80% DoD = ~7.6 kWh usable / 1.5 kW = ~5 hours from battery alone; PV during day extends 8-30 hours; net ~12-48 hour outage resilience depending on weather. Commissioning: BS EN 62446-1 PV + 5 GivEnergy EPS tests (DNO-loss, DNO-restoration, partition, RCD under island, firmware version recorded). Cert evidence bundle: MCS MIS 3002 + Chapter 57 BESS + Chapter 82 PEI + BS EN 62446-1 records + EREC G98 (5 kW inverter at 16 A AC, fit-and-notify). Customer handover pack: protected-load list + EPS behaviour description + backup duration estimate + manufacturer app guidance."
            whyItMatters="UK domestic hybrid + EPS is the modern install standard. The competent design partitions wisely (protect the essentials, accept high-power loss); the competent install delivers reliable EPS behaviour; the competent commissioning verifies + documents. Cert evidence bundle is the customer\'s long-term asset for future maintenance, EICR, ownership transfer."
          />

          <Scenario
            title="EPS commissioning reveals slow switchover — firmware update resolves"
            situation="Installer commissions a Tesla Powerwall 2 + Backup Gateway 2 install. EPS switchover time measured at 300 ms — longer than the Tesla-spec ~200 ms target. Protected-load lighting flickers visibly during the transition."
            whatToDo="Check firmware version: Tesla Powerwall + Backup Gateway are on firmware 24.20 (released early 2024). Tesla release notes for 24.36 (released late 2024) include EPS-transition timing improvements. Trigger firmware update via Tesla app. After update to 24.36: re-run DNO-loss test; switchover now 150 ms; no visible lighting flicker. Customer informed of the resolved behaviour. Cert evidence bundle updated to reflect: commissioning firmware 24.20 (with measured 300 ms); post-update firmware 24.36 (with 150 ms); ongoing customer auto-update policy. Test result documented."
            whyItMatters="Firmware updates can materially improve EPS behaviour. The competent installer monitors release notes for the brand and triggers updates where they fix known issues. Cert evidence bundle becomes a living document — firmware version is captured at each EICR-style inspection."
          />

          <CommonMistake
            title="Putting EV charger or heat pump on EPS without smart load management"
            whatHappens="An installer puts the EV charger circuit and the heat pump compressor circuit on the EPS partition, thinking 'why not?'. During the first grid outage, the EV charger pulls 7 kW + heat pump 3 kW = 10 kW well above the 5 kW EPS rating. The inverter\'s EPS-output stage overloads; protective trips activate; EPS goes offline. Customer\'s protected loads all lose power."
            doInstead="Partition the EPS protected loads to within the EPS continuous rating, allowing typical inrush peaks. Don\'t put high-power loads (EV / heat pump / shower / cooker) on EPS unless: (a) using a larger EPS (Tesla Powerwall 3 11.5 kW or paralleled inverters); OR (b) smart load management that throttles or sheds high-power loads during EPS mode. The competent design picks: small partition + reliable EPS, vs ambitious partition + complex orchestration. Cert evidence bundle records the rationale."
          />

          <CommonMistake
            title="Skipping the firmware-version recording at commissioning"
            whatHappens="An installer commissions a GivEnergy install but doesn\'t record the firmware version in the cert evidence bundle. Months later, a behaviour change is reported. Investigation: no record of what firmware was running when the install was commissioned vs now. Difficult to diagnose whether the change is from firmware update or from another cause (BMS data drift, battery degradation, etc.)."
            doInstead="Always record firmware version at commissioning in the cert evidence bundle. Use the inverter app to read the version; capture in the EPS test record. Re-record at each EICR-style inspection. The firmware-version log is a column in the cert evidence bundle; ongoing visibility into the install\'s software state. Modern hybrid inverters are partially-software-defined products; firmware version matters."
          />

          <CommonMistake
            title="No RCD test under island mode — Reg 411 disconnection times unverified"
            whatHappens="An installer commissions an EPS install but tests RCD operation ONLY in direct feeding mode. The EPS install passes commissioning. Months later, a fault on a protected-load circuit occurs during a grid outage. The RCBO trips slower than expected because the inverter\'s EPS-output stage has lower fault-current capacity than grid. Disconnection time exceeds Reg 411 limits; safety not as designed."
            doInstead="Run the RCD test under BOTH modes — direct feeding AND island mode. Open the DNO main isolator to force EPS mode; then simulate L-E fault on a protected circuit; verify trip time within Reg 411 limits. If trip time exceeds limits, the downstream OCPDs may need re-sizing or higher-spec RCDs (Type B per Reg 712.531.3.5.1 in both modes). Cert evidence bundle records both modes\' test results."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              "EPS = Emergency Power Supply — the functional implementation of Chapter 82 island mode (Reg 824.2 + Reg 826.1.3 OPTION A). UK 2025-2026 hybrid PV+BESS installs typically include EPS.",
              "Two inverter modes: ANTI-ISLANDING (grid-following) for direct feeding — tracks DNO V/freq, trips per EREC G98/G99 + BS EN 50549-1; GRID-FORMING (island) for EPS — generates V/freq locally, supplies protected loads.",
              "EPS switchover time 20-200 ms typical (modern fast EPS < 100 ms). EPS output capacity 3-11 kW continuous depending on brand. Lower fault-current capacity than grid — needs Reg 411 disconnection-time analysis under island mode.",
              "Protected-load partition: typical UK ~1-2 kW (lighting + fridge + sockets + comms + heating controls). High-power loads (heat pump compressor, EV, shower, cooker) typically non-protected.",
              "Implementation: split-load CU (new-build) OR dedicated EPS sub-board (retrofit). RCBOs throughout. Reg 551.7.1(d) compliance for source connection.",
              "Reg 826.1.1.2.2 neutral switching: 4-pole EPS contactor disconnects all conductors from DNO; inverter EPS-output stage creates local N-E bonded neutral; RCDs operate using local reference.",
              "EPS commissioning extends BS EN 62446-1: DNO-loss test (measure switchover time); DNO-restoration test (verify sync-back); protected-load verification; RCD under island mode (Reg 411 disconnection times); firmware version recording.",
              "Firmware lifecycle: modern hybrid inverters receive OTA updates. Record version at commissioning + each EICR-style inspection. Major updates may trigger re-verification of EPS behaviour. Cert evidence bundle includes firmware-version log.",
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Chapter 82 PEIs
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.7 EREC for hybrid
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
