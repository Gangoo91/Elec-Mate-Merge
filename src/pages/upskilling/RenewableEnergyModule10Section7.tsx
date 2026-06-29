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
    id: 'm10s7-overcurrent-every-point',
    question:
      'Reg 826.1.2.1 requires overcurrent calculation at EVERY PEI protective device point. What configurations should a typical 4-source PEI (DNO + PV + BESS + V2G) cover?',
    options: [
      'All reachable configurations — all sources, partial combinations, DNO alone, island — min and max each',
      'Only the full direct-feeding case with all four sources active, as that is always the worst case',
      'Only the island-mode configurations, since the DNO covers all grid-connected scenarios',
      'Only the configurations the customer expects to use in normal day-to-day operation',
    ],
    correctIndex: 0,
    explanation:
      'Reg 826.1.2.1 explicit requirement: "Overload and short-circuit currents shall be determined at every point of the PEI where a protective device is installed: (a) for all possible configurations of each type of PEI; and (b) for situations corresponding to the minimum and maximum current magnitudes." Practical interpretation for 4-source PEI: (1) Direct-feeding configurations — enumerate the source combinations actively contributing (DNO always present in direct-feeding; PV present when sunny; BESS present when charged + discharging or charging; V2G present when EV plugged in + discharging). 2⁴ = 16 possible source combinations but only ~6-8 practically reachable. (2) Island configurations (if PEI is island-capable) — enumerate the local-source combinations (BESS alone, BESS + PV daylight, BESS + V2G, etc.). (3) For each configuration: calculate max PSCC at each protective device location (highest combined current any source can deliver to a fault); calculate min fault current (lowest combined current the smallest source can deliver to a fault). (4) Use the worst-case max for breaker breaking capacity (Reg 434.5.1) + cable thermal protection (Reg 433); use the worst-case min for ADS verification (Reg 411). (5) The full set of calculations + per-configuration test results = the PEI overcurrent study. Cert evidence: the study itself + commissioning verification of representative scenarios. UK 2025-26 design tools: spreadsheet + per-circuit + per-configuration calculations; commercial software (Trimble Electrical, Amtech Pro Design) supports PEI multi-source studies.',
  },
  {
    id: 'm10s7-rcd-multi-source',
    question:
      'Reg 551.4.2 + multi-source PEI: what RCD architecture is required for a 4-source PEI?',
    options: [
      'A single main RCD covering the whole installation is sufficient for every source combination',
      'No RCDs are needed once each source has its own anti-islanding protection fitted',
      'Per-source RCDs plus 30 mA per circuit, verified across every combination, Type B where smooth-DC',
      'One RCD per source only, with no per-circuit additional protection downstream of it',
    ],
    correctIndex: 2,
    explanation:
      'Reg 551.4.2: "The generating set shall be connected so that any provision within the installation for protection by RCDs in accordance with Chapter 41 remains effective for every intended combination of sources of supply." Multi-source PEI RCD architecture requirements: (1) Per-source RCD — each generator has its own RCD on its supply-side connection. Typical 30 mA Type A or Type B per Reg 415.1 + Reg 531.3.3 (RCD type depends on generator electronics: VSD wind / hybrid inverter / V2G may need Type B per manufacturer DoC). (2) Central RCD architecture — main RCD (Type S 100 mA or similar discrimination) upstream of consumer unit + 30 mA RCBOs per circuit. Provides Reg 531.3.6 discrimination + Reg 415.1 30 mA. (3) Reg 551.7.1(d) prohibition — source must NOT be connected on the load side of an RCD under certain conditions (per the A4 redraft). The source feeds energy in; the RCD should not see asymmetric fault current that compromises operation. (4) Type B selection for VSD / power-electronic sources — V2G chargers, hybrid inverters, VSD generators can produce smooth DC fault current that saturates Type A RCDs. Manufacturer DoC declares; Type B installed where required. (5) Effectiveness across combinations — verification at commissioning that each source combination + fault scenario triggers the appropriate RCD. (6) Cert evidence: RCD architecture diagram + per-source RCD type / In / IΔn + commissioning test results per source combination + manufacturer DoC per source.',
  },
  {
    id: 'm10s7-isolation-procedure',
    question:
      'What does a documented multi-source isolation procedure look like for a 4-source PEI?',
    options: [
      'An informal verbal sequence the engineer recalls on the day, kept out of the handover pack',
      'A single step — switching off the DNO main switch isolates the whole installation',
      'A sequence that isolates the DNO and local sources but skips proving dead and lock-off',
      'A documented sequence: switch off each source, prove dead, lock off, await capacitor discharge',
    ],
    correctIndex: 3,
    explanation:
      'Multi-source PEI isolation procedure documented under Reg 826.1.1.4 + Reg 537.2 best practice: (1) Notification — occupants warned, ICT systems (smart-home, comms) checked. (2) Source disconnection sequence — every source-side main switch operated in order. Order doesn’t matter strictly (each is independent isolation) but documenting a standard sequence aids consistency. (3) Verification — zero-energy state confirmed via test instrument at the relevant work location. Reg 642.2 + Reg 643.1 verification of safe isolation. (4) Lockout / tagout — where the work duration warrants (HSE EAW Regulations + Reg 537.4 safety devices). Locks on the source-side isolators; tags identifying the work + isolating person + restoration plan. (5) Wait time — PV DC + BESS DC capacitors may take minutes to discharge to safe voltages. Inverter manufacturer DoC declares minimum wait. Reg 462.1 capacitor discharge consideration. (6) Restoration — reverse sequence: V2G → BESS → PV → DNO (or DNO first to provide reference for grid-following inverters). Verify operation in each step. (7) Documentation — customer handover pack includes the isolation procedure + each switch location photograph + warning notice text. Future engineer attending sees the same procedure. (8) Cert evidence: procedure document + customer acknowledgement + photograph of warning notice + isolation schematic.',
  },
  {
    id: 'm10s7-collective-pei',
    question:
      'What is a "collective PEI" or "shared PEI" per the Reg 826.7 contents + when does it apply?',
    options: [
      'Where shared sources serve multiple separate installations or use a master meter / private wire',
      'A collective PEI is simply a large single-dwelling PEI above a defined kW threshold',
      'It applies only to a single detached house with more than one generating source on one MPAN',
      'The term is defined in ESQCR rather than BS 7671 and has no Chapter 82 meaning',
    ],
    correctIndex: 0,
    explanation:
      'Collective + shared PEI scope under Chapter 82: (1) Individual PEI — the simplest case: one customer, one DNO connection, one MPAN, local generation + storage feeding one electrical installation. Single owner, single bill, single SEG contract. Covered by Chapter 82 + per-technology sections without collective/shared PEI special considerations. (2) Collective PEI (a type defined in the Reg 826.7 contents) — multiple individual electrical installations connected behind a common point + sharing local generation. Apartment block: 24 flats with their own DNO supplies + the building has rooftop PV + common-area BESS feeding the building’s common-area circuit + (optionally) reduced-cost electricity to tenant flats via private-wire. (3) Shared PEI — generation assets shared across legally-separate entities. Community solar scheme where 30 households co-own a PV + BESS asset connected to a central LV network point + electricity allocated by agreement. (4) UK 2025-26 examples — social housing rooftop PV (council / housing association), apartment community PV schemes (build-to-rent operators), hospital campus CHP with multiple departments / suppliers, light-industrial park shared generation. (5) Additional considerations beyond individual PEI — metering complexity (master + sub or individual + community), commercial arrangements (allocation rules), ESQCR / Ofgem private-wire-supply rules where applicable, collective + shared PEI considerations (Reg 826.7 contents), legal ownership clarity, maintenance responsibilities. (6) Cert evidence: collective PEI EIC with multiple per-installation references; community ownership / allocation document; private-wire / supply arrangement if applicable; collective PEI compliance summary (Reg 826.7 contents).',
  },
];

