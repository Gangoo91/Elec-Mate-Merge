/**
 * Module 2 · Section 1 · Subsection 4 — EV charging deep dive
 * Maps to City & Guilds 2365-03 / Unit 301 / LO1 / AC 1.2 (main types and characteristics)
 *
 * Layered depth: 2357 Unit 602 ELTK02 / AC 3.2 (applications and limitations); 2357 Unit
 * 312 ELTP02 / AC 3.1 (provide information on operational requirements and benefits).
 *
 * Note: Unit 301 is overview-level. Detailed EV charge-point installation competence sits
 * in MCS qualification 2921 (EVCP). This subsection equips the L3 apprentice to recognise
 * Mode 1-4 charging, the OZEV Smart Charge Points Regulations, the BS 7671 Section 722 anchor
 * and the load-management story for properties with constrained main fuse capacity.
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
  'EV charging deep dive (1.4) | Level 3 Module 2.1.4 | Elec-Mate';
const DESCRIPTION =
  "EV charging at recognition level for the L3 electrician — IEC 61851 charging Modes 1-4, the BS 7671 Section 722 anchor, OZEV Smart Charge Points Regulations 2021, load management for constrained main-fuse properties, PEN-fault protection and the apprentice contribution on a Mode 3 install.";

const checks = [
  {
    id: "l3-m2-s1-sub4-modes",
    question:
      "A customer says they want to charge their EV from a 13 A socket in the garage rather than have a dedicated charge point fitted. What is the correct response?",
    options: [
      "This is a strong micro-hydro site. With 30 m head and 100 l/s flow, theoretical hydraulic power is approximately ρ × g × h × Q = 1000 × 9.81 × 30 × 0.1 ≈ 29 kW. After turbine and generator efficiency (typically 70-85%) the realistic output is 20-25 kW continuous — significant baseload renewable energy. Practical issues: SEPA (Scottish equivalent of Environment Agency) abstraction licensing, fish-friendly intake design, civils for weir / intake / penstock / power-house, grid connection (G99 for an installation of this size), and the cost of a buried cable from the power-house to the property. The right site is rare; where it exists, micro-hydro outperforms PV and wind by a wide margin on capacity factor.",
      "That is Mode 2 charging — slow (typically 2.3 kW limited by the 13 A socket and the vehicle's portable EVSE), and most manufacturers explicitly say Mode 2 from a domestic socket is for emergency / occasional use only because the socket is not rated for the sustained current draw a full overnight charge produces. The OZEV Smart Charge Points Regulations 2021 do not apply to Mode 2 (it is not a fixed installation), but the customer loses smart-charging features and the running cost is higher because they cannot access dedicated EV tariffs that need a Mode 3 charge point. The correct recommendation is a dedicated Mode 3 unit — typically 7.4 kW single-phase or 22 kW three-phase — installed per BS 7671 Section 722 and OZEV.",
      "The Carbon Literacy Project is a UK accredited training framework (originated in Manchester in 2012) that provides workplace-level training to give every worker a working understanding of climate science, the carbon impact of their own role, and the practical steps they can take to reduce emissions at work and at home. Trainees become Certified Carbon Literate after completing eight hours of training and a documented commitment to action. Major UK construction firms (Balfour Beatty, Mace, ISG, Skanska) and increasingly larger electrical contractors are running Carbon Literacy training to build workforce-wide awareness, support CRP commitments, and meet the people-development credits in BREEAM, the UK Net-Zero Carbon Buildings Standard and similar schemes.",
      "The MFT (Megger MFT1741+, Kewtech KT64+) injects different test currents based on the RCD type. Type AC test: pure sinusoidal AC at I∆n. Type A test: pure sinusoidal AC AT I∆n PLUS pulsating DC at 1.4× I∆n (because Type A must detect both). Type F test: all of the above PLUS composite multi-frequency. Type B test: all of the above PLUS smooth DC at twice I∆n. Selecting the wrong type on the MFT may show 'pass' on a Type B device (because you're only testing the AC capability, not the DC) — false confidence. Modern MFTs auto-detect or have explicit type selection.",
    ],
    correctIndex: 1,
    explanation:
      "Mode 2 is the granny cable — works in an emergency, not a long-term plan. UK 13 A sockets are rated for a 13 A max per BS 1363; sustained 10 A overnight for years is outside the spec the socket was designed for and burnt-out plug tops are a real failure mode. Mode 3 (dedicated unit, dedicated supply) is the only sensible answer for a regular EV owner.",
  },
  {
    id: "l3-m2-s1-sub4-pen-fault",
    question:
      "What does PEN-fault protection mean on a domestic charge point and why is it specifically required?",
    options: [
      "Phase sequence test confirms the order of phase rotation (L1, L2, L3 or A, B, C in correct sequence) on three-phase supplies. Wrong sequence reverses the rotation of three-phase induction motors and pumps — can cause damage to driven plant and wrong direction of conveyors / lifts. Tested with a phase rotation indicator (Fluke 9040, Megger PRMA1) — three probe leads, instrument indicates correct or reversed sequence. Required at three-phase commissioning and after any maintenance that may have disturbed phase identification (e.g. cable replacement, supply transformer changes).",
      "Standard EICR per BS 7671 Part 6 covers the fixed wiring of the property. With env tech additions you must also: verify the PV DC isolator is accessible, labelled and operates correctly; check inverter signage at the consumer unit, meter and DC isolator (BS 7671 Section 712 plus MCS Code requirements); record the PV array Voc and inspect for visible cell or junction-box damage from a roof-safe vantage; test the AC final circuit serving the inverter as a normal final circuit; for the EV charger — verify the open-PEN protection method (built-in, TT electrode, or external device), test the RCD type (Type B or Type A + RDC-DD), check the local isolator is within sight; record findings in the EICR observations alongside the standard codes. Use C1 / C2 / C3 / FI codes per the EICR Best Practice Guide.",
      "PASS = within BS 7671 / Appendix 3 minimum acceptable limit. HEALTHY = significantly better than the limit; matches what a properly-installed system should produce. Example: BS 7671 643.3 IR limit is ≥ 1 MΩ; modern installations typically read 100+ MΩ on healthy circuits. A reading of 2 MΩ is technically PASS but not HEALTHY — it's an early indicator of insulation degradation that warrants investigation. The L3 step-up is recognising the difference: pass tells you it meets the regulation; healthy tells you the system is in good shape. Borderline pass readings are diagnostic indicators of developing faults.",
      "PEN (combined Protective Earth and Neutral) fault protection guards against the rare but serious scenario where the supply neutral is broken upstream of the property on a TN-C-S (PME) supply. With a broken PEN, the property's earthing system can rise to dangerous voltage above true earth — anything connected to that earthing system, including the EV bodywork via the charge cable, becomes a shock and fire risk. Section 722 of BS 7671 requires the charge point installation to either provide PEN-fault detection-and-disconnection within the unit (most modern units have this built in), or use an alternative earthing arrangement such as a TT earth electrode for the charge point. A4:2026 has refined the technical detail of the acceptable methods.",
    ],
    correctIndex: 3,
    explanation:
      "Broken-PEN is the headline EV-specific risk. On a TN-C-S supply, an upstream PEN break leaves the property's earth connected only to the load-current return path through the neighbours — earth potential can swing tens of volts. Inside the house this is dangerous; with an EV plugged in to the metal bodywork on a wet drive it is significantly more dangerous. Section 722 makes the protective measure non-optional. The apprentice should know which method the unit uses (built-in detection vs TT electrode) and confirm it is commissioned correctly.",
  },
  {
    id: "l3-m2-s1-sub4-load-management",
    question:
      "A property with a 60 A main fuse already has a 9.5 kW shower, an electric oven and a 13.5 kWh battery system. The customer wants a 7.4 kW EV charger added. What is the correct apprentice response?",
    options: [
      "Not always. ASHP outdoor units are covered by Permitted Development in England subject to several conditions, including: not on a flat roof; not on a wall facing or visible from a highway; minimum distance from boundary (often 1 m); MCS 020 sound-assessment compliance; and not in a conservation area / on a listed building. Front-facing wall placement may exclude PD; the certified installer runs the MCS 020 calc and the PD eligibility check. Where PD doesn't apply, full planning permission is required (8-week timeline). Don't fit until planning status is confirmed.",
      "Flag the diversity calculation to the designer. A 60 A main fuse is approximately 14.4 kVA on single-phase 240 V. Concurrent operation of the shower (9.5 kW), oven element (3-4 kW) and EV charger (7.4 kW) would exceed it and trip the cut-out. Two solutions: (1) request a main-fuse upgrade from the DNO (free in many areas, can take weeks), or (2) fit a load-management device that throttles or pauses the EV charger when total property demand approaches the cut-out limit. Most modern Mode 3 chargers (Zappi, Ohme, Hypervolt, etc.) include built-in load-management with a CT clamp on the main supply tail for exactly this scenario. The choice is the designer's; the apprentice's contribution is to flag the constraint and not just bolt the charger on.",
      "Raise it formally. As an apprentice you have three points of contact — your employer (formal grievance procedure under the ACAS Code), your training-provider tutor (responsible for the quality of your training experience), and your end-point assessment organisation. Talk to your tutor first — they have the authority to intervene with the employer about training quality. If the employer is in breach of the apprenticeship agreement (which sets out the training the employer must provide), there's a documented escalation route. ACAS conciliation is available if it can't be resolved internally.",
      "Because a faulty proving-dead tester can show 'zero' on a live circuit — and you'd take a fatal shock. The function check confirms the tester responds to a known source. The proving-tester-on-known-source step is built into the JIB six-step (Sub 1.2) for exactly this reason. The Martindale GVD2 proving unit gives a portable known source; alternatively a known-live socket on a different circuit. Either way, the tester's response on a known source is the evidence the tester is working. Without that evidence, a 'zero' reading on the circuit you're about to work on means nothing.",
    ],
    correctIndex: 1,
    explanation:
      "Diversity matters more than ever now that domestic loads include heat pumps, EV chargers and batteries on top of traditional electric showers and ovens. A 60 A main fuse was generous in 1990; it is now constrained in many properties. Load management is the cheap, fast workaround; main-fuse upgrade is the longer-term fix. The MCS-certified designer signs off the calculation; the apprentice should recognise when the headline load total is likely to exceed the cut-out.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What are the four IEC 61851 charging Modes and which one applies to a typical UK home charge point?",
    options: [
      "The label records the refrigerant type, GWP value, charge weight in kilograms and the equivalent tonnes of CO2 the charge represents. The label is a statutory requirement under the F-Gas Regulation. It triggers leak-check frequency rules (typically once a year for charges over 5 tonnes CO2 equivalent without an automatic leak detection system, less often with one), drives the recovery requirements at end of life, and helps the F-Gas engineer choose the right recovery cylinder if the unit is decommissioned.",
      "Mode 1 is direct AC connection to a standard domestic socket with no in-cable protection (effectively banned for EVs in the UK and most of Europe). Mode 2 is AC with in-cable control protection (ICCB) — the 'granny cable' that ships with most EVs for emergency 13 A socket charging. Mode 3 is AC charging through a dedicated charge point with the control pilot signal and protection built into the fixed installation — this is the standard UK home and workplace install. Mode 4 is DC rapid charging where the rectifier is in the charger, not the car — used for motorway rapid charging at 50 kW upwards.",
      "Common causes (in approximate frequency order): (1) physical damage — nail / screw through cable during DIY, mouse damage in lofts, abrasion against sharp metalwork. (2) thermal damage — cable run alongside a heating pipe, conductors derated by enclosed installation method, prolonged overload heating. (3) moisture / contamination — water ingress into ceiling void, condensation in unheated buildings, salt-air corrosion in coastal properties. (4) UV degradation — exterior cables exposed to sunlight without UV protection. (5) ageing — polymer insulation breakdown after 30+ years (rubber-insulated cables from pre-1970s installations). (6) chemical attack — cables in contact with PVC pipes, certain adhesives, hydrocarbon spills.",
      "Day-rate: customer pays an agreed daily (or hourly) rate for time spent plus materials at agreed markup. Risk on time-overrun sits with the customer. Fixed-price: you quote a single all-in price for the defined scope. Risk on time-overrun sits with you. Customers typically prefer fixed-price (predictable budget); contractors typically prefer day-rate (no overrun risk). Practical compromise: fixed-price for well-defined scopes, day-rate for variable or fault-finding work.",
    ],
    correctAnswer: 1,
    explanation:
      "Mode 3 is the UK home install. Mode 2 is the emergency-only 13 A cable that ships with the car. Mode 4 is DC rapid (the 50/100/150/350 kW units at motorway services). Mode 1 is essentially historical for cars — never use it for an EV.",
  },
  {
    id: 2,
    question:
      "Where does the BS 7671 framework for electric vehicle charging installations sit?",
    options: [
      "Every employee must (a) take reasonable care for the health and safety of themselves and others who may be affected by their acts or omissions at work, and (b) co-operate with the employer or any other person in the discharge of any duty placed on the employer or that other person under the relevant statutory provisions. 'Following orders' is not a defence — the personal duty stays with the employee regardless of what they were told to do.",
      "Site induction covering the relevant parts of the construction phase plan, the site rules, the welfare arrangements, the emergency procedures, and the specific hazards on that site. Plus access to relevant information from the pre-construction phase. CDM 2015 Reg 13 makes this a duty on the principal contractor and Reg 15 makes it a duty on the worker to co-operate with it.",
      "Section 722 of BS 7671 (Electric vehicle charging installations) is the regulation anchor. It applies in addition to the rest of BS 7671 and covers the supply, the charging point, the protective measures (especially the PEN-fault and additional protection requirements), the cable rating and the means of isolation. A4:2026 has refined Section 722 alongside the broader updates around TN-C-S systems (now PNB) and AFDD requirements.",
      "The four stages — concrete experience (having an emotional interaction), reflective observation (thinking about what happened and how you felt), abstract conceptualisation (identifying patterns and principles), and active experimentation (trying a new approach next time) — create a systematic method for learning from emotional experiences rather than repeating the same patterns",
    ],
    correctAnswer: 2,
    explanation:
      "Section 722 is the EV anchor. It works alongside Section 411 (general protective measures), Section 532 (RCDs), Appendix 4 (cable rating) and the rest of the wiring regs. The IET Code of Practice for Electric Vehicle Charging Equipment Installation (currently in its 5th edition) is the practical companion. A4:2026 refines several technical details, particularly around PEN-fault detection methods.",
  },
  {
    id: 3,
    question:
      "What does the OZEV Smart Charge Points Regulations 2021 require of a domestic charge point installed in the UK?",
    options: [
      "Because scope 3 captures the embodied carbon of purchased materials, and an electrical contractor procures very large quantities of high-embodied-carbon material — copper cable in particular. The conductor in a single 100-metre drum of 16 mm two-core SWA cable can carry 20-30 kg of CO2 equivalent in embodied carbon. A contractor buying tens of thousands of metres of cable per year can easily have scope 3 purchased-goods emissions an order of magnitude larger than the combined diesel and electricity figures of scope 1 and scope 2. The use-phase emissions of installed systems (operational electricity drawn by lighting, power and HVAC over decades) can be larger still on commercial fit-outs.",
      "One per RCBO. Each RCBO is an independent RCD device. Test each at 1 x I delta n, record trip time on the Schedule of Test Results against the circuit number. Standard MFT workflow: select RCD test mode, set I delta n to 30 mA (or other rating per device), AC test, plug into the circuit\\\\\\\\'s socket or test from the RCBO load terminals, press TEST, record trip time, move to next circuit. 12 RCBOs = 12 tests + 12 readings on the schedule. Modern MFTs auto-fill the schedule when they\\\\\\\\'re paired with certification software.",
      "Three steps: (1) Visual — case undamaged, leads not nicked or crushed, probes have intact finger barriers, no visible burn marks or melted plastic. (2) Calibration — calibration label in date (typically annual for MFT, two-yearly for two-pole testers, manufacturer's interval for multimeters); calibration certificate available if challenged. (3) Function — tester proves on a known live source AND on a known dead source; battery level indication healthy; selector switch operates cleanly. Any failure on any step — the instrument is not used until rectified. Most firms have a pre-use inspection log signed by the operative at the start of each shift.",
      "All charge points sold for use in domestic and workplace settings in Great Britain must be 'smart' — capable of being scheduled, default off-peak charging hours pre-set, randomised delay function (to avoid grid spikes when half a million chargers turn on at midnight), data privacy / cybersecurity baseline, and a 'safety provision' that disconnects on certain fault detections. Compliance is a condition of sale; the installer should fit a unit that the manufacturer has self-certified as Regulations-compliant. The apprentice does not need to verify each technical clause but should recognise that any new domestic install is using a smart-compliant unit.",
    ],
    correctAnswer: 3,
    explanation:
      "The Electric Vehicles (Smart Charge Points) Regulations 2021 came into force from 30 June 2022 in Great Britain. They are sales-side regulations (the manufacturer/seller carries primary responsibility) but the installer should only fit compliant units. The randomised delay (up to 600 seconds) is the most visible change — it stops the grid getting a sudden 5 GW spike when off-peak windows open simultaneously across the country.",
  },
  {
    id: 4,
    question:
      "What is a CT clamp doing on a Mode 3 charge-point install and why does it matter to the apprentice?",
    options: [
      "The current transformer (CT) clamp fits around one of the property's main supply tails (typically the live), measuring the total current the property is drawing. The charge point uses that measurement to throttle or pause its own current draw so the property total never exceeds a configured limit (commonly the main-fuse rating). This is dynamic load management — it lets a 7.4 kW charger live behind a constrained main fuse without the cut-out tripping when the shower comes on. The apprentice's job is to install the CT clamp around the correct tail in the correct orientation per the manufacturer's instructions; wrong orientation gives the unit the wrong measurement and load management does not work.",
      "Significant. A south-facing roof at 30-40° pitch is the optimal UK orientation, posting 100% of reference yield. East-facing or west-facing roofs typically produce 80-85% of optimal. North-facing produces 50-65% (still positive but with much longer payback). Steeper pitches favour winter performance; shallower pitches favour summer performance. Flat roofs get an A-frame mount to set a target pitch and azimuth. The MCS Yield Calculator handles all of this — produces the kWh figure for the SAP and the customer handover.",
      "Cumulative leakage from the charger PLUS other appliances on the same RCD-protected upstream sub-main, NOT the charger alone. Modern EV chargers leak 1–3 mA continuously to earth through their internal filter caps (normal). If the upstream RCBO is shared with other circuits also running their own filter caps (LED drivers, IT kit, induction hob electronics), the cumulative leakage on the RCD can sit at 15–20 mA — well within the 30 mA threshold but close enough that the start-up surge of the EV charger pushes it over. Diagnostic: clamp the upstream RCBO's L+N with a leakage clamp meter (Fluke 360, Megger DCM340), reading the actual residual current; if it's &gt; 15 mA in steady state, the EV charger needs its own dedicated RCD upstream (which is what BS 7671 Reg 722.531.3 + A4:2026 prefer anyway).",
      "Mode 3 is AC charging through a dedicated charger that controls and protects the charging session — typical domestic 7 kW units (single-phase) or 22 kW units (three-phase). The vehicle's onboard charger converts AC to DC for the battery. Mode 4 is DC fast charging — the off-vehicle equipment (typically 50-350 kW public rapid chargers) outputs DC directly to the battery, bypassing the vehicle's onboard charger. Domestic installations are essentially always Mode 3. BS 7671 Section 722 (significantly amended in A4:2026) governs the electrical installation requirements.",
    ],
    correctAnswer: 0,
    explanation:
      "Load management via CT clamp has become standard on UK domestic chargers because so many properties have constrained main fuses. Zappi, Ohme, Hypervolt, Wallbox Pulsar Plus and most modern units include this. The CT clamp orientation matters — the manufacturer's manual specifies which way the arrow points relative to the supply direction. Get it wrong and the unit thinks the property is exporting (or in standby) when it is actually drawing.",
  },
  {
    id: 5,
    question:
      "Why is a 7.4 kW single-phase charger the typical UK domestic install rather than a 22 kW three-phase unit?",
    options: [
      "Most UK domestic supplies are single-phase. 7.4 kW is approximately 32 A at 230 V — the maximum that fits comfortably on a single-phase supply alongside the rest of the property load. Three-phase is uncommon in UK housing; getting a three-phase upgrade from the DNO is expensive and time-consuming. 22 kW three-phase makes sense in workplace and commercial sites where three-phase is already on site, or in larger properties where the customer is paying for an upgrade anyway. For a typical UK home, 7.4 kW single-phase delivers around 30-40 miles of range per hour — enough for an overnight charge to top up a daily commute.",
      "Both options above are partly correct.",
      "Three-phase chargers are illegal in domestic UK.",
      "22 kW chargers cannot charge most EVs at full speed because the on-board AC charger is the bottleneck.",
    ],
    correctAnswer: 1,
    explanation:
      "Both reasons matter. UK domestic is single-phase by default, and most EVs have on-board AC chargers limited to 7.4 kW or 11 kW even when fed three-phase — so the customer pays for the three-phase install and only gets a fraction of the headline 22 kW. For workplace and fleet sites, 22 kW makes more sense. For a typical domestic install, 7.4 kW single-phase is the right answer.",
  },
  {
    id: 6,
    question:
      "What does anti-tamper signage on a charge point installation mean in practice?",
    options: [
      "Multiple legitimate causes. (1) Instrument tolerance — both the Zs tester and the continuity tester have plus or minus 5-10 percent each, which can compound. (2) Slight temperature difference — the cables may be slightly warmer at live test time than at dead test time. (3) Supply voltage variation between the two tests can affect calculation. (4) The dead-test R1+R2 may include a parallel earth path (e.g. via metal back-boxes) that doesn\\\\\\\\'t carry full fault current under live conditions. Up to 20 percent discrepancy is generally within acceptable tolerance; investigate above 20 percent.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
      "The charge point installation typically includes a notice label identifying the supply origin, the protective device that isolates it, the type of earthing arrangement (TN-C-S with PEN-fault protection or TT with a local electrode) and any special instructions for emergency isolation. Section 722 and the IET Code of Practice both specify the labelling. The customer should be able to point to the means of isolation and the maintenance log; the next electrician arriving on site (perhaps years later) should be able to identify the install configuration without disassembling anything. The label is not decorative — it is a maintenance and safety document.",
      "AC, A, F or B — and a time-delayed device adds (S) suffix for devices to BS EN 61008, BS EN 61009 or BS EN 62423. So a time-delayed Type A device is recorded as \\\\\\\"A (S)\\\\\\\". The type code reflects the residual-current waveform sensitivity: AC = pure sinusoidal AC; A = AC + pulsating DC; F = A + composite (motor drives); B = A + F + smooth DC. Time-delayed (S) means selective tripping coordination — typically used as an upstream device with downstream non-delayed RCDs on individual circuits.",
    ],
    correctAnswer: 2,
    explanation:
      "Labelling is sometimes treated as a finishing detail and skipped under time pressure. It is not a finishing detail — it is regulatory and it carries forward to every future electrician who visits the property. Section 722 specifies the labelling minimum; the IET Code of Practice for EV Charging Equipment Installation expands on best practice.",
  },
  {
    id: 7,
    question:
      "A customer asks why their EV charger appears to slow down or pause when their heat pump is running hard. What is the explanation?",
    options: [
      "ACAS promotes early, informal resolution through open conversation — addressing issues promptly, listening to all perspectives, seeking mutually acceptable solutions, and using formal processes only when informal approaches have been exhausted. This aligns with EI-based conflict resolution that prioritises empathic dialogue, assertive communication, and collaborative problem-solving",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "The Contracts Manager owns the commercial relationship with the main contractor (or client direct) — the programme, the variations, the labour resourcing, the invoicing. They sit above the Project Engineer and the Site Supervisor, often running several jobs in parallel. They're rarely on any one site full-time but they're the senior decision-maker for that contract.",
      "Load management is doing its job. The CT clamp on the main supply detects the rising property total when the heat pump enters defrost cycle or fast-heat mode (drawing 3-7 kW) and the charger throttles its own draw to keep the total below the configured limit (typically the main-fuse rating). This is the design intent — better to throttle the charger temporarily than to trip the cut-out. The customer should be briefed on this at handover so the slowdown is not interpreted as a fault.",
    ],
    correctAnswer: 3,
    explanation:
      "Dynamic load management produces visible behaviour the customer may not expect. The same logic kicks in when an electric shower is in use, when the oven is on full, or when the immersion heater fires. Modern chargers usually include a setting for the priority — should the charger throttle entirely when it conflicts with other loads, or take its share. Brief the customer on what the behaviour means.",
  },
  {
    id: 8,
    question:
      "What is the apprentice's contribution on a Mode 3 charge point install where an MCS-certified electrician is signing off the design?",
    options: [
      "The apprentice typically contributes the cable run from the consumer unit to the charge-point location (often a 6 mm or 10 mm meter-tails route through a wall), the supplementary bonding (where required), the supply-side termination at the consumer unit including any new RCBO or AFDD, the CT clamp installation around the supply tail, the labelling, and assists with first-fix mounting of the unit enclosure. The MCS-certified person handles the design, the OZEV-compliant unit selection, the commissioning and the regulatory paperwork (including the DNO notification under ENA G98 if export is enabled, and registration with OZEV for any grant claim).",
      "Three reasons. (1) Verify the fix actually worked — a repair you think is good can fail under live conditions; the retest catches the failure before the customer's reset goes wrong. (2) Verify the fix didn't introduce a new fault — terminal screw over-tightened can crack; cable repositioned can chafe; new component can be DOA. (3) Generate the documented evidence of compliance — the post-fix retest readings on the job sheet are the proof that BS 7671 643 requirements are met. Skipping the retest = no evidence of correct repair = comeback risk + regulatory exposure.",
      "Five conditions. (1) Cumulative repair cost approaching system replacement cost (cumulative repairs at 70%+ of new system). (2) System at end-of-life (CU 25+ years old, multiple aging components). (3) Code 1 / Code 2 EICR findings affecting multiple aspects of the system. (4) Building work or change-of-use happening; opportunity to upgrade. (5) New regulatory requirements (A4:2026 or future) that the existing system can't meet without major rework. The decision is normally the senior / customer's; the L3 apprentice identifies the indicators and escalates.",
      "All charge points sold for use in domestic and workplace settings in Great Britain must be 'smart' — capable of being scheduled, default off-peak charging hours pre-set, randomised delay function (to avoid grid spikes when half a million chargers turn on at midnight), data privacy / cybersecurity baseline, and a 'safety provision' that disconnects on certain fault detections. Compliance is a condition of sale; the installer should fit a unit that the manufacturer has self-certified as Regulations-compliant. The apprentice does not need to verify each technical clause but should recognise that any new domestic install is using a smart-compliant unit.",
    ],
    correctAnswer: 0,
    explanation:
      "EV charge-point installs are a major employer of L3 apprentices because the volume is high and the cable-pulling, termination and bonding work is typical electrician scope. The MCS-2921 / OZEV-authorised installer signs off the design and commissioning; the apprentice does the wiring under their direction. Recognising the sequence of who does what on these jobs is part of Unit 301.",
  },
];

const faqs = [
  {
    question: "Why does my electric car not charge at the full 22 kW from a three-phase charger?",
    answer:
      "Most EVs in the UK domestic market have an on-board AC charger limited to 7.4 kW (single-phase) or 11 kW (three-phase). The headline 22 kW from a three-phase wall unit only delivers if the car can accept 22 kW AC — and most cannot. A 7.4 kW single-phase charger is therefore the right answer for most UK domestic installs even when three-phase is available. Workplace and fleet sites get more value from 22 kW because they may charge multiple cars whose individual on-board limits are less of a constraint.",
  },
  {
    question: "What is the difference between AC charging and DC rapid charging?",
    answer:
      "AC charging (Mode 2 and Mode 3) sends AC into the car; the car's on-board rectifier converts it to DC for the battery — limited by the on-board charger size, typically 7.4-11 kW. DC rapid charging (Mode 4) puts the rectifier in the charger itself and sends DC straight into the car battery, bypassing the on-board charger. Rapid units run at 50 kW and up; ultra-rapid at 150-350 kW. DC rapid is for motorway and en-route charging; AC is for home, workplace and overnight stops.",
  },
  {
    question: "Is the EV charger covered by the consumer unit's main RCD or does it need its own?",
    answer:
      "Section 722 of BS 7671 has specific requirements for additional protection on the EV final circuit. Modern Mode 3 charge points typically include a Type A RCD with 6 mA DC fault detection built into the unit (the IEC 62752 / IEC 61851-1 framework calls this an RDC-DD). This satisfies the additional protection requirement and means the upstream protective device can be a Type A RCBO or AFDD without needing to be Type B. If the unit does not include the DC-fault detection, the upstream device must — typically a Type B RCD, which is significantly more expensive. The MCS-certified designer specifies which combination is being used; the apprentice fits per the design.",
  },
  {
    question: "Do the OZEV grants still apply to domestic EV charge points?",
    answer:
      "The original OZEV Electric Vehicle Homecharge Scheme (EVHS) for owner-occupiers ended in March 2022. Grants currently still apply for renters and flat-dwellers under the EV Chargepoint Grant, and for landlords, fleets and workplaces under successor schemes. Eligibility and amounts change — refer to the current GOV.UK guidance on each install. The MCS-certified installer handles the grant application; the apprentice should recognise that grant eligibility is not automatic and may need pre-notification.",
  },
  {
    question: "Can a customer use solar PV to charge their EV?",
    answer:
      "Yes — and it is one of the most popular reasons people fit a charger and PV together. Modern Mode 3 chargers (Zappi was the original, others now match) include a 'PV-only' or 'eco' mode that monitors the property's net export via a CT clamp and modulates the charge current to follow the available PV surplus. The car charges as fast as the PV can spare, pauses when PV drops, resumes when PV rises. Captures more solar self-consumption than blind grid charging. Works best for cars and routines that allow daytime charging at home.",
  },
  {
    question: "What happens to a charge point installation if the customer changes their EV?",
    answer:
      "Nothing on the install side — Mode 3 chargers fitted in the UK use the Type 2 socket which is the universal connector for AC charging across all current EVs sold in Europe and the UK. The customer plugs in their next EV the same way as the current one. The on-board charger speed of the new car may differ (from 3.7 kW to 22 kW depending on the model), but the wall unit accommodates whatever the car can accept up to its own rated output. This is one of the things to brief the customer on at handover — the install is car-agnostic.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module2-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 4"
            title="EV charging deep dive"
            description="EV charging at recognition level for the L3 electrician — Modes 1-4, the BS 7671 Section 722 framework, the OZEV Smart Charge Points Regulations 2021, dynamic load management for constrained supplies, PEN-fault protection on TN-C-S, and the apprentice contribution on a Mode 3 install."
            tone="emerald"
          />

          <TLDR
            points={[
              "Mode 3 (dedicated AC charge point with control-pilot protection in the fixed installation) is the standard UK home install. Mode 2 (granny cable from a 13 A socket) is for emergencies. Mode 4 is DC rapid charging at motorway services.",
              "Section 722 of BS 7671 is the regulation anchor for EV charging installations. PEN-fault protection on TN-C-S supplies is non-optional — typically built into the modern charge point or via a TT electrode for the EV side.",
              "OZEV Smart Charge Points Regulations 2021 mean every domestic and workplace unit sold in Great Britain is smart-capable, default off-peak, with a randomised delay to prevent grid spikes.",
              "Dynamic load management via a CT clamp on the supply tail is now standard. Lets a 7.4 kW charger coexist with an electric shower, an oven and a heat pump on a constrained 60-80 A main fuse.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify IEC 61851 charging Modes 1-4 and explain which applies to a UK home installation.",
              "Locate the EV charging regulation framework in BS 7671 Section 722 and the IET Code of Practice for Electric Vehicle Charging Equipment Installation.",
              "Describe PEN-fault protection and explain why it is specifically required on TN-C-S (PME / PNB) supplies serving an EV charge point.",
              "Recognise the OZEV Smart Charge Points Regulations 2021 requirements that apply to any domestic or workplace charge point sold in Great Britain.",
              "Describe how dynamic load management via a CT clamp lets a 7.4 kW charger coexist with other heavy loads on a constrained main fuse.",
              "Identify the apprentice's contribution on a Mode 3 install where an MCS-certified electrician is signing off the design.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The four IEC 61851 charging Modes</ContentEyebrow>

          <ConceptBlock
            title="Mode 1 to Mode 4 describe how protection and control sit between the supply and the car"
            plainEnglish="The international standard IEC 61851 defines four charging Modes. They describe the architecture of the supply and the protection, not the speed. Recognising which Mode applies to the install in front of you tells you what regulation framework applies and what the apprentice should expect to see on site."
            onSite="On a UK domestic site you will almost always see Mode 3 — a dedicated wall-mounted unit fed by its own protected final circuit from the consumer unit, with the control-pilot signal and the in-cable protection provided by the unit. Mode 2 (the granny cable that ships with the car) shows up where the customer has not yet had a charge point installed; it is for emergency or occasional use. Mode 4 (DC rapid) is the motorway and forecourt scope — different installer specialisation entirely. Mode 1 (direct AC connection with no in-cable protection) is essentially banned for EVs in the UK."
          >
            <p>
              The four modes summarised:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mode 1</strong> — direct AC connection through a standard socket with no in-cable control or protection. Effectively banned for EVs in the UK; appears in some industrial battery applications.
              </li>
              <li>
                <strong>Mode 2</strong> — AC through a standard socket with in-cable control box (ICCB) providing pilot signal and protection. The 'granny cable' that ships with most EVs. 13 A maximum on a UK domestic socket — typically 2.3 kW. Emergency / occasional use only; sustained use risks burning out the socket.
              </li>
              <li>
                <strong>Mode 3</strong> — AC charging through a dedicated charge point with the control pilot and protection built into the fixed installation. The standard UK home install. Typically 7.4 kW single-phase (32 A at 230 V) or 22 kW three-phase. BS 7671 Section 722 governs.
              </li>
              <li>
                <strong>Mode 4</strong> — DC charging where the rectifier is in the charger, not the car. Bypasses the on-board AC charger. 50 kW upwards; motorway rapid (50-150 kW), ultra-rapid (150-350 kW). Different install specialism.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 7671 Section 722 — the regulation anchor</ContentEyebrow>

          <ConceptBlock
            title="Section 722 governs every EV charging installation in the UK"
            plainEnglish="Section 722 of BS 7671 is the dedicated section for electric vehicle charging installations. It applies in addition to the rest of BS 7671 and covers supply arrangement, additional protective measures (especially against shock from a broken PEN), cable rating, isolation and labelling. A4:2026 has refined Section 722 alongside the broader update around TN-C-S systems (now also referred to as PNB — Protective Neutral Bonded — in the updated terminology) and AFDD requirements."
            onSite="On site this means the EV final circuit needs particular attention to: (1) the earthing arrangement and PEN-fault protection on a TN-C-S supply, (2) the additional protection device for both AC and DC fault currents (RDC-DD or upstream Type B RCD), (3) the cable rating including derating for any installed methods that limit ampacity, (4) the means of isolation accessible to the customer, and (5) the labelling identifying supply origin and earthing arrangement. The MCS-certified designer specifies the design; the apprentice executes the wiring per the design."
          >
            <p>
              The five Section 722 details an apprentice should recognise:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PEN-fault protection</strong> — typically built into the charge point (modern units include automatic disconnection on PEN fault) or via a separate TT electrode for the EV.
              </li>
              <li>
                <strong>DC fault current detection</strong> — Type A RCD plus 6 mA DC detection (RDC-DD) built into the unit, or upstream Type B RCD.
              </li>
              <li>
                <strong>Cable rating</strong> — typically 6 mm or 10 mm singles or T+E for a 7.4 kW (32 A) circuit, depending on length and installation method.
              </li>
              <li>
                <strong>Isolation</strong> — local isolator close to the unit, plus the upstream RCBO / AFDD in the consumer unit.
              </li>
              <li>
                <strong>Labelling</strong> — supply origin, earthing arrangement, isolation point, emergency stop instructions.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 (Electric vehicle charging installations)"
            clause={
              <>
                "The requirements of this section apply to circuits intended to supply electric vehicles for charging purposes. Additional requirements apply for protection against electric shock — in particular Regulation 722.411.4.1 (PEN-fault detection on TN-C-S supplies) and Regulation 722.531.3.101 (RCD requirements including the detection of smooth DC fault current)."
              </>
            }
            meaning={
              <>
                Section 722 is the EV regulation anchor. It is not a stand-alone document — it works alongside Section 411 (general protective measures), Section 532 (RCDs), Section 514 (identification and labelling), Appendix 4 (cable rating) and the rest of the BS 7671 framework. A4:2026 has refined the technical detail of acceptable PEN-fault detection methods and clarified the interaction between the unit's built-in protection and the upstream protective device. The IET Code of Practice for Electric Vehicle Charging Equipment Installation is the practical implementation companion.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722 (paraphrased from published commentary on the A4:2026 amendment — full text in IET Wiring Regulations 18th Edition, A4:2026, and the IET Code of Practice for Electric Vehicle Charging Equipment Installation)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 scope changes"
            clause={
              <>
                Section 722 of Part 7 of BS 7671:2018+A4:2026 covers electric vehicle charging
                installations. The published text indicates that this section contains
                significant changes to the Regulation(s) applicable to EV charging
                installations; installers and certifiers shall consult Section 722 for the
                updated requirements and obligations.
              </>
            }
            meaning={
              <>
                A4:2026 is the current edition for EV charging. If your reference book or
                training notes pre-date A4:2026 you must check Section 722 again — the changes
                touch PME handling, RCD selection and connector requirements. The IET Code of
                Practice for EV Charging Equipment Installation is the practical companion
                document.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 722 wireless charging exclusion"
            clause={
              <>
                The requirements of Section 722 do not apply to wireless charging, such as
                inductive charging. Installations employing wireless/inductive EV charging are
                outside the scope of Section 722 and require separate consideration.
              </>
            }
            meaning={
              <>
                Inductive (no-cable) charging is not covered by Section 722. If you encounter
                an inductive pad — currently rare on UK domestic — you fall back on the
                manufacturer&apos;s instructions and the relevant product standards rather than
                Section 722. For everyday Mode 3 wired AC charging, Section 722 is the home.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 722 exclusions."
          />

          <EarthingSystemDiagram />

          <SectionRule />

          <ContentEyebrow>OZEV Smart Charge Points Regulations 2021</ContentEyebrow>

          <ConceptBlock
            title="Every domestic UK charge point sold since June 2022 is smart-compliant by design"
            plainEnglish="The Electric Vehicles (Smart Charge Points) Regulations 2021 came into force on 30 June 2022 in Great Britain. They apply to any charge point sold for domestic or workplace use. The regulations are sales-side — the manufacturer / seller carries primary responsibility — but the installer should only fit compliant units and the customer should expect smart features as standard."
            onSite="The visible behaviour the apprentice will encounter: (1) the unit defaults to off-peak charging hours unless the customer overrides; (2) on starting a charge session at the start of an off-peak window, the unit waits a randomised delay (up to 600 seconds) to avoid millions of chargers turning on simultaneously and spiking the grid; (3) the unit logs charging data and supports remote scheduling; (4) the unit includes cybersecurity baseline features. None of these change the wiring; all of them change customer behaviour and customer expectations. Brief the customer on the randomised delay so they do not interpret the start delay as a fault."
          >
            <p>
              Five things the Regulations require:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Smart functionality</strong> — capable of being scheduled, monitored and remotely controlled.
              </li>
              <li>
                <strong>Default off-peak charging</strong> — pre-configured charging windows that avoid peak demand.
              </li>
              <li>
                <strong>Randomised delay</strong> — up to 600 seconds at the start of a charge session to spread the demand.
              </li>
              <li>
                <strong>Data privacy and cybersecurity</strong> — baseline standards for protecting customer data and preventing remote attack.
              </li>
              <li>
                <strong>Safety provision</strong> — disconnects on certain fault conditions detected by the unit.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Load management on constrained supplies</ContentEyebrow>

          <ConceptBlock
            title="A 7.4 kW charger lives behind a 60 A main fuse only with load management"
            plainEnglish="A 60 A main fuse is around 14.4 kVA on single-phase 230 V. A 9.5 kW shower plus a 7.4 kW EV charger plus the rest of the house can exceed it. Two solutions: upgrade the main fuse (free in many DNO areas, can take weeks), or fit dynamic load management — a CT clamp on the supply tail that lets the charger throttle itself to keep the property total below the cut-out limit."
            onSite="Most modern Mode 3 chargers in the UK include built-in dynamic load management — Zappi, Ohme, Hypervolt, Wallbox Pulsar Plus, GivEnergy, Easee. The apprentice's contribution is the CT clamp installation on the correct tail in the correct orientation per the manufacturer's instructions. Common error: clamping the wrong tail or the wrong direction. The unit then thinks the property is exporting (or in standby) when it is actually drawing — load management does not work and the customer trips the cut-out the first time the shower runs concurrently. Read the manual; check the orientation; test by deliberately switching on a known load and watching the charger throttle."
          >
            <p>
              Load-management decision factors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main fuse rating</strong> — most UK domestic supplies are 60, 80 or 100 A. Anything below 100 A is increasingly constrained as the load mix grows.
              </li>
              <li>
                <strong>Diversity calculation</strong> — the MCS-certified designer runs the calculation per the IET On-Site Guide. If the headline maximum demand exceeds the cut-out, load management or a fuse upgrade is required.
              </li>
              <li>
                <strong>CT clamp orientation</strong> — manufacturer-specific. Get it wrong and the load management does the opposite of what was intended.
              </li>
              <li>
                <strong>Customer expectation management</strong> — the charger may pause or slow during heavy concurrent loads. This is not a fault; it is the design intent.
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

          <ContentEyebrow>Connector standards — Type 2 dominates UK AC</ContentEyebrow>

          <ConceptBlock
            title="Type 2 (Mennekes) is the UK / EU AC connector standard; CCS Combo 2 is the DC standard"
            plainEnglish="The cable plugged into a UK AC charge point is almost always a Type 2 (also called Mennekes after the German manufacturer who developed the original). Seven pins — three phase plus neutral plus earth plus two control / proximity pins. The rapid DC connector at motorway services in the UK is CCS Combo 2 (Type 2 with two extra DC pins underneath). CHAdeMO (the older Japanese DC standard) is being phased out in the UK; some older Nissan Leafs still use it."
            onSite="The L3 electrician&apos;s scope is the supply side, not the connector. But the apprentice should recognise the connector type the customer&apos;s vehicle uses, because charge points are sold in two flavours — tethered (cable permanently attached, fixed connector) or untethered (Type 2 socket on the unit, customer plugs in their own portable cable). The choice affects neatness, cost and theft / wear-and-tear. Tethered is the typical home install for a single-EV household; untethered suits multi-vehicle households and workplaces where different cars connect."
          >
            <p>
              The connector landscape in 2026:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type 2 (Mennekes)</strong> — UK / EU AC standard, single or three
                phase, up to 22 kW (32 A per phase). Used on 99% of UK AC home chargers
                and public AC posts.
              </li>
              <li>
                <strong>Type 1 (J1772)</strong> — older single-phase-only AC connector, US
                / Asia origin. Some older Mitsubishi Outlander PHEVs and pre-2018 Nissan
                Leafs. Adapters available.
              </li>
              <li>
                <strong>CCS Combo 2</strong> — UK / EU DC rapid standard. Type 2 plus two
                DC pins below. 50-350 kW typical at public rapid hubs.
              </li>
              <li>
                <strong>CHAdeMO</strong> — older Japanese DC standard. Phased out;
                survives at some legacy rapid sites for older Nissan Leafs.
              </li>
              <li>
                <strong>Tesla NACS</strong> — North American Tesla connector; Tesla UK
                Superchargers now offer CCS Combo 2 as well, and the NACS standard is
                being adopted by some North American manufacturers but is not the UK
                public-charging standard.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>V2H, V2G and bidirectional charging</ContentEyebrow>

          <ConceptBlock
            title="Bidirectional charging is starting to land — V2H first, V2G next, both rare in 2026"
            plainEnglish="Vehicle-to-Home (V2H) and Vehicle-to-Grid (V2G) let the EV battery discharge back into the property or the grid. The car becomes a 60-80 kWh battery on wheels — typically 5-10x the size of a domestic stationary battery. As of 2026 the market is small but growing, with units like the Wallbox Quasar 2 and OVO/Indra V2G platforms emerging. The vehicle has to support bidirectional CCS (currently only some Nissan, Hyundai, Kia, Volkswagen ID and BYD models do), and the charge point has to be DC-coupled to bypass the on-board AC charger."
            onSite="V2H / V2G installs in 2026 are mostly small pilots. The L3 electrician&apos;s scope changes meaningfully — the unit is DC-side, often larger and heavier, with stricter siting and ventilation rules, and the BS 7671 framework treats it as both Section 722 (EV charging) and Section 826 (EESS) because the battery effectively becomes part of the property&apos;s storage. ENA G99 (not G98) applies because export from the unit is significant. As the market scales, expect V2H to enter mainstream installer scope first; V2G remains specialist with grid-services contracts attached."
          >
            <p>
              The two flavours and their differences:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V2H (Vehicle-to-Home)</strong> — car discharges into the property
                during peak hours or grid outages. Acts as a giant backup battery. No
                grid-export contract needed; the energy is consumed on-site.
              </li>
              <li>
                <strong>V2G (Vehicle-to-Grid)</strong> — car discharges into the grid in
                response to grid-services signals (frequency response, peak shaving). The
                customer earns revenue per kWh exported. Requires a grid-services contract
                with an aggregator (OVO, Octopus, etc.) and ENA G99 connection.
              </li>
              <li>
                <strong>Battery degradation question</strong> — bidirectional cycling adds
                wear to the EV battery. Manufacturers are starting to warrant V2G use; some
                still void the warranty. Customer needs to check.
              </li>
              <li>
                <strong>Regulation overlap</strong> — Section 722 (EV) plus Section 826
                (EESS) plus G99 (export). MCS qualifications 2921 (EV) and 3012 (EESS)
                both apply. The trade specialism is real.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Three-phase domestic and workplace charging</ContentEyebrow>

          <ConceptBlock
            title="22 kW three-phase makes sense at the workplace; rare-but-growing at home"
            plainEnglish="A three-phase domestic supply (typical in some new builds and rural properties with a borehole pump or workshop) opens the door to 22 kW (32 A per phase) AC charging. Most current EVs cannot accept 22 kW on the on-board AC charger — they cap at 7.4 kW or 11 kW — so the headline rating may not translate into headline charging speed. Where the vehicle supports it (some Renault, BMW, Tesla and Audi models), 22 kW halves the charge time."
            onSite="On a three-phase install the apprentice contribution is similar to single-phase: dedicated final circuit, RCBO with appropriate protection (Type A plus 6 mA DC detection or Type B), local isolator, charge point per manufacturer&apos;s instructions. The unit itself is often physically larger to dissipate the heat. Phase rotation matters at the unit terminations — get it wrong and the unit will sit in fault or charge slowly. Confirm rotation with a phase rotation tester at first energise."
          >
            <p>
              Three-phase install considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Vehicle on-board charger limit</strong> — most domestic EVs cap at
                7.4 kW or 11 kW AC. A 22 kW post on a 7.4 kW car gives 7.4 kW. Match the
                unit rating to the customer&apos;s actual fleet.
              </li>
              <li>
                <strong>Cable size</strong> — 32 A per phase typically needs 4 mm or 6 mm
                4-core SWA depending on length, install method and ambient. Check
                Appendix 4 of BS 7671 for the actual rating.
              </li>
              <li>
                <strong>RCD selection</strong> — Type B RCD is the typical specifier on
                three-phase EV circuits because three-phase units may produce smooth DC
                fault current that defeats Type A. Some units have integrated DC fault
                detection per phase that allows Type A upstream.
              </li>
              <li>
                <strong>Workplace context</strong> — workplace charging often uses
                load-balancing across multiple posts (back-office controller distributes a
                fixed total supply across the connected vehicles). Smarter than per-post
                load management for fleet sites.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>DNO notification and the supply upgrade pathway</ContentEyebrow>

          <ConceptBlock
            title="EV charging triggers DNO conversations more often than people expect"
            plainEnglish="Adding a 7.4 kW EV charger to a typical UK domestic supply normally fits within the existing main fuse rating once load management is configured. But not always. If the supply is constrained (60 A or below), if the customer wants 22 kW three-phase, if they already have a heat pump and a battery and want to add EV on top, or if the property has a single-phase 60 A supply when a three-phase upgrade would suit the planned tech, the DNO becomes part of the conversation."
            onSite="As the apprentice you do not file the DNO paperwork — the MCS-certified installer or the electrical contractor does. But you should recognise when a job is heading toward a DNO conversation and flag it early. A supply upgrade can take 4-12 weeks (longer for three-phase from single-phase) and the customer needs that timeline. ENA G98 covers the connection notification once the unit is in (export-capable units count); G99 applies for larger or three-phase units. Some DNOs offer free supply upgrades for EV / heat pump installs as part of network reinforcement programmes — worth checking before quoting."
          >
            <p>
              The supply-upgrade decision tree:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>60 A or 80 A single-phase</strong> — load management lets a 7.4 kW
                charger coexist with most domestic loads. Upgrade to 100 A may be worth
                discussing if the customer is also adding a heat pump.
              </li>
              <li>
                <strong>100 A single-phase</strong> — typically fine for a 7.4 kW charger
                plus heat pump plus other loads with sensible diversity.
              </li>
              <li>
                <strong>Single to three-phase</strong> — required for 22 kW charging and
                for some larger commercial installs. Significant DNO works (typically
                4-12 weeks); cost varies by area and existing infrastructure.
              </li>
              <li>
                <strong>G98 vs G99</strong> — G98 covers connect-and-notify within 16 A per
                phase. Anything above (typical for V2G or larger commercial) needs G99
                pre-application.
              </li>
              <li>
                <strong>Network reinforcement programmes</strong> — Some DNOs offer free or
                subsidised supply upgrades as part of low-carbon transition initiatives.
                Check before quoting the customer.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating the EV final circuit like an ordinary 32 A radial without checking PEN-fault protection"
            whatHappens={
              <>
                Apprentice runs 6 mm cable, fits a Type A RCBO in the consumer unit, terminates in the charge point, jobs done. Six months later a PEN fault occurs on the local network. The property's earthing system rises to dangerous voltage; the customer's wet drive plus the metal car bodywork become a shock hazard; the unit does not disconnect because PEN-fault detection was not enabled. Outcome ranges from burnt cables to serious injury. The MCS-certified designer caught it on the design but the apprentice did not know to verify it on commissioning.
              </>
            }
            doInstead={
              <>
                Confirm during commissioning that PEN-fault protection is operational. Either the unit's built-in detection is enabled and tested per the manufacturer's instructions, or a TT electrode is installed and the EV side is on a dedicated TT earth. Section 722 is non-negotiable on this. If the design specifies one method and the install delivers the other (or neither), the install is non-compliant.
              </>
            }
          />

          <CommonMistake
            title="Fitting a 7.4 kW charger to a constrained main fuse without enabling load management"
            whatHappens={
              <>
                7.4 kW charger on a 60 A main fuse with a 9.5 kW shower and a 4 kW oven. Customer cooks dinner, partner showers, EV starts charging on schedule — main fuse trips. DNO callout to replace the cut-out fuse. Customer angry. Apprentice and contractor both look bad. Repeats every couple of weeks until somebody enables the CT clamp and the load-management logic.
              </>
            }
            doInstead={
              <>
                Check the main fuse rating before fitting any 7.4 kW charger. Run the diversity calculation with the designer. If the property is constrained, fit the CT clamp around the supply tail, configure the unit's load-management settings to the main-fuse rating, and test by deliberately switching on a known load to verify the charger throttles. Brief the customer that the charger may pause or slow during heavy concurrent demand — this is the design intent.
              </>
            }
          />

          <Scenario
            title="Apprentice on a Zappi install — older 1990s semi, 60 A main fuse"
            situation={
              <>
                You are the apprentice on a Mode 3 Zappi install at a 1990s semi. Single-phase 60 A main fuse. Existing loads: 9.5 kW electric shower, 3.5 kW oven, 3 kW immersion heater (rarely used now the boiler is condensing). The MCS-certified electrician has specified a 7.4 kW Zappi v2.1 fed from a new 32 A Type A RCBO in the consumer unit, with the supplied CT clamp on the supply tail to enable dynamic load management. The unit has built-in PEN-fault detection. Cable run is 8 m of 6 mm T+E through a wall to the garage where the unit will mount.
              </>
            }
            whatToDo={
              <>
                Pull the cable, terminate at the consumer unit on the new RCBO, terminate at the charge point per the manufacturer's wiring diagram. Fit the CT clamp around the live supply tail in the orientation the manual specifies (arrow toward the meter, away from the property side — confirm against the install manual for this specific model). Test PEN-fault detection per the unit's commissioning sequence. Verify load management: with the EV charging at 7.4 kW, switch on the shower; the Zappi should reduce its draw within seconds to keep total property current below the configured limit. Brief the customer: the charger may pause or slow when other heavy loads are running, this is the load-management feature working as intended. Hand over the labelling and the MCS-certified electrician's commissioning paperwork.
              </>
            }
            whyItMatters={
              <>
                This is the typical L3 apprentice job on EV chargers. The cable pull, the consumer-unit termination, the CT clamp installation, the labelling — all standard scope. Recognising that the PEN-fault protection and the load-management commissioning are non-optional (not 'nice to have') is the difference between a compliant install and a callback. The MCS-certified person signs off the design and commissioning; the apprentice executes the wiring and contributes to the commissioning checks.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Mode 3 (dedicated AC charge point with control-pilot protection in the fixed installation) is the standard UK home install. Mode 2 (granny cable) is for emergencies. Mode 4 is DC rapid at motorway services.",
              "BS 7671 Section 722 is the EV charging anchor — works alongside Sections 411, 532 and Appendix 4. A4:2026 has refined the PEN-fault detection requirements and the interaction with the unit's built-in protection.",
              "PEN-fault protection on TN-C-S (PME/PNB) supplies is non-optional. Either the unit has built-in detection-and-disconnection, or the EV side is on a dedicated TT earth electrode.",
              "OZEV Smart Charge Points Regulations 2021 mean every domestic and workplace unit sold in Great Britain since June 2022 is smart-compliant — default off-peak, randomised delay, cybersecurity baseline.",
              "Dynamic load management via a CT clamp on the supply tail lets a 7.4 kW charger live behind a constrained main fuse. CT clamp orientation matters — read the manual.",
              "7.4 kW single-phase is the typical UK domestic install; 22 kW three-phase makes sense in workplace and commercial. Most EVs cap at 7.4-11 kW on-board AC charging anyway.",
              "DC fault detection (RDC-DD built into the unit, or upstream Type B RCD) is required. Type A RCBO upstream of a unit with built-in 6 mA DC detection is the standard combination.",
              "The MCS-certified electrician signs off the design and commissioning. The apprentice contributes the cable, termination, CT clamp, supplementary bonding, labelling and commissioning checks.",
            ]}
          />

          <Quiz title="EV charging deep dive — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 Battery energy storage systems
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module2-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Whole-system integration
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
