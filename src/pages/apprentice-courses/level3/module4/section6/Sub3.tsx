/**
 * Module 4 · Section 6 · Subsection 3 — Apply techniques to specialised systems
 * Maps to C&G 2365-03 / Unit 303 / LO6 / AC 6.4 + AC 6.5
 *   AC 6.4 — "specify the procedures for the correction of faults"
 *   AC 6.5 — "specify how electrical systems and equipment can be returned to a
 *             safe and serviceable condition"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 6.4 + 6.5 — apply techniques to
 * three-phase, motor controls, EV charging, PV.
 *
 * Frame: extends Sub2's common-circuit techniques into the specialised systems
 * an L3 apprentice meets — three-phase distribution, single-phase motor
 * controls, EV charging (BS 7671 722), domestic / small-commercial solar PV
 * (BS 7671 712).
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  "Specialised systems — three-phase, EV, PV (6.4/6.5) | Level 3 Module 4.6.3 | Elec-Mate";
const DESCRIPTION =
  "L3 apprentice scope on specialised systems — three-phase distribution boards (Hager Sollysta, Schneider Resi9 3P), single-phase motor controls (DOL starters, contactors), EV charging (BS 7671 722, A4:2026 PNB / Open PEN), domestic solar PV (BS 7671 712). What an apprentice CAN diagnose and rectify under supervision, and where the L3 boundary stops.";

const checks = [
  {
    id: "mod4-s6-sub3-three-phase-balance",
    question:
      "You're investigating a three-phase Hager Sollysta 3P+N board on a small workshop. The customer reports the unit's lights flicker and the welding bench's contactor occasionally drops out. You measure phase voltages at the incomer — L1-N 230 V, L2-N 218 V, L3-N 245 V. What does this tell you?",
    options: [
      "Type B RCDs (designed for DC residual currents from power-electronics loads like EV chargers, PV inverters, VSDs) have wider trip-time tolerances than Type AC and Type A — at I&Delta;n the BS 7671 limit is 300 ms maximum (Tables 41.1A / 41.1B), so 280 ms is within spec but at the high end. CORRECTION: confirm the test was done correctly (instrument calibrated, 0&deg; and 180&deg; phase angles tested for AC components, smooth DC residual current tested for the Type B characteristic), and CHECK 5&times;I&Delta;n trip-time which should be under 40 ms — if 5&times; is also at the upper end, the RCD may be approaching end of life and replacement is prudent. Type B RCDs (Doepke DFS4, ABB F204, Hager CDA470F) are expensive (£200&ndash;400) and have longer lead-time than standard Type AC; plan replacement.",
      "Significant phase imbalance. The DNO supply at the cut-out should give all three phases within a few volts of each other, all around 230 V (the UK statutory tolerance is +10% / -6%, so 216&ndash;253 V acceptable). Your readings — L2 218 V (low end of tolerance), L3 245 V (high end) — span 27 V across phases. Probable cause: severe load imbalance somewhere on the supply transformer feeder, OR a partial open-PEN at the DNO side. The flicker on the unit's lights and the contactor drop-out are classic symptoms — the contactor coil voltage drops below holding threshold when L2 sags under additional load. L3 RESPONSE: this is a DNO-side investigation, not an apprentice fix. Document the readings, log the time, escalate to supervisor, supervisor calls the DNO with the readings. NEVER try to 'fix' supply-side imbalance on the customer's side — it's not within scope and it's not the cause.",
      "Battery end-of-life in the residential storage context is usually defined as when usable capacity falls to around 70-80% of nameplate (varies by manufacturer warranty wording). A 10 kWh battery delivering 7 kWh of usable capacity is at roughly 70% — close to the typical 10-year warranty threshold. Whether the customer replaces depends on economics: the existing battery may still serve daily PV self-consumption usefully even at 70% capacity; the manufacturer warranty may trigger a free or subsidised replacement; second-life battery applications are emerging. Decommissioning is hazardous-waste handling, not skip handling.",
      "DC-side checks — string voltage at open circuit (matched against design Voc), string short-circuit current (matched against design Isc), polarity at the inverter input. AC-side checks — inverter switch-on, anti-islanding test (simulated grid disconnect), generation meter accuracy, export verification with smart meter. System functional check — inverter MPPT operation under load, error log review. Performance check — irradiance at commissioning, instantaneous output compared against expected output for current irradiance. All recorded in the MCS commissioning records and the inverter datalog. Plus the safety signage at all isolation points and the meter position.",
    ],
    correctIndex: 1,
    explanation:
      "Three-phase imbalance at the cut-out is a DNO-side issue. The L3 apprentice's job is to recognise it (phase voltages diverging beyond a few volts), document it accurately, and escalate. Customer-side rectification cannot fix supply-side imbalance and may introduce additional hazards.",
  },
  {
    id: "mod4-s6-sub3-ev-pen",
    question:
      "A domestic 7.4 kW EV charger (Wallbox Pulsar Plus) on a TN-C-S supply has been intermittently disconnecting the vehicle. The Wallbox display shows 'PEN fault'. What's the BS 7671 722 / A4:2026 framework here?",
    options: [
      "Reg 4(2) puts the duty on every employer and on every employee — and Reg 16 on every person working with electrical systems. For the L3 apprentice doing fault diagnosis: (1) the system you're working on must be assessed for its 'as-found' safety BEFORE work starts (visual inspection of CU, supply, bonding, signs of damage); (2) any departures from safe construction must be recorded and not made worse by your work; (3) when you correct the fault, the corrected system must satisfy Reg 4 — i.e. you don't leave the installation in a worse state than you found it; (4) any defect that you can't fix safely is escalated for further work or for advisory documentation to the customer.",
      "Five high-frequency locations. (1) Outdoor sockets (BG / MK weatherproof) — gasket degradation, water ingress at the unused socket, RCD trip on rain. (2) Garden lighting transformers / converters — internal moisture from condensation; replacement standard. (3) Outdoor lighting fittings (security lights, post lights) — sealed fittings break their seal over years; water gets in, IR fails. (4) Conduit / containment — UV degradation of PVC, frost cracking, rodent damage. (5) Cable runs underground — settlement, root damage, archaeological dig damage; rare but significant. Brand patterns: BG / MK weatherproof outdoor sockets typically last 10 years before gasket replacement; cheap unbranded outdoor sockets fail in 2–3 years.",
      "DC current does not have a natural zero-crossing twice per cycle the way AC does — once a DC arc strikes between contacts, it is much harder to extinguish. A standard AC isolator (BS EN 60947-3 AC-22B) uses the AC zero-crossing to break the arc; opening it under DC load will allow the arc to sustain across the contacts, weld them, and create a fire hazard. DC isolators (BS EN 60947-3 DC-PV1 or DC-PV2) have specially designed contacts (multiple breaks in series, magnetic blow-out, longer travel) to break DC arcs reliably. Common UK products: Santon DC switches, ABB OTDC, Hager SBN. L3 RULE: NEVER open an MC4 connector under DC load (no arc-quenching at all); always switch the DC isolator OFF first; verify dead at the inverter DC terminals before disconnecting any DC connection.",
      "BS 7671 722 (A4:2026) requires PEN fault protection on EV charging installations on TN-C-S because of the open-PEN hazard. The Wallbox Pulsar Plus has built-in PEN fault detection — it monitors the L-N voltage and the L-PE voltage, and disconnects the vehicle if it detects a divergence indicating a possible open PEN. Intermittent 'PEN fault' messages typically point to either (a) a real intermittent open PEN somewhere upstream (a DNO issue — escalate immediately), OR (b) a marginal install where the PEN-detection threshold is too tight for normal supply variation. L3 RESPONSE: measure the supply L-N, L-E, N-E at the cut-out under different load conditions; if N-E exceeds 5&ndash;10 V at any load condition, that's evidence of a PEN issue and a DNO call. If N-E is consistently low and the charger still trips, escalate to supervisor — may need a settings review or an earth electrode added (TT conversion of the EV circuit, which is one of the BS 7671 722 options).",
    ],
    correctIndex: 3,
    explanation:
      "BS 7671 722 (A4:2026) deals with the EV charging requirements including PEN fault protection. The L3 apprentice's job is to recognise the symptom, measure the supply, and escalate; never disable PEN detection (would breach BS 7671 and create a real shock hazard for the EV user).",
  },
  {
    id: "mod4-s6-sub3-pv-isolation",
    question:
      "You're investigating a fault on a domestic 4 kWp solar PV system. The customer reports the inverter (Solis 4G 4kW) is showing 'isolation fault'. You arrive at midday on a sunny day. What's the L3 isolation routine before you do ANYTHING?",
    options: [
      "Capacity factor is the ratio of actual annual energy output to the energy that would be produced if the system ran at rated output 24/7/365. UK averages — domestic PV roughly 10-12 percent (winter is short and dim, no output at night, partial output on cloudy days). Suburban micro-wind 5-15 percent (low average wind, turbulence from buildings). Rural exposed-site micro-wind 20-30 percent. Micro-hydro 50-80 percent (water flows continuously, especially in upland UK). Capacity factor matters because it converts a system rating (kW) into annual energy yield (kWh) — a 10 kW PV array at 11 percent CF produces about 9,650 kWh per year; a 10 kW micro-hydro at 60 percent CF produces about 52,500 kWh per year for the same nameplate. Micro-hydro at the right site is dramatically more energy-productive than PV or wind.",
      "PV systems have TWO supplies — the AC side from the consumer unit (which you isolate at the PV breaker / RCBO), AND the DC side from the panels themselves. The DC side is LIVE WHENEVER LIGHT FALLS ON THE PANELS — at midday on a sunny day each panel produces 30&ndash;40 V DC, and a string of 12 panels delivers 350&ndash;480 V DC. Isolating the AC alone leaves the DC fully live up to the inverter input terminals. L3 ROUTINE: (1) Isolate the AC side at the dedicated PV breaker; lock-off; prove dead at the inverter AC terminals. (2) Identify the DC isolator (BS EN 60947-3 DC-PV2 rated, typically a Santon or similar mounted next to the inverter) and switch it to OFF. (3) Prove dead at the inverter DC terminals with a DC-rated meter (Fluke 117 on V DC; Megger MFT). (4) NEVER attempt to disconnect MC4 connectors under load — they are NOT designed for breaking DC current and will arc-flash. (5) If access to the panels themselves is needed, COVER them with an opaque tarp before any work on the array side.",
      "Yes, even though there's no injury. RIDDOR Reg 7 lists 'dangerous occurrences' separately from injuries. Schedule 2 includes 'any explosion or fire which results in stoppage of the affected equipment for more than 24 hours' but the more directly applicable list is the 'electrical short circuit or overload attended by fire or explosion which results in the stoppage of the plant involved for more than 24 hours...' — for a personal contact event without injury the actual report category is more nuanced. In practice the firm should treat any unintended live contact as a near-miss for internal logging; some categories also become formally reportable depending on the facts. The L3 instinct: log it, report it internally, then check the formal RIDDOR list before deciding to send the F2508.",
      "The pack: BS 7671 EIC for the electrical work; PV-specific commissioning record (Voc, Isc, IR, polarity per string, recorded per IEC 62446-1 / MCS MGD 003); MCS Commissioning Certificate (the MCS-certified installer sign-off — required for SEG eligibility); inverter type-test certificate (for DNO G98 / G99 acceptance); array layout drawing; single-line electrical schematic; DC and AC isolator location plan; manufacturer manuals for inverter and panels; G98 notification copy or G99 Connection Offer. The customer needs these for: SEG tariff registration (supplier wants the MCS certificate); house sale (next owner needs the pack); next EICR (inspector wants the previous test evidence); insurance claim (insurer wants evidence of compliant install). Lost packs cost real money to reconstruct.",
    ],
    correctIndex: 1,
    explanation:
      "PV systems are the canonical 'two supplies' situation. The DC side is live as long as light hits the panels; standard AC isolation does not make the system safe. The L3 apprentice's first move is to recognise the dual-supply nature and apply the BS 7671 712 isolation routine (AC isolator OFF; DC isolator OFF; prove dead at both; cover panels if needed).",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the diagnostic approach for a three-phase induction motor that runs but draws excessive current on one phase?",
    options: [
      "(a) OTHER PERSONNEL — other trades on site lose lighting / power for tools, may need to stop work; the firm's lone-working procedure may need adjusting. (b) CUSTOMER/CLIENT — loss of business activity, freezer stock at risk, computers go down (data loss risk), contractual penalties on commercial sites, customer dissatisfaction. (c) PUBLIC — emergency exits may go dark, public-area lighting fails, accessible plant rooms become hazardous, security systems may shut down. (d) BUILDING SYSTEMS — fire alarm goes into fault (with audible alert), emergency lighting batteries enter discharge cycle, lift goes to ground floor and stops, BMS may fault and require manual reset, refrigeration cycles interrupt, motors may auto-restart on power restoration with safety implications.",
      "Probable cause is a 'single-phasing' condition — one phase has lost supply (broken cable, blown HRC fuse, faulty contactor pole) while the other two phases continue to feed the motor. The motor continues to rotate (driven by the remaining two phases) but draws much higher current on those phases (typically 1.7&times; normal full-load current) and runs hot. L3 DIAGNOSTIC: ISOLATE; PROVE DEAD; INSPECT the supply at the motor terminals — measure each phase voltage and each phase current with the clamp meter (Fluke 376 FC) on a re-energised motor; the missing phase reads zero. Walk back upstream — DOL starter, isolator, distribution board — until you find the open. Most common causes: HRC fuse blown (replace; investigate why it blew), contactor pole burnt (replace contactor), cable damaged in containment (re-route or replace section). CORRECTION: restore the missing phase; verify all three phases now share current within 10%. The motor's overload protection should have caught the single-phasing — if it didn't, check the overload settings.",
      "Recognise that the diversity calculation is more complex than a simple sum and flag the constraint to the MCS-certified designer. The headline maximum could be heat pump (7 kW) plus EV (7.4 kW) plus shower (9.5 kW) plus oven (4 kW) = around 28 kW = around 122 A on single-phase 230 V — well above any typical UK domestic main fuse. The diversity calculation accounts for: (1) which loads can run concurrently in practice; (2) the heat pump's actual draw being typically below nameplate (compressor modulates); (3) the dynamic load management on the EV charger; (4) the battery's ability to time-shift loads away from peak; (5) the PV's contribution to net property draw during the day. The MCS-certified designer runs the calculation per the IET On-Site Guide. The apprentice's job is to flag the constraint and not just bolt the loads on without checking.",
      "A transient is a brief (microseconds to milliseconds) over-voltage spike — typical magnitudes 1 kV to 6 kV (lightning-induced can reach 20 kV+). Sources: (1) lightning strikes (direct or induced from nearby strikes). (2) switching events — large inductive loads (motors, transformers) creating back-EMF spikes when switched off. (3) fault clearing — supply network faults causing brief over-voltages on the consumer's side. (4) capacitor switching on power-factor correction equipment. Damage: solid-state devices (LED drivers, electronic boards, computers) have peak-voltage tolerance below the transient magnitude. Single transient can fail an entire LED ceiling rose array. Protection: SPDs (Surge Protective Devices) under BS 7671 443.",
    ],
    correctAnswer: 1,
    explanation:
      "Single-phasing on three-phase motors is one of the most damaging faults — the motor doesn't stop, it just draws much higher current on the remaining phases until thermal overload trips. The L3 diagnostic walks the supply path looking for the open phase; the correction restores the phase and investigates why the protection failed to trip earlier.",
  },
  {
    id: 2,
    question:
      "A direct-on-line (DOL) motor starter with a thermal overload (Schneider TeSys, Siemens Sirius) is repeatedly tripping. The motor is healthy. What are the diagnostic steps?",
    options: [
      "Fire alarm panels under BS 5839-1 monitor the system for earth faults on the detection / sounder circuits. An EARTH FAULT indication means there's a connection (typically high-resistance) between one of the system conductors and earth — could be water ingress at a detector / sounder, damaged cable, contaminated terminal. The fault doesn't immediately stop the alarm working but it compromises the system's ability to operate reliably and may mask other faults. L3 action: (1) Document the fault on the fire log book. (2) Isolate the affected zone (panel will let you do this) so you can investigate. (3) IR test each loop / circuit on the affected zone. (4) Find and rectify; retest; restore. (5) Inform the customer's responsible person under RR(FS)O 2005.",
      "PAS 2035 (Publicly Available Specification — Retrofitting dwellings for improved energy efficiency) is the standard that governs domestic energy efficiency retrofit projects. It requires a 'whole-house' approach — fabric assessment, ventilation strategy, moisture risk management, and any retrofit measures (including heat pump installation) must be coordinated by a Retrofit Coordinator and designed by a Retrofit Designer. Required for grant-funded retrofits (ECO4, Boiler Upgrade Scheme in some cases, local authority schemes). Helps avoid the failure mode where a heat pump is fitted to an uninsulated leaky house and posts a poor SCOP. The MCS-certified heat pump installer works within the PAS 2035 framework on grant-funded projects.",
      "Three-step diagnostic. (1) MEASURE the motor's actual running current with a clamp meter under normal load — should be at or below the motor's nameplate Full Load Amps (FLA). If the motor is running over-current, the load is excessive (tight bearing, jammed driven equipment, undersized motor for the application) — investigate the mechanical load. (2) CHECK the overload setting on the starter — should be set to the motor's FLA from the nameplate (typically 1.0&times; FLA, sometimes 1.05&times; for ambient compensation). If the overload is set too low (e.g. 0.7&times; FLA), it will trip on normal running. (3) CHECK the overload itself — old bi-metal overloads degrade and trip at lower currents than calibrated; replacement is straightforward and inexpensive. NEVER disable the overload to 'stop the trips' — the overload exists to protect the motor windings from burnout; without it the motor will fail catastrophically. The CORRECTION is to identify the cause and fix it (mechanical load, wrong setting, degraded overload).",
      "Thermal runaway is a self-sustaining exothermic chemical reaction inside the cell. Once it starts in one cell (typically triggered by internal short circuit, mechanical damage, overcharge, or sustained over-temperature) the heat from that cell propagates to the next cell, which also enters runaway, and so on through the pack. The reaction releases flammable and toxic gases (including hydrogen fluoride and carbon monoxide) and can reach 600+ degC. Standard CO2 or dry-powder extinguishers do not stop a runaway battery — water is used to cool surrounding cells and limit propagation, but the cell itself burns until its energy is spent. This is why siting, fire separation and the BMS exist — to prevent and contain runaway.",
    ],
    correctAnswer: 2,
    explanation:
      "DOL overload trips are protection working correctly until proven otherwise. The L3 apprentice's diagnostic walks through load, setting and overload condition before touching the protection. Disabling the overload is dangerous and may breach BS 7671 433 (protection against overload current).",
  },
  {
    id: 3,
    question:
      "A 22 kW (32 A per phase) commercial EV charger on a TT-supplied site is failing periodic RCD trip-time tests. The Type B 30 mA RCD is reading trip-times of 280 ms at I&Delta;n. What's the analysis and correction?",
    options: [
      "STOP. Asbestos is a notifiable hazardous material under the Control of Asbestos Regulations 2012 — even a small amount in an old DB. (1) STOP work immediately, do not disturb further. (2) ISOLATE the area (the customer and other trades out of the room). (3) DOCUMENT what you found (mobile photo from a safe distance — do NOT touch). (4) ESCALATE to the supervisor — the supervisor coordinates a licensed asbestos contractor (HSE-licensed for asbestos removal work). (5) NEVER attempt removal yourself; an L3 apprentice is not licensed for asbestos. The cost of getting this wrong is health-life — asbestos-related disease has a 20–40 year latency, and the legal liability is criminal.",
      "Building Regulations Part L (Conservation of Fuel and Power) applies to new build, extensions and major renovations. Heat pump installs in those contexts must demonstrate compliance with the relevant Part L primary energy and carbon emissions targets, typically through SAP (Standard Assessment Procedure) for dwellings. The Future Homes Standard expected to bring fossil-fuel boilers off new-build from 2025 elevates heat pumps to the default route for new-build. MCS MIS 3005 sits alongside Part L — MCS proves the installer is competent, Part L sets the building energy targets, and the SAP calculation that informs Part L compliance uses MCS-style heat-loss and SCOP methodology.",
      "The DNO (Distribution Network Operator) is the company that owns and maintains the local low-voltage and medium-voltage distribution network — the poles, cables and substations between the National Grid and the customer meter. There are six DNO regions in Great Britain (UK Power Networks, Northern Powergrid, SP Energy Networks, Electricity North West, National Grid Electricity Distribution, SSEN). The DNO is NOT the supplier — the supplier sends the customer bill but does not own wires. You find the DNO from the postcode (the ENA Distribution map) or from the MPAN supply number at the customer meter (digit 1 of the bottom-line MPAN identifies the supply area). G98 / G99 notifications go to the relevant DNO, not to OFGEM, not to the supplier.",
      "Type B RCDs (designed for DC residual currents from power-electronics loads like EV chargers, PV inverters, VSDs) have wider trip-time tolerances than Type AC and Type A — at I&Delta;n the BS 7671 limit is 300 ms maximum (Tables 41.1A / 41.1B), so 280 ms is within spec but at the high end. CORRECTION: confirm the test was done correctly (instrument calibrated, 0&deg; and 180&deg; phase angles tested for AC components, smooth DC residual current tested for the Type B characteristic), and CHECK 5&times;I&Delta;n trip-time which should be under 40 ms — if 5&times; is also at the upper end, the RCD may be approaching end of life and replacement is prudent. Type B RCDs (Doepke DFS4, ABB F204, Hager CDA470F) are expensive (£200&ndash;400) and have longer lead-time than standard Type AC; plan replacement.",
    ],
    correctAnswer: 3,
    explanation:
      "Type B RCDs are the protection device of choice for power-electronic loads. The L3 apprentice should know the trip-time limits (300 ms at I&Delta;n, 40 ms at 5&times;I&Delta;n) and the practical interpretation — readings at the upper end suggest the device is ageing and replacement is sensible even if technically still within spec.",
  },
  {
    id: 4,
    question:
      "A domestic 4 kWp PV system's optimisers (SolarEdge P370) are reporting 'array fault' on one panel out of 12. The inverter shows reduced output. What's the diagnostic?",
    options: [
      "Optimiser-based PV (SolarEdge, Tigo) gives panel-level diagnostics through the inverter's monitoring portal — that's a major advantage for fault location. The 'array fault' on a specific panel typically points to: (a) the optimiser itself (rare, but possible — the integrated MPPT in the optimiser can fail); (b) the panel itself (cell-level damage, microcracks, hot-spot); (c) the cable / MC4 connector between the optimiser and the panel (water ingress in the connector is the most common cause); (d) shading on that specific panel that the system isn't compensating for. L3 DIAGNOSTIC: with the system safely isolated (full PV isolation routine — AC + DC + cover panels if needed), inspect the affected panel and its connectors; check the MC4 connectors for water / corrosion; check the optimiser's terminal connections; if everything is sound, the next step is a sun-up I-V curve trace by a specialist, or panel replacement if the cause is not found.",
      "Three-step diagnostic. (1) MEASURE the motor's actual running current with a clamp meter under normal load — should be at or below the motor's nameplate Full Load Amps (FLA). If the motor is running over-current, the load is excessive (tight bearing, jammed driven equipment, undersized motor for the application) — investigate the mechanical load. (2) CHECK the overload setting on the starter — should be set to the motor's FLA from the nameplate (typically 1.0&times; FLA, sometimes 1.05&times; for ambient compensation). If the overload is set too low (e.g. 0.7&times; FLA), it will trip on normal running. (3) CHECK the overload itself — old bi-metal overloads degrade and trip at lower currents than calibrated; replacement is straightforward and inexpensive. NEVER disable the overload to 'stop the trips' — the overload exists to protect the motor windings from burnout; without it the motor will fail catastrophically. The CORRECTION is to identify the cause and fix it (mechanical load, wrong setting, degraded overload).",
      "Head is the vertical distance the water falls through the turbine — measured in metres. Head times flow rate (cubic metres per second) times gravity gives the available power. Different turbine technologies suit different head ranges: Pelton wheel (impulse turbine) for high head 50-300 m typical UK upland; Turgo (impulse) for medium-high head 30-200 m; Crossflow (impulse / reaction hybrid) for medium head 5-50 m; Kaplan or propeller (reaction) for low head under 10 m typical lowland river. Archimedes screw for very low head 1-5 m and high flow — popular on canal and river weir sites because it is fish-friendly. The MCS-certified hydro designer picks the turbine based on the head and flow at the specific site. The L3 electrician handles the grid connection regardless of the turbine choice.",
      "Water flows much of the year (especially in upland UK) so a hydro system produces something most days. Capacity factor 50-80 percent is realistic at a good site. PV needs daylight (CF 10-12 percent UK); wind needs wind (CF 20-30 percent rural exposed, 5-15 percent suburban). Hydro should be the dominant UK micro-renewable on capacity factor. It is not — because (1) sites are limited (need head + flow + watercourse access), (2) the Environment Agency / SEPA / NRW abstraction and impoundment licensing process can run 1-3 years, (3) civil works (intake, penstock, powerhouse, tailrace) cost £30-100k for a domestic-scale install, (4) most sites with the right hydrology are remote rural where the connection cost to the DNO can run tens of thousands. Where the site and the licensing line up, micro-hydro is excellent — but the qualifying sites are scarce.",
    ],
    correctAnswer: 0,
    explanation:
      "Optimiser-based PV systems give panel-level diagnostics that string-only systems can't match. The L3 apprentice can identify the specific panel from the monitoring portal, isolate the system safely, and inspect the panel and connectors. Replacement of the optimiser or panel itself is supervised work; the diagnostic is well within L3 scope.",
  },
  {
    id: 5,
    question:
      "BS 7671 722.411.4.1 (A4:2026) sets out the requirements for protection against electric shock on EV charging installations using a TN supply. What are the three permitted approaches?",
    options: [
      "Continuity proving (sometimes 'continuity check') is a quick low-current test (typically 200 mA on the MFT or multimeter on continuity range) to confirm a connection exists — yes/no, not a precise measurement. R1+R2 is a precise measurement of the loop resistance of a complete circuit (line + protective conductor). For fault diagnosis: continuity proving is used to quickly verify that an isolation has fully disconnected a circuit (continuity from supply to load reads OPEN); R1+R2 is used to precisely characterise a circuit's loop resistance for comparison against expected design values. Both have their place; the L3 apprentice uses them at different stages.",
      "Three approaches per BS 7671 722.411.4.1 (A4:2026). (1) PEN FAULT DETECTION DEVICE (built into the charger — Wallbox, Pod Point Solo 3, EO Mini Pro 3, Andersen A2 all have this). The charger monitors the L-N and L-PE voltages and disconnects on PEN compromise. (2) EARTH ELECTRODE on the EV circuit — convert the EV circuit only to TT, with an earth electrode local to the charger (Megger ES2000 measures the electrode resistance — should be under 200 &Omega; for the typical 30 mA RCD arrangement). (3) DUAL EARTHING SYSTEM — main installation stays TN-C-S, EV circuit has dedicated earth electrode in addition. L3 APPLICATION: most domestic installs use the integrated PEN detection in the charger. Larger commercial may use TT conversion. The L3 apprentice's job is to recognise which approach the install uses, document it on the certificate, and respect the protection if rectifying anything on the EV circuit.",
      "Export limitation caps the maximum kW the system is allowed to send back to the grid, regardless of how much the array can produce. Implemented by a current transformer (CT) clamp at the supply head, feeding a smart meter or export controller that throttles the inverter when export approaches the limit. The DNO requires it where adding the customer full inverter output to the local network would push voltage outside statutory limits or exceed substation thermal capacity. A 5 kWp array might be limited to 3.68 kW export with the rest used on site (charge a battery, run a heat pump, charge an EV). The MCS designer specifies the limiter; the L3 electrician fits the CT and routes the data cable to the inverter.",
      "Older fixed-speed heat pumps run the compressor at full output or off — short-cycling repeatedly to match a partial load. Each start consumes electricity and stresses the compressor. Modern inverter-driven units vary the compressor speed continuously to match the actual heat demand — running at 30 to 100 percent capacity smoothly. The result is better SCOP (less wasted starting energy), longer compressor life, quieter operation and more comfortable indoor temperatures. Almost every new domestic ASHP sold in the UK is inverter-driven. The L3 electrician sizes the supply to the rated nameplate current (the compressor at full speed); the variable-speed control is internal to the unit.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 722 (A4:2026) is the EV charging chapter. The L3 apprentice should know the three permitted approaches to PEN fault protection and which approach a given install uses. A4:2026 strengthened these provisions in response to the growing EV market and the open-PEN hazard.",
  },
  {
    id: 6,
    question:
      "BS 7671 712 (Solar PV) requires DC isolation in addition to AC. Why is the DC isolator different from a standard AC isolator?",
    options: [
      "Smoke Control Areas (SCAs) are defined under the Clean Air Act 1993 — almost every UK urban / suburban area is in an SCA. In an SCA it is an offence to emit smoke from a domestic chimney unless burning an authorised fuel in an authorised appliance (the Defra exempt appliance list). For biomass this means new installs must use Defra-approved Ecodesign-compliant boilers / stoves burning approved pellets / logs. Many older biomass installs in SCAs do not meet current Ecodesign and may be operating in breach. Local Authorities have enforcement powers including fixed-penalty notices. The L3 apprentice does not enforce SCAs but should recognise that 'just fitting a wood-burning stove' is regulated in most populated areas — the customer needs to verify the unit and the fuel are SCA-compliant.",
      "Customer name and address; installer name and MCS certification number; install date; technology and rating (e.g. 5 kWp PV with 10 kWh battery); manufacturer and model details for the major components; performance estimate (annual generation kWh, SCOP, etc.); MCS Installation Standard reference (e.g. MIS 3002 v6.0); Workmanship Warranty period and what it covers; aftercare contact details. The certificate is the customer's proof of MCS-certified installation, used for BUS grant, SEG enrolment, manufacturer warranty registration and future house sale.",
      "DC current does not have a natural zero-crossing twice per cycle the way AC does — once a DC arc strikes between contacts, it is much harder to extinguish. A standard AC isolator (BS EN 60947-3 AC-22B) uses the AC zero-crossing to break the arc; opening it under DC load will allow the arc to sustain across the contacts, weld them, and create a fire hazard. DC isolators (BS EN 60947-3 DC-PV1 or DC-PV2) have specially designed contacts (multiple breaks in series, magnetic blow-out, longer travel) to break DC arcs reliably. Common UK products: Santon DC switches, ABB OTDC, Hager SBN. L3 RULE: NEVER open an MC4 connector under DC load (no arc-quenching at all); always switch the DC isolator OFF first; verify dead at the inverter DC terminals before disconnecting any DC connection.",
      "(1) Symptoms — customer's words in quotes, timeline, conditions, what they've tried. (2) Hypothesis — what you think is wrong and why. (3) Test plan — which tests, in which order, what each will distinguish. (4) Test results — readings, with timestamps and instrument IDs. (5) Analysis — what the results confirm or refute, updated hypothesis if needed. (6) Fix plan — repair / replace decision, materials needed, expected duration. (7) Fix execution — what was done, post-fix retest readings, customer hand-back. The documentation creates the diagnostic narrative on the job sheet — defensible record of what was found and done.",
    ],
    correctAnswer: 2,
    explanation:
      "DC arc behaviour is fundamentally different from AC arc behaviour, and the isolator must be designed for the supply type. The L3 apprentice's discipline on PV is to use the dedicated DC isolator and never open MC4 connectors under load.",
  },
  {
    id: 7,
    question:
      "What's the L3 apprentice's competence boundary on a three-phase 100 A TP+N distribution board with a complex commercial fault?",
    options: [
      "C1 is the most serious EICR code — Danger Present, immediate action required. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 (and equivalent regulations in Wales / Scotland / NI) require landlords to act on C1 findings within 28 days, and IMMEDIATELY where the danger is live-and-present. The rectification, certificate (MWC), Schedule of Remedial Works closing the C1, and confirmation back to the landlord need to be turned around within the regulation timeline. A landlord who fails to act on a C1 within 28 days faces a fine of up to £30,000 per breach. The L3 apprentice's job is to do the work, document it, and ensure the landlord has the proof of closure to file.",
      "MCS commissioning certificate (the MCS-certified installer sign-off — required to claim Smart Export Guarantee tariff), the inverter type-test certificate, the array layout drawing, the single-line electrical schematic, the DC and AC isolator location plan, the BS 7671 EIC for the electrical work, the manufacturer manuals for inverter and panels, and the G98 notification copy filed with the DNO. The pack lives with the property — when the customer sells, the next owner needs it for their EICR and to maintain SEG eligibility. Lost packs cost real money to replace, especially the MCS commissioning certificate. Hand the pack over physically and email a digital copy.",
      "Classic capacitor failure. The run capacitor on a single-phase induction motor provides the phase shift between the run winding and the start winding that creates the rotating field needed to start the motor. If the capacitor degrades (electrolytic dries out, paper-and-foil constructions go open) the motor energises but can't start — it draws stalled-rotor current, hums, and trips on thermal overload after 10&ndash;30 seconds. Diagnostic: ISOLATE; PROVE DEAD; DISCHARGE the cap through a 5&ndash;10 k&Omega; resistor (live-storage hazard); MEASURE the cap with the MFT capacitance function (should read within ±10% of marked value, e.g. 16 µF reads 14.4&ndash;17.6 µF; failed caps read near zero or open). CORRECTION: replace the cap with same μF value, same voltage rating (typically 250 V AC), same physical size to fit the bracket. Verify the motor starts immediately on energise.",
      "Three-phase commercial work above a certain complexity is at the edge of L3 apprentice scope. PERMITTED under supervision: visual inspection, voltage / current measurement, basic continuity / IR testing on isolated circuits, replacement of single-phase circuits at the board, replacement of like-for-like protective devices. NOT PERMITTED at L3 apprentice level (or only under direct supervision, with the supervisor making the decisions): live three-phase diagnosis (significant arc-flash risk on a 100 A 3-phase supply), three-phase motor control / VSD work, complex protection co-ordination changes, anything involving busbar work. The L3 apprentice's response when a job exceeds scope is to STOP and ESCALATE — the supervisor either takes over, sends additional resource, or the work goes to a JIB Approved Electrician with relevant additional qualifications. EAWR Reg 16 (competence) makes this not optional.",
    ],
    correctAnswer: 3,
    explanation:
      "Knowing the boundary of L3 apprentice scope is part of L3 competence. Three-phase commercial work involves higher voltages, higher prospective fault currents, higher arc-flash energy, and more complex protection arrangements. The L3 apprentice contributes within scope and escalates beyond it — that's not weakness, it's the EAWR Reg 16 competence duty applied correctly.",
  },
  {
    id: 8,
    question:
      "An EICR has flagged a missing supplementary bonding in a domestic bathroom. The bathroom has plastic plumbing (push-fit / pex) throughout. Is the supplementary bonding required and what's the correction?",
    options: [
      "BS 7671 701.415.2 (A4:2026) — supplementary bonding in bathrooms is REQUIRED unless ALL the following are met: (1) all final circuits in the bathroom are RCD-protected at 30 mA OR LESS; (2) all extraneous-conductive-parts in the bathroom are insulated from earth (which plastic plumbing achieves for pipework, but check radiators, towel rails, metal trims) — i.e. they're not at risk of being raised to a different potential. If both conditions are met, supplementary bonding is NOT required. CORRECTION on a bathroom with plastic plumbing AND 30 mA RCD on all circuits — measure the metal towel rail / radiator / metal frame to verify it's not extraneous (over 22 k&Omega; to true earth confirms isolated; under 22 k&Omega; means it's extraneous and bonding IS required to protect against the still-possible touch-voltage hazard). Document the decision on the certificate with the measured value.",
      "Five-step. (1) Power on — confirm self-test passes (Megger and Kewtech both run automatic self-tests on power-up). (2) Continuity — short the leads together; reading should be the lead resistance (typically 0.10–0.30 Ω) with audible buzzer; null the leads if the unit supports it. (3) Insulation resistance — connect leads together, press test at 250 V — should read &gt;999 MΩ (open circuit). (4) Loop / EFLI — connect to a known live socket; reading should match known reference for that location (or be plausible — typically 0.4–1.5 Ω at a domestic socket). (5) RCD — check on a known-good RCD outlet; trip-time should match the RCD's rating. Five minutes; catches drift, battery issues, lead damage.",
      "Three-step investigation. (1) Check the load — modern variable-speed motors (blender, food processor, induction hob) and switch-mode PSUs can produce arcing-like waveform signatures that less-discriminating AFDDs interpret as faults. Older AFDDs are more prone to nuisance tripping than newer models. (2) Check for actual loose connections on the circuit — a marginal terminal on the kettle plug, a worn socket contact, a cracked accessory back-box can produce real arc signatures the device is correctly detecting. (3) Check the AFDD itself — older / lower-cost devices may be at end of life, more recent BS EN 62606 compliant devices have better discrimination. The fix depends on what you find: tighten loose terminations, replace worn accessories, upgrade to a better AFDD model, or escalate to specialist if the cause isn\\\\\\\\'t locally diagnosable.",
      "The increase suggests something in the rectification has added resistance. Possible causes: (1) the new accessory's terminations are higher resistance than the originals (under-torqued, dirty, oxidised), (2) the rectification involved a new joint that wasn't there originally (junction box, Wago connector), (3) the cable conductors were inadvertently nicked during the work, (4) a CPC was missed and the only return path is via the bonding network (high resistance). The L3 apprentice's response is — STOP, recheck terminations to manufacturer torque, retest, and only sign off when the readings are within reasonable tolerance of the original (typically ±10% acceptable for the same circuit / same instrument). Comparison against the original is the catch that prevents 'looks fine' rectifications passing.",
    ],
    correctAnswer: 0,
    explanation:
      "Supplementary bonding in bathrooms is one of the most-misunderstood requirements. BS 7671 701.415.2 (A4:2026) gives a specific exemption when all final circuits are RCD-protected AND all metalwork is insulated from earth. The L3 apprentice's verification is to MEASURE rather than assume; the measured value goes on the certificate as evidence.",
  },
];

const faqs = [
  {
    question: "Can an L3 apprentice work on a 415 V three-phase installation?",
    answer:
      "Under direct supervision, yes — visual inspection, measurement, isolation, like-for-like replacement of single-phase circuits at the board, basic test work. The supervisor stays close, makes the decisions on isolation strategy, and signs the certificate. Live diagnostic work on three-phase 415 V is at the upper edge of apprentice scope because the arc-flash energy is much higher than single-phase 230 V (typical UK three-phase prospective fault current is 6&ndash;25 kA at 415 V), and the consequences of contact are correspondingly more severe. Most firms do not let apprentices lead three-phase work; the apprentice assists, learns and progresses to lead-status as competence (and qualifications, e.g. C&G 2391/2395) develops post-apprenticeship.",
  },
  {
    question: "What's a Type B RCD and why is it needed for EV charging?",
    answer:
      "Type B RCDs detect three classes of residual current: AC sinusoidal (which Type AC also detects), pulsating DC (which Type A also detects), AND smooth DC (unique to Type B). Power-electronic loads — EV chargers, PV inverters, large VSDs — produce DC residual currents under fault conditions, and Type AC / Type A RCDs are not guaranteed to detect them (the DC magnetic field saturates the toroidal core and the device fails to trip). BS 7671 722 (A4:2026) requires Type B RCD protection on EV charging unless the charger has integrated DC fault detection (most modern chargers do — Wallbox Pulsar Plus, Pod Point Solo 3, Andersen A2). Type B RCDs are expensive (£200&ndash;400) and the L3 apprentice's job is to recognise when one is required vs when integrated detection covers the requirement.",
  },
  {
    question: "Why does PV always need a DC isolator near the inverter?",
    answer:
      "BS 7671 Section 712 (Solar photovoltaic power supply systems) requires a means of isolating the inverter from the DC side, located so that maintenance can be carried out safely. Without it, the only way to make the DC side safe is to cover the panels with an opaque tarp — impractical on a roof and unsafe to do while working at height under a live array. The DC isolator (Santon, ABB OTDC, Hager SBN, all DC-PV2 rated) gives a definitive means of breaking the DC supply between the array and the inverter. The L3 apprentice's first move on any PV fault is to operate the DC isolator (and verify dead at the inverter DC terminals) before any other action.",
  },
  {
    question: "What's the difference between TN-C-S and PNB on the BS 7671 A4:2026 certificate?",
    answer:
      "Same supply arrangement, evolving terminology. TN-C-S (Terra-Neutral with Combined-then-Separate conductors) is the older name; PNB (Protective Neutral Bonding) is the term that A4:2026 uses for the supply where the customer's earth and neutral are bonded together at the cut-out. On the A4:2026 certificate forms, the supply earthing arrangement field accepts either term — most firms have switched to PNB to align with the new terminology. The technical arrangement is unchanged. The L3 apprentice's job is to know the supply arrangement at the cut-out (read the DNO labelling, measure N-E and L-E at the meter), record it accurately on the certificate, and apply the right protective measures (PEB at the cut-out, earth electrode for TT, PEN fault detection for EV under TN-C-S / PNB).",
  },
  {
    question: "Can I rectify a fault on a fire alarm system as part of an L3 apprentice?",
    answer:
      "Within tight scope. Fire alarm systems are governed by BS 5839-1 (commercial) and BS 5839-6 (domestic) — these are separate standards from BS 7671 and require additional competence. PERMITTED under supervision: replacement of a like-for-like detector head, replacement of a manual call point glass, basic visual inspection, isolation of the system before electrical work nearby. NOT PERMITTED at apprentice level: programming changes to the panel, addition of new detectors, certification of the system (BS 5839-1 service certification requires a competent person with specific qualifications), false alarm investigation beyond the basic level. The L3 apprentice supports fire alarm work; the certification stays with a BS 5839-qualified engineer. Most firms doing fire alarm work have a dedicated fire alarm engineer; the apprentice assists rather than leads.",
  },
  {
    question: "What's the L3 apprentice's role on a 22 kW commercial EV charger install or fault?",
    answer:
      "Assist under supervision. A 22 kW (32 A per phase, three-phase) commercial EV charger is at the upper edge of L3 apprentice scope because of the three-phase voltage, the higher fault currents, the BS 7671 722 (A4:2026) protection requirements, the PEN fault detection considerations, and the typically larger Type B RCD or RDC-DD protection. The supervisor leads; the apprentice provides hands, observation, measurement, like-for-like replacement of small components. The apprentice's certificate authority on this kind of work is limited; the supervisor or a JIB Approved Electrician with EV-specific training (e.g. C&G 2921, BPEC Level 3 Award in EV Charging) signs the cert. Knowing where the boundary is matters as much as the technical knowledge.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 3"
            title="Apply techniques to specialised systems"
            description="Three-phase distribution, single-phase motor controls (DOL, contactors, overloads), EV charging under BS 7671 722 (A4:2026 PNB / Open PEN), domestic solar PV under BS 7671 712. What an L3 apprentice CAN diagnose and rectify under supervision, and the EAWR Reg 16 competence boundary that says when to escalate."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three-phase imbalance (phase voltages diverging beyond a few volts) is normally a DNO-side issue — recognise, document, escalate.",
              "BS 7671 722 (A4:2026) requires PEN fault protection on EV charging under TN-C-S / PNB — PEN-detection charger, TT conversion, or dual earthing.",
              "PV systems have TWO supplies — AC side at the CU, DC side from the panels (live in any light) — both need isolating before any work.",
              "Type B RCDs detect smooth DC residual currents — required for EV / PV / large VSDs unless the equipment has integrated DC fault detection.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Recognise and respond to three-phase imbalance at the cut-out — escalate DNO-side issues, do not attempt customer-side rectification.",
              "Diagnose three-phase induction motor single-phasing using clamp meter readings on each phase.",
              "Apply BS 7671 722 (A4:2026) PEN fault protection requirements to EV charging on TN-C-S / PNB supplies.",
              "Apply BS 7671 712 isolation routine to PV systems — AC isolator, DC isolator, prove dead, never open MC4 under load.",
              "Recognise the L3 apprentice competence boundary on three-phase commercial, EV at scale, fire alarm systems and complex specialised installations.",
              "Apply BS 7671 701.415.2 (A4:2026) supplementary bonding logic to bathrooms with plastic plumbing — measured rather than assumed.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Three-phase distribution + motor controls</ContentEyebrow>

          <ConceptBlock
            title="Three-phase work is at the edge of L3 apprentice scope"
            plainEnglish="The L3 apprentice meets three-phase on small-commercial visits — corner shops, small workshops, restaurants, gyms. A typical Hager Sollysta 3P+N or Schneider Resi9 3P board with a 100 A TP+N main switch, three-phase circuits to motors / heaters, single-phase circuits split across the phases for general loads. Voltages — 230 V phase-to-neutral, 400 V phase-to-phase. Fault currents are higher (typically 6&ndash;25 kA prospective at the cut-out) and arc-flash energy is correspondingly higher than single-phase domestic."
            onSite="The L3 apprentice's typical role on three-phase work is — visual inspection, voltage / current measurement (clamp meter on each phase), isolation, replacement of single-phase circuits at the board, like-for-like replacement of protective devices (with supervisor sign-off). Live three-phase diagnostic and complex motor control work is at the upper edge of scope and is normally led by the supervisor or a JIB Approved Electrician."
          >
            <p>Common three-phase faults the L3 apprentice meets:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Phase imbalance</strong> at the cut-out — DNO-side issue; document and escalate.</li>
              <li><strong>Single-phasing</strong> of three-phase motors — one phase open; motor draws excess current on remaining phases.</li>
              <li><strong>DOL starter overload trip</strong> — investigate load, setting, overload condition before touching the protection.</li>
              <li><strong>Contactor coil drop-out</strong> — check coil voltage stability under load; phase imbalance can cause this on the affected phase.</li>
              <li><strong>VSD / soft-start fault codes</strong> — read the fault code from the drive display; consult the manufacturer's fault-code list; supervisor-led for anything beyond reset.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.7.1 (Verification of automatic disconnection of supply)"
            clause={
              <>
                "The effectiveness of the measures for fault protection by automatic disconnection of supply shall be verified: (a) for TN systems by measurement of the earth fault loop impedance, and verification of the characteristics and/or the effectiveness of the associated protective device (visual inspection in the case of overcurrent protective devices and testing in the case of RCDs); (b) for TT systems by measurement of the resistance of the earth electrode for exposed-conductive-parts of the installation, and verification of the characteristics and/or the effectiveness of the associated protective device."
              </>
            }
            meaning={
              <>
                On three-phase work the L3 verification still hangs off Reg 643.7.1 &mdash; measure earth fault loop impedance, verify the protective device, confirm disconnect time. Three-phase prospective fault current (Ipf) is typically much higher than single-phase &mdash; 6&ndash;25 kA at the cut-out is normal for small-commercial &mdash; so the protective device&apos;s breaking capacity must be at least equal to the Ipf at its location (Reg 434.5.1). Standard 6 kA MCBs may NOT be suitable on the supply side of a small-commercial installation; 10 kA or higher devices (Hager NDN, Schneider C60H, ABB S203M) are normal. The L3 apprentice&apos;s verification work measures Ipf at the cut-out and at downstream sub-boards and confirms each device&apos;s rating is adequate.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.7.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EV charging + BS 7671 722 (A4:2026)</ContentEyebrow>

          <ConceptBlock
            title="The open-PEN hazard is why BS 7671 722 sits where it does"
            plainEnglish="An EV charging point connects a vehicle's bonded chassis to the building's bonded metalwork through the PE conductor of the charging cable. On TN-C-S / PNB supplies, an open PEN fault upstream lifts the customer's bonded earth toward phase voltage relative to true earth — and then anyone touching the vehicle while standing on true earth (the driveway, the road) is exposed to the lifted voltage. BS 7671 722 (A4:2026) is the protection framework that prevents this."
            onSite="Most modern domestic EV chargers (Wallbox Pulsar Plus, Pod Point Solo 3, EO Mini Pro 3, Andersen A2, Project EV Pro Earth) have integrated PEN fault detection — they monitor the L-N and L-PE voltages and disconnect the vehicle if a divergence appears. Older or commercial chargers may need a TT conversion of the EV circuit (dedicated earth electrode, isolated from the main installation's TN-C-S / PNB earth) to provide the protection."
          >
            <p>The three BS 7671 722 (A4:2026) approaches:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>PEN fault detection device</strong> — built into the charger; monitors L-N and L-PE; disconnects on PEN compromise.</li>
              <li><strong>Earth electrode (TT conversion of the EV circuit)</strong> — dedicated electrode local to the charger; EV circuit operates as TT, isolated from the main installation's earth.</li>
              <li><strong>Dual earthing arrangement</strong> — main installation TN-C-S / PNB; EV circuit has additional dedicated electrode in parallel.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Solar PV + the dual-supply hazard</ContentEyebrow>

          <ConceptBlock
            title="PV is the canonical 'two supplies' system — AC and DC both need isolating"
            onSite="A typical 4 kWp domestic PV system has 12&ndash;14 panels in a string, producing 350&ndash;500 V DC at the inverter's DC input under full sun. The DC side is LIVE WHENEVER LIGHT FALLS ON THE PANELS — early morning, late evening, even moonlight gives a few volts, full midday gives the full string voltage. Isolating the AC side at the CU does NOT make the DC side safe; the DC isolator (located adjacent to the inverter) is the dedicated means."
          >
            <p>The L3 PV isolation routine:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>(1) Isolate AC at the dedicated PV breaker</strong> in the CU; lock-off; prove dead at the inverter AC terminals.</li>
              <li><strong>(2) Switch the DC isolator OFF</strong> (Santon, ABB OTDC, Hager SBN — DC-PV2 rated); prove dead at the inverter DC terminals with a DC-rated meter.</li>
              <li><strong>(3) NEVER open MC4 connectors under load</strong> — they are not arc-rated for DC current breaking; would arc-flash and weld.</li>
              <li><strong>(4) If working at the array</strong>, cover the panels with an opaque tarp before any work that involves disconnection.</li>
              <li><strong>(5) When restoring</strong>, DC isolator ON first (allows the inverter to start its sync routine), then AC breaker ON; verify export to grid via the inverter display.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (Solar photovoltaic power supply systems) — DC-side isolation provisions, including residual-energisation warning on combiner boxes / DC isolators"
            clause={
              <>
                Section 712 sets the requirements for the DC side of solar PV installations, including isolation, identification and the requirement that DC-side equipment (combiner boxes, inverter DC isolators) carry a permanent warning that PV arrays and battery storage can continue to feed live parts after local isolation. Routine maintenance must assume DC-side parts are energised even if the AC supply or inverter is off.
              </>
            }
            meaning={
              <>
                BS 7671 Section 712 (A4:2026) sets the DC-side requirements for PV installations. A dedicated DC isolator is needed so the inverter can be safely worked on without exposure to the DC supply; the isolator must be DC-rated (BS EN 60947-3 DC-PV1 or DC-PV2) because standard AC isolators will not safely break DC current. The L3 apprentice&apos;s first move on any PV fault is to identify the DC isolator and operate it before any work near the inverter or DC cabling, and to treat DC-side parts as energised even after local isolation where battery storage or array feed-back is possible.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 7, Section 712 (Solar PV) — DC-side provisions."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Battery storage and the DC-side hazards</ContentEyebrow>

          <ConceptBlock
            title="Why battery storage isn&apos;t just &lsquo;another DC system&rsquo;"
            plainEnglish="Domestic battery storage units (Tesla Powerwall, GivEnergy, Sonnen, Pylontech) sit on the DC side of the inverter and hold lethal stored energy after the AC is isolated. Fault correction needs the manufacturer&apos;s isolation procedure followed in order &mdash; AC down, then battery breaker, then internal isolator."
            onSite="Battery storage faults frequently come back to the BMS rather than the cells &mdash; communications loss, firmware mismatch, temperature sensor failure. The L3 apprentice supports a competent battery-trained engineer; solo unsupervised work on storage is not L3 apprentice scope."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sequenced isolation</strong> &mdash; manufacturer&apos;s order, every time. Out-of-order isolation can damage the BMS or trip the cells into a fault state.</li>
              <li><strong>Stored DC energy</strong> &mdash; cells stay live until physically disconnected; isolating the AC supply doesn&apos;t make the battery safe to touch.</li>
              <li><strong>Thermal runaway</strong> &mdash; rare but catastrophic. A swollen cell, a heat spot or a smell of electrolyte is a STOP and evacuate situation.</li>
              <li><strong>BMS communications</strong> &mdash; loss of comms can mimic a fault. Check inverter / BMS log before assuming a hardware failure.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Heat-pump and inverter-driven loads</ContentEyebrow>

          <ConceptBlock
            title="The new domestic load that breaks legacy assumptions"
            plainEnglish="Air-source heat pumps (Mitsubishi Ecodan, Daikin Altherma, Vaillant aroTHERM) draw smooth DC residual currents, run continuous mid-load profiles for hours, and are protected differently from a conventional immersion. A fault on the heat-pump circuit is rarely the heat pump itself &mdash; usually it&apos;s the protection coordination."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>RCD type</strong> &mdash; Type B is required where the heat pump can produce smooth DC residual; manufacturer data sheet is the source of truth.</li>
              <li><strong>Cable sizing</strong> &mdash; sustained mid-load operation differs from intermittent peak. Verify against the design ambient and grouping factors.</li>
              <li><strong>Soft-start inrush</strong> &mdash; modern inverter-driven heat pumps have low inrush, but legacy single-speed compressors do not. A nuisance trip on first compressor cycle isn&apos;t a fault, it&apos;s a curve mismatch.</li>
              <li><strong>External unit isolator</strong> &mdash; mandatory; inspect first on any fault visit (corrosion, water ingress, terminal condition).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase motor faults — winding insulation, bearing failure and the megger story"
            plainEnglish="A three-phase motor fault often presents as a tripping motor protection relay or a stalled motor that draws abnormal current. The diagnostic is mostly off-line — IR test phase-to-phase, phase-to-earth, with the motor isolated. Healthy windings read tens of megohms; degraded insulation reads under 1 megohm; a shorted winding reads near zero between two phases. Bearing failure presents as locked rotor with high inrush, audible scraping, smoke."
            onSite="At the motor terminal box: isolate, prove dead, lift the line conductors. IR test L1-L2, L1-L3, L2-L3 (winding insulation), then L1-PE, L2-PE, L3-PE (winding-to-frame). All readings above 100 megohms = healthy. One reading low = winding fault. All readings low = water ingress or general insulation degradation. Bearing failure shows by hand — rotate the shaft, feel for roughness or stiffness; listen for grinding when running unloaded. The L3 apprentice escalates motor rewind work to a specialist motor shop; the diagnosis is the apprentice's contribution."
          >
            <p>
              Three-phase motor IR test thresholds:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Above 100 megohms</strong> — healthy windings; safe to
                re-energise after a service.
              </li>
              <li>
                <strong>10-100 megohms</strong> — ageing insulation, monitor
                trend; not a failure but worth flagging on the customer
                record.
              </li>
              <li>
                <strong>1-10 megohms</strong> — degraded insulation;
                investigate cause (water, contamination, thermal cycling);
                consider rewind or replacement.
              </li>
              <li>
                <strong>Below 1 megohm</strong> — failure imminent; do not
                re-energise; refer to motor specialist for rewind or
                replacement decision.
              </li>
              <li>
                <strong>Test voltage</strong> — 500 V DC for LV motors up to
                500 V working; 1000 V DC for sub-mains and HV motors.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EV charger fault tracing — Mode 3 handshake and the OCPP record"
            plainEnglish="EV chargers communicate with the vehicle through the IEC 61851-1 Mode 3 handshake — a sequence of resistive states on the control pilot conductor that signals connect / charge / fault. A failed handshake stops charging without obvious cause. The diagnostic is to inspect the control pilot voltage at the connector, the proximity pilot, and the charger event log. Most modern chargers (Pod Point, Wallbox, Easee, EO, Project EV) push events to a cloud OCPP back-end the L3 apprentice can pull from the manufacturer app."
            onSite="Connect a known-good test vehicle (or a Mode 3 simulator like the Megger EVCA210) to confirm the charger is reaching state B / state C correctly. Read the event log via the manufacturer app — most chargers log every charge cycle, every disconnect, every error code. Cross-reference the customer's reported fault time with the log; the error code points to the cause (RCD trip, control pilot timeout, communication loss, vehicle not authenticated). Common faults: water ingress in the connector, control pilot conductor damaged where the cable enters the unit, OCPP back-end auth failure for tariff-managed chargers."
          >
            <p>
              EV charger diagnostic touchpoints:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Manufacturer app event log</strong> — pulls cloud
                OCPP events; first place to look for a recent fault history.
              </li>
              <li>
                <strong>Control pilot voltage</strong> — measured at the
                connector; idle 12 V DC, vehicle connected 9 V, charging
                6 V, ventilation request 3 V. Off-pattern voltage = pilot
                fault.
              </li>
              <li>
                <strong>Proximity pilot</strong> — confirms cable rating;
                wrong reading triggers a charger refusal-to-charge.
              </li>
              <li>
                <strong>RCD type</strong> — Type B is mandatory under A4:2026
                Section 722 unless the unit has integral DC residual current
                detection rated for the application.
              </li>
              <li>
                <strong>Open-PEN protection</strong> — verify whether built-in
                detection, separate device, or TT electrode arrangement is in
                use; do not bypass.
              </li>
              <li>
                <strong>Connector inspection</strong> — water, dirt,
                corrosion at pins; clean and re-test.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Battery storage fault diagnosis — BMS, contactor and the comms layer"
            plainEnglish="Domestic battery storage (Tesla Powerwall, GivEnergy, SolarEdge, Sonnen) is built around a battery management system (BMS) that monitors cell voltages, temperatures and state of charge. The BMS opens the main contactor on any out-of-range condition. A 'battery offline' fault is rarely the cells themselves — it is more often a BMS comms timeout, a stuck contactor, a balancing issue, or an inverter handshake failure. The L3 apprentice's diagnostic is to read the inverter event log, check the comms cabling, and refer cell-level faults to the manufacturer."
            onSite="Read the inverter app for event logs; battery brands all expose logs to the customer app. Common events: BMS comms loss (check the BMS comms cable from battery to inverter), high cell temperature (check ventilation, ambient, recent heavy cycling), low cell voltage (check inverter charge schedule), contactor trip event (check inverter and battery firmware are mutually compatible). Firmware updates often resolve transient issues. Hardware faults inside the battery enclosure are manufacturer-warranty territory — do not open the cell side without the manufacturer's authorisation."
          >
            <p>
              Common battery-storage fault modes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BMS comms loss</strong> — check the comms cable
                between battery and inverter; loose connector or rodent
                damage common.
              </li>
              <li>
                <strong>Firmware mismatch</strong> — inverter and battery
                firmware versions must be on the supported pair list; update
                via the manufacturer's installer app.
              </li>
              <li>
                <strong>High cell temperature</strong> — check ambient,
                ventilation, and whether the unit has been heavily cycled by a
                tariff schedule.
              </li>
              <li>
                <strong>Inverter handshake failure</strong> — battery and
                inverter from different manufacturers may need bridge
                hardware (CAN-Bus protocol converter); diagnose with the
                installer app.
              </li>
              <li>
                <strong>Cell-level faults</strong> — manufacturer warranty;
                do not open the battery enclosure unless authorised.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.4.1"
            clause={
              <>
                "In a TN system, the integrity of the earthing of the installation depends on the reliable and effective connection of the PEN or PE conductors to Earth. Where the earthing is provided from a public or other supply system, compliance with the necessary conditions external to the installation is the responsibility of the distributor."
              </>
            }
            meaning={
              <>
                Specialised systems (EV, PV, battery, heat-pump) sit downstream of the same TN earthing arrangement. Their fault behaviour depends on the upstream PEN being intact &mdash; a compromised PEN turns an EV chassis or a PV frame into a hazard for anyone touching it from true earth. That&apos;s why supply-side reading at the cut-out comes before any specialised-system fault work.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 411.4.1."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Opening an MC4 connector on a live PV string"
            whatHappens={
              <>
                Apprentice arrives at a PV system fault at midday on a sunny day. Switches off the
                AC breaker in the CU. Goes up to the roof and disconnects an MC4 connector to "have
                a look" at the panel side. The MC4 connector is rated for DC voltage but NOT for
                breaking DC current under load &mdash; the string is delivering 8&nbsp;A at
                400&nbsp;V DC into the inverter. The connector arcs as it separates; the arc
                sustains because DC has no zero-crossing; the connector welds, the cable insulation
                ignites, the apprentice is blinded by the flash and is on a sloping roof. Best case
                &mdash; severe burn and a dropped tool. Worst case &mdash; fall from height plus
                arc-flash injury.
              </>
            }
            doInstead={
              <>
                Switch the DC isolator OFF before any work on the DC side. The DC isolator is
                designed to break DC current safely (multiple breaks in series, magnetic blow-out,
                long contact travel). Verify dead at the inverter DC terminals. THEN access MC4
                connectors if required. NEVER use an MC4 connector to break a live DC circuit.
              </>
            }
          />

          <CommonMistake
            title="Disabling the EV charger's PEN fault detection because it 'keeps tripping'"
            whatHappens={
              <>
                Apprentice or installer is called back to a Wallbox Pulsar Plus that disconnects
                the vehicle every time it sees a small N-E voltage variation. To "fix" the
                complaint, they go into the charger's installer menu and disable the PEN fault
                detection. The charger now charges happily &mdash; until the upstream PEN actually
                opens (a routine DNO operation, a fault at the substation, a damaged service
                cable). With detection disabled, the charger keeps charging; the vehicle's chassis
                rises to a fraction of phase voltage; the customer touches the car while standing
                on the driveway; serious shock or electrocution. The contractor faces criminal
                prosecution under EAWR + manslaughter / corporate manslaughter.
              </>
            }
            doInstead={
              <>
                Investigate WHY the detection is tripping &mdash; measure the supply L-N, L-E, N-E
                under different load conditions; involve the DNO if N-E is consistently elevated.
                If the supply is genuinely poor, escalate &mdash; the cure may be a TT conversion
                of the EV circuit, NOT disabling the protection. PEN fault detection exists
                because the open-PEN hazard exists; disabling it does not remove the hazard, it
                just removes the protection.
              </>
            }
          />

          <Scenario
            title="Three-phase 22 kW EV charger nuisance-tripping at a small-commercial site"
            situation={
              <>
                A small commercial site (printing workshop) has a 22&nbsp;kW (32&nbsp;A per phase,
                three-phase) Pod Point commercial EV charger. The charger is RCD-protected (Type B
                30&nbsp;mA, ABB F204) and recently installed under BS 7671 A4:2026. The customer
                reports the RCD trips intermittently &mdash; usually mid-charge, sometimes within
                the first 10 minutes. You're sent to investigate with the supervisor on call.
              </>
            }
            whatToDo={
              <>
                (1) GREET the customer; brief the diagnostic plan; confirm the charger is
                physically isolated and locked-off before approach. (2) ISOLATE at the dedicated
                charger circuit breaker on the small-commercial DB; lock-off; prove dead at the
                charger's incoming terminals (Martindale VI-13800 across each phase to neutral and
                to earth). (3) Open the charger access panel; visually inspect the wiring &mdash;
                no scorching, no loose terminations, no water ingress at the gland. (4) Restore
                supply; ask the customer to begin a charge cycle on a vehicle; observe the
                charger's display and the building's RCD; note the trip time, the conditions
                (vehicle SoC, ambient temperature, AC vs DC charge mode). (5) Trips at 12 minutes
                into the cycle. ISOLATE; lock-off; prove dead. (6) MFT 1741 RCD trip-time test on
                the Type B RCD &mdash; trip-time at I&Delta;n 285&nbsp;ms (within 300&nbsp;ms
                limit but high-end), at 5&times;I&Delta;n 38&nbsp;ms (within 40&nbsp;ms limit).
                The RCD is technically within spec but at the upper edge. (7) Phone call to the
                supervisor &mdash; recommendation to escalate to RCD replacement (ABB F204
                supersedes can be sourced same-day from CEF). Supervisor agrees; orders the
                replacement; books the supervisor on-site for the replacement (three-phase
                live-edge work). (8) MAKE-SAFE the charger pending replacement; brief the customer
                on the next-day visit. (9) Update the diagnostic notes; close today's visit with a
                "diagnostic confirmed, replacement scheduled" report.
              </>
            }
            whyItMatters={
              <>
                Commercial EV charging at three-phase scale is at the upper edge of L3 apprentice
                scope. The diagnostic is well within scope &mdash; isolation, measurement, RCD
                trip-time test, recognition of the upper-edge reading. The RECTIFICATION (Type B
                RCD replacement on a three-phase circuit) is supervisor-led because of the
                three-phase voltage and the certification requirements. The L3 apprentice's role
                is to do the diagnostic, document it, and escalate the rectification to the right
                competence level. EAWR Reg 16 in action.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three-phase imbalance at the cut-out is a DNO-side issue — recognise, document accurately, escalate.",
              "Single-phasing on three-phase motors is destructive — motor runs but draws excess current on remaining phases until thermal trip.",
              "BS 7671 722 (A4:2026) requires PEN fault protection on EV under TN-C-S / PNB — PEN-detection charger, TT conversion, or dual earthing.",
              "BS 7671 712 (A4:2026) requires a dedicated DC isolator on every PV installation — AC isolation alone does not make the DC side safe.",
              "NEVER open MC4 connectors under DC load — not arc-rated for DC breaking; would arc-flash and weld.",
              "Type B RCDs detect smooth DC residual currents — required for EV / PV / large VSDs unless the equipment has integrated DC fault detection.",
              "L3 apprentice scope on three-phase commercial: visual, measure, isolate, like-for-like single-phase replacement; supervisor-led for live diagnostic and protection-coordination changes.",
              "EAWR Reg 16 (competence) makes the boundary not optional — escalate when the work exceeds your training and supervision arrangement.",
            ]}
          />

          <Quiz title="Specialised systems — three-phase, EV, PV — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section6-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.2 Common faults — correction techniques</div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section6-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.4 Capstone — multi-fault case study + reflection</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