const quizQuestions = [
  {
    question:
      'A 4-source PEI (DNO + PV + BESS + V2G) on a 100 A single-phase service. PSCC at the main consumer unit busbar:',
    options: [
      'The DNO dominates the prospective current; the inverters add only ~85 A combined to the busbar',
      'Only the DNO contributes; the inverters add nothing to fault current in any configuration',
      'There is effectively no fault current on a PEI because every inverter is current-limited',
      'The inverters dominate the busbar PSCC and the DNO contribution can be neglected',
    ],
    correctAnswer: 0,
    explanation:
      'Practical UK 2025-26 PEI PSCC calculation: (1) DNO contribution — dominant. Typical 6-25 kA prospective at LV consumer position depending on transformer size + distance. Each DNO publishes typical figures; site-specific calculation via DNO’s connection offer or fault-level study. (2) Per-source inverter contribution — modern grid-following inverters are current-limited (≈1.1× rated by their internal protection). A 5 kW single-phase inverter at 230 V ≈ 21.7 A rated → 24 A peak fault contribution; a 7 kW V2G charger ≈ 30.4 A rated → 33 A peak. (3) Aggregate at main busbar — DNO + sum of inverter contributions. The DNO kA dominates; inverter contribution is rounding error at the main busbar in direct-feeding mode. (4) Local-source-only fault — in island mode, only inverter contribution. The 85 A aggregate is the real number to design for; 30-50 A typical fault at a downstream circuit; Reg 411 ADS via overcurrent often not achievable; RCD becomes primary. (5) Near-inverter fault — a fault at the inverter’s AC output terminals sees very low impedance back to the inverter. PSCC at the inverter terminals can be 10-20× rated during the brief transient (sub-cycle) before inverter self-protection trips. Breaker breaking capacity must accommodate. (6) Cert evidence: per-protective-device-point PSCC calculations (max + min) + breaker breaking capacity verification + commissioning measurements where practical.',
  },
  {
    question:
      'A PEI commissioning engineer is asked: "Why does Reg 826.1.2.1 require min current calculation, not just max?"',
    options: [
      'Min current sizes the breaking capacity of the protective device, not the disconnection time',
      'Only max current matters; ADS is always satisfied if breaking capacity is adequate',
      'Max current sizes breaking capacity; min current verifies ADS, which can fail in island mode',
      'Min current is recorded only for the DNO and has no role in the protective design',
    ],
    correctAnswer: 2,
    explanation:
      'Why both extremes matter for protective design: (1) Max current case — sets the upper bound. Used for: (a) breaker breaking capacity per Reg 434.5.1 (Icu rating); (b) cable thermal protection per Reg 433 (I²t cable energy absorption); (c) discrimination between upstream + downstream devices per Reg 533.4 / 536; (d) damage limits on equipment in fault path. Direct-feeding mode max PSCC = DNO contribution dominates. (2) Min current case — sets the lower bound. Used for: (a) ADS verification per Reg 411.3 disconnection time at minimum fault current; the protective device MUST trip within table 41.2 / 41.4 time at the lowest possible fault current; (b) discrimination check during fault clearance (lowest-current case may not coordinate as designed). Island mode min fault current = inverter contribution alone, may be 30-50 A. (3) Configuration matters — each PEI configuration has its own min + max. Direct-feeding 4 sources: max = DNO + PV + BESS + V2G; min = DNO alone (PV not generating, BESS offline, V2G unplugged). Island: max = all local sources contributing; min = single-source (e.g. BESS depleted, PV night). (4) Practical study — enumerate configurations + identify min + max per protective device location. (5) Where min not achievable via overcurrent for ADS: rely on RCD (Reg 415.1 + Reg 551.4.2 effectiveness + Reg 826.1.1.2.2 N-E bond providing fault-path) + inverter self-protection; document the strategy. Cert evidence: PEI overcurrent study covering both bounds per configuration + commissioning verification.',
  },
  {
    question:
      'A typical UK 2025-26 4-source PEI commissioning includes how many distinct test / verify steps for the multi-source-coordination layer?',
    options: [
      'Just the standard BS 7671 Part 6 per-circuit tests, identical to a single-source install',
      'The per-circuit tests plus a single whole-site anti-islanding check covering all sources at once',
      'Only the vendor commissioning of each inverter; BS 7671 testing is not repeated on integration',
      'Substantial — 10+ distinct activities across Part 6, EREC and EMS over 2-3 days',
    ],
    correctAnswer: 3,
    explanation:
      'Comprehensive commissioning checklist for UK 2025-26 4-source PEI: (1) Reg 643 Part 6 — continuity, insulation resistance, polarity, earth fault loop impedance, RCD operation, functional testing per circuit. Standard BS 7671 commissioning, expanded across the multi-source install. (2) Reg 551.7.5 anti-islanding — simulated grid-loss test per inverter (PV inverter, BESS inverter, V2G charger). Verify disconnect within ENA G98 / G99 specified time. (3) Reg 551.4.2 RCD effectiveness — controlled fault test in each source combination. PV-only direct-feeding, PV+BESS, PV+BESS+V2G, all in island (if island-capable), etc. (4) Reg 826.1.1.2.2 N-E switching — simulated grid-loss + N-E continuity measurement in each state + transition timing verification (if backup gateway present). (5) Reg 826.1.1.4 multi-source isolation — walk through the documented isolation procedure + verify each switch operates + warning notice in place. (6) Reg 826.1.2.1 overcurrent — verification of max + min per configuration (via fault-level instrument or analytical study + spot-check). (7) EREC G99 commissioning — DNO-witnessed test (if required by connection offer) or self-certified per manufacturer DoC. (8) EREC G100 — deliberate over-generation + ELS curtailment / hard-limit verification (if export-limited). (9) EMS commissioning — priority logic verification, ToU schedule active, load shedding behaviour, degraded-mode behaviour (EMS offline) confirmed safe. (10) Customer handover — walk through procedures + warnings + operating modes + emergency contacts; signed acknowledgement. Total time: 2-3 days for a comprehensive 4-source PEI; £2-5k commissioning cost. Cert evidence: integrated commissioning record covering all above with test results + signatures + photographs.',
  },
  {
    question:
      'For a multi-source PEI, the warning notice at the main consumer unit must convey:',
    options: [
      'A "multiple sources" warning listing every source-isolator and stressing ALL must be switched off',
      'A "Danger" label alone is sufficient; listing the individual isolators is not required',
      'No warning notice is required where each source has its own labelled isolator',
      'Only the DNO main switch needs a notice; the local sources are covered by their manuals',
    ],
    correctAnswer: 0,
    explanation:
      'Multi-source warning notice content + presentation: (1) Header — "WARNING" or "DANGER" in clear large text. Hazard category identification. (2) Hazard statement — "Multiple sources of supply" or similar; communicates that more than DNO supply present. (3) Enumeration — list each source-isolator with location identifier (e.g. "PV AC isolator on wall adjacent to inverter"). UK 2025-26 typical 4-source PEI: 5-7 isolators. Number consistently with the isolation procedure document. (4) All-must-be-operated emphasis — "ALL of the following must be switched OFF" with emphasis. The single most important message. (5) Consequence statement — "Failure to operate ALL isolators presents risk of electric shock from live conductors fed by the remaining energised sources" or similar. Communicates the WHY — not just the procedural list. (6) Cross-reference — "Refer to isolation procedure document" — pointer to the detailed customer handover pack document with verification + LOTO steps. (7) Materiality + durability — Reg 514 family: notice must be permanently fixed, legible, in a location visible to any person operating any isolator. UK 2025-26 typical: laminated / engraved plate adjacent to the main consumer unit; size A4 or similar to be legible from arm’s length. (8) Languages — English baseline; site-specific multi-language where occupants warrant. (9) Cert evidence: photograph of installed notice + verification of all isolator locations + customer acknowledgement.',
  },
  {
    question:
      'In a 4-source PEI, the EREC G99 connection agreement was signed with PV + BESS only. Customer subsequently added V2G. What happens to the EREC agreement?',
    options: [
      'No change is needed — the original PV + BESS agreement already covers any later source',
      'V2G is a load addition only, so a load notification rather than a generation amendment applies',
      'A G99 amendment is required: V2G is a new generating source that raises declared capacity',
      'A fresh G98 fast-track notification replaces the existing G99 agreement entirely',
    ],
    correctAnswer: 2,
    explanation:
      'EREC G99 amendment process for new generating source: (1) Original G99 agreement — sized at customer’s declared capacity at first application. UK 2025-26 typical PV + BESS: 5 kW PV inverter + 5 kW BESS inverter = 10 kW combined declared capacity. DNO assesses network impact + issues connection offer at that capacity. (2) Adding V2G — V2G charger is an additional GENERATING SET (per Section 551). Adds 7 kW typical discharge capacity. Aggregate declared capacity now 17 kW. DNO’s original network assessment didn’t cover this scenario. (3) Amendment trigger — ANY change to declared generating capacity, source type, or operating mode triggers G99 amendment. Process: installer / customer submits amendment application to DNO; DNO reassesses network impact + voltage rise + reverse-power-flow constraints; DNO issues updated connection offer (which may have new conditions — G100 limit if not previously, or different limit if existing). (4) G100 if applicable — if site has export limit, new G100 commissioning cert filed including V2G in curtailment hierarchy. (5) Compliance — without amendment, customer is in breach of original connection agreement. DNO routine audit or voltage-rise complaint catches breach. Consequences: revoked connection, retrospective amendment + cost, customer disruption. (6) Best practice — the installer doing the V2G addition handles the G99 amendment as part of the install scope. Quote includes G99 amendment lead time + admin. Cert evidence: G99 amendment correspondence + updated connection agreement + commissioning cert covering the V2G addition.',
  },
  {
    question:
      'For a collective PEI (apartment block with shared rooftop PV + BESS + common-area feed), what additional considerations apply beyond individual PEI?',
    options: [
      'It is identical to an individual house PEI; the shared generation changes nothing',
      'Collective generation feeding multiple dwellings is not permitted under BS 7671',
      'Only the metering differs; ownership, certs and the G99 are handled exactly as a single dwelling',
      'It adds ownership clarity, master/sub-metering, ESQCR private-wire rules and multiple certs',
    ],
    correctAnswer: 3,
    explanation:
      'Collective PEI complexity multipliers beyond individual residential: (1) Ownership clarity — the generation asset (rooftop PV + BESS) is owned by landlord / community / co-op; tenants have their own DNO connections + MPANs. The PEI ownership is COLLECTIVE — the collective PEI type defined in the Reg 826.7 contents. (2) Metering architecture — master meter at the building DNO point measures gross import / export; sub-metering or smart-meter aggregation determines how generation benefits are distributed (lower common-area charges, reduced tenant bills via private-wire, community pot). (3) ESQCR + Ofgem private-wire-supply — if landlord supplies tenant flats via private-wire (energy generated on-site, distributed via cables NOT through the public DNO network), separate Ofgem licence exemption + ESQCR (Electricity Safety, Quality + Continuity Regulations 2002) considerations apply. Outside BS 7671 strict scope but adjacent. (4) Lease + maintenance — lease document defines who pays for what: generation maintenance, repair, replacement, insurance. Customer handover pack includes the lease excerpt. (5) Cert evidence — per electrical installation (each tenant flat) + the shared rooftop / BESS install + the connecting infrastructure + a collective PEI compliance summary. Multiple EICs + a coordinating document. (6) EREC G99 — collective generation typically registered as a SINGLE generating site at the building DNO point. Capacity = total generation; G99 application covers all sources together. SEG payable to landlord / community owner per their tariff arrangement. (7) Safety + isolation — work on shared assets coordinates landlord + tenant access; isolation procedure may require multiple parties’ cooperation. (8) UK 2025-26 examples — social housing PV (council / housing association programmes); apartment build-to-rent (Greystar, Quintain) shared rooftop solar; community energy co-ops (Brixton Energy, Repowering London); hospital campus generation. (9) Cert evidence bundle for collective PEI: multiple EICs + shared-asset EIC + ownership documentation + private-wire arrangement if applicable + collective PEI compliance summary (Reg 826.7 contents) + maintenance responsibility document + each EREC reference.',
  },
];

