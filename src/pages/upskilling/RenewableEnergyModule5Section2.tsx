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
    id: 'm5s2-what-is-bms',
    question:
      'BMS (Battery Management System) — what is it, and what are its core safety + performance responsibilities in a UK domestic LFP BESS?',
    options: [
      'Just a sensor',
      'The BMS is the electronic brain inside the BESS that monitors and controls every cell. Core safety responsibilities: prevent over-charge (cell V too high), over-discharge (cell V too low), over-current (charge or discharge), over-temperature, cell imbalance, short-circuit. Performance: maintain accurate SoC (state of charge) and SoH (state of health) estimates; balance cells; communicate with PCE / customer app. For UK domestic LFP packs (GivEnergy, Tesla, Sigenergy etc.) the BMS is integrated into the battery enclosure — typically a master controller + per-module slave boards monitoring cell groups',
      'Customer\'s decision',
      'Replaces the inverter',
    ],
    correctIndex: 1,
    explanation:
      'BMS = Battery Management System. The electronic brain that makes a stack of Li-ion cells into a safe, usable battery. Without a BMS, an LFP pack would self-destruct within months (cells drift; some over-charge, others under-discharge; thermal runaway risk grows). The BMS reads every cell\'s voltage and (usually) temperature; balances cells; calculates SoC from coulomb counting + voltage curves; calculates SoH from capacity-tracking + internal-resistance measurement; opens the pack contactor on fault. UK domestic BESS BMS is built into the pack — installer doesn\'t install it separately. BMS communicates with the PCE (hybrid inverter / dedicated BESS PCE) via CAN bus or Modbus; PCE follows BMS instructions for max charge/discharge current, V limits, etc. Reg 570.6.1.1.1 mandates BS EN IEC 62485 conformance which covers BMS function.',
  },
  {
    id: 'm5s2-cell-balancing',
    question:
      'Why do Li-ion cells need balancing, and what\'s the difference between passive and active cell balancing?',
    options: [
      'Same thing',
      'Cells in series have small manufacturing tolerances (capacity, internal resistance) — over many cycles the weakest cell finishes charging first and the strongest cell finishes discharging first. Without balancing, the pack\'s usable capacity drops to the weakest cell\'s. PASSIVE balancing: drain energy from over-V cells via resistors during charging — simple, low-cost, slight efficiency hit, the standard for UK domestic. ACTIVE balancing: shuttle charge between cells via inductors / capacitors — higher efficiency, more complex / expensive, used in premium / EV-style systems',
      'Customer chooses',
      'Not needed for LFP',
    ],
    correctIndex: 1,
    explanation:
      'Cell balancing keeps every cell at the same SoC. Reasons cells drift: (1) manufacturing capacity tolerance ~1-3% (50 mAh on a 2000 mAh cell); (2) internal resistance tolerance; (3) temperature gradients across the pack (cells at the edges cooler than centre); (4) age + cycle history. Without balancing: pack capacity drops to weakest cell. With balancing: pack capacity stays at near-nameplate for cycle life. PASSIVE: resistor drains over-V cells at top of charge — heat dissipated, simple, ~98-99% efficient overall, standard in UK domestic LFP. ACTIVE: charge shuttled cell-to-cell via switched-capacitor or inductor circuits — ~99.5%+ efficient, more complex, used in Tesla EV packs + some premium BESS. The BMS controls balancing automatically; no user intervention; cert evidence bundle records the BMS spec + balancing approach.',
  },
  {
    id: 'm5s2-soc-vs-soh',
    question:
      'SoC vs SoH — what\'s the difference and how does the BMS calculate each?',
    options: [
      'Same thing',
      'SoC (State of Charge) = how full the battery is RIGHT NOW (0-100%). Calculated by coulomb counting (integrating current flow over time) + voltage-curve corrections (especially at top/bottom of charge where V changes more) + temperature compensation. SoH (State of Health) = how much capacity remains compared to ORIGINAL nameplate (100% new, falling over years). Calculated by tracking actual capacity per full discharge + internal-resistance measurement + calendar age. SoC tells you how much energy you can use NOW; SoH tells you how the battery is ageing OVER TIME',
      'Customer doesn\'t need to know',
      'No difference',
    ],
    correctIndex: 1,
    explanation:
      'SoC: instantaneous % charge. Calculated primarily by COULOMB COUNTING (integrate the current in/out; rate-of-charge proportional to current; result is Ah counted). LFP\'s flat V curve makes pure V-based SoC unreliable mid-range (3.2V/cell holds across ~20-80% SoC); coulomb counting + V-curve corrections at top + bottom give accurate SoC. Temperature corrections needed (capacity varies with T). SoH: long-term capacity retention. Calculated by FULL-cycle capacity tracking (measure actual Ah delivered from full to empty); internal-resistance measurement (rises as cell ages); supplemented by calendar-age model. UK domestic BMS reports both SoC + SoH via the customer app. SoH typically reads 100% new, drops to ~92-95% at year 5, ~70-80% at year 10. Cert evidence bundle records the SoH commissioning baseline for future comparison.',
  },
  {
    id: 'm5s2-bms-pce-communication',
    question:
      'How does the BMS talk to the PCE (hybrid inverter / dedicated BESS inverter), and why does this protocol matter?',
    options: [
      'They don\'t communicate',
      'Industry-standard protocols: CAN bus (Controller Area Network — automotive standard, common for BMS-PCE), Modbus RTU (RS-485 wired, common for industrial PCE), or manufacturer-proprietary (Tesla Gateway-Powerwall protocol, GivEnergy internal). The BMS publishes: max charge current, max discharge current, V limits, SoC, SoH, fault state. The PCE follows these limits. WITHOUT good communication, the PCE would over-charge or over-discharge the battery — risking damage or fault trips. Matching BMS + PCE protocols is the #1 compatibility check when pairing batteries with inverters',
      'WiFi',
      'No protocol',
    ],
    correctIndex: 1,
    explanation:
      'BMS-PCE communication is critical. The BMS knows what the battery can safely accept/deliver; the PCE controls actual current flow; they must talk. Common protocols: (1) CAN bus — automotive-derived, fast, robust, common between BMS and PCE in same vendor ecosystem (e.g. GivEnergy, Pylontech, BYD); (2) Modbus RTU over RS-485 — industrial standard, common in commercial / multi-brand integration; (3) Proprietary — Tesla Gateway-to-Powerwall (encrypted), Enphase IQ Gateway-to-Battery. Mixing brands fails when protocols don\'t match — the PCE doesn\'t know the battery\'s limits and goes by safe defaults (usually too conservative). This is why pairing &ldquo;works with X battery&rdquo; lists exist in manufacturer documentation. Cert evidence bundle records the BMS-PCE compatibility statement.',
  },
  {
    id: 'm5s2-bms-fault-modes',
    question:
      'What are the typical BMS fault conditions that trigger the pack contactor to open in a UK domestic LFP BESS?',
    options: [
      'No faults',
      'Cell-level: over-V (>3.65V/cell typical for LFP); under-V (<2.5V/cell); over-temperature (>60°C cell); under-temperature (<-10°C charge / <-20°C discharge); cell V imbalance (>50-100mV cell-to-cell delta sustained). Pack-level: over-current charge / discharge (manufacturer-specific, typically >1.0-1.5C continuous); short-circuit (instantaneous open); CAN bus / communication loss; BMS internal fault. Customer-visible via app; fault history logged. The pack contactor opens to disconnect the battery from the PCE; manual reset or auto-reset depending on fault type',
      'Customer\'s choice',
      'Only one fault',
    ],
    correctIndex: 1,
    explanation:
      'BMS fault response opens the pack contactor (or signals the PCE to disconnect). Typical LFP fault thresholds: cell V 2.5-3.65V operating window; over-V at full charge ~3.55V/cell trigger; under-V at empty ~2.7V/cell trigger; over-T cell ~60°C; under-T ~-10°C charge limit; cell imbalance ~50-100 mV sustained over multiple cycles. Pack-level over-current per chemistry C-rate spec. Most modern UK BMS supports remote diagnostics via app + manufacturer cloud; faults logged with timestamps; some auto-reset (transient over-current), others manual reset (over-V, cell imbalance). Cert evidence bundle records the fault thresholds + the post-fault reset procedure for the customer information pack.',
  },
  {
    id: 'm5s2-temperature-derating',
    question:
      'A customer\'s BESS shows reduced charge/discharge rates on cold winter mornings (sub-5°C garage). What\'s happening?',
    options: [
      'Battery faulty',
      'TEMPERATURE DERATING by the BMS. Below ~10°C, LFP cells accept less current (lithium plating risk during charging at low T can permanently damage cells). The BMS reduces max charge current accordingly: full rate above ~15°C, half rate around 5°C, near-zero or zero below 0°C. Discharge derating is gentler — LFP can still discharge in cold, but capacity is temporarily reduced. Customer sees lower kWh available + slower charge speed. Normal behaviour, not a fault. Mitigation: install location with stable temperature (utility room, indoor garage); some premium BESS have heated battery enclosures',
      'Replace battery',
      'Customer\'s fault',
    ],
    correctIndex: 1,
    explanation:
      'Temperature derating protects the cells. LFP charging below ~0°C risks lithium plating on the anode — irreversible damage. BMS implements a temperature-vs-current curve: full charge rate above ~15-20°C; reduced 10-15°C; minimal 0-10°C; zero below 0°C. Discharge less restricted but capacity drops ~10-20% at sub-5°C ambient. UK garage / unheated utility room can swing below 5°C in winter — the customer notices reduced performance. Solution options: (1) install location with year-round 10°C+ ambient; (2) accept the seasonal performance dip; (3) premium BESS with internal heating (more expensive, more complex, marginal benefit for UK climate). PAS 63100 + manufacturer install spec address temperature considerations. Cert evidence bundle records the install location + expected temperature range.',
  },
  {
    id: 'm5s2-bms-architectures',
    question:
      'BMS architectures — centralised vs distributed vs modular. What\'s typical for UK domestic LFP packs?',
    options: [
      'All the same',
      'CENTRALISED: one BMS board with all cell-monitoring wires routed back to it — simple, lower cost, OK for small packs but wiring complexity grows with cell count. DISTRIBUTED: per-module slave boards each monitoring their group of cells, communicating to a master controller via CAN — typical for UK domestic modular packs (GivEnergy, Pylontech, BYD Battery Box). MODULAR (per-cell or small-string): each cell or small string has its own monitoring chip — premium / EV-style. UK domestic 5-15 kWh LFP packs typically use distributed (master + 1-3 slave boards per stack)',
      'Customer\'s choice',
      'No architecture',
    ],
    correctIndex: 1,
    explanation:
      'BMS architectures by scale: CENTRALISED (small packs, ~12-48V, ≤4 kWh) — one board reads all cells via short wires; cost-effective, limited scalability. DISTRIBUTED (UK domestic 5-15 kWh) — master controller + slave boards each monitoring 8-16 cells; CAN-bus between master and slaves; modular packs (GivEnergy, BYD Battery Box, Pylontech US series, Sigenergy SP) typically use this; scales by adding modules each with their own slave. MODULAR per-cell (premium / EV / large grid-scale) — every cell has its own monitoring chip; highest accuracy, highest cost; Tesla EV packs use this; some premium home BESS (Sigenergy higher-tier). Cert evidence bundle records the BMS architecture as part of the manufacturer datasheet reference.',
  },
  {
    id: 'm5s2-bms-failure-modes',
    question:
      'A customer\'s 4-year-old BESS reports a &ldquo;BMS communication fault&rdquo; via the app. What\'s the diagnostic priority?',
    options: [
      'Replace battery',
      '(1) Power-cycle the BESS per manufacturer procedure — transient communication faults often clear; (2) Check CAN bus / wiring between PCE and BMS — connectors, terminator resistors, cable damage; (3) Check BMS firmware version + manufacturer release notes for known bugs; (4) Update PCE firmware to latest if pairs have drifted; (5) Read fault log via manufacturer app / portal — exact fault code identifies root cause; (6) Contact manufacturer support — most provide remote diagnostic / firmware push. Replace battery only after diagnostic confirms hardware failure. Most BMS communication faults are software / firmware / wiring — not cell failure',
      'Customer\'s fault',
      'Ignore the fault',
    ],
    correctIndex: 1,
    explanation:
      'BMS communication faults are common and almost always recoverable. Diagnostic order: (1) power-cycle (BESS off-on per manufacturer procedure, ~15-30 min total) — clears transient CAN bus glitches; (2) inspect CAN bus / Modbus wiring — connectors, terminator resistors, cable damage at the BMS-PCE interface; (3) check firmware versions on both BMS + PCE — many UK BESS push OTA updates, customer apps may show pending updates; (4) read fault history with timestamps — the exact code (e.g. &ldquo;CAN timeout&rdquo;, &ldquo;BMS over-voltage&rdquo;, &ldquo;cell imbalance&rdquo;) directs root-cause analysis; (5) contact manufacturer support — GivEnergy / Tesla / Sigenergy provide cloud-side remote diagnostic + firmware updates. Replace battery: only after confirmed hardware failure (cell-level fault > BMS firmware fixable). Cert evidence bundle should record the manufacturer support contact + fault-log access procedure.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Customer\'s GivEnergy 9.5 kWh LFP battery app shows SoC 45%, SoH 98% after 2 years of daily cycling. Is this normal?',
    options: [
      'Faulty',
      'YES — entirely normal. SoC at 45% just means the battery is half full at the moment of reading. SoH at 98% after 2 years of daily cycling is excellent — typical LFP degradation is ~2-3% calendar + ~0.5-1% per 365 cycles at 80% DoD. 2 years = ~4-6% expected total degradation. 98% retention is at the better end of typical, suggesting good install conditions (stable temperature, sensible DoD discipline). Manufacturer warranty: typically &ge;70% retention at year 10 — well on track',
      'Replace immediately',
      'Customer error',
    ],
    correctAnswer: 1,
    explanation:
      'SoC and SoH are different metrics. SoC = instantaneous % full (45% = half-empty). SoH = capacity retention vs original nameplate (98% = 2% degraded). GivEnergy + Tesla + Sigenergy etc. all expose both via their customer apps. Year 2 LFP SoH at 98% is normal-to-excellent. Year 5 typical: 90-95%. Year 10 typical: 75-85%. The commissioning baseline (recorded in cert evidence bundle) is the reference — degradation tracked against the baseline using the BMS-reported SoH. Manufacturer warranty curve usually guarantees a specific retention at the warranty endpoint; field measurements compared to the curve identify any abnormal drift.',
  },
  {
    id: 2,
    question:
      'A customer installer wants to pair a Pylontech US3000C battery (CAN bus) with a Solis hybrid inverter. Compatibility verified how?',
    options: [
      'Always compatible',
      'Check Solis\'s documented compatible-battery list. Reputable inverter manufacturers publish &ldquo;works with X battery&rdquo; tables — Solis, GivEnergy, Sigenergy, Victron, SolarEdge all maintain these. Solis Hybrid S6 series compatible with multiple LFP brands including some Pylontech models via CAN bus; specific firmware versions may be required. The inverter\'s commissioning app selects the battery model — wrong model selected = wrong protocol = battery never communicates. Cert evidence bundle records the inverter firmware + selected battery profile',
      'Customer\'s preference',
      'No compatibility issue',
    ],
    correctAnswer: 1,
    explanation:
      'BMS-PCE compatibility is verified via the inverter manufacturer\'s compatible-battery list. Pylontech, BYD, GivEnergy, Tesla, Enphase batteries — each has documented compatibility with specific inverter brands + firmware versions. The inverter\'s commissioning app typically presents a list of supported batteries; the installer selects the correct profile; the inverter loads the correct CAN bus / Modbus protocol. Wrong selection = silent communication failure = battery stays disconnected or runs on conservative defaults. Some inverter+battery pairs need specific firmware versions on both sides — check the compatibility matrix. Cert evidence bundle records the verified pairing + the firmware versions deployed.',
  },
  {
    id: 3,
    question:
      'A 5-year-old BESS shows cell V imbalance (cells 1-7 at 3.31V, cells 8-12 at 3.27V) on the BMS log. What\'s happening, and what\'s the action?',
    options: [
      'Normal operation',
      'Cell-level imbalance is developing. Two scenarios: (a) NORMAL ageing — small imbalance ~30-50 mV is within typical tolerance; the BMS will balance over coming cycles; no action needed; (b) ABNORMAL — large imbalance (>100 mV sustained) or rapid imbalance growth indicates a cell or string developing higher internal resistance; replacement or rebalancing protocol per manufacturer needed. The 40 mV gap here is borderline — monitor over next 2-4 weeks; if growing, contact manufacturer support; if stable / reducing, normal balancing in progress',
      'Replace whole battery',
      'Disconnect immediately',
    ],
    correctAnswer: 1,
    explanation:
      'Cell V imbalance monitoring is part of the BMS\'s normal job. Acceptable cell-to-cell delta thresholds: <30 mV excellent; 30-80 mV normal LFP ageing (BMS balances over multiple cycles); 80-150 mV warning level (monitor + investigate); >150 mV sustained = fault condition (BMS may trip). LFP\'s flat V-curve means even small differences mean larger SoC differences than in NMC. The 40 mV gap described is borderline-normal — watching for trend matters more than current value. Manufacturer remote diagnostics (GivEnergy / Tesla / Sigenergy cloud portals) can flag cell-imbalance trends earlier than the customer notices. Cert evidence bundle records the manufacturer support contact for cell-balance issues + the typical thresholds for the specific battery model.',
  },
  {
    id: 4,
    question:
      'Customer\'s install is in an unheated garage. Winter mornings dip to 2°C ambient. How does this affect the BESS, and what should the customer expect?',
    options: [
      'No effect',
      'BMS will derate charge current significantly at sub-10°C — charging only at fractional rates. Discharge less affected but capacity temporarily reduced ~10-15% at 2°C. Customer sees: slower morning charge from PV when the battery is cold; reduced kWh available until ambient warms up; normal performance once ambient reaches 10°C+. Not a fault — protective behaviour to prevent lithium plating during cold-charge. PAS 63100 + manufacturer install spec require considering the installation temperature range. Mitigation: relocate to warmer space (utility room, indoor garage), insulate the enclosure, or accept the seasonal dip',
      'Replace battery',
      'Customer error',
    ],
    correctAnswer: 1,
    explanation:
      'Cold temperature impact on LFP BESS is real but manageable. BMS temperature-derating curve typical: full rate above 15-20°C; reduced 10-15°C (~75% rate); minimal 0-10°C (~25-50% rate); zero below 0°C. Discharge curve: less restricted (LFP can still discharge cold, just lower capacity ~10-15% reduction at 2°C). Cold-weather solutions: (1) install location with year-round 10°C+ minimum (most UK domestic accept this — utility room, kitchen-adjacent garage); (2) enclosure insulation if standalone outdoor install (some commercial BESS use); (3) BMS-driven internal heating for premium installs (more expensive, more parasitic load, marginal UK benefit). PAS 63100 mandates considering install location temperature; cert evidence bundle records the expected operating range.',
  },
  {
    id: 5,
    question:
      'Reg 570.5.2 says PCE shall be selected for the type of battery and application, taking account of battery manufacturer\'s instructions. What does this mean in BMS-pairing practice?',
    options: [
      'Any PCE works',
      'The PCE must match the BMS protocol + the battery\'s V/I/T operating window + the manufacturer\'s explicit compatibility statement. Practical implementation: only pair PCEs and batteries listed as compatible in the manufacturer datasheet / compatibility matrix. The cert evidence bundle records the manufacturer compatibility statement. Mismatched PCE + BMS = silent communication failure + battery on conservative defaults (under-utilised) OR misoperation (over-current / over-V cycling) = warranty void',
      'Customer\'s choice',
      'No matching needed',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.5.2 (Chapter 57 NEW A4:2026): &ldquo;The type and characteristics of PCE shall be selected to be suitable for the type of battery and its application, taking account of the battery manufacturer\'s instructions.&rdquo; NOTE 1 explicitly recognises hybrid inverters; NOTE 2 explicitly recognises AC and DC coupling. The competent install verifies BMS-PCE compatibility BEFORE quoting / installing. Practical checks: (1) manufacturer compatibility matrix (both sides — inverter says battery X works; battery says inverter Y works); (2) protocol match (CAN bus baud rate / message format, or Modbus address map); (3) firmware version stack-ups (sometimes specific versions required); (4) cable / connector spec (CAN bus needs proper terminator + drain wire). Cert evidence bundle records the verified pairing + the manufacturer compatibility statement.',
  },
  {
    id: 6,
    question:
      'A customer\'s BESS app suddenly stops showing live data — no telemetry, no SoC update. Cause hierarchy?',
    options: [
      'Battery dead',
      'Diagnostic hierarchy: (1) CHECK INTERNET — most BESS apps need cloud connectivity; router / WiFi outage stops telemetry without affecting battery operation; (2) CHECK BESS POWER — battery may still operate but local comms board needs power; (3) CHECK CAN bus / inter-component wiring — local communication breakdown between BMS and gateway / monitoring unit; (4) CHECK manufacturer cloud status — sometimes the cloud platform itself has outages affecting all users; (5) CHECK firmware updates pending — a stalled OTA update can break communications until completed. Battery continues normal operation locally regardless of app visibility; data resumes when comms restored',
      'Battery faulty',
      'Customer\'s fault',
    ],
    correctAnswer: 1,
    explanation:
      'App / telemetry loss != battery failure. Modern UK BESS architecture: battery operates locally via BMS-PCE comms; telemetry / app sees the state via a gateway that uploads to the manufacturer cloud. Loss of any of: home internet, BESS gateway, manufacturer cloud, BESS power, internal comms — breaks the app view without affecting battery operation. Diagnostic order: (1) home internet first (most common); (2) BESS power + LED status indicators (most BESS have local status LEDs that work without cloud); (3) BESS gateway / comms unit reboot; (4) manufacturer cloud status (Twitter / status page); (5) firmware update progress. The battery continues to charge / discharge / provide EPS backup throughout. Cert evidence bundle should include manufacturer support contacts + the local-status-LED reference card.',
  },
  {
    id: 7,
    question:
      'For Reg 570.6.1.1.1 BS EN IEC 62485 conformance, what BMS-related safety requirements does the standard cover?',
    options: [
      'No BMS requirements',
      'BS EN IEC 62485 series covers safety for stationary battery installs — including BMS function. Part -5 (lithium-ion specific): cell V monitoring, cell T monitoring, balancing, fault detection, contactor control on fault, communication with PCE, status indication, safe-state on fault. Part -1 (general): basic safety principles, hazard mitigation. Part -2 (lead-acid / VRLA / NiCd): traditional Pb-acid + alternatives. UK domestic LFP BMS conformance is via the manufacturer\'s product certification — the installer doesn\'t verify cell-by-cell but does verify the manufacturer compliance statement',
      'Customer responsibility',
      'No BMS standard',
    ],
    correctIndex: 1,
    explanation:
      'BS EN IEC 62485 series — Safety requirements for secondary batteries and battery installations. Five parts: -1 (general safety), -2 (stationary Pb-acid + VRLA + NiCd), -3 (traction batteries), -4 (small Li-ion), -5 (Li-ion stationary). For UK domestic LFP BESS: -5 is the most relevant. Covers: BMS V/I/T monitoring per cell or group; balancing function; fault detection thresholds; contactor / disconnect on fault; communication protocols; isolation between cells and external circuits; safe-state on fault. The manufacturer\'s product certification declares 62485 series conformance — installer verifies via the manufacturer compliance statement. Reg 570.6.1.1.1 references the series; cert evidence bundle records the conformance declaration.',
  },
  {
    id: 8,
    question:
      'A customer asks how often they need to &ldquo;maintain&rdquo; or &ldquo;service&rdquo; the BMS. Best answer?',
    options: [
      'Annual service',
      'Modern UK domestic LFP BMS is essentially maintenance-free for the customer. The BMS auto-balances, auto-diagnoses, auto-updates firmware (OTA via manufacturer cloud where supported). The customer\'s responsibility: (a) keep the install location at appropriate temperature; (b) check the app periodically for fault notifications; (c) ensure home WiFi is connected (so OTA + telemetry work). Periodic inspection (typically 5-yearly as part of EICR-style check) verifies BMS firmware is current, fault log clean, capacity baseline tracking expected curve. No internal user-serviceable parts; replacement at end of warranty / cycle / calendar life',
      'Weekly cleaning',
      'Daily checks',
    ],
    correctAnswer: 1,
    explanation:
      'Modern UK LFP BESS BMS is maintenance-free for the customer in normal operation. Manufacturer-side: cloud monitoring, OTA firmware updates, remote diagnostics, fault alerts. Customer-side: appropriate install location (temperature, dryness, no obstruction), app monitoring for fault notifications, WiFi connectivity. The 5-yearly inspection (covered in Section 5.8) checks: firmware versions current; fault log review (any unresolved alerts?); SoH trending vs warranty curve; cell-balance health from the BMS log; isolators function; warning labels in place. No user-serviceable internal parts. Cert evidence bundle records the maintenance schedule + the customer information pack contents.',
  },
];

