/**
 * Module 4 · Section 2 · Subsection 3 — Multimeter, clamp, IR camera, oscilloscope basics
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.3
 *   AC 4.3 — "select the appropriate test instruments for fault diagnosis work"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.3 — appropriate test instruments
 * for diagnosing electrical faults.
 *
 * Frame: deep-dive on the measurement instruments beyond the MFT — multimeter
 * function-by-function, clamp meter use cases, IR (thermal) camera for
 * non-invasive fault location, oscilloscope basics for waveform diagnosis,
 * motor analysers for harder problems.
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
  'Multimeter, clamp, IR camera, oscilloscope (2.3) | Level 3 Module 4.2.3 | Elec-Mate';
const DESCRIPTION =
  'Beyond the MFT — the multimeter function by function, the clamp meter for live load and earth leakage, the IR / thermal camera for non-invasive fault location, oscilloscope basics for waveform diagnosis, motor analysers for harder problems.';

const checks = [
  {
    id: 'mod4-s2-sub3-multimeter',
    question:
      "What functions does a Fluke 117 multimeter give you that an MFT doesn't, and when does each matter for fault diagnosis?",
    options: [
      "Five functions. (1) AC voltage with TRMS — for harmonic-rich loads (LED drivers, VFDs) where average-reading meters under-read; matters for diagnosing nuisance trips on LED-heavy circuits. (2) DC voltage — for PV, battery, electronic control circuits, automotive. (3) AC current via clamp jaw or shunt — for live load measurement (Fluke 376FC clamp) without breaking the circuit. (4) Resistance / continuity beyond the MFT's null range — for accessory-level component checks (heater elements, motor windings, cable cores). (5) Frequency — for diagnosing supply-frequency faults (47–63 Hz on standby generators, VFD outputs). The MFT does the certification tests; the multimeter does the measurements that don't fit a certification template.",
      "Battery hazards are different from AC hazards: (1) DC shock — once your hand is on a DC busbar, your muscles can't release because there's no zero-crossing — DC at 60 V upward is treated as a let-go hazard; (2) hydrogen gas — lead-acid cells gas during charge, hydrogen accumulates in poorly-ventilated rooms, explosive at 4% LEL — battery rooms have forced ventilation for this reason; (3) electrolyte — sulphuric acid contact with skin / eyes — face shield, acid-resistant gloves, eye-wash station; (4) thermal runaway — a damaged or shorted cell can catch fire, with toxic fumes; (5) short-circuit current — a 100 Ah lead-acid string can deliver 5–10 kA short-circuit, enough to weld a spanner.",
      "Three-step BS 7671 643.2.2 test. (1) Measure end-to-end resistance of L (r1), N (rn), CPC (r2) — disconnect at the DB. (2) Cross-connect L1 of one leg to N2 of the other leg, and N1 of one leg to L2 of the other leg, at the DB. (3) Measure resistance L–N at every socket on the ring — readings should all be within 0.05 Ω of each other (the geometric average of the ring) for a healthy ring. A socket showing wildly different reading is on a spur or the ring is broken at that point. The test physically confirms the ring topology, not just continuity.",
      "Domestic 230 V 1-phase: safety glasses (Class 1, BS EN 166 1F), insulated gloves rated 1000 V AC (Class 0 to BS EN 60903), insulated tools (1000 V AC marked, IEC 60900), arc-rated long-sleeve top, sturdy work boots (no metal toecap exposure where metalwork is bonded). Add for 400 V 3-phase commercial: arc-flash rated face shield (Class 1 minimum, ATPV ≥ 8 cal/cm²), arc-flash rated outer layer, FR-treated trousers, voltage-rated overgloves with leather protectors. The arc energy on a 3-phase 400 V DB is an order of magnitude higher than a single-phase domestic CU.",
    ],
    correctIndex: 0,
    explanation:
      "Multimeter and MFT are complementary. The MFT does the BS 7671-defined tests (continuity, IR, EFLI, RCD trip-time) at calibrated test voltages and currents. The multimeter does free-form measurement at whatever voltage/current is present — for diagnosing things the MFT can't characterise (component values, waveform parameters, fault-condition voltage profiles).",
  },
  {
    id: 'mod4-s2-sub3-clamp',
    question:
      "How do you use a clamp meter to find which circuit is causing an RCD nuisance trip?",
    options: [
      "Stop, raise it in writing (text the supervisor or log it in the app). The RAMS specifies a podium for a reason — that is the documented control for the working-at-height risk on this task. Verbally swapping it out for a step ladder is an undocumented change to the safe system of work. Either the boxes get cleared and the podium gets used, or the RAMS gets formally amended and re-signed by everyone affected. WAHR 2005 Reg 6 puts the duty on the employer to use the most suitable equipment; verbally downgrading isn't a defence.",
      "Two-stage. (1) At the RCD output — clamp around L+N together (NOT individually). The reading is the imbalance current, which is the earth leakage on the protected circuits. A healthy installation reads 0.5–3 mA total leakage; a problem installation reads 8–28 mA (heading toward the 30 mA RCD threshold). (2) Then walk the affected circuits, clamping L+N at each accessory or branch — the leakage 'localises' to the branch carrying it. The Fluke 376FC has 0.01 mA resolution which is enough to spot a 2 mA leak on a single appliance. Standard L3 fault-finding tool.",
      "Minor Works Certificate (MWC) — the work is an alteration / addition to an existing circuit (re-terminations, device swap) that doesn't constitute a new circuit. MWC covers the circuit altered, the tests performed (continuity of CPC and ring conductors as applicable, IR, Zs, RCD trip time on the replaced device), the conclusion that the circuit complies with BS 7671 after the work. If your work had been a new circuit you'd issue an EIC; if you were re-inspecting an existing installation you'd issue an EICR; for an alteration to one circuit, MWC is the right choice.",
      "Three features. (1) Finger guards — a physical barrier on the probe that prevents the operative's fingers contacting the metal tip during use. (2) Limited exposed metal — the probe tip exposes a maximum of 4 mm (originally 2 mm in older GS38 versions) of conductive metal. (3) Insulated leads — the lead itself is insulated and rated for the working voltage; some GS38 sets include in-line fuses for additional protection.",
    ],
    correctIndex: 1,
    explanation:
      "The L+N together clamp reading is the residual current — the difference between current flowing out and current flowing back. On a healthy circuit, those are equal. On a leaky circuit, the difference is the earth leakage, which is what trips the RCD. The clamp meter lets you measure leakage WITHOUT operating the RCD, so you can find the source while the circuit is still energised.",
  },
  {
    id: 'mod4-s2-sub3-ircam',
    question:
      "What's the practical use of an IR (thermal) camera in fault diagnosis at an L3 apprentice level?",
    options: [
      "Three uses. (1) Loose / high-resistance terminations — a poor termination heats up under load (IR² losses); a thermal camera spots the hot terminal without opening the enclosure. Standard L3 use case at DBs under load. (2) Overloaded circuits — a cable warmer than its neighbours under similar load suggests overcurrent or undersized cable. (3) Thermal patterns on motors / drives — uneven winding temperatures suggest insulation breakdown or rotor faults. Entry-level Flir One Pro (~£300, plugs into a smartphone) gives 160×120 pixels at 0.1 °C resolution — enough to spot a 10 °C hotspot on a 25 °C terminal block. Mid-range Fluke TiS20 / Flir E4 (~£1500–2500) gives more resolution and better thermal range.",
      "(1) Lifts — passengers can be trapped between floors when a lift loses supply mid-travel; modern lifts have an auto-rescue battery that returns to the nearest floor before opening, but you cannot assume; the lift contractor is informed and the lift is taken out of service before isolation. (2) Automatic doors and disabled-access — wheelchair users cannot exit a building whose powered doors fail; the building manager needs to staff the doors during the isolation. (3) Fire escape lighting + fire alarm + sprinkler pumps — public escape routes lose their indicated path and any fire detection during the isolation; this is a Fire Safety Order issue and the responsible person plans the cover. Other categories: ATMs, CCTV (insurance / security), public Wi-Fi (less critical), traffic signals on adjacent works (rare but possible).",
      "Do not transport it in your vehicle without specialist packaging. A swollen battery is a damaged battery and is classed as dangerous goods for transport (UN 3480/3481, Class 9). Photograph the unit, isolate it from other equipment, ventilate the area, and either contact the original manufacturer take-back scheme or arrange collection by a specialist hazardous-waste carrier. Many domestic solar battery manufacturers operate a free end-of-life take-back. The customer holds the Duty of Care for their own household waste; you can advise but should not transport a damaged unit unpackaged.",
      "All of them, plus the main switch. (1) Open main switch / DNO cut-out cap (DNO call only) for incoming supply. (2) Open the EV charger isolator AND verify EV is unplugged (the EVSE may have its own contactor that closes on demand). (3) Open the PV AC isolator at the inverter AND the PV DC isolator at the array. (4) Open the battery storage AC isolator AND the battery DC isolator. (5) Confirm standby generator changeover switch is in MAINS position and lock-off the generator manual start. Then prove dead at the work point with a GS38 two-pole, AND a DC-rated tester for the PV/battery DC sides if you'll be near them.",
    ],
    correctIndex: 0,
    explanation:
      "Thermal imaging has revolutionised fault diagnosis on commercial and industrial sites. A 30-second scan of a DB at full load identifies every loose termination without opening the cover. The L3 apprentice doesn't need a £2500 unit — the Flir One Pro plugs into an iPhone and gives clinically useful images for £300. Most progressive firms now have at least one thermal camera in the van fleet.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the difference between an averaging-type AC voltmeter and a True RMS (TRMS) voltmeter?",
    options: [
      "Pre-Construction Information is the H&S information that the Client (with help from the Principal Designer) provides to designers and contractors before they start on the project. It covers the site (location, existing structures, services, ground conditions), the project (description, programme, key dates, design assumptions), the relevant H&S information (asbestos surveys, condition reports, environmental risks) and the Client's H&S file from any previous works.",
      "AVERAGING — measures the average of the rectified waveform and multiplies by a form factor (1.11 for sine wave) to give 'RMS equivalent'. Accurate for pure sine waves; under-reads for distorted waves (LED drivers, VFDs, switching power supplies). TRUE RMS — measures the actual heating effect of the waveform, accurate for any wave shape. For modern installations heavy with electronic loads (LEDs, VFDs, IT equipment), TRMS is essential — average-reading instruments can under-read by 20–40% on harmonic-rich circuits and miss nuisance-trip-causing voltage spikes.",
      "The certificate references the edition in force on the date of installation (e.g. BS 7671:2018+A4:2026). Subsequent amendments don't make the install non-compliant retrospectively, but they DO change what's required for any future addition / alteration / EICR you do on the same installation. Periodic inspection (EICR) is carried out to the standard in force at the time of the inspection — so a 2026 install will be EICR'd against whatever amendment is current in 2031.",
      "Take ALL adequate precautions: secure isolation (lock-off + key in pocket, not left in lock); a warning notice at the point of isolation; in some installations a separate caution at the point of work; voltage proving on a known live source before AND after testing the isolation; all to prevent the equipment becoming live again whilst work is in progress. Talking to the customer about not touching it is part of the precaution chain.",
    ],
    correctAnswer: 1,
    explanation:
      "All modern Fluke 117 / 87V / Megger AVO830 multimeters are TRMS by default. Cheap multimeters often aren't — you can spot them by the absence of 'TRMS' on the case. For L3 fault diagnosis on installations with significant electronic loading, TRMS is non-negotiable.",
  },
  {
    id: 2,
    question: "When would you reach for an oscilloscope rather than a multimeter for fault diagnosis?",
    options: [
      "Section 753 'Heating cables and embedded heating systems' covers electric heating cables embedded in floors, walls or ceilings, plus surface heating systems and de-icing / frost-prevention applications. The A4:2026 amendment completely revised Section 753 — extending its scope, retitling it, and adding new requirements relocated from Chapter 53 covering impact protection and installation of heating cables. Industrial heating systems complying with BS EN 60519, BS EN 62395 and BS EN 60079 are excluded from Section 753.",
      "The MCS designer calculates the predicted SCOP per the heat-loss calc, the chosen emitter design, the unit specification and the design flow temperature. The result is shared with the customer in writing as part of the design proposal — typically alongside an estimated annual electricity consumption (kWh) and an estimated annual running cost using the customer's electricity tariff. This sets honest customer expectations and is the basis on which the customer makes the buy-or-not-buy decision. MCS Code of Practice requires this disclosure. Without the SCOP estimate, the customer is signing off a six-figure decision (especially with retrofit fabric work) on no basis. The L3 apprentice should be able to find the SCOP estimate in the design pack and discuss it at customer level if asked.",
      "When you need to see the SHAPE of the voltage / current waveform over time — not just its RMS value. Typical L3 use cases: (1) Diagnosing harmonic distortion on a circuit where TRMS multimeter readings look fine but the load is mis-behaving. (2) Spotting voltage transients (spikes, sags, swells) that are too brief for a multimeter to capture but trip protective devices. (3) Diagnosing intermittent faults that show up as glitches. (4) Verifying VFD output waveforms. Modern handheld scopes (Fluke 125B, Megger Power Quality analysers, Hantek HT06) are battery-powered and field-usable. L3 apprentices don't usually own one but should know when to ask for one.",
      "FAIL — well above the BS 7671 Table 41.3 maximum of 1.37 Ω for B32 at 0.4 s disconnection. The protective device cannot guarantee disconnection within the required time. Action: (1) Verify the reading. (2) Check supply Ze first — is the high Zs caused by high origin Ze (possible PEN issue) or by added impedance on the circuit (HRJ, undersized cable)? (3) Make safe — isolate the affected circuit. (4) Investigate and rectify. (5) Document as Code 1 if safety is at imminent risk; Code 2 if safety is compromised but not immediately dangerous.",
    ],
    correctAnswer: 2,
    explanation:
      "The oscilloscope is the time-domain instrument — it shows what's happening at every moment, not just an averaged or RMS value. For waveform-related faults (harmonics, transients, intermittents) it's the only instrument that can see the problem. The Fluke 125B is the standard field scope (~£3000); cheaper alternatives exist for occasional use.",
  },
  {
    id: 3,
    question: "What's a power-quality analyser and what does it tell you that a multimeter doesn't?",
    options: [
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471). It places a statutory duty on the employer (and certain self-employed people) to report specified workplace injuries, occupational diseases, dangerous occurrences and fatalities to the HSE. Reportable items include fatalities, specified injuries (amputation, fracture other than fingers/toes/thumbs, loss of sight, scalping, etc.), over-7-day absences, and a defined list of dangerous occurrences. Reporting is via the F2508 form on hse.gov.uk.",
      "Sign in at the gate or welfare cabin, present ECS / CSCS / industry card if relevant, attend a visitor induction (shorter than the full operative induction), wear correct PPE for the area, and be escorted by a competent person from the site team. Visitors are not permitted to walk the site unaccompanied. CDM 2015 Reg 13(4)(b) requires the PC to take steps to prevent unauthorised access.",
      "A hole saw of the correct diameter on a cordless combi drill — cuts a clean circular hole sized exactly to the downlight aperture (typically 65 mm or 75 mm). For the rough access cut where you need a square hole or are running cable through, a multi-tool (oscillating multi-cutter, Bosch GOP / Fein MultiMaster) gives a controlled plunge cut without dust kicking up half the room.",
      "PQ analyser (Fluke 1748, Megger PQM, Dranetz HDPQ) is a long-term monitoring instrument — connect it at the supply or DB for a few days / weeks, it logs voltage, current, harmonic spectrum, transient events, sags / swells / interruptions, frequency, power factor, flicker. The multimeter shows you NOW; the PQ analyser shows you the past 7 days. Essential for diagnosing intermittent faults on commercial installations where the symptom only appears occasionally — the PQ log captures the moment of the fault and the conditions around it.",
    ],
    correctAnswer: 3,
    explanation:
      "Power quality analysis is the upper-tier diagnostic tool for commercial and industrial fault investigation. Most L3 apprentices won't operate one solo (it's a competence-graded tool) but will support a senior who's deploying one. EN 50160 (voltage characteristics of public distribution systems) gives the framework; PQ analysers report against it.",
  },
  {
    id: 4,
    question: "What's a motor circuit analyser and what does it tell you about a faulty motor?",
    options: [
      "Motor circuit analyser (PdMA MCEMAX, AEMC 6505, AVO Megger MIT400 series with motor-test modes) measures the motor's electrical characteristics OFF-LINE — winding resistance balance between phases, IR to ground, polarisation index, surge comparison. Identifies inter-turn shorts, ground faults, contamination, rotor cage damage. ON-LINE analysers (Baker Static Motor Analyser, SKF) measure during operation — current signature analysis, harmonic content. L3 apprentices rarely operate these but the broader principle — a motor has electrical AND mechanical fault modes, and dedicated instruments characterise them — is L3 syllabus knowledge.",
      "Equality Act 2010 s.6 defines disability as a physical or mental impairment that has a substantial and long-term adverse effect on the person's ability to carry out normal day-to-day activities. 'Long-term' means it has lasted, or is likely to last, 12 months or more. This explicitly includes mental health conditions — depression, anxiety disorders, PTSD, bipolar disorder, schizophrenia and others — where they meet the substantial and long-term thresholds. Where a worker's mental health condition is a disability under the Act, the s.20 reasonable-adjustments duty applies in the same way as for physical disability.",
      "Advanced cultural empathy: understanding that safety communication styles must be adapted to cultural context. In high power-distance cultures, a peer raising concerns directly may be uncomfortable. In indirect communication cultures, blunt safety warnings may cause face-loss. The electrician must find a culturally appropriate way to communicate urgency without causing shame, possibly involving the site supervisor or using visual demonstration rather than direct verbal confrontation",
      "Common adjustments include written schedules for the day and week, advance notice of any changes, clear and unambiguous instructions ('start at the kitchen, do the back-boxes first, the cable will be in the loft' — not 'sort the kitchen out'), avoidance of 'common sense' assumptions, predictable routine where the role allows, designated quiet space for breaks where sensory overload is a factor, and one-to-one briefings rather than large group sessions where the apprentice prefers. Adjustments are agreed with the individual — autism is a spectrum and people vary enormously.",
    ],
    correctAnswer: 0,
    explanation:
      "Motor analysis is improver / Approved Electrician territory but the L3 apprentice should know the instruments exist and what they tell you. Most workshop / industrial fault diagnosis on motor-driven plant uses these as the backbone — testing windings, identifying faults, predicting failures before they happen.",
  },
  {
    id: 5,
    question: "What CAT rating do you need for a clamp meter measuring at a 100 A commercial three-phase distribution board?",
    options: [
      "Three documents. (1) Updated EICR (or supplementary report) — codes the previously-failed item as now compliant; references the rectification work. (2) Minor Electrical Installation Works Certificate (MEIWC) for the rectification work — formal compliance certificate for the new / repaired work under BS 7671. (3) Customer-friendly summary — what the certificates mean in plain English. The customer keeps all three; the firm retains copies for 7+ years. NICEIC / NAPIT registration audits will check the certificate trail.",
      "CAT III 600 V minimum (CAT IV 600 V preferred). The DB is a fixed-installation distribution location, which is CAT III by definition. The Fluke 376FC is CAT IV 600 V / CAT III 1000 V — adequate. The Megger DCM340 is CAT IV 300 V / CAT III 600 V — adequate for 230/400 V three-phase. Cheap clamp meters with only CAT II rating are not safe at this location — they can fail catastrophically on a transient. Always check the CAT rating before using a borrowed or new clamp meter at a DB.",
      "(1) The site / customer's existing risk-assessment and method statement — what the principal contractor has identified as on-site hazards. (2) Your firm's task RAMS — the document specific to fault diagnosis at this premises, which you may need to produce or update on arrival. (3) A permit-to-work or equivalent authorisation — for commercial / industrial sites only, signed by the authorised manager, defining what you're allowed to do. Without these three you don't have a defensible position if something goes wrong, and the customer's safety policy will record you as an unauthorised worker.",
      "Five trades, five scopes. ELECTRICIAN — electrical work + make-good (filling, sealing, fire-stopping). PLASTERER — preparation, scrim, bond, skim of larger areas; finishing plaster surface. TILER — cutting, adhesive, fitting, grouting tiles; specialist tools. PAINTER / DECORATOR — preparation, primer, top-coat, decorative finishes. BUILDER — structural / load-bearing work; brick / block / concrete repair. Each trade has its competence boundary; the electrician's work is electrical + minimal building-fabric restoration. Specialist trades for finishing.",
    ],
    correctAnswer: 1,
    explanation:
      "The CAT rating applies to all instruments at the test location, not just multimeters. Clamp meters, two-pole testers, MFTs all need to meet the CAT rating. Mismatched CAT exposes the operator to flash-over risk on transients.",
  },
  {
    id: 6,
    question: "How do you measure inrush current on a motor or HVAC compressor with a Fluke 376FC?",
    options: [
      "The F-Gas Regulation imposes a phased reduction in the tonnes-CO2-equivalent of HFCs placed on the EU/UK market each year and bans certain high-GWP refrigerants in new equipment categories. R-410A has a GWP of around 2,088. R-32 sits around 675 and is a single-component refrigerant making service easier. R-290 (propane) has a GWP of around 3 and is essentially climate-neutral on the F-Gas scale, but is A3 flammable and brings ATEX and minimum-room-volume rules with it.",
      "A Request For Information is a formal written query from a contractor to the design team (architect, engineer, principal designer) when the drawings or specifications are unclear, contradictory or missing detail. It's logged, numbered, dated and tracked through to a written response. It protects the contractor from being held responsible for a design ambiguity and creates a paper trail for any later dispute. Use one whenever you'd otherwise be guessing.",
      "Set the meter to INRUSH mode. Clamp around one phase (or the L of a single-phase motor). Press start to arm the capture. Operate the load (start the motor). The meter captures the peak current in the first 100 ms after the rising edge of current — typically 6–10× the running current for an induction motor, higher for HVAC compressors. Useful for diagnosing nuisance trips on an undersized breaker (the inrush exceeds the magnetic trip threshold on a Type B breaker; replace with Type C or D for high-inrush loads).",
      "CAT IV 600 V two-pole testers — Martindale VI-13800 (~£60), Fluke T130 (~£100), Kewtech KT1780 (~£70). CAT III 1000 V / CAT IV 600 V multimeters — Fluke 87V (~£400), Megger AVO830 (~£200). CAT IV-rated MFTs — Megger MFT1721+ (~£900), Kewtech KT200 (~£500). Personal apprentice purchases typically: Martindale VI-13800 + Fluke 117 (CAT III 600 V — adequate for DB work but not cut-out). Firm-issued: Megger MFT1741+ and Fluke 87V for senior staff.",
    ],
    correctAnswer: 2,
    explanation:
      "Inrush capture is one of the diagnostic functions that separates the Fluke 376FC from a basic clamp meter. Most modern clamp meters in the £200+ bracket have it. The Megger DCM340 doesn't; the Fluke 376FC does. Inrush diagnosis fixes a lot of 'why does this breaker trip when the compressor starts?' jobs.",
  },
  {
    id: 7,
    question: "What's an earth-loop tester and how does it differ from the EFLI function on an MFT?",
    options: [
      "Because the heat-loss calc determines what flow temperature the system will run at, which in turn determines what size emitters (radiators / underfloor) the property needs. If the existing radiators are small (sized for 70-80°C flow from a gas boiler) and the heat-loss calc shows the property needs 8 kW design heat output, the radiators may need to grow to deliver 8 kW at 45°C flow. Emitter design is downstream of heat-loss calc. Skipping the calc and reusing existing radiators is the headline cause of disappointing UK heat-pump SCOP figures.",
      "Someone trained to recognise the early signs of mental health difficulty in colleagues, listen non-judgementally, provide initial support and signpost to professional help. Standard 2-day training course (delivered by Mates in Mind, MHFA England and others) costs around £150-300. Many UK construction firms now have one or more Mental Health First Aiders on staff alongside physical First Aiders.",
      "UK-SPEC (UK Standard for Professional Engineering Competence) is the published competence standard against which Engineering Council professional registrations (EngTech, IEng, CEng) are assessed. It defines five competence areas (knowledge and understanding, design, leadership and management, communication, professional commitment) and the level of evidence required at each tier. Available free at engc.org.uk.",
      "An earth-loop tester is a dedicated instrument (Megger LRCD-M, Kewtech KT200) that measures earth fault loop impedance ONLY — typically faster, more accurate at low impedance values, and with higher injected test current than the EFLI function on a general MFT. Used by 2391 / 2394 testers and by commissioning engineers who need to verify many EFLI values quickly. The MFT's EFLI function is fine for L3 fault-diagnosis use; dedicated loop testers are improver-level kit.",
    ],
    correctAnswer: 3,
    explanation:
      "Dedicated single-purpose instruments (loop testers, IR testers, RCD testers) used to be the norm; the MFT consolidated everything into one box. There's still a role for dedicated instruments where speed or accuracy matters — periodic inspection firms running 100+ tests per day often use dedicated loop testers for the EFLI step.",
  },
  {
    id: 8,
    question: "When you measure with a clamp meter, what's the most-common operator error?",
    options: [
      "Clamping around BOTH conductors (L AND N together) when measuring LOAD current. The clamp reads imbalance — for load current you want one conductor only (L OR N, not both). Reading shows zero or near-zero, apprentice assumes 'no load', misses the actual current. Conversely, when measuring earth leakage, you DO clamp L AND N together (the imbalance IS the leakage). The two use cases are mutually exclusive — load = one conductor, leakage = both conductors. Apprentices learn this in week one and re-learn it every time they pick up a clamp.",
      "Three things — battery life vs run time (a hard day on an SDS will drain a 5 Ah pack faster than you can charge spares), tool weight (cordless SDS with a 9 Ah pack on the back is noticeably heavier than a corded equivalent), and what supply is actually on site (no 110 V on site = corded 230 V is awkward, cordless wins). Most apprentices end up with a mixed loadout — cordless drill/driver + cordless impact for general work, corded SDS / grinder / recip on site supply for the heavy-duty jobs.",
      "Notices must be 'clearly and durably marked' (Reg 514.13.1) and 'shall be securely fixed in a visible position'. The practical interpretation: typed/printed labels on durable substrate (BS 951 plates for earthing, laminated card for inside-CU notices), securely fixed (screwed, riveted, or industrial adhesive), readable from a normal stand-back distance. Hand-written sticky labels degrade fast and aren't compliant.",
      "Raise it with the supervisor and get the WEEE segregated and routed to an AATF promptly. Smoke alarms typically contain small primary batteries and circuit boards (and ionising-chamber units contain a tiny radioactive source — Americium-241 — which has its own disposal route). Old fuse boards contain wiring, plastics and sometimes mercury contactors in older kit. Both are classic WEEE. Letting the pile grow is a Duty of Care breach in the making and is also a fire risk because of the accumulated combustible plastic.",
    ],
    correctAnswer: 0,
    explanation:
      "The L+N clamp method for earth-leakage is genuinely useful but visually identical to the wrong way to measure load. Get clear which use case you're in: 'is current flowing in this conductor?' = clamp ONE conductor; 'is there a leak?' = clamp BOTH conductors together. The Fluke 376FC has different display modes for the two — you set the meter to leakage mode for L+N clamping, current mode for single conductor.",
  },
];

const faqs = [
  {
    question: "Do I need a thermal camera as an L3 apprentice?",
    answer:
      "Not personally — but you should know how to use the firm's. Most progressive firms now have at least one Flir One Pro (~£300) or Fluke TiS20 (~£1500) in the van fleet. The thermal camera turns 'open the DB and look for hotspots' from a 20-minute job into a 30-second scan. For commercial fault diagnosis it's now a standard tool. Personal purchase comes when you specialise in commercial PIR / fault work later in your career.",
  },
  {
    question: "Can I use my smartphone's camera as a thermal camera?",
    answer:
      "Only with a clip-on accessory (Flir One Pro, Seek Thermal Compact). Your phone's normal camera doesn't see thermal — it sees visible light. The clip-on accessories are real microbolometer thermal sensors that mount on the phone and use the phone as the display. The Flir One Pro at £300 gives clinically useful images for fault diagnosis at L3 level. Cheap 'thermal camera apps' that don't use a hardware accessory are not real thermal cameras.",
  },
  {
    question: "What's the limit of a clamp meter — when should I use a different instrument?",
    answer:
      "Clamp meters are excellent for measuring AC current on conductors you can fit through the jaw (typical jaw opening 30–40 mm — covers cables up to 25 mm² T+E). For larger cables, use a meter with iFlex or Rogowski-coil flexible transducer (Fluke 376FC ships with one; Megger DCM340 takes an optional one). For DC current, use a DC clamp meter (Hall-effect; Fluke 376FC does both AC and DC). For very small currents (sub-1 mA earth leakage on a healthy circuit), use a sensitive leakage clamp meter (Megger DCM305E, Fluke 393FC) — designed specifically for low-leakage measurement.",
  },
  {
    question: "Is an oscilloscope ever justified for an L3 apprentice's personal kit?",
    answer:
      "Probably not yet. Oscilloscopes are improver / specialist tools and they're expensive (£300 for a basic Hantek up to £3000+ for a Fluke 125B field scope). The L3 apprentice's role is to know when to ASK for one — typically when a fault behaves intermittently or when the symptoms suggest a waveform-shape problem rather than a value problem. The senior or specialist deploys the scope; the apprentice supports.",
  },
  {
    question: "What's the most under-used instrument in the typical L3 apprentice kit?",
    answer:
      "The clamp meter, by a wide margin. Apprentices reach for the multimeter and the MFT first because they were trained on those at L2. The clamp meter measures things the others can't (live load current, earth leakage, inrush) without breaking the circuit, and it answers questions multimeter and MFT can't ('which circuit is leaking?', 'is this motor overloaded?', 'why is this breaker tripping at start-up?'). Practising with the clamp on routine jobs (clamping each circuit at the DB to confirm load matches the breaker rating) builds the habit.",
  },
  {
    question: "What's the difference between iFlex and a Rogowski coil?",
    answer:
      "iFlex is Fluke's brand name for their flexible Rogowski coil. They're the same technology — a flexible loop of wire that wraps around a conductor and uses electromagnetic induction to measure AC current. Advantages over rigid clamp jaws: fits around thick or awkward cables (busbars, large SWA, cables in tight enclosures); easy to install during operation; some models measure higher currents (up to 3000 A AC). The Fluke iFlex i2500-10 fits the 376FC and adds 1500 mm flexible loop measurement to the 30 mm rigid jaw.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 3"
            title="Multimeter, clamp, IR camera, oscilloscope"
            description="Beyond the MFT — the multimeter function-by-function (TRMS matters), the clamp meter for live load and earth-leakage measurement, the IR / thermal camera for non-invasive fault location, oscilloscope basics for waveform diagnosis, motor analysers for harder problems."
            tone="emerald"
          />

          <TLDR
            points={[
              "Multimeter and MFT are complementary — MFT does the BS 7671 tests at calibrated test voltages, multimeter does free-form measurement (component values, waveforms, fault profiles).",
              "Clamp meter + L+N together = earth leakage measurement. Clamp meter + single conductor = load current. Same instrument, opposite uses, mutually exclusive.",
              "IR / thermal camera turns 'open the DB and look for hotspots' from a 20-minute job into a 30-second scan. Flir One Pro at £300 is enough for L3 use.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish multimeter functions and explain when each (V AC TRMS, V DC, A, R, frequency) matters for fault diagnosis.",
              "Use a clamp meter correctly for both load measurement (single conductor) and earth-leakage measurement (L+N together).",
              "Use a thermal / IR camera to locate hotspots in DBs, terminations and motor windings.",
              "Recognise when an oscilloscope is the right tool — waveform-shape faults, transients, intermittents, harmonic distortion.",
              "Identify power-quality analysers and motor circuit analysers as specialist tools and know when to ask for them.",
              "Apply correct CAT ratings to clamp meters and other instruments at the work location.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Multimeter — function by function</ContentEyebrow>

          <ConceptBlock
            title="Five functions, five different fault-diagnosis use cases"
            plainEnglish="The multimeter is the free-form measurement instrument. Where the MFT does the BS 7671-defined tests at calibrated test voltages and currents, the multimeter measures whatever's happening at the moment — voltage, current, resistance, frequency — at whatever level it's happening."
          >
            <p>The five functions and their fault-diagnosis use:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AC voltage with TRMS</strong> — measures the actual heating-effect voltage of the waveform, accurate for any shape. Essential for harmonic-rich loads (LED drivers, VFDs). Average-reading meters under-read by 20–40% on these.</li>
              <li><strong>DC voltage</strong> — for PV, battery storage, electronic control circuits, automotive systems.</li>
              <li><strong>AC / DC current via clamp jaw or shunt</strong> — for measuring live load without breaking the circuit (clamp meters do this best).</li>
              <li><strong>Resistance / continuity</strong> — for accessory-level component checks (heater elements, motor windings, cable cores) at higher accuracy than the MFT's null range.</li>
              <li><strong>Frequency</strong> — for diagnosing supply-frequency faults (47–63 Hz on standby generators, VFD outputs).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Clamp meter — live measurement without breaking the circuit</ContentEyebrow>

          <ConceptBlock
            title="The most under-used instrument in the apprentice kit"
            onSite="Apprentices reach for the multimeter and MFT first. The clamp meter measures things the others can\'t — live load current, earth leakage, inrush — without breaking the circuit. It answers questions the others can\'t."
          >
            <p>Three primary fault-diagnosis use cases for the clamp meter (Fluke 376FC, Megger DCM340):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Load current measurement</strong> — clamp around ONE conductor (L OR N) at the breaker output. Confirms current matches expected; identifies overloaded circuits.</li>
              <li><strong>Earth leakage measurement</strong> — clamp around L AND N together. The reading is the imbalance, which is the earth leakage. Diagnoses RCD nuisance trips while the circuit is still energised.</li>
              <li><strong>Inrush current capture</strong> — set to inrush mode, arm capture, operate the load. Captures peak current in first 100 ms. Diagnoses \'breaker trips when the compressor starts' problems — typically resolved by changing breaker type (B → C → D).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 134.1.1 (Workmanship)"
            clause={<>"Good workmanship by competent persons or persons under their supervision and proper materials shall be used in the erection of the electrical installation. The installation of equipment shall take account of manufacturers' instructions."</>}
            meaning={<>Reg 134.1.1 puts the duty for measurement quality on the operative — using competent technique, appropriate instrument, correct method. Clamp meter use (clamping the right conductors for the right purpose) is an example of the technique that satisfies Reg 134.1.1 in fault-diagnosis context.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 134.1.1."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>IR / thermal camera — non-invasive fault location</ContentEyebrow>

          <ConceptBlock
            title="Spotting heat without opening the enclosure"
            plainEnglish="Loose terminations, overloaded cables, failing components — all generate excess heat under load. A thermal camera spots the hotspots in seconds, without disturbing the installation. For commercial and industrial fault diagnosis it\'s now a standard tool."
            onSite="Most progressive firms have at least one Flir One Pro (~£300, plugs into a smartphone) or Fluke TiS20 (~£1500) in the van fleet. A 30-second thermal scan of a DB at full load identifies every loose termination without opening the cover."
          >
            <p>Standard L3 use cases:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DB termination scanning</strong> — full-load thermal scan of the DB front; hotspots indicate loose / corroded / undersized terminations.</li>
              <li><strong>Cable overload identification</strong> — a cable warmer than its neighbours under similar load suggests overcurrent or undersized conductor.</li>
              <li><strong>Motor / drive thermal patterns</strong> — uneven winding temperatures suggest insulation breakdown or rotor faults.</li>
              <li><strong>Heating element checks</strong> — uneven heat distribution on an electric heater suggests a failed element segment.</li>
              <li><strong>Junction box hotspots</strong> — heat in a junction box that\'s at ambient on adjacent boxes indicates a fault inside.</li>
            </ul>
            <p>
              Camera tier guide: Flir One Pro (£300, 160×120 px) for L3 / general use; Fluke TiS20 (£1500, 120×90 px, dedicated unit) for serious commercial fault work; Flir T-series (£3000+) for specialist thermography.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Specialist instruments — when to ask for one</ContentEyebrow>

          <ConceptBlock
            title="Oscilloscope, PQ analyser, motor analyser"
            onSite="L3 apprentices don\'t typically own these but should know when to ask for one. The senior or specialist deploys; the apprentice supports."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Oscilloscope (Fluke 125B handheld, Hantek HT06)</strong> — when the fault behaves intermittently, when symptoms suggest a waveform-shape problem (harmonics, transients) rather than a value problem.</li>
              <li><strong>Power quality analyser (Fluke 1748, Megger PQM, Dranetz HDPQ)</strong> — long-term monitoring (days/weeks) at a supply or DB; logs voltage, current, harmonic spectrum, transient events, sags / swells / interruptions, frequency, power factor. Essential for intermittent commercial faults.</li>
              <li><strong>Motor circuit analyser (PdMA MCEMAX, AEMC 6505, Megger MIT400 with motor modes)</strong> — off-line motor electrical characterisation: winding resistance balance, IR to ground, polarisation index, surge comparison. Identifies inter-turn shorts, ground faults, contamination.</li>
              <li><strong>Earth electrode tester (Megger DET3TC, Megger MFT1741+ with earth-stake adaptor)</strong> — measures earth electrode resistance for TT installations; critical for fault diagnosis on TT systems where the electrode is the main return path.</li>
              <li><strong>Cable fault locator (Megger CFL535G, Time Domain Reflectometer)</strong> — locates the position of a fault on a cable run by measuring the time for a pulse to reflect back. Essential for buried SWA fault location.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3"
            clause={
              <>
                "Where equipment is connected and the equipment is likely to influence the insulation resistance verification test or be damaged by other test voltages, a 250 V DC insulation resistance test following connection of the equipment shall be used to verify insulation resistance as clarified in the redraft to Regulation 643.3."
              </>
            }
            meaning={
              <>
                A4:2026 codifies the LED-driver / dimmer / SPD problem. If sensitive electronics are still connected, drop the IR test voltage to 250&nbsp;V DC instead of 500&nbsp;V. The reading bar is the same (1.0&nbsp;M&Omega; minimum), but you don&apos;t cook the customer&apos;s gear in the process. This is exactly the situation a fault-diagnosis sparks meets every visit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 643.3 (insulation resistance, redrafted in A4:2026)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.3"
            clause={
              <>
                "Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no less a degree of performance and safety."
              </>
            }
            meaning={
              <>
                The clamp meter, IR camera, oscilloscope and PQ analyser all need to be chosen against BS EN 61557 (or demonstrate equivalence) when their reading is going to inform a safety decision. A thermal image taken with a phone-clip-on FLIR is a clue, not evidence; the Fluke Ti401 PRO with a calibration cert is the instrument you cite on the report.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.3, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Clamping L+N together expecting to measure load current"
            whatHappens={<>Apprentice clamps a Fluke 376FC around the L+N tails of a known-active circuit, expecting to read the load current. Meter shows 0.0 A. Apprentice assumes the circuit isn\'t loaded, doesn\'t investigate further. The actual load is 8 A; the L+N together reading is the imbalance (earth leakage), which is correctly near zero. Apprentice misses the real condition.</>}
            doInstead={<>Single conductor for load (L OR N — choose either), both conductors for leakage. Modern clamp meters have separate display modes that prompt the right behaviour — set to LEAKAGE mode for L+N together; CURRENT mode for single conductor.</>}
          />

          <CommonMistake
            title="Using an averaging-type meter on LED-heavy circuits"
            whatHappens={<>Apprentice has a budget multimeter without TRMS marking. They measure voltage on a circuit feeding a wall of LED downlighters (high-harmonic load). Meter reads 235 V; actual TRMS voltage is 244 V. Apprentice signs off the supply as compliant. Two months later the LED drivers start failing; investigation finds the supply has been at 245+ V for months and the drivers' input filters have been running over-spec. Damage attributable to the missed over-voltage.</>}
            doInstead={<>For any modern installation with significant electronic loading, use a TRMS multimeter (Fluke 117 / 87V / Megger AVO830). The 'TRMS' label on the case is the marker. Cheap meters without TRMS will under-read on harmonic-rich circuits and miss real over-voltage conditions.</>}
          />

          <Scenario
            title="Diagnosing a recurring RCD nuisance trip on a kitchen circuit"
            situation={<>Customer reports the kitchen RCBO trips two or three times a week, randomly. They reset and it works fine for days. You arrive Tuesday morning; the RCBO is currently in the ON position and the kitchen is working.</>}
            whatToDo={<>(1) Plug a clamp meter (Fluke 376FC, in LEAKAGE mode) around L+N at the kitchen RCBO output. Note the current reading — typically 1–3 mA on a healthy circuit. (2) Walk the customer through what they had on at the moments of recent trips — kettle, microwave, dishwasher, fridge, wall socket appliances. (3) Plug the clamp around L+N at each individual feed under the units (under-cabinet sockets, hob isolator, oven feed). One branch will show higher leakage than the others. (4) Within that branch, isolate appliances one at a time and watch the clamp reading drop. The appliance that drops the leakage when removed is the leaky one. (5) For confirmation: ask customer to switch on the suspect appliance and watch the clamp climb. Most common cause: dishwasher heater element starting to fail (1.5–2 mA leakage from the element insulation) — replace the heater (£40 part, 30 min job) and the RCD trips stop.</>}
            whyItMatters={<>The clamp-meter approach finds the fault while it's still latent — before the RCD trips. The alternative (wait for the RCD to trip then guess which appliance was on) is what most customers describe — and it never finds the cause definitively. The clamp lets you catch the leakage in the act, identify the source by elimination, and fix the actual fault. This is the L3 step-up from L2\'s \'reset the breaker and hope' approach.</>}
          />

          <SectionRule />

          <ContentEyebrow>Multimeter — TRMS vs averaging</ContentEyebrow>

          <ConceptBlock
            title="Why TRMS matters on modern installations"
            plainEnglish="A True-RMS (TRMS) multimeter measures the actual heating value of an AC waveform, regardless of shape. An averaging meter assumes a pure sine wave and applies a 1.11 form factor — which is wrong on any non-sinusoidal load. Modern installations are full of non-sinusoidal loads (LED drivers, switching power supplies, VSDs, EV chargers) and an averaging meter under-reads them by 20-40%."
            onSite="Standard L3 kit: Fluke 117 (TRMS, CAT III 600 V), Fluke 87V (TRMS, CAT III 1000 V / IV 600 V), Fluke 179 (TRMS, datalogging), Megger AVO410 (TRMS budget option). Cheap non-TRMS multimeters are fine for proving polarity and continuity but should never be used for current or voltage measurement on a circuit feeding electronics."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>TRMS marking</strong> — look for "True RMS" or "TRMS" on the front panel. Some meters show "RMS" without the "True" — check the spec sheet.</li>
              <li><strong>Crest factor</strong> — TRMS meters have a crest factor rating (typically 3:1). High-distortion waveforms (e.g. some VSD outputs) need crest factor 5:1 or higher (e.g. Fluke 87V).</li>
              <li><strong>Bandwidth</strong> — most TRMS meters spec 50-1000 Hz. Higher harmonics (above the 20th) need a wider-bandwidth instrument (Fluke 289, Fluke 287).</li>
              <li><strong>DC + AC mode</strong> — some loads have a DC offset on the AC waveform (e.g. half-wave rectifier loads). TRMS meters with a "AC+DC" mode read the combined value; standard AC mode reads only the AC component.</li>
              <li><strong>Min/Max/Average</strong> — Fluke 87V records the min, max, and average over a measurement period. Useful for catching transient voltage dips that disappear before you read the display.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Oscilloscope basics for fault diagnosis</ContentEyebrow>

          <ConceptBlock
            title="When the multimeter isn't enough — waveform diagnosis with a scope"
            plainEnglish="The multimeter shows a number; the oscilloscope shows the waveform. For diagnosing intermittent faults, dimmer compatibility issues, harmonic distortion, transient events, or any fault where the shape of the waveform tells the story, a scope is the right tool."
            onSite="Field-portable scopes for electrical work: Fluke 125B / 190 ScopeMeter (handheld, dual-channel, isolated inputs, CAT III 600 V — designed for electrical fieldwork), Hantek 2D72 (budget USB-connected, requires laptop). The Fluke ScopeMeter is the L3-relevant tool — runs on battery, fits in a tool bag, has scope-recorder mode for capturing intermittent events. £1,500-3,000 typically."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voltage waveform</strong> — verify sinewave shape. Distortion (flattened peaks, asymmetry, ringing) suggests harmonic loads or supply-quality issues.</li>
              <li><strong>Current waveform</strong> — using a scope-rated current clamp (Fluke i30s, i310s, i400s). Identifies waveform of individual loads — switching power supplies, VSDs, motors all have characteristic shapes.</li>
              <li><strong>Glitch capture</strong> — scope-recorder mode records continuously and triggers on a defined event (voltage dip, harmonic spike). Catch intermittent faults that appear once a day.</li>
              <li><strong>Harmonic display</strong> — FFT mode shows the harmonic spectrum. Identify which harmonic frequencies are dominant — useful for diagnosing transformer overheating, RCD nuisance trips on harmonic-rich circuits.</li>
              <li><strong>Phase relationship</strong> — dual-channel mode shows L vs N or L1 vs L2. Verify three-phase rotation, capacitor-start motor running winding phase, etc.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Power quality analysers</ContentEyebrow>

          <ConceptBlock
            title="The PQ analyser — long-duration logging for intermittent faults"
            plainEnglish="A power quality analyser logs voltage, current, harmonics, frequency, dips and swells over hours, days or weeks. For diagnosing intermittent faults that the customer can't reproduce on demand — flickering lights at random times, RCD trips that happen 'sometimes', transformers that overheat under unknown load — the PQ analyser is the only tool that catches the event."
            onSite="The L3 apprentice doesn't deploy a PQ analyser solo (it's typically improver / Approved Electrician territory) but does need to know what it does and when to ask for one. Standard kit: Fluke 1730 (3-phase, 7-day logging), Fluke 1760 (3-phase, advanced harmonics, EN 50160 compliance), Hioki PW3198 (3-phase, IEC 61000-4-30 Class A). Deployed for 24-72 hours typically, then the firm's senior engineer downloads the data and analyses."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voltage logging</strong> — minimum, maximum, average voltage at every cycle. Catches dips (sags), swells, sustained over/undervoltage.</li>
              <li><strong>Current logging</strong> — same for current. Identifies load cycling, motor inrush events, harmonic distortion.</li>
              <li><strong>Harmonic analysis</strong> — Total Harmonic Distortion (THD) plus per-harmonic breakdown. EN 50160 sets the public-supply limits.</li>
              <li><strong>Event capture</strong> — triggers on defined events (voltage dip below 90%, swell above 110%, frequency excursion). Records the waveform around the event.</li>
              <li><strong>EN 50160 compliance</strong> — public LV supply standard. Typical pass criteria: voltage 230 V ± 10% for 95% of the week, frequency 50 Hz ± 1%, THD &lt;8%, dips less than 100 events/year.</li>
              <li><strong>Reporting</strong> — Fluke Energy Analyse software produces a customer-presentable report. Used to back diagnostic conclusions ("the random RCD trips correlate with a daily 130 V voltage dip when the neighbouring factory starts its compressor").</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Thermal imaging — non-invasive hot-spot detection</ContentEyebrow>

          <ConceptBlock
            title="The IR camera — finding faults you can't safely measure"
            plainEnglish="An infrared / thermal camera shows surface temperature without contact. Loose terminals, overloaded cables, failing breakers, hot motors — all glow red on the image and can be diagnosed without isolation. The fault location is visible in seconds."
            onSite="Field-portable thermal cameras: Fluke Ti401 (320×240 pixel, 30 mK sensitivity, ~£3,500), FLIR E54 (320×240 pixel, ~£3,000), FLIR E5 (160×120 pixel, ~£600 budget option), Seek Thermal CompactPro (smartphone attachment, 320×240, ~£400). The L3 apprentice often uses the firm's thermal camera under remote supervision; thermography report writing is a separate qualification."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Temperature reference</strong> — ambient temperature noted on every image. A 60 °C terminal in 20 °C ambient is significant; in 30 °C ambient it's borderline.</li>
              <li><strong>Emissivity</strong> — different materials have different emissivities. Polished metal (low emissivity) needs an emissivity-correction or a small piece of black tape applied as a reference patch.</li>
              <li><strong>Comparison</strong> — compare the suspect terminal to identical adjacent terminals at the same load. A single hot terminal in a row of cold ones is the obvious fault.</li>
              <li><strong>Load-state</strong> — thermal anomalies only appear when the circuit is loaded. Image during normal operation, not on a de-energised system.</li>
              <li><strong>Standards</strong> — INSTA Cert and Level 1 / 2 / 3 thermography certifications (BINDT) underpin formal thermographic surveys. L3 apprentice uses the camera for fault location, not for formal certification.</li>
              <li><strong>Common findings</strong> — loose busbar bolts (high temperature on one terminal), corroded SWA glands (heat at the gland), overloaded MCBs (whole breaker hot), failing thermal-magnetic breakers, motor bearing failures.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Multimeter and MFT are complementary — MFT does BS 7671 tests at calibrated voltages; multimeter does free-form measurement at any voltage / current.",
              "TRMS (True RMS) multimeters measure actual heating effect of any waveform shape. Average-reading meters under-read by 20–40% on harmonic-rich loads.",
              "Clamp meter + single conductor = load current. Clamp meter + L+N together = earth leakage. Mutually exclusive use cases — set the meter mode accordingly.",
              "Clamp meter inrush mode captures peak current in first 100 ms — diagnoses 'breaker trips when compressor starts' problems.",
              "Thermal / IR camera (Flir One Pro £300, Fluke TiS20 £1500) finds hotspots without opening enclosures. Standard L3 tool for commercial DB scanning.",
              "Oscilloscope is for waveform-shape faults — harmonics, transients, intermittents. Specialist tool; ask for it when value-based meters can't see the problem.",
              "Power quality analysers log voltage / current / harmonics over days / weeks. Essential for diagnosing intermittent commercial faults.",
              "Motor circuit analysers characterise motor windings off-line — resistance balance, IR, polarisation index, surge comparison. Identifies inter-turn shorts and ground faults.",
            ]}
          />

          <Quiz title="Multimeter, clamp, IR camera, oscilloscope — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.2 Confirming fit-for-purpose</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.4 MFT for fault diagnosis</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