const faqs = [
  {
    question: 'How long does it take to commission a typical UK 2025-26 4-source PEI?',
    answer:
      '2-3 days commissioning labour typical for: Reg 643 Part 6 testing per circuit + Reg 551.7.5 anti-islanding per inverter + Reg 551.4.2 RCD effectiveness across source combinations + Reg 826.1.1.2.2 N-E switching if island-capable + Reg 826.1.1.4 multi-source isolation walkthrough + Reg 826.1.2.1 overcurrent verification + EREC G99 commissioning + EREC G100 if applicable + EMS commissioning + customer handover. Cost £2-5k typical commissioning portion of the install. Plan + quote accordingly.',
  },
  {
    question: 'Does each inverter need its own commissioning paperwork?',
    answer:
      'Yes — each inverter (PV, BESS, V2G) needs: manufacturer DoC (product compliance), ENA G98 / G99 type-test approval reference, BS EN type test (50549, 61727), Reg 551.7.5 anti-islanding commissioning test result, Reg 415.1 RCD operation verification at its supply, Reg 528 segregation evidence for comms cabling. Plus the integrating PEI EIC referencing all of them. UK 2025-26 typical 4-source PEI cert evidence bundle: 30-60 pages of documentation across the integrated install.',
  },
  {
    question: 'What’s the cert evidence bundle structure for a multi-source PEI?',
    answer:
      'Recommended structure: (1) Cover sheet — customer + site details + sources + DNO + MPAN; (2) Integrated PEI EIC — the master BS 7671 EIC referencing per-technology sub-sections; (3) Per-technology DoCs — PV inverter, BESS inverter, V2G charger; (4) ENA correspondence — G98 / G99 application + connection offer + amendment correspondence; (5) G100 commissioning cert if applicable; (6) MCS handover pack — MCS certs + commissioning per technology; (7) Reg 826.1.1.2.2 N-E switching commissioning if island-capable; (8) Reg 826.1.1.4 isolation procedure + photo of warning notice; (9) Reg 826.1.2.1 overcurrent study + per-configuration test results; (10) Reg 551.4.2 RCD effectiveness commissioning per source combination; (11) EMS architecture diagram + configuration record + degraded-mode test; (12) Customer handover documents — operating modes, isolation procedure, emergency contacts, warranty information; (13) Customer acknowledgement signatures.',
  },
  {
    question: 'How is the cert evidence bundle distributed?',
    answer:
      'Three distinct copies: (1) Customer — handover pack at commissioning. Customer keeps for future engineer attendance, insurance, sale of property. (2) DNO — EREC G99 + G100 certificates + connection-relevant subset. Closes the G99 application loop. (3) Installer archive — retained per professional standards (typically 6-10 years minimum). Future audit + warranty support + future-upgrade reference. UK 2025-26 typical: digital PDF copies (customer + installer); printed copies if customer prefers. Linear filing per install reference number.',
  },
  {
    question: 'How does future-engineer attendance work on a multi-source PEI?',
    answer:
      'Future engineer (year 5 maintenance, vendor swap-out, fault investigation) reads the cert evidence bundle BEFORE attending site. Key documents: integrated PEI EIC (architecture summary), isolation procedure (safe-isolation steps), per-technology DoC (equipment identification), EMS architecture (logical scheme), EREC correspondence (DNO interface). The customer’s warning notice + isolation procedure document at the consumer unit must match the cert evidence. Discrepancies = updated paperwork required + recommissioning of affected scope.',
  },
];