const faqs = [
  {
    question: 'What\'s the difference between BMS and PCE?',
    answer:
      'BMS (Battery Management System) is the electronic brain INSIDE the battery — monitors cells, balances, calculates SoC/SoH, opens contactor on fault. PCE (Power Conversion Equipment) is the inverter/converter that handles AC↔DC conversion between the battery and the wider install. Hybrid PV+BESS: hybrid inverter is the PCE; the BMS inside the battery pack talks to the hybrid inverter via CAN bus or Modbus. AC-coupled BESS: separate battery inverter is the PCE. The BMS publishes battery limits (max V/I/T); the PCE respects those limits in its charge/discharge control loop. Reg 570.5.2 governs PCE selection; Reg 570.6.1.1.1 + BS EN IEC 62485 cover BMS function.',
  },
  {
    question: 'Can a customer access the BMS data directly?',
    answer:
      'Modern UK BESS apps expose key BMS data: SoC, SoH, daily/total energy throughput, charge/discharge power, fault history. GivEnergy app, Tesla app, Sigenergy mySigen, FoxESS Cloud, Huawei FusionSolar — all provide customer-facing dashboards. Deeper diagnostics (cell-level V, internal resistance, balancing log) typically require installer / manufacturer support access. Some advanced users get more depth via Home Assistant / OpenEnergyMonitor integrations where the manufacturer publishes APIs. The cert evidence bundle should include the customer\'s app credentials + the manufacturer support contact.',
  },
  {
    question: 'How does cell balancing work in detail?',
    answer:
      'PASSIVE balancing (UK domestic default): during charging, when a cell reaches the V threshold (~3.45V for LFP) BEFORE the rest, the BMS connects a small resistor across that cell — burning a few mA of current as heat, slowing its charge so others catch up. Continues over multiple cycles; over weeks/months the pack stays balanced. ACTIVE balancing (premium / EV): instead of burning energy, the BMS shuttles charge between cells via inductors / switched capacitors — no heat dissipation, higher efficiency, more complex circuitry, ~£200-500 extra per pack typically. UK domestic LFP almost always uses passive balancing — adequate for the slow drift LFP exhibits.',
  },
  {
    question: 'What\'s the typical BMS firmware update cycle?',
    answer:
      'UK 2025-2026 brands typically push OTA firmware updates 2-4 times per year — bug fixes, feature additions, new battery model support, security patches. GivEnergy, Tesla, Sigenergy, FoxESS, Huawei all support cloud-pushed OTA. Update window typically 15-60 minutes; battery operation may be reduced during the update; auto-rollback on failed update. Customer notified via app; some installers handle scheduled updates as part of ongoing service. The cert evidence bundle should record the as-installed firmware version + the manufacturer\'s update channel access for the customer.',
  },
  {
    question: 'Why does the BMS sometimes &ldquo;de-rate&rdquo; the battery?',
    answer:
      'Several reasons: (1) TEMPERATURE — sub-10°C reduces charge rate; sub-0°C may prevent charge entirely; high T (>45°C) reduces both; (2) AGEING — as SoH declines, BMS may reduce max charge/discharge to extend remaining life; (3) CELL IMBALANCE — large imbalance reduces effective pack capacity until balanced; (4) FAULT RECOVERY — after a fault, BMS may operate at reduced rate during a recovery window; (5) FIRMWARE UPDATES — temporary derate during OTA. Customer-visible via app; usually transient. Permanent derating may indicate ageing or cell-level issues — investigate via manufacturer support.',
  },
  {
    question: 'How does the BMS handle a power outage / grid loss?',
    answer:
      'BMS operates independent of grid presence — it\'s powered by the battery itself. During grid outage: BMS continues monitoring + balancing + safety functions. Discharge to EPS-protected loads (where supported per Module 4 Section 6) is normal operation. If battery SoC reaches BMS low-V cutoff (~10-20% remaining for LFP), BMS opens the pack contactor to prevent over-discharge — customer loses backup power. Recovery on grid restoration: BMS allows charge to resume per normal logic. Long outages may exhaust the battery; cert evidence bundle records the expected backup duration at the customer\'s typical EPS load.',
  },
  {
    question: 'Can the BMS be replaced separately from the cells?',
    answer:
      'Modular packs: sometimes — manufacturer-specific. GivEnergy modular HV: BMS master + module slaves can be individually replaced via service. Tesla Powerwall: BMS is integrated into the unit; field replacement requires manufacturer-trained engineers; out-of-warranty replacement may not be cost-effective vs unit replacement. Some commercial / industrial BESS designed for field-serviceable BMS swap. Customer expectation for typical UK domestic: BMS is part of the battery; replacement is at the unit level; planning for replacement is part of long-term ownership (Section 5.8 covers).',
  },
  {
    question: 'How does the BMS protocol differ between brands?',
    answer:
      'Three broad families: (1) CAN bus open-standard — Pylontech, BYD, GivEnergy, others — common subset of CAN messages, decent cross-vendor compatibility within the LFP modular ecosystem; (2) Modbus RTU over RS-485 — industrial / commercial PCE pairing, more flexible but slower; (3) Proprietary — Tesla Gateway-Powerwall (encrypted), Enphase IQ Gateway-Battery (IQ-specific). The proprietary protocols are tighter integration within the brand ecosystem but lock the customer into that brand for future expansion. UK domestic best practice: pick a brand and stay within it for any expansion.',
  },
  {
    question: 'How does the BMS interact with the EEMS?',
    answer:
      'Reg 570.5.3 + Section 825 (Chapter 82 EEMS) — the EEMS supervises the overall PEI (loads, sources, storage). The BMS handles cell-level safety + monitoring; the EEMS handles install-level orchestration (when to charge, discharge, export, shed loads, etc.). The PCE sits between: takes EEMS instructions, respects BMS limits, controls actual current flow. Three-layer architecture: BMS (cell safety) → PCE (power flow) → EEMS (orchestration). UK domestic: often the hybrid inverter\'s app is the EEMS interface, abstracting the underlying layers.',
  },
];

