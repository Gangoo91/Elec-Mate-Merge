/**
 * Module 2 · Section 2 · Subsection 2 — BS 7671 Section 722 (EV) deeper
 * Maps to City & Guilds 2365-03 / Unit 301 / LO2 / AC 2.1 (regulations and standards)
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 2.1 (regulations) and AC 2.2 (statutory framework);
 * 2357 Unit 312 ELTP02 / AC 2.1 (regulatory framework for environmental technology systems).
 *
 * Note: Unit 301 is overview-level. This subsection deepens the Section 722 content beyond
 * the Section 1 Sub4 EV deep dive, focusing on the protective measure framework — PEN-fault
 * detection methods on TN-C-S, DC fault detection (RDC-DD), Type B vs Type A RCD, and the
 * A4:2026 refinements that an L3 apprentice on a 2026-onwards EV install needs to know.
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
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'BS 7671 Section 722 (EV) deeper (2.2) | Level 3 Module 2.2.2 | Elec-Mate';
const DESCRIPTION =
  "BS 7671 Section 722 covering EV charging installations at recognition level for the L3 electrician — PEN-fault detection methods on TN-C-S (PNB), DC fault detection (RDC-DD), the Type B vs Type A RCD decision, A4:2026 refinements and the IET Code of Practice for Electric Vehicle Charging Equipment Installation.";

const checks = [
  {
    id: "l3-m2-s2-sub2-pen-methods",
    question:
      "What are the acceptable methods for PEN-fault protection on a domestic EV charge point fed from a TN-C-S supply per Section 722?",
    options: [
      "Three acceptable methods. (1) The charge point includes built-in PEN-fault detection-and-disconnection — most modern UK domestic units (Zappi, Ohme, Hypervolt, Wallbox, GivEnergy) include this and the manufacturer's spec confirms compliance. (2) The EV side is on a dedicated TT earth electrode separate from the property's TN-C-S earth — used where the unit does not include built-in detection or where the install configuration favours TT. (3) An external PEN-fault detection device (separate enclosure) is fitted upstream of the unit. Method 1 is the dominant approach in 2024-2026; Method 2 is still common; Method 3 is the historical approach that pre-dates built-in detection and is now uncommon. A4:2026 has refined the technical detail of each method.",
      "The BUS is the current main UK government grant for low-carbon heating retrofits — currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and lower amounts toward biomass boilers in eligible properties. The grant is administered by Ofgem and paid to the MCS-certified installer who passes it through to the customer as a price reduction. Eligible properties: existing dwellings (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC. The grant has been extended several times and is currently confirmed through the late 2020s.",
      "PME (TN-C-S) supplies present a specific risk for EV charging — if the supply's PEN conductor opens, the vehicle's exposed-conductive-part can rise toward the line voltage relative to true earth. Section 722 (significantly amended in A4:2026) requires either an open-PEN protection device (built into most modern charging units — disconnects the supply if PEN-fault is detected via voltage-rise sensing) OR an earth electrode for the vehicle's chassis (TT arrangement at the charge point). The decision is made by the certified installer based on the supply earthing arrangement and the manufacturer's guidance. Section 722 spells out the conditions under which each option applies.",
      "Five conditions. (1) Cumulative repair cost approaching system replacement cost (cumulative repairs at 70%+ of new system). (2) System at end-of-life (CU 25+ years old, multiple aging components). (3) Code 1 / Code 2 EICR findings affecting multiple aspects of the system. (4) Building work or change-of-use happening; opportunity to upgrade. (5) New regulatory requirements (A4:2026 or future) that the existing system can't meet without major rework. The decision is normally the senior / customer's; the L3 apprentice identifies the indicators and escalates.",
    ],
    correctIndex: 0,
    explanation:
      "Three acceptable methods exist; the MCS-certified designer chooses one per the install conditions. Built-in detection (Method 1) is the most common approach because it removes a separate TT electrode and a separate enclosure from the install scope. The apprentice should confirm during commissioning that whichever method the design specifies is installed and tested.",
  },
  {
    id: "l3-m2-s2-sub2-rdc-dd",
    question:
      "What does RDC-DD mean and why does it matter for the upstream protective device choice?",
    options: [
      "A 4 µF cap charged to 230 V peak (~325 V) stores 0.21 J. Modern bin-mounted ballasts have integral bleed resistors that drop the voltage in 1 minute; older ballasts may not. The voltage is enough to give a sharp shock but not normally fatal. Standard discharge: wait 1 minute after isolation; verify with a meter (DC voltage between cap terminals should read &lt;30 V); if still charged, short the cap terminals through a 5–10 kΩ resistor with insulated leads. Never short with a screwdriver — pits the contacts and the discharge arc can weld. The hazard is real but manageable; the panic some apprentices show is excessive.",
      "Where the employee knew or ought reasonably to have known about the hazard, where they had an opportunity to communicate it to the colleague or supervisor, and where the failure to communicate caused or contributed to the colleague being exposed to risk. HSE has prosecuted individual employees under s.7 for failing to brief a successor on a permit-to-work, for not communicating that a circuit was still live, and for not raising a concern about a defective safe system of work. The s.7 duty is personal and cannot be delegated.",
      "RDC-DD stands for Residual Direct Current Detecting Device. It is the 6 mA DC fault current detection feature built into modern Mode 3 charge points (per IEC 62752 / IEC 61851-1). The presence of an RDC-DD in the unit means a Type A RCD upstream is acceptable — the Type A handles the AC residual current, the RDC-DD handles the smooth DC fault current that could otherwise blind the Type A. Without an RDC-DD in the unit, the upstream device must detect both — typically a Type B RCD, which is significantly more expensive (around 5x the price of a Type A). Section 722 of BS 7671 makes the RCD type a function of what the unit provides; A4:2026 has clarified the framework.",
      "External label identifying the property as having a PV system (typically near the meter and at the main isolator); internal labels at the AC isolator (identifying it as the PV AC isolator, not a generic isolator), at the DC isolator (warning that the array remains energised in light), at the inverter (warning of dual supply), and on the consumer unit (identifying the PV final circuit). The labelling is for the customer (so they know what their isolators do), the next electrician (so they understand the install years later), and the fire-fighter (so they know the building has PV before forcing entry). Section 514 of BS 7671 covers identification; Section 712 and the IET CoP add PV-specific requirements.",
    ],
    correctIndex: 2,
    explanation:
      "RDC-DD vs Type B is the key cost-driver on the upstream protective device choice. Modern UK domestic charge points almost universally include an RDC-DD because the 6 mA detection is part of the IEC 62752 / 61851-1 product standard. A Type A RCBO upstream is then acceptable. Always confirm against the unit's data sheet before specifying the upstream device.",
  },
  {
    id: "l3-m2-s2-sub2-pme-pnb",
    question:
      "Why has BS 7671 A4:2026 introduced the term PNB alongside the older TN-C-S / PME terminology?",
    options: [
      "BS 7671 (A4:2026 Reg 421.1.7) recommends AFDDs in specified locations including dwellings — but the wording is \\\\\\\"recommending\\\\\\\", not mandating. They are not strictly required by BS 7671 for a typical owner-occupied house. They ARE mandatory in Higher Risk Residential Buildings (HRRBs — typically blocks of flats over 18 m or 7 storeys) under the Building Safety Act 2022. For your house, they are a strongly recommended best-practice fire protection. Cost is roughly 60-100 GBP per AFDD-RCBO; protecting all socket and lighting circuits typically adds 600-1200 GBP to a CU change. Many domestic specifiers now include AFDDs as standard.",
      "Standard order: (1) Ze at the supply origin (incoming meter tails or the main switch). Establishes the supply impedance baseline. (2) Each circuit at its furthest point in turn — go in label order or by RCD group. Use no-trip mode on RCD-protected circuits. (3) For any borderline reading, retest in full trip mode after preparing for the trip. (4) For any failing reading, investigate (terminations, route length, CPC size). The order isn\\\\\\\\\\\\\\\\\\\\\\\\'t arbitrary — Ze first gives you the baseline you need to sanity-check the per-circuit readings.",
      "Six essential references. (1) BS 7671:2018+A4:2026 itself (paper or PDF on the laptop/phone) — particularly Chapter 4 (Protection), Chapter 5 (Selection), Chapter 6 (Testing), Appendix 6 (Forms). (2) IET Guidance Note 3 (current edition) for testing methods and result interpretation. (3) IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th Edition, 2026) for equipment-side work. (4) HSE GS38 for proving-dead instruments. (5) Manufacturer data sheets for the devices being replaced (downloaded ahead of the visit to the laptop). (6) The site's as-built drawings + Schedule of Test Results from the original EIC / EICR. The L3 apprentice doesn't memorise any of this; the L3 apprentice KNOWS where to look it up in 30 seconds when the question arises on site.",
      "PNB stands for Protective Neutral Bonded — it is the updated terminology for the earthing arrangement historically called TN-C-S or PME (Protective Multiple Earthing) in UK practice. The terminology change is aligned with international standards and clarifies the protective bonding role of the combined PEN conductor at the property. The technical arrangement is the same as before; the name is new. A4:2026 has updated cross-references throughout BS 7671 — including in Section 722 — to use PNB alongside the older PME term during the transition. As an L3 apprentice from 2026 onwards you should recognise both terms and understand they refer to the same arrangement.",
    ],
    correctIndex: 3,
    explanation:
      "PNB is the new terminology for what was called TN-C-S / PME. The technical arrangement (combined PEN conductor through the cut-out, separated into N and earth at the property) is unchanged. The terminology shift in A4:2026 aligns BS 7671 with international standards. EV charge points on PNB / TN-C-S supplies still need PEN-fault protection per Section 722 — the name change does not change the regulation.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the scope statement of BS 7671 Section 722 in plain English?",
    options: [
      "PME (TN-C-S) supplies present a specific risk for EV charging — if the supply's PEN conductor opens, the vehicle's exposed-conductive-part can rise toward the line voltage relative to true earth. Section 722 (significantly amended in A4:2026) requires either an open-PEN protection device (built into most modern charging units — disconnects the supply if PEN-fault is detected via voltage-rise sensing) OR an earth electrode for the vehicle's chassis (TT arrangement at the charge point). The decision is made by the certified installer based on the supply earthing arrangement and the manufacturer's guidance. Section 722 spells out the conditions under which each option applies.",
      "Section 722 applies to circuits intended to supply electric vehicles for charging purposes — both Mode 3 (AC charging through a dedicated charge point) and Mode 4 (DC fast / rapid charging) are within scope. The section adds requirements on top of the general BS 7671 framework for PEN-fault protection on TN-C-S (PNB) supplies, RCD requirements for AC and DC fault detection, additional protection arrangements, cable rating and labelling. A4:2026 has refined Section 722 alongside the broader updates around PNB terminology and AFDD coverage.",
      "Starting each week by asking your team: \\\"What obstacles are you facing that I can help remove?\\\" — then using empathy to understand the real blockers (which may be emotional as well as practical), self-regulation to resist the urge to micromanage the solutions, coaching to develop the team\\\\\\\\\\\\'s own problem-solving capability, and genuine follow-through that builds trust. The leader serves by enabling, not by doing everything themselves",
      "Three steps: (1) Visual — case undamaged, leads not nicked or crushed, probes have intact finger barriers, no visible burn marks or melted plastic. (2) Calibration — calibration label in date (typically annual for MFT, two-yearly for two-pole testers, manufacturer's interval for multimeters); calibration certificate available if challenged. (3) Function — tester proves on a known live source AND on a known dead source; battery level indication healthy; selector switch operates cleanly. Any failure on any step — the instrument is not used until rectified. Most firms have a pre-use inspection log signed by the operative at the start of each shift.",
    ],
    correctAnswer: 1,
    explanation:
      "Section 722 covers every EV charging install in the UK. The MCS-2921 / OZEV-authorised installer applies it; the apprentice should recognise the scope and the specific PEN-fault and DC-fault protection requirements that are not present in ordinary final circuits.",
  },
  {
    id: 2,
    question:
      "What is the difference between Type A and Type B RCDs in the EV charging context?",
    options: [
      "Continuity proving (sometimes 'continuity check') is a quick low-current test (typically 200 mA on the MFT or multimeter on continuity range) to confirm a connection exists — yes/no, not a precise measurement. R1+R2 is a precise measurement of the loop resistance of a complete circuit (line + protective conductor). For fault diagnosis: continuity proving is used to quickly verify that an isolation has fully disconnected a circuit (continuity from supply to load reads OPEN); R1+R2 is used to precisely characterise a circuit's loop resistance for comparison against expected design values. Both have their place; the L3 apprentice uses them at different stages.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
      "Type A RCDs detect AC residual currents and pulsating DC residual currents. They cannot detect smooth (continuous) DC residual currents — these can blind the device. Type B RCDs detect AC, pulsating DC and smooth DC residual currents. EV charge points produce smooth DC fault currents that a Type A alone cannot reliably trip. Two acceptable solutions per Section 722: (1) the unit includes its own RDC-DD (6 mA DC detection per IEC 62752 / 61851-1) and the upstream RCD can be Type A; (2) the unit does not include an RDC-DD and the upstream device must be Type B. Modern UK domestic units almost universally include the RDC-DD, so Type A upstream is the dominant choice. Always confirm against the unit's data sheet.",
      "Structured de-brief — the supervisor's job is to draw out the learning, the apprentice's job is to be honest. Topics to cover: (1) DIAGNOSIS — was the fault what you expected from the brief? Were there surprises? (2) ISOLATION — did your isolation procedure work cleanly? Any near-misses? (3) RECTIFICATION — did the work go as planned? Any unexpected complications? (4) TESTING — did the verification confirm the rectification? Any borderline readings? (5) DOCUMENTATION — is the certificate complete and accurate? (6) CUSTOMER — was the hand-back smooth? Any feedback to capture? The de-brief is 15&ndash;20 minutes, ideally same-day while memory is fresh. The supervisor builds an accurate picture of the apprentice's developing competence; the apprentice hears their work reviewed and learns. A successful visit + a structured de-brief is more valuable than a successful visit + no review.",
    ],
    correctAnswer: 2,
    explanation:
      "Type A vs Type B is the key cost-driver on the EV upstream protective device. Type B costs around 5x as much as Type A. Modern Mode 3 units include built-in 6 mA DC detection (RDC-DD) which makes a Type A RCBO upstream acceptable. The MCS-certified designer specifies based on the unit's data sheet.",
  },
  {
    id: 3,
    question:
      "What is the purpose of the control pilot signal between the charge point and the EV?",
    options: [
      "A transient is a brief (microseconds to milliseconds) over-voltage spike — typical magnitudes 1 kV to 6 kV (lightning-induced can reach 20 kV+). Sources: (1) lightning strikes (direct or induced from nearby strikes). (2) switching events — large inductive loads (motors, transformers) creating back-EMF spikes when switched off. (3) fault clearing — supply network faults causing brief over-voltages on the consumer's side. (4) capacitor switching on power-factor correction equipment. Damage: solid-state devices (LED drivers, electronic boards, computers) have peak-voltage tolerance below the transient magnitude. Single transient can fail an entire LED ceiling rose array. Protection: SPDs (Surge Protective Devices) under BS 7671 443.",
      "Five-step. (1) Power on — confirm self-test passes (Megger and Kewtech both run automatic self-tests on power-up). (2) Continuity — short the leads together; reading should be the lead resistance (typically 0.10–0.30 Ω) with audible buzzer; null the leads if the unit supports it. (3) Insulation resistance — connect leads together, press test at 250 V — should read &gt;999 MΩ (open circuit). (4) Loop / EFLI — connect to a known live socket; reading should match known reference for that location (or be plausible — typically 0.4–1.5 Ω at a domestic socket). (5) RCD — check on a known-good RCD outlet; trip-time should match the RCD's rating. Five minutes; catches drift, battery issues, lead damage.",
      "Around eight hours of accredited training (typically delivered as a one-day workshop or split over two half-days) covering climate science, the carbon impact of the trainee role and sector, individual and workplace action, and the social and economic context of the climate transition. To become Certified Carbon Literate the trainee must demonstrate understanding through assessment and commit in writing to one personal action and one workplace action. The Carbon Literacy Project (a Manchester-based registered charity) accredits training providers and issues the certifications. Major UK construction and engineering firms run rolling Carbon Literacy programmes for their workforces.",
      "The control pilot is a low-voltage PWM signal between the charge point and the vehicle that negotiates charging current, communicates protection status, signals connection / disconnection events and triggers safe shutdown on fault. The signal is part of the IEC 61851 Mode 3 protocol. The car uses the duty cycle of the PWM signal to determine the maximum current the charge point can supply; the charge point uses the signal level to know whether the cable is connected, whether the car is ready to charge, and whether a fault has occurred. The signalling is built into the unit and the cable; the apprentice does not configure it but should recognise its role.",
    ],
    correctAnswer: 3,
    explanation:
      "The control pilot is the safety-critical handshake between the charge point and the car. Without it, the car will not charge. With it, both ends know the safe operating current and either can initiate a controlled shutdown. Mode 1 charging (no control pilot) is the reason Mode 1 is essentially banned for EVs in the UK — without the pilot, there is no way to negotiate safe current limits.",
  },
  {
    id: 4,
    question:
      "On a TN-C-S supply with built-in PEN-fault detection in the unit, what does the apprentice need to verify at commissioning?",
    options: [
      "Three things. (1) The unit is configured / wired correctly for PEN-fault detection (some units have a DIP switch or software setting for the earthing arrangement; some auto-detect; some require firmware configuration). (2) The detection circuit is operational — many units include a self-test that runs on power-up and the apprentice should observe the test pass. (3) The unit's earthing is connected per the manufacturer's wiring diagram (the protective measure depends on the right conductors being terminated correctly). The MCS-certified designer specifies the test sequence; the apprentice executes per the design and verifies the result.",
      "Every 3 months — formal PAT (combined visual + electrical test) for harsh-environment use. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) publish typical intervals; construction-site Class I portable tools are at the short end at 3 months. Office Class I equipment is 12 months (the low-risk regime in HSE INDG236). Class II (double-insulated) and battery chargers are typically longer.",
      "The incongruence between calm words and stressed body language suggests the client is suppressing significant frustration or anxiety. The project manager should: acknowledge the difficulty of the situation empathically (\\\"I can see this is a stressful situation, and I understand why\\\"), address the emotional undercurrent rather than just the facts, and create space for the client to express genuine concerns — because unaddressed suppressed emotions often escalate",
      "Possibly yes. Heavy usage accelerates wear on the input components (relays in IR/loop test stages, current transformers in clamp meters, switches and connectors). The calibration interval is set assuming 'normal' use; heavy use justifies a shorter interval. Also — any incident (drop, exposure to wet, exposure to heat above operating temperature, fault current through the instrument, blown fuse) is grounds for an interim calibration regardless of date. The general principle: calibration is a confidence interval, not a guarantee — use intelligence about how the instrument has been treated to decide if early re-calibration is justified.",
    ],
    correctAnswer: 0,
    explanation:
      "Built-in PEN-fault protection is not 'fit and forget' — it requires correct wiring and correct configuration plus the commissioning self-test to verify operation. Skipping any of these is a non-compliance even if the unit physically powers up. The IET Code of Practice for EV Charging Equipment Installation walks through the commissioning verification.",
  },
  {
    id: 5,
    question:
      "Why does Section 722 require a means of isolation local to the charge point in addition to the upstream RCBO in the consumer unit?",
    options: [
      "Reg 134.1.1 applies to ANY work on the installation — design, erection, alteration, repair. It says the work shall be carried out by skilled and instructed persons in accordance with the requirements of BS 7671. For rectification, the practical implication is — the rectified circuit, after the work, must STILL meet the original BS 7671 design intent (correct cable size, correct protective device, correct earthing arrangement, correct supplementary bonding). 'Putting it back as it was' is not enough if the original was non-compliant; the rectification is an opportunity to bring the affected circuit up to the current edition of BS 7671 (A4:2026 in 2026). Where the original design predates current standards, the rectification at least matches like-for-like and any departure from current standards is recorded on the certificate.",
      "Three reasons. (1) Safe work — the next electrician arriving to service the unit needs a local isolator to lock off the supply for safe work without trekking back to the consumer unit. (2) Emergency response — a fire-fighter or first responder needs an obvious local means of disconnection if the unit is involved in an incident. (3) Customer use — the customer should be able to isolate the unit if needed without intervening at the consumer unit. The local isolator is typically a rotary or padlockable switch fitted within sight of the unit. Section 537 of BS 7671 covers isolation generally; Section 722 adds the EV-specific requirement; the IET Code of Practice gives the practical recommendation on type and location.",
      "Clamping around BOTH conductors (L AND N together) when measuring LOAD current. The clamp reads imbalance — for load current you want one conductor only (L OR N, not both). Reading shows zero or near-zero, apprentice assumes 'no load', misses the actual current. Conversely, when measuring earth leakage, you DO clamp L AND N together (the imbalance IS the leakage). The two use cases are mutually exclusive — load = one conductor, leakage = both conductors. Apprentices learn this in week one and re-learn it every time they pick up a clamp.",
      "(a) SELF — direct shock, arc-flash burn, fall from a recoil reaction. (b) OTHER PERSONNEL — assistant or apprentice working with you may contact live conductor; bystanders may be in arc range. (c) CUSTOMER/CLIENT — equipment damage from accidental short, fire risk from compromised insulation, customer staff injury if they touch exposed live parts. (d) PUBLIC — collapse of structure if a fire results, contamination if hazardous materials escape (e.g. transformer oil), wider supply outage if a fault propagates upstream. (e) BUILDING SYSTEMS — cascade failures (a botched isolation can take out the wrong circuit, knocking out fire alarm AND lifts AND emergency lighting at once), data loss on IT systems, equipment damage on plant restart.",
    ],
    correctAnswer: 1,
    explanation:
      "Local isolation is a practical and regulatory requirement. The upstream RCBO at the consumer unit is the protective device; the local isolator at the unit is the dedicated isolation point for safe work and emergency response. Skipping the local isolator under cost pressure is a non-compliance.",
  },
  {
    id: 6,
    question:
      "What does AFDD mean and when does Section 722 / A4:2026 require it on an EV final circuit?",
    options: [
      "Reg 14(2) requires every employee to inform their employer (or any other employee with specific responsibility for safety) of any work situation which they reasonably consider represented a serious and immediate danger to health and safety, AND any matter which they reasonably consider represented a shortcoming in the employer's protection arrangements for health and safety. The duty extends to near-misses, defective safe systems of work, and any condition the employee believes presents danger.",
      "Five steps. (1) Initial visual inspection — device fitted correctly, terminations torqued per manufacturer, label visible. (2) Continuity tests (R1+R2) on the dead circuit per the standard MWC test set. (3) IR test at 500 V — disconnect or use 250 V if the AFDD-RCBO\\\\\\\\'s electronics can\\\\\\\\'t withstand 500 V (most modern devices tolerate 500 V on the line side but check the manufacturer manual). (4) Energise, single AC test at 1 x I delta n on the RCBO portion (the RCD half is verified normally). (5) Functional test of the AFDD portion via the manufacturer test button — press T, device trips, reset. Document the AFDD test on the Schedule of Test Results.",
      "AFDD stands for Arc Fault Detection Device. AFDDs detect characteristic arcing in cables and terminations — the kind that can lead to electrical fires before any conventional protective device would trip. A4:2026 has expanded the AFDD requirements across BS 7671, including in some final-circuit contexts. For EV final circuits, the AFDD requirement depends on the installation context (some socket-feeding circuits, some special-locations work). The MCS-certified designer specifies whether an AFDD is required for the specific install per A4:2026; the apprentice fits per the design. AFDD-RCBO combination devices are increasingly available and simplify the consumer unit layout.",
      "A boiler drives a wet heating system — pumps hot water around radiators / underfloor circuits and a hot-water cylinder. Typical output 10-50 kW, located in a utility room or outhouse, automatic fuel feed (auger from a hopper), automatic ignition, automatic ash handling. A stove is a room heater — radiates heat directly into the room it sits in, plus optional back-boiler for some hot water. Lower output (5-15 kW typical), manual loading (logs or pellets), no automatic ash removal. Different installation regulations, different MCS standards, different customer expectations.",
    ],
    correctAnswer: 2,
    explanation:
      "AFDDs are a real fire-safety advance and A4:2026 has expanded their required scope across BS 7671. For EV charging installs, AFDDs are not universally required but the design may specify them depending on the install context. The combined AFDD-RCBO devices coming onto the market simplify the CU layout because one device covers overcurrent, residual current and arc-fault detection.",
  },
  {
    id: 7,
    question:
      "On a TT-earthed property with no PNB / TN-C-S, does Section 722 still apply?",
    options: [
      "Common triggers: profits exceed £40-50k/year (where Ltd's lower-cost dividend tax structure starts to outweigh the extra admin); contracts increasingly require Ltd-only counterparties (some commercial clients refuse to engage sole traders); risk profile grows (more employees, larger contracts, higher liability exposure); raising external investment (impossible as sole trader); planning succession or sale of the business (Ltd is sellable, sole trader isn't).",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The DNO emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). Required by BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. The signage protects future maintainers who may not realise there's a generator on the property.",
      "On a TN-C-S supply the PEN conductor combines neutral and protective earth between the substation and the cut-out. If the PEN breaks open between the substation and the property, the property's earthing rises toward line voltage depending on the load balance on neighbouring properties on the same PEN. For an EV on a driveway, the car body sits at the elevated PME potential while the surrounding ground (concrete, soil, gravel) stays at true earth potential — the touch-voltage between the car body and the ground can be lethal.",
      "Yes. Section 722 applies to all EV charging installations regardless of earthing arrangement. The PEN-fault protection requirement specifically targets TN-C-S (PNB) supplies because that is where the broken-PEN risk exists; TT-earthed properties already have a separate earth electrode and do not have the PEN-fault risk. But all the other Section 722 requirements (RCD type, control pilot, isolation, labelling, cable rating) apply equally to TT-earthed installs. The MCS-certified designer specifies per the supply conditions; the apprentice executes per the design.",
    ],
    correctAnswer: 3,
    explanation:
      "Section 722 applies universally; the PEN-fault clauses specifically target PNB / TN-C-S because the risk is specific to that arrangement. TT-earthed properties do not need PEN-fault protection (because there is no shared PEN conductor) but still need the rest of Section 722.",
  },
  {
    id: 8,
    question:
      "What is the role of the IET Code of Practice for Electric Vehicle Charging Equipment Installation?",
    options: [
      "The IET CoP is the practical implementation guide that walks through how to apply Section 722 on a real install — supply assessment, earthing arrangement choice, protective device selection, cable sizing, isolation, labelling, commissioning. Currently in its 5th edition with regular updates to track BS 7671 amendments and OZEV regulation changes. Not legally mandatory in itself but referenced by reasonable-installer expectations and by MCS / OZEV scheme requirements. The apprentice should recognise it as a practical companion to Section 722 — Section 722 is the legal floor; the IET CoP is the practical playbook.",
      "The EPC should be re-issued to reflect the new performance — heat pump, PV, MVHR, insulation upgrades all change the SAP rating. The MCS-certified installer normally arranges the EPC update. An updated EPC matters for: (a) future house sale (the buyer's solicitor sees current performance); (b) mortgage applications (lenders increasingly weight EPC ratings); (c) insurance (some insurers now adjust premium for low-EPC properties); (d) BUS grant requires a valid EPC at the time of install. EPCs are valid for 10 years from issue.",
      "G98 is post-notification — install, commission, notify within 28 days. The whole transaction completes inside 28 days from commissioning. G99 is pre-application — submit the application before commissioning, wait for the DNO to model the network, receive a Connection Offer, accept the Offer (which may contain export limits or fault-level conditions), then commission. Typical G99 timeline is 4-12 weeks for a domestic system; longer for commercial. On a fast-moving install programme the G99 paperwork is usually the long pole — start it early.",
      "Dedicated radial circuit, typically 32 A or 40 A on a Type C (or D) MCB, in 6 mm² T&E or SWA depending on installation method and length. RCD per BS 7671 Section 411.3.3 / 415.1 — type per manufacturer's instruction (often Type A or Type B / RDC-DD). Local rotary or DP isolator outdoors at the unit. Smart controls integration via dedicated low-voltage cable. Cyclic-rated cable selection — heat pumps run for hours not minutes. Manufacturer's bonding requirements where the chassis forms an extraneous-conductive part.",
    ],
    correctAnswer: 0,
    explanation:
      "The IET Code of Practice for EV Charging Equipment Installation is the practical implementation guide for Section 722. The MCS / OZEV-certified installer should be working from it (or the equivalent product-specific install guide) on every install. The apprentice should recognise the document and what it does.",
  },
];

const faqs = [
  {
    question: "Why is the EV charge-point industry so focused on PEN-fault detection?",
    answer:
      "Because the broken-PEN scenario is the headline new risk that EV charging introduces to UK domestic installs. On a TN-C-S (PNB) supply, an upstream PEN break leaves the property's earthing system connected only to the load-current return path through neighbouring properties. Earth potential can swing tens of volts above true earth. Inside the house this is dangerous. With an EV plugged in to the metal bodywork on a wet drive, with the customer touching the car, the danger is significantly worse. Section 722 makes PEN-fault protection non-optional. Modern unit manufacturers have built the protection into the unit so that a Type A upstream RCBO is acceptable.",
  },
  {
    question: "What about plug-in EVSE units that connect to a 13 A socket — do those need PEN-fault protection too?",
    answer:
      "Plug-in Mode 2 units (the 'granny cable' that ships with the EV) typically include their own in-cable control box (ICCB) that provides the protection — including, in modern units, PEN-fault and DC-fault detection. Section 722 is specific to fixed installations; Mode 2 is not a fixed installation in the BS 7671 sense. But the unit's own protection is still required for the user's safety. Modern Mode 2 units sold for UK use should comply with IEC 62752 which covers the protection. The apprentice's role on Mode 2 is normally limited to ensuring the supplying socket is sound, in good condition, and rated for the duty.",
  },
  {
    question: "Does the apprentice need to know the specific Section 722 regulation numbers by heart?",
    answer:
      "Recognising the existence of Section 722 and its key topics (PEN-fault, RCD type, isolation, labelling) matters more than memorising specific clause numbers. In practice the MCS-certified designer references the specific regulations on the design drawings; the apprentice executes per the drawings. For the L3 assessment you should be able to identify Section 722 as the EV charging regulation anchor and describe what it covers; you do not need to recite individual clause numbers from memory.",
  },
  {
    question: "How does Section 722 interact with Section 826 if a battery is added to the EV charging install?",
    answer:
      "On rare cases where the EV charge point includes integrated battery storage (vehicle-to-grid systems are emerging), both sections apply. More commonly the battery storage is a separate install on the property (PV plus battery hybrid), and the EV charger is a separate install with its own Section 722 compliance. The two interact via the dynamic load management (CT clamp) and the HEMS dispatch — the regulations apply to each install independently.",
  },
  {
    question: "What does the OZEV Smart Charge Points Regulations 2021 require that BS 7671 Section 722 does not?",
    answer:
      "OZEV is sales-side regulation focused on the unit's smart functionality, default off-peak charging, randomised delay, cybersecurity baseline and safety provision. BS 7671 Section 722 is the install-side regulation focused on electrical safety. They cover different aspects — OZEV is about how the unit behaves; Section 722 is about how the unit is wired. Both apply to every UK domestic charge point install. The OZEV compliance is normally the manufacturer's responsibility; the Section 722 compliance is the installer's.",
  },
  {
    question: "Are there any EV charge points that do not need an RCD at all?",
    answer:
      "No. Every Mode 3 EV charge point install requires RCD protection per Section 722. The choice is whether the upstream device is Type A (with the unit providing its own DC fault detection via RDC-DD) or Type B (without). Type A RCBO upstream of an RDC-DD-equipped unit is the dominant UK domestic configuration in 2024-2026. Skipping RCD protection entirely is a non-compliance under Section 722 and Section 411 / 532 generally.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 2"
            title="BS 7671 Section 722 (EV) — deeper dive"
            description="Section 722 is the EV charging regulation anchor. This subsection covers the PEN-fault detection methods on TN-C-S (PNB), the DC fault detection (RDC-DD) framework, the Type A vs Type B RCD decision, the A4:2026 refinements, and the IET Code of Practice for Electric Vehicle Charging Equipment Installation."
            tone="emerald"
          />

          <TLDR
            points={[
              "Section 722 applies to every EV charging install in the UK regardless of Mode (3 or 4) and regardless of earthing arrangement (PNB / TT). The PEN-fault clauses specifically target PNB / TN-C-S where the broken-PEN risk exists.",
              "Three acceptable PEN-fault protection methods — built-in detection in the unit (the dominant approach), dedicated TT electrode for the EV side, or external PEN-fault detection device upstream.",
              "RDC-DD (Residual Direct Current Detecting Device) in modern units handles 6 mA DC fault detection per IEC 62752 / 61851-1, allowing a Type A RCBO upstream rather than a Type B (around 5x cheaper).",
              "A4:2026 has refined Section 722 alongside the broader updates including PNB terminology (replacing TN-C-S / PME) and expanded AFDD coverage. The IET Code of Practice for EV Charging Equipment Installation is the practical companion.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the scope of BS 7671 Section 722 and identify which EV charging installations fall within it.",
              "Describe the three acceptable methods for PEN-fault protection on a TN-C-S (PNB) supply and identify which is the dominant choice for UK domestic.",
              "Explain RDC-DD and the relationship between the unit's built-in DC detection and the upstream RCD type choice.",
              "Identify the role of the control pilot signal in a Mode 3 charge point and explain why Mode 1 is essentially banned for EVs.",
              "Recognise the PNB terminology introduced in A4:2026 alongside the older TN-C-S / PME term.",
              "Identify the IET Code of Practice for Electric Vehicle Charging Equipment Installation as the practical implementation guide for Section 722.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>PEN-fault protection — three acceptable methods</ContentEyebrow>

          <ConceptBlock
            title="The headline EV-specific risk has three acceptable mitigations"
            plainEnglish="On a TN-C-S (PNB) supply, an upstream PEN break is the headline new risk that EV charging introduces. The property's earthing system can rise to dangerous voltage; an EV plugged into the metal bodywork on a wet drive becomes a shock hazard; the user can be in contact with both the car and true earth simultaneously. Section 722 of BS 7671 makes PEN-fault protection non-optional and allows three acceptable methods."
            onSite="The MCS-certified designer chooses the method per the install conditions and the unit's spec sheet. The apprentice's role is to confirm during commissioning that whichever method the design specifies is correctly installed and tested. The IET Code of Practice for Electric Vehicle Charging Equipment Installation walks through the verification sequence for each method."
          >
            <p>
              The three acceptable methods at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Method 1 — built-in PEN-fault detection in the unit</strong>. Most modern UK domestic units (Zappi, Ohme, Hypervolt, Wallbox, GivEnergy, Easee) include this. The unit monitors voltage between the supply L and N during operation; any anomalous rise signals a PEN fault and the unit disconnects. Manufacturer's spec sheet confirms compliance with Section 722. Dominant approach in 2024-2026.
              </li>
              <li>
                <strong>Method 2 — dedicated TT earth electrode for the EV side</strong>. The EV charge point and any extraneous-conductive-parts within reach get a separate earth electrode driven into the ground at the install location, isolated from the property's main earthing terminal. Removes the PEN-fault risk by removing the connection to the PNB earth. Used where the unit does not include built-in detection or where the install configuration favours TT (e.g. detached garage, long cable run from the property).
              </li>
              <li>
                <strong>Method 3 — external PEN-fault detection device</strong>. A separate enclosure upstream of the unit provides the detection. Historical approach that pre-dates built-in detection; now uncommon on new installs because Method 1 is simpler and cheaper.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 722.411.4.1 (PEN-fault detection)"
            clause={
              <>
                "Where the supply to an electric vehicle charging point is taken from a TN-C-S (PNB) source, additional protective measures shall be provided to prevent the appearance of a hazardous voltage on the exposed-conductive-parts of the vehicle in the event of an open-circuit fault in the supply PEN conductor. Acceptable methods include detection-and-disconnection arrangements within the charging equipment, an earthing arrangement separate from the supply earthing (TT) for the charging point, or an upstream PEN-fault detection device."
              </>
            }
            meaning={
              <>
                Section 722 makes PEN-fault protection non-optional on TN-C-S (PNB) supplies and lists three acceptable approaches. A4:2026 has refined the technical detail of each method and updated the terminology (PNB alongside TN-C-S / PME). The IET Code of Practice for Electric Vehicle Charging Equipment Installation walks through the practical implementation. The MCS-certified / OZEV-authorised installer chooses the method per the install conditions; the apprentice executes the wiring and verifies the protection at commissioning.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 722.411.4.1 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <EarthingSystemDiagram />

          <SectionRule />

          <ContentEyebrow>RDC-DD and the Type A vs Type B decision</ContentEyebrow>

          <ConceptBlock
            title="The RDC-DD in the unit decides whether you need a Type A or a Type B RCBO upstream"
            plainEnglish="EV charge points can produce smooth (continuous) DC fault currents that a Type A RCD alone cannot reliably trip — the Type A's transformer can be 'blinded' by smooth DC. Two solutions: the unit includes its own 6 mA DC detection (RDC-DD per IEC 62752 / 61851-1) and the upstream RCD can be Type A; or the unit does not, and the upstream device must be Type B (around 5x more expensive)."
            onSite="Modern UK domestic Mode 3 units almost universally include an RDC-DD because it is part of the IEC 62752 / 61851-1 product standard. The MCS-certified designer reads the unit's data sheet, confirms RDC-DD presence, and specifies a Type A RCBO upstream in the consumer unit. The apprentice fits per the design. Always verify against the actual unit on site — substituting a different model at install time without checking the RCD requirement is a real failure mode."
          >
            <p>
              The RCD decision tree:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unit includes RDC-DD (6 mA DC detection)</strong> → Type A RCBO upstream is acceptable. Cost-effective. Dominant choice in 2024-2026.
              </li>
              <li>
                <strong>Unit does not include RDC-DD</strong> → Type B RCBO upstream is required. Around 5x cost of Type A. Rare on modern units but possible on older or imported equipment.
              </li>
              <li>
                <strong>Combined AFDD-RCBO devices</strong> → increasingly available. Simplify CU layout where AFDD is also required by the design.
              </li>
              <li>
                <strong>Always verify against unit data sheet</strong>. A substitution at install time can change the upstream RCD requirement.
              </li>
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

          <ContentEyebrow>PNB terminology in A4:2026</ContentEyebrow>

          <ConceptBlock
            title="PNB is the new term for what was called TN-C-S / PME"
            plainEnglish="A4:2026 has introduced the term PNB (Protective Neutral Bonded) alongside the older TN-C-S / PME terminology. The technical arrangement is unchanged — the supply enters the property as a combined PEN conductor through the cut-out, and the PEN is separated into N and earth at the property's main earthing terminal. The terminology shift aligns BS 7671 with international standards. As an L3 apprentice from 2026 onwards you should recognise both terms."
            onSite="On site you may encounter older paperwork referring to PME or TN-C-S, and newer paperwork referring to PNB. They mean the same thing. The protective measure framework — including Section 722's PEN-fault protection on EV charging — applies the same way regardless of which term the document uses. A4:2026 has updated cross-references throughout BS 7671 to use PNB; the IET Codes of Practice are following with their next updates."
          >
            <p>
              Terminology summary:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-C-S</strong> — the international terminology for an arrangement where the supply has a combined PEN conductor (TN-C) and the property has separate N and earth conductors (TN-S). UK terminology since the 17th Edition.
              </li>
              <li>
                <strong>PME (Protective Multiple Earthing)</strong> — the older UK terminology emphasising the multiple earthing of the PEN conductor along its run. Still in common use.
              </li>
              <li>
                <strong>PNB (Protective Neutral Bonded)</strong> — the A4:2026 terminology emphasising the protective bonding role of the combined PEN at the property. New term aligned with international standards.
              </li>
              <li>
                All three terms refer to the same physical earthing arrangement. Section 722's PEN-fault protection requirement applies to any of them.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The IEC 61851 control-pilot signal</ContentEyebrow>

          <ConceptBlock
            title="The control pilot is the bit of the standard that makes Mode 3 'Mode 3'"
            plainEnglish="A Type 2 connector has seven pins. Three are the AC phases, one is neutral, one is earth, and two are the control pair — the control pilot (CP) and the proximity (PP). The control pilot is a 1 kHz square wave generated by the charge point that the vehicle interrupts and modulates to negotiate the charge — to confirm it is plugged in, to declare its maximum acceptable current, to start and stop the charge session safely. Without a working control pilot the contactor in the charge point will never close and no current flows. This is the safety architecture that separates Mode 3 from a simple AC socket."
            onSite="The L3 apprentice does not need to oscilloscope the control pilot waveform — the unit handles it internally. But the apprentice should know the function exists and recognise the symptoms when it fails. Typical control-pilot failures: dirty or corroded pilot pin in the connector (vehicle reads no plug present, refuses to charge); damaged in-cable resistor on the proximity line (unit reads cable not present, refuses to start); cable theft / vandalism damaging the control conductors. Cleaning the connector pins and reseating is the first remedial step; if the symptom persists, the cable or the unit needs swap-and-test."
          >
            <p>
              Control-pilot states the unit is signalling at any moment:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>State A (12 V steady)</strong> — no vehicle plugged in. Unit is idle.
              </li>
              <li>
                <strong>State B (9 V square wave)</strong> — vehicle plugged in, ready but
                not charging. Unit confirms presence; vehicle has not requested charge.
              </li>
              <li>
                <strong>State C (6 V square wave)</strong> — vehicle plugged in and
                charging. Contactor closed; current flowing per the negotiated rate.
              </li>
              <li>
                <strong>State D (3 V square wave)</strong> — vehicle requesting charge
                with ventilation (rare on modern EVs; legacy vehicles only).
              </li>
              <li>
                <strong>State E / F (0 V or shorted)</strong> — fault. Contactor opens,
                unit reports error.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD requirements on EV final circuits</ContentEyebrow>

          <ConceptBlock
            title="A4:2026 expanded AFDD coverage — EV final circuits often now require AFDD"
            plainEnglish="Arc Fault Detection Devices (AFDDs) detect the high-frequency signature of arcing in fixed wiring — loose terminations, damaged cable insulation, deteriorated connections — and disconnect before the arc develops into a fire. A4:2026 expanded AFDD coverage in residential premises, including many EV final-circuit contexts. The MCS-certified designer reads the current edition of BS 7671 and specifies AFDD where required."
            onSite="On a 2026-onwards EV install in a residential property, the apprentice should expect to fit either a combined AFDD-RCBO or an AFDD upstream of the RCBO. Some manufacturers (Hager, Schneider, Wylex, Eaton) ship combined AFDD-RCBO units that simplify the CU layout. The cost premium over a plain RCBO is meaningful (around 4-8x); the customer should be quoted accordingly. AFDD operation is largely self-monitoring; a built-in self-test runs at intervals and the device signals fault state visually. Customer-facing brief: the device may trip on transient arcing events that turn out to be benign (vacuum cleaners with worn motors, certain LED drivers); reset and observe is the first response."
          >
            <p>
              AFDD considerations on the EV final circuit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Combined AFDD-RCBO</strong> — single device handling RCD, MCB and
                AFDD functions. Simplifies CU layout and labelling. Typical UK
                manufacturers offer Type A versions suitable for EV.
              </li>
              <li>
                <strong>Cost premium</strong> — combined AFDD-RCBO is around 4-8x the
                cost of a plain Type A RCBO. Customer-facing quote should reflect.
              </li>
              <li>
                <strong>Self-test</strong> — AFDDs run a periodic internal self-test and
                signal fault state visually. Annual visual inspection includes
                confirming the indicator state.
              </li>
              <li>
                <strong>Customer brief on nuisance trips</strong> — early-generation
                AFDDs were prone to nuisance trips on certain loads; modern devices have
                largely resolved this but the customer should be briefed that an AFDD
                trip on the EV circuit is not necessarily a fault on the EV side.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>OZEV Smart Charge Points Regulations 2021 — the legal layer</ContentEyebrow>

          <ConceptBlock
            title="OZEV Regulations apply at the point of sale — installer is downstream"
            plainEnglish="The Electric Vehicles (Smart Charge Points) Regulations 2021 came into force on 30 June 2022 in Great Britain. They apply to any charge point sold for domestic or workplace use and place primary responsibility on the manufacturer / seller. The unit must be smart-capable, default off-peak, randomised-delay-on-start, cybersecurity-baseline-compliant, and capable of being scheduled and remotely managed. The installer cannot fit a non-compliant unit; the customer cannot legally use one for new installs."
            onSite="The L3 apprentice does not need to read the regulations cover-to-cover, but should recognise the visible behaviour: the unit defaults to off-peak charging windows; the unit waits a randomised delay (up to 600 seconds) at the start of a charge session in an off-peak window; the unit logs charging data and supports remote scheduling. Brief the customer on the randomised delay so they do not interpret the start delay as a fault. Confirm the unit is OZEV-compliant before fitting (every unit currently marketed in GB by reputable brands is); the OZEV Workplace Charging Scheme (WCS) and Electric Vehicle Chargepoint Grant both require OZEV-authorised installers fitting OZEV-listed equipment for grant claims."
          >
            <p>
              The five OZEV requirements at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Smart functionality</strong> — capable of being scheduled,
                monitored and remotely controlled.
              </li>
              <li>
                <strong>Default off-peak charging</strong> — pre-configured windows
                avoiding peak demand. Customer can override but the default is off-peak.
              </li>
              <li>
                <strong>Randomised delay</strong> — up to 600 seconds at start of a
                charge session to avoid millions of chargers turning on at the same
                moment.
              </li>
              <li>
                <strong>Cybersecurity baseline</strong> — protections against remote
                attack; aligned with ETSI EN 303 645 consumer IoT baseline.
              </li>
              <li>
                <strong>Safety provision</strong> — disconnects under defined fault
                conditions; logs events.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Supplementary bonding and Section 722 detail</ContentEyebrow>

          <ConceptBlock
            title="Supplementary bonding on EV — when, where, and what to bond"
            plainEnglish="Section 722 does not generally require supplementary equipotential bonding around an EV charge point — modern unit-level protection (PEN-fault detection, RDC-DD, automatic disconnection) provides the safety layer. But the apprentice should recognise the conditions where supplementary bonding is appropriate: an EV mounted on a car port frame that is itself an extraneous-conductive-part; a unit close to a metal water pipe or gas pipe where main bonding is in place; a TT installation where the local earth electrode resistance is borderline."
            onSite="The MCS-certified designer makes the bonding call. The apprentice fits per the design. Common scenarios: a 25 mm or 16 mm protective bonding conductor from the unit&apos;s earth terminal to the car port frame; a 10 mm supplementary bond from the unit enclosure to a nearby exposed earthed metalwork; verification of main bonding to gas and water at the property as a precondition. Do not retrofit supplementary bonding without checking the design — adding bonds where they are not specified can create unintended earth loops and parallel paths that complicate fault behaviour."
          >
            <p>
              When supplementary bonding is typically considered:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Car port or other metallic supporting structure</strong> — bond
                the structure if it is an extraneous-conductive-part within reach of the
                EV.
              </li>
              <li>
                <strong>External metallic services close to the unit</strong> — typically
                covered by main bonding at the property MET; supplementary bonding only
                where local geometry creates a touch-voltage concern.
              </li>
              <li>
                <strong>TT installations with marginal earth electrode resistance</strong>
                — supplementary bonding can support compliance with disconnection-time
                requirements where the electrode is at the upper limit of acceptable.
              </li>
              <li>
                <strong>Verify main bonding first</strong> — Section 722 supplementary
                bonding only makes sense if the property&apos;s main bonding to gas and
                water is in place and adequate (10 mm minimum for typical UK domestic).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Commissioning checklist for an EV install</ContentEyebrow>

          <ConceptBlock
            title="A disciplined commissioning sequence catches Section 722 issues before the customer does"
            plainEnglish="Commissioning a Mode 3 EV charge point per Section 722 / IET Code of Practice involves more than running the standard BS 7671 dead and live tests. The PEN-fault detection function must be verified, the RDC-DD or upstream Type B operation must be verified, the load management must be verified by a deliberate concurrent load, the OZEV smart-charge schedule must be confirmed, and the customer-facing labelling must be installed."
            onSite="The L3 apprentice should follow the commissioning sequence the MCS-certified electrician hands over, supplemented by the unit&apos;s own commissioning manual. Skipping any step risks an install that passes the standard EICR-style tests but fails the EV-specific verification. The IET Code of Practice for Electric Vehicle Charging Equipment Installation provides a structured commissioning checklist; it is worth printing the relevant pages and ticking through them on every install rather than working from memory."
          >
            <p>
              The commissioning sequence in order:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard BS 7671 dead tests</strong> — continuity, insulation
                resistance, polarity (per Part 6).
              </li>
              <li>
                <strong>Standard BS 7671 live tests</strong> — Zs, RCD operation
                (functional and times), prospective fault current.
              </li>
              <li>
                <strong>PEN-fault detection verification</strong> — per the unit&apos;s
                commissioning sequence; usually a self-test function on the unit menu.
                Observe pass; do not put the unit in service if it fails.
              </li>
              <li>
                <strong>RDC-DD operation verification</strong> — typically a built-in
                self-test on the unit; some units allow an external 6 mA DC injection
                test.
              </li>
              <li>
                <strong>Load management verification</strong> — start an EV charge at
                full rate; deliberately switch on a known concurrent load (electric
                shower); observe the charger throttle within seconds. If it does not
                throttle, the CT clamp orientation or the load-management settings need
                review.
              </li>
              <li>
                <strong>OZEV smart-charge schedule confirmation</strong> — confirm
                default off-peak schedule is configured; brief the customer on the
                randomised delay behaviour.
              </li>
              <li>
                <strong>Labelling installation</strong> — supply origin, isolation
                point, earthing arrangement, emergency stop, OZEV smart-charge
                indication.
              </li>
              <li>
                <strong>Customer handover</strong> — local isolator location,
                load-management behaviour, smart-charge schedule, app credentials,
                warranty contact.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Substituting a different unit model at install time without checking the RCD requirement"
            whatHappens={
              <>
                Designer specified Brand X with built-in RDC-DD and a Type A RCBO upstream. Stock issue means Brand Y is fitted instead. Brand Y does not include an RDC-DD. The Type A RCBO upstream is no longer compliant with Section 722 and the unit cannot reliably detect smooth DC fault current. Compliance gap that is not visible until a fault occurs and the RCD does not trip in time.
              </>
            }
            doInstead={
              <>
                Read the unit's data sheet before fitting. Confirm RDC-DD presence; confirm PEN-fault detection method; confirm OZEV-Regulations compliance; confirm Section 722 compliance. If the substituted unit changes any of the upstream requirements, raise it with the designer before proceeding. Do not 'just fit it' on the assumption that one Mode 3 charge point is interchangeable with another.
              </>
            }
          />

          <CommonMistake
            title="Skipping the local isolator at the unit on the basis that the consumer unit RCBO is enough"
            whatHappens={
              <>
                Apprentice fits the upstream RCBO at the consumer unit and runs the cable straight to the unit terminals — no local isolator. The next electrician arriving to service the unit has to trek back to the consumer unit to isolate; under emergency response, no obvious local means of disconnection. Section 537 isolation requirements not met; Section 722 EV-specific isolation requirements not met. The customer is paying for a non-compliant install they may not realise until the next inspection or the next service visit.
              </>
            }
            doInstead={
              <>
                Always fit a local means of isolation within sight of the unit — typically a rotary or padlockable isolator on the supply cable adjacent to the charge point. The IET Code of Practice for Electric Vehicle Charging Equipment Installation specifies the type and the location. The cost is small; the operational and regulatory value is large.
              </>
            }
          />

          <Scenario
            title="Apprentice on a 2026 EV install — TN-C-S property, modern Zappi unit"
            situation={
              <>
                You are the apprentice on a Mode 3 EV install at a TN-C-S (PNB) detached property. The MCS-certified electrician has specified a Zappi v2.1 unit with built-in PEN-fault detection (Method 1) and built-in RDC-DD. Upstream device is a new Type A RCBO in the consumer unit. Local isolator is a 32 A rotary on the supply cable adjacent to the unit. CT clamp on the supply tail enables dynamic load management against the 80 A main fuse. Cable is 10 m of 6 mm T+E from the consumer unit to the garage where the unit will mount. The install is on a 2026-onwards date so A4:2026 applies.
              </>
            }
            whatToDo={
              <>
                Pull the cable, terminate at the consumer unit on the new Type A RCBO, terminate at the local isolator and at the unit terminals per the manufacturer's wiring diagram. Fit the CT clamp around the supply tail in the orientation the manual specifies. Configure the unit for the supply earthing arrangement (PNB). Run the unit's commissioning self-test for PEN-fault detection — observe the test pass; if it does not pass, do not put the unit in service. Verify load management with a deliberate concurrent load. Install the labelling per Section 514 / 722 / IET CoP — supply origin, isolation point, earthing arrangement, emergency isolation instructions. Hand over to the customer with a five-minute brief on the local isolator location, the load-management behaviour and the OZEV smart-charging schedule.
              </>
            }
            whyItMatters={
              <>
                This is the typical 2026 EV apprentice job — modern unit with built-in PEN-fault and RDC-DD, Type A RCBO upstream, dynamic load management, OZEV-compliant smart features. Recognising the regulation map (Section 722, IET CoP, OZEV, MCS / OZEV-authorised) and executing the wiring per the design is the apprentice's contribution. The MCS-certified electrician signs off; the apprentice keeps the install compliant in the detail.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 (Electric vehicle charging installations) — scope"
            clause={
              <>
                Section 722 applies to electric vehicle charging installations. It modifies
                general requirements for protection against electric shock and includes specific
                requirements with regard to PME systems, socket-outlets and connectors, external
                influences, isolation and switching and RCD protection. The requirements of
                Section 722 do not apply to wireless charging, such as inductive charging.
              </>
            }
            meaning={
              <>
                Section 722 is the regulatory home for every wired EV install. Wireless
                charging falls outside the section and follows its own product standards
                instead. A4:2026 brought significant changes to PME / TN-C-S handling and the
                RCD selection rules in particular — pre-A4 advice on EV installs should be
                checked against current text.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 722.411.4.1 (PEN-fault detection on TN-C-S supplies)"
            clause={
              <>
                Regulation 722.411.4.1 concerning the use of a PME supply has been revised. The
                exception concerning reasonably practicable has been deleted. Changes have also
                been made to requirements for external influences, RCDs, socket-outlets and
                connectors.
              </>
            }
            meaning={
              <>
                The old &quot;not reasonably practicable&quot; let-out for fitting open-PEN
                protection on TN-C-S EV installs is gone. You either use a charger with built-in
                PEN-fault detection (the dominant route on UK domestic), or fit a TT earth
                electrode for the EV side, or install a separate PEN-fault detection device
                upstream. There is no longer a documentation-only escape.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 722.411.4.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Section 722 applies to every EV charging install in the UK regardless of Mode and regardless of earthing arrangement. The PEN-fault clauses specifically target PNB / TN-C-S where the risk exists.",
              "Three acceptable PEN-fault protection methods — built-in detection in the unit (dominant), dedicated TT electrode for the EV side, or external PEN-fault detection device upstream.",
              "RDC-DD in the unit (6 mA DC detection per IEC 62752 / 61851-1) allows a Type A RCBO upstream rather than a Type B. Type B is around 5x more expensive.",
              "PNB is the A4:2026 terminology for what was called TN-C-S / PME. Same physical arrangement; new name aligned with international standards.",
              "AFDD requirements expanded by A4:2026 across BS 7671 including some EV final-circuit contexts. Combined AFDD-RCBO devices simplify the CU layout.",
              "Local means of isolation within sight of the unit is required by Section 722 / 537 in addition to the upstream RCBO at the consumer unit. Skipping it is a non-compliance.",
              "Substituting a different unit model at install time without checking the upstream RCD requirement is a real failure mode — always read the data sheet before fitting.",
              "The IET Code of Practice for Electric Vehicle Charging Equipment Installation is the practical implementation guide for Section 722. Not legally mandatory but referenced by reasonable-installer expectations and MCS / OZEV scheme requirements.",
            ]}
          />

          <Quiz title="BS 7671 Section 722 deeper — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.1 BS 7671 Section 712 (PV)
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 BS 7671 Section 753 (heating)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