export default function RenewableEnergyModule10Section7() {
  const navigate = useNavigate();

  useSEO({
    title: 'Multi-source coordination at scale | Renewable Energy 10.7 | Elec-Mate',
    description:
      'BS 7671 Chapter 82 deep-dive for multi-source PEI — Reg 826.1.1.4 isolation across multiple sources, Reg 826.1.2.1 overcurrent at every point + every configuration, Reg 551.4.2 multi-source RCD architecture. Why a 4-source PEI is not 4×1-source install. EREC G99 amendment process. Collective + shared PEI under the Reg 826.7 contents.',
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
            eyebrow="Module 10 · Section 7 · BS 7671:2018+A4:2026 · Chapter 82 deep-dive"
            title="Multi-source coordination at scale (Chapter 82 deep)"
            description="The integration challenge of 4+ source PEI sites: why it’s NOT the sum of 4 single-source installs. Reg 826.1.1.4 isolation across multiple sources with consolidated warning notices. Reg 826.1.2.1 overcurrent at every PEI point for every configuration + min + max current magnitudes. Reg 551.4.2 multi-source RCD effectiveness. Collective + shared PEI (defined in the Reg 826.7 contents) for apartment blocks + community schemes. EREC G99 amendment process when adding sources."
            tone="yellow"
          />

          <TLDR
            points={[
              'Multi-source PEI is NOT the sum of single-source installs. Each added source multiplies the configurations + interactions to verify under Chapter 82.',
              'Reg 826.1.2.1 requires overcurrent calculation at EVERY PEI protective device location, for ALL configurations, + for BOTH minimum AND maximum current magnitudes. Max sizes breakers; min verifies ADS especially in island.',
              'Reg 826.1.1.4 multi-source isolation: per-source main switch + consolidated warning notice listing ALL switches that must be operated to isolate the installation.',
              'Reg 551.4.2 multi-source RCD effectiveness: RCD architecture must remain effective across every intended combination of sources. Per-source RCD + central architecture + Type B where smooth-DC fault current.',
              'Multi-source PEI commissioning: 2-3 days typical labour. 10+ distinct verification activities across Reg 643 + Reg 551.7.5 + Reg 551.4.2 + Reg 826.1.1.2.2 + Reg 826.1.1.4 + Reg 826.1.2.1 + EREC G99/G100 + EMS + customer handover.',
              'EREC G99 amendment required when adding any new generating source to an existing PEI. Without amendment: contractual breach + DNO disconnection risk.',
              'Collective PEI (a type defined in the Reg 826.7 contents): apartment block / community schemes with shared generation feeding multiple legal entities. Adds: ownership clarity, metering architecture, private-wire / Ofgem considerations, lease + maintenance responsibilities, multiple EICs + coordinating document.',
              'Documented isolation procedure: step-by-step sequence + verification + lockout / tagout + capacitor wait time + reverse-restoration. Customer handover pack contains.',
              'Cert evidence bundle structure: integrated PEI EIC + per-technology DoCs + EREC correspondence + MCS handover packs + Reg 826 commissioning records + EMS architecture + customer handover signatures. Typical 30-60 pages.',
              'Distribution: customer copy (handover) + DNO copy (G99/G100 closure) + installer archive (6-10 years minimum). Future engineer reads BEFORE attending.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 826.1.2.1 — overcurrent at every PEI point for all configurations + min + max current magnitudes.',
              'Apply Reg 826.1.1.4 multi-source isolation with consolidated warning notice + documented isolation procedure.',
              'Apply Reg 551.4.2 multi-source RCD effectiveness across every source combination + commissioning verification.',
              'Configure a comprehensive multi-source PEI commissioning sequence covering Reg 643 + 551 + 826 + EREC + EMS + customer handover.',
              'Apply EREC G99 amendment process when adding generating sources to an existing PEI.',
              'Identify collective + shared PEI scenarios (the types of PEI defined in the Reg 826.7 contents) + the additional considerations beyond individual residential.',
              'Compose the cert evidence bundle for a multi-source PEI: structure, content, distribution, retention.',
              'Articulate why a 4-source PEI commissioning is 2-3 days + £2-5k labour rather than half a day.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The single most expensive design assumption you can make on a multi-source PEI is that it’s "PV + BESS + EV done separately, stuck together". Chapter 82 exists because that assumption is wrong.
          </Pullquote>

          <ContentEyebrow>Why multi-source is categorically different</ContentEyebrow>

          <ConceptBlock
            title="Reg 826.1.2.1 — overcurrent at every point for every configuration"
            plainEnglish="Reg 826.1.2.1 is the most operationally-demanding clause of Chapter 82. It requires overcurrent calculation at EVERY PEI protective device location, for ALL possible configurations of the PEI, AND for BOTH minimum and maximum current magnitudes. Practical effect: a single 4-source PEI has 6-8 practically-reachable configurations + 5-15 protective device locations = 30-120 overcurrent calculations + verifications."
            onSite="UK 2025-26 design tool support: spreadsheet-based studies + commercial software (Amtech Pro Design, Trimble Electrical, Hevacomp Electrical). The PEI overcurrent study is a deliverable in the cert evidence bundle. Commissioning verifies representative configurations + spot-checks the calculations."
          >
            <p>Reg 826.1.2.1 in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Every PEI protective
                  device point</strong> — main switch, main RCD, distribution
                board, sub-DB, RCBOs per final circuit, source-side breakers,
                inverter AC isolators. Each location needs overcurrent
                calculation. UK 2025-26 typical 4-source PEI: 5-15 locations
              </li>
              <li>
                <strong className="text-white">All possible
                  configurations</strong> — enumerate which sources are
                actively contributing. 4-source PEI: 2⁴ = 16 mathematical
                combinations but ≈7-9 practically reachable (DNO almost always
                present in direct-feeding; some configurations require island
                operation; etc.). List + analyse each
              </li>
              <li>
                <strong className="text-white">Maximum current
                  magnitudes</strong> — highest aggregate fault current any
                source combination can deliver to a fault at each protective
                device location. Direct-feeding all-sources-active is usually
                the max. Used for: Reg 434.5.1 breaker breaking capacity; Reg
                433 cable thermal protection; Reg 533.4 / 536 discrimination
              </li>
              <li>
                <strong className="text-white">Minimum current
                  magnitudes</strong> — lowest aggregate fault current any
                source combination can deliver to a fault at each location.
                Island-mode single-source is usually the min. Used for: Reg
                411.3 ADS verification — must achieve disconnection time at
                this current; if not, rely on RCD or other ADS path
              </li>
              <li>
                <strong className="text-white">Per-configuration
                  per-location matrix</strong> — each configuration ×
                each location = one PSCC entry + one min fault entry. Build the
                matrix as a spreadsheet or in design software. UK 2025-26
                typical 4-source PEI: 30-120 entries
              </li>
              <li>
                <strong className="text-white">Worst case</strong>
                — from the matrix, identify the worst-case max + min per
                protective device location. Worst max sizes breaker; worst min
                verifies ADS
              </li>
              <li>
                <strong className="text-white">Commissioning
                  verification</strong> — representative configurations
                tested. Direct-feeding max (induced fault, measure trip); island
                min (controlled fault simulation, verify RCD trip). Cannot
                practically verify all 30-120 entries; spot-check + calculation
                evidence
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — PEI overcurrent study (the matrix +
                analysis + worst-case identification) + commissioning test
                results (representative configurations) + per-device-location
                analysis summary on the EIC
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Multi-source RCD architecture (Reg 551.4.2)"
            plainEnglish="Reg 551.4.2: “The generating set shall be connected so that any provision within the installation for protection by RCDs in accordance with Chapter 41 remains effective for every intended combination of sources of supply.” Multi-source PEI requires careful RCD architecture: per-source RCD + central RCD coordination + Type B where smooth-DC fault current + commissioning verification across every source combination."
            onSite="The challenge: each source influences the fault-current path + the RCD’s view of residual current. Without per-source RCDs + central coordination, a fault near one source may not be seen by an RCD; or an RCD may false-trip due to circulating residual current between sources. Multi-source RCD design is engineering work, not boilerplate."
          >
            <p>Multi-source RCD architecture considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-source RCD</strong>
                — each generating source has its own RCD on its supply-side
                connection. Typical 30 mA Type A or Type B per Reg 415.1 + Reg
                531.3.3. Type depends on source electronics (VSD wind, hybrid
                inverter, V2G → Type B where manufacturer DoC declares
                smooth-DC)
              </li>
              <li>
                <strong className="text-white">Central RCD
                  architecture</strong> — main RCD (Type S 100 mA upstream)
                + 30 mA RCBO per final circuit. Provides discrimination per Reg
                531.3.6 + Reg 415.1 additional protection
              </li>
              <li>
                <strong className="text-white">Reg 551.7.1(d)
                  prohibition</strong> — source must NOT be connected on
                load side of an RCD under certain conditions (the RCD would not
                correctly see the source’s contribution to residual current)
              </li>
              <li>
                <strong className="text-white">Type B for
                  smooth-DC sources</strong> — V2G chargers, BESS hybrid
                inverters, VSD wind / hydro / CHP can produce smooth-DC
                residual at fault. Type A RCDs saturate; Type B detects.
                Manufacturer DoC declares the requirement. UK 2025-26 modern
                hardware: Type B integrated or RDC-DD per BS EN 61851-1 (Reg
                722.531.3)
              </li>
              <li>
                <strong className="text-white">Source-combination
                  verification</strong> — at commissioning, induce a
                controlled residual fault in each practically-reachable source
                combination + verify the appropriate RCD trips. UK 2025-26
                4-source PEI: ~6-8 combinations tested representative
              </li>
              <li>
                <strong className="text-white">Island-mode RCD
                  operation</strong> — reliant on local N-E bond per Reg
                826.1.1.2.2. Verified at commissioning via simulated grid-loss
                + controlled fault in island
              </li>
              <li>
                <strong className="text-white">Discrimination</strong>
                — upstream Type S + downstream 30 mA RCBO. Time-graded so
                downstream trips first on local faults; upstream remains intact
                for the rest of the installation. Verified at commissioning
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — RCD architecture diagram + per-source RCD type / In /
                IΔn + commissioning test results per source combination +
                manufacturer DoC declarations + island-mode RCD verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.4 — Multi-source isolation deep-dive"
            clause="Where an installation is supplied from more than one source, a main switch suitable for isolation (for example, switch-disconnector) shall be provided for each source of supply. A durable warning notice shall be permanently fixed in the vicinity of these main switches in such a position that any person seeking to operate any of these main switches will be warned of the need to operate all such switches to achieve isolation of the installation. Alternatively, a single switching device may be used provided that it is capable of isolating all sources simultaneously and meets the requirements of Regulation 537.1.2."
            meaning="Reg 826.1.1.4 + its alternative clause: TWO compliant approaches. (1) Multiple-switch approach — one main switch per source (DNO + PV AC + PV DC + BESS AC + BESS DC + V2G + etc.) + consolidated warning notice. UK 2025-26 retrofit-friendly: existing consumer unit retained + per-source isolators added. (2) Single-device approach — a single switching device per Reg 537.1.2 capable of isolating ALL sources simultaneously. Practical: modern integrated PEI panels (Tesla Backup Gateway 2 + Powerwall, SolarEdge Backup Interface + StorEdge, GivEnergy Whole Home Backup + AIO) provide this in vendor-integrated form. New-build / major-retrofit-friendly. Either approach requires: switching device(s) suitable for isolation per Reg 537.2; durable warning notice per Reg 514 family; documented isolation procedure in customer handover pack; commissioning verification that each switch isolates its source. UK 2025-26 customer-facing reality: ensure consumer can perform safe isolation in emergency; trained-person isolation procedure documented for engineer attendance; periodic verification (annual + after equipment changes). Cert evidence: isolation schematic + warning notice photograph + procedure document + commissioning test of each switch + collective-PEI considerations (Reg 826.7 contents) if applicable."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Collective PEI + EREC G99 amendments</ContentEyebrow>

          <Pullquote>
            The multi-source PEI didn’t spring fully-formed. Each addition triggered an EREC G99 amendment, a Chapter 82 re-evaluation, a cert evidence bundle update. The integrating EIC is a living document, not a static deliverable.
          </Pullquote>

          <ConceptBlock
            title="EREC G99 amendments — when adding sources"
            plainEnglish="A G99 connection agreement is sized at the customer’s DECLARED GENERATING CAPACITY at original application. Adding any new source (V2G, additional PV string, BESS expansion, wind / hydro) requires a G99 AMENDMENT — the DNO reassesses network impact + issues an updated connection offer + recommissioning may be required. Without amendment: contractual breach + DNO disconnection risk."
            onSite="UK 2025-26 typical: customer’s PEI evolves year-by-year. Year 1: PV + BESS (initial G99). Year 2: V2G addition (G99 amendment). Year 3: PV expansion (further G99 amendment). The integrating PEI EIC + cert evidence bundle accumulates the changes. Installer scope on each addition: G99 amendment management as part of the install."
          >
            <p>G99 amendment process:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Trigger</strong> — ANY
                change to declared generating capacity, source type, source mode
                (e.g. PV inverter replacement, V2G addition, BESS expansion).
                The installer assesses whether the change requires G99
                amendment vs simple notification
              </li>
              <li>
                <strong className="text-white">Application
                  content</strong> — amendment form to DNO listing: existing
                generating capacity + sources; new source details (type,
                manufacturer, ENA type-test approval, rated capacity, intended
                mode); updated network connection requirements (any change to
                G100 limit, anti-islanding behaviour); customer details + site
                location + MPAN
              </li>
              <li>
                <strong className="text-white">DNO assessment</strong>
                — DNO reassesses: voltage rise impact, reverse-power-flow
                constraint, transformer + cable capacity, neighbouring-customer
                constraints. May require network model rerun. UK 2025-26
                typical 4-12 week timeline depending on DNO + change scope
              </li>
              <li>
                <strong className="text-white">Updated connection
                  offer</strong> — DNO issues amendment-conditional offer.
                Possible outcomes: (a) accepted at existing terms (no impact);
                (b) accepted with new G100 limit (added export limitation);
                (c) accepted with reinforcement requirement (rare for incremental
                additions); (d) rejected (network truly cannot support)
              </li>
              <li>
                <strong className="text-white">Customer
                  acceptance</strong> — customer signs + accepts the updated
                connection agreement. Any payment / connection-charge variation
                resolved
              </li>
              <li>
                <strong className="text-white">Commissioning</strong>
                — standard BS 7671 + per-technology commissioning + Reg
                551.7.5 anti-islanding test on new source + Reg 551.4.2
                multi-source RCD effectiveness verification + G100
                recommissioning if export-limited
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  update</strong> — integrated PEI EIC updated; per-technology
                EIC for new source; G99 amendment correspondence filed;
                multi-source isolation procedure + warning notice updated;
                customer handover pack updated
              </li>
              <li>
                <strong className="text-white">Breach
                  consequences</strong> — customer fails to amend + DNO
                routine audit / voltage-rise complaint catches: revoked
                connection agreement, retrospective amendment + recommissioning,
                customer disruption + reputational damage to installer
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Collective PEI (Reg 826.7 contents) — apartment blocks + community schemes"
            plainEnglish="The Chapter 82 contents (Reg 826.7) define the types of PEI — individual, collective and shared. Collective + Shared PEI: installations where local generation is shared by multiple separate electrical installations (apartment block tenants + landlord common areas + master meter, community generation co-ops, hospital-campus schemes). Additional considerations beyond individual PEI: ownership clarity, master + sub-metering, ESQCR / Ofgem private-wire-supply rules, lease + maintenance responsibilities, multiple EICs + a coordinating document."
            onSite="UK 2025-26 use cases: social housing rooftop PV (council / housing association programmes); apartment build-to-rent shared solar (Greystar, Quintain); community energy co-ops (Brixton Energy, Repowering London); hospital campus CHP / shared generation; light-industrial park shared assets. Installer scope expands beyond standard residential."
          >
            <p>Collective + shared PEI complexity:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Ownership
                  clarity</strong> — generation asset (rooftop PV + BESS)
                owned by landlord / community / co-op; tenants have separate DNO
                supplies + MPANs. Lease document defines responsibilities,
                payment flows, maintenance
              </li>
              <li>
                <strong className="text-white">Metering
                  architecture</strong> — master meter at building DNO
                point measures gross import + export; sub-meters or smart-meter
                aggregation determines distribution. UK 2025-26 typical: master
                MPAN for landlord; tenant MPANs separate; community-generated
                kWh distributed via private-wire or notional allocation
              </li>
              <li>
                <strong className="text-white">ESQCR + Ofgem
                  private-wire</strong> — if landlord supplies tenant flats
                via cables NOT through public DNO network (private-wire
                supply), Ofgem licence exemption + ESQCR (Electricity Safety,
                Quality + Continuity Regulations 2002) considerations. Outside
                strict BS 7671 scope but adjacent. UK 2025-26 increasingly
                common
              </li>
              <li>
                <strong className="text-white">EREC G99 single-site
                  registration</strong> — collective generation typically
                registered as a SINGLE generating site at the building DNO
                point. Capacity = total generation aggregate; G99 application
                covers all sources together. SEG payable to landlord / community
                owner per their tariff arrangement
              </li>
              <li>
                <strong className="text-white">Multiple EICs</strong>
                — each tenant flat = one EIC (Section 712 PV if private-
                wire-fed, otherwise standard residential EIC). Plus the shared
                rooftop / BESS install EIC (commercial + Section 712 + Chapter
                57 scope). Plus the coordinating document (collective PEI compliance
                summary, Reg 826.7 contents)
              </li>
              <li>
                <strong className="text-white">Safety + isolation
                  coordination</strong> — work on shared assets requires
                landlord + tenant access coordination. Isolation procedure
                involves multiple parties. Warning notice at each tenant’s
                consumer unit if private-wire-fed
              </li>
              <li>
                <strong className="text-white">Maintenance + life
                  cycle</strong> — landlord responsible for shared-asset
                maintenance; tenant responsible for their own electrical
                installation. Lease defines who pays for what. Cert evidence
                bundle records each
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle for collective PEI</strong> — substantial: multiple
                EICs + shared-asset EIC + collective PEI compliance summary (Reg 826.7 contents) +
                ownership documentation + private-wire arrangement if
                applicable + maintenance responsibility document + each EREC
                reference + landlord + tenant handover
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.7 contents — Collective + Shared PEI scope"
            clause="Within Chapter 82 contents: TYPES OF PEI — General; Operating modes; Individual PEI; Collective PEI; Shared PEI. Recognises three PEI categories: Individual (one customer, one electrical installation, local generation); Collective (multiple individual electrical installations behind a common point, sharing local generation — e.g. apartment block); Shared (generation assets shared across legally-separate entities — e.g. community solar co-operative)."
            meaning="The Reg 826.7 contents explicitly recognise three types of PEI — Individual, Collective, Shared. Practical scope expansion: (1) Individual PEI — the case most M10 sections have implicitly assumed. One customer, one electrical install, one DNO connection, one MPAN. Section 712 + Chapter 57 + Section 722 + Chapter 82 anchor apply uniformly. (2) Collective PEI — multiple electrical installations behind a common point, sharing local generation. UK 2025-26 examples: apartment block with rooftop PV feeding common areas + (private-wire) tenant supplies; care home shared CHP. Additional considerations: ownership, metering architecture, private-wire supply where applicable, multiple EICs. (3) Shared PEI — generation assets shared across legally-separate entities. UK 2025-26 examples: community solar co-op (multiple households co-own + share generation), hospital-campus CHP shared across departments / suppliers. Additional considerations: legal ownership structure, allocation rules, ESQCR / Ofgem framework, supply licence considerations. Cert evidence bundle scope expands accordingly: per-installation EIC + shared-asset EIC + collective PEI compliance summary (Reg 826.7 contents) + ownership / lease / co-op governance document + each EREC reference + private-wire arrangement if applicable. UK 2025-26 reality: collective + shared PEI are growing categories as community energy + apartment-block decarbonisation accelerate. Installer scope expands beyond standard residential into adjacent regulatory frameworks."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Year-by-year multi-source PEI build-out + EREC amendment cycle"
            situation="Suburban detached home, customer’s renewable build-out across 4 years. Year 1: 4 kWp PV install (G98 fast-track, single source). Year 2: 10 kWh BESS retrofit. Year 3: 7 kW EV charger install. Year 4: V2G upgrade of EV charger. Final state: 4-source PEI under Chapter 82. Each year’s install must trigger the appropriate EREC + BS 7671 + cert updates."
            whatToDo="Multi-year evolution under Chapter 82 framework. Year 1: G98 fast-track post-installation notification (4 kWp single-phase fits ≤16 A). Section 712 EIC + customer handover. Year 2: G99 application required — BESS as second generating source per Reg 551.7.2.1 takes site above G98 fast-track scope. DNO connection offer + acceptance. Integrated PEI EIC supersedes year-1 PV-only EIC. Chapter 82 multi-source isolation introduced (DNO + PV + BESS = 3 isolation points + warning notice). Reg 826.1.2.1 overcurrent recalculated. Reg 551.4.2 multi-source RCD verification. Year 3: EV charger added (Section 722 — LOAD only, not generating). G99 not triggered (no new generating capacity). But DNO load notification typical (heat-pump-equivalent max-demand consideration). Section 722 EIC. Multi-source isolation procedure updated for completeness even though EV is load (not source). Reg 311.1 max demand recalculated. Year 4: V2G upgrade. EV transitions from pure load to bidirectional source. G99 AMENDMENT required — declared generating capacity now PV (4 kW) + BESS (5 kW) + V2G (7 kW) = 16 kW total. DNO reassesses + may impose G100 limit (likely on suburban network). New G100 commissioning cert if applicable. Reg 551.7.5 anti-islanding test on V2G charger. Reg 551.4.2 multi-source RCD verification expanded to include V2G combinations. Reg 826.1.1.4 isolation procedure updated to include V2G charger isolator (now 4-source isolation: DNO + PV + BESS + V2G). Reg 826.1.2.1 overcurrent matrix expanded — V2G discharge contribution at MET added. Integrated PEI EIC supersedes year-3 version. EMS reconfigured. Customer handover updated. Cert evidence bundle now contains 4 years of updates: 4 EICs in succession + per-technology DoCs + 3 G99-related communications + G100 cert (if applicable) + MCS handover packs + Reg 826 commissioning records + EMS evolution + customer acknowledgements across 4 years."
            whyItMatters="UK 2025-26 multi-year PEI build-out is the dominant retrofit pattern — customers add capability over time. Each addition is NOT a fresh standalone install; it’s a transition to a more-complex PEI under Chapter 82. The installer’s scope includes the G99 amendment process + cert evidence bundle update + Reg 826 multi-source recommissioning + customer handover update. Without disciplined evolution: customer accumulates inconsistent paperwork, DNO breach risk, future-engineer confusion. The integrating PEI EIC is a living document."
          />

          <Scenario
            title="Apartment-block collective PEI — 60 flats with rooftop PV + community BESS + private-wire to common areas"
            situation="60-flat apartment block, build-to-rent operator-owned. Landlord installs 80 kWp rooftop PV + 100 kWh BESS feeding the building common-area circuit (lifts, lighting, communal heating, comms) + offering surplus generation to tenants via private-wire supply at reduced rate. Tenants retain their own DNO supplies for in-flat use. Building has separate MPAN for common-area; each flat has its own MPAN."
            whatToDo="Collective PEI scope (a type of PEI defined in the Reg 826.7 contents). (1) Asset structure: rooftop PV + BESS owned by landlord; common-area circuit owned by landlord; tenant flats have own DNO supplies; private-wire supply to tenant flats from landlord’s generation. (2) BS 7671 scope: Section 712 PV install (commercial scale, 80 kWp) + Chapter 57 BESS install (100 kWh — substantial) + Chapter 82 PEI integration (the entire common-area + private-wire installation). Each tenant flat: standard residential EIC under its own electrical installation scope. (3) EREC G99 — single application for the rooftop generation aggregate (80 kWp + 100 kWh BESS). DNO assesses building DNO point capacity. Likely G100 export limit imposed (urban network constrained). (4) collective PEI considerations (Reg 826.7 contents) — ownership clarity in lease, master + sub-metering architecture, private-wire supply licence exemption from Ofgem (since landlord supplies tenants on-site), ESQCR compliance for private-wire cable installation. (5) Multi-source isolation — landlord-side: DNO common-area + PV AC + PV DC + BESS AC + BESS DC = 5 isolation points + warning notice + comprehensive isolation procedure. Tenant-side: standard residential isolation but private-wire feeds from landlord generation must be isolatable by tenant in emergency (additional isolator at each tenant flat). (6) Cert evidence bundle: commercial PEI EIC (rooftop + common-area + private-wire infrastructure) + 60 × residential EICs (each tenant flat) + landlord-tenant lease excerpt referencing private-wire arrangement + collective PEI compliance summary (Reg 826.7 contents) + EREC G99 + G100 commissioning + MCS commercial PV handover + EMS architecture + safety procedures for shared-asset maintenance + customer (tenant) handover at each flat + landlord handover. (7) Economics: landlord saves £35,000-50,000/year on common-area electricity import (self-consumed PV × £0.25/kWh × 80% self-consumption); tenants saved £100-200/year each via private-wire reduced rate; SEG income limited by G100 export limit. Capex £150,000-250,000 PV + BESS install + £50,000-100,000 EMS + private-wire infrastructure + £20,000-30,000 cert + commissioning."
            whyItMatters="Apartment-block collective PEI is a growing UK 2025-26 use case driven by ESG / net-zero commitments of build-to-rent operators + social housing programmes. The collective PEI framework (Reg 826.7 contents) + private-wire supply licence + multi-EIC management + commercial-scale Chapter 82 design all converge. The installer’s scope expands substantially beyond ‘residential PV + BESS’ — commercial PEI design + private-wire infrastructure + community-scale cert evidence bundle. Cert evidence is the document trail that supports everything: insurance, audit, ESG reporting, future-engineer attendance, tenant + landlord rights + responsibilities."
          />

          <CommonMistake
            title="Adding source to existing PEI without G99 amendment"
            whatHappens="Customer with existing PV+BESS PEI adds a 7 kW V2G charger. Installer fits the V2G hardware + commissions per Section 722 + Section 551 + Chapter 82 BUT doesn’t notify the DNO. DNO’s routine audit (or voltage-rise complaint on the local network) catches the discrepancy 12 months later. DNO revokes the connection agreement; customer faces disconnection; retrospective G99 amendment + recommissioning cost £5,000-10,000 + customer disruption + installer reputational damage."
            doInstead="ANY new generating source addition to an existing PEI triggers G99 amendment. Process: at quote stage, identify the source addition + budget G99 amendment lead time (typically 4-12 weeks) + cost; pre-submission consultation with DNO if uncertain about acceptability; G99 amendment submission as part of project plan; commissioning held until DNO acceptance; G100 recommissioning if site export-limited; cert evidence bundle updated with G99 amendment correspondence. Customer-facing: build the G99 amendment into the install timeline + cost. Don’t treat it as optional admin."
          />

          <CommonMistake
            title="Reusing the original PEI EIC after substantial source addition"
            whatHappens="Customer’s year-1 PV+BESS EIC remains the only cert evidence after year-4 V2G addition. Future engineer attending in year 6 reads the EIC + sees only PV + BESS — doesn’t notice V2G exists. Performs work assuming 2-source PEI; V2G isn’t isolated; persons-at-risk on live V2G feed. Real near-miss / accident scenario."
            doInstead="Integrating PEI EIC is a LIVING document. Each substantial change (new source, source removal, ELS reconfiguration, EMS architectural change, backup-gateway retrofit) supersedes the prior EIC. Cert evidence bundle: chronologically-ordered EIC succession, each clearly marked with effective date + supersedes-prior-version reference. Future engineer reads the LATEST EIC, understands current PEI configuration. Customer handover: deliver new EIC + emphasise to customer that prior EIC is now superseded + recommend storage of complete history but use of latest as the operative document. Cert evidence bundle: latest integrated PEI EIC + per-technology DoCs + EREC correspondence chronology + Reg 826 commissioning history + EMS architecture evolution."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Multi-source PEI is categorically different from single-source: NOT the sum of N × 1-source installs. Chapter 82 integration framework + Reg 826.x family addresses the difference.',
              'Reg 826.1.2.1: overcurrent calculation at EVERY PEI protective device location for ALL configurations + BOTH minimum + maximum current magnitudes. UK 2025-26 typical 4-source PEI = 30-120 calculations.',
              'Reg 826.1.1.4 multi-source isolation: per-source main switch + consolidated warning notice + documented isolation procedure + customer handover pack inclusion.',
              'Reg 551.4.2 multi-source RCD: per-source RCD + central architecture + Type B where smooth-DC fault current + commissioning verification per source combination.',
              'Reg 826.1.1.4 alternative: a single switching device per Reg 537.1.2 capable of isolating all sources simultaneously (vendor-integrated backup gateway approach).',
              'EREC G99 amendment required for ANY new generating source addition. Lead time 4-12 weeks. Without amendment: contractual breach + DNO disconnection risk.',
              'EREC G100 recommissioning required when adding generating source to export-limited site. ELS hierarchy updated. New commissioning cert filed.',
              'Collective PEI (a type defined in the Reg 826.7 contents): apartment blocks + community schemes + shared assets. Adds ownership clarity, master + sub-metering, ESQCR / Ofgem private-wire-supply, multiple EICs + coordinating document.',
              'Multi-source PEI commissioning: 2-3 days labour + £2-5k cost. 10+ distinct verification activities: Reg 643 Part 6 + Reg 551.7.5 + Reg 551.4.2 + Reg 826.1.1.2.2 + Reg 826.1.1.4 + Reg 826.1.2.1 + EREC G99 + G100 + EMS + customer handover.',
              'Documented multi-source isolation procedure: step-by-step + verification + lockout / tagout + capacitor wait time + reverse-restoration. Customer handover pack contains.',
              'Cert evidence bundle structure: integrated PEI EIC + per-technology DoCs + EREC correspondence + MCS handover packs + Reg 826 commissioning records + EMS architecture + customer handover signatures. Typical 30-60 pages.',
              'Cert evidence distribution: customer copy (handover) + DNO copy (G99/G100 closure) + installer archive (6-10 years minimum). Future engineer reads BEFORE attending.',
              'Integrating PEI EIC is a LIVING document. Each substantial change supersedes prior EIC. Chronological succession in cert evidence bundle. Customer handover: latest = operative.',
              'Year-by-year PEI build-out: each addition triggers G99 amendment + Chapter 82 re-evaluation + cert evidence update. Installer scope includes the regulatory + paperwork evolution.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                10.6 Grid-forming vs grid-following
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                10.8 Commissioning + handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
