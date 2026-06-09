/**
 * Module 4 · Section 2 · Subsection 4 — MFT testing for fault diagnosis
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.5
 *   AC 4.5 — "specify an appropriate and logical procedure for carrying out fault diagnosis tests"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.7 — undertake the procedures for
 * continuity, insulation resistance, polarity, earth fault loop impedance,
 * RCD operation, current and voltage measurement, phase sequence.
 *
 * Frame: the seven BS 7671 643 tests done with an MFT, framed as
 * fault-diagnosis investigations rather than commissioning. What each test
 * tells you, the test sequence, the typical readings on a faulted vs healthy
 * circuit, and the BS 7671 643 / GN3 references.
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
  'MFT testing for fault diagnosis (2.4) | Level 3 Module 4.2.4 | Elec-Mate';
const DESCRIPTION =
  'The seven BS 7671 643 tests done with an MFT, framed as fault diagnosis — continuity, IR, polarity, EFLI, RCD, current/voltage, phase sequence. Test sequence, typical readings on faulted vs healthy circuits, GN3 references.';

const checks = [
  {
    id: 'mod4-s2-sub4-sequence',
    question:
      "BS 7671 643 sets out the test sequence for an EICR. For fault diagnosis the same sequence applies — what's the order and why?",
    options: [
      "Six tests in order: (1) continuity of protective conductors (R1+R2 and earth), (2) continuity of ring final conductors, (3) insulation resistance (IR), (4) polarity, (5) earth fault loop impedance (EFLI), (6) operation of RCDs. Order matters because each test assumes the previous tests passed — IR can damage electronics if polarity is wrong; EFLI assumes IR is good (otherwise the test current goes through the fault); RCD assumes EFLI is healthy. Tests 1–4 are dead tests; tests 5–6 are live. The dead-then-live order keeps you safe and gives clean diagnostic data.",
      "It's a flag that the substance can cause an allergic respiratory response in some operatives — repeated exposure can sensitise even without a single high-dose event. Means tighter respiratory PPE control (FFP3 minimum, often a respirator), good extract ventilation, and health surveillance under COSHH 2002 Reg 11 if the exposure is regular. Two-pack epoxy isocyanates are the textbook example in the trade.",
      "Refuse the unsafe instruction and raise the concern with the supervisor or higher. HASAWA s.7 puts the personal duty on the apprentice — a direct order from a senior is not a defence to a s.7 prosecution. The Employment Rights Act 1996 s.44 also gives the apprentice statutory protection from victimisation for raising H&S concerns. Document the refusal and the reason in writing (text, email, app note) at the time.",
      "A digital, accurate, accessible, secure information set covering the design, construction and ongoing management of an HRRB. Held by the Accountable Person during occupation. Includes design drawings, specifications, materials and product information, fire-safety strategy, evacuation arrangements, and changes through the building's life. Provides traceability of who designed/installed/changed what — including the electrical installation.",
    ],
    correctIndex: 0,
    explanation:
      "The BS 7671 643 sequence is the gold standard. For fault diagnosis you might focus on a subset (e.g. just IR + EFLI on the affected circuit) but the underlying logic is the same — verify cleanliness, then verify continuity, then verify protection. The MFT (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) is designed around this sequence with a dedicated function knob position for each test.",
  },
  {
    id: 'mod4-s2-sub4-ir-voltage',
    question:
      "What test voltage do you use for insulation resistance and why does it matter for fault diagnosis on circuits with electronics?",
    options: [
      "Make suitable arrangements for managing the project (resources, time, competent appointments), provide pre-construction information to designers and contractors, ensure the principal designer and principal contractor (where required) are appointed, and co-operate with all duty-holders. The client duties are real and enforceable — the HSE has prosecuted clients (including domestic clients in some cases) for failing to make those arrangements.",
      "BS 7671 643.3 specifies 500 V DC for SELV/PELV at 250 V; 500 V DC for LV up to 500 V; 1000 V DC for LV &gt;500 V. BUT — modern installations have electronic devices (LED drivers, dimmers, AFDDs, RCBOs with electronic detection, surge protection devices, smart meters) that 500 V will damage. Standard L3 practice: disconnect or shunt-out electronic devices before IR test, OR test at 250 V (lower, less damaging) and apply manufacturer's compliance criterion. Megger MFT1741+ supports 250 V / 500 V / 1000 V. The risk of damage is high; the cost of a customer-replaced LED driver wall is real.",
      "Site rules, welfare arrangements, fire muster point, first-aid arrangements, accident and near-miss reporting routes, the Construction Phase Plan headlines, the specific hazards on this site, the PPE policy, the no-go areas, your duties as a worker under Reg 15, and any project-specific risks (asbestos survey results, live services, traffic management). The induction is the formal mechanism for transferring CDM information from the Principal Contractor to operatives joining the site.",
      "ASHP source is outdoor air, which in the UK varies from -10°C in cold spells to 25°C+ in summer. The cold-day source temperature drops the COP because the unit has a bigger temperature lift to make. GSHP source is the ground at 1-2 m depth (horizontal slinky) or at 50-150 m depth (borehole), which sits at a stable 8-12°C year-round. So GSHP doesn't suffer the cold-day SCOP penalty — typical SCOP 4.0-5.0 vs ASHP 2.8-3.8. The trade-off is GSHP capital cost (£20-35k vs £10-15k for ASHP) and constructability (boreholes / trenching).",
    ],
    correctIndex: 1,
    explanation:
      "IR testing at 500 V on a circuit with embedded electronics is the most damage-prone test in the MFT's repertoire. BS 7671 643.3 lets you adapt the test voltage; GN3 (Guidance Note 3) gives the practical guidance on disconnection vs shunting. The L3 expectation is that you check for electronic loads BEFORE pressing the IR test button.",
  },
  {
    id: 'mod4-s2-sub4-eflivalues',
    question:
      "What are typical EFLI (earth fault loop impedance) values you'd expect on different circuit types in a healthy installation?",
    options: [
      "Where the employee knew or ought reasonably to have known about the hazard, where they had an opportunity to communicate it to the colleague or supervisor, and where the failure to communicate caused or contributed to the colleague being exposed to risk. HSE has prosecuted individual employees under s.7 for failing to brief a successor on a permit-to-work, for not communicating that a circuit was still live, and for not raising a concern about a defective safe system of work. The s.7 duty is personal and cannot be delegated.",
      "Three points. (1) WHAT'S INCLUDED — make-good (no holes, no exposed cable, accessories refitted) is part of the work. Basic patching of small areas (if your firm includes this) is part of the quote. Full restoration (re-plaster / re-tile / re-paint) is separate. (2) WHAT'S NOT INCLUDED — be explicit about what the customer will need a separate trade for. (3) WHO TO USE — recommend a plasterer / decorator / tiler if the customer needs one (referrals are good business). The brief upfront prevents the post-work dispute about 'why isn't the wall finished?'.",
      "Retention is the percentage of contract value (typically 3-5%) that the main contractor (or client) holds back from payments until the end of the contract — released in two halves: 50% at practical completion, 50% after the defects liability period (typically 12 months). It's an industry-standard mechanism for the customer's protection against post-completion defects but it ties up significant cash for the sub-contractor.",
      "Domestic single-phase 230 V: Ze (origin) typically 0.35–0.65 Ω on TN-C-S, 0.5–1.0 Ω on TN-S, 1–10+ Ω on TT. Zs (final circuit) = Ze + R1+R2 + cable loop impedance. For a typical 32 A B6 RCBO ring final with 50 m of 2.5 mm² T+E: Zs typically 0.6–1.2 Ω. For a 6 A B6 lighting circuit with 30 m of 1.0 mm² T+E: Zs typically 1.0–1.8 Ω. BS 7671 Appendix 3 / Table 41.3 sets the maximum Zs for each protective device — typically 1.4 Ω for B16 RCBO at 230 V (for 0.4s disconnection). Readings above the table value indicate poor cable, poor termination, or supply-side problems.",
    ],
    correctIndex: 3,
    explanation:
      "EFLI readings are the headline diagnostic for circuit health. A reading wildly different from the calculated expected value (Ze + R1+R2 + cable loop) suggests either supply-side issue (high Ze) or circuit fault (loose termination, broken CPC, partial open). The BS 7671 Appendix 3 maximum values are pass/fail thresholds; the diagnostic is the trend.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's an R1+R2 test and how is it different from a simple continuity test?",
    options: [
      "It tells you that 60% of the copper mass in the conductor came from recycled (post-consumer or post-industrial) copper feedstock rather than primary mined copper. Recycled copper carries roughly 15-20% of the embodied carbon of primary copper because the energy-intensive smelting from ore is avoided. What it does not tell you is the recycled content of the insulation polymer, the bedding, the sheath, the steel armour or the drum packaging. A complete environmental picture needs the full EPD, not just one headline number.",
      "R1+R2 is the resistance from the line conductor at the origin (R1) plus the resistance of the protective conductor back to the origin (R2) — measured by linking L and CPC at the far end of the circuit and reading from the DB end. Gives you the loop resistance for use in calculating Zs (Zs = Ze + R1+R2). Simple continuity is just R2 — CPC continuity from the DB to a single point. R1+R2 is the more useful measurement for fault diagnosis because it characterises the whole circuit; simple continuity confirms a single-point connection.",
      "Mat 01 (Environmental impact of materials) awards points for using construction products with verified third-party EPDs because they enable life-cycle assessment of the building materials and so reward designers for choosing lower-impact options. On a target BREEAM rating (typically Very Good or Excellent on commercial UK projects) the Mat 01 credit can be the difference between achieving the rating and missing it. That feeds back into the cable spec — the specifier asks for EPD-backed cable from the wholesaler, the wholesaler asks the manufacturer, the manufacturer publishes EPDs to stay on tender lists. The market signal is real.",
      "Explain clearly that refrigerant work is restricted by law to F-Gas-certified persons under the F-Gas Regulation. If the unit feels less effective they should call the original installer or an F-Gas certified service company who will leak-test and re-charge as needed. Topping up a refrigerant circuit DIY is illegal, dangerous (some refrigerants are A2L mildly flammable and R-290 is A3 flammable), and would void the warranty. The cost of professional service is small relative to the cost of an uncovered failure.",
    ],
    correctAnswer: 1,
    explanation:
      "R1+R2 is the standard L3 test method for circuit continuity in BS 7671 643.2. Linking L and CPC at the furthest point, measuring at the DB. The MFT (Megger MFT1741+) has a dedicated continuity function with null-leads compensation. Typical reading on a healthy domestic ring: R1+R2 = 0.3–0.7 Ω; R1+rn = 0.2–0.5 Ω (line + neutral, ring closed).",
  },
  {
    id: 2,
    question: "How do you test ring final continuity to verify the ring is actually a ring (not a broken-into-radial)?",
    options: [
      "Isolate AC and DC sides, lock-off, prove dead. Disconnect strings panel by panel. Remove panels using safe roof-access procedures. Recover the panels for recycling — established PV recycling streams in the UK take aluminium frames, glass, copper wiring and silicon cells separately. Inverter and any battery component handled as WEEE (electronics) and hazardous waste (battery) respectively. Roof penetrations made good. Update the EIC to reflect the removal. The MCS-certified installer (or successor) typically arranges the decommissioning chain through authorised waste carriers.",
      "Because it covers the whole work activity (not just the install), it covers operation, use AND maintenance, AND it covers work NEAR a system as well as on it. So it's the legal hook for safe-isolation procedures, lock-off, voltage-proving, and the way you organise the work around live equipment that you're not directly working on. Reg 4(3) is what the HSE charges most often after an electrical incident.",
      "Three-step BS 7671 643.2.2 test. (1) Measure end-to-end resistance of L (r1), N (rn), CPC (r2) — disconnect at the DB. (2) Cross-connect L1 of one leg to N2 of the other leg, and N1 of one leg to L2 of the other leg, at the DB. (3) Measure resistance L–N at every socket on the ring — readings should all be within 0.05 Ω of each other (the geometric average of the ring) for a healthy ring. A socket showing wildly different reading is on a spur or the ring is broken at that point. The test physically confirms the ring topology, not just continuity.",
      "Separating the person from their past behaviour and responding to their current human experience with genuine compassion. Advanced empathy recognises that difficult people are often struggling, that past conflict does not negate present humanity, and that showing empathy in this moment may transform the entire working relationship — whilst still maintaining appropriate professional boundaries",
    ],
    correctAnswer: 2,
    explanation:
      "The cross-connection technique creates a parallel circuit that allows the engineer to measure at each socket and confirm the ring is closed. A broken ring shows up as one or more sockets with much higher resistance (because they're now on the dead-end side of a break). Standard L3 fault-diagnosis test for ring problems.",
  },
  {
    id: 3,
    question: "What's the IR test telling you and what readings indicate a problem?",
    options: [
      "(1) Supply cable — full length for cuts, abrasion, kinks, exposed conductor; (2) Plug — body intact, pins straight, cord-grip in place; (3) Tool casing — cracks, missing screws, contamination ingress; (4) Guard or shield — present, correctly fitted, not damaged; (5) Switch — operates positively, no stuck contacts, anti-restart works after release; (6) PAT label — current, in date, legible. Plus check the tool is the right one for the job.",
      "Plan budget: scheme membership and update events typically £400-800/year if scheme-affiliated (NICEIC, NAPIT) include some CPD; one BS 7671 refresher per amendment year £150-300; one specialist training £400-800; IET Academy / scheme platform online learning typically included with subscription; manufacturer training often free; trade events (ECA Live etc.) £100-300. Total CPD spend typically £1,000-2,500/year for an active QS.",
      "All charge points sold for use in domestic and workplace settings in Great Britain must be 'smart' — capable of being scheduled, default off-peak charging hours pre-set, randomised delay function (to avoid grid spikes when half a million chargers turn on at midnight), data privacy / cybersecurity baseline, and a 'safety provision' that disconnects on certain fault detections. Compliance is a condition of sale; the installer should fit a unit that the manufacturer has self-certified as Regulations-compliant. The apprentice does not need to verify each technical clause but should recognise that any new domestic install is using a smart-compliant unit.",
      "IR (insulation resistance) measures the resistance between live conductors and earth, AND between live conductors themselves, with the circuit dead. BS 7671 643.3 limit: ≥ 1 MΩ for LV circuits up to 500 V (test at 500 V DC); ≥ 0.5 MΩ for SELV/PELV (test at 250 V DC). BUT — modern installations should typically read 100+ MΩ on healthy circuits; a reading of 1–5 MΩ even though it 'passes' the threshold suggests degradation worth investigating. A reading of 0.1–0.9 MΩ is below threshold and indicates real insulation breakdown — wet cable, damaged sheath, contaminated terminal.",
    ],
    correctAnswer: 3,
    explanation:
      "IR is the early-warning test for insulation degradation. The 1 MΩ minimum is a 30-year-old threshold; modern thermoplastic cables typically read 100+ MΩ. A circuit at 2 MΩ is technically 'passing' but is showing signs that warrant investigation. The MFT (Megger MFT1741+) reads up to 200+ GΩ — well into the healthy range.",
  },
  {
    id: 4,
    question: "What's a polarity test and what does it find?",
    options: [
      "Polarity test confirms that the line conductor is connected to the line terminal at every accessory and switching device, AND that switches break the line conductor (not the neutral). BS 7671 643.6 requires polarity verification at every accessory and at the origin. Failed polarity findings: switch breaks neutral instead of line (entire fitting remains live when off — common older-installation fault); reversed polarity at a socket (line and neutral swapped — appliances work but earth/neutral references are wrong); two-way switching wired wrong (intermittent operation). MFT has a polarity test mode; socket testers do polarity-only on 13A sockets.",
      "Dedicated 13 A or 16 A supply on a 6 A or 10 A MCB, in 1.5 mm² T&E to the unit location (utility room, loft, plant cupboard). Local DP isolator. Boost wiring from kitchens and bathrooms — sometimes via humidity sensors or PIR, sometimes via pull-cord switches in bathrooms or push-buttons in kitchens. Some units include a low-voltage commissioning interface (e.g. for installer-set air-flow rates). The unit's nameplate is typically 50-300 W on full load — modest demand. The bulk of the electrical work is the boost wiring network, not the unit supply.",
      "Three things — battery life vs run time (a hard day on an SDS will drain a 5 Ah pack faster than you can charge spares), tool weight (cordless SDS with a 9 Ah pack on the back is noticeably heavier than a corded equivalent), and what supply is actually on site (no 110 V on site = corded 230 V is awkward, cordless wins). Most apprentices end up with a mixed loadout — cordless drill/driver + cordless impact for general work, corded SDS / grinder / recip on site supply for the heavy-duty jobs.",
      "Five-step. (1) MAKE SAFE immediately — isolate the affected circuit / component if you can do so within your competence. (2) LABEL the fault prominently — 'OUT OF SERVICE — DO NOT RE-ENERGISE' — with date and your name. (3) INFORM CUSTOMER in writing — Dangerous Condition Notification (DCN) form describing the hazard, action taken, recommended remedial work, urgency. (4) ESCALATE to supervisor immediately — phone call, not email. (5) DOCUMENT on job sheet — what found, what done, customer brief delivered, supervisor informed. The make-safe action is non-negotiable; the customer's permission is not required for emergency safety action.",
    ],
    correctAnswer: 0,
    explanation:
      "Polarity faults are surprisingly common on older installations — pre-1990s wiring sometimes broke neutral on lighting switches, leaving the lampholder energised at all times. Modern accessories with integral switching (some downlights, EV chargers) MUST switch line; reversed polarity defeats the protection. BS 7671 643.6 makes verification mandatory.",
  },
  {
    id: 5,
    question: "How do you do an EFLI test with the MFT and what's the safety procedure?",
    options: [
      "They share components — both depend on R1+R2 (the cable line + CPC resistance for Zs, line + neutral resistance for voltage drop). A high-Zs reading often correlates with a high voltage drop reading because both are dominated by the cable\\\\\\\\'s R1 contribution. If you find one is borderline, check the other. The two tests are complementary — Zs verifies fault-clearance (ADS), voltage drop verifies normal-operation quality. Both use cable resistance as a key input.",
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "Both are predominantly single-phase domestic in the UK. The differences are in the install scope, not the electrical interface. Air-source has an outdoor unit on the property exterior — a single electrical supply, refrigerant pipework to the indoor cylinder/buffer, controls cabling. Ground-source has either horizontal slinky coils in trenches or vertical boreholes — much larger civils scope, ground-loop pumps that are themselves loads on the electrical supply, and an indoor unit that contains the compressor (so no outdoor unit). Electrical sizing is similar (5-12 kW typical); cable runs are different (ground-source indoor unit is fed from the CU; air-source has cable to the outdoor unit). MCS MIS 3005 covers both.",
      "Category II — intermediate risk, covers most cut/abrasion-resistant work gloves used for cable pulling, cable cutting, masonry handling. The key is matching the cut resistance level (EN 388 marking — A to F for cut, plus puncture, abrasion and tear ratings) to the actual task. A glove rated for general handling is not the right glove for cutting steel cable tray, and a heavily armoured glove makes fine termination work impossible.",
    ],
    correctAnswer: 1,
    explanation:
      "EFLI is one of the live tests in BS 7671 643. The 'no-trip' mode (Megger calls it 'Hi-Z' or 'Loop No-Trip') uses a sequence of low-current pulses that statistically don't accumulate enough residual current to trip a 30 mA RCD; standard mode injects a brief higher-current pulse and may trip RCDs. Always select no-trip mode on RCD-protected circuits.",
  },
  {
    id: 6,
    question: "What does an RCD trip-time test measure and what are the BS 7671 maximum times?",
    options: [
      "Part L (Conservation of Fuel and Power) requires every new build and every notifiable refurbishment to demonstrate compliance via a SAP calculation that meets the Target Emission Rate (TER) and Target Fabric Energy Efficiency (TFEE) for the property type. A heat pump's contribution to the SAP calculation depends on its SCOP and the carbon intensity of grid electricity. Modern heat pumps in well-designed homes pass Part L comfortably. The Future Homes Standard (in force from 2025) effectively rules out fossil-fuel boilers from new-build because the SAP calculation cannot reach compliance with a gas boiler under the tightening targets. The MCS designer's SCOP estimate feeds the SAP calculation.",
      "Collaborate when the issue is important to both parties and there is time to find a solution that fully meets both needs (e.g., designing a shared services route). Compromise when time is limited and a \\\\\\\"good enough\\\\\\\" solution is acceptable to both parties (e.g., sharing a limited workspace). The key difference is that collaboration seeks to expand the pie while compromise divides it",
      "Trip-time test injects a calibrated residual current and measures how long the RCD takes to disconnect. BS 7671 Reg 643.7.3 maximums: at I∆n (rated trip current, e.g. 30 mA): ≤ 300 ms (general type, ≤ 40 ms for type S); at 1×IΔn: ≤ 40 ms (general type). Modern RCDs typically trip at I∆n in 10–30 ms — well under the limit. Slow tripping (&gt;50 ms at I∆n) indicates a failing RCD. The MFT (Megger MFT1741+) tests at multiple injection levels and at 0° / 180° phase angles — the slowest of the four readings is the recorded trip time.",
      "Cool, dry, ventilated location away from sources of ignition; not directly above or below escape routes; minimum clearances per the manufacturer's instructions for thermal management; not in a habitable room without a fire-rated enclosure or adequate fire separation; not in a loft (high temperature in summer, restricted access for emergency response); accessible for emergency isolation. The IET Code of Practice for Electrical Energy Storage Systems gives the framework. The manufacturer's installation manual is the binding instruction set; deviating from it voids the warranty and the BS 7671 compliance basis.",
    ],
    correctAnswer: 2,
    explanation:
      "RCD trip-time is the diagnostic for the RCD's responsiveness. A passing time at I∆n confirms basic operation; the 1×IΔn test confirms operation at higher fault currents. Failing RCDs typically show slowing trip times before they fail completely — periodic testing catches them before they cause harm.",
  },
  {
    id: 7,
    question: "What's a phase sequence test and when is it needed?",
    options: [
      "Export limitation caps the maximum kW the system is allowed to send back to the grid, regardless of how much the array can produce. Implemented by a current transformer (CT) clamp at the supply head, feeding a smart meter or export controller that throttles the inverter when export approaches the limit. The DNO requires it where adding the customer full inverter output to the local network would push voltage outside statutory limits or exceed substation thermal capacity. A 5 kWp array might be limited to 3.68 kW export with the rest used on site (charge a battery, run a heat pump, charge an EV). The MCS designer specifies the limiter; the L3 electrician fits the CT and routes the data cable to the inverter.",
      "ATEX zones (Zone 0 / 1 / 2 for gas, Zone 20 / 21 / 22 for dust) require all equipment in the zone — including test instruments — to be ATEX-rated for the zone. Standard kit: intrinsically-safe two-pole tester (Martindale VI-15800 or Megger DET14C with Ex marking), no mobile phones in zone, no battery tools without Ex rating, no smoking, no metal tools that could spark on contact with steel. The fault diagnosis approach is — bring everything to a non-zoned area where possible, isolate at the boundary, only work in-zone with intrinsically-safe instruments and a hot-work permit.",
      "Cutting (T+E shears, side cutters, hacksaw for trunking and conduit), stripping (auto-strippers and a sharp Stanley for outer sheath) and terminating (Pozidriv VDE drivers for accessory terminations, ratchet crimper for ferrules where used). Layered on top of that — measuring (tape, level), marking (pencil or chinagraph), and fixing (claw hammer for joist clips, club hammer for chasing). Six categories in two months.",
      "Phase sequence test confirms the order of phase rotation (L1, L2, L3 or A, B, C in correct sequence) on three-phase supplies. Wrong sequence reverses the rotation of three-phase induction motors and pumps — can cause damage to driven plant and wrong direction of conveyors / lifts. Tested with a phase rotation indicator (Fluke 9040, Megger PRMA1) — three probe leads, instrument indicates correct or reversed sequence. Required at three-phase commissioning and after any maintenance that may have disturbed phase identification (e.g. cable replacement, supply transformer changes).",
    ],
    correctAnswer: 3,
    explanation:
      "Phase sequence matters for any three-phase rotating plant. A reversed sequence runs the motor backwards — driven plant runs backwards (conveyor, fan, pump). Specific test instruments (Fluke 9040, Megger PRMA1) indicate sequence with a clear arrow direction. Modern MFTs (Megger MFT1741+) include phase sequence as a function on three-phase tests.",
  },
  {
    id: 8,
    question: "What test results indicate a high-resistance joint somewhere on the circuit?",
    options: [
      "Three readings in combination. (1) R1+R2 higher than calculated expected (a 50 m run of 2.5 mm² ring should give R1+R2 of 0.5 Ω; if it reads 1.4 Ω something is adding resistance). (2) EFLI Zs higher than expected for the same reason. (3) Voltage drop on full load greater than calculated — an in-service measurement with a clamp meter showing &gt;5% volt drop confirms IR² heating at a high-resistance joint. The thermal camera (Sub 2.3) then locates the joint by its heat signature. Diagnostic combination: high R1+R2 + high Zs + thermal hotspot = HRJ at the hotspot location.",
      "It's a flag that the substance can cause an allergic respiratory response in some operatives — repeated exposure can sensitise even without a single high-dose event. Means tighter respiratory PPE control (FFP3 minimum, often a respirator), good extract ventilation, and health surveillance under COSHH 2002 Reg 11 if the exposure is regular. Two-pack epoxy isocyanates are the textbook example in the trade.",
      "Modern EV chargers can leak smooth DC current under fault conditions — and a Type AC RCD won't trip on smooth DC. So Section 722 requires either a Type B RCD (which detects AC, pulsating DC and smooth DC) OR a Type A RCD plus an RDC-DD (a separate device that adds smooth-DC detection to a Type A RCD). The RDC-DD route is often cheaper than fitting a Type B RCD because Type A RCDs are widely available and inexpensive. The certified installer chooses the architecture; the customer doesn't see the difference but the regulatory compliance requires one or the other.",
      "Electrical burns are usually small at the surface but deep at the tissue level — current passing through tissue heats it from the inside out. Thermal burns are usually obvious at the surface. Electrical burns may have separate entry and exit wounds. Both need cooling (10-20 min cool running water for thermal; less aggressive for electrical because of underlying tissue damage), covering with a clean non-adherent dressing, and medical assessment.",
    ],
    correctAnswer: 0,
    explanation:
      "High-resistance joints don't show up on a single test — they show up as a pattern across multiple tests. The diagnostic combination of high continuity reading + high EFLI + thermal hotspot is the classic L3 HRJ identification. Sub 3.3 (likely fault locations) walks through the locations they typically appear.",
  },
];

const faqs = [
  {
    question: "What's the difference between Zs and Ze?",
    answer:
      "Ze is earth fault loop impedance at the ORIGIN of the installation — the impedance of the supply transformer winding + the supply cable + the supply earth + the consumer's main bonding back to the transformer. Measured at the cut-out / main switch by isolating the consumer side. Typical Ze: 0.35–0.65 Ω on TN-C-S, 0.5–1.0 Ω on TN-S, 1–200 Ω on TT. Zs is earth fault loop impedance at the END of a circuit — Ze + R1+R2 + cable loop impedance to the test point. Used to verify the protective device will operate within the BS 7671 643 disconnection time. Zs - Ze = (R1+R2) for the circuit.",
  },
  {
    question: "How do I know if my MFT readings are accurate?",
    answer:
      "Three checks. (1) Calibration sticker in date and certificate available (Sub 2.2). (2) Function check passes at the start of shift (Sub 2.2). (3) Field verification — for important readings, take a reading with a second instrument (e.g. socket tester for polarity, multimeter for voltage) and confirm agreement within tolerance. Where field readings disagree by more than the instruments' combined tolerance, both are suspect — repeat with a third instrument or escalate. Most L3 readings are accepted on the basis of (1) + (2); (3) is reserved for high-stakes decisions.",
  },
  {
    question: "Can I test IR with the loads still connected?",
    answer:
      "No — BS 7671 643.3 requires the test to be between live conductors and earth with no load impedance distorting the reading. Disconnect or remove all loads (lamps, appliances, electronic equipment). For circuits with embedded electronics (LED drivers, dimmers, AFDDs, RCBOs with electronic detection), test at 250 V instead of 500 V to avoid damage, OR remove / shunt the electronic device. The test result should be the insulation of the cabling alone.",
  },
  {
    question: "What's the Hi-Z (no-trip) mode on an MFT and when do I use it?",
    answer:
      "Hi-Z (or 'Loop No-Trip', 'Z LOOP') is a low-current pulsed test that statistically doesn't accumulate enough residual current to trip a 30 mA RCD. Used for EFLI testing on RCD-protected circuits where you don't want to trip the RCD during the test. Slightly slower (1.5–2 seconds vs ~0.5 second for standard mode) and slightly less accurate (the low test current means lower signal-to-noise ratio). Standard mode (Z PSC, 'No-Loop') uses higher current and is faster + more accurate but trips RCDs. Use Hi-Z on RCD-protected circuits; standard on non-RCD circuits.",
  },
  {
    question: "What's a 'PSCC' test and how is it different from EFLI?",
    answer:
      "PSCC (Prospective Short-Circuit Current) is the maximum fault current that would flow on a phase-to-neutral or phase-to-phase fault. Calculated from the L–N or L–L impedance using Ohm's law (PSCC = U / Z_LN). EFLI is the impedance for a phase-to-EARTH fault. PSCC matters for sizing protective devices (the breaking capacity of the breaker must exceed the PSCC at its location). EFLI matters for fault clearance time. The MFT (Megger MFT1741+) measures both; PSCC is typically read at the same time as Ze at the origin.",
  },
  {
    question: "How do I record my MFT readings for a fault investigation?",
    answer:
      "Most modern MFTs (Megger MFT1741+, Fluke 1664FC) have onboard memory and Bluetooth/USB transfer. Readings are tagged with circuit ID, date, time, instrument serial. Transfer to certification software (NICEIC Cert Plus, Megger PowerDB, Easycert) at the depot for the final report. For fault investigations specifically, record: (1) initial readings on the affected circuit (the symptoms), (2) readings during diagnosis (narrowing down the fault), (3) readings after rectification (proof of correction). All three sets become the diagnostic narrative on the job sheet and any associated certificate.",
  },
];

export default function Sub4() {
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
            eyebrow="Module 4 · Section 2 · Subsection 4"
            title="MFT testing for fault diagnosis"
            description="The seven BS 7671 643 tests done with an MFT, framed as fault-diagnosis investigations rather than commissioning — continuity, IR, polarity, EFLI, RCD, current/voltage, phase sequence. What each tells you, the test sequence, typical readings on faulted vs healthy circuits."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 643 tests in order: continuity (R1+R2 + ring), IR, polarity, EFLI, RCD, phase sequence. Order matters — each test assumes previous tests passed.",
              "Test voltages: IR at 500 V DC for LV (250 V if electronics on circuit). EFLI uses Hi-Z mode on RCD-protected circuits to avoid tripping. RCD trip-time at I∆n and 1×IΔn.",
              "High-resistance joint diagnostic = high R1+R2 + high Zs + thermal hotspot. No single test catches HRJ; the pattern across multiple tests does.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Specify the BS 7671 643 test sequence — continuity, IR, polarity, EFLI, RCD, phase sequence — and explain why order matters.",
              "Use an MFT (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) for each of the seven tests with appropriate test voltages and modes.",
              "Distinguish R1+R2 (whole circuit loop) from simple continuity (single-point) and use each in fault diagnosis.",
              "Apply the BS 7671 643.2.2 ring final continuity three-step test to verify ring topology.",
              "Distinguish Hi-Z (no-trip) and standard EFLI test modes and use the right one for RCD-protected vs non-RCD circuits.",
              "Recognise high-resistance joint signatures across multiple tests: high R1+R2 + high Zs + thermal hotspot.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The BS 7671 643 test sequence</ContentEyebrow>

          <ConceptBlock
            title="Six tests, in order, every time"
            plainEnglish="BS 7671 643 sets out the standard sequence for inspection and testing. For fault diagnosis the same sequence applies — verify cleanliness (continuity, IR), then verify protection (polarity, EFLI, RCD)."
            onSite="Modern MFTs (Megger MFT1741+, Kewtech KT64+, Fluke 1664FC) have a function knob that walks you through the sequence — each position is one test. The tests are designed to be done in order; each assumes the previous tests passed."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Continuity of protective conductors</strong> (Reg 643.2.1) — R1+R2 method or simple continuity to a single point. Confirms CPC integrity.</li>
              <li><strong>2. Continuity of ring final conductors</strong> (Reg 643.2.1) — three-step cross-connection test confirms ring topology.</li>
              <li><strong>3. Insulation resistance</strong> (Reg 643.3) — between live conductors and earth, between live conductors. 500 V DC for LV (250 V for circuits with electronics).</li>
              <li><strong>4. Polarity</strong> (Section 643) — confirms line connected to line terminal at every accessory; switches break line not neutral.</li>
              <li><strong>5. Earth fault loop impedance</strong> (Reg 643.7.3) — Ze at origin, Zs at every protective device. Verify against Table 41.3 maximums.</li>
              <li><strong>6. Operation of RCDs</strong> (Reg 643.7.1, 643.8) — trip-time at I∆n and 1×IΔn. Verify against Reg 643.7.3 maximums.</li>
            </ul>
            <p>Tests 1–4 are dead tests; tests 5–6 are live. The dead-then-live order keeps you safe and gives clean diagnostic data.</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.2.1 (Inspection and testing)"
            clause={<>"During erection and on completion of an installation or an addition or alteration to an installation, and before it is put into service, appropriate inspection and testing shall be carried out by one or more skilled persons competent to verify that the requirements of BS 7671 have been met. Appropriate certification shall be issued in accordance with Chapter 64."</>}
            meaning={<>Reg 134.2.1 is the parent duty that the Chapter 64 test sequence implements. For fault diagnosis, the same tests are used to verify the installation has not departed from compliance — the post-fault retest is itself a 134.2.1 verification, and certification under Chapter 64 follows.</>}
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.2.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Continuity tests — R1+R2 and ring final</ContentEyebrow>

          <ConceptBlock
            title="The MFT's continuity function — what it actually measures"
            plainEnglish="Continuity at the MFT level is a low-resistance measurement (typically 0.01–999.9 Ω range) at a calibrated test current of 200 mA. The 200 mA confirms the connection has 'durable mechanical strength' under load — a high-resistance joint that would heat up under load shows up as a high reading at 200 mA."
          >
            <p>Two continuity test methods:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R1+R2</strong> (whole circuit loop) — link L and CPC at the far end of the circuit; measure from the DB end. Gives the loop resistance for use in calculating Zs. Standard L3 method for fault diagnosis.</li>
              <li><strong>Simple continuity (R2)</strong> — measure from the CPC at the DB to a single point (an accessory's earth terminal). Confirms the CPC reaches the accessory but doesn\'t characterise the whole circuit.</li>
            </ul>
            <p>
              Ring final continuity (BS 7671 Reg 643.2.1) uses the three-step cross-connection method:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measure end-to-end of L (r1), N (rn), CPC (r2) — disconnect at DB.</li>
              <li>Cross-connect L1↔N2 and N1↔L2 at DB.</li>
              <li>Measure L–N at every socket on the ring — readings should be within 0.05 Ω of each other for a healthy ring.</li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.ringFinalTest.url}
            title={videos.ringFinalTest.title}
            channel={videos.ringFinalTest.channel}
            duration={videos.ringFinalTest.duration}
            topic={videos.ringFinalTest.topic}
          />

          <SectionRule />

          <ContentEyebrow>Insulation resistance — the most damage-prone test</ContentEyebrow>

          <ConceptBlock
            title="500 V DC test current — and what it can damage"
            onSite="IR testing at 500 V on a circuit with embedded electronics is the most damage-prone test in the MFT\'s repertoire. LED drivers, dimmer modules, RCBOs with electronic detection, smart meters, surge protection devices — all can be damaged silently."
          >
            <p>Standard L3 IR procedure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm circuit is fully isolated AND proved dead with separate two-pole tester.</li>
              <li>Disconnect or shunt-out electronic loads — LEDs, dimmers, AFDDs, smart switches.</li>
              <li>Set MFT to 500 V DC (or 250 V if you can\'t fully disconnect electronics).</li>
              <li>Connect probes between L and CPC; press TEST. Reading should be ≥ 1 MΩ (BS 7671 minimum), typically 100+ MΩ on a healthy circuit.</li>
              <li>Repeat between N and CPC, then between L and N (live conductors).</li>
              <li>Reconnect the loads; verify operation.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>EFLI — earth fault loop impedance</ContentEyebrow>

          <ConceptBlock
            title="The headline diagnostic for circuit health"
            plainEnglish="EFLI tells you how quickly a fault current would clear through the protective device. High EFLI = slow clearance = potentially dangerous. Low EFLI = fast clearance = safe. The BS 7671 Appendix 3 / Table 41.3 maximums are pass/fail thresholds; the diagnostic is the trend."
          >
            <p>Typical EFLI values on healthy circuits:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Domestic Ze (origin): 0.35–0.65 Ω on TN-C-S, 0.5–1.0 Ω on TN-S, 1–200 Ω on TT.</li>
              <li>Ring final 32 A B32 RCBO, 50 m of 2.5 mm² T+E: Zs typically 0.6–1.2 Ω.</li>
              <li>Lighting 6 A B6, 30 m of 1.0 mm² T+E: Zs typically 1.0–1.8 Ω.</li>
              <li>Cooker 32 A B32, 5 m of 6 mm² T+E: Zs typically 0.4–0.8 Ω.</li>
              <li>Shower 40 A B40, 8 m of 10 mm² T+E: Zs typically 0.4–0.7 Ω.</li>
            </ul>
            <p>Use Hi-Z (no-trip) mode on RCD-protected circuits; standard mode on non-RCD circuits.</p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.5.3"
            clause={
              <>
                "Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra &times; I&Delta;n &le; 50&nbsp;V where Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms), I&Delta;n is the rated residual operating current of the RCD."
              </>
            }
            meaning={
              <>
                The Ra &times; I&Delta;n &le; 50&nbsp;V test is your TT-system back-stop. On a TT job where the EFLI looks borderline, calculate it: a 30&nbsp;mA RCD with Ra of 200&nbsp;&Omega; gives Ra &times; I&Delta;n = 6&nbsp;V &mdash; well inside the limit. The same RCD with a 1700&nbsp;&Omega; electrode gives 51&nbsp;V &mdash; fail, regardless of what the loop tester says.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 411.5.3 (RCD-based fault protection)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3"
            clause={
              <>
                "The requirements for RCD testing have been changed and Table 3A (Time/current performance criteria for RCDs) in Appendix 3 has been deleted. Regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness."
              </>
            }
            meaning={
              <>
                A4:2026 simplified the RCD test to a single AC trip at rated I&Delta;n. The 5&times;I&Delta;n test is gone, Table 3A is gone, and the test pass criterion is whichever device-standard limit applies (BS EN 61008 / 61009 / 62423 / 7288). Update your firm&apos;s test pro forma if it still has a 5&times; column.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 643.3 (RCD testing redraft)."
          />

          <SectionRule />

          <ContentEyebrow>RCD trip-time and phase sequence</ContentEyebrow>

          <ConceptBlock
            title="Verifying the protective device is actually protecting"
            onSite="An RCD that\'s slow to trip is more dangerous than no RCD at all — the customer believes they\'re protected. Trip-time testing is the L3 fault-diagnosis equivalent of putting your hand in front of a fan to check it\'s spinning the right speed."
          >
            <p>BS 7671 Reg 643.7.1 / Reg 643.7.3 maximum trip times:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At I∆n (rated trip current, 30 mA): ≤ 300 ms (general type), ≤ 40 ms for type S.</li>
              <li>At 1×IΔn (150 mA on a 30 mA RCD): ≤ 40 ms (general type).</li>
              <li>Modern RCDs typically trip at I∆n in 10–30 ms — well under the limit.</li>
            </ul>
            <p>
              Phase sequence test (3-phase only) confirms L1 / L2 / L3 rotation order. Wrong sequence reverses three-phase induction motor rotation. Tested with phase rotation indicator (Fluke 9040, Megger PRMA1).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Running an IR test at 500 V on a circuit with electronic loads still connected"
            whatHappens={<>Apprentice has isolated a kitchen circuit, set the MFT to 500 V IR, presses TEST. Reading is fine (200 MΩ). Half an hour later the LED dimmer in the kitchen has started failing intermittently — the 500 V test pulse damaged its input filter capacitors. Customer reports flickering lights two days later. Apprentice didn\'t realise the test had caused the damage; firm replaces the dimmer at their cost.</>}
            doInstead={<>Before pressing IR test, check for electronic loads on the circuit — LED drivers, dimmer modules, smart switches, AFDDs. Disconnect or shunt them, OR test at 250 V instead of 500 V. Megger and Fluke MFTs both support 250 V; the lower voltage is BS 7671-acceptable for circuits with electronics per GN3 guidance.</>}
          />

          <CommonMistake
            title="Running EFLI in standard mode on an RCD-protected circuit"
            whatHappens={<>Apprentice tests EFLI with the MFT in default mode (high test current). The test pulse trips the 30 mA RCD that protects the circuit. Apprentice resets the RCD, retests, trips again, eventually realises they need Hi-Z mode. Meanwhile the customer\'s freezer (also on the affected RCD) has been off for 20 minutes. Customer complaint, refund of inconvenience.</>}
            doInstead={<>For any RCD-protected circuit, use the Hi-Z (no-trip) EFLI mode. Megger calls it \'Loop No-Trip' or 'Hi-Z'; Fluke calls it 'Z LOOP No-Trip'; Kewtech calls it similar. Slightly slower, slightly less accurate, but doesn't trip RCDs. Standard mode is for non-RCD circuits only.</>}
          />

          <Scenario
            title="Diagnosing a high-resistance joint on a 32 A radial"
            situation={<>Customer reports the RCBO on the upstairs ring final keeps tripping under load (kettle, microwave on simultaneously). The thermal magnetic mechanism trips, not the RCD. You isolate, prove dead, and start MFT testing.</>}
            whatToDo={<>(1) Continuity R1+R2 — reads 1.4 Ω. Calculated expected for 35 m of 2.5 mm² T+E ring = 0.5 Ω. R1+R2 is THREE TIMES expected — strong indicator of a high-resistance joint somewhere on the circuit. (2) Ring continuity three-step — readings vary across sockets by 0.3 Ω (should be within 0.05 Ω) — confirms the high resistance is concentrated at one branch of the ring. (3) IR — passes at 200 MΩ — insulation is fine. (4) EFLI Zs — reads 1.7 Ω against expected 0.7 Ω — confirms the additional resistance shows up in the loop. (5) Restore supply, set up clamp meter, energise the circuit and turn on the kettle. Measure voltage drop at suspect sockets — one socket shows 8 V drop under 13 A load (3.5%, well above 1% expected). (6) Thermal camera scan — the suspect socket reads 60 °C at the L terminal vs 25 °C ambient. (7) Isolate, open the suspect socket — terminal screw is loose, conductor is partially blackened. Re-strip, re-terminate, retest. R1+R2 now reads 0.55 Ω — fault corrected.</>}
            whyItMatters={<>HRJ diagnosis is the canonical L3 multi-test investigation. No single test finds the joint; the pattern across continuity + EFLI + voltage drop + thermal does. The MFT gives you the values; the multimeter and clamp meter give you the in-service measurements; the thermal camera gives you the location. All four instruments contributing to one fault diagnosis is the L3 step-up from L2\'s single-instrument approach.</>}
          />

          <SectionRule />

          <ContentEyebrow>RCD trip-time and ramp testing in fault diagnosis</ContentEyebrow>

          <ConceptBlock
            title="The MFT's RCD test functions — what each tells you"
            plainEnglish="The MFT's RCD test injects a defined fault current and measures the trip time. BS EN 61008 / 61009 specifies the limits: a Type AC 30 mA RCD must trip within 300 ms at 1×IΔn (30 mA) and within 40 ms at 1×IΔn (150 mA). The MFT runs the tests automatically and reports the actual trip time."
            onSite="The Megger MFT1741+, Kewtech KT64+ and Fluke 1664FC all have AutoRCD modes that walk through 1× / 5× / ramp tests and produce a pass/fail report. For fault diagnosis the trip-time tells you whether the RCD is operating within spec OR whether it's slow (suggesting wear, contamination, or wrong-type RCD for the load — e.g. Type AC on a circuit with DC components)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>×½ test</strong> — 15 mA injection on a 30 mA RCD. Should NOT trip. If it does, the RCD is over-sensitive (typically ageing).</li>
              <li><strong>×1 test</strong> — 30 mA injection. Trip within 300 ms (Type AC) or 200 ms (Type A on DC pulse).</li>
              <li><strong>×5 test</strong> — 150 mA injection. Trip within 40 ms.</li>
              <li><strong>Ramp test</strong> — gradually increases current from 0 mA upward, captures the actual trip current. A 30 mA RCD should trip between 15 mA and 30 mA. Below 15 mA = nuisance-trip risk; above 30 mA = won't protect at the rated current.</li>
              <li><strong>Type AC vs Type A vs Type B</strong> — Type AC sees only sinusoidal AC residual current (legacy); Type A also sees pulsating DC residual (modern domestic standard); Type B also sees smooth DC (required for EV chargers, VSDs, certain solar PV). Mismatch causes nuisance trips OR worse, no protection.</li>
              <li><strong>Phase angle</strong> — modern MFTs let you choose 0° or 180° phase angle for the test. Faulty RCDs sometimes pass on one angle and fail on the other.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Phase sequence and three-phase tests</ContentEyebrow>

          <ConceptBlock
            title="Three-phase rotation, phase loss, and the MFT's phase-sequence function"
            plainEnglish="On three-phase circuits the rotation (L1-L2-L3 vs L1-L3-L2) determines the direction of motor rotation. Wrong rotation = pumps run backwards, lifts go down instead of up, conveyors go the wrong way. The MFT (or a dedicated phase-sequence indicator) confirms rotation in seconds."
            onSite="Standard tools: Megger PSI4 (phase sequence indicator, ~£100), Megger MFT1741+ (built-in phase sequence on the rotary switch), Kewtech KT200 (combined phase-sequence + voltage tester). The phase-sequence test is non-invasive — connect three probes to L1, L2, L3 and the indicator shows direction of rotation."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Correct rotation</strong> — UK standard is L1-L2-L3 clockwise (some sources call this "ABC"). Rotation indicator shows clockwise arrow / "1-2-3" / green LED.</li>
              <li><strong>Wrong rotation</strong> — anticlockwise / "1-3-2" / red LED. Swap any two phases at the supply to reverse.</li>
              <li><strong>Phase loss</strong> — one of L1/L2/L3 missing. Three-phase motor will hum but not rotate; some indicators flash to show. Voltage check L-L confirms (e.g. L1-L2 = 0 V or 230 V instead of 400 V).</li>
              <li><strong>Phase imbalance</strong> — voltages between phases differ significantly (&gt;5%). Causes motor overheating and reduced torque. Power-quality analyser logs over time.</li>
              <li><strong>Open neutral on 3-phase</strong> — supplies become unbalanced; load with low resistance gets full L-L voltage. Catastrophic for connected single-phase equipment. Check N voltage to true earth at sub-DB.</li>
              <li><strong>Earth fault on 3-phase</strong> — Type B RCD or earth-leakage relay fires. Use clamp meter on N + 3 phases together to confirm leakage current.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Special tests — earth electrode, prospective fault current</ContentEyebrow>

          <ConceptBlock
            title="The dedicated tests when MFT loop test isn't enough"
            plainEnglish="For TT installations and for installations where prospective fault current matters, dedicated tests beyond the MFT's standard loop function are needed."
            onSite="Earth electrode resistance: Megger DET3TC (3-pole), DET14C (stakeless clamp method) — typical TT electrode 50-200 Ω, anything &gt;200 Ω needs investigation. Prospective fault current (PSCC, Ipf): Megger MFT1845 has a high-current loop test that gives Ipf directly; standard MFTs calculate Ipf from Ze (Ipf = U0 / Ze)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Earth electrode test (3-pole)</strong> — main electrode + auxiliary current stake (10-20 m away) + auxiliary potential stake (5-10 m). MFT injects current, measures voltage gradient. Electrode resistance read directly.</li>
              <li><strong>Earth electrode test (stakeless)</strong> — Megger DET14C clamps around the electrode lead. Measures using induced current method. Needs an earth network present (won't work on isolated electrodes).</li>
              <li><strong>Prospective Short Circuit Current (PSCC)</strong> — measured at origin between phases (or L-N for single-phase). UK domestic typically 6 kA at cut-out; commercial 16-25 kA at TX-side. Used to confirm protective device breaking capacity (BS EN 60898 MCBs typically 6 kA, BS EN 60947-2 MCCBs 25-50 kA).</li>
              <li><strong>Prospective Earth Fault Current (PEFC)</strong> — measured L-E at origin. Often the limiting figure for breaker selection. Always less than PSCC.</li>
              <li><strong>Insulation resistance at higher voltage</strong> — for SWA cables and larger motors, IR test at 1 kV (Megger MIT400-2) or 2.5 kV (MIT525). Compare to BS 7671 643.3.3 minimum (1 MΩ at 500 V test for general circuits).</li>
              <li><strong>Polarisation index</strong> — for motors and transformers. IR ratio at 10 minutes vs 1 minute. PI &gt; 2.0 = good insulation; PI &lt; 1.0 = wet or damaged windings.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 643 test sequence: continuity, ring continuity, IR, polarity, EFLI, RCD, phase sequence. Each test assumes the previous passed. Dead tests then live tests.",
              "R1+R2 measures whole-circuit loop resistance; simple continuity measures CPC to a single point. R1+R2 is the standard L3 fault-diagnosis method.",
              "Ring final continuity uses three-step cross-connection (BS 7671 643.2.2) to verify ring topology — readings within 0.05 Ω at every socket.",
              "IR test at 500 V damages electronics. Disconnect / shunt electronic loads OR test at 250 V per GN3 guidance.",
              "EFLI Hi-Z (no-trip) mode for RCD-protected circuits; standard mode for non-RCD. Always check supply arrangement before pressing TEST.",
              "RCD trip-time max 300 ms at I∆n (40 ms for type S), 40 ms at 1×IΔn. Modern RCDs typically trip in 10–30 ms.",
              "Phase sequence (3-phase) confirms rotation order. Wrong sequence reverses motor direction. Tested with Fluke 9040 / Megger PRMA1.",
              "High-resistance joint diagnostic = high R1+R2 + high Zs + voltage drop on load + thermal hotspot. No single test catches HRJ.",
            ]}
          />

          <Quiz title="MFT testing for fault diagnosis — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.3 Multimeter / clamp / IR</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next section <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">§3 Common faults</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
