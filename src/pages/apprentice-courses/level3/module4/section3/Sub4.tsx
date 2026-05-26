/**
 * Module 4 · Section 3 · Subsection 4 — RCD and AFDD nuisance trips
 * Maps to C&G 2365-03 / Unit 303 / LO3 / AC 3.1
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.5 — fault locations and
 * symptoms; A4:2026 layer for AFDD requirements.
 *
 * Frame: the practical diagnosis of RCD nuisance trips (cumulative leakage,
 * single-source leakage, weather-correlated, appliance failure) and AFDD
 * nuisance trips (electronics false trigger, switching transients) — using
 * the clamp meter, the differential isolation method, and the AFDD-specific
 * test functions. A4:2026 reinforced AFDD requirements.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'RCD and AFDD nuisance trips (3.4) | Level 3 Module 4.3.4 | Elec-Mate';
const DESCRIPTION =
  'The practical diagnosis of RCD nuisance trips (cumulative leakage, weather, appliance failure) and AFDD nuisance trips (electronics false trigger, switching transients) — clamp meter method, differential isolation, AFDD test functions, A4:2026 layer.';

const checks = [
  {
    id: 'mod4-s3-sub4-cumulative',
    question:
      "What is 'cumulative leakage' on an RCD-protected installation and how does it cause nuisance trips?",
    options: [
      "A CPS is a Government-approved scheme that lets a contractor self-certify Part P notifiable work in dwellings (England/Wales). JIB is the joint employer/union body that sets pay grades, conditions and the national working rules for the contracting industry. CPS is contractor-level and licences the firm; JIB grading is operative-level and decides what you're paid and what you're allowed to sign for unsupervised on a JIB site. Different bodies, different scopes, different audiences.",
      "Cumulative leakage = the SUM of small earth-leakage currents from every appliance and circuit on the RCD's protected side. Modern installations: every LED driver leaks 0.1–0.3 mA, every PC PSU leaks 0.5–1 mA, every appliance with EMC filter leaks 0.5–2 mA. On a circuit with 30 LED downlighters + a TV + a router + a PC + 3 appliances — total leakage easily reaches 8–15 mA at no fault. Add a marginal additional load (kettle, toaster) with their own leakage and you cross the 30 mA threshold. RCD trips even though no individual circuit / appliance is faulty. Common on LED-retrofit / smart-home installations.",
      "Directly. A correctly-sized stripper removes only the insulation, leaving the copper undamaged — full cross-section preserved, full current-carrying capacity, full mechanical strength. A knife strip nicks the copper, reducing the cross-section and creating a stress-riser fracture point. A few months of thermal cycling and the conductor breaks at the nick — high resistance, hot terminal, eventual failure on EICR or worse, on fire alarm. The stripping tool is part of the 526.1 chain.",
      "Every 3 months — formal PAT (combined visual + electrical test) for harsh-environment use. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) publish typical intervals; construction-site Class I portable tools are at the short end at 3 months. Office Class I equipment is 12 months (the low-risk regime in HSE INDG236). Class II (double-insulated) and battery chargers are typically longer.",
    ],
    correctIndex: 1,
    explanation:
      "Cumulative leakage is the modern fault category that didn't exist in pre-2010 installations. Every electronic device contributes a tiny earth leakage; the sum can exceed RCD threshold. Diagnostic: clamp meter L+N together at the RCD output reads total leakage (1–25 mA range). Healthy is 1–3 mA; problem is &gt;8 mA approaching the 30 mA threshold.",
  },
  {
    id: 'mod4-s3-sub4-isolation',
    question:
      "What's the 'differential isolation' method for finding which appliance is causing an RCD trip?",
    options: [
      "Flag the diversity calculation to the designer. A 60 A main fuse is approximately 14.4 kVA on single-phase 240 V. Concurrent operation of the shower (9.5 kW), oven element (3-4 kW) and EV charger (7.4 kW) would exceed it and trip the cut-out. Two solutions: (1) request a main-fuse upgrade from the DNO (free in many areas, can take weeks), or (2) fit a load-management device that throttles or pauses the EV charger when total property demand approaches the cut-out limit. Most modern Mode 3 chargers (Zappi, Ohme, Hypervolt, etc.) include built-in load-management with a CT clamp on the main supply tail for exactly this scenario. The choice is the designer's; the apprentice's contribution is to flag the constraint and not just bolt the charger on.",
      "All of them, plus the main switch. (1) Open main switch / DNO cut-out cap (DNO call only) for incoming supply. (2) Open the EV charger isolator AND verify EV is unplugged (the EVSE may have its own contactor that closes on demand). (3) Open the PV AC isolator at the inverter AND the PV DC isolator at the array. (4) Open the battery storage AC isolator AND the battery DC isolator. (5) Confirm standby generator changeover switch is in MAINS position and lock-off the generator manual start. Then prove dead at the work point with a GS38 two-pole, AND a DC-rated tester for the PV/battery DC sides if you'll be near them.",
      "Six-step. (1) Energise the RCD with all appliances disconnected on the protected circuits. (2) Clamp meter L+N together at the RCD output — note baseline leakage (typically 1–3 mA on healthy installation). (3) Connect appliances ONE AT A TIME, watching the clamp reading. (4) The appliance whose connection causes a sudden jump (e.g. baseline 2 mA, jumps to 18 mA on connecting the dishwasher) is the leaky one. (5) For confirmation, disconnect that appliance only — leakage drops back. (6) For appliances with intermittent leakage (e.g. heating element fails on heat cycle only), trigger the operating mode and watch for the leakage rise. Identifies the leaky appliance without needing to repeat the trip-and-reset cycle.",
      "The MCS Code of Practice is the over-arching code that all MCS-certified installers must comply with. It covers consumer protection (sales practices, contracts, performance estimates honestly disclosed), installation quality, commissioning records, customer handover documentation, complaints handling and after-sales support. The installer's MCS certification can be withdrawn for breaches of the Code. The Code references the technology-specific MCS Installation Standards (MIS 3001 solar thermal, 3002 PV, 3003 wind, 3004 biomass boiler, 3005 heat pump, 3006 biomass stove, 3007 EV, 3008 hydro, 3012 battery storage) for the technical detail.",
    ],
    correctIndex: 2,
    explanation:
      "Differential isolation is the L3 standard for diagnosing RCD nuisance trips. The clamp meter (Sub 2.3) is the key instrument — it lets you measure leakage WITHOUT operating the RCD. Standard time on a typical job: 30–60 minutes vs hours of trip-and-guess.",
  },
  {
    id: 'mod4-s3-sub4-afdd',
    question:
      "An AFDD (arc fault detection device) keeps tripping on a kitchen circuit. What's the diagnostic approach?",
    options: [
      "Part P (Electrical Safety in Dwellings) requires certain types of electrical work in dwellings to be notified to Building Control — either via a registered competent-person scheme (NICEIC, NAPIT, etc.) or directly to the Local Authority. Notifiable work currently includes new circuits, consumer unit changes, and work in special locations (bathrooms / locations 700). Most environmental tech installs are notifiable — adding a PV inverter circuit, an EV charging circuit or a heat-pump dedicated radial all create new circuits and trigger Part P notification. Non-notifiable work (e.g. like-for-like socket replacement on an existing circuit) doesn't trigger Part P.",
      "Three-step. (1) Confirm AFDD is genuinely tripping on arc detection (most modern AFDDs distinguish trip cause via LCD or LED indicators) — NOT a regular RCD/MCB trip with the AFDD blamed. (2) If genuine arc trip, identify the arc source: cumulative motor commutator brushes (tumble dryer, washing machine, vacuum), poorly-terminated accessories on the affected circuit (use thermal imaging), faulty appliance with internal arcing. (3) Modern AFDDs (Hager AFB, Schneider Vigi+AF, Eaton AFDD) have 'arc signature' analysis — typical false-trigger sources: switching mode power supplies (phone chargers, laptop PSUs) with high-frequency content. Some installations need replacement of cumulative-motor appliances or different AFDD model. A4:2026 mandates AFDD on certain dwelling final circuits.",
      "Because a faulty proving-dead tester can show 'zero' on a live circuit — and you'd take a fatal shock. The function check confirms the tester responds to a known source. The proving-tester-on-known-source step is built into the JIB six-step (Sub 1.2) for exactly this reason. The Martindale GVD2 proving unit gives a portable known source; alternatively a known-live socket on a different circuit. Either way, the tester's response on a known source is the evidence the tester is working. Without that evidence, a 'zero' reading on the circuit you're about to work on means nothing.",
      "Inside the MCS heat-loss calculation document and the MCS performance estimate that the MCS-certified installer is required to provide at handover under MIS 3005. The handover pack should also contain the manufacturer's commissioning record (with measured flow, return, ambient and instantaneous COP at commissioning conditions), the EIC, the G98 / G99 notification, the user instructions, the warranty paperwork, the F-Gas record (if applicable to the refrigerant fill), and the maintenance schedule. The MCS Code 4.0 makes the handover pack contents a customer-facing duty — the installer is contractually bound to hand over a complete, signed pack on the day, not weeks later.",
    ],
    correctIndex: 1,
    explanation:
      "AFDD nuisance trips are an emerging fault category. The technology is signature-based and not 100% perfect — some appliances (cumulative motors, certain switching PSUs) have arc-like signatures that trigger false trips. The diagnostic approach is to identify whether the arc detection is real (then find the arc source) or false (then consider AFDD compatibility with the loads).",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the 30 mA RCD threshold designed to protect against and why is it set there?",
    options: [
      "Some MFTs have multiple Zs measurement ranges (e.g. low range 0-2 Omega, high range 0-200 Omega). If you\\\\\\\\\\\\'re testing a TT installation with expected Zs of 80-200 Omega and the meter is set to the low range, the reading will saturate or read inaccurately. GN3 wants you to consciously check the range matches the expected reading before pressing TEST — a failed test or wildly wrong reading wastes time and may damage the instrument if test current exceeds the range capacity.",
      "30 mA is the threshold below which a healthy adult is unlikely to suffer ventricular fibrillation from a sustained earth-fault current. Set by IEC 60479-1 (effects of current on the human body and livestock). Above 30 mA at typical contact times (200+ ms), fibrillation risk rises sharply. Below 30 mA, the heart can usually withstand the disturbance. The 30 mA RCD trips in 200 ms or less, limiting both the current AND the duration to safe levels. Higher-rated RCDs (100 mA, 300 mA) protect against fire risk (earth leakage that would cause heating) rather than electric shock.",
      "PUWER 1998 Reg 6 (inspection of work equipment) requires records of inspection results 'kept until the next inspection is recorded'. For test instruments this typically means: (1) calibration certificates from each calibration cycle (kept for the working life of the instrument plus a tail period for legal hold); (2) inspection / function-check log (some firms have a daily sheet, some app-based); (3) defect / repair records; (4) instrument register listing each instrument by ID, type, calibration date, next-due. The records support PUWER compliance AND BS 7671 certification AND legal defence.",
      "Address the 3 Ps first (the failures are specific and temporary, not permanent or pervasive), then restore intrinsic motivation: give the team autonomy in developing their own quality-check process (Pink), provide clear goals and feedback loops for each installation (flow conditions), and ensure the purpose of quality work is connected to genuine values (safety, professionalism). This multi-framework approach addresses both the setback response and the ongoing motivation system",
    ],
    correctAnswer: 1,
    explanation:
      "30 mA is a deliberate biological threshold from decades of research. BS 7671 411.4 (TT) and 411.4.5 (TN) require additional protection by 30 mA RCD on socket outlets and many other circuit types. The 30 mA + 200 ms combination is the safety case.",
  },
  {
    id: 2,
    question: "What's the difference between Type AC, Type A, Type F and Type B RCDs and which goes where?",
    options: [
      "Three. (1) Field exposure limits — ICNIRP / HSE guidance on RF field strength; standby fields can couple to your body even when you're not in direct contact. (2) Pacemaker / metal implant warning — RF fields interfere with cardiac pacemakers and can heat metallic implants; warn anyone with implants to stay clear (signage at the equipment). (3) Capacitive discharge — RF tank circuits store significant energy in capacitor banks; isolation procedure includes wait period (manufacturer-specified, typically 5–15 minutes) for capacitor bleed before working near. The L3 apprentice doesn't typically commission RF equipment but does meet it on workshop sites; the precautions need to be respected.",
      "The multimeter has 10 MΩ input impedance and will read induced voltages and 'phantom' voltages that aren't a real source — it can show 30–80 V on a dead conductor that has nothing dangerous on it, leading you to assume the circuit is live when it isn't (a false positive). The two-pole tester has low input impedance (typically a few kΩ) and 'loads' the circuit — phantom voltages collapse to zero, real sources hold. GS38 specifically prefers two-pole testers for proving dead because the low impedance gives an unambiguous answer.",
      "Type AC — detects AC residual currents only; obsolete for most new installations under BS 7671 A2:2022. Type A — detects AC and pulsating DC residual currents; current default for general use. Type F — detects AC + pulsating DC + composite multi-frequency residuals; required for circuits with VFDs, Class 1 PCs / servers. Type B — detects all of the above PLUS smooth DC residual currents; required for EV chargers (BS 7671 722.531), some PV inverters, three-phase rectifier loads. The choice depends on the load. Wrong type = won't detect the actual residual current = false sense of protection.",
      "Approximately 4.6 V or 2.0 percent of 230 V. Calculation: 6 mm copper cable has approximately 7.3 mV per A per metre voltage drop. 32 A x 35 m x 7.3 mV = 8.18 V single-direction. For circuit voltage drop the full path is line + neutral so multiply by 2 / cable factors per GN1: but the standard cable tables give the per-A-per-m value already accounting for the full loop. Check GN1 Table A1 for the exact value for the cable type. For 6 mm flat T+E with thermosetting insulation: typical 7.3 mV/A/m so 32 x 35 x 7.3 / 1000 = 8.18 V or 3.6 percent — within 5 percent socket limit but close. Worth checking the EV charger spec for its actual demand under typical use (often 28-30 A continuous, not full 32 A).",
    ],
    correctAnswer: 2,
    explanation:
      "RCD type selection is critical for modern installations with electronic loads. EV chargers MUST have Type B (or Type A + dedicated 6 mA DC RCM in the charger). VFDs need Type F minimum. PCs and servers benefit from Type A or F. The wrong type is undetected non-protection. Hager / Schneider / Wylex sell the full type range; the L3 apprentice needs to know which to fit where.",
  },
  {
    id: 3,
    question: "Why does the 30 mA RCD threshold cause more nuisance trips on modern installations than on older ones?",
    options: [
      "Five-step. (1) MAKE SAFE immediately — isolate the affected circuit / component if you can do so within your competence. (2) LABEL the fault prominently — 'OUT OF SERVICE — DO NOT RE-ENERGISE' — with date and your name. (3) INFORM CUSTOMER in writing — Dangerous Condition Notification (DCN) form describing the hazard, action taken, recommended remedial work, urgency. (4) ESCALATE to supervisor immediately — phone call, not email. (5) DOCUMENT on job sheet — what found, what done, customer brief delivered, supervisor informed. The make-safe action is non-negotiable; the customer's permission is not required for emergency safety action.",
      "On TN-C-S, the neutral and protective earth share the PEN conductor between transformer and cut-out. If the PEN breaks anywhere upstream, the customer's neutral floats relative to the transformer star point. Customer's bonded metalwork (kitchen taps, sinks, radiators, EV charger chassis, all bonded to the customer earth terminal) rises toward phase voltage relative to true earth. RCD doesn't see it (no residual current — the lifted-neutral voltage flows through bonding network as L–E volt-drop, not as imbalance). First sign: tingle on metal taps or 30+ V N–E reading at cut-out. A4:2026 added explicit Open PEN protection requirements (Reg 411.3.3, especially for EV chargers).",
      "An MID-compliant generation meter measures the total electrical output of the PV array. Required by Smart Export Guarantee (the supplier needs accurate metering to pay the export tariff) and increasingly by BUS / SEG-equivalent schemes for performance monitoring. At commissioning the meter is verified to read correctly (display zero before energising, increment as the inverter delivers, accumulate accurately over the first day's run). The customer can read the meter themselves to verify ongoing performance. The smart meter at the property handles the import / export reading for the supplier.",
      "Three reasons. (1) Cumulative leakage from electronics — every LED, every PC PSU, every appliance with an EMC filter leaks a few mA; the sum can exceed 30 mA. (2) More circuits per RCD — older installations had separate RCDs per few circuits; modern dual-RCD CUs put many circuits on one RCD, accumulating leakage. (3) More appliances per circuit — modern kitchens have dishwasher + washing machine + tumble dryer + microwave + induction hob, each contributing leakage. The 30 mA threshold hasn't changed; the load behind it has multiplied. Solution: RCBO per circuit (instead of dual-RCD CU) to isolate each circuit's leakage; replacement of high-leakage appliances; redistribution of loads.",
    ],
    correctAnswer: 3,
    explanation:
      "The cumulative leakage problem is the modern installation's defining RCD challenge. The trade response is RCBO-per-circuit (every circuit has its own RCBO; leakage is isolated to its source circuit). Most new builds and rewires now spec RCBO-per-circuit rather than dual-RCD CUs.",
  },
  {
    id: 4,
    question: "What's the operational difference between a 'split-load' (dual-RCD) CU and an 'all-RCBO' CU?",
    options: [
      "DUAL-RCD CU — two main RCDs, each protecting a group of circuits via standard MCBs. Cheaper to install but a single fault on one circuit trips the entire RCD's group (e.g. a fault on the kitchen ring trips all circuits on RCD1, including the freezer and lights). ALL-RCBO CU — every circuit has its own RCBO with both overcurrent and earth-leakage protection. More expensive but a fault on one circuit only affects that circuit. Cumulative leakage is also limited per circuit. A4:2026 reinforces RCBO-per-circuit for higher-occupancy dwellings; trade preference is RCBO-per-circuit for any new install.",
      "Old radiators were sized for 70-80°C flow temperature from a gas boiler. To deliver the same heat output at lower flow temperature, the radiators need to be larger. If you ask a heat pump to drive undersized old radiators at 70-80°C flow, the temperature lift is much bigger than at 35-40°C flow — so the COP drops sharply. SCOP reflects the actual flow temperature the system runs at across the heating season. Properly designed heat-pump retrofits include a radiator survey and upsize plan, or convert to underfloor where possible.",
      "Three tests, ALL of which must be satisfied: (a) it is unreasonable in all the circumstances for the conductor to be dead, AND (b) it is reasonable in all the circumstances for the work to be carried out live, AND (c) suitable precautions are taken to prevent injury. All three — not any one. Most fault diagnosis live working passes test (a) (you need voltage to measure) but tests (b) and (c) are where most risk-assessment failures sit.",
      "Sequencing the trades that need to interact on the install: F-Gas-certified engineer for refrigerant; plumber for the wet system, cylinder, controls; electrician for supply, isolation, controls integration; sometimes a builder for cylinder cupboard alteration; sometimes a roofer / builder for outdoor unit mounting. Each trade has a sequence dependency — the electrical first-fix has to be ready before the F-Gas engineer commissions; the plumbing has to be charged and pressurised before the heat pump runs. Project management of the trade sequence is the certified installer's responsibility; as the apprentice you respect the sequence and don't get ahead.",
    ],
    correctAnswer: 0,
    explanation:
      "RCBO-per-circuit has become the trade standard for new installations and rewires. The selectivity advantage (one fault doesn't kill multiple circuits) and the cumulative-leakage advantage (each circuit's leakage isolated) both favour the design. Hager, Schneider, Wylex, MK all offer all-RCBO CUs at competitive price points now.",
  },
  {
    id: 5,
    question: "What's the difference between a Type AC RCD and a Type A RCD trip-time-test wise on the MFT?",
    options: [
      "NAPIT is multi-trade — registers electricians, plumbers, gas engineers and other trades under a single scheme structure. For multi-discipline firms (e.g. a heating engineer doing gas plus electrical wiring) NAPIT offers single-scheme coverage rather than dual scheme membership. Cost is broadly comparable to NICEIC for electrical-only registration; the saving comes if you also need other trade registrations.",
      "The MFT (Megger MFT1741+, Kewtech KT64+) injects different test currents based on the RCD type. Type AC test: pure sinusoidal AC at I∆n. Type A test: pure sinusoidal AC AT I∆n PLUS pulsating DC at 1.4× I∆n (because Type A must detect both). Type F test: all of the above PLUS composite multi-frequency. Type B test: all of the above PLUS smooth DC at twice I∆n. Selecting the wrong type on the MFT may show 'pass' on a Type B device (because you're only testing the AC capability, not the DC) — false confidence. Modern MFTs auto-detect or have explicit type selection.",
      "G100 (active export limitation scheme) applies where the customer wants to install a system bigger than the DNO would otherwise accept, on the basis that an active limiter will cap exported power to a level the network can accommodate. It is a way to install (say) a 12 kWp PV array on a network that cannot accept 12 kW export, by limiting export to 3.68 kW with self-consumption and battery storage soaking up the rest. G100 sits within the broader G99 process — the DNO Connection Offer will include the G100 export limit and the limiter type-test requirement. The L3 apprentice will not run the G100 application but should recognise it as the technical mechanism behind 'oversized array, limited export' designs.",
      "Segregation at source — separate stillages or skips for general / metal / WEEE / hazardous / wood / cardboard. Authorised carriers only, with WTNs / HWCNs accompanying every transfer. WEEE to AATF via specialist recycler. Hazardous (fluorescent tubes, batteries, asbestos) consigned and quarantined. Spillage kit on site for refrigerants and oils. Documentation kept for the legal retention periods (2y WTN, 3y HWCN).",
    ],
    correctAnswer: 1,
    explanation:
      "The MFT trip-time test must be set to match the RCD type to fully verify the device. Megger MFT1741+ has explicit type selection (AC / A / F / B); Kewtech and Fluke models similar. Setting AC mode on a Type B RCD only tests its AC sensitivity, missing the DC capability.",
  },
  {
    id: 6,
    question: "BS 7671 A4:2026 reinforced AFDD requirements. What's the current requirement for AFDD on dwelling installations?",
    options: [
      "Cable is mixed-material waste — copper conductor, PVC insulation, sometimes aluminium tape, sometimes a steel wire armour. Pure copper is high-value scrap (£4–6 / kg in 2026) and most firms collect offcuts in a copper-only bag for the wholesaler weighbridge or a licensed scrap dealer. PVC-only sheath / insulation goes to general construction waste. SWA cable contains steel and is normally segregated. The L3 apprentice keeps offcuts segregated; the firm gets the scrap value back; the disposal is compliant. NEVER burn PVC insulation off scrap copper — releases dioxins and is a criminal offence under the Environmental Permitting Regulations.",
      "Triggered when the property's existing supply capacity (typically 60 A or 80 A single-phase main fuse) is inadequate for the new combined load. Heat pump + EV charger + existing baseline can easily exceed this. DNO-managed process: customer / installer applies, DNO surveys, costs the work (cable upsize, possibly cut-out / meter replacement, possibly main-fuse upgrade), customer pays, work scheduled. Timeline 4-12 weeks for simple upgrades, longer for cable changes or three-phase conversions. Customer needs to factor this into the install date.",
      "BS 7671 421.1.7 (per A4:2026 progression) requires AFDD on certain final circuits in specified locations: (a) bedrooms in Houses in Multiple Occupation (HMOs), care homes, dwellings used for short-term accommodation, (b) circuits feeding bedrooms in higher-occupancy student / hostel-type dwellings, (c) circuits feeding combustible-construction buildings (timber-frame in some interpretations). Single-family domestic dwellings are not currently mandated but A4 wording is moving toward broader uptake. Manufacturers (Hager AFB, Schneider Vigi+AF) sell combined RCBO+AFDD devices that fit in standard CU positions. The L3 apprentice's exam expectation: know AFDD is required where, why, and how it's specified.",
      "Type AC — detects AC residual currents only; obsolete for most new installations under BS 7671 A2:2022. Type A — detects AC and pulsating DC residual currents; current default for general use. Type F — detects AC + pulsating DC + composite multi-frequency residuals; required for circuits with VFDs, Class 1 PCs / servers. Type B — detects all of the above PLUS smooth DC residual currents; required for EV chargers (BS 7671 722.531), some PV inverters, three-phase rectifier loads. The choice depends on the load. Wrong type = won't detect the actual residual current = false sense of protection.",
    ],
    correctAnswer: 2,
    explanation:
      "BS 7671 A4:2026 strengthened AFDD requirements significantly compared to A2:2022. The progression has been toward broader application; market penetration is still building. By the time most L3 apprentices qualify (next 18 months), AFDD will be standard fit in many specifications. Knowing the requirement and the diagnostic approach is the L3 expectation.",
  },
  {
    id: 7,
    question: "An AFDD won't latch on after a trip — keeps tripping the moment you press the toggle. What's likely wrong?",
    options: [
      "CAT III 600 V minimum (CAT IV 600 V preferred). The DB is a fixed-installation distribution location, which is CAT III by definition. The Fluke 376FC is CAT IV 600 V / CAT III 1000 V — adequate. The Megger DCM340 is CAT IV 300 V / CAT III 600 V — adequate for 230/400 V three-phase. Cheap clamp meters with only CAT II rating are not safe at this location — they can fail catastrophically on a transient. Always check the CAT rating before using a borrowed or new clamp meter at a DB.",
      "'Building Management System' — the central control system that orchestrates a building's heating, ventilation, lighting, security and energy use. BMS work is one of the fastest-growing specialisms in building services because every modern commercial building has one. Electricians who learn BMS programming and commissioning (often via Trend, Tridium, Siemens or Schneider training) are in high demand and can move into BMS specialist roles paying significantly above standard electrician rates.",
      "Ask the manufacturer directly via their technical support or sustainability team — most major UK cable and accessory manufacturers publish EPDs on their website or supply on request. If the manufacturer does not publish an EPD for that product, that fact alone is relevant to the project specifier because the spec called for EPD-backed products. The right action is to flag the missing EPD to the project specifier and either source an EPD-backed equivalent from another manufacturer or request a written derogation from the spec. Documenting the search and the decision protects the contractor against later challenge.",
      "Two possibilities. (1) Active arc fault on the circuit — there's a real arc happening that the AFDD is correctly detecting and refusing to ignore. Investigate as a real fault: visual inspection, IR test, thermal imaging. (2) AFDD itself has failed in the 'trip' state — internal electronics fault. Test by removing the AFDD from the busbar (load disconnected) and trying to latch it; if it still won't latch, the AFDD is faulty and needs replacement. The L3 apprentice's protocol: investigate as real fault first; only if no fault is found, consider AFDD failure and substitute with known-good unit.",
    ],
    correctAnswer: 3,
    explanation:
      "AFDD won't-latch is a strong indicator of a real arc fault on the circuit — the AFDD doesn't permit the toggle to latch if it's detecting an arc signature. The investigative discipline is to treat it as a real fault (don't dismiss as 'AFDD glitch' without evidence). If investigation rules out a real fault, then AFDD failure is the diagnosis; substitute confirms.",
  },
  {
    id: 8,
    question: "What's an 'S-type' (selective) RCD and where is it used?",
    options: [
      "S-type (or 'selective time-delayed') RCD has a built-in delay before tripping (typically 100–300 ms intentional delay). Used UPSTREAM of standard 30 mA RCDs for selectivity — the standard RCD trips on a downstream fault before the S-type does, so only the affected sub-circuit loses supply. Common application: TT installation main switch (S-type 100 mA) feeding sub-DBs with 30 mA RCDs on individual circuits. Also: TN-C-S installation with EV charger has S-type 100 mA upstream of EV charger to provide additional protection without nuisance-tripping on the EV's own RCM. Marked 'S' on the device label.",
      "Partnership = two or more people trading together without forming a Ltd company. Partnership is governed by the Partnership Act 1890 (very old statute). Each partner has unlimited personal liability for partnership debts including those incurred by other partners. Tax: each partner files Self Assessment on their share of profits. Less common than sole trader (one-person) or Ltd (limited liability) because you get unlimited liability AND have to share decisions with another partner.",
      "Wood-pellet or wood-chip boilers and stoves. Burns sustainably-sourced biomass to drive a wet heating system. Counts as 'low-carbon' because the CO₂ released is offset by what the trees absorbed during growth (debated within the carbon accounting community). Fuel storage, ash handling and air-quality regulation (Clean Air Act zones; the Ecodesign Directive for new appliances) make biomass operationally heavier than gas or heat pumps. Best fit: rural off-gas-grid properties with space for a fuel store. Worst fit: urban smoke-control areas with poor PM2.5 ratings.",
      "A Request For Information is a formal written query from a contractor to the design team (architect, engineer, principal designer) when the drawings or specifications are unclear, contradictory or missing detail. It's logged, numbered, dated and tracked through to a written response. It protects the contractor from being held responsible for a design ambiguity and creates a paper trail for any later dispute. Use one whenever you'd otherwise be guessing.",
    ],
    correctAnswer: 0,
    explanation:
      "S-type RCDs are the upstream selective device in a layered protection scheme. The intentional delay allows downstream 30 mA devices to operate first on a localised fault. BS 7671 A4:2026 reinforces S-type usage at TT origins and upstream of EV chargers.",
  },
];

const faqs = [
  {
    question: "Why do RCDs trip more often in winter than summer?",
    answer:
      "Three reasons. (1) Heating loads — electric heaters / underfloor heating add additional leakage on heat cycles; cumulative leakage rises. (2) Condensation — winter humidity changes cause condensation in outdoor sockets / lights / unheated buildings; water-induced leakage. (3) Christmas lights — outdoor decorative lighting often has marginal IP rating; rain / dew causes leakage to earth. Standard winter-fault uptick across the trade. RCBO-per-circuit installations spread the load, reducing cumulative-leakage trips.",
  },
  {
    question: "Can I just upgrade the RCD to a higher rating (100 mA instead of 30 mA) to stop nuisance trips?",
    answer:
      "Almost always NO. The 30 mA threshold is for additional protection against electric shock under BS 7671 411.4.5 — it's a safety-critical specification. Replacing with 100 mA removes the shock protection. The right answer is to investigate the cause of the nuisance trips and rectify it (split the loads, replace the leaky appliance, install RCBO-per-circuit). The exception is upstream selectivity where an S-type 100 mA may sit ABOVE 30 mA RCDs — but that's adding a layer, not replacing the 30 mA.",
  },
  {
    question: "How do I tell if it's an RCD trip or an MCB trip on a tripped RCBO?",
    answer:
      "Most modern RCBOs (Hager, Schneider Vigi+RCBO) have an indicator flag that shows the trip cause — a yellow flag for residual current trip (RCD), a red flag for overcurrent trip (MCB). Some older RCBOs don't have the flag; you have to deduce from the load behaviour (RCD trip = appliance fault or earth leakage; MCB trip = overload or short circuit). Resetting and observing what happens next is diagnostic: if it trips immediately on reset = short circuit or persistent earth leakage; trips after a delay under load = overload; resets fine but trips later = intermittent leakage.",
  },
  {
    question: "Why do AFDDs sometimes trip when nothing's wrong?",
    answer:
      "AFDD detection is signature-based — looking for the high-frequency 'noise' on the current waveform that indicates an arc. Some appliances generate similar high-frequency content without being arcs: cumulative-motor brushes (vacuum, drill), poorly-filtered switching power supplies (cheap phone chargers, LED drivers), some RF welders / induction heaters in commercial settings. Modern AFDDs have improved discrimination but no detection technology is 100% perfect. The trade workaround: identify the false-trigger source and either replace it (e.g. bin the cheap phone charger) or use an AFDD model with better discrimination (Hager and Schneider iterate on this).",
  },
  {
    question: "What's the practical workflow for diagnosing an RCD nuisance trip on a modern domestic installation?",
    answer:
      "(1) Customer interview — when does it trip, what's running, weather correlation. (2) Identify which RCD / RCBO is tripping. (3) With circuit live, clamp meter L+N together at RCD output — note baseline leakage. (4) If baseline &gt;8 mA, suspect cumulative leakage; isolate appliances one at a time to identify which contribute. (5) If baseline &lt;3 mA but trips occur intermittently, suspect time-of-day or load-condition leakage; trigger suspect modes and watch the clamp. (6) If confirmed leaky appliance, customer pays for replacement; if confirmed wiring fault, isolate and rectify. Document findings on job sheet.",
  },
  {
    question: "Are RCBOs more reliable than MCBs?",
    answer:
      "More complex, similarly reliable. RCBO has all the MCB's mechanism PLUS the residual current detection circuitry — more components, more potential failure points. But: modern RCBOs from premium manufacturers (Hager, Schneider, Eaton) match MCB MTBF (mean time between failures) at typical domestic loading. Trade observation: cheaper RCBOs (sub-£25) have shorter life; premium devices (£30–50) match MCB life. The trip-time test on the MFT catches RCBOs approaching end of life before they fail in service.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 4"
            title="RCD and AFDD nuisance trips"
            description="The practical diagnosis of RCD nuisance trips (cumulative leakage, weather, appliance failure) and AFDD nuisance trips (electronics false trigger, switching transients) — clamp meter method, differential isolation, AFDD test functions, A4:2026 layer."
            tone="emerald"
          />

          <TLDR
            points={[
              "Modern RCD nuisance trips are usually CUMULATIVE leakage — many small leaks summing to &gt;30 mA. Clamp meter (L+N together) measures total leakage; differential isolation finds the source.",
              "RCD types: AC (legacy), A (default), F (VFD), B (EV / smooth DC). Wrong type = undetected non-protection. EV chargers MUST have Type B or Type A + 6 mA DC RCM.",
              "AFDD nuisance trips are usually real arcs (cumulative motors, poor terminations) or signature false-triggers (cheap PSUs, RF interference). A4:2026 reinforced AFDD requirements.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Diagnose RCD nuisance trips using clamp meter (L+N together) for total leakage measurement and differential isolation to identify the source.",
              "Distinguish RCD types — AC, A, F, B — and select the correct type for each load category (general, VFD, EV charger, PV).",
              "Recognise cumulative leakage as the modern installation's defining RCD problem and know the RCBO-per-circuit solution.",
              "Apply BS 7671 A4:2026 AFDD requirements — where mandated, why, and how to specify.",
              "Diagnose AFDD nuisance trips — distinguish real arc faults from signature false-triggers.",
              "Use S-type (selective) RCDs for upstream selectivity in TT and EV-charger installations.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>RCD nuisance trips — the cumulative leakage problem</ContentEyebrow>

          <ConceptBlock
            title="Why modern installations trip RCDs that older ones didn't"
            plainEnglish="Every electronic device in a modern home leaks a tiny earth current — LED drivers (0.1–0.3 mA each), PC PSUs (0.5–1 mA), appliances with EMC filters (0.5–2 mA each). The sum can easily reach 8–15 mA on a busy circuit, leaving little margin to the 30 mA RCD trip threshold. Add a marginal load and you exceed the threshold."
            onSite="Cumulative leakage is the modern installation's defining RCD problem. Pre-2010 installations had little electronics — leakage was dominated by the occasional faulty heater or motor. 2026 installations have hundreds of leakage sources. The RCD threshold hasn't changed; the load behind it has multiplied."
          >
            <p>Standard cumulative leakage values:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Each LED driver: 0.1–0.3 mA.</li>
              <li>Each PC / laptop PSU: 0.5–1 mA.</li>
              <li>Each appliance with EMC filter (washing machine, dishwasher, etc.): 0.5–2 mA.</li>
              <li>Smart meter / energy monitor: 0.1–0.5 mA.</li>
              <li>Each EV charger (without dedicated 6 mA RCM): up to 6 mA.</li>
            </ul>
            <p>
              On a modern kitchen circuit with 12 LED downlighters + dishwasher + washing machine + microwave + kettle + toaster: total cumulative leakage easily reaches 12–20 mA at idle. Add a partial fault (degraded heater element on washer) and you cross 30 mA.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.3 (Additional protection — socket-outlets and mobile equipment)"
            clause={<>"In AC systems, additional protection by means of an RCD with a rated residual operating current not exceeding 30 mA shall be provided for socket-outlets with a rated current not exceeding 32 A in locations specified by Section 411.3.3."</>}
            meaning={<>The 30 mA RCD requirement on socket-outlets is the safety-case driver for the trip threshold. A4:2026 strengthened this with broader application across socket-outlets and mobile equipment, and reinforced AFDD requirements (Reg 421.1.7).</>}
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.3."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>The differential isolation diagnostic method</ContentEyebrow>

          <ConceptBlock
            title="Find the leak with a clamp meter, not by trial and error"
            onSite="The trip-and-guess approach (reset RCD, see what trips it next) is the apprentice's first-instinct method and the worst possible. The clamp meter approach finds the source in 30 minutes; the trip-and-guess approach takes hours and never definitively identifies the cause."
          >
            <p>The six-step differential isolation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Energise the RCD</strong> with all appliances disconnected on the protected circuits.</li>
              <li><strong>2. Clamp meter L+N together</strong> at the RCD output — note baseline leakage (1–3 mA on healthy installation).</li>
              <li><strong>3. Connect appliances ONE AT A TIME</strong>, watching the clamp reading.</li>
              <li><strong>4. The appliance whose connection causes a sudden jump</strong> (e.g. baseline 2 mA → 18 mA on connecting the dishwasher) is the leaky one.</li>
              <li><strong>5. For confirmation</strong>, disconnect that appliance only — leakage drops back.</li>
              <li><strong>6. For appliances with intermittent leakage</strong> (e.g. heater fails on heat cycle only), trigger the operating mode and watch for the leakage rise.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>RCD types and their applications</ContentEyebrow>

          <ConceptBlock
            title="Type AC, A, F, B — match the type to the load"
            plainEnglish="Different residual currents need different detection technology. The wrong type means undetected non-protection — false sense of safety."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type AC</strong> — detects AC residual only. Obsolete for most new installations under A2:2022.</li>
              <li><strong>Type A</strong> — detects AC + pulsating DC. Current default for general use.</li>
              <li><strong>Type F</strong> — detects AC + pulsating DC + composite multi-frequency. Required for VFDs, Class 1 PCs / servers.</li>
              <li><strong>Type B</strong> — detects all of the above + smooth DC. Required for EV chargers (BS 7671 722.531), some PV inverters, three-phase rectifier loads.</li>
              <li><strong>S-type (selective)</strong> — built-in delay (100–300 ms) for upstream selectivity above 30 mA downstream RCDs. Used at TT main switch, upstream of EV chargers.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD nuisance trips — the new fault category</ContentEyebrow>

          <ConceptBlock
            title="Arc fault detection — what causes false trips and what causes real trips"
            onSite="AFDD is the newest protective device category. The detection is signature-based — looking for high-frequency content on the current waveform that indicates an arc. Effective at detecting real arc faults but sometimes triggers on similar-looking signatures from other sources."
          >
            <p>Real arc trip causes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cumulative motor brushes (tumble dryer, washing machine, vacuum, drill).</li>
              <li>Poorly-terminated accessories on the affected circuit (HRJ in early stages of arcing).</li>
              <li>Faulty appliance with internal arcing (failing motor brushes, wear on relay contacts).</li>
              <li>Damaged cable with intermittent contact.</li>
            </ul>
            <p>False trip sources:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switching power supplies with high-frequency content (cheap phone chargers, laptop PSUs).</li>
              <li>RF interference from nearby transmitters (commercial RF welders, broadcasting).</li>
              <li>Dimmer modules generating switching noise.</li>
              <li>Some LED drivers with poor EMC filtering.</li>
            </ul>
            <p>
              Brand notes: Hager AFB, Schneider Vigi+AF, Eaton AFDD — improving discrimination with each generation. A4:2026 mandates AFDD on certain dwelling final circuits (Reg 421.1.7) — bedrooms in HMOs, care homes, short-term accommodation, plus some combustible-construction buildings.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 421.1.7"
            clause={
              <>
                "It is now a requirement to protect final circuits supplying socket-outlets with a rated current not exceeding 32&nbsp;A using arc fault detection devices (AFDD) in Higher Risk Residential Buildings, Houses in Multiple Occupation, Purpose-built student accommodation and Care homes. For all other premises, the regulation recommends AFDDs for single-phase circuits."
              </>
            }
            meaning={
              <>
                A4:2026 split AFDDs into mandatory categories (HRRBs, HMOs, PBSA, care homes) and recommended-elsewhere. When you&apos;re diagnosing an AFDD nuisance trip on, say, a private dwelling, you can&apos;t simply remove the AFDD and revert to a normal RCBO &mdash; that loses functionality the customer paid for, and on a mandatory-category property it would be a Code 2 non-compliance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 421.1.7 (AFDD redraft)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3"
            clause={
              <>
                "Regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness of the RCD."
              </>
            }
            meaning={
              <>
                When an RCD is nuisance-tripping but appears to operate at I&Delta;n on the MFT, that single AC test at rated I&Delta;n is now the only required verification (5&times;I&Delta;n is gone in A4:2026). If the device passes the AC test but trips intermittently in service, the diagnosis points to cumulative leakage on the load side, not a faulty RCD.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 643.3 (RCD testing redraft)."
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic={videos.faultFinding.topic}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Replacing the RCD instead of finding the leakage source"
            whatHappens={<>Apprentice arrives at a 'RCD trips occasionally' job. Tests the RCD — trip-time fine, MFT measurement OK. Replaces it anyway because they don't know how to find the cause. Customer pays for new RCD; problem persists; firm gets called back; bad reputation. Real cause was a failing dishwasher heater element (1.8 mA leakage on heat cycle) — a 30-second clamp meter measurement would have spotted it.</>}
            doInstead={<>For RCD nuisance trips, always use the clamp meter differential isolation method first (Sub 3.4). Find the actual leakage source. Replace the RCD only if testing shows the RCD is genuinely faulty (slow trip-time on MFT). Replacing a working RCD doesn\'t fix a leakage source; the source has to go.</>}
          />

          <CommonMistake
            title="Fitting Type A RCD on an EV charger circuit"
            whatHappens={<>Apprentice installs a domestic EV charger. CU has Type A RCBO covering the relevant circuit. Charger appears to work fine for weeks. Then one of the EV\'s batteries develops a smooth DC leakage to chassis (rare but happens). The Type A RCD doesn\'t see smooth DC; the leakage continues unprotected. Eventually a fault path opens (dampness in the charging cable, EV chassis to ground), customer takes a shock. Investigation finds the wrong RCD type.</>}
            doInstead={<>EV chargers MUST have Type B RCD OR Type A RCD + dedicated 6 mA DC RCM in the charger (most modern EVSEs include the 6 mA RCM by design — Zappi, Ohme, Pod Point, Tesla). Verify the EVSE specification AND the upstream RCD type at install. BS 7671 722.531 is explicit about this.</>}
          />

          <Scenario
            title="Recurring kitchen RCD trip on a new-build property"
            situation={<>Three-month-old new-build. Customer reports the kitchen RCBO trips two or three times per week. Always reset works. They\'ve had two firms out; both replaced the RCBO; problem persists.</>}
            whatToDo={<>(1) Customer interview — when does it trip? Customer recalls: usually around 7–8pm in the evening, sometimes when the dishwasher is running, sometimes when the washing machine is on. (2) Hypothesis: cumulative leakage. (3) Clamp meter L+N together at the RCBO output. With dishwasher off: 4 mA. With dishwasher running (rinse cycle): 7 mA. With washing machine also running: 14 mA. With kettle plugged in too: 22 mA. Threshold is 30 mA — they\'re operating at 70% of threshold under normal cooking-time load. (4) Add the LED downlighters that come on at 7pm (12 lights, ~3 mA cumulative): now at 25 mA. (5) Diagnosis: cumulative leakage from the modern kitchen\'s load mix is approaching the 30 mA threshold. The RCBO is correctly reporting an over-threshold leakage; it\'s not faulty. (6) Solutions: split the kitchen circuit into two RCBOs (one for the appliances, one for the lighting/sockets); replace LED drivers with lower-leakage models; or upgrade the CU to all-RCBO with the kitchen on a dedicated 30 mA RCBO (no shared circuits adding leakage). (7) Recommend the all-RCBO CU upgrade as the long-term solution; quote and document.</>}
            whyItMatters={<>Cumulative leakage is invisible without the clamp meter — the customer\'s symptoms are real but the root cause is design (one RCBO covering too many leaky loads), not a faulty component. Two previous firms replaced the wrong thing; the L3 apprentice\'s clamp meter approach finds the actual cause and recommends the right fix. The economic answer (CU upgrade) is bigger than the customer expected, but it\'s the correct answer.</>}
          />

          <SectionRule />

          <ContentEyebrow>Differential isolation — the appliance-by-appliance method</ContentEyebrow>

          <ConceptBlock
            title="When the clamp meter doesn't pin it down — the elimination method"
            plainEnglish="If the clamp meter shows leakage but you can't identify the source, the differential method works: disconnect everything; reset the RCD; plug back loads one at a time, observing the leakage clamp until the leakage rises above threshold. The load that pushed it over is the culprit."
            onSite="Use a Fluke 369 FC clamp around line + neutral together at the RCD output (or RCBO terminals). A healthy circuit reads &lt;1 mA standing leakage. Plug each appliance back in turn — kettle, washing machine, dishwasher, freezer, microwave, downlights, immersion heater — observe each step on the clamp display. Note which load takes the cumulative leakage past 30 mA."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Baseline reading</strong> — all loads off, all appliances unplugged. Clamp reads close to 0 mA. This is your zero baseline.</li>
              <li><strong>Plug-back sequence</strong> — one appliance at a time. Wait 30-60 seconds for inrush to settle. Read clamp.</li>
              <li><strong>Cumulative chart</strong> — note each appliance's leakage contribution. Some appliances (electronic SMPS loads) leak 1-3 mA continuously; some (kettle, immersion) leak only when running.</li>
              <li><strong>Test under load</strong> — for cycling loads (washing machine, dishwasher), test through their cycle. Leakage often peaks during heating phase.</li>
              <li><strong>Faulty appliance</strong> — single appliance leaking &gt;5 mA = faulty (typically heating element insulation breakdown, water ingress in motor, failed Y-class capacitor).</li>
              <li><strong>Cumulative breach</strong> — total leakage from healthy loads exceeding 30 mA = circuit design problem (too many loads on one RCD). Solution: split circuit, upgrade to all-RCBO CU.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD — what it actually detects</ContentEyebrow>

          <ConceptBlock
            title="The AFDD function — series and parallel arc detection"
            plainEnglish="An Arc Fault Detection Device (AFDD) detects arcing signatures in the current waveform — the chaotic, high-frequency pattern caused by intermittent contact arcing. Two arc types: SERIES arc (loose terminal arcing in the same conductor — most common) and PARALLEL arc (L-N or L-E arcing). AFDDs detect both."
            onSite="A4:2026 expanded AFDD requirements (Reg 421.1.7) — required for socket outlets in residential, accommodation in HMOs, and certain commercial. Standard products: Hager AFDD-RCBO range, Schneider Acti9 AFDD, Wylex AFDD. AFDD test button simulates an arc; the device should trip within seconds. Some devices have an indicator that shows what triggered the trip (RCD, MCB, or AFDD)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>What AFDD detects</strong> — high-frequency signatures (kHz range) characteristic of arcing. Not the steady-state current of a normal load.</li>
              <li><strong>Series arc</strong> — loose terminal arcing while current flows. Most common cause of electrical fires in residential. AFDD catches before fire develops.</li>
              <li><strong>Parallel arc</strong> — L-N or L-E arcing through degraded insulation. Can also trip MCB (overcurrent) or RCD (residual current) but AFDD catches earlier.</li>
              <li><strong>What AFDD doesn't detect</strong> — slow degradation that hasn't yet started arcing; non-arcing thermal damage (HRJ generating heat without yet producing detectable arc).</li>
              <li><strong>Test sequence</strong> — press the test button; AFDD should trip within ~1 second; trip indicator (often a different colour from the standard trip indicator) shows AFDD function operated. Reset is normal MCB-style.</li>
              <li><strong>BS EN 62606</strong> — the AFDD product standard. Defines test signatures and trip times. Type 1 is series arc only; Type 2 covers series and parallel.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD nuisance trips — diagnosis and resolution</ContentEyebrow>

          <ConceptBlock
            title="AFDD nuisance trips — switching transients and electronic loads"
            plainEnglish="AFDDs sometimes trip on signatures that aren't real arcs: dimmer switching, VSD output, switching power supplies, contactor operation, fluorescent lamp ballast. The L3 apprentice diagnoses by event pattern and load type."
            onSite="Diagnostic process: customer interview to identify timing pattern and what's running when trips occur; clamp meter (Fluke 369 FC) on the affected circuit during operation; isolate suspect loads one at a time; if nuisance pattern resolves, the load was the source. Resolution: replace the load with one that doesn't generate the false signature, or upgrade to a more discriminating AFDD."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Common nuisance triggers</strong> — old fluorescent ballasts (replace with LED retrofits), incompatible LED dimmers (use Click Mode or Aurora compatible products), cheap LED downlight drivers (Aurora Enlite, Collingwood, JCC Hyperion are AFDD-compatible), switch-mode appliances (older PCs, induction hobs).</li>
              <li><strong>Pattern check</strong> — does it trip at the same load configuration each time? If yes, source identified by elimination.</li>
              <li><strong>Voltage event correlation</strong> — Fluke 1730 PQ analyser can correlate trips with voltage events; if external transients are triggering, install Type 2 SPD upstream.</li>
              <li><strong>AFDD type</strong> — check device datasheet. Some have higher rejection of common nuisance signatures (e.g. Hager AFDD-RCBO has improved rejection for dimmers vs older designs).</li>
              <li><strong>Documentation</strong> — log each trip event for the customer; build pattern; recommend specific load replacements with quote.</li>
              <li><strong>Don't bypass the AFDD</strong> — if AFDD is required by BS 7671 for the location, bypassing it (e.g. fitting a non-AFDD RCBO instead) is a code C2 finding on next EICR. Investigate and resolve, don't bypass.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCD type selection — Type AC / A / B</ContentEyebrow>

          <ConceptBlock
            title="The right RCD type for the load — a A4:2026 emphasis area"
            plainEnglish="Different RCD types detect different fault current waveforms. Type AC sees only sinusoidal AC; Type A also sees pulsating DC; Type B also sees smooth DC. Modern installations (LED drivers, EV chargers, VSDs, solar PV) inject DC components into the residual current — the wrong RCD type either won't see the fault (no protection) or will nuisance-trip."
            onSite="A4:2026 reinforced RCD type selection — Type AC is now generally considered legacy except for purely sinusoidal loads (resistive heaters, incandescent lamps); Type A is the modern domestic standard; Type B is required for EV chargers (BS 7671 722.531.3.101) and many VSDs / battery storage / certain solar PV inverters. Check the load specification; select RCD type accordingly."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type AC</strong> — sinusoidal AC residual only. Resistive heaters, simple incandescent / halogen circuits. Increasingly rare on modern installations.</li>
              <li><strong>Type A</strong> — sinusoidal AC + pulsating DC. Modern domestic standard. Catches LED drivers, switch-mode power supplies, single-phase VSDs.</li>
              <li><strong>Type F</strong> — Type A + high-frequency components. Used on certain VSD applications and inverter-fed loads.</li>
              <li><strong>Type B</strong> — Type A + smooth DC. Required for EV chargers (BS 7671 722.531.3.101), many three-phase VSDs, certain solar PV / battery storage inverters with DC-side faults.</li>
              <li><strong>Identifying installed RCDs</strong> — type marked on front of device. Hager: Type AC has no symbol; Type A has half-sine + dotted line; Type B has all symbols. Schneider similar.</li>
              <li><strong>Wrong-type symptom</strong> — Type AC on DC-injecting load: either silent failure (won't see fault) or nuisance trips when the DC component drives the RCD detection circuit into nonlinear region.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Modern RCD nuisance trips are usually CUMULATIVE leakage from many small electronic loads. Clamp meter (L+N together) measures total leakage; differential isolation finds the source.",
              "RCD types: AC (legacy), A (default), F (VFD), B (EV / smooth DC). EV chargers MUST have Type B or Type A + 6 mA DC RCM.",
              "30 mA RCD threshold is the IEC 60479-1 safety case for shock protection. Don't 'solve' nuisance trips by upgrading to higher mA — that removes the protection.",
              "RCBO-per-circuit (instead of dual-RCD CU) isolates each circuit's leakage and prevents cumulative trips. Trade standard for new installs / rewires.",
              "S-type (selective) RCDs upstream of standard 30 mA give selectivity. Used at TT origin and upstream of EV chargers.",
              "AFDD detection is signature-based — real arc trips (motor brushes, HRJ early arc) and false trips (cheap PSUs, RF interference) both possible.",
              "BS 7671 A4:2026 mandates AFDD on certain dwelling final circuits (HMO bedrooms, care homes, short-term accommodation, some combustible-construction).",
              "AFDD won't-latch is a strong indicator of real arc fault — investigate before assuming AFDD failure.",
            ]}
          />

          <Quiz title="RCD and AFDD nuisance trips — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.3 Fault locations</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.5 Special precautions</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
