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
import { EmsArchitecture } from '@/components/study-centre/diagrams/renewableGapSvg';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm10s2-eems-definition',
    question:
      'What is the Electrical Energy Management System (EEMS) recognised by BS 7671 Chapter 82?',
    options: [
      'Optional billing software',
      'The EEMS is the coordination layer of a PEI that manages: source priority (which source supplies the load when multiple are available), load priority (which loads run when generation is limited), tariff arbitrage (when to import / export / charge BESS based on ToU prices), export limiting (G100 enforcement), island-mode transitions, and demand response. Chapter 82 recognises the EEMS as part of the PEI scope.',
      'Just the inverter',
      'Just the meter',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Chapter 82 (per the Reg 826.7 contents block) includes ELECTRICAL ENERGY MANAGEMENT SYSTEM (EEMS) explicitly within scope. The EEMS is the brain of a multi-source PEI: it decides which source feeds which load at what time, given the available generation, BESS state-of-charge, EV state-of-charge, tariff schedule, weather forecast, customer preferences, and any DNO export constraint (G100). Without an EEMS, a multi-source PEI operates by default rules (BESS charges when PV surplus, discharges when load > generation) but cannot optimise across tariffs, schedule loads around generation forecasts, or enforce export limits dynamically. The EEMS is implementation: vendor (SolarEdge / Tesla / GivEnergy / Enphase / Sonnen / Solis cloud) or third-party (Home Assistant + Modbus + Sense + custom logic). BS 7671 doesn’t prescribe how to implement — it recognises the role and that an EEMS is part of the PEI cert evidence bundle.',
  },
  {
    id: 'm10s2-priority-logic',
    question:
      'Default priority logic in a UK 2025-26 domestic PV + BESS + EV PEI is typically:',
    options: [
      'Random',
      'Self-consumption first: PV → local load (house) first; PV surplus → charge BESS; PV surplus + BESS full → export to grid (paid via SEG); when PV insufficient → discharge BESS; when BESS depleted → import from grid. Adding EV: PV / BESS → EV during cheap-rate / surplus hours; switch to grid import during off-peak ToU window if economic. Customer-configurable in vendor EMS.',
      'Always export',
      'Always import',
    ],
    correctIndex: 1,
    explanation:
      'The UK 2025-26 typical priority logic in a domestic PV + BESS + (optional) EV PEI: (1) PV generation goes to local load first (self-consumption) — avoids paying import tariff (~25-30p/kWh) and the SEG export rate (~5-15p/kWh) is lower, so self-consumption is the most valuable kWh; (2) PV surplus charges the BESS — stored for evening / overnight use; (3) PV surplus + BESS full → export to grid via SEG; (4) PV insufficient → BESS discharges to cover load; (5) BESS depleted → import from grid. With ToU tariff (Octopus Agile / Go / Intelligent Octopus, EDF GoElectric, E.ON Next Drive): the EMS may override to charge BESS from grid during cheap-rate window (e.g. 00:30-04:30 at 7-15p/kWh) for later use during expensive peak hours. EV charging integrates: PV / BESS → EV during day if surplus; or grid → EV during cheap-rate window. Customer-configurable priority in the vendor EMS app. Vendor implementations: SolarEdge "Smart Energy Management", Tesla "Powerwall", GivEnergy "GivTCP / Self-Use mode", Enphase "Self-Consumption", Solis "Self-Use".',
  },
  {
    id: 'm10s2-protocols',
    question:
      'What protocols typically interconnect EMS, inverters, BESS, and EV chargers in a UK 2025-26 PEI?',
    options: [
      'Wi-Fi only',
      'Modbus RTU (RS-485) + Modbus TCP (Ethernet) for inverters / BESS; OCPP 1.6 / 2.0.1 (open standard, JSON over WebSocket) for EV chargers; SunSpec / IEC 61850 for solar industry; proprietary cloud APIs (Tesla / SolarEdge / Enphase) for vendor stack. MQTT increasingly used in third-party integrations (Home Assistant, openHAB). Multi-vendor sites = protocol mix.',
      'No protocols',
      'Only proprietary',
    ],
    correctIndex: 1,
    explanation:
      'UK 2025-26 PEI protocol landscape: (1) Modbus RTU (RS-485 serial) + Modbus TCP (Ethernet) — the industrial standard for inverter + BESS data + control; almost every solar / BESS inverter exposes Modbus registers (SolarEdge, Solis, Growatt, Huawei, Fronius). Register maps published by vendor. (2) OCPP — Open Charge Point Protocol — the EV charger standard for charger management; OCPP 1.6 widespread, OCPP 2.0.1 emerging. JSON over WebSocket. Most CPOs and EMS vendors support OCPP. (3) SunSpec — standardised Modbus register layout for solar industry; subset adopted by many inverter vendors. (4) IEC 61850 — utility-grade substation automation; rare in residential, common in commercial / industrial. (5) Proprietary cloud APIs — vendor cloud (Tesla, SolarEdge monitoring, Enphase Enlighten, GivEnergy GivTCP) with documented or undocumented APIs. (6) MQTT — lightweight pub-sub increasingly used in third-party integrations (Home Assistant, openHAB, Node-RED). Multi-vendor PEI = mix of protocols; EMS implementation cost depends heavily on which vendors are present.',
  },
  {
    id: 'm10s2-vendor-vs-third-party',
    question:
      'Difference between vendor EMS (e.g. Tesla, SolarEdge) and third-party EMS (e.g. Home Assistant, Sense):',
    options: [
      'No difference',
      'Vendor EMS: tightly integrated with that vendor’s hardware (PV inverter, BESS, app); optimised for self-consumption + simple ToU; limited support for other vendors’ equipment; included in hardware cost; setup straightforward. Third-party EMS: vendor-agnostic; supports Modbus / OCPP / MQTT across multiple manufacturers; flexibility for custom logic, ToU arbitrage, tariff-following, V2G coordination; needs integration work; not certified by BS 7671 but cert evidence bundle records what is installed.',
      'Random',
      'Both identical',
    ],
    correctIndex: 1,
    explanation:
      'Vendor EMS strengths: shipped with hardware, low setup overhead, vendor-supported, single-vendor warranty path, customer-friendly app. Weaknesses: locked into one vendor (mixing inverters between SolarEdge + Tesla means using one’s EMS as primary + losing the other’s integration depth), simpler optimisation logic (typically just self-consumption + simple ToU schedule), limited V2G + tariff arbitrage capability. Examples: SolarEdge "Smart Energy Management", Tesla "Powerwall + Powerflow", GivEnergy "GivTCP", Enphase "Solargraf / Enlighten", Sonnen "Sonnen Manager", Solis "S6 EMS". Third-party EMS strengths: vendor-agnostic, supports Modbus + OCPP + MQTT across vendors, custom logic (e.g. follow Octopus Agile half-hourly tariff + forecast → charge BESS), V2G coordination, integration with Home Assistant automations + voice assistants. Weaknesses: integration time (40-100 hours for a custom Home Assistant + Modbus setup), no single warranty path, technical homeowner / installer required. Examples: Home Assistant + custom integrations, openHAB, Node-RED, Sense (consumption monitoring + insights, lighter EMS), Emporia, Hildebrand. Cert evidence bundle records the EMS architecture + protocols + commissioning state without judging vendor vs third-party.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer has SolarEdge 5 kW inverter + SolarEdge Energy Bank BESS + Easee Charge EV charger. The vendor SolarEdge EMS does NOT natively support the Easee charger. How can the installer integrate?',
    options: [
      'Replace Easee with SolarEdge',
      'Three options: (a) accept the limitation — SolarEdge runs PV + BESS, Easee runs EV charging independently (no coordination, simple); (b) add a third-party EMS (Home Assistant or similar) on top that reads SolarEdge via Modbus TCP + controls Easee via OCPP — enables coordinated logic but needs integration work; (c) replace one component to align vendors (cost). UK 2025-26 typical: option (a) for cost-conscious / simple, option (b) for advanced users / installers offering EMS as a service.',
      'No options',
      'Cannot integrate',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-vendor PEI integration is a real UK 2025-26 challenge — customers shop on price + feature for each component separately, ending with a 3-4 vendor mix. The installer reality: (1) Accept the limitation — vendor EMS handles its own kit, EV charger runs independently. Customer loses the optimisation of "charge EV from PV surplus" if both can’t talk. Simple, no setup cost. (2) Third-party EMS overlay — Home Assistant (free, open source) with Modbus TCP integration for SolarEdge + OCPP integration for Easee. Custom automations: "if PV generation > 3 kW for 5 minutes AND EV plugged in AND BESS > 80% then start EV charge at 3 kW; if PV drops below 2 kW, pause EV charge". Setup time 20-40 hours, installer fee £1-3k. Increasingly offered as installer add-on service. (3) Vendor alignment — replace Easee with SolarEdge EV charger (if available) or replace SolarEdge with Tesla full stack. Cost-prohibitive for retrofits. Cert evidence: EMS architecture document recording vendors + protocols + integration approach + commissioning behaviour.',
  },
  {
    question:
      'What does OCPP (Open Charge Point Protocol) provide that a closed proprietary EV charger protocol does not?',
    options: [
      'Nothing different',
      'OCPP is a vendor-neutral open standard for EV charger management. Any OCPP-compliant charger can be managed by any OCPP-compliant backend (CPO platform, EMS, billing system). Enables charger vendor swap without backend re-integration, multi-vendor fleets on one platform, third-party EMS coordination. UK 2025-26: OCPP 1.6J widespread; OCPP 2.0.1 (Smart Charging Profile, ISO 15118 V2G) emerging.',
      'Random',
      'Less compatible',
    ],
    correctAnswer: 1,
    explanation:
      'OCPP is the IEC / IEA / OCA-managed open standard for EV charger ↔ backend communication. Why it matters: (1) Vendor independence — charger vendor (Easee, Zappi, Wallbox, ABB, EO, Pod Point) and backend platform (Octopus / Ohme / fleet management / custom EMS) can be mixed without lock-in. (2) Multi-vendor fleet management — a workplace installs 12 EV chargers from 3 different vendors; one OCPP platform manages all of them: scheduling, load balancing, billing, fault reporting. (3) Smart charging — OCPP 1.6 Smart Charging Profile + OCPP 2.0.1 expanded smart charging + ISO 15118 V2G Plug-and-Charge — enables EMS to send dynamic charging schedules to the charger based on tariff / generation / load. (4) Future-proofing — customer replaces charger in year 7; new charger drops in to existing OCPP backend. UK 2025-26 reality: virtually all CPO-operated public chargers run OCPP; most residential chargers also OCPP-capable (often dual-mode — vendor cloud OR self-hosted OCPP). Cert evidence: charger product DoC noting OCPP version + commissioning record of backend connection.',
  },
  {
    question:
      'EMS Common pattern: use cheap-rate Octopus Go / Agile to charge BESS at 7p/kWh between 00:30-04:30, then discharge during 16:00-19:00 peak at 30p/kWh import equivalent. How is this configured?',
    options: [
      'Manually each day',
      'Configured ONCE in the EMS as a recurring schedule. Vendor EMS (Tesla "Time-based Control", SolarEdge "Time-of-Use", GivEnergy "Eco" / "Timed Charge", Solis "Time-of-Use") all support tariff-window scheduling. For dynamic tariffs (Octopus Agile, half-hourly varying), third-party EMS (Home Assistant + Octopus integration) follows the published next-day prices + charges during the cheapest half-hours. The EMS handles inverter + BESS state automatically.',
      'No way to configure',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'BESS tariff arbitrage = the dominant UK 2025-26 economic case for retrofit BESS (paired with PV or standalone). Implementation: (1) Vendor EMS — every major vendor supports ToU scheduling. Tesla "Time-Based Control" sets peak / off-peak / shoulder windows + charge / discharge behaviour per window. SolarEdge "Time of Use" same concept. GivEnergy has dedicated "Eco" / "Timed Charge" / "Timed Discharge" + ability to follow Agile via the GivTCP / OpenAPI route. Solis S6 "Time of Use Mode". (2) Static tariffs (Octopus Go: 00:30-04:30 at 7-9p/kWh) — fixed schedule, set once in EMS app, EMS handles state. (3) Dynamic tariffs (Octopus Agile: 48 half-hourly prices per day, published next day) — vendor EMS rarely supports natively; third-party (Home Assistant + ha-agile + automations) pulls next-day prices via Octopus API + schedules BESS to charge during cheapest 4 half-hours. Increasingly common: PredBat (open source) for BESS arbitrage + solar forecast. Economics: 10 kWh BESS × £0.23/kWh arbitrage × 300 cycles/year = £690/yr saved — typical payback 7-10 years. Cert evidence: EMS schedule configuration record + customer handover acknowledging operating mode.',
  },
  {
    question:
      'Is the EMS itself in scope of BS 7671 verification?',
    options: [
      'Yes, electrical safety only',
      'The EMS’s ELECTRICAL elements (its power supply, communications wiring, any DIN-rail controller) are in scope of BS 7671 — Reg 411 / 415 / 530 series for the supply circuit + Reg 528 segregation if low-voltage signal cabling near LV power. The EMS’s SOFTWARE / LOGIC is NOT BS 7671 scope — functional safety / cybersecurity / data protection are separate domains. Cert evidence records the electrical install side + the EMS commissioning behaviour but the software validation sits outside BS 7671.',
      'Not in scope',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'EMS scope boundary in BS 7671: (1) IN SCOPE — EMS controller power supply (typically 5 V / 12 V / 24 V DC fed from a Class II PSU on a 3 A MCB-protected circuit; Reg 411 ADS + Reg 415 30 mA RCD apply), communication wiring (Modbus RS-485, Ethernet, OCPP-over-Ethernet — Reg 528 segregation from LV power where parallel + Reg 444 EMC considerations), DIN-rail enclosure if controller mounted (Reg 132.7 + Reg 511 + enclosure protection), any contactor / relay output driving load shedding (sized + protected per Chapter 43). (2) NOT IN SCOPE OF BS 7671 — EMS software / firmware / cloud platform / mobile app / cybersecurity / data privacy (GDPR) / functional safety of the energy logic. These are governed by: BS EN IEC 62443 (cyber for industrial control), GDPR for personal energy data, the customer’s contract with the vendor or installer. Reg 132.16 functional safety mentioned generally but not detailed. Cert evidence bundle records what BS 7671 verifies + notes the boundary with software / cyber / data scope.',
  },
  {
    question:
      'What is "load shedding" in an EMS context and when is it needed?',
    options: [
      'Random',
      'Load shedding = the EMS automatically disconnects non-essential loads when total demand exceeds available supply. Needed when: (a) island mode and local generation < load (BESS draining too fast); (b) DNO supply available but at capped capacity (e.g. behind a smart-meter ANM connection); (c) site has limited service capacity and EV + heat pump + cooking peak together would exceed it. Implemented via EMS-controlled contactors / smart relays on non-essential circuits.',
      'Always shed all',
      'No purpose',
    ],
    correctAnswer: 1,
    explanation:
      'Load shedding is the EMS technique of intentionally disconnecting non-essential loads when total demand would otherwise exceed available supply. UK 2025-26 use cases: (1) Island mode load shedding — PEI in island mode, BESS at 30% SoC, load > generation. EMS sheds: EV charging first (delays not catastrophic), then heat pump (or runs at reduced setpoint), then non-essential lighting. Critical loads (fridge, freezer, lighting circuit, communication) protected. Implementation: EMS-controlled contactor / smart relay on non-essential circuits. (2) DNO capacity-constrained connections — a connection limited to e.g. 60 A single-phase (DNO ANM — Active Network Management) requires the EMS to prevent total load + import exceeding the cap. EV charger + heat pump + cooking simultaneously could exceed; EMS pauses EV charge. (3) Light commercial peak shaving — BESS discharges during peak to avoid breaching a capacity limit; EMS load-sheds backup if BESS depleted. Hardware: smart relays (Shelly, Sonoff Pro, vendor-specific), DIN-rail contactors with EMS digital output control, Modbus-controlled circuit isolators. Reg 511 + Reg 530 + Reg 132 / Reg 311.1 max demand reconciliation. Cert evidence: load-shedding logic documented + priority sequence + commissioning test.',
  },
  {
    question:
      'How does Reg 311.1 (max demand) interact with EMS-managed PEI?',
    options: [
      'No interaction',
      'Reg 311.1 max demand assumes a deterministic load profile. EMS-managed PEI changes that: actual import from DNO can be SHIFTED in time (BESS discharges during peak) or REDUCED (load shedding prevents simultaneous loads). The DNO service capacity must still cover the worst case where EMS / BESS fails (degraded mode = unmanaged); but EMS-managed normal operation allows a smaller effective import than the unmanaged sum-of-loads would suggest. Documented in PEI design.',
      'EMS supersedes Reg 311.1',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 311.1 max demand assessment historically assumes a deterministic-but-pessimistic load profile (sum of loads × diversity factor). EMS-managed PEI introduces nuance: (1) Worst-case max demand — if EMS / BESS fails (degraded mode = unmanaged), the installation reverts to the sum-of-loads-with-diversity. DNO service capacity must cover this case. Reg 311.1 max demand assessment remains the basis. (2) Managed max demand — EMS-controlled scheduling + BESS discharge actively prevents simultaneous peak. Effective import from DNO is lower than worst-case. Used for cost optimisation (avoiding the cost of a service upgrade) but NOT as the basis of Reg 311.1 cable sizing. (3) ANM connections — some DNOs offer capped-capacity connections (e.g. 80 A instead of 100 A) where the customer’s EMS guarantees they won’t exceed; cheaper connection, with EMS as the constraint. The DNO ANM agreement codifies this; Reg 311.1 still references the cap. (4) Documentation — PEI design records: (a) the Reg 311.1 worst-case demand (cable + service basis); (b) the EMS-managed expected demand; (c) the degraded-mode behaviour (what happens if EMS fails). Cert evidence: both unmanaged max demand AND EMS-managed scheduling captured + DNO connection agreement referenced.',
  },
];

const faqs = [
  {
    question: 'Does BS 7671 mandate an EMS for multi-source PEI?',
    answer:
      'No — BS 7671 recognises the EEMS (Reg 826 contents) but does not mandate one. A multi-source PEI can run without an EMS using default rules (PV self-consume → BESS charge → export; PV deficit → BESS discharge → grid import). The EMS adds optimisation (ToU arbitrage, load coordination, export limiting). UK 2025-26 reality: almost every PV + BESS install ships with the vendor EMS — the question is whether to use vendor EMS only or add third-party overlay for advanced logic.',
  },
  {
    question: 'Can third-party EMS (Home Assistant) be the only EMS, with no vendor EMS?',
    answer:
      'Technically yes — Home Assistant + Modbus + OCPP can fully manage a PEI without using the vendor app. Practically the vendor EMS usually remains active for warranty + diagnostics + firmware updates, with Home Assistant as the orchestrating layer that issues setpoints via Modbus. Hybrid setups are typical: vendor app for customer-facing simple control, third-party EMS for advanced automation. The cert evidence records both layers.',
  },
  {
    question: 'How is EMS reliability handled — what if the EMS fails?',
    answer:
      'A well-designed PEI must operate safely + functionally in DEGRADED mode (EMS offline). Default rules take over: inverter self-consumption, BESS default behaviour (charge from PV, discharge to load), grid-following operation, anti-islanding still works (Reg 551.7.5). The EMS adds optimisation but its absence should not create safety hazard. Cert evidence: degraded-mode behaviour documented + tested at commissioning (e.g. unplug EMS controller and verify PEI continues safe + functional operation, just less optimised).',
  },
  {
    question: 'What cybersecurity considerations apply to EMS?',
    answer:
      'Outside strict BS 7671 scope but increasingly important. UK 2025-26 EMS / inverter cybersecurity considerations: cloud account credentials (vendor app), local network exposure (Modbus TCP / Ethernet — should NOT be exposed to internet; segmented VLAN ideal), firmware updates (vendor responsibility, customer enablement), OCPP backend security (TLS, certificate-based auth in OCPP 2.0.1). BS EN IEC 62443 industrial cybersecurity is the relevant framework. PSTI Act 2022 applies to consumer-connectable EMS hardware in UK. Cert evidence: EMS architecture diagram + network segmentation note in handover pack.',
  },
  {
    question: 'How does the EMS interact with DNO Active Network Management (ANM)?',
    answer:
      'ANM = DNO capability to dynamically constrain customer import / export based on network conditions. UK 2025-26: increasingly offered by DNOs (UKPN, SSEN, NGED) as a faster, cheaper alternative to firm-capacity connection. ANM-compatible EMS receives a setpoint from the DNO (typically via REST API or signalling) and enforces it via inverter / BESS / load control. The EMS therefore becomes a real-time party to the DNO’s network management. ANM contract documents the protocol + the customer’s obligation. Cert evidence: ANM agreement + EMS commissioning record confirming setpoint enforcement.',
  },
];

export default function RenewableEnergyModule10Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'Energy Management Systems (EMS) for multi-source PEI | Renewable Energy 10.2 | Elec-Mate',
    description:
      'EMS / EEMS coordination for multi-source PEI — priority logic, Modbus + OCPP protocols, vendor (SolarEdge / Tesla / GivEnergy) vs third-party (Home Assistant) EMS. Tariff arbitrage, load shedding, ANM. BS 7671 Chapter 82 EEMS recognition. Cert evidence bundle for EMS commissioning.',
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
            eyebrow="Module 10 · Section 2 · BS 7671:2018+A4:2026 · Chapter 82 EEMS"
            title="Energy Management Systems (EMS) — multi-source coordination"
            description="The coordination layer of a multi-source PEI. BS 7671 Chapter 82 recognises the EEMS (Electrical Energy Management System) as part of PEI scope. Priority logic across sources + loads. Modbus, OCPP, MQTT protocols. Vendor EMS (SolarEdge / Tesla / GivEnergy / Enphase / Sonnen) vs third-party (Home Assistant / openHAB / Node-RED). Tariff arbitrage, load shedding, DNO ANM."
            tone="yellow"
          />

          <TLDR
            points={[
              'EEMS = Electrical Energy Management System — the coordination layer of a multi-source PEI. BS 7671 Chapter 82 recognises EEMS in scope (Reg 826.7 contents).',
              'Default priority logic in domestic PV + BESS + (EV) PEI: PV → local load self-consumption first → BESS charge → SEG export; load deficit → BESS discharge → grid import.',
              'ToU tariff arbitrage: charge BESS during cheap-rate window (Octopus Go 00:30-04:30 at 7-9p/kWh) and discharge during peak (16:00-19:00 at ≈30p/kWh). Vendor EMS supports static schedules; third-party EMS supports dynamic (Agile) tariffs.',
              'Protocols: Modbus RTU + Modbus TCP for inverters / BESS; OCPP 1.6 / 2.0.1 for EV chargers; MQTT for third-party integrations; vendor cloud APIs for tightly-integrated stacks.',
              'Vendor EMS (SolarEdge, Tesla, GivEnergy, Enphase, Sonnen, Solis): tight integration with vendor hardware, simple setup, limited cross-vendor support. Third-party EMS (Home Assistant, openHAB): vendor-agnostic, custom logic, integration effort.',
              'EMS electrical installation IS in BS 7671 scope (PSU + comms wiring + DIN-rail enclosure); EMS software / logic / cyber is NOT (separate domains — BS EN IEC 62443, GDPR, vendor contract).',
              'Load shedding = EMS-controlled disconnection of non-essential loads when supply < demand. Use cases: island mode, ANM capacity-cap, light commercial peak shaving.',
              'Reg 311.1 max demand assessment still on the unmanaged worst case; ANM connections cap at lower capacity with EMS as the enforcement constraint.',
              'Cert evidence bundle: EMS architecture diagram + vendor / protocol list + commissioning behaviour + degraded-mode (EMS-off) test result + customer handover acknowledgement.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define EEMS scope per BS 7671 Chapter 82 (Reg 826.7 contents).',
              'Apply the standard UK 2025-26 priority logic for domestic PV + BESS + EV PEI.',
              'Distinguish Modbus RTU / Modbus TCP / OCPP / MQTT and which protocols connect which equipment.',
              'Compare vendor EMS vs third-party EMS — strengths, weaknesses, when each fits.',
              'Identify the BS 7671 scope boundary: EMS electrical install in scope, EMS software / cyber out of scope.',
              'Apply ToU tariff arbitrage scheduling — static (Octopus Go) vs dynamic (Octopus Agile).',
              'Apply load shedding logic for island mode, ANM-capped, or peak-shaving sites.',
              'Reconcile EMS-managed expected demand with Reg 311.1 max-demand worst case.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The EMS isn’t a magic optimisation black box. It’s a deterministic priority engine plus a tariff schedule plus a comms stack. Understand the priority logic + the protocols + the degraded-mode behaviour, and the EMS becomes designable + commissionable + handover-ready.
          </Pullquote>

          <ContentEyebrow>What an EEMS is + the BS 7671 Chapter 82 recognition</ContentEyebrow>

          <ConceptBlock
            title="EEMS — Electrical Energy Management System"
            plainEnglish="The EEMS is the coordination layer of a multi-source PEI. It reads the current state (PV generation, BESS state-of-charge, load demand, tariff, weather forecast) and decides: which source supplies the load right now, what to do with surplus generation, when to charge / discharge BESS, when to charge the EV, whether to enforce an export limit. BS 7671 Chapter 82 recognises the EEMS as part of PEI scope (Reg 826.7 contents)."
            onSite="UK 2025-26 reality: every PV + BESS install ships with the vendor EMS app (SolarEdge / Tesla / GivEnergy / Enphase / Sonnen / Solis cloud + mobile app). For customers who want simple self-consumption + ToU scheduling, the vendor EMS is sufficient. For advanced optimisation — Agile half-hourly tariffs, V2G coordination, multi-vendor integration — third-party EMS (Home Assistant / openHAB / Node-RED / PredBat) layers on top."
          >
            <p>EEMS scope across a UK 2025-26 PEI:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Source priority</strong>
                — which source supplies the local load right now. Default:
                PV → BESS → grid (self-consumption optimised)
              </li>
              <li>
                <strong className="text-white">Load priority</strong> —
                if supply limited (island, capped connection), which loads run.
                Default: critical (fridge, lighting, comms) first; non-critical
                (EV, heat pump, immersion) deferred
              </li>
              <li>
                <strong className="text-white">Surplus management</strong>
                — PV surplus options: charge BESS first; export via SEG;
                divert to immersion heater (Eddi / iBoost — M4); charge EV; run
                heat pump
              </li>
              <li>
                <strong className="text-white">Tariff arbitrage</strong>
                — ToU schedule (charge BESS off-peak / discharge peak); dynamic
                tariff (follow Agile half-hourly prices)
              </li>
              <li>
                <strong className="text-white">Export limiting</strong>
                — G100-compliant soft limiting (curtail inverter / divert to
                BESS / divert to immersion before hitting hard limit). Covered in
                §10.4
              </li>
              <li>
                <strong className="text-white">Island-mode coordination</strong>
                — EMS triggers grid-forming inverter mode + load shedding when
                DNO supply lost. Covered in §10.6
              </li>
              <li>
                <strong className="text-white">Demand response</strong>
                — emerging UK 2025-26 markets (National Grid ESO Demand
                Flexibility Service via Octopus Saving Sessions). EMS pre-warms /
                pre-cools or releases BESS during demand events
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — EMS architecture diagram + vendor /
                protocol list + commissioning configuration + degraded-mode test +
                customer handover acknowledgement
              </li>
            </ul>
          </ConceptBlock>

          <EmsArchitecture caption="An EMS coordinates PV, battery, EV, heat pump, grid and loads — deciding where every kWh goes." />

          <ConceptBlock
            title="UK 2025-26 vendor EMS landscape"
            plainEnglish="Each PV / BESS vendor ships an EMS as part of their hardware stack. The EMS app is the customer-facing layer; the back-end logic runs on the inverter / BESS controller + vendor cloud. Vendor EMS is tightly integrated with that vendor’s kit and offers good default behaviour with limited cross-vendor support."
            onSite="Pricing typically included in the hardware cost. Customer app provides monitoring + scheduling + tariff-window configuration. Cross-vendor integration is the limitation: SolarEdge EMS doesn’t natively control a Tesla Powerwall. Multi-vendor sites need third-party EMS layer or accept reduced coordination."
          >
            <p>Major UK 2025-26 vendor EMS implementations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">SolarEdge Smart Energy
                  Management</strong> — covers PV + Energy Bank BESS + StorEdge +
                EV charger (SolarEdge V3). Modbus exposed for third-party. App: SolarEdge
                monitoring portal
              </li>
              <li>
                <strong className="text-white">Tesla Powerwall +
                  Powerflow</strong> — Powerwall 2 / 3 + Backup Gateway 2.
                Time-Based Control for ToU. Self-Powered / Time-Based / Backup-Only
                modes. App: Tesla mobile
              </li>
              <li>
                <strong className="text-white">GivEnergy</strong> —
                hybrid inverters + AC-coupled BESS. Eco / Timed Charge / Timed
                Discharge modes. GivTCP open-source library exposes Modbus for Home
                Assistant integration. App: GivEnergy mobile
              </li>
              <li>
                <strong className="text-white">Enphase Enlighten</strong>
                — IQ8 microinverters + IQ Battery 5P. Self-Consumption / Time of
                Use / Full Backup modes. IQ Gateway for control. App: Enphase mobile
              </li>
              <li>
                <strong className="text-white">Sonnen</strong> —
                Sonnen Eco / sonnenBatterie. Sonnen Manager EMS. Strong on community-
                grid services (Sonnen Community DE; limited UK presence)
              </li>
              <li>
                <strong className="text-white">Solis</strong> — S6
                hybrid inverters. Time of Use Mode. Open Modbus exposure. SolisCloud
                monitoring + app
              </li>
              <li>
                <strong className="text-white">Huawei FusionSolar</strong>
                — SUN2000 + LUNA2000 BESS. FusionSolar app + cloud. UK reseller
                channels. Modbus exposed
              </li>
              <li>
                <strong className="text-white">myenergi</strong> —
                Zappi EV charger + Eddi immersion diverter + Libbi BESS. Designed for
                integrated UK 2025-26 PEI ecosystem. App: myenergi mobile. Open API
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.7 (Chapter 82 contents) — EEMS recognition"
            clause="ELECTRICAL ENERGY MANAGEMENT SYSTEM (EEMS) — General; Architecture of EEMS. Listed within the scope of Chapter 82 alongside Safety, Interaction with the public network, Energy storage, Design for flexibility of load and generators (demand/response), Electric vehicle charging, Selectivity between [protective devices]."
            meaning="BS 7671 Chapter 82 explicitly includes the EEMS as part of PEI scope. This is the categorical recognition that an Energy Management System is part of a modern multi-source installation — not optional infrastructure but expected coordination layer. The chapter doesn’t prescribe the EMS implementation (vendor, protocol, software) but recognises its role + integrates it into the PEI design + evidence framework. Practical consequence: cert evidence bundle for a multi-source PEI must address the EMS — architecture diagram, vendor / protocol identification, commissioning configuration, customer handover documentation. The EMS’s electrical install is in BS 7671 scope (Reg 411 / 415 / 530 series for the controller PSU + comms wiring); the EMS software / functional safety / cybersecurity sits outside BS 7671 in adjacent frameworks (BS EN IEC 62443, GDPR, PSTI Act 2022)."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Protocols + multi-vendor integration</ContentEyebrow>

          <Pullquote>
            Multi-vendor PEI is the UK 2025-26 default. Customers buy PV from one company, BESS from another, EV charger from a third. The integration challenge is real — and the EMS protocol stack (Modbus + OCPP + MQTT) is how it gets solved.
          </Pullquote>

          <ConceptBlock
            title="Modbus RTU + Modbus TCP — the inverter / BESS protocol"
            plainEnglish="Modbus is the industrial-standard protocol that almost every solar / BESS inverter exposes for monitoring + control. Modbus RTU runs over RS-485 serial cabling; Modbus TCP runs over Ethernet (TCP/IP). The protocol is a register-map: the EMS reads register addresses (PV power, BESS SoC, etc.) and writes to control registers (set charge / discharge power, set mode). Each vendor publishes its register map."
            onSite="UK 2025-26 inverters typically expose both: Modbus RTU on RS-485 terminals for direct local connection + Modbus TCP via Ethernet for network-based EMS integration. Third-party EMS (Home Assistant) integrations read + write Modbus to coordinate across vendors. SunSpec is a standardised subset of Modbus registers — cross-vendor compatible for basic data."
          >
            <p>Modbus integration patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Modbus RTU</strong> —
                RS-485 serial cabling (CAT5e or shielded twisted pair). Multi-drop
                bus, up to 32 devices, distance up to 1.2 km. Baud rate typically
                9600-19200. Used for direct EMS ↔ inverter local
              </li>
              <li>
                <strong className="text-white">Modbus TCP</strong> —
                Modbus framing over Ethernet TCP/IP. LAN-based, no distance limit
                within network. Used for network-based EMS ↔ inverter via switch
                / router
              </li>
              <li>
                <strong className="text-white">Register map</strong>
                — each vendor publishes its register addresses. E.g. SolarEdge
                Modbus map: register 40083 = PV instantaneous power, register 40258
                = battery instantaneous power, register 40294 = StorEdge control mode
              </li>
              <li>
                <strong className="text-white">SunSpec</strong> —
                standardised Modbus register layout for solar industry. Subset
                covering common data points (PV power, voltage, current, energy).
                Cross-vendor portability for basic monitoring
              </li>
              <li>
                <strong className="text-white">Wiring</strong> — Reg
                528 segregation: Modbus RTU is signal cabling, segregate from LV
                power per Reg 528.1. Modbus TCP runs on Ethernet — standard
                structured cabling rules
              </li>
              <li>
                <strong className="text-white">Security</strong> —
                Modbus has NO native authentication / encryption. UK 2025-26 best
                practice: keep Modbus TCP on segmented VLAN, not exposed to internet
              </li>
              <li>
                <strong className="text-white">Home Assistant
                  integration</strong> — popular UK 2025-26 third-party EMS
                approach: install Home Assistant + vendor-specific Modbus
                integration (HACS), read inverter + BESS state via Modbus, write
                control setpoints, build automations
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — Modbus wiring schematic + protocol +
                register map reference + commissioning test (verify EMS reads + writes
                correct registers)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="OCPP — Open Charge Point Protocol for EV chargers"
            plainEnglish="OCPP is the vendor-neutral open standard for EV charger ↔ backend communication. Any OCPP-compliant charger can be managed by any OCPP-compliant backend (CPO platform, EMS, billing system). UK 2025-26: OCPP 1.6J widespread; OCPP 2.0.1 (smart charging profile, ISO 15118 V2G plug-and-charge) emerging."
            onSite="OCPP enables multi-vendor EV charger fleets on one EMS platform. Workplace with 12 chargers from 3 vendors managed by one OCPP backend (Octopus Electroverse, Monta, AMPECO, custom EMS). Smart charging via OCPP 1.6 Smart Charging Profile + OCPP 2.0.1 dynamic schedules. UK 2025-26 reality: virtually all CPO public chargers run OCPP; most residential chargers OCPP-capable + dual-mode (vendor cloud OR self-hosted OCPP)."
          >
            <p>OCPP in UK 2025-26 EV charger ecosystem:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">OCPP 1.6J</strong> —
                JSON over WebSocket. Most UK 2025-26 commercial + many residential
                chargers. Smart Charging Profile available (TxProfile,
                TxDefaultProfile)
              </li>
              <li>
                <strong className="text-white">OCPP 2.0.1</strong> —
                expanded smart charging, ISO 15118 Plug-and-Charge integration,
                better security, device management. Emerging UK 2025-26
              </li>
              <li>
                <strong className="text-white">Charger vendor
                  examples</strong> — Easee, Wallbox, Pod Point, Zappi (myenergi),
                EO, Andersen, Ohme, ABB Terra, Schneider EVlink, Project EV
              </li>
              <li>
                <strong className="text-white">Backend platforms</strong>
                — Octopus Electroverse, Monta, AMPECO, Driivz, Has-to-be,
                ChargePoint, custom EMS (Home Assistant + OCPP integration)
              </li>
              <li>
                <strong className="text-white">Smart charging</strong>
                — OCPP commands the charger to follow a charging profile
                (current limit varying over time). EMS computes profile based on
                tariff + PV + BESS state, pushes to charger via OCPP
              </li>
              <li>
                <strong className="text-white">Authentication</strong>
                — OCPP 1.6 supports HTTP Basic Auth + TLS; OCPP 2.0.1 adds
                certificate-based mutual TLS. Cybersecurity considerations apply
              </li>
              <li>
                <strong className="text-white">V2G via OCPP 2.0.1 + ISO
                  15118-20</strong> — bidirectional charging session
                negotiation. UK 2025-26: limited V2G hardware deployment but
                protocol stack ready. Covered in §10.5
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — charger DoC noting OCPP version +
                commissioning record of backend connection + EMS integration
                verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.4 — Protection against transient overvoltages on PEI"
            clause="Switching overvoltages in a PEI may be more frequent and perhaps greater than in a non PEI installation (for example, due to the switching between sources, load shedding, load shifting). Consideration is to be given to the installation of surge protective devices for the protection of the PEI installation and equipment against switching overvoltages."
            meaning="Reg 826.1.4 explicitly recognises that PEI installations — with EMS-driven source switching, mode transitions, and load shifting / shedding events — experience more frequent switching transients than non-PEI installations. The implication for SPD specification: a standard non-PEI domestic installation might use a Type 2 SPD at the consumer unit; a PEI may justify uplifting to a Type 1+2 combined SPD or supplementing with point-of-use Type 2/3 SPDs on sensitive equipment. The EMS itself + the inverter electronics + the BESS controllers are sensitive to surge events; their loss is expensive (£1-5k per device replacement). UK 2025-26 best practice: SPD specification reviewed alongside the EMS architecture; cert evidence bundle records SPD type + location + the rationale per Reg 826.1.4."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Tariff arbitrage, load shedding, ANM</ContentEyebrow>

          <ConceptBlock
            title="Tariff arbitrage via ToU + dynamic pricing"
            plainEnglish="The dominant UK 2025-26 economic case for retrofit BESS: charge during cheap-rate window, discharge during peak. Static ToU tariffs (Octopus Go: 00:30-04:30 at 7-9p/kWh, off-peak the rest) configure with a fixed schedule in the vendor EMS. Dynamic tariffs (Octopus Agile: 48 half-hourly prices per day) need third-party EMS (Home Assistant + Octopus integration) to follow the published next-day prices."
            onSite="Customer-facing economics: 10 kWh BESS × £0.23/kWh arbitrage spread × ~300 cycles/year = £690/year saved. Payback 7-10 years on BESS alone. With PV, payback compresses. UK 2025-26 reality: 80%+ of BESS retrofits run static ToU; 20% (technical homeowners + advanced installers) run Agile with third-party EMS. Octopus Saving Sessions add seasonal demand-response revenue £50-200/year."
          >
            <p>Tariff arbitrage configuration patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Static ToU — Octopus
                  Go</strong> — 00:30-04:30 at 7-9p/kWh, peak 25-30p/kWh. Vendor
                EMS configured: charge BESS 00:30-04:30 to 100% → self-consume
                during day → discharge during 16:00-19:00 peak
              </li>
              <li>
                <strong className="text-white">Static ToU —
                  Intelligent Octopus Go</strong> — cheap-rate window
                dynamically allocated by Octopus based on grid conditions; EV +
                BESS opt in. Vendor / Octopus app coordination
              </li>
              <li>
                <strong className="text-white">Dynamic — Octopus
                  Agile</strong> — 48 half-hourly prices per day, published
                next day at ≈16:00. EMS pulls API + schedules BESS charge
                during cheapest half-hours + discharge during expensive. Third-party
                EMS typically (Home Assistant + ha-agile)
              </li>
              <li>
                <strong className="text-white">PredBat</strong> —
                open-source UK BESS arbitrage tool. Forecast solar + load + Agile
                prices → optimal BESS schedule. Home Assistant add-on
              </li>
              <li>
                <strong className="text-white">Vendor support</strong>
                — Tesla Time-Based Control / SolarEdge Time of Use /
                GivEnergy Eco + Timed Charge / Solis ToU Mode: static schedules.
                Few vendors support Agile natively; GivEnergy via GivTCP / OpenAPI
                + third-party tooling
              </li>
              <li>
                <strong className="text-white">Octopus Saving
                  Sessions</strong> — demand response payments per kWh
                reduced during specified evening events (typical Nov-Mar). EMS
                pre-charges BESS + reduces import during event window
              </li>
              <li>
                <strong className="text-white">Economics</strong> — 10 kWh
                BESS × £0.20-0.23 arbitrage spread × 300 cycles =
                £600-690/year base; +£100-200 from Saving Sessions; +PV
                self-consumption synergy. Payback typically 7-10 years for BESS
                alone in UK 2025-26
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — ToU schedule configuration record +
                customer handover acknowledging operating mode + degraded-mode
                (no EMS) test result
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Load shedding + Reg 311.1 interaction"
            plainEnglish="Load shedding = EMS-controlled disconnection of non-essential loads when total demand would exceed available supply. Used for island mode (BESS draining too fast), DNO capacity-capped (ANM) connections, and light-commercial peak shaving. The Reg 311.1 max demand assessment still covers the unmanaged worst-case for cable + service sizing; EMS load shedding manages the operational reality."
            onSite="UK 2025-26 load shedding hardware: smart relays (Shelly Pro, Sonoff Pro, vendor-specific) on non-essential circuits, controlled by EMS digital output. Priority sequence documented at install. Critical loads (fridge, freezer, lighting, comms) protected; non-critical (EV charging, immersion heater, heat pump optionally) shed first. ANM connection: DNO sets cap (e.g. 80 A single-phase); EMS enforces."
          >
            <p>Load shedding use cases + implementation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Island mode load
                  shedding</strong> — PEI in island, BESS SoC dropping faster
                than expected. EMS sheds EV charge → heat pump →
                non-essential lighting in priority order. Critical loads protected
              </li>
              <li>
                <strong className="text-white">ANM-capped
                  connections</strong> — DNO offers cheaper / faster connection
                at lower capacity (e.g. 80 A instead of 100 A) with EMS as
                enforcement constraint. Customer signs ANM contract. EMS prevents
                total import + load exceeding cap
              </li>
              <li>
                <strong className="text-white">Peak shaving (light
                  commercial)</strong> — capacity charges + DUoS Red Band
                avoidance. EMS uses BESS + load shedding to stay below specified
                threshold during peak window
              </li>
              <li>
                <strong className="text-white">Priority sequence</strong>
                — documented per install. Typical: shed EV → heat pump
                → immersion heater → non-critical lighting →
                non-essential socket circuits → (preserve) critical sockets +
                fridge + freezer + comms
              </li>
              <li>
                <strong className="text-white">Hardware</strong> —
                EMS digital output → smart relay (Shelly, Sonoff) or DIN-rail
                contactor on circuit being shed. Reg 511 + Reg 530 + Reg 132 + Reg
                311.1 max demand reconciliation
              </li>
              <li>
                <strong className="text-white">Reg 311.1
                  reconciliation</strong> — cable + service sized for
                UNMANAGED worst-case max demand (what happens if EMS fails). EMS
                load shedding optimises normal operation but does NOT change Reg
                311.1 basis. ANM connections are a documented exception with
                DNO contract
              </li>
              <li>
                <strong className="text-white">Degraded mode</strong>
                — if EMS fails, default behaviour: smart relays open (fail-safe
                load disconnected) OR closed (fail-safe load connected). Design
                choice; documented + tested at commissioning
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — load-shedding logic diagram + priority
                sequence + hardware list + Reg 311.1 max demand calculation (both
                managed + unmanaged) + commissioning test + ANM agreement if
                applicable
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Domestic PV + BESS + EV — Octopus Agile + Home Assistant + PredBat"
            situation="Customer with 5 kWp SolarEdge PV + 10 kWh SolarEdge Energy Bank BESS + Easee Charge EV charger. Standard SolarEdge EMS handles PV + BESS; Easee runs on its own cloud + app. Customer subscribes to Octopus Agile (dynamic half-hourly tariff) and wants the BESS to charge during cheapest 4 half-hours overnight + discharge during peak."
            whatToDo="SolarEdge native EMS supports static ToU but NOT dynamic Agile prices. Solution: add Home Assistant (free, open source) on a small home server (Raspberry Pi 5 or NUC, £100-200 hardware). Install: (1) SolarEdge Modbus TCP integration — reads PV power + BESS SoC + writes BESS control mode; (2) Octopus Energy integration — pulls next-day Agile prices + Octopus Saving Sessions schedule; (3) Easee OCPP backend (self-hosted) or Easee cloud OAuth integration — controls EV charging; (4) PredBat add-on — optimises BESS schedule given solar forecast + Agile prices + customer constraints. PredBat publishes a schedule that Home Assistant executes: BESS charge during cheapest 3-4 half-hours overnight (typically 02:00-04:00 at 7-12p/kWh); BESS hold daytime; BESS discharge during expensive evening half-hours (16:30-19:00 at 25-40p/kWh). EV charging scheduled separately during cheap windows + when PV surplus available. Setup time: 20-40 hours. Installer fee: £1-3k typical. Cert evidence: EMS architecture diagram + Home Assistant configuration backup + commissioning test + degraded-mode (no Home Assistant) verification (vendor EMS takes over default behaviour)."
            whyItMatters="This is the UK 2025-26 advanced-user EMS pattern. Customers willing to pay for setup get £300-500/year additional savings vs static ToU. Installer revenue stream: EMS-as-a-service. Cert evidence bundle treats the third-party EMS as part of the install, recorded + handed over but distinct from the BS 7671 electrical install scope. Reg 826.1.4 SPD review: more switching events from frequent BESS cycle = SPD specification reviewed."
          />

          <Scenario
            title="Light commercial — fleet EV chargers + OCPP backend + ANM"
            situation="Logistics depot. 30 kWp PV + 50 kWh BESS + 8 × 22 kW EV chargers (mixed Easee + Wallbox vendors). 200 A three-phase service. DNO offers ANM connection at cost: keep 200 A service (existing); avoid paying for service upgrade to 400 A; in return, EMS enforces a cap that import never exceeds 160 A across all phases during DNO peak windows."
            whatToDo="OCPP-based EMS deployment. Octopus Electroverse or Monta as OCPP backend (both UK 2025-26 commercial-friendly). Both Easee + Wallbox chargers report to one OCPP backend regardless of vendor. EMS coordination: (1) Smart Charging Profile via OCPP — EMS computes per-charger current limit based on PV generation + BESS state + service capacity headroom + DNO peak window; pushes via OCPP TxProfile to each charger; (2) BESS coordination via Modbus TCP — BESS charges from PV surplus or cheap-rate grid; discharges during peak to reduce import; (3) ANM enforcement — EMS continuously monitors phase currents at MET (CT clamps + smart meter API); throttles EV charging if approaching 160 A cap; (4) Reg 311.1: cable + service sized for unmanaged worst-case 200 A, ANM connection contract documents the 160 A operational cap. Cert evidence: PEI EIC + EMS architecture + ANM agreement + OCPP backend record + commissioning verification (deliberately approach the cap + verify charge throttling) + degraded-mode test (if EMS fails, chargers default to safer behaviour — typically reduce to lowest setpoint until EMS restored). Project cost £30-50k (PV+BESS) + £25-40k (8 chargers + civils) + £5-10k (EMS / OCPP integration)."
            whyItMatters="Commercial multi-vendor PEI with ANM = the UK 2025-26 light-commercial template. Without OCPP, vendor-locked-in stacks would force matching all chargers to one brand. Without ANM, customer would need an expensive service upgrade. EMS coordination layer makes both work. Cert evidence bundle is substantial — PEI integration + OCPP backend + ANM agreement + Reg 826.1.2 overcurrent across configurations. The installer’s scope expands from ‘BS 7671 install’ to ‘PEI design + EMS integration’ — different commercial model."
          />

          <CommonMistake
            title="Assuming the vendor EMS handles dynamic tariffs natively"
            whatHappens="Customer signs up for Octopus Agile expecting their SolarEdge / Tesla / GivEnergy EMS to follow the dynamic half-hourly prices. Reality: vendor EMS only supports static ToU schedules. BESS charges at the wrong times, customer pays full Agile peak rate, savings disappear, customer blames the installer + the BESS investment."
            doInstead="Clarify at quote stage: (1) static ToU (Go) — vendor EMS handles natively, simple, set-and-forget; (2) dynamic (Agile / Cosy) — requires third-party EMS (Home Assistant + Octopus integration + PredBat) on top of vendor EMS; setup cost £1-3k; ongoing maintenance commitment. Quote both options to the customer. Some vendors (GivEnergy via GivTCP / OpenAPI) make Agile easier than others (Tesla makes it harder — no public Modbus, closed API). Vendor selection matters for tariff strategy. Cert evidence: customer-acknowledged tariff strategy + EMS architecture documented."
          />

          <CommonMistake
            title="Treating the EMS comms wiring as not in BS 7671 scope"
            whatHappens="Installer runs Modbus RS-485 cable along parallel LV power cable in same conduit, no segregation, no Reg 528 check. EMS reports erratic data; commissioning fails; engineer assumes software bug. Actually it’s EMI from LV power inducing noise on the unscreened signal cable. Fix requires re-cabling — expensive rework."
            doInstead="Treat all EMS comms wiring as Band I signal cabling under BS 7671. Reg 528.1 segregation from Band II (LV power) cabling — separate conduit / trunking, or maintained physical separation, or shielded cable with shield grounded at one end. RS-485 Modbus prefers shielded twisted pair (CAT5e shielded fine, dedicated RS-485 cable better). Ethernet (Modbus TCP, OCPP) uses standard structured-cabling rules. Cert evidence: wiring schematic + Reg 528 segregation note + commissioning verification of EMS data integrity."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Chapter 82 (Reg 826.7 contents) recognises EEMS — Electrical Energy Management System — as part of PEI scope.',
              'Default UK 2025-26 priority: PV → local load → BESS charge → SEG export; load deficit → BESS discharge → grid import. Customer-configurable in vendor EMS.',
              'Protocols: Modbus RTU / TCP for inverters + BESS; OCPP 1.6 / 2.0.1 for EV chargers; MQTT for third-party integrations; vendor cloud APIs for tight stacks. Multi-vendor PEI = protocol mix.',
              'Vendor EMS (SolarEdge / Tesla / GivEnergy / Enphase / Sonnen / Solis / myenergi) included in hardware cost, tight integration, simple setup, limited cross-vendor.',
              'Third-party EMS (Home Assistant + openHAB + Node-RED + PredBat) vendor-agnostic, custom logic, integration effort. UK 2025-26 advanced-user pattern.',
              'EMS electrical installation IS in BS 7671 scope (Reg 411 / 415 / 528 / 530 series). EMS software / logic / cyber / data NOT in BS 7671 scope (BS EN IEC 62443, GDPR, PSTI Act 2022 apply).',
              'Tariff arbitrage: static ToU (Octopus Go) handled by vendor EMS; dynamic (Octopus Agile) needs third-party EMS + automation (PredBat).',
              'Reg 826.1.4 SPD specification: PEI switching events more frequent than non-PEI, SPD specification may need uplift to Type 1+2 combined.',
              'Load shedding = EMS-controlled disconnection of non-essential loads when supply < demand. Used for island mode, ANM-capped connections, peak shaving.',
              'Reg 311.1 max demand assessed on UNMANAGED worst-case (if EMS fails) for cable + service sizing. ANM connections are a documented contractual exception.',
              'Cert evidence bundle: EMS architecture diagram + vendor / protocol list + commissioning configuration + degraded-mode test + customer handover acknowledgement + Reg 528 segregation note + ANM agreement if applicable.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                10.1 Hybrid systems landscape
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                10.3 Smart Export Guarantee (SEG)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
