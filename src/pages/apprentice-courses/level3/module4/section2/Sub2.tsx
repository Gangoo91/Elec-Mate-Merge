/**
 * Module 4 · Section 2 · Subsection 2 — Confirming instruments are fit for purpose
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.4
 *   AC 4.4 — "describe how test instruments are confirmed to be fit for purpose and functioning correctly"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.4 — describe how to confirm test
 * instruments are fit for purpose, functioning correctly and correctly
 * calibrated.
 *
 * Frame: the practical pre-use verification routine for the seven-instrument
 * kit — visual / calibration / function. Calibration certificates, UKAS
 * traceability, the calibration register, and what to do when an instrument
 * fails any check.
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
  'Confirming instruments fit for purpose (2.2) | Level 3 Module 4.2.2 | Elec-Mate';
const DESCRIPTION =
  'The pre-use verification routine for the L3 fault-diagnosis kit — visual / calibration / function — plus calibration certificates, UKAS traceability, the calibration register, and what to do when an instrument fails any check.';

const checks = [
  {
    id: 'mod4-s2-sub2-cal',
    question:
      "What does 'UKAS-traceable calibration' mean and why does it matter for the certificates you sign?",
    options: [
      "Six questions in order. (1) WHAT exactly happens? (in customer's own words). (2) WHEN does it happen — time of day, day of week, season, weather, after specific activity? (3) WHERE in the property — single room, multiple rooms, only when specific accessories used? (4) HOW LONG has it been happening — first noticed when, getting worse / better / same? (5) WHAT have you tried — reset breakers, unplug appliances, anything else? (6) WHAT CHANGED recently — new appliance, building work, leak, anything? The answers narrow the fault hypothesis from infinity to a small set. Most apprentices skip the interview; the senior who built habits saves an hour per call-out by spending 5 minutes on it.",
      "UKAS (United Kingdom Accreditation Service) traces every reference standard back through an unbroken chain to NPL (National Physical Laboratory) primary standards. A UKAS-traceable calibration certificate proves the lab measured your instrument against references whose accuracy is documented through the chain. For BS 7671 certification (EICR, EIC, MWC) and any EAWR Reg 14 evidence pack, the readings on the certificate must come from instruments with UKAS-traceable calibration in date. A calibration without UKAS traceability is technically inadmissible — and that means certificates signed off using it are challengeable.",
      "The control pilot is a low-voltage PWM signal between the charge point and the vehicle that negotiates charging current, communicates protection status, signals connection / disconnection events and triggers safe shutdown on fault. The signal is part of the IEC 61851 Mode 3 protocol. The car uses the duty cycle of the PWM signal to determine the maximum current the charge point can supply; the charge point uses the signal level to know whether the cable is connected, whether the car is ready to charge, and whether a fault has occurred. The signalling is built into the unit and the cable; the apprentice does not configure it but should recognise its role.",
      "The BMS is the safety-critical electronic controller embedded in the battery pack. It monitors per-cell voltage, per-cell temperature, pack current and state of charge; it balances cells during charge to keep them within their safe operating envelope; it disconnects the pack via internal contactors if any parameter exits the safe range; and it communicates state to the inverter and to remote monitoring. Without a working BMS the pack is unsafe to charge or discharge. The electrical interface includes the power conductors AND the BMS comms cable to the inverter — both must be installed correctly per the manufacturer's instructions or the system will not commission.",
    ],
    correctIndex: 1,
    explanation:
      "UKAS traceability is what makes a measurement legally and technically defensible. The chain runs: your MFT → calibration lab's reference standards → UKAS-accredited primary lab → NPL. Each step is documented. Certificates without it can be challenged in court (where a third party disputes a reading) and rejected by NICEIC / NAPIT audits.",
  },
  {
    id: 'mod4-s2-sub2-shift',
    question:
      "What's the standard PRE-SHIFT instrument check routine for the seven-instrument kit?",
    options: [
      "BS 7671 Part 6 643 verification — apply on every rectified circuit, every time. (1) CONTINUITY of CPC and ring conductors. (2) INSULATION RESISTANCE at 500 V (or 250 V if electronic loads can't be isolated). (3) POLARITY check (built-in to the other tests on most MFTs). (4) R1+R2 (if affecting a ring or radial). (5) Zs at the furthest accessible point on the affected circuit. (6) RCD TRIP-TIME at I&Delta;n where RCD-protected (300 ms typical, 40 ms at 5&times;I&Delta;n). (7) FUNCTIONAL test (load the circuit with a known appliance and verify it operates). (8) RECORD on the Minor Works Certificate test panel. The full Part 6 routine takes 20&ndash;30 minutes on a single circuit; non-negotiable.",
      "(1) Visual — case undamaged, leads not nicked, probes have intact finger barriers, no melted plastic, screen clean. (2) Calibration — sticker date in date for every instrument; calibration register up to date. (3) Function — two-pole tester proves on Martindale GVD2; multimeter shows expected voltage on a known-live socket; MFT self-test passes; clamp meter reads expected current on a known load; socket tester shows correct lights on a known-good socket; VDE drivers show no crack in insulation. 5–8 minutes per shift; the routine catches every instrument fault that has caused an incident.",
      "The monthly review brings together the apprentice, the employer (or supervisor) and the training provider's tutor or assessor. The review discusses progress on the apprenticeship standards, on-the-job competence, off-the-job training hours, any concerns from any side, and actions for the next month. The form is a record of the review and is part of the audit trail for the apprenticeship's compliance with the standards.",
      "No, for several reasons. The refrigerant work requires F-Gas certification (criminal offence to do without). The Building Regulations Part L compliance pathway requires installation by an MCS-certified installer for the customer to claim Smart Export Guarantee or similar incentives. The Boiler Upgrade Scheme grant requires MCS sign-off. Manufacturer warranties typically require certified installation. The MCS install pack includes heat-loss calc, emitter sizing, SCOP estimate, electrical schedule, commissioning records — all required for the system to perform as designed. DIY heat-pump install is unsafe and uneconomic.",
    ],
    correctIndex: 1,
    explanation:
      "The pre-shift routine is what professional firms expect. Most firms have a printed check sheet that the operative signs at the start of each shift; some have an app version. The 'I checked them last week' approach doesn't survive a PUWER audit — Reg 6 requires a fresh inspection at suitable intervals, and 'every shift' is the practical interpretation for portable test equipment.",
  },
  {
    id: 'mod4-s2-sub2-fail',
    question:
      "An instrument fails the function check at the start of a shift. What's the right action?",
    options: [
      "Use it carefully.",
      "Stop. Tag the instrument 'DO NOT USE — FAILED FUNCTION CHECK [date]', segregate it from the working kit. Inform the supervisor. Don't substitute with another instrument that hasn't been function-checked — repeat the three-step on whatever you reach for next. Update the firm's instrument register with the failure. The failed instrument goes to the calibration lab or repair house with the specific failure noted (helps the lab focus their diagnosis). Backup instrument is used for that shift; the failed unit is not used until verified back in service.",
      "Carry on.",
      "Borrow someone else's.",
    ],
    correctIndex: 1,
    explanation:
      "The failed-instrument workflow is what protects the next operative — the apprentice who picks up your bag tomorrow and assumes the instruments are good. The tag-and-segregate discipline is universal across PUWER-regulated equipment use; the alternative is the failed instrument getting reused by mistake.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the difference between calibration, verification, and function check?",
    options: [
      "Three categories. (1) Smart meter / utility meter failures — internal electronic failure (the meter itself stops measuring); diagnosis: voltage on the consumer side normal, customer reports billing issues; DNO call to replace meter. (2) Sub-metering installations (kWh meters at apartment level) — internal CT failure, terminal corrosion, comms link failure to BMS. (3) Specific instrument circuits in commercial buildings — temperature sensors, level sensors, flow meters; usually low-voltage SELV but with sensitive signal levels easily disrupted by EMI from nearby high-current cables. Diagnostic approach: substitute the suspect sensor with a known-good unit; if symptom moves, the sensor was at fault.",
      "CALIBRATION — formal laboratory measurement of an instrument's accuracy against UKAS-traceable reference standards, results documented in a certificate, performed at fixed intervals (annually for MFT, every 24 months for two-pole). VERIFICATION — comparison of two instruments under field conditions to confirm they agree (e.g. MFT EFLI reading agreed within 5% of a known reference loop). FUNCTION CHECK — pre-use confirmation that the instrument operates at all (powers on, indicates on a known source, returns to zero on a known dead source). Each is a different level of confidence; calibration is the formal baseline, verification confirms field agreement, function is the daily go/no-go.",
      "On TN-C-S, the neutral and protective earth share the PEN conductor between transformer and cut-out. If the PEN breaks anywhere upstream, the customer's neutral floats relative to the transformer star point. Customer's bonded metalwork (kitchen taps, sinks, radiators, EV charger chassis, all bonded to the customer earth terminal) rises toward phase voltage relative to true earth. RCD doesn't see it (no residual current — the lifted-neutral voltage flows through bonding network as L–E volt-drop, not as imbalance). First sign: tingle on metal taps or 30+ V N–E reading at cut-out. A4:2026 added explicit Open PEN protection requirements (Reg 411.3.3, especially for EV chargers).",
      "Purchased goods and services — dominated by copper cable, aluminium cable, switchgear and luminaires. The practical lever is procurement policy: specify EPD-backed products, set minimum recycled-content thresholds, prefer manufacturer-specific over industry-average EPDs, prefer products with longer expected service life, and reduce material use through more efficient design (smaller cable on shorter runs, lighting with higher lm/W avoiding over-specification). The fix sits at the order stage, before the material is on the van.",
    ],
    correctAnswer: 1,
    explanation:
      "The three levels exist because they answer different questions. Calibration: 'is this instrument accurate?' Verification: 'do my two instruments agree?' Function: 'does this instrument work today?' All three contribute to the confidence in a measurement. NICEIC / NAPIT registration audits check calibration certificates AND look for evidence of function-check routines.",
  },
  {
    id: 2,
    question: "Why is the 'function check on a known live source' specifically important for proving-dead testers?",
    options: [
      "You can't make someone seek help, but you can keep listening, keep checking in, and keep signposting gently. Suggest the Lighthouse Club 24/7 helpline (0345 605 1956) — confidential, no referral needed, no qualifying period. Mention Samaritans (116 123). Mention Mates in Mind resources. Don't break their confidence without asking, but if you genuinely believe they're at imminent risk of harm to themselves, the right thing is to call 999 or take them to A&E — that's a safeguarding step, not a betrayal. Look after yourself too — supporting a peer can be heavy. The same charities are available to you.",
      "Required for any high-risk task that needs documented authorisation — typically: live working above 50 V AC, work in hazardous areas (zoned ATEX environments), work on supply-side equipment, work that affects safety-critical systems (fire alarm, emergency lighting under test), work in confined spaces, hot work in close proximity to electrical equipment. The permit documents — task scope, authorised persons, date/time window, isolation steps already taken, residual hazards, PPE required, emergency response. Issued by an authorised manager, signed back at the end. Common on commercial / industrial sites; rare on domestic.",
      "Because a faulty proving-dead tester can show 'zero' on a live circuit — and you'd take a fatal shock. The function check confirms the tester responds to a known source. The proving-tester-on-known-source step is built into the JIB six-step (Sub 1.2) for exactly this reason. The Martindale GVD2 proving unit gives a portable known source; alternatively a known-live socket on a different circuit. Either way, the tester's response on a known source is the evidence the tester is working. Without that evidence, a 'zero' reading on the circuit you're about to work on means nothing.",
      "Every employee must (a) take reasonable care for the health and safety of themselves and others who may be affected by their acts or omissions at work, and (b) co-operate with the employer or any other person in the discharge of any duty placed on the employer or that other person under the relevant statutory provisions. 'Following orders' is not a defence — the personal duty stays with the employee regardless of what they were told to do.",
    ],
    correctAnswer: 2,
    explanation:
      "The 'prove the tester' step is the most-skipped step on safe-isolation procedures and the one that catches the most failed testers. A tester with a depleted battery, broken indicator, blown fuse, or internal damage will show 'zero' on every input — making every circuit appear dead. The known live source is the way you know the tester is actually responding to voltage.",
  },
  {
    id: 3,
    question: "What records must be kept for the firm's test instruments under PUWER 1998?",
    options: [
      "BS 7671 421.1.7 (per A4:2026 progression) requires AFDD on certain final circuits in specified locations: (a) bedrooms in Houses in Multiple Occupation (HMOs), care homes, dwellings used for short-term accommodation, (b) circuits feeding bedrooms in higher-occupancy student / hostel-type dwellings, (c) circuits feeding combustible-construction buildings (timber-frame in some interpretations). Single-family domestic dwellings are not currently mandated but A4 wording is moving toward broader uptake. Manufacturers (Hager AFB, Schneider Vigi+AF) sell combined RCBO+AFDD devices that fit in standard CU positions. The L3 apprentice's exam expectation: know AFDD is required where, why, and how it's specified.",
      "Directly. A correctly-sized stripper removes only the insulation, leaving the copper undamaged — full cross-section preserved, full current-carrying capacity, full mechanical strength. A knife strip nicks the copper, reducing the cross-section and creating a stress-riser fracture point. A few months of thermal cycling and the conductor breaks at the nick — high resistance, hot terminal, eventual failure on EICR or worse, on fire alarm. The stripping tool is part of the 526.1 chain.",
      "(1) Eliminate — can the chase be avoided entirely (surface mount, alternative route)? (2) Substitute — can a less dust-producing tool be used (resin-bonded chase saw with extraction vs hammer-and-bolster)? (3) Engineer — on-tool extraction connected to an M-class vacuum, water suppression. (4) Administrative — limit duration, rotate operatives, restrict access. (5) PPE — FFP3 mask as the LAST line, not the first. RPE alone is not COSHH-compliant for routine silica work.",
      "PUWER 1998 Reg 6 (inspection of work equipment) requires records of inspection results 'kept until the next inspection is recorded'. For test instruments this typically means: (1) calibration certificates from each calibration cycle (kept for the working life of the instrument plus a tail period for legal hold); (2) inspection / function-check log (some firms have a daily sheet, some app-based); (3) defect / repair records; (4) instrument register listing each instrument by ID, type, calibration date, next-due. The records support PUWER compliance AND BS 7671 certification AND legal defence.",
    ],
    correctAnswer: 3,
    explanation:
      "PUWER record-keeping is the unsexy bit of instrument management that protects the firm in any incident or audit. Most firms have a digital register (Joblogic, simPRO, Field Service Lightning include it; some firms use spreadsheets). The records are kept for the life of the instrument plus 6 years (general HSWA limitation) or longer if there's an open incident.",
  },
  {
    id: 4,
    question: "How do you function-check an MFT (Megger MFT1741+, Kewtech KT64+) at the start of a shift?",
    options: [
      "Five-step. (1) Power on — confirm self-test passes (Megger and Kewtech both run automatic self-tests on power-up). (2) Continuity — short the leads together; reading should be the lead resistance (typically 0.10–0.30 Ω) with audible buzzer; null the leads if the unit supports it. (3) Insulation resistance — connect leads together, press test at 250 V — should read &gt;999 MΩ (open circuit). (4) Loop / EFLI — connect to a known live socket; reading should match known reference for that location (or be plausible — typically 0.4–1.5 Ω at a domestic socket). (5) RCD — check on a known-good RCD outlet; trip-time should match the RCD's rating. Five minutes; catches drift, battery issues, lead damage.",
      "PUWER 1998 Reg 6 (inspection of work equipment) requires records of inspection results 'kept until the next inspection is recorded'. For test instruments this typically means: (1) calibration certificates from each calibration cycle (kept for the working life of the instrument plus a tail period for legal hold); (2) inspection / function-check log (some firms have a daily sheet, some app-based); (3) defect / repair records; (4) instrument register listing each instrument by ID, type, calibration date, next-due. The records support PUWER compliance AND BS 7671 certification AND legal defence.",
      "'Building Management System' — the central control system that orchestrates a building's heating, ventilation, lighting, security and energy use. BMS work is one of the fastest-growing specialisms in building services because every modern commercial building has one. Electricians who learn BMS programming and commissioning (often via Trend, Tridium, Siemens or Schneider training) are in high demand and can move into BMS specialist roles paying significantly above standard electrician rates.",
      "An F-Gas log entry recording the refrigerant type, the charge weight added or removed, the date, and the F-Gas-certified engineer's name and certificate number. The engineer logs the entry in their own F-Gas register and provides a copy or extract to the customer / installer for the handover pack. Required at every refrigerant transaction (initial commissioning charge, top-up, recovery at decommissioning). Required by the F-Gas Regulations and central to demonstrating compliance during any future enforcement check.",
    ],
    correctAnswer: 0,
    explanation:
      "The five-step MFT check is the practical L3 routine. Most firms have a 'reference test board' at the depot — a known-good representative installation that gives expected readings for verification before kit goes out. Alternatively the apprentice has a known-good test point at their first job that doubles as a verification.",
  },
  {
    id: 5,
    question: "What's the legal status of measurements taken with an out-of-calibration instrument?",
    options: [
      "All of them, plus the main switch. (1) Open main switch / DNO cut-out cap (DNO call only) for incoming supply. (2) Open the EV charger isolator AND verify EV is unplugged (the EVSE may have its own contactor that closes on demand). (3) Open the PV AC isolator at the inverter AND the PV DC isolator at the array. (4) Open the battery storage AC isolator AND the battery DC isolator. (5) Confirm standby generator changeover switch is in MAINS position and lock-off the generator manual start. Then prove dead at the work point with a GS38 two-pole, AND a DC-rated tester for the PV/battery DC sides if you'll be near them.",
      "Inadmissible for any purpose where the accuracy of the measurement matters legally — BS 7671 certification, EAWR evidence, EICR coding, dispute resolution. The reasoning: without UKAS-traceable calibration in date, you can't prove the measurement is accurate to the stated tolerance, so the measurement itself is unreliable. A circuit signed off as 'satisfactory IR ≥ 1 MΩ' using an instrument with expired calibration may actually have been 0.1 MΩ (instrument drift) — and any subsequent fire / shock incident will trace back to that signature. The instrument's calibration sticker is the front-line evidence; the certificate is the back-up.",
      "No. EAWR Reg 14(c) requires 'suitable precautions including where necessary the provision of suitable protective equipment'. The risk being 'low' doesn't dispense with the precaution — it informs which precaution. For 230 V live work, Class 0 insulated gloves (rated 1000 V AC) plus insulated tools are the standard precaution. The senior is exposing both themselves and the firm to liability under EAWR (failure to take suitable precautions) and HSWA Section 7 (employee duty to take reasonable care of own and others' safety). The apprentice's defence: 'I followed the firm's PPE matrix' — so make sure there IS one and it specifies gloves for live work.",
      "Three steps. (1) Notify the IT manager / customer in advance — they need to do a controlled shutdown of any servers, NAS units, switches, telephone systems and CCTV recorders that depend on the supply. Pulling the plug on a NAS mid-write corrupts the file system; pulling on a server can corrupt the database. (2) Wait for the IT side to confirm 'safe to power off' before you isolate — typically 5–15 minutes for a small server / NAS, longer for a domain controller or VM host. (3) After the fault work, restore power and let the IT side bring the systems back up in dependency order (switches → routers → servers → user devices); don't expect everything to 'just come back'. The L3 apprentice respects the IT system as a managed asset, not just a load.",
    ],
    correctAnswer: 1,
    explanation:
      "Out-of-calibration measurements are technically inadmissible. The HSE doesn't usually prosecute on this alone but it underpins prosecutions where a measurement-based decision led to harm. The civil law angle is similar — a customer's solicitor can argue the certificate is invalid because the underlying measurements weren't from a calibrated instrument. The cost of a £100 calibration is trivial compared to the cost of a void certificate.",
  },
  {
    id: 6,
    question: "What's the difference between 'calibration' and 'adjustment' at a calibration lab?",
    options: [
      "Standard order: (1) Ze at the supply origin (incoming meter tails or the main switch). Establishes the supply impedance baseline. (2) Each circuit at its furthest point in turn — go in label order or by RCD group. Use no-trip mode on RCD-protected circuits. (3) For any borderline reading, retest in full trip mode after preparing for the trip. (4) For any failing reading, investigate (terminations, route length, CPC size). The order isn\\\\\\\\'t arbitrary — Ze first gives you the baseline you need to sanity-check the per-circuit readings.",
      "Decline. The senior is asking you to be inside the danger zone of a live exposed conductor without the operational role of a witness/observer (you're holding a cover, not observing safety). EAWR Reg 14 — three conjoint tests — would not be satisfied: live work is happening, you're in the danger zone, but there's no live-working risk assessment that includes you as a participant. Your appropriate role is OUTSIDE the work area as a barrier-monitor / comms-runner / first-aider. If the senior needs the cover held to access the busbar, the right answer is to use a clip / stand / temporary cover-prop, NOT a human hand. Politely escalate to the supervisor if pressed.",
      "CALIBRATION — measurement of the instrument's response against reference standards, with results documented in a certificate. The instrument is unchanged; you get a certificate that says 'at the time of test, this instrument read X when measuring Y'. ADJUSTMENT — physical or software adjustment of the instrument to bring it into specification. Some calibration labs do both (calibrate, then adjust if out of spec, then re-calibrate); some do calibration-only (and you make the decision whether to adjust based on the report). The calibration certificate normally states whether adjustment was performed and the as-found vs as-left readings.",
      "Significant. Many faults recur because the customer's behaviour caused or contributed to them — overloaded extensions, plug-in heaters on lighting circuits, kettle + microwave + toaster simultaneously. Educating the customer on the actual cause AND how to avoid recurrence is part of preventing the comeback. Format: brief verbal explanation during the work + written summary in the job sheet that the customer signs at completion. 'Your circuit is rated for X amps; running these appliances together exceeds that; consider running them sequentially OR add a dedicated circuit'. The customer's informed cooperation prevents 60–80% of behaviour-related comebacks.",
    ],
    correctAnswer: 2,
    explanation:
      "The calibration-vs-adjustment distinction matters for understanding what the lab actually did to your instrument. An 'as-found / as-left' calibration certificate shows both the initial reading and the post-adjustment reading; if the as-found reading was out of spec, any measurements taken with that instrument SINCE the previous calibration are technically suspect (the instrument was drifting). Most labs flag this on the certificate.",
  },
  {
    id: 7,
    question: "Where do calibration stickers go on the instrument and what should they show?",
    options: [
      "Live working is permitted under EAWR Reg 14 only when (a) it's unreasonable for the conductor to be dead, (b) it's reasonable for work to be carried out live, and (c) suitable precautions are taken — ALL three. Choosing live work to avoid customer inconvenience does NOT pass test (a) — convenience isn't 'unreasonable for the conductor to be dead'. The L3 apprentice doesn't get to make that trade-off; the firm's risk assessment makes it, with documented justification, and the supervisor authorises it. The 'I'll just do it live, the customer doesn't want the power off' is the exact failure mode the HSE prosecutes after the inevitable shock.",
      "Cool, dry, ventilated location away from sources of ignition; not directly above or below escape routes; minimum clearances per the manufacturer's instructions for thermal management; not in a habitable room without a fire-rated enclosure or adequate fire separation; not in a loft (high temperature in summer, restricted access for emergency response); accessible for emergency isolation. The IET Code of Practice for Electrical Energy Storage Systems gives the framework. The manufacturer's installation manual is the binding instruction set; deviating from it voids the warranty and the BS 7671 compliance basis.",
      "Research suggests neurodivergence — dyslexia, ADHD, and autism — may be more common in trade roles than the general population. Some studies suggest dyslexia at materially higher rates in trade and creative industries (the visual-spatial reasoning associated with dyslexia is often a strength in hands-on work). ADHD and autism prevalence in the trade is also frequently reported as elevated. The Equality Act 2010 reasonable-adjustments duty (s.20) applies where the condition has a substantial and long-term effect, and Sub 5.2 covers the practical adjustments in detail.",
      "Standard placement: on the case, near the model / serial number, where it's visible during normal use. Should show: lab name, calibration date, next-due date (typically 1 year for MFT/multimeter, 2 years for two-pole), unique certificate reference. Some labs include a barcode that links to the digital certificate. The sticker is the operative's quick check that the instrument is in date — no need to dig out the certificate. Stickers must be replaced after each calibration cycle; old stickers should be removed (multiple stickers cause confusion about which is current).",
    ],
    correctAnswer: 3,
    explanation:
      "Calibration stickers are the front-line evidence and they live on the instrument body. The discipline is — sticker matches the latest certificate, certificate is in the firm's calibration register, register is current. Most firms also colour-code stickers by year so an out-of-date instrument is visible at a glance.",
  },
  {
    id: 8,
    question: "If an instrument has been heavily used (e.g. 40 hours of testing in one week on a big job), should it be re-calibrated more frequently than the standard interval?",
    options: [
      "Possibly yes. Heavy usage accelerates wear on the input components (relays in IR/loop test stages, current transformers in clamp meters, switches and connectors). The calibration interval is set assuming 'normal' use; heavy use justifies a shorter interval. Also — any incident (drop, exposure to wet, exposure to heat above operating temperature, fault current through the instrument, blown fuse) is grounds for an interim calibration regardless of date. The general principle: calibration is a confidence interval, not a guarantee — use intelligence about how the instrument has been treated to decide if early re-calibration is justified.",
      "Isolate AC and DC sides, lock-off, prove dead. Disconnect strings panel by panel. Remove panels using safe roof-access procedures. Recover the panels for recycling — established PV recycling streams in the UK take aluminium frames, glass, copper wiring and silicon cells separately. Inverter and any battery component handled as WEEE (electronics) and hazardous waste (battery) respectively. Roof penetrations made good. Update the EIC to reflect the removal. The MCS-certified installer (or successor) typically arranges the decommissioning chain through authorised waste carriers.",
      "Section 49 of the Consumer Rights Act 2015 implies a term in every contract for the supply of a service to a consumer that the trader must perform the service with reasonable care and skill. Failure to do so is a breach of contract and the consumer has remedies including the right to require repeat performance and the right to a price reduction. Poor communication that leads to defective work, missed scope items or a non-compliant installation can be a breach of s.49.",
      "Two responsibilities. (1) Identify the option set — what are the realistic repair / replace / redesign options for the specific fault? (2) Quantify the trade-offs — cost, lead time, reliability for each option. The DECISION is typically made by the senior / supervisor for non-trivial cases, OR by the customer based on the apprentice's options brief. The apprentice doesn't normally commit the firm to a specific repair / replace path on their own initiative — escalation to senior is the L3 expectation for commercial-impact decisions.",
    ],
    correctAnswer: 0,
    explanation:
      "Calibration intervals are based on average usage. Heavy users (commissioning, periodic inspection firms) often shorten the interval to 6 months; light users (a few jobs a week) may extend slightly. Any 'event' (drop, water, lightning, blown fuse) triggers immediate re-calibration regardless of date. Smart firms track usage hours in the instrument register and trigger early calibrations.",
  },
];

const faqs = [
  {
    question: "Where do I send instruments for calibration?",
    answer:
      "Manufacturer service centres (Megger UK Service in Dover, Fluke service centre in Norwich, Martindale calibration in Watford) — typically £40–150 per instrument, UKAS-traceable certificate, 5–10 working day turnaround. Independent labs (Test Equipment Direct, Distrelec, TPSS) also offer calibration; check they're UKAS-accredited (look for the UKAS '0234' or similar lab number on the certificate). Some bigger firms run their own UKAS-accredited internal labs. Avoid 'calibration' offers that don't issue UKAS-traceable certificates — the calibration is technically meaningless.",
  },
  {
    question: "What if I find an out-of-calibration sticker mid-job?",
    answer:
      "Stop using that instrument. Pick up the backup. Tag the out-of-calibration unit and put it aside. The job continues with the backup instrument; the tagged unit goes to calibration. If you've already taken some readings with the out-of-calibration instrument, those readings are technically inadmissible — you'll need to re-test those circuits with the in-calibration instrument before signing off the work. Document the issue on the job sheet and inform the supervisor.",
  },
  {
    question: "Can I share an instrument with another operative on the same site?",
    answer:
      "Yes, with discipline. Each operative does their own pre-use function check before using it (one operative's 'good' may be another's 'doubtful' if conditions changed). The instrument is logged out and back to the kit — knowing where instruments are at any moment matters for accountability. Some firms restrict sharing of MFTs and multimeters because of the function-check overhead; others have shared instruments at a depot bench. The principle: the operative using the instrument is responsible for its condition at that moment.",
  },
  {
    question: "What's the lifespan of a typical L3 fault-diagnosis instrument?",
    answer:
      "Megger MFT1741+ — 8–12 years with annual calibration and reasonable care. Fluke 117 / 87V — 10–15 years (Fluke build quality is exceptional). Martindale VI-13800 — 5–10 years (battery-operated wear out gradually; case fatigue from drops). Kewtech KT64+ — 6–10 years. Clamp meters — 8–10 years. Socket testers — 3–5 years. Most failures are accidental (drops, water exposure) rather than wear-out. Annual calibration is the prompt for a deeper inspection that catches early degradation.",
  },
  {
    question: "Do I need to do a function check if the instrument was checked at the start of the shift?",
    answer:
      "Quick re-check before each high-stakes use, yes. The full pre-shift check covers the day; the per-use 'prove the tester on a known source' step covers the moment. Both are needed. If you've used the tester continuously and it was working an hour ago, a quick proving on the GVD2 is enough. If it's been in the toolbox unused since this morning, repeat the full prove. The discipline scales with the consequence — proving dead before touching a busbar is a maximum-stakes use; the prove-tester step is non-negotiable.",
  },
  {
    question: "How do firms manage instrument calibration for fleets of 50+ instruments?",
    answer:
      "Most use a calibration management system (Megger PowerDB Asset, Fluke Connect, GageList, Calibration Control). Each instrument has a unique ID, calibration history, scheduled next-due date, automatic reminders. The calibration manager sees all units expiring in the next 30/60/90 days and books them in advance. Some firms operate a 'calibration day' — every instrument in the fleet rotates through the lab on a fixed schedule. The cost (£40–150 per unit per cycle) is significant for a fleet of 50 (£2,000–7,500 per year) but it's a non-negotiable operating cost.",
  },
];

export default function Sub2() {
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
            eyebrow="Module 4 · Section 2 · Subsection 2"
            title="Confirming instruments fit for purpose"
            description="The pre-use verification routine for the L3 fault-diagnosis kit — visual / calibration / function — plus calibration certificates, UKAS traceability, the calibration register, and what to do when an instrument fails any check."
            tone="emerald"
          />

          <TLDR
            points={[
              "Three levels of confidence: calibration (formal lab measurement against UKAS-traceable reference), verification (field agreement between instruments), function check (daily go/no-go).",
              "Pre-shift routine: visual / calibration / function for each of the seven instruments. 5–8 minutes; catches every fault that has caused an incident.",
              "Out-of-calibration measurements are technically inadmissible. UKAS-traceable calibration in date is non-negotiable for BS 7671 certification and EAWR evidence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish calibration, verification and function check — the three levels of confidence in an instrument.",
              "Apply the pre-shift visual / calibration / function routine to each of the seven L3 fault-diagnosis instruments.",
              "Explain UKAS traceability and why it matters for the legal defensibility of a measurement.",
              "Specify the records required under PUWER 1998 Reg 6 — calibration certificates, function-check log, defect register, instrument inventory.",
              "Apply the failed-instrument workflow — tag, segregate, inform supervisor, don't reuse until verified.",
              "Explain the difference between calibration and adjustment at the calibration lab and why 'as-found / as-left' readings matter.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Three levels of confidence</ContentEyebrow>

          <ConceptBlock
            title="Calibration, verification, function check — what each one tells you"
            plainEnglish="An instrument's reading is only as good as the chain of evidence that supports it. Three layers of evidence: calibration is the formal baseline, verification is field agreement between instruments, function check is the daily 'does it work?'."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Calibration</strong> — formal laboratory measurement against UKAS-traceable reference standards. Documented in a certificate. Annual for MFT and multimeter, every 24 months for two-pole tester.</li>
              <li><strong>Verification</strong> — field comparison between two instruments. E.g. compare MFT EFLI reading against a known reference loop or a second calibrated instrument. Confirms the field reading is plausible.</li>
              <li><strong>Function check</strong> — pre-use confirmation that the instrument works AT ALL. Powers on, responds to a known source, returns to zero on a known dead source. The daily go/no-go.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="PUWER 1998 — Reg 6 (Inspection)"
            clause={<>"Every employer shall ensure that, where the safety of work equipment depends on the installation conditions, it is inspected — (a) after installation and before being put into service for the first time; or (b) after assembly at a new site or in a new location, to ensure that it has been installed correctly and is safe to operate."</>}
            meaning={<>For test instruments specifically, Reg 6 is interpreted as 'inspected at suitable intervals' — typically pre-shift function check + scheduled calibration. Records are kept until the next inspection is recorded. The regulation puts the duty on the employer; the operative discharges it via the daily check.</>}
            cite="Source: Provision and Use of Work Equipment Regulations 1998 (S.I. 1998/2306), Reg 6."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>The pre-shift routine</ContentEyebrow>

          <ConceptBlock
            title="Visual / calibration / function on every instrument"
            onSite="Most firms have a printed check sheet that the operative signs at the start of each shift, or an app version (simPRO, Joblogic, BigChange). The 'I checked them last week' approach doesn't survive a PUWER audit — Reg 6 requires fresh inspection at suitable intervals."
          >
            <p>The check by instrument:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Two-pole tester (Martindale VI-13800)</strong> — visual: case + leads + probes; calibration: sticker in date; function: prove on GVD2 — full lamp + LED + audible.</li>
              <li><strong>Proving unit (Martindale GVD2)</strong> — visual: case + battery; function: confirm output by testing the two-pole on it.</li>
              <li><strong>MFT (Megger MFT1741+)</strong> — visual; calibration sticker; function: self-test, continuity null with leads shorted, IR test with leads shorted (open at &gt;999 MΩ), loop test on known live socket.</li>
              <li><strong>Multimeter (Fluke 117)</strong> — visual; calibration sticker; function: voltage on a known live socket, resistance on a known reference.</li>
              <li><strong>Clamp meter (Fluke 376FC)</strong> — visual; calibration sticker; function: clamp on a known load (e.g. a kettle on a 13 A circuit drawing 12 A).</li>
              <li><strong>Socket tester (Martindale CP501)</strong> — visual; function: test on a known-good socket — three lights all illuminate.</li>
              <li><strong>VDE screwdrivers (Wera Kraftform)</strong> — visual: handle insulation intact, no cracks, blade in good condition.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Calibration certificates and UKAS traceability</ContentEyebrow>

          <ConceptBlock
            title="Why the certificate matters more than the sticker"
            plainEnglish="The sticker on the instrument is the day-to-day evidence; the certificate is the document that backs it up. A NICEIC / NAPIT audit will ask to see certificates for all instruments; a court hearing on a disputed measurement will demand them. Keep them in a calibration register at the depot."
          >
            <p>What a UKAS-traceable certificate must include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lab name and UKAS accreditation number (e.g. 'UKAS Calibration Laboratory No 0234').</li>
              <li>Instrument identification — make, model, serial number.</li>
              <li>Calibration date and recommended next-due date.</li>
              <li>Reference standards used — instrument IDs and their own calibration date.</li>
              <li>Test results — measured value vs nominal, deviation, uncertainty.</li>
              <li>'As-found' and 'as-left' readings if adjustment was performed.</li>
              <li>Environmental conditions (temperature, humidity) at time of test.</li>
              <li>Signature of the calibration engineer and the lab's quality manager.</li>
            </ul>
            <p>
              The chain of traceability runs: your MFT → calibration lab\'s reference standards → UKAS-accredited primary lab → NPL primary standards. Each step documented. Without the chain, the measurement is technically arbitrary.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.3"
            clause={
              <>
                "Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no less a degree of performance and safety."
              </>
            }
            meaning={
              <>
                Calibration is what keeps an instrument BS EN 61557-compliant in service. A meter that was 61557-compliant when new can drift outside spec inside 18 months &mdash; the certificate is the evidence that it&apos;s still inside the standard&apos;s performance window. No certificate, no claim of compliance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.3, verbatim."
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
                A4:2026 deleted Table 3A and the 5&times;I&Delta;n test. There is now a single AC test at rated residual operating current &mdash; one button press on a Megger MFT1741+ or Kewtech KT64+. If your firm&apos;s test pro forma still asks for a 5&times;I&Delta;n result, it&apos;s out of date and needs revising before the next audit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 643.3 (RCD testing, redrafted in A4:2026)."
          />

          <SectionRule />

          <ContentEyebrow>The instrument register</ContentEyebrow>

          <ConceptBlock
            title="Tracking the kit at firm level"
            onSite="Most firms maintain a register that lists every test instrument: ID, type, make, model, serial number, calibration date, next-due, location/operative, defect history. Modern firms use software (Joblogic, simPRO, Field Service Lightning); some still run spreadsheets. The register is the source of truth — the calibration manager works from it to schedule recalibrations."
          >
            <p>Standard fields in a fleet register:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Instrument ID (firm\'s internal asset number).</li>
              <li>Type (MFT, multimeter, two-pole, clamp, socket tester, etc.).</li>
              <li>Make / model / serial.</li>
              <li>Purchase date / supplier / cost.</li>
              <li>Last calibration date / lab / certificate reference.</li>
              <li>Next calibration due.</li>
              <li>Current location / assigned operative.</li>
              <li>Defect / repair history.</li>
              <li>Status (in service / out for cal / repair / scrap).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using an instrument with an expired calibration sticker"
            whatHappens={<>Apprentice notices the sticker is two months out of date but uses the instrument anyway because there\'s no spare and the job is booked. They take IR readings — instrument has drifted, reads 200 MΩ on a circuit that\'s actually 0.3 MΩ. Sign off as compliant. Two weeks later the wet fault grows, customer\'s RCD trips repeatedly, firm gets called back. The customer\'s complaint says they paid for a fault investigation that didn\'t find the fault — refund + remedial costs. Insurance excludes claim because instrument was out of calibration.</>}
            doInstead={<>An instrument with expired calibration is not a usable instrument. Reschedule the job, hire/borrow a calibrated instrument, or arrange emergency calibration. The cost of a rescheduled job is trivial vs the cost of a void certificate.</>}
          />

          <CommonMistake
            title="Skipping the function check because the instrument was working yesterday"
            whatHappens={<>Apprentice grabs the two-pole tester from the toolbox, doesn\'t function-check, drives to site. The PP3 battery has corroded overnight (left with low charge in a damp van). Tester reads zero on EVERY input — every circuit appears dead. Apprentice \'proves dead' a circuit that's actually live, takes a 230 V shock. The function check on the GVD2 at the start of the shift would have shown the tester was dead.</>}
            doInstead={<>Function check at the start of every shift, no exceptions. The Martindale + GVD2 combo takes 10 seconds — press the button, lamps + LED + audible — done. Skipping it to save 10 seconds is the worst trade in the trade.</>}
          />

          <Scenario
            title="Out-of-calibration MFT at a customer site"
            situation={<>You\'re at a customer\'s house investigating a fault. Mid-test, you notice the MFT calibration sticker is dated 14 months ago — out of calibration by two months. The job is half done, you\'ve already taken some IR and continuity readings.</>}
            whatToDo={<>(1) Stop using the MFT. Tag it \'OUT OF CAL — not for service'. Inform the supervisor by phone. (2) Determine which readings were taken with the out-of-cal MFT. Those readings are inadmissible — they have to be retaken with a calibrated instrument before sign-off. (3) Backup options: borrow a calibrated MFT from another operative on a nearby job, hire one (Speedy Hire / HSS Hire stock Megger MFTs), reschedule the test phase. (4) Document everything on the job sheet — the discovery, the action, the supervisor briefing. (5) Send the out-of-cal MFT to the calibration lab on return to depot. (6) Customer brief — explain the situation honestly, no charge for the wasted visit if it was the firm's instrument-management failure.</>}
            whyItMatters={<>This scenario is more common than apprentices expect — calibration cycles slip when the firm doesn\'t have proactive scheduling. Honest handling of the situation protects the customer (no void certificate), protects the apprentice (didn\'t sign off invalid readings), protects the firm (no come-back from a future EICR finding the readings were wrong). The discipline of the visual-check-finds-the-sticker pays back the moment it catches a drift.</>}
          />

          <SectionRule />

          <ContentEyebrow>The pre-use functional check</ContentEyebrow>

          <ConceptBlock
            title="The 60-second pre-use check that catches a faulty instrument"
            plainEnglish="Calibration certificate in date is necessary but not sufficient — an instrument can develop a fault between calibration cycles. The pre-use functional check takes 60 seconds and catches the faults that would otherwise produce a misleading reading."
            onSite="The Megger MFT1741+, Kewtech KT64+ and Fluke 1664FC all support a self-test on power-up. Beyond that, manual functional checks: prove the two-pole tester on the Martindale GVD2; test the multimeter against a 9 V battery (should read 9.0 ± 0.2 V); check the MFT continuity against a known short (a 4 mm shorting link); check the IR test against an open circuit (should read &gt;999 MΩ) and a known resistor (e.g. a 1 MΩ test resistor)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Two-pole tester</strong> — prove on Martindale GVD2 (or known live socket). Confirm full lamp + LED + audible.</li>
              <li><strong>Multimeter</strong> — test against 9 V battery. Test continuity by shorting the leads. Test resistance against a known 1 kΩ resistor.</li>
              <li><strong>MFT continuity</strong> — short the leads, verify zero. Open the leads, verify OPEN. Apply a known 1 Ω resistor, verify reading.</li>
              <li><strong>MFT IR</strong> — open leads at 500 V test, verify &gt;999 MΩ. Apply known resistor, verify reading.</li>
              <li><strong>MFT loop</strong> — at a known socket on a different circuit, verify Zs reading matches your last recorded value (within 10%).</li>
              <li><strong>Clamp meter</strong> — clamp around a current carrying conductor with known load (kettle, drill), verify expected current reading.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>UKAS traceability and the calibration register</ContentEyebrow>

          <ConceptBlock
            title="What 'UKAS-traceable' actually means and why your firm should require it"
            plainEnglish="UKAS (United Kingdom Accreditation Service) accredits calibration laboratories to ISO/IEC 17025. A UKAS-accredited certificate proves the calibration was done against standards traceable to the National Physical Laboratory (NPL), which in turn traces to international SI standards. Non-UKAS calibration is cheaper but isn't traceable — and on a prosecution or insurance claim, the difference matters."
            onSite="Most of the big calibration providers in the UK are UKAS-accredited: Megger Instruments (Dover), Test Equipment Solutions (Camberley), Calex Electronics (Welwyn Garden City), the manufacturer's service centres for Fluke (Norwich) and Kewtech (Manchester). Cost: ~£60-90 per instrument per year. The certificate has a UKAS reference number, a list of measurements with as-found and as-left readings, and the lab's accreditation number."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>UKAS certificate fields</strong> — instrument make / model / serial; date of calibration; calibration cycle (12 months typical); as-found readings; as-left readings; lab accreditation number; technician signature.</li>
              <li><strong>Traceability chain</strong> — UKAS lab → reference standards traceable to NPL → SI units. Audit trail.</li>
              <li><strong>Calibration register</strong> — the firm maintains a register: instrument list, calibration dates, due dates, certificate references, location of physical certificates.</li>
              <li><strong>Out-of-cal handling</strong> — instrument tagged "out of service", removed from working kit, sent for re-calibration. Any readings taken during the out-of-cal period are flagged for review (in case re-calibration shows drift).</li>
              <li><strong>Audit visit</strong> — NICEIC, NAPIT, ELECSA surveillance visits routinely check the calibration register and pick a sample of certificates to verify.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What to do when an instrument fails any check</ContentEyebrow>

          <ConceptBlock
            title="The decision tree when a pre-use check fails"
            plainEnglish="A failed pre-use check is a STOP. The instrument is out of service immediately. The decision is what next — repair, recalibrate, or replace. The L3 apprentice flags the failure to the supervisor and uses a backup instrument while the firm decides."
            onSite="Most firms run dual MFT kit (one in use, one on standby) precisely so a failed check doesn't stop the day's work. If you don't have a backup, the supervisor will either provide one, postpone the job, or substitute a different operative who has working kit. Don't try to work around a failed check ('the readings looked OK so I carried on') — that's an audit and prosecution risk."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Failure type</strong> — physical damage (cracked case, damaged leads), out-of-cal (sticker expired or warning displayed), function-test failure (continuity reads non-zero on shorted leads, IR reads finite on open leads).</li>
              <li><strong>Tag and isolate</strong> — physical tag "OUT OF SERVICE — DO NOT USE" attached, instrument placed in the firm's quarantine box.</li>
              <li><strong>Substitute</strong> — switch to backup instrument, do the pre-use check on it, document the swap on the job sheet.</li>
              <li><strong>Notify supervisor</strong> — same day, in writing (text or app message). The firm needs to know its kit register has a failure.</li>
              <li><strong>Decision</strong> — if minor (e.g. a damaged lead), the firm replaces the lead and re-tests. If major (e.g. instrument drift), send for re-calibration or repair. If beyond economic repair, replace.</li>
              <li><strong>Document review</strong> — any readings taken with the failed instrument since the last successful pre-use check are flagged for review. May trigger a re-test on affected circuits.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Specialist instruments — when to bring them out</ContentEyebrow>

          <ConceptBlock
            title="The specialist kit beyond the MFT — when each is the right tool"
            plainEnglish="The MFT covers 80% of fault diagnosis. The other 20% needs specialist instruments — earth electrode tester, low-resistance ohmmeter (DLRO), insulation tester at higher voltage, power-quality analyser, motor analyser, thermal camera. Knowing when to upgrade the kit is part of the L3 step-up."
            onSite="L3 apprentices won't own all this kit personally — most lives in the firm's tool store and gets booked out for specific jobs. Knowing what each instrument does and when to ask for it is the competence test. The firm's kit list typically has Megger DET3TC (electrode tester), Megger DLRO10 (low-resistance for joints), Fluke 1730 (PQ analyser), Megger MTR105 (motor analyser), Fluke Ti401 / FLIR E54 (thermal camera)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Earth electrode tester</strong> — Megger DET3TC, DET14C. Three-pole or stakeless. Used for TT installations, lightning protection systems, fault investigations on degraded electrodes. Typical TT electrode 50-200 Ω.</li>
              <li><strong>Low-resistance ohmmeter (DLRO)</strong> — Megger DLRO10, DLRO10X. Measures sub-milliohm resistance. Used for verifying main earth bond integrity, joint resistance on busbars, contact resistance on switchgear.</li>
              <li><strong>Higher-voltage IR tester</strong> — Megger MIT400-2 (1 kV), MIT525 (2.5 kV), MIT1025 (10 kV) for SWA cable testing, motor windings, transformers.</li>
              <li><strong>Power quality analyser</strong> — Fluke 1730, Fluke 1760, Hioki PW3198. Logs voltage / current / harmonics over hours-days. Used for intermittent fault diagnosis, harmonic analysis, voltage dip / sag investigation.</li>
              <li><strong>Motor analyser</strong> — Megger MTR105, Baker DX. Measures winding resistance, polarisation index, surge response. Used for diagnosing motor winding faults.</li>
              <li><strong>Thermal camera</strong> — Fluke Ti401, FLIR E54, Seek Thermal CompactPro. Non-invasive hot-spot detection on terminals, busbars, motors, transformers.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Three levels of confidence: calibration (formal lab against UKAS reference), verification (field agreement between instruments), function check (daily go/no-go).",
              "Pre-shift routine: visual / calibration / function on each of the seven instruments. 5–8 minutes; catches every fault that has caused an incident.",
              "UKAS-traceable calibration in date is non-negotiable for BS 7671 certification and EAWR evidence. Out-of-calibration measurements are technically inadmissible.",
              "PUWER 1998 Reg 6 requires records of inspection at suitable intervals. For test instruments: calibration certificates + function-check log + defect register + instrument inventory.",
              "Failed instrument workflow: tag, segregate, inform supervisor, don't reuse until verified. The failed unit goes to the calibration lab or repair house with the failure noted.",
              "Calibration vs adjustment: calibration is measurement; adjustment is bringing the instrument into spec. 'As-found / as-left' on the certificate shows both.",
              "Calibration stickers go on the case where visible during normal use. Replace stickers after each cycle; remove old stickers to avoid confusion.",
              "Heavy usage and any 'event' (drop, water, lightning, blown fuse) trigger early re-calibration regardless of date.",
            ]}
          />

          <Quiz title="Confirming instruments fit for purpose — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.1 GS38 + selection</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.3 Multimeter / clamp / IR camera</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
