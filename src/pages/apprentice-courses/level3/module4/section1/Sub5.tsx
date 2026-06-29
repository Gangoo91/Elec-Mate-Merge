/**
 * Module 4 · Section 1 · Subsection 5 — Implications of isolation for self, others, customers and building systems
 * Maps to C&G 2365-03 / Unit 303 / LO1 / AC 1.3
 *   AC 1.3 — "specify safe working procedures that should be adopted for fault diagnosis and correction work"
 * Layered: 2357 Unit 608 ELTK07 / AC 1.2 — "describe the implications of carrying out (or not carrying out) safe isolation procedures upon self, other personnel, customer / client, public, building systems"
 * Also layers: 2357 ELTK07 / AC 1.4 (lone working, special precautions) and AC 4.1 (precautions before work).
 *
 * Frame: isolation isn't a switch flip — it's a planned event that has consequences for the people in
 * the building, the equipment in the building, the customer's business, and your own legal exposure if
 * you didn't think them through. This Sub builds the pre-isolation continuity-planning discipline that
 * separates an L3 fault diagnostician from an L2 installer.
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
  'Implications of isolation (1.5) | Level 3 Module 4.1.5 | Elec-Mate';
const DESCRIPTION =
  "Isolation has consequences — for you, for other operatives, for the customer's business, for the public, and for the building's life-safety, refrigeration, IT, fire alarm and emergency lighting systems. Walks the L3 pre-isolation continuity-planning discipline you need before flipping the main switch.";

const checks = [
  {
    id: 'mod4-s1-sub5-fridge',
    question:
      "You're called to a small Co-op convenience store at 09:30 on a Monday for an intermittent RCBO trip on the lighting circuit. To complete the safe-isolation procedure on the lighting RCBO you'd normally also pull the main switch on the Schneider DB to access the busbar. What's the implication you must think through first?",
    options: [
      "Pulling the main switch drops the entire shop — including the chest freezers, the refrigerated display cabinets and the till system. A typical convenience store carries £2,000–£8,000 of stock at risk if the freezers warm above −18 °C for more than 30–60 minutes (the Food Standards Agency's safe-temperature window before stock has to be discarded). The till system holds the day's transactions in volatile memory if it's not on a UPS. The right L3 move is to isolate ONLY the affected RCBO at the device, not the whole DB; if you do need to drop the main switch, you book it in advance with the manager so they can prepare (move stock to a back-up freezer, run an end-of-shift on the till, switch to manual sales).",
      "Smoke Control Areas (SCAs) are defined under the Clean Air Act 1993 — almost every UK urban / suburban area is in an SCA. In an SCA it is an offence to emit smoke from a domestic chimney unless burning an authorised fuel in an authorised appliance (the Defra exempt appliance list). For biomass this means new installs must use Defra-approved Ecodesign-compliant boilers / stoves burning approved pellets / logs. Many older biomass installs in SCAs do not meet current Ecodesign and may be operating in breach. Local Authorities have enforcement powers including fixed-penalty notices. The L3 apprentice does not enforce SCAs but should recognise that 'just fitting a wood-burning stove' is regulated in most populated areas — the customer needs to verify the unit and the fuel are SCA-compliant.",
      "Head is the vertical distance the water falls through the turbine — measured in metres. Head times flow rate (cubic metres per second) times gravity gives the available power. Different turbine technologies suit different head ranges: Pelton wheel (impulse turbine) for high head 50-300 m typical UK upland; Turgo (impulse) for medium-high head 30-200 m; Crossflow (impulse / reaction hybrid) for medium head 5-50 m; Kaplan or propeller (reaction) for low head under 10 m typical lowland river. Archimedes screw for very low head 1-5 m and high flow — popular on canal and river weir sites because it is fish-friendly. The MCS-certified hydro designer picks the turbine based on the head and flow at the specific site. The L3 electrician handles the grid connection regardless of the turbine choice.",
      "At least 6 years. The Limitation Act 1980 sets the standard limitation period for civil claims (negligence, breach of contract) at 6 years from the date of the breach. Most contractor schemes (NICEIC, NAPIT, ELECSA) require 6 years minimum as a condition of registration. Many firms retain longer (e.g. lifetime of install) for evidence and re-issue purposes. Personal data within the cert is retained on the same basis under UK GDPR Article 5(1)(e) (storage limitation) — kept no longer than necessary for the purpose.",
    ],
    correctIndex: 0,
    explanation:
      "The 2357 ELTK07 AC 1.2 outcome is exactly this — recognising that 'safe isolation' isn't only about your shock risk; it's about the consequence of dropping the supply on the customer's business, equipment and stock. An L3 apprentice who shuts a shop's freezers down without warning has caused a foreseeable £2k+ stock loss that's avoidable with one phone call. Plan the isolation to the smallest scope that's safe to work on, and warn the customer before you cut anything they care about.",
  },
  {
    id: 'mod4-s1-sub5-firealarm',
    question:
      "You're investigating a borrowed-neutral fault on a small commercial unit's lighting. The fire alarm panel is on a separate dedicated circuit but you're about to drop the lighting main to chase the neutral back through a JB. What's the L3 procedure for the fire alarm?",
    options: [
      "Pulling the main switch drops the entire shop — including the chest freezers, the refrigerated display cabinets and the till system. A typical convenience store carries £2,000–£8,000 of stock at risk if the freezers warm above −18 °C for more than 30–60 minutes (the Food Standards Agency's safe-temperature window before stock has to be discarded). The till system holds the day's transactions in volatile memory if it's not on a UPS. The right L3 move is to isolate ONLY the affected RCBO at the device, not the whole DB; if you do need to drop the main switch, you book it in advance with the manager so they can prepare (move stock to a back-up freezer, run an end-of-shift on the till, switch to manual sales).",
      "Recommending — Reg 421.1.7 recommends (NOT mandates) AFDDs in specified locations such as final circuits supplying socket-outlets up to 32 A in dwellings, premises with sleeping accommodation, and certain higher-risk locations. The BS 7671 wording is 'recommending', which means the regulation is a strong steer but not a strict requirement. Separate from BS 7671, the Building Safety Act 2022 mandates AFDDs in Higher Risk Residential Buildings (HRRBs) via building regulations. Two different regimes — BS 7671 recommends; HRRB-specific regulation mandates.",
      "Even though the alarm is on a separate circuit, BS 5839-1 (the fire alarm standard) requires the responsible person on site is informed before any work that might cause unwanted alarms or compromise alarm coverage — a dropped lighting circuit can cause a smoke detector to false-trigger from disturbed dust, and any work in a ceiling void where detectors live is prep work that needs the alarm putting into 'engineer test' or 'isolated' mode (with a fire watch in place, signed in/out at the panel). The customer's responsible person makes that call, not you. Isolating the alarm without authorisation puts the building outside its insurance cover and breaches the Regulatory Reform (Fire Safety) Order 2005.",
      "Filter changes every 6-12 months (kitchen and bathroom extract filters can clog faster). Heat exchanger cleaning every 1-2 years (vacuum or wash the exchanger plates per manufacturer's instructions). Ductwork inspection every 3-5 years (look for blockages, condensate accumulation, rodent damage). Boost-control check (humidity sensors / PIRs operating correctly). Air-flow rate verification at major service intervals (anemometer at supply / extract terminals; balanced per design). Without filter changes the unit's efficiency drops sharply and indoor air quality suffers.",
    ],
    correctIndex: 2,
    explanation:
      "Fire alarm isolation is a managed event — the responsible person under the Regulatory Reform (Fire Safety) Order 2005 is the only one who can authorise it, a fire watch must be put in place to maintain life-safety cover, the panel goes to engineer test (logged), and the system is reinstated and re-tested before you leave site. Bin bags over smoke heads is an old-school short-cut that's NOT compliant with BS 5839-1 — the heads can be triggered by dust on removal of the bag, and any false alarm during the work is a chargeable fire-service callout. Always loop in the fire-alarm contractor or the building's responsible person.",
  },
  {
    id: 'mod4-s1-sub5-emergencylight',
    question:
      "Customer reports an intermittent trip on the cleaning cupboard's lighting circuit in a 4-storey commercial office. You isolate the lighting circuit at the floor's Hager DB. The emergency lighting on that floor is on the SAME circuit as the normal lighting (a common older installation). What's the implication?",
    options: [
      "Prefabrication off-site (e.g. pre-terminating SWA tails to length, pre-building consumer units, pre-assembling cable trays in a workshop) reduces on-site cuts and offcuts. Off-site cutting can be measured precisely; on-site cuts under time pressure tend to leave more wastage. Less waste = lower material cost = smaller skip = less environmental impact. Relevant to environmental tech because: (a) the customer is by definition committed to sustainability so resource-efficient installation matches their values; (b) the trade is increasingly held to evidence-based environmental claims; (c) it's a 2357 Unit 312 AC 2.1 explicit requirement. Plus prefabrication gives faster on-site install times.",
      "Immediate loss of Part P self-certification authority — every notifiable job now needs LABC notification before starting (delays + fees). Public Liability insurer is likely to cancel or refuse renewal (most insurers require scheme membership as a condition of cover). Marketing claims (NICEIC logo on van / website / quotes) must be withdrawn — using them after suspension is itself fraud. Tier-1 contractors that require CPS membership in their procurement criteria will remove the firm from approved-supplier lists. The trading firm collapses commercially even though no statute has been breached.",
      "Maintained 3-hour emergency light fittings (BS 5266) charge from the lighting circuit and will stay lit on internal battery for 3 hours after isolation — that's expected. BUT the BMS / fire panel may flag a 'lighting circuit fail' alarm to the building manager (which they need to know is your work, not a real fault), and after 3 hours you've drained the battery — a fresh discharge requires 24 hours to recharge fully. So if you isolate for 4+ hours and a real power cut hits the next morning, the floor has no emergency light. L3 thinking: scope the work to under 3 hours OR coordinate with the M&E manager so they know the floor's emergency-light cover is reduced for the recharge window.",
      "UKAS (United Kingdom Accreditation Service) traces every reference standard back through an unbroken chain to NPL (National Physical Laboratory) primary standards. A UKAS-traceable calibration certificate proves the lab measured your instrument against references whose accuracy is documented through the chain. For BS 7671 certification (EICR, EIC, MWC) and any EAWR Reg 14 evidence pack, the readings on the certificate must come from instruments with UKAS-traceable calibration in date. A calibration without UKAS traceability is technically inadmissible — and that means certificates signed off using it are challengeable.",
    ],
    correctIndex: 2,
    explanation:
      "Emergency-lighting batteries take ~24 hours to recharge after a full 3-hour discharge under BS 5266-1 / BS EN 50172. Isolating a lit-and-charging circuit for an extended period AND then leaving site is foreseeable as a life-safety risk — the next power cut leaves the route unlit. The L3 procedure is: scope the work duration; if it can't fit in 3 hours, coordinate with the building manager so they know the floor needs supplementary cover (torches at fire points, fire watch, etc.) and so they can record the reduced cover in the fire log book.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does the 2357 ELTK07 / AC 1.2 outcome mean by 'implications of safe isolation upon self, other personnel, customer / client, public and building systems'?",
    options: [
      "The socket has an active heat source — even unplugged, current is flowing somewhere within the socket itself. Most likely causes: (1) HRJ at the L or N terminal under load (any other socket on the same ring is loaded; current passes through this socket as a transit point on the ring). (2) Insulation breakdown between L and N or L and CPC inside the socket — small leakage current dissipating heat. (3) Failing component (some sockets have surge protection or USB charging modules that can fail and draw quiescent current). Action: isolate the circuit at the breaker, prove dead, IR test the socket (between L–N, L–E, N–E with the socket disconnected from the cable). If IR is poor, replace socket. If IR is good, problem is upstream — trace back along the ring.",
      "Five distinct stakeholders to think about BEFORE you isolate. (1) SELF — your shock / arc / stored-energy risk drops once isolation is verified. (2) OTHER PERSONNEL — operatives elsewhere on the same building may be working on equipment your isolation feeds; if they've not been told, they walk into a circuit they thought was live and assumed dead in the wrong direction. (3) CUSTOMER / CLIENT — the business is operating; your isolation might drop their tills, servers, refrigeration, production line. (4) PUBLIC — escalators, lifts, automatic doors, traffic signals, ATMs all stop working when supply drops, which is a public-safety event in some buildings. (5) BUILDING SYSTEMS — fire alarm, emergency lighting, BMS, security, refrigeration, IT, HVAC are all dependent on supply continuity and have separate compliance frameworks (BS 5839, BS 5266, GDPR, the Fire Safety Order). The L3 apprentice considers ALL FIVE before flipping the switch.",
      "(1) OPEN CIRCUIT — current path broken, R = ∞. (2) SHORT CIRCUIT — direct connection between L–L, L–N, or live conductors that should be separate; very low resistance, very high current. (3) EARTH FAULT — current path between live conductor and earth (CPC, exposed metalwork, true ground); operates RCD if path is through CPC; may not operate RCD if return path is via parallel route. (4) HIGH-RESISTANCE JOINT (HRJ) — termination with elevated contact resistance; under load, dissipates I²R heat; fire risk. (5) INSULATION FAILURE — degraded insulation between conductors; high-resistance leakage path; precursor to short circuit or earth fault. (6) TRANSIENT VOLTAGE — brief over-voltage from lightning, switching, faults elsewhere; damages electronics. (7) EXCESS CURRENT — overload (sustained current above design) or fault (sudden high current); causes thermal damage to cables.",
      "No. Part P (Building Regulations Approved Document P) makes NEW circuits in dwellings notifiable to Building Control. Replacement of an existing protective device is NOT a new circuit — it's maintenance. Notifiable work is: new circuits in dwellings; consumer unit replacements; any work in special locations (bathroom Zone 0/1/2 work, swimming pools, saunas). For non-notifiable work, the Minor Works Certificate is the documentary record but no Building Control submission is required. For notifiable work, the contractor must be a registered competent person (NICEIC, NAPIT, ELECSA, STROMA) and the Building Control notification goes via the scheme's online portal.",
    ],
    correctAnswer: 1,
    explanation:
      "The five-stakeholder framework is the L3 step-up from the L2 'safe isolation' lesson. At L2 you learned the JIB six-step (test the tester, isolate, lock-off, prove dead, test the tester again). At L3 you ALSO learn that the act of isolating has knock-on effects you have a duty to plan for. EAWR Reg 3 makes the 'duty-holder' obligation explicit — it includes you, the employer, the building occupier and any other person who has control of an electrical system or who can cause danger. Causing avoidable danger because you didn't tell the third-floor tenant their server was about to die is not a defence.",
  },
  {
    id: 2,
    question:
      "Why is it a problem for the L3 apprentice to isolate the main switch on a small business installation without warning the customer in advance?",
    options: [
      "TT-specific differences. (1) Earth electrode is the only return path — measure electrode resistance with a dedicated earth electrode tester (Megger DET3TC) or MFT with earth-stake adaptor. Typical 50–200 Ω; degradation increases over years (drying out, corrosion). (2) BS 7671 411.5 requires 30 mA RCD at origin (S-type if downstream RCDs are also 30 mA). RCD trip-time test on the origin RCD — different from TN where origin protection is overcurrent. (3) EFLI Zs values are MUCH higher than TN — calculate against BS 7671 41.1 limits for TT (often expressed as RA × IΔn ≤ 50 V). (4) Bonding requirements are stricter — bonding network IS the customer's only fault path. The L3 fault investigator approaches TT differently from TN.",
      "Two possibilities. (1) Active arc fault on the circuit — there's a real arc happening that the AFDD is correctly detecting and refusing to ignore. Investigate as a real fault: visual inspection, IR test, thermal imaging. (2) AFDD itself has failed in the 'trip' state — internal electronics fault. Test by removing the AFDD from the busbar (load disconnected) and trying to latch it; if it still won't latch, the AFDD is faulty and needs replacement. The L3 apprentice's protocol: investigate as real fault first; only if no fault is found, consider AFDD failure and substitute with known-good unit.",
      "Three reasons stack up. (1) Foreseeable financial loss — refrigerated stock, in-flight tills, in-flight card payments, in-flight server transactions, in-flight CNC jobs in a workshop, all of which the customer has cause to claim against you if you didn't warn them. (2) Customer trust and repeat business — a contractor who 'just turns the power off' without a heads-up is the contractor the customer doesn't call back. (3) Competence under EAWR Reg 16 — part of competence is foreseeing the consequences of your actions; failing to plan the isolation is itself an EAWR Reg 16 issue, because a competent person would have foreseen and managed the impact.",
      "A transient is a brief (microseconds to milliseconds) over-voltage spike — typical magnitudes 1 kV to 6 kV (lightning-induced can reach 20 kV+). Sources: (1) lightning strikes (direct or induced from nearby strikes). (2) switching events — large inductive loads (motors, transformers) creating back-EMF spikes when switched off. (3) fault clearing — supply network faults causing brief over-voltages on the consumer's side. (4) capacitor switching on power-factor correction equipment. Damage: solid-state devices (LED drivers, electronic boards, computers) have peak-voltage tolerance below the transient magnitude. Single transient can fail an entire LED ceiling rose array. Protection: SPDs (Surge Protective Devices) under BS 7671 443.",
    ],
    correctAnswer: 2,
    explanation:
      "EAWR Reg 16 'competence' isn't only about technical knowledge of the tester — it covers the whole job-planning skill. The HSE has prosecuted cases where an electrician dropped supply to a building without warning, equipment was lost, and the prosecution found the absence of a method statement / customer notification was itself a breach of the safe-system-of-work duty. Plan the isolation, scope it small, warn early, document the time window in writing on the job sheet.",
  },
  {
    id: 3,
    question:
      "BS 5839-1 (fire alarm code of practice) and BS 5266-1 (emergency lighting code of practice) — what's the L3 fault-diagnosis duty when your isolation will affect the alarm panel or the emergency lights?",
    options: [
      "(1) Identify circuit (label, drawings, customer info — hypothesis only). (2) Isolate (operate the breaker / switch — confirm it's the right one). (3) Lock-off (apply a personal padlock + tag with your name + date). (4) Prove the tester on a known live source (Martindale GVD2 proving unit OR a known live socket nearby) — voltage tester only. (5) Test the circuit at the work point (between L–N, L–E, N–E) — voltage tester only. (6) Re-prove the tester on the same known live source. Multimeters do NOT prove dead. Socket testers do NOT prove dead. Only a GS38 voltage tester does.",
      "Reg 4(2) puts the duty on every employer and on every employee — and Reg 16 on every person working with electrical systems. For the L3 apprentice doing fault diagnosis: (1) the system you're working on must be assessed for its 'as-found' safety BEFORE work starts (visual inspection of CU, supply, bonding, signs of damage); (2) any departures from safe construction must be recorded and not made worse by your work; (3) when you correct the fault, the corrected system must satisfy Reg 4 — i.e. you don't leave the installation in a worse state than you found it; (4) any defect that you can't fix safely is escalated for further work or for advisory documentation to the customer.",
      "Motor circuit analyser (PdMA MCEMAX, AEMC 6505, AVO Megger MIT400 series with motor-test modes) measures the motor's electrical characteristics OFF-LINE — winding resistance balance between phases, IR to ground, polarisation index, surge comparison. Identifies inter-turn shorts, ground faults, contamination, rotor cage damage. ON-LINE analysers (Baker Static Motor Analyser, SKF) measure during operation — current signature analysis, harmonic content. L3 apprentices rarely operate these but the broader principle — a motor has electrical AND mechanical fault modes, and dedicated instruments characterise them — is L3 syllabus knowledge.",
      "Three layers. (1) The Regulatory Reform (Fire Safety) Order 2005 makes the 'responsible person' (usually the building owner or appointed M&E manager) the only person who can authorise putting the alarm panel into 'engineer test' or 'isolated' mode — you cannot do it on your own initiative. (2) BS 5839-1 requires a fire watch be in place during the isolation to maintain life-safety cover, and the work is logged in the fire log book. (3) BS 5266 / BS EN 50172 require emergency lights have a 3-hour duration AND a 24-hour recharge after a full discharge — if your isolation drains the lights, you've left the building outside its compliance for the recharge window, which is a separate notifiable event.",
    ],
    correctAnswer: 3,
    explanation:
      "Fire alarm and emergency lighting are LIFE-SAFETY systems with their own British Standards and their own legal framework. The L3 apprentice does not interfere with them on their own authority — the responsible person under the Fire Safety Order authorises any isolation, and the work is documented in the fire log book. Compromising life-safety systems without authorisation is a separate criminal offence under the Fire Safety Order, distinct from any electrical breach.",
  },
  {
    id: 4,
    question:
      "You're investigating a fault on a sub-main feeding a comms cabinet that contains the building's network switch and a Synology NAS. What's the IT-isolation discipline?",
    options: [
      "Three steps. (1) Notify the IT manager / customer in advance — they need to do a controlled shutdown of any servers, NAS units, switches, telephone systems and CCTV recorders that depend on the supply. Pulling the plug on a NAS mid-write corrupts the file system; pulling on a server can corrupt the database. (2) Wait for the IT side to confirm 'safe to power off' before you isolate — typically 5–15 minutes for a small server / NAS, longer for a domain controller or VM host. (3) After the fault work, restore power and let the IT side bring the systems back up in dependency order (switches → routers → servers → user devices); don't expect everything to 'just come back'. The L3 apprentice respects the IT system as a managed asset, not just a load.",
      "Because scope 3 captures the embodied carbon of purchased materials, and an electrical contractor procures very large quantities of high-embodied-carbon material — copper cable in particular. The conductor in a single 100-metre drum of 16 mm two-core SWA cable can carry 20-30 kg of CO2 equivalent in embodied carbon. A contractor buying tens of thousands of metres of cable per year can easily have scope 3 purchased-goods emissions an order of magnitude larger than the combined diesel and electricity figures of scope 1 and scope 2. The use-phase emissions of installed systems (operational electricity drawn by lighting, power and HVAC over decades) can be larger still on commercial fit-outs.",
      "Continuity proving (sometimes 'continuity check') is a quick low-current test (typically 200 mA on the MFT or multimeter on continuity range) to confirm a connection exists — yes/no, not a precise measurement. R1+R2 is a precise measurement of the loop resistance of a complete circuit (line + protective conductor). For fault diagnosis: continuity proving is used to quickly verify that an isolation has fully disconnected a circuit (continuity from supply to load reads OPEN); R1+R2 is used to precisely characterise a circuit's loop resistance for comparison against expected design values. Both have their place; the L3 apprentice uses them at different stages.",
      "CALIBRATION — measurement of the instrument's response against reference standards, with results documented in a certificate. The instrument is unchanged; you get a certificate that says 'at the time of test, this instrument read X when measuring Y'. ADJUSTMENT — physical or software adjustment of the instrument to bring it into specification. Some calibration labs do both (calibrate, then adjust if out of spec, then re-calibrate); some do calibration-only (and you make the decision whether to adjust based on the report). The calibration certificate normally states whether adjustment was performed and the as-found vs as-left readings.",
    ],
    correctAnswer: 0,
    explanation:
      "IT systems have their own shutdown order and recovery order. A network switch or NAS that loses supply mid-write can corrupt its file system and require hours of recovery. The L3 procedure mirrors the planned-maintenance protocol — notify, wait for controlled shutdown, isolate, work, restore, let IT bring up. Doing it any other way is foreseeable damage to customer property and a breach of the EAWR Reg 16 'competence' duty.",
  },
  {
    id: 5,
    question:
      "A loss of supply to a tenanted commercial building can affect the public — name three building-system categories where this matters.",
    options: [
      "Three things. (1) The unit is configured / wired correctly for PEN-fault detection (some units have a DIP switch or software setting for the earthing arrangement; some auto-detect; some require firmware configuration). (2) The detection circuit is operational — many units include a self-test that runs on power-up and the apprentice should observe the test pass. (3) The unit's earthing is connected per the manufacturer's wiring diagram (the protective measure depends on the right conductors being terminated correctly). The MCS-certified designer specifies the test sequence; the apprentice executes per the design and verifies the result.",
      "(1) Lifts — passengers can be trapped between floors when a lift loses supply mid-travel; modern lifts have an auto-rescue battery that returns to the nearest floor before opening, but you cannot assume; the lift contractor is informed and the lift is taken out of service before isolation. (2) Automatic doors and disabled-access — wheelchair users cannot exit a building whose powered doors fail; the building manager needs to staff the doors during the isolation. (3) Fire escape lighting + fire alarm + sprinkler pumps — public escape routes lose their indicated path and any fire detection during the isolation; this is a Fire Safety Order issue and the responsible person plans the cover. Other categories: ATMs, CCTV (insurance / security), public Wi-Fi (less critical), traffic signals on adjacent works (rare but possible).",
      "Same framework as PV and battery. Any generator connected in parallel with the public distribution network falls under ENA G98 (up to 16 A per phase per inverter / generator) or G99 (above 16 A or where the DNO requires pre-application). Micro-wind turbines, micro-hydro turbines and micro-CHP units output AC and connect via an inverter (or a synchronous generator with grid-tie protection). Biomass boilers without electrical generation (just heat) are not generators — no G98 / G99. ENA G83 was the older fast-track standard for micro-generators; superseded by G98 from 2019. The L3 apprentice should recognise that the document chain (G98 / G99, type-test certificate, MCS commissioning, BS 7671 EIC, install pack) is the same regardless of the generation technology.",
      "Sequencing the trades that need to interact on the install: F-Gas-certified engineer for refrigerant; plumber for the wet system, cylinder, controls; electrician for supply, isolation, controls integration; sometimes a builder for cylinder cupboard alteration; sometimes a roofer / builder for outdoor unit mounting. Each trade has a sequence dependency — the electrical first-fix has to be ready before the F-Gas engineer commissions; the plumbing has to be charged and pressurised before the heat pump runs. Project management of the trade sequence is the certified installer's responsibility; as the apprentice you respect the sequence and don't get ahead.",
    ],
    correctAnswer: 1,
    explanation:
      "The public-safety category is what separates a domestic isolation from a commercial isolation in terms of impact. The L3 apprentice working on a commercial building plans for trapped lift passengers, blocked accessible exits, lost fire-detection cover and lost CCTV evidence — and books the building manager to coordinate the human cover (lift staffed-rescue, door watchers, fire watch). Skipping this is a public-safety failing the HSE and the local authority will both take an interest in.",
  },
  {
    id: 6,
    question:
      "What's the implication of NOT isolating — i.e. choosing to investigate live to avoid the disruption?",
    options: [
      "The HEMS schedules the heat pump's main run-time toward cheap off-peak windows where possible (e.g. overnight on Octopus Go). The battery charges during the same off-peak window. During the expensive peak window (typically 16:00-19:00) the battery discharges to cover the property load, including any heat pump running, while the grid import drops to near zero. Net peak grid demand from the property falls; the customer's bill falls; the grid stress falls. Some smart tariffs explicitly reward this — Octopus Cosy, for example, has dedicated cheap windows aligned with heat-pump run preferences.",
      "BS 7671 (A4:2026 Reg 421.1.7) recommends AFDDs in specified locations including dwellings — but the wording is 'recommending', not mandating. They are not strictly required by BS 7671 for a typical owner-occupied house. They ARE mandatory in Higher Risk Residential Buildings (HRRBs — typically blocks of flats over 18 m or 7 storeys) under the Building Safety Act 2022. For your house, they are a strongly recommended best-practice fire protection. Cost is roughly 60-100 GBP per AFDD-RCBO; protecting all socket and lighting circuits typically adds 600-1200 GBP to a CU change. Many domestic specifiers now include AFDDs as standard.",
      "Live working is permitted under EAWR Reg 14 only when (a) it's unreasonable for the conductor to be dead, (b) it's reasonable for work to be carried out live, and (c) suitable precautions are taken — ALL three. Choosing live work to avoid customer inconvenience does NOT pass test (a) — convenience isn't 'unreasonable for the conductor to be dead'. The L3 apprentice doesn't get to make that trade-off; the firm's risk assessment makes it, with documented justification, and the supervisor authorises it. The 'I'll just do it live, the customer doesn't want the power off' is the exact failure mode the HSE prosecutes after the inevitable shock.",
      "Heat-pump compressors have a high inrush current at start-up — typically 5 to 10 times the rated running current for a few cycles as the motor starts. A Type B MCB trips at 3 to 5 times rated current; the compressor inrush can nuisance-trip a Type B even on a healthy install, especially in cold weather when the motor starts hardest. A Type C MCB trips at 5 to 10 times rated current — comfortably above the inrush, still well below the prospective fault current, gives reliable nuisance-trip-free operation while preserving fault protection. Modern inverter-driven units have softer start profiles than older fixed-speed units but Type C remains the standard recommendation. RCBOs in Type C variant are also commonly used to provide both overcurrent and 30 mA earth leakage protection in one device.",
    ],
    correctAnswer: 2,
    explanation:
      "EAWR Reg 14 is strict liability — all three tests must be passed, and the test for (a) is OBJECTIVE (would a reasonable employer say it's unreasonable for the conductor to be dead?), not subjective (the customer doesn't want the power off). Live working to avoid disruption fails (a) and is a Reg 14 breach. The right L3 move is to plan the isolation to the smallest scope, warn the customer, schedule the disruption, and isolate properly — not to bypass the rules to please the customer.",
  },
  {
    id: 7,
    question:
      "Lone-working implications when isolating a fault on a small commercial site outside normal hours — what does the L3 apprentice need in place?",
    options: [
      "Possibly yes. Heavy usage accelerates wear on the input components (relays in IR/loop test stages, current transformers in clamp meters, switches and connectors). The calibration interval is set assuming 'normal' use; heavy use justifies a shorter interval. Also — any incident (drop, exposure to wet, exposure to heat above operating temperature, fault current through the instrument, blown fuse) is grounds for an interim calibration regardless of date. The general principle: calibration is a confidence interval, not a guarantee — use intelligence about how the instrument has been treated to decide if early re-calibration is justified.",
      "Three criteria. (1) Safety — dead tests before live, low-energy before high-energy. (2) Discrimination — choose the test whose result will most narrow the candidate hypotheses (e.g. an IR test that distinguishes 'short circuit' from 'open circuit' is more useful than a continuity test that only distinguishes one). (3) Cost — quick tests before slow tests, free tests before tests that cost the customer (e.g. visual inspection before opening the CU). The order is safety first, then discrimination, then cost. Most efficient diagnostic path is shortest sequence of tests that distinguishes between the surviving hypotheses.",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "Five lone-working controls before you start. (1) Documented lone-working policy from your employer authorising you to be on site alone for this category of work. (2) Buddy / check-in system — typically a phone call or text to the office every 30–60 minutes; failure to check in triggers an escalation. (3) First-aider known to be reachable, or HSE first-aid arrangements appropriate to the site (lone-worker apps with man-down detection are increasingly standard). (4) Rescue / extraction plan — if you suffered a shock, who knows where you are and who has the keys / access? (5) Authority limits — solo unsupervised diagnosis on a live installation is JIB Approved Electrician work, NOT apprentice work; an L3 apprentice should not be alone on a fault job that involves any live testing without explicit supervision arrangement.",
    ],
    correctAnswer: 3,
    explanation:
      "Lone working on fault diagnosis is a layered competence issue — EAWR Reg 16 (the work matches your competence), HSWA Section 2 (the employer has organised a safe system of work for the lone worker), and the firm's lone-working policy. An L3 apprentice doing live diagnosis alone, out of hours, without supervision, with no check-in regime, is multiple breaches stacked together. Lone working is acceptable for non-live diagnosis (e.g. dead-circuit IR testing, visual inspection) within a documented framework — it is not acceptable for live investigation.",
  },
  {
    id: 8,
    question:
      "What's the right way to communicate the isolation event to the customer in writing on the job sheet?",
    options: [
      "Five fields, on the sheet, signed and timed. (1) Time isolation started + circuits / equipment affected. (2) Verification that customer was informed and consented (with name of person you spoke to). (3) Any compensating measures the customer agreed to (e.g. 'fridge stock moved to back-up unit', 'fire watch in place', 'IT shutdown completed by site IT manager'). (4) Time supply restored + circuits / equipment re-energised. (5) Confirmation that protective devices reset, circuits tested live, customer's systems brought back up correctly. This becomes the EAWR Reg 4(2) / HSR25 maintenance record and your defence if the customer later claims damage you didn't cause.",
      "Fracture (other than to fingers, thumbs and toes); amputation; permanent loss of sight or reduction of sight; crush injuries leading to internal organ damage; serious burns covering more than 10% of the body or causing significant damage to eyes, respiratory system or other vital organs; scalpings requiring hospital treatment; loss of consciousness from head injury or asphyxia; any other injury arising from work in an enclosed space leading to hypothermia, heat-induced illness or requiring resuscitation or admittance to hospital for more than 24 hours.",
      "Three reasons. (1) Safe work — the next electrician arriving to service the unit needs a local isolator to lock off the supply for safe work without trekking back to the consumer unit. (2) Emergency response — a fire-fighter or first responder needs an obvious local means of disconnection if the unit is involved in an incident. (3) Customer use — the customer should be able to isolate the unit if needed without intervening at the consumer unit. The local isolator is typically a rotary or padlockable switch fitted within sight of the unit. Section 537 of BS 7671 covers isolation generally; Section 722 adds the EV-specific requirement; the IET Code of Practice gives the practical recommendation on type and location.",
      "Do not transport it in your vehicle without specialist packaging. A swollen battery is a damaged battery and is classed as dangerous goods for transport (UN 3480/3481, Class 9). Photograph the unit, isolate it from other equipment, ventilate the area, and either contact the original manufacturer take-back scheme or arrange collection by a specialist hazardous-waste carrier. Many domestic solar battery manufacturers operate a free end-of-life take-back. The customer holds the Duty of Care for their own household waste; you can advise but should not transport a damaged unit unpackaged.",
    ],
    correctAnswer: 0,
    explanation:
      "The job-sheet record IS the legal defence. EAWR Reg 4(2) and HSE HSR25 both recommend maintenance records be kept for the working life of the installation. A customer who later says 'you killed my server' has to prove it — and your contemporaneous record showing the IT manager signed off the controlled shutdown is decisive. Sloppy documentation is the gift to the claimant; clear documentation is your protection.",
  },
];

const faqs = [
  {
    question: "Isn't safe isolation just the JIB six-step? Why does this Sub add more?",
    answer:
      "The JIB six-step (test the tester, isolate, lock-off, prove dead at the work point, test the tester again, work on the now-confirmed-dead circuit) protects YOU from electric shock. That's the Level 2 lesson. The Level 3 lesson on top is: isolation has consequences for the customer's business, the public in the building, the life-safety systems and the equipment in the building — and you have a duty to plan and coordinate those consequences before you flip the switch. The six-step is necessary but not sufficient at L3.",
  },
  {
    question: "Why do refrigerated stock and till systems get singled out so often?",
    answer:
      "Because they're the two business-impact items most often forgotten, and because both have well-defined £ values you can cause loss against. The Food Standards Agency's safe-temperature window for chilled stock is 0–8 °C (any rise beyond ambient compounds quickly with shop lighting + customer fridge openings); for frozen stock it's −18 °C as the trigger for discard. Tills hold the day's takings in volatile memory and uncommitted card-payment confirmations on the till's local store — pulling the supply mid-transaction can void those transactions and require manual reconciliation. Both are foreseeable losses you've caused if you didn't warn.",
  },
  {
    question: "What if the customer says 'just turn it off, I don't care' — does that release me from the duty?",
    answer:
      "Partially — the customer can consent to disruption to their business (fridge stock, tills, IT) and that consent is your defence against THEIR claim against you. It does NOT release you from the life-safety duties (fire alarm, emergency lighting under the Regulatory Reform (Fire Safety) Order 2005 — those need the responsible person, not the customer at the till) and it does NOT release you from EAWR Reg 16 competence duty (you still have to be competent to plan and execute the isolation). Get the consent on the job sheet, signed and timed, then proceed.",
  },
  {
    question: "How do I 'plan' isolation scope to be minimal?",
    answer:
      "Three principles. (1) Isolate at the device, not the DB — if the fault is on one RCBO, isolate that RCBO (lock-off the breaker, prove dead at the work point), don't kill the whole DB. (2) Isolate at the DB, not the main switch — if you do need to access the busbar, isolate the DB only, leaving the rest of the supply alive. (3) Isolate at the main switch only when the work genuinely requires it (sub-main, tails, meter tails) — and then schedule the work to minimise disruption duration. The smaller the scope, the smaller the consequences, the easier the plan.",
  },
  {
    question: "Lifts and isolation — what's the procedure?",
    answer:
      "Lifts are a separate trade and a separate compliance regime (LOLER 1998 — Lifting Operations and Lifting Equipment Regulations, plus BS EN 81 series). The lift contractor is told in advance, the lift is parked at the ground floor with doors open and powered off at the lift isolator (NOT at the building's main switch — the lift has its own dedicated isolator at the motor room or shaft), a 'lift out of service' notice is posted, and the lift contractor is on site or contactable for the duration. You as the L3 apprentice do NOT isolate a lift on your own authority — the lift contractor or the building's responsible person does, and they confirm to you in writing it's safe before you proceed.",
  },
  {
    question: "Do I need to record the isolation time window on the certificate or the job sheet — and where does that live legally?",
    answer:
      "Job sheet / minor works / EICR observations — all three carry the record depending on the work. The legal anchor is EAWR Reg 4(2) (systems and equipment shall be maintained, and the records demonstrating that) and HSE HSR25 (recommends records kept for the working life of the installation). For a one-off fault visit, the job sheet is the primary record; for a periodic inspection where you isolated to test, the EICR observations / extent / limitations sections carry the record. Either way, the contemporaneous note (time start, scope, who consented, time end, what was tested live on restoration) is the document that protects you if anything is later disputed.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 5"
            title="Implications of isolation"
            description="Isolation isn't a switch flip — it's a planned event with consequences for you, other operatives, the customer's business, the public in the building, and life-safety / IT / refrigeration / fire alarm / emergency lighting systems. The L3 pre-isolation continuity-planning discipline."
            tone="emerald"
          />

          <TLDR
            points={[
              "Isolation has five stakeholders to think about — self, other personnel, customer, public and building systems. The L3 apprentice plans for ALL FIVE before flipping the switch.",
              "Plan the isolation scope to the smallest workable footprint — device first, DB second, main switch only when genuinely required. Smaller scope, smaller consequences, easier plan.",
              "Life-safety systems (fire alarm, emergency lighting) sit under the Regulatory Reform (Fire Safety) Order 2005 — only the building's responsible person can authorise isolation, and a fire watch + log book entry are mandatory.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the five stakeholder categories affected by isolation — self, other personnel, customer / client, public, building systems.",
              "Plan an isolation scope to minimise impact on the customer's business, refrigerated stock, tills, IT systems and production equipment.",
              "Coordinate isolation that affects fire alarm, emergency lighting and other life-safety systems with the building's responsible person under the Regulatory Reform (Fire Safety) Order 2005.",
              "Manage IT system shutdown and restart in dependency order to avoid file-system corruption and data loss.",
              "Apply lone-working controls (buddy / check-in, first-aider, rescue plan, authority limits) when isolating outside normal hours.",
              "Record the isolation event on the job sheet with sufficient detail to satisfy EAWR Reg 4(2) and HSE HSR25 record-keeping recommendations.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The five-stakeholder framework</ContentEyebrow>

          <ConceptBlock
            title="Self, other personnel, customer, public, building systems — all five matter"
            plainEnglish="At Level 2 you learned isolation protects YOU from electric shock. At Level 3 you learn that the act of isolating also affects four other categories of stakeholder, and you have a duty to plan and coordinate those impacts before you flip the switch."
            onSite="The L3 step-up the assessor watches for is whether you walk in, find the fault, and immediately reach for the main switch — or whether you stop, scope the impact, and plan the isolation event. The first behaviour is L2; the second is the L3 outcome the 2357 ELTK07 AC 1.2 verbatim text is asking for."
          >
            <p>
              Run this five-stakeholder check before any isolation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Self</strong> — your shock / arc / stored-energy risk after JIB six-step verification. The L2 lesson, still essential at L3.</li>
              <li><strong>Other personnel</strong> — operatives elsewhere on the same building working on equipment your isolation feeds. Tell them, in writing if practical, before you start.</li>
              <li><strong>Customer / client</strong> — the business is operating; tills, servers, refrigeration, production lines, telephone systems may depend on the supply you're about to drop.</li>
              <li><strong>Public</strong> — escalators, lifts, automatic doors, ATMs, CCTV all stop when supply drops. Trapped lift passengers and blocked accessible exits are foreseeable.</li>
              <li><strong>Building systems</strong> — fire alarm, emergency lighting, BMS, security, refrigeration, IT, HVAC have their own compliance frameworks (BS 5839, BS 5266, the Fire Safety Order, GDPR, LOLER, BS EN 50172).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 16 (competence)"
            clause={
              <>
                "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
              </>
            }
            meaning={
              <>
                Competence under Reg 16 covers the WHOLE planning skill, not just the technical knowledge of the meter. Foreseeing the consequences of isolation on the building&apos;s systems and the customer&apos;s business is part of competence; failing to plan is a Reg 16 issue regardless of whether anyone was hurt. An L3 apprentice does this kind of planning under documented supervision &mdash; which is also what Reg 16 requires when the apprentice doesn&apos;t yet have the experience.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (S.I. 1989/635), Reg 16."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Customer business impact — the £ consequences</ContentEyebrow>

          <ConceptBlock
            title="Refrigeration, tills, IT, production — the foreseeable losses"
            plainEnglish="Every business has supply-dependent assets that lose money or value when the power drops. The L3 apprentice scopes those before isolating, warns the customer, and either schedules the disruption to a low-impact window or scopes the isolation small enough to leave the dependent assets alive."
            onSite="A typical convenience store carries £2–8k of refrigerated stock. A small office with a NAS holds the firm's records on it; corruption is days of recovery. A small workshop with CNC equipment has work-in-progress that scraps if mid-cycle power drops. Knowing what's behind the customer's door tells you where to scope the isolation."
          >
            <p>
              The standard categories the L3 apprentice scopes before isolating:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Refrigeration / freezers</strong> — Food Standards Agency safe-temperature windows: chilled 0–8 °C (warming above 8 °C for &gt;30 min triggers discard), frozen below −18 °C (warming above −15 °C for &gt;30–60 min triggers discard). Domestic fridges are slower; commercial cabinets warm faster because they&apos;re lit and customer-opened.</li>
              <li><strong>Tills / EPOS / card terminals</strong> — uncommitted transactions in volatile memory; chargeable losses if dropped mid-payment.</li>
              <li><strong>Servers / NAS / network switches</strong> — file-system corruption from uncontrolled power loss; controlled shutdown takes 5–15 min for small kit, longer for VM hosts.</li>
              <li><strong>Production equipment</strong> — CNC, injection moulders, automated test rigs all scrap work-in-progress if mid-cycle power drops; some need re-homing of axes after re-power.</li>
              <li><strong>Telephone / VoIP / alarm dialler</strong> — call-out alarms (intruder, lift entrapment, fridge over-temp) lose their notification path while supply is off.</li>
              <li><strong>HVAC / BMS</strong> — the building management system holds setpoints in NV memory but logs lose continuity; large chillers may need a re-start cycle.</li>
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

          <ContentEyebrow>Life-safety systems — fire alarm and emergency lighting</ContentEyebrow>

          <ConceptBlock
            title="The Regulatory Reform (Fire Safety) Order 2005 sits above EAWR for life-safety isolation"
            plainEnglish="Fire alarm and emergency lighting are LIFE-SAFETY systems. The Fire Safety Order makes the building's 'responsible person' (owner, occupier or appointed M&E manager) the only person with authority to put them out of service. You as the L3 apprentice do not have that authority on your own initiative — even if your work needs it."
            onSite="The L3 apprentice loops the responsible person in BEFORE the isolation, the responsible person authorises 'engineer test' or 'isolated' mode at the panel, a fire watch is put in place, the work is logged in the fire log book, and the system is reinstated and re-tested before you sign off."
          >
            <p>
              The fire-alarm + emergency-lighting isolation discipline:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Notify the responsible person</strong> in advance — they're the legal duty-holder under the Fire Safety Order. Without their authorisation you cannot isolate.</li>
              <li><strong>Fire alarm to engineer test / isolated mode</strong> at the panel — logged at the panel and in the fire log book. Some panels send a test signal to the ARC (alarm receiving centre) — the ARC also needs to know.</li>
              <li><strong>Fire watch in place</strong> for the duration — a competent person walks the building or watches a live CCTV feed of the protected area, with phone access to the fire service.</li>
              <li><strong>Emergency lighting</strong> — maintained fittings stay lit on internal battery for 3 hours under BS 5266-1; recharge takes 24 hours after a full discharge. Plan the work to stay inside the 3-hour battery window OR coordinate supplementary cover with the responsible person.</li>
              <li><strong>Restore + test</strong> — reinstate the panel from engineer mode, test that the alarm sounds, log the reinstate time. Emergency lights are visually checked for healthy status indication.</li>
              <li><strong>Bin bags over smoke heads is NOT compliant</strong> — disturbed dust on removal triggers false alarms, the head is removed from the loop without the panel knowing, and the practice is rejected by BS 5839-1.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 (4th edition) — Electrical test equipment for use by electricians"
            clause={
              <>
                "Before starting any work, even of a routine nature, you should always check that... arrangements are in place to deal with the loss of supply to vital systems and to safeguard others who may be affected by the work."
              </>
            }
            meaning={
              <>
                GS38 is normally cited for test instruments and probe design, but it also carries the planning duty &mdash; you check, before starting, that arrangements are in place to deal with the loss of supply. That sentence is the regulatory anchor for the &lsquo;coordinate with the building&rsquo;s responsible person&rsquo; obligation. The L3 apprentice doing fault diagnosis on a building with life-safety systems treats GS38 as both an instrument standard AND a planning standard.
              </>
            }
            cite="Source: HSE GS38 (4th edition, 2015)."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>IT systems — controlled shutdown discipline</ContentEyebrow>

          <ConceptBlock
            title="Servers, NAS units and switches need a managed shutdown — not a yanked plug"
            plainEnglish="A server, NAS or network switch that loses power mid-write can corrupt its file system. Recovery takes hours. The L3 apprentice notifies the IT side, waits for them to do a controlled shutdown, then isolates."
            onSite="On a small commercial site the IT side is often a managed-service provider you have to phone in advance. On a larger site it's an in-house IT manager. Either way, give them at least 24 hours' notice for a planned isolation; for an emergency fault, phone them as the first call after assessing the fault, before reaching for the main switch."
          >
            <p>
              The IT-coordination steps:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Notify in advance</strong> — name the affected equipment (servers, NAS, network switches, telephone, CCTV recorder, building access control). Estimate the duration.</li>
              <li><strong>Wait for IT to confirm safe-to-power-off</strong> — typical small NAS or single server: 5&ndash;15 minutes. Domain controller or VM host: longer, possibly hours.</li>
              <li><strong>Isolate at the smallest scope</strong> that achieves the fault-diagnosis aim. Don&apos;t drop the comms-cabinet supply to fix a problem on a different sub-main if you can help it.</li>
              <li><strong>On restore</strong>, let the IT side power up in dependency order &mdash; switches first, then routers / firewalls, then servers, then user devices. Don&apos;t expect everything to &lsquo;just come back&rsquo;.</li>
              <li><strong>Document who you spoke to</strong>, when, and what they confirmed. The job-sheet entry is your defence if a system later turns out to be corrupted and the customer claims you caused it.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS 7671 514.10 — the warning notice that supports your isolation</ContentEyebrow>

          <ConceptBlock
            title="The 'alternative supply' notice tells the next sparks the building has more than one source"
            plainEnglish="BS 7671 Reg 514.10 (warning notice — alternative supply) requires a notice at the consumer unit, the meter and any inverter or battery point on installations with on-site generation. The next person opening the consumer unit must see at a glance that opening the DNO main switch does NOT necessarily de-energise everything — they need to also operate the AC isolator on the inverter, the battery DC isolator and any standby generator changeover."
            onSite="As the L3 apprentice on a fault job, the notice is your first prompt. If you walk in and see a 'Caution — alternative supply' label on the consumer unit, you know the property has on-site generation and your isolation plan needs to cover every source. If you walk in and the property obviously has PV on the roof but no notice on the consumer unit, raise that as an EICR observation — the missing notice is a maintainer hazard."
          >
            <p>
              How the warning-notice scheme supports the five-stakeholder isolation plan:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 514.10 alternative-supply notice</strong> — at the consumer
                unit, the meter and the inverter / battery / generator. Wording typically
                'Caution — this installation has more than one source of supply'. Identifies
                every isolation point.
              </li>
              <li>
                <strong>Reg 514.10.1 'voltage exceeding 230 V' notice</strong> — where
                voltage to earth exceeds 230 V at a point of access (some PV array DC
                strings, three-phase distribution boards). Required so anyone opening the
                enclosure sees the elevated voltage warning before live parts are
                accessible.
              </li>
              <li>
                <strong>Reg 514.13.1 'Safety Electrical Connection — Do Not Remove'</strong>
                — at every earthing conductor connection, every bonding conductor
                connection and the MET. Tells you the connection is safety-critical even
                if it looks redundant.
              </li>
              <li>
                <strong>Reg 514.11 isolation notice</strong> — at every point of isolation
                where the device is not adjacent to the equipment it controls. Tells the
                operative which circuit / equipment the isolator serves.
              </li>
              <li>
                <strong>Section 514 documentation chain</strong> — the warning notices on
                site mirror the SLD and schedules in the install pack. Notice missing on
                site or schedule mismatch with the SLD is a documentation defect that goes
                in the EICR observations.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Public-impact isolation — lifts, doors, escalators</ContentEyebrow>

          <ConceptBlock
            title="Lifts, accessible doors and escalators are public-safety equipment with their own regimes"
            plainEnglish="In a tenanted commercial building or any building accessed by the public, isolation can affect equipment that the public depends on for safety and access. Lifts under LOLER, accessible doors under the Equality Act, escalators under their own British Standards. The L3 apprentice plans for human cover."
            onSite="On a small commercial unit this is rarely a factor. On a multi-storey office block, retail unit or anywhere the public has access, the building manager is your route into coordinating the human cover (lift contractor, door watchers, fire watch). The L3 apprentice proposes the work, the building manager makes it safe to do."
          >
            <p>
              Public-equipment categories to scope:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lifts (LOLER 1998 + BS EN 81)</strong> &mdash; lift contractor parks the car at ground floor before isolation; &lsquo;lift out of service&rsquo; notice; lift contractor on site or contactable. You don&apos;t isolate the lift on your own authority.</li>
              <li><strong>Automatic doors / accessible doors (Equality Act 2010)</strong> &mdash; powered doors fail closed in most designs; wheelchair users and pushchair users cannot exit; building manager staffs the doors during the isolation.</li>
              <li><strong>Escalators</strong> &mdash; isolated at the local control panel by the escalator service contractor before main supply isolation; barriered off for the duration; watcher on duty if the public is in the building.</li>
              <li><strong>ATMs</strong> &mdash; bank notified in advance; queues redirected; security implications because cash dispensers in a powered-off state still hold the cassettes.</li>
              <li><strong>CCTV / building access control</strong> &mdash; recording continuity breaks; access-control magnetic locks may fail safe (open) or fail secure (locked) depending on design; security manager makes the call on cover.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Lone working — when isolation happens out of hours</ContentEyebrow>

          <ConceptBlock
            title="Lone working on fault diagnosis is a layered competence issue"
            plainEnglish="Out-of-hours fault calls are common — the customer can't lose business hours so they want you in at 19:00 or 06:00. Lone working at those times stacks the EAWR Reg 16 competence question, the HSWA Section 2 employer's safe-system duty, and the firm's lone-working policy."
            onSite="An L3 apprentice should not be lone-working on live diagnosis. Dead-circuit visual / IR / continuity work within a documented framework is acceptable; live testing alone is not. If the customer pushes for after-hours, the supervised approved electrician takes the live work; the apprentice is in for the planning, documentation and dead-side work."
          >
            <p>
              The lone-working framework:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Documented lone-working policy</strong> from your employer covering this category of work and authorising you to do it.</li>
              <li><strong>Buddy / check-in</strong> &mdash; phone or app at 30&ndash;60 minute intervals; failure to check in triggers an escalation. Lone-worker apps with man-down accelerometer detection are standard on larger contractors.</li>
              <li><strong>First-aid arrangements</strong> &mdash; HSE first-aid policy appropriate to the site; for lone working at a remote site, your phone &amp; the emergency services are your first-aider.</li>
              <li><strong>Rescue / extraction plan</strong> &mdash; if you suffered a shock, who knows where you are, who has the keys, who comes? A site induction with an emergency contact name and number on the job sheet covers this.</li>
              <li><strong>Authority limits</strong> &mdash; live work is a JIB Approved Electrician task with documented supervision arrangement; an apprentice does not lone-work live diagnosis.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Documentation &mdash; the job-sheet record</ContentEyebrow>

          <ConceptBlock
            title="Five fields on the job sheet protect you for the working life of the installation"
            plainEnglish="Your contemporaneous record is the single most valuable defensive document if anything is later disputed. Five short fields, signed and timed."
            onSite="The job sheet, the isolation log, the fire log book entry, the IT shutdown confirmation, the supervisor sign-off &mdash; together they form the audit trail HSE expects for any electrical work that affected supply or life-safety systems. None of it takes long; all of it matters."
          >
            <p>
              The five fields:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Time isolation started + scope</strong> &mdash; what circuits, what equipment, signed.</li>
              <li><strong>Customer notified + consented</strong> &mdash; who you spoke to, when, what they agreed to.</li>
              <li><strong>Compensating measures in place</strong> &mdash; fire watch, IT shutdown completed, fridge stock moved, supervisor on site, etc.</li>
              <li><strong>Time supply restored + circuits re-energised</strong> &mdash; signed.</li>
              <li><strong>Confirmation of safe restoration</strong> &mdash; protective devices reset, customer&apos;s systems back up, post-work test completed.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 (Inspection and Testing) — referencing HSE HSR25 'Memorandum of guidance on the Electricity at Work Regulations 1989'"
            clause={
              <>
                "The HSE&apos;s publication HSR25 recommends that records of all maintenance, including test results, be kept throughout the working life of an installation. This recommendation supports compliance with the Electricity at Work Regulations 1989 (EAWR), Regulation 4(2)."
              </>
            }
            meaning={
              <>
                Your isolation event IS a maintenance event in EAWR terms &mdash; you&apos;ve interacted with the system to keep it safe, you&apos;ve restored it, you&apos;ve tested it. The HSR25 / EAWR Reg 4(2) framework wants those records kept for the working life of the installation. The job sheet is the entry-level record; on a larger contract the firm&apos;s asset-management system holds the master copy. Either way, the contemporaneous note is the audit trail.
              </>
            }
            cite="Source: IET Guidance Note 3 (Inspection and Testing) referencing HSE HSR25 (Memorandum of guidance on the Electricity at Work Regulations 1989)."
          />

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 — Article 17"
            clause={
              <>
                "Where necessary in order to safeguard the safety of relevant persons the responsible person must ensure that the premises and any facilities, equipment and devices provided in respect of the premises... are subject to a suitable system of maintenance and are maintained in an efficient state, in efficient working order and in good repair."
              </>
            }
            meaning={
              <>
                Article 17 puts the maintenance duty (which includes isolation and re-instatement of fire-alarm and emergency-lighting systems) on the &lsquo;responsible person&rsquo; for the premises &mdash; usually the owner, occupier or appointed M&amp;E manager. As the L3 electrician you support that duty by coordinating with the responsible person before isolation; you do not assume the duty yourself.
              </>
            }
            cite="Source: Regulatory Reform (Fire Safety) Order 2005 (S.I. 2005/1541), Article 17."
          />

          <RegsCallout
            source="BS 7671 Reg 134.1.1 — selection and erection / good workmanship"
            clause={
              <>
                "Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation."
              </>
            }
            meaning={
              <>
                Reg 134.1.1 is the &lsquo;good workmanship&rsquo; anchor BS 7671 inherits as a competence test. Restoration of supply after fault diagnosis is part of erection in the wider sense &mdash; it has to be done by a skilled person, with proper materials, and to the standard the regulation expects. A sloppy restoration that leaves a circuit live but tests not done, or a fire-alarm panel still in engineer mode after you&apos;ve left, is a Reg 134.1.1 failing.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 134.1.1."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Killing the main switch on a small shop without warning the manager"
            whatHappens={
              <>
                Apprentice arrives at a Tesco Express at 10:00 for an RCBO fault on the lighting.
                Walks straight to the Schneider DB, throws the main switch to access the busbar,
                starts work. Twenty minutes later the manager comes back from the cash run to find
                the chest freezers warming, the tills offline, the card terminals offline, queues
                building, and the in-store music silent. Stock loss when the freezers exceeded
                &minus;15&nbsp;&deg;C: &pound;1,800. Lost trade across the 90&nbsp;minutes the shop
                was effectively closed: another &pound;1,500. The contractor&apos;s firm carries the
                liability because the apprentice didn&apos;t plan or warn. EAWR Reg 16 (competence)
                breach because a competent person would have foreseen the impact.
              </>
            }
            doInstead={
              <>
                Stop. Phone or speak to the manager BEFORE flipping anything. Confirm the scope you
                need (is it really the main switch, or is it just the affected RCBO?). Agree a time
                window (the shop&apos;s quietest 30&nbsp;minutes is usually mid-afternoon). Offer to
                isolate at the device level if the work allows it. Document the consent on the job
                sheet. THEN execute.
              </>
            }
          />

          <CommonMistake
            title="Putting a bin bag over a smoke head to 'isolate' the fire alarm"
            whatHappens={
              <>
                Apprentice is working on a lighting circuit in a ceiling void above an open-plan
                office. There&apos;s a smoke head right where they need to be. They put a bin bag
                over the head with masking tape and crack on. Two hours in, they finish the work,
                pull the bag off, the trapped dust drifts down through the head, the alarm
                triggers, the building evacuates, the fire service attends, the building&apos;s
                responsible person reports it, the local fire authority writes to the contractor.
                BS 5839-1 breach because an unauthorised person isolated detection. Fire Safety
                Order issue because the responsible person was bypassed. Chargeable false-alarm
                callout from the fire service.
              </>
            }
            doInstead={
              <>
                Speak to the responsible person before any work. They put the relevant zone(s) into
                isolated / engineer-test mode at the panel (logged in the fire log book), they
                arrange a fire watch for the duration, you do the work, the system is reinstated and
                tested before you leave. Bin bags over heads are not BS 5839-compliant and never
                were &mdash; they&apos;re an old short-cut that only worked when no-one was watching.
              </>
            }
          />

          <Scenario
            title="The Friday-afternoon comms-cabinet isolation"
            situation={
              <>
                You&apos;re sent to a small accountancy firm at 15:30 on a Friday to investigate a
                dead sub-main feeding the comms cabinet. The cabinet contains the firm&apos;s
                Synology NAS holding 3&nbsp;TB of client tax records, a network switch feeding 18
                desks, an internal VoIP phone system, and the building&apos;s CCTV recorder. The
                customer wants the fault fixed before Monday. You&apos;ve isolated at the cut-out
                and proved dead at the sub-main &mdash; but not before the IT side has shut anything
                down. The NAS was mid-snapshot when the supply dropped.
              </>
            }
            whatToDo={
              <>
                Stop the diagnostic work. Phone the firm&apos;s IT contact (managed-service provider
                or in-house) immediately and explain. They will need to run a controlled boot-up of
                the NAS, check file-system integrity, restore from the most recent good snapshot if
                corruption is found, and confirm the VoIP system has come back up correctly. Document
                on the job sheet: time of unplanned isolation, nature of the IT impact, who you
                phoned, what they confirmed, and the timeline of restoration. If client tax-record
                data is corrupted, GDPR and the firm&apos;s professional-indemnity arrangements
                bring further obligations. Restore supply only when the IT side is ready to receive
                it; bring the cabinet up in dependency order (switch&nbsp;&rarr;&nbsp;NAS&nbsp;&rarr;
                &nbsp;phones&nbsp;&rarr;&nbsp;CCTV).
              </>
            }
            whyItMatters={
              <>
                The L3 outcome from the 2357 ELTK07 AC 1.2 verbatim is recognising that an
                uncoordinated isolation has consequences far beyond the electrical system &mdash;
                data corruption, lost client records, GDPR exposure, professional-indemnity claims.
                The L3 apprentice phones the IT contact BEFORE isolating in any normal scenario; in
                an emergency dead-supply scenario where the supply is already lost, the apprentice
                phones IT as the first call AFTER making the system electrically safe and BEFORE
                starting diagnostic work. Knowing the order matters.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Isolation has five stakeholders — self, other personnel, customer, public, building systems. The L3 apprentice plans for ALL FIVE before flipping the switch.",
              "Plan the scope to the smallest workable footprint — device first, DB second, main switch only if the work genuinely requires it.",
              "Refrigeration, tills, IT, production equipment all carry foreseeable £ consequences if dropped without warning. Phone the customer before you cut anything they care about.",
              "Fire alarm and emergency lighting are LIFE-SAFETY — only the building's responsible person under the Fire Safety Order can authorise isolation. Fire watch + fire log book entry are mandatory.",
              "IT systems need a controlled shutdown in dependency order (switch first, then NAS / servers, then phones, then user devices). Reverse on restore.",
              "Public-impact equipment (lifts, accessible doors, escalators, ATMs) needs human cover during isolation — the building manager coordinates, you don't isolate on your own authority.",
              "Lone working out of hours stacks EAWR Reg 16 (competence), HSWA Section 2 (employer duty) and firm policy. An L3 apprentice does not lone-work live diagnosis.",
              "Document on the job sheet — time started, scope, customer consent, compensating measures, time restored, post-work test confirmed. EAWR Reg 4(2) and HSR25 want the record for the working life of the installation.",
            ]}
          />

          <Quiz title="Implications of isolation — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> 1.4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Safe working procedures
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module4-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