export default function RenewableEnergyModule5Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'BMS, cell balancing, SoC & SoH | Renewable Energy 5.2 | Elec-Mate',
    description:
      'Battery Management System (BMS) in depth — architecture, cell balancing (passive vs active), SoC (coulomb counting) vs SoH (capacity tracking), BMS-PCE communication (CAN / Modbus / proprietary), temperature derating, fault modes. Reg 570.5.2 PCE selection + Reg 570.6.1.1.1 BS EN IEC 62485 series.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · BS 7671:2018+A4:2026 · Chapter 57"
            title="BMS, cell balancing, SoC & SoH"
            description="The Battery Management System — the electronic brain inside the BESS. Architecture, cell balancing, SoC vs SoH, BMS-PCE communication (CAN / Modbus / proprietary), temperature derating, fault modes. Reg 570.5.2 PCE selection + Reg 570.6.1.1.1 BS EN IEC 62485 series."
            tone="yellow"
          />

          <TLDR
            points={[
              'BMS = Battery Management System. The electronic brain inside the BESS that makes a stack of Li-ion cells into a safe, usable battery. Monitors every cell&rsquo;s V + T, balances cells, calculates SoC + SoH, opens pack contactor on fault.',
              'Cell balancing — necessary because cells drift over cycles (manufacturing tolerance + temperature + age). PASSIVE balancing (resistor drains over-V cells) is UK domestic standard. ACTIVE balancing (charge shuttle between cells) is premium / EV-style.',
              'SoC vs SoH — SoC (State of Charge) = how full RIGHT NOW (0-100%). Calculated by coulomb counting + V-curve corrections + temperature compensation. SoH (State of Health) = capacity vs original (100% new, falling with age). Calculated by full-cycle capacity tracking + internal-resistance measurement.',
              'BMS-PCE communication via CAN bus (automotive-style, common in vendor ecosystems), Modbus RTU (industrial), or proprietary (Tesla Gateway-Powerwall, Enphase IQ). The BMS publishes battery limits; the PCE respects them. Mismatched protocols = silent failure.',
              'Reg 570.5.2 — PCE shall be selected to be suitable for the battery + application taking account of manufacturer instructions. NOTE 1 recognises hybrid inverters; NOTE 2 recognises AC + DC coupling.',
              'Reg 570.6.1.1.1 — BESS shall conform to BS EN IEC 62485 series. Part -5 covers Li-ion stationary BMS function. Manufacturer compliance statement is the cert evidence.',
              'Temperature derating: BMS reduces charge rate below ~15°C (cold = lithium plating risk during charge); zero below 0°C. Discharge less restricted but capacity ~10-15% reduced. PAS 63100 install location guidance applies.',
              'BMS fault modes: cell-level (over-V / under-V / over-T / under-T / V imbalance) + pack-level (over-current / short-circuit / comms loss / firmware fault). Modern OTA firmware updates resolve most issues. App / cloud diagnostics standard.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain what a BMS is, what it monitors, and what safety + performance functions it performs in a UK domestic LFP BESS.',
              'Distinguish passive vs active cell balancing and recognise which is standard for UK domestic.',
              'Explain SoC vs SoH; describe how each is calculated (coulomb counting vs capacity tracking + internal resistance).',
              'Identify BMS-PCE communication protocols (CAN bus, Modbus RTU, proprietary) and verify BMS-PCE compatibility via manufacturer matrix.',
              'Apply Reg 570.5.2 PCE-selection criteria + Reg 570.6.1.1.1 BS EN IEC 62485 conformance.',
              'Interpret temperature derating, fault modes, and the diagnostic approach to common BMS issues.',
              'Recognise that modern BMS is maintenance-free for the customer; periodic inspection verifies firmware + fault log + SoH curve.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The BMS is the brain. The PCE is the muscle. The EEMS is the conductor. All three must agree.</Pullquote>

          <ContentEyebrow>What a BMS is and what it does</ContentEyebrow>

          <ConceptBlock
            title="BMS — Battery Management System"
            plainEnglish="The BMS is the electronic brain inside the BESS. It monitors every cell&rsquo;s voltage and temperature, balances cells over time, calculates SoC and SoH, communicates with the PCE, and opens the pack contactor on fault. Without a BMS, a Li-ion pack would self-destruct within months."
            onSite="UK 2025-2026 domestic LFP BESS: BMS is integrated into the battery enclosure — installer doesn&rsquo;t fit it separately. Typical architecture: master controller + per-module slave boards each monitoring 8-16 cells. Communication to PCE via CAN bus (most common) or Modbus RTU. Customer-facing data via manufacturer app."
          >
            <p>Core BMS responsibilities:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Cell voltage monitoring</strong> — every cell&rsquo;s V read continuously; cell V outside the safe window (~2.5V to ~3.65V for LFP) triggers protective action</li>
              <li><strong className="text-white">Cell temperature monitoring</strong> — per cell or per cell group; T outside safe window (typically -20°C to +60°C cell-level operating, narrower for charging) triggers derating or shutdown</li>
              <li><strong className="text-white">Cell balancing</strong> — passive resistor-based balancing during charging keeps cells at matched SoC despite manufacturing tolerance + ageing differences</li>
              <li><strong className="text-white">SoC calculation</strong> — coulomb counting (integrating current flow) + V-curve corrections + temperature compensation. Reported as 0-100% via app</li>
              <li><strong className="text-white">SoH calculation</strong> — full-cycle capacity tracking + internal-resistance measurement + calendar-age model. Reported as % vs original nameplate</li>
              <li><strong className="text-white">Pack contactor control</strong> — opens the high-current contactor on any fault condition, isolating the battery from the PCE / install</li>
              <li><strong className="text-white">PCE communication</strong> — publishes max charge/discharge current, V limits, SoC, SoH, fault state via CAN bus or Modbus</li>
              <li><strong className="text-white">Firmware updates</strong> — modern UK BMS supports over-the-air (OTA) updates via the manufacturer cloud; fixes bugs, adds features, supports new PCE pairings</li>
              <li><strong className="text-white">Fault logging</strong> — every fault timestamped + categorised; readable via customer app + manufacturer remote diagnostics</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.1.1.1 — BS EN IEC 62485 conformance"
            clause="Stationary secondary battery installations shall conform to the relevant parts of the BS EN IEC 62485 series. Where appropriate, bidirectional protective devices shall be selected."
            meaning="Reg 570.6.1.1.1 anchors UK BESS install safety to the BS EN IEC 62485 series. Five parts: -1 general safety principles; -2 stationary Pb-acid + VRLA + NiCd; -3 traction batteries; -4 small Li-ion; -5 Li-ion stationary (the most relevant for UK domestic LFP BESS). The standard covers BMS function: V/I/T monitoring, balancing, fault detection, contactor control, communication, safe-state behaviour. The manufacturer&rsquo;s product certification declares 62485 conformance; the installer verifies via the manufacturer compliance statement. Cert evidence bundle records the declaration. The &ldquo;bidirectional protective devices&rdquo; note pairs with Reg 826.1.2.2 (Chapter 82) — current flows either way in a hybrid PV+BESS install, so OCPDs must operate in either direction."
          />

          <DiagramPlaceholder
            caption="BMS three-layer architecture diagram — battery enclosure cutaway showing: bottom layer cells (16-48 cells in series for typical 48V or HV LFP); middle layer slave monitoring boards (one per ~12 cells, reading V + T, balancing current bypass resistors); top layer master controller (CAN bus interface to PCE, SoC/SoH calculation, fault logic, pack contactor control). Arrows showing data flow (cells → slaves → master → PCE via CAN bus). Annotated with typical V thresholds (LFP 2.5V-3.65V cell), T thresholds, balancing currents (~50-200 mA per cell)."
            filename="renewable/m5s2-bms-architecture.png"
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Cell balancing — passive vs active</ContentEyebrow>

          <Pullquote>Cells drift. The BMS balances. UK domestic: passive resistor balancing is standard.</Pullquote>

          <ConceptBlock
            title="Why cells need balancing"
            plainEnglish="Li-ion cells in series have small manufacturing tolerances — capacity within ~1-3%, internal resistance similar. Over many cycles, the weakest cell finishes charging first and the strongest cell finishes discharging first. Without balancing, the pack&rsquo;s usable capacity drops to the weakest cell."
            onSite="Plus environmental factors: cells at the edges of a pack run cooler than centre cells (uneven cooling); cells closer to the busbar carry slightly more current. Over years, small differences compound. The BMS&rsquo;s balancing function keeps the pack at near-nameplate capacity for cycle life."
          >
            <p>Why cells drift in a series-connected pack:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Manufacturing tolerance</strong> — typical ~1-3% cell-to-cell capacity variation (50-100 mAh on a 2000 mAh cell). Better cells matched at factory; cheaper packs use looser tolerance</li>
              <li><strong className="text-white">Internal resistance tolerance</strong> — small differences in cell impedance cause uneven voltage drops under load</li>
              <li><strong className="text-white">Temperature gradients</strong> — cells at the edge of a pack are cooler than centre cells; cooler cells age slower; centre cells age faster</li>
              <li><strong className="text-white">Cycle history</strong> — small SoC differences compound over many cycles</li>
              <li><strong className="text-white">Result without balancing</strong> — pack&rsquo;s usable capacity = weakest cell&rsquo;s capacity; loses ~10-30% capacity over a few years</li>
              <li><strong className="text-white">Result with balancing</strong> — pack stays at ~98-99% of factory matched capacity for the cycle life of the cells</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Passive balancing — UK domestic standard"
            plainEnglish="During charging, when a cell reaches the V threshold (~3.45V for LFP) BEFORE the rest, the BMS connects a small resistor across that cell, burning a few mA of current as heat. The cell&rsquo;s charge slows; the others catch up. Over many cycles the pack stays balanced."
            onSite="UK 2025-2026 LFP domestic BESS almost universally uses passive balancing. Simple, low-cost, no efficiency hit worth mentioning (~0.1-0.5% heat dissipation overall). Balancing current typically 50-200 mA per cell; balancing operation is most active at top of charge (when cells differ most)."
          >
            <p>Passive balancing in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">When it runs</strong> — primarily during top-of-charge (cells past ~3.4V), where V differences are most apparent for LFP&rsquo;s flat-curve chemistry</li>
              <li><strong className="text-white">How it works</strong> — BMS slave board includes a small resistor + transistor per cell; transistor switches the resistor across the cell when V exceeds the balancing threshold</li>
              <li><strong className="text-white">Current magnitude</strong> — typically 50-200 mA per cell; small fraction of charge current; energy dissipated as heat (negligible for the pack as a whole)</li>
              <li><strong className="text-white">Efficiency cost</strong> — ~0.1-0.5% pack-level overall; not a noticeable round-trip-efficiency penalty</li>
              <li><strong className="text-white">Customer-visible</strong> — modern apps may show balancing-active status; usually invisible during normal operation</li>
              <li><strong className="text-white">UK examples</strong> — GivEnergy, FoxESS, Pylontech, BYD Battery Box, Sigenergy, Huawei LUNA — all use passive balancing in their UK LFP BESS products</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Active balancing — premium / EV-style"
            plainEnglish="Active balancing shuttles charge between cells via inductors or switched capacitors — energy moves from over-V cells to under-V cells, not dissipated as heat. Higher efficiency, more complex circuitry, ~£200-500 extra per pack typically. UK domestic: rare."
            onSite="Active balancing is the premium alternative. Used in: Tesla EV packs (extreme cycling, high cost basis justifies it); some premium home BESS (Sigenergy higher-tier, certain commercial LFP); grid-scale where efficiency at scale matters. UK domestic 2025-2026: not the norm. The marginal efficiency gain (~0.3-0.5% additional efficiency, ~£10-20/year value) doesn&rsquo;t justify the extra cost at domestic scale."
          >
            <p>Active balancing in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">How it works</strong> — switched capacitor / inductor circuits transfer charge from over-V cells to under-V cells; energy preserved rather than dissipated</li>
              <li><strong className="text-white">Efficiency</strong> — pack-level ~99.5%+ overall; slight improvement over passive ~98-99%</li>
              <li><strong className="text-white">Complexity</strong> — significantly more circuit complexity; more components; higher BoM cost</li>
              <li><strong className="text-white">Customer cost impact</strong> — £200-500 extra at pack level; not material for domestic install but adds up at commercial scale</li>
              <li><strong className="text-white">When justified</strong> — EVs (extreme cycling, weight-critical, cost justifies); commercial / grid-scale BESS (efficiency at MWh scale); premium home BESS where marketing differentiation matters</li>
              <li><strong className="text-white">UK domestic 2025-2026</strong> — rare; passive is the standard and adequate for the slow drift LFP exhibits in low-stress home use</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>SoC vs SoH — two different metrics</ContentEyebrow>

          <Pullquote>SoC = how full now. SoH = how aged. Both reported by the BMS via the customer app.</Pullquote>

          <ConceptBlock
            title="SoC — State of Charge"
            plainEnglish="SoC tells you how full the battery is RIGHT NOW (0-100%). Customer&rsquo;s app shows it as a percentage or a battery-icon level. SoC is the answer to &ldquo;how much energy can I use before the battery runs out?&rdquo;"
            onSite="BMS calculates SoC by COULOMB COUNTING — integrating the current flowing in (charging adds) and out (discharging subtracts) over time. The integral is in Ah (ampere-hours); converted to % by dividing by the pack&rsquo;s rated Ah capacity. V-curve and temperature corrections fine-tune the result."
          >
            <p>SoC calculation in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Coulomb counting</strong> — primary method. BMS measures current via shunt resistor or Hall sensor; integrates over time; tracks Ah</li>
              <li><strong className="text-white">V-curve correction</strong> — at top of charge (~3.5V+ per cell) and bottom of discharge (&lt;3.0V per cell), the V curve is steeper and provides good SoC calibration; mid-range LFP&rsquo;s flat curve makes pure-V SoC unreliable</li>
              <li><strong className="text-white">Temperature compensation</strong> — usable capacity varies with T; BMS reports SoC against current T-corrected capacity, not raw Ah</li>
              <li><strong className="text-white">Self-correction at full / empty</strong> — every time the battery hits 100% charge or low-V cutoff, the BMS &ldquo;re-anchors&rdquo; the coulomb count to the known SoC point</li>
              <li><strong className="text-white">Customer-visible</strong> — most apps show SoC as % + remaining kWh + estimated runtime at current load</li>
              <li><strong className="text-white">Accuracy</strong> — typical SoC accuracy ~2-3% for modern BMS in normal operation; better after self-correction events</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="SoH — State of Health"
            plainEnglish="SoH tells you how aged the battery is — how much capacity remains compared to its original nameplate. New battery: 100%. After years of use: gradually declining. Manufacturer warranty typically guarantees &ge;70-80% SoH at the 10-year mark."
            onSite="BMS calculates SoH by tracking the actual capacity delivered per full discharge over time + measuring internal-resistance changes + applying a calendar-age model. SoH is not just &ldquo;total cycles divided by spec cycles&rdquo; — it reflects real measured ageing."
          >
            <p>SoH calculation in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Capacity tracking</strong> — every full-cycle (or near-full) discharge measures actual Ah delivered; compared to original spec; trend tracked over months</li>
              <li><strong className="text-white">Internal resistance measurement</strong> — periodic test pulses measure cell impedance; impedance rises as cells age; correlates with capacity loss</li>
              <li><strong className="text-white">Calendar-age model</strong> — BMS includes the manufacturer&rsquo;s expected calendar-degradation curve; combined with cycle-degradation from capacity measurements</li>
              <li><strong className="text-white">Typical LFP trajectory</strong> — year 1: 99-100%; year 3: ~95-97%; year 5: ~92-95%; year 10: ~75-85%; warranty endpoint ~70-80%</li>
              <li><strong className="text-white">Customer-visible</strong> — most UK BESS apps show SoH explicitly; manufacturer warranty curve as reference</li>
              <li><strong className="text-white">Commissioning baseline</strong> — cert evidence bundle records SoH at commissioning (typically 99-100%); future inspections compare against this baseline</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>BMS-PCE communication</ContentEyebrow>

          <Pullquote>BMS publishes the limits. PCE respects them. Mismatched protocols = silent failure.</Pullquote>

          <ConceptBlock
            title="BMS-PCE communication protocols"
            plainEnglish="The BMS publishes the battery&rsquo;s real-time limits (max charge current, max discharge current, V limits, fault state); the PCE (hybrid inverter or dedicated BESS inverter) respects those limits when controlling actual current flow. The two must talk via a defined protocol."
            onSite="Reg 570.5.2 requires PCE selection per battery + manufacturer instructions. The protocol match is a major part of that — without matching protocols, the PCE doesn&rsquo;t know the battery&rsquo;s limits and either runs on conservative defaults (battery under-utilised) or misbehaves (battery damaged or BMS faults)."
          >
            <p>Three main protocol families:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">CAN bus (Controller Area Network)</strong> — automotive-derived, fast (typically 250-500 kbps), robust against noise. Used widely between BMS and PCE in same vendor ecosystem (GivEnergy, Pylontech, BYD, Sigenergy). Some open-standard CAN messages exist (Pylontech CAN protocol is widely supported)</li>
              <li><strong className="text-white">Modbus RTU over RS-485</strong> — industrial standard, slower than CAN (~9.6-115.2 kbps) but flexible address maps. Common in commercial / multi-brand integrations. Some UK domestic systems use Modbus for telemetry while CAN handles real-time control</li>
              <li><strong className="text-white">Proprietary protocols</strong> — Tesla Gateway-to-Powerwall (encrypted, undocumented); Enphase IQ Gateway-to-Battery (IQ-specific). Tight integration within the brand ecosystem; locks customer into that brand for expansion</li>
              <li><strong className="text-white">Wireless / IoT</strong> — some commercial BESS use ZigBee / proprietary RF for telemetry — not common in UK domestic BMS-PCE control loop</li>
              <li><strong className="text-white">Compatibility matrix</strong> — every reputable inverter manufacturer publishes a list of supported batteries (and vice versa). The competent installer consults this list BEFORE quoting; cert evidence bundle records the verified pairing</li>
              <li><strong className="text-white">Firmware version stacks</strong> — sometimes specific firmware versions required on both sides for full compatibility; out-of-date firmware can prevent communication or trigger spurious faults</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.5.2 — PCE selection"
            clause="The type and characteristics of PCE shall be selected to be suitable for the type of battery and its application, taking account of the battery manufacturer&rsquo;s instructions. NOTE 1: PCE for stationary battery installations may be incorporated into PCE for renewable generation, for example, solar PV system inverters (sometimes termed &lsquo;bidirectional&rsquo; or &lsquo;hybrid&rsquo; inverters). NOTE 2: PCE may be used to connect batteries to AC systems (sometimes termed &lsquo;AC coupling&rsquo;) or DC systems (sometimes termed &lsquo;DC coupling&rsquo;)."
            meaning="Reg 570.5.2 anchors the PCE-battery pairing decision. The PCE must be SUITABLE — match the battery&rsquo;s V/I/T operating window, the BMS protocol, and the manufacturer&rsquo;s explicit compatibility statement. NOTE 1 explicitly recognises hybrid inverters (single PCE handling PV + battery, as covered in Module 4 Section 4). NOTE 2 explicitly recognises AC + DC coupling. In practice for UK domestic: verify BMS-PCE protocol match via the manufacturer compatibility matrix; record the verified pairing in the cert evidence bundle alongside the firmware versions on both sides."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>BMS fault modes + temperature derating</ContentEyebrow>

          <Pullquote>The BMS opens the pack contactor on fault. Most faults are recoverable; some need manufacturer support.</Pullquote>

          <ConceptBlock
            title="BMS fault modes — what triggers the pack contactor to open"
            plainEnglish="The BMS continuously monitors cell voltages, temperatures, and currents. Any reading outside the safe operating window triggers protective action — typically opening the pack contactor (disconnecting the battery from the PCE) and logging the fault."
            onSite="Modern UK BESS faults are remotely diagnosable. Manufacturer apps + cloud portals (GivEnergy Cloud, Tesla app, Sigenergy mySigen) provide fault codes, timestamps, and recommended actions. Customer + installer + manufacturer can coordinate diagnostic + resolution via the app."
          >
            <p>Common BMS fault categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Cell over-voltage</strong> — any cell exceeds the upper threshold (LFP ~3.65V cell). Pack contactor opens; usually self-resets after rebalancing</li>
              <li><strong className="text-white">Cell under-voltage</strong> — any cell falls below the lower threshold (LFP ~2.5V cell). Pack contactor opens; manual or auto-reset depending on severity</li>
              <li><strong className="text-white">Over-temperature</strong> — any cell exceeds ~60°C (LFP); pack contactor opens; cooling-down period before reset</li>
              <li><strong className="text-white">Under-temperature</strong> — any cell below ~-10°C charge limit or ~-20°C discharge limit; charging suspended (discharge may continue at reduced rate)</li>
              <li><strong className="text-white">Cell voltage imbalance</strong> — sustained cell-to-cell V delta &gt;100-150 mV; balancing can&rsquo;t keep up; suggests cell-level ageing or fault</li>
              <li><strong className="text-white">Over-current charge / discharge</strong> — current exceeds manufacturer C-rate spec; pack contactor opens; typically auto-resets after current returns to safe range</li>
              <li><strong className="text-white">Short-circuit</strong> — instantaneous over-current trip; contactor opens; manual reset + diagnostic required</li>
              <li><strong className="text-white">Communication loss</strong> — CAN bus / Modbus message timeout between BMS and PCE; pack may open or run on conservative defaults until comms restored</li>
              <li><strong className="text-white">BMS internal fault</strong> — self-test fail, firmware error, sensor failure; manufacturer support typically required</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Temperature derating — the BMS protects against lithium plating"
            plainEnglish="Charging Li-ion cells in cold temperatures (below ~0°C) risks lithium plating on the anode — irreversible chemical damage. The BMS derates charge current based on cell temperature to prevent this. Discharge is less affected but capacity is temporarily reduced."
            onSite="UK garage / unheated utility room can swing below 10°C in winter — customer sees slower charge / lower available capacity. Not a fault, just protective behaviour. PAS 63100 + manufacturer install spec require considering the install location temperature range."
          >
            <p>Typical LFP temperature derating curve:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">&gt;15°C</strong> — full charge / discharge rate. Optimal operating range</li>
              <li><strong className="text-white">10-15°C</strong> — full discharge; reduced charge (~75% of max)</li>
              <li><strong className="text-white">5-10°C</strong> — full discharge but capacity reduced ~5%; charge significantly reduced (~25-50% of max)</li>
              <li><strong className="text-white">0-5°C</strong> — discharge at ~85-90% capacity; charge minimal (~10-20% of max)</li>
              <li><strong className="text-white">&lt;0°C</strong> — discharge at ~80% capacity; charge typically suspended (lithium plating risk)</li>
              <li><strong className="text-white">High temperature (&gt;40°C)</strong> — capacity reduced; accelerated calendar degradation; BMS may derate charge to protect cells</li>
              <li><strong className="text-white">Mitigation options</strong> — install location with year-round 10°C+ minimum (utility room, indoor garage, kitchen-adjacent location); enclosure insulation; premium BESS with internal heating (rare for UK domestic)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Year-5 BESS — customer reports SoH dropping faster than expected"
            situation="Customer with 4.5-year-old 9.5 kWh GivEnergy LFP battery sees SoH at 88% via app. Manufacturer warranty curve expects ~92-94% at year 4.5. Customer concerned. Daily-cycled use, daily DoD ~70-80%."
            whatToDo="Investigation order: (1) check install location temperature history — garage exposed to sub-5°C winters accelerates degradation; (2) review usage pattern — daily 80% DoD is at the upper end (90% DoD would be much worse); (3) check BMS fault log for any cell-imbalance or transient over-current events; (4) compare to commissioning baseline SoH; (5) contact GivEnergy support — they can pull remote diagnostics. If temperature exposure confirmed root cause: discuss relocating BESS or accepting accelerated degradation; if cell-level issue: warranty claim. Reg 570.5.1(j) external influences explicitly mentions temperature; the design pack should have recorded the expected operating range. Cert evidence bundle records the diagnostic + outcome."
            whyItMatters="SoH faster-than-expected degradation is one of the most common 5-year-mark customer concerns. Most often the root cause is install location temperature (cold UK garage in winter, hot summer attic in summer). Less often it&rsquo;s a cell-level fault under warranty. The competent diagnostic separates the two; customer informed of the cause; remediation chosen + executed. Cert evidence bundle records the trajectory + the response."
          />

          <Scenario
            title="New BESS install — BMS-PCE pairing decision"
            situation="Customer wants to add a Pylontech US5000 LFP battery to an existing Solis hybrid inverter install. Question: are they compatible? What firmware versions are needed?"
            whatToDo="Verify via documented compatibility matrix: (1) Solis publishes a battery-compatibility list per inverter model + firmware version; check Pylontech US5000 against the Solis hybrid model installed; (2) Pylontech also publishes compatible-inverter list; cross-reference; (3) check both firmware versions are current — Solis hybrid + Pylontech BMS both may need recent firmware for the latest CAN bus protocol features; (4) commissioning app: install + select the correct battery profile in the Solis configuration; verify communication established + battery limits published correctly. If documented compatible: proceed; cert evidence bundle records the pairing + firmware versions. If not documented: don&rsquo;t install — Reg 570.5.2 requires PCE selected per battery manufacturer instructions."
            whyItMatters="BMS-PCE pairing is the #1 install-time technical decision. Compatible pairs work seamlessly; incompatible pairs result in: silent comms failure (battery stays disconnected); conservative-default behaviour (battery under-utilised); spurious faults (BMS trips frequently); warranty issues (manufacturer voids warranty for unsupported pairings). The competent installer verifies BEFORE quoting; cert evidence bundle records the verified pairing as part of the Reg 570.5.2 compliance."
          />

          <CommonMistake
            title="Installing a BESS in an unheated garage without temperature consideration"
            whatHappens="Installer fits a 10 kWh LFP BESS in a customer&rsquo;s detached unheated garage — convenient location, plenty of wall space, customer happy with the install. First winter: customer reports BESS &ldquo;not working properly&rdquo; in cold mornings; SoC shows full but available kWh much lower; charging slow. Customer frustrated; warranty claim filed; manufacturer reviews telemetry and confirms temperature derating per spec — not a fault. Customer disappointed they weren&rsquo;t told."
            doInstead="Per Reg 570.5.1(j) external influences + PAS 63100 install location guidance, consider the install location&rsquo;s year-round temperature range BEFORE install. UK unheated garages can hit sub-5°C in winter — predictable temperature derating. Options: (1) relocate to indoor utility room / kitchen-adjacent / heated outbuilding (best); (2) accept seasonal performance dip + inform customer up-front (acceptable for some); (3) premium BESS with internal heating (expensive, rarely justified for UK domestic). Cert evidence bundle records the install location + expected temperature range + customer-informed-decision evidence."
          />

          <CommonMistake
            title="Pairing a battery with an inverter not on the manufacturer compatibility list"
            whatHappens="Installer pairs an unsupported battery + inverter combination because the customer wanted a specific brand combination and the installer assumed CAN bus = CAN bus. Install commissioned; battery doesn&rsquo;t talk to inverter; battery sits disconnected; PCE runs on conservative defaults or trips faults. Customer&rsquo;s install doesn&rsquo;t work as expected; manufacturer support refuses warranty (out-of-spec pairing). Installer either refunds the customer or restarts with a correct pairing."
            doInstead="Always verify BMS-PCE compatibility against the published matrix BEFORE quoting. Reg 570.5.2 mandates PCE selection per battery manufacturer instructions — pairing outside documented support is non-compliant. The competent installer&rsquo;s pre-quote workflow: (1) identify the customer&rsquo;s battery preference (brand, capacity); (2) check the battery&rsquo;s supported-inverter list; (3) cross-reference with inverter&rsquo;s supported-battery list; (4) confirm firmware versions; (5) only then quote. Cert evidence bundle records the verified pairing + the documented compatibility evidence."
          />

          <CommonMistake
            title="Replacing a battery on the assumption of failure when the BMS comms had simply lost connection"
            whatHappens="Customer reports BESS &ldquo;not working&rdquo; — no app data, no telemetry. Installer schedules a callout, doesn&rsquo;t do remote diagnostic first, recommends battery replacement (~£3,000-£5,000 cost). Customer authorises replacement. After install, manufacturer support reviews logs: the original battery was fine; root cause was a CAN bus terminator resistor failing on the BMS-PCE cable. Replacement cost wasted; original battery now obsolete to the customer."
            doInstead="ALWAYS start with remote diagnostic before any battery replacement. UK BESS manufacturers (GivEnergy, Tesla, Sigenergy, FoxESS) provide remote diagnostic via their cloud portals — installer can pull fault logs, cell-level V history, comms-state telemetry. The diagnostic order: power-cycle → check wiring + connectors → check firmware + updates → check manufacturer cloud status → THEN consider physical replacement. Most &ldquo;BMS comms fault&rdquo; issues are software / firmware / wiring — not cell failure. Cert evidence bundle should record manufacturer remote-diagnostic access for this purpose."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BMS = Battery Management System. The electronic brain inside the BESS that monitors cells, balances them, calculates SoC + SoH, communicates with PCE, opens pack contactor on fault. Integrated into the battery pack; installer doesn&rsquo;t fit separately.',
              'Cell balancing necessary because cells drift over cycles (manufacturing + temperature + age). PASSIVE balancing (resistor drains over-V cells) is UK domestic standard. ACTIVE balancing (charge shuttle between cells) is premium / EV-style.',
              'SoC (State of Charge) = how full right now (0-100%). Coulomb counting + V-curve + T correction. SoH (State of Health) = capacity vs original (100% new). Capacity tracking + internal resistance + calendar model.',
              'Typical LFP SoH trajectory: year 1 99-100%; year 3 95-97%; year 5 92-95%; year 10 75-85%; manufacturer warranty &ge;70-80% at year 10.',
              'BMS-PCE communication: CAN bus (vendor ecosystem standard), Modbus RTU (industrial), proprietary (Tesla, Enphase). Verify via manufacturer compatibility matrix BEFORE install. Reg 570.5.2 mandates PCE selection per battery manufacturer instructions.',
              'Reg 570.6.1.1.1 — BESS shall conform to BS EN IEC 62485 series. Part -5 covers Li-ion stationary BMS function. Manufacturer compliance statement is the cert evidence.',
              'Temperature derating: BMS reduces charge rate below 15°C; minimal below 0°C (lithium plating risk during cold-charge). Discharge less affected but capacity reduced ~10-15% at sub-5°C. PAS 63100 install location guidance applies. UK unheated garage = predictable winter derating.',
              'BMS fault categories: cell over-V / under-V / over-T / under-T / V imbalance / over-current / short-circuit / comms loss / BMS internal. Modern OTA firmware resolves most issues remotely.',
              'Diagnostic order for BMS / battery issues: remote diagnostic via manufacturer cloud → wiring / connectors / firmware → power cycle → THEN consider hardware replacement. Most &ldquo;BMS comms&rdquo; faults are software / firmware / wiring — not cell failure.',
              'Customer-facing: modern UK BESS apps (GivEnergy, Tesla, Sigenergy, FoxESS, Huawei) expose SoC, SoH, fault log, energy throughput. BMS is essentially maintenance-free; 5-yearly inspection checks firmware + fault log + SoH curve.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BESS fundamentals & chemistry
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Chapter 57 protection deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
