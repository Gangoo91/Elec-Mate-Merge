/**
 * Module 4 · Section 6 · Subsection 1 — Preparation for fault correction
 * Maps to C&G 2365-03 / Unit 303 / LO6 / AC 6.1
 *   AC 6.1 — "interpret information sources to plan fault correction work"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 6.1 + 6.2 — interpret drawings,
 * specifications, manufacturer literature; plan the correction sequence.
 *
 * Frame: rectification work that is planned beats rectification work that is
 * winged. The L3 step-up is interpreting drawings, schedules, manufacturer
 * literature, IET Guidance Note 3, and BS 7671 chapters before parts are
 * sourced and the van is loaded.
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
  "Preparation + interpreting information sources (6.1) | Level 3 Module 4.6.1 | Elec-Mate";
const DESCRIPTION =
  "How the L3 apprentice reads the as-built drawings, the EICR / Schedule of Test Results, the manufacturer data sheet, the IET Code of Practice 5th edition and IET Guidance Note 3 BEFORE the van is loaded — so the rectification arrives on site with the right parts, the right tests planned, and the right method statement.";

const checks = [
  {
    id: "mod4-s6-sub1-as-built",
    question:
      "You're sent to rectify a fault on a small-commercial three-phase distribution board. The customer hands you a drawing pack — 'here's the as-built for the board'. Before you read the schematic, what's the first thing you check?",
    options: [
      "Schedule of Remedial Works (or 'Remedial Action Notice') referenced back to the original EICR + Minor Works Certificate for the rectification work itself. The Schedule of Remedial Works lists each EICR-coded item, what was done to rectify, the new test result, the date and signature. Combined with the MWC, it's the documentary proof that the C2 has been cleared. The Duty Holder (the customer, employer or landlord) keeps the EICR + the Schedule + the MWC together — that's the bundle they hand to the next inspector at the next periodic inspection (typically 5 years for domestic, 1 year for commercial / landlord).",
      "Drawing currency and revision. The drawing has a title block in the corner with REV LETTER (A, B, C, D…), DATE, REVISION DESCRIPTION, and DRAWN BY / CHECKED BY / APPROVED BY signatures. If the latest revision is dated three years ago and the customer has had additions since, the drawing is OUT OF DATE — you treat it as a starting hypothesis, not as truth. The L3 apprentice's discipline is to verify the drawing against the actual installation (cross-check at the DB, at least three random circuits) before relying on it. Drawings that don't match the installation are the canonical cause of rectification mistakes.",
      "Decline. The senior is asking you to be inside the danger zone of a live exposed conductor without the operational role of a witness/observer (you're holding a cover, not observing safety). EAWR Reg 14 — three conjoint tests — would not be satisfied: live work is happening, you're in the danger zone, but there's no live-working risk assessment that includes you as a participant. Your appropriate role is OUTSIDE the work area as a barrier-monitor / comms-runner / first-aider. If the senior needs the cover held to access the busbar, the right answer is to use a clip / stand / temporary cover-prop, NOT a human hand. Politely escalate to the supervisor if pressed.",
      "They share components — both depend on R1+R2 (the cable line + CPC resistance for Zs, line + neutral resistance for voltage drop). A high-Zs reading often correlates with a high voltage drop reading because both are dominated by the cable\\\\\\\\\\\\\\\\\\\\\\\\'s R1 contribution. If you find one is borderline, check the other. The two tests are complementary — Zs verifies fault-clearance (ADS), voltage drop verifies normal-operation quality. Both use cable resistance as a key input.",
    ],
    correctIndex: 1,
    explanation:
      "Drawing currency is the L3 step-up. At L2 you assumed drawings were correct. At L3 fault rectification you assume drawings are a starting hypothesis to be verified. The title block tells you the revision; cross-checking at the DB tells you whether the drawing matches reality.",
  },
  {
    id: "mod4-s6-sub1-mfr",
    question:
      "You're replacing a failed Schneider iC60N RCBO. Before you fit the new one, what manufacturer information do you need?",
    options: [
      "Setup: MFT in EFLI / Loop mode (typically position '4' on Megger MFT1741+). Test leads to L and CPC at the test point (typically a socket, an accessory, or the DB output). Safety: this is a LIVE test — circuit must be energised, RCD-protected (MFT injects a low-current test pulse that doesn't trip the RCD on most tests, but use the 'Hi' or 'no-trip' mode for verification on RCD-protected circuits). Press TEST. The MFT measures the current that flows during the brief test pulse and calculates Zs. Reading appears in 1–3 seconds. Compare to BS 7671 Appendix 3 / Table 41.3 maximum for the protective device.",
      "No, for several reasons. The refrigerant work requires F-Gas certification (criminal offence to do without). The Building Regulations Part L compliance pathway requires installation by an MCS-certified installer for the customer to claim Smart Export Guarantee or similar incentives. The Boiler Upgrade Scheme grant requires MCS sign-off. Manufacturer warranties typically require certified installation. The MCS install pack includes heat-loss calc, emitter sizing, SCOP estimate, electrical schedule, commissioning records — all required for the system to perform as designed. DIY heat-pump install is unsafe and uneconomic.",
      "A larger consumer unit (often 16-24 way) with dedicated RCBOs / AFDDs for the PV inverter AC connection, the battery inverter AC connection, the EV charger circuit, the heat pump circuit, plus the existing house circuits. Sometimes a separate sub-board for the PV / battery / heat pump cluster and a CT clamp on the main supply tail back to the EV charger or HEMS. Cable management at the CU becomes a real consideration — main tails plus PV export plus battery in/out plus heat pump and EV feeds is a lot of cable in one box.",
      "Three pieces. (1) The DATA SHEET for the iC60N — confirms terminal torque (typically 2.0&ndash;3.0 Nm for a Schneider DIN-rail device), connection diagram, AFDD compatibility flag if any, ambient temperature derating curve. (2) The INSTALLATION INSTRUCTIONS — covers the busbar engagement sequence (the small click as the busbar tab seats), the mounting orientation requirement (always vertical, terminals up or down per the model), the test button function. (3) The TYPE-COMPATIBILITY SHEET — confirms the iC60N is a like-for-like replacement for the device that failed (same In, same Type B/C/D curve, same I&Delta;n on the RCD side, same breaking capacity). Schneider's product page on schneider-electric.co.uk has all three downloadable as PDF.",
    ],
    correctIndex: 3,
    explanation:
      "Manufacturer data is the design authority for the device. Wrong torque means a high-resistance termination that will heat and fail again. Wrong type-class (B vs C) means nuisance-trip behaviour will change. Reading the data sheet is 5 minutes; ignoring it is the cause of the comeback visit.",
  },
  {
    id: "mod4-s6-sub1-gn3",
    question:
      "You're planning Zs verification on a remote socket after rectifying a kitchen ring. What does IET Guidance Note 3 (Inspection and Testing, current edition) tell you about the test method?",
    options: [
      "The fault is at a point that splits the supply — typically the consumer unit busbar, an MCB / RCBO, or a sub-circuit. If the divide is between RCD-protected zones (e.g. all RCD1 circuits dead, all RCD2 fine), the issue is RCD1 or its busbar. If the divide is between separate buildings on the same supply (main house OK, garage out), the issue is the garage feed. The fault is at the upstream side of the affected portion. Investigation: identify the boundary of dead vs live circuits; trace upstream from the boundary; the fault is at the point where dead becomes live.",
      "Six-point check. (1) ENERGISE the rectified circuit AND verify the affected sockets work (kettle test or known-good appliance). (2) ALL other circuits restored to their pre-visit state — check no breakers left off, no insulation tape on terminals. (3) DB closed and locked, cover screws back in. (4) NO TOOLS / OFFCUTS / WASTE left in the work area — sweep visually before walking out. (5) NO TRIP HAZARDS — cables clipped, carpet replaced, kitchen drawers closed. (6) CUSTOMER HANDOVER — show them the work, demonstrate the fix, hand over the certificate, explain any follow-up. The customer arriving home to a dark kitchen because you forgot to flick a breaker back on is the worst hand-back failure.",
      "GN3 sets the practical method for Zs measurement and the interpretation of results. Key points: (1) Use the TWO-LEAD method on socket-outlets if possible (cleaner reading than the three-lead). (2) Read at the FURTHEST point of the circuit from the protective device, not at the DB. (3) Apply the temperature-correction factor (the measured Zs is at ambient, but the protective device must operate when conductors are at running temperature, normally taken as 70 &deg;C for general PVC); GN3 gives the multiplier (typically 1.20 for cables at 70 &deg;C from 20 &deg;C ambient). (4) Compare the corrected Zs against the BS 7671 maximum for the device type and rating in Tables 41.2 to 41.4 OR use the 0.8 rule of thumb. (5) RECORD the actual reading on the test schedule, not just the pass/fail.",
      "The portfolio captures: (1) WORK EVIDENCE — job sheets, certificates, photos of the work in progress and completed. (2) REFLECTION — written reflections on each significant piece of work, using a structured format (often Gibbs' or Kolb's reflective cycle) — what was the situation, what did you do, what was the result, what would you do differently. (3) WITNESS TESTIMONY — the supervisor / on-site mentor signs off that the work was witnessed and the standard was met. (4) UNIT MAPPING — each piece of evidence is mapped to the relevant 2365 unit and Assessment Criterion. The reflection is the 'learning' part — the portfolio doesn't just prove you DID the work, it proves you LEARNED from it. The L3 to L4 / Approved Electrician progression assesses the portfolio as much as the technical work.",
    ],
    correctIndex: 2,
    explanation:
      "GN3 is the IET's interpretive guidance for BS 7671 Part 6 testing. The L3 apprentice should know GN3 exists, what it covers (test methods, instrument selection, result interpretation), and how to use it as the bridge between the BS 7671 regulation and the practical site test. Guidance Notes are not legal requirements but they are the industry-accepted method.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the difference between an 'as-designed' drawing and an 'as-built' drawing, and which one matters for rectification work?",
    options: [
      "Standard EICR per BS 7671 Part 6 covers the fixed wiring of the property. With env tech additions you must also: verify the PV DC isolator is accessible, labelled and operates correctly; check inverter signage at the consumer unit, meter and DC isolator (BS 7671 Section 712 plus MCS Code requirements); record the PV array Voc and inspect for visible cell or junction-box damage from a roof-safe vantage; test the AC final circuit serving the inverter as a normal final circuit; for the EV charger — verify the open-PEN protection method (built-in, TT electrode, or external device), test the RCD type (Type B or Type A + RDC-DD), check the local isolator is within sight; record findings in the EICR observations alongside the standard codes. Use C1 / C2 / C3 / FI codes per the EICR Best Practice Guide.",
      "Two different documents. AS-DESIGNED is the drawing the designer issued before construction — what the installation was intended to be. AS-BUILT is the drawing updated by the installer at handover to reflect what was actually installed (different cable routes, substituted accessories, additions during construction). Rectification work needs the AS-BUILT — that's the drawing that should match the live installation. If only the as-designed is available, the contractor verifies against the actual installation before relying on it. Many small-commercial installations have only as-designed because the as-built was never produced or has been lost; in that case the contractor's first task is to redraw the affected section before rectification.",
      "Around eight hours of accredited training (typically delivered as a one-day workshop or split over two half-days) covering climate science, the carbon impact of the trainee role and sector, individual and workplace action, and the social and economic context of the climate transition. To become Certified Carbon Literate the trainee must demonstrate understanding through assessment and commit in writing to one personal action and one workplace action. The Carbon Literacy Project (a Manchester-based registered charity) accredits training providers and issues the certifications. Major UK construction and engineering firms run rolling Carbon Literacy programmes for their workforces.",
      "The DNO (Distribution Network Operator) is the company that owns and maintains the local low-voltage and medium-voltage distribution network — the poles, cables and substations between the National Grid and the customer meter. There are six DNO regions in Great Britain (UK Power Networks, Northern Powergrid, SP Energy Networks, Electricity North West, National Grid Electricity Distribution, SSEN). The DNO is NOT the supplier — the supplier sends the customer bill but does not own wires. You find the DNO from the postcode (the ENA Distribution map) or from the MPAN supply number at the customer meter (digit 1 of the bottom-line MPAN identifies the supply area). G98 / G99 notifications go to the relevant DNO, not to OFGEM, not to the supplier.",
    ],
    correctAnswer: 1,
    explanation:
      "Drawing-type literacy is L3 competence. As-designed = intent; as-built = reality. For rectification, you need reality. Where reality drawings are missing, the contractor produces a sketch as part of the rectification scope; the cost of doing so is recovered in the quote.",
  },
  {
    id: 2,
    question:
      "A small-commercial Schedule of Test Results from the original EIC shows R1+R2 = 0.45 ohm and Zs = 0.62 ohm on the affected circuit. You re-test after rectification and get R1+R2 = 0.78 ohm and Zs = 0.95 ohm. What does the comparison tell you?",
    options: [
      "Live working is permitted under EAWR Reg 14 only when (a) it's unreasonable for the conductor to be dead, (b) it's reasonable for work to be carried out live, and (c) suitable precautions are taken — ALL three. Choosing live work to avoid customer inconvenience does NOT pass test (a) — convenience isn't 'unreasonable for the conductor to be dead'. The L3 apprentice doesn't get to make that trade-off; the firm's risk assessment makes it, with documented justification, and the supervisor authorises it. The 'I'll just do it live, the customer doesn't want the power off' is the exact failure mode the HSE prosecutes after the inevitable shock.",
      "Isolate AC and DC sides, lock-off, prove dead. Disconnect strings panel by panel. Remove panels using safe roof-access procedures. Recover the panels for recycling — established PV recycling streams in the UK take aluminium frames, glass, copper wiring and silicon cells separately. Inverter and any battery component handled as WEEE (electronics) and hazardous waste (battery) respectively. Roof penetrations made good. Update the EIC to reflect the removal. The MCS-certified installer (or successor) typically arranges the decommissioning chain through authorised waste carriers.",
      "The increase suggests something in the rectification has added resistance. Possible causes: (1) the new accessory's terminations are higher resistance than the originals (under-torqued, dirty, oxidised), (2) the rectification involved a new joint that wasn't there originally (junction box, Wago connector), (3) the cable conductors were inadvertently nicked during the work, (4) a CPC was missed and the only return path is via the bonding network (high resistance). The L3 apprentice's response is — STOP, recheck terminations to manufacturer torque, retest, and only sign off when the readings are within reasonable tolerance of the original (typically ±10% acceptable for the same circuit / same instrument). Comparison against the original is the catch that prevents 'looks fine' rectifications passing.",
      "The F-Gas Regulations (the EU Fluorinated Greenhouse Gases Regulation retained in UK law plus the UK Fluorinated Greenhouse Gases Regulations 2015) require any work on a sealed refrigerant circuit (charging, recovery, leak testing, brazing into the circuit) to be carried out by an F-Gas-certified person. Companies handling F-Gas refrigerants must hold a company F-Gas certificate. The L3 electrician's scope is the electrical supply, isolation, controls, smart integration and external bonding. The trade boundary is firm — the electrician calls in an F-Gas-certified engineer for any refrigerant work.",
    ],
    correctAnswer: 2,
    explanation:
      "Comparing test results pre- and post-rectification is one of the most powerful techniques for catching subtle errors. A circuit that was 0.45 ohm and is now 0.78 ohm has changed, and the change is not random — it points at the rectification work. The original Schedule of Test Results from the EIC is the baseline; the comparison is the L3 verification step.",
  },
  {
    id: 3,
    question:
      "What's the IET Code of Practice (5th Edition, 2026) for In-service Inspection and Testing of Electrical Equipment, and how does it relate to fault rectification on portable / fixed equipment?",
    options: [
      "Reg 4(2) puts the duty on every employer and on every employee — and Reg 16 on every person working with electrical systems. For the L3 apprentice doing fault diagnosis: (1) the system you're working on must be assessed for its 'as-found' safety BEFORE work starts (visual inspection of CU, supply, bonding, signs of damage); (2) any departures from safe construction must be recorded and not made worse by your work; (3) when you correct the fault, the corrected system must satisfy Reg 4 — i.e. you don't leave the installation in a worse state than you found it; (4) any defect that you can't fix safely is escalated for further work or for advisory documentation to the customer.",
      "Plain English + cost. Example: 'Your kitchen circuit can't handle the load you're putting on it. There are three options. (1) Cheap — rearrange your appliances so you don't run kettle, microwave and toaster at the same time. £0 cost; reduced convenience. (2) Medium — add a dedicated socket for the kettle on a separate circuit. £450 cost; same convenience. (3) Expensive — rewire the kitchen for full modern capacity. £2,500 cost; future-proofed. Each option is safe; they differ on cost and convenience. Which fits your situation best?'. Customer makes the commercial decision; you've explained the technical position; the firm has a defensible record.",
      "A PCR is a published rulebook that defines the methodology for preparing an EPD for a specific product category — for example installation cable, luminaires, switchgear or insulation. It specifies the functional unit (e.g. one metre of cable of given specification), the system boundary, the data requirements, the calculation methodology and the reporting format. All manufacturers preparing EPDs for that product category follow the same PCR, ensuring like-for-like comparability across competing products. PCRs are managed by EPD programme operators such as EPD International, IBU and INIES.",
      "The IET Code of Practice (5th Edition, 2026) — formerly known as PAT testing guidance, now properly 'In-service Inspection and Testing of Electrical Equipment' — is the industry standard for the inspection and testing of portable, movable and fixed equipment in service. It covers visual inspection, earth continuity, IR, polarity, functional testing. For fault rectification on equipment (a workshop tool, a kitchen appliance, a hand-held inspection lamp), the Code sets the test method, the pass criteria, and the labelling / record-keeping requirements. The L3 apprentice meets the Code on equipment-side rectification (replacing a failed flex on a Class I appliance, replacing a damaged 13 A plug-top), and on hand-back the equipment carries a fresh in-service test sticker with the date and the next test due.",
    ],
    correctAnswer: 3,
    explanation:
      "The IET CoP 5th edition (2026) is the current authoritative guidance for in-service testing. It replaced informal 'PAT testing' terminology with the more accurate 'in-service inspection and testing of electrical equipment'. The 5th edition introduced risk-based test intervals, simplified the test categories, and aligned with the current edition of BS 7671. Equipment rectification work normally produces a fresh in-service test record as part of hand-back.",
  },
  {
    id: 4,
    question:
      "BS 7671 Section 134.1.1 says the installation shall be designed and erected to provide for safety. How does this regulation apply during fault rectification?",
    options: [
      "Reg 134.1.1 applies to ANY work on the installation — design, erection, alteration, repair. It says the work shall be carried out by skilled and instructed persons in accordance with the requirements of BS 7671. For rectification, the practical implication is — the rectified circuit, after the work, must STILL meet the original BS 7671 design intent (correct cable size, correct protective device, correct earthing arrangement, correct supplementary bonding). 'Putting it back as it was' is not enough if the original was non-compliant; the rectification is an opportunity to bring the affected circuit up to the current edition of BS 7671 (A4:2026 in 2026). Where the original design predates current standards, the rectification at least matches like-for-like and any departure from current standards is recorded on the certificate.",
      "Significantly. A repair that's exposed to harsh environment (outdoor, kitchen, plant room, washroom) may not last as long as the same repair in benign environment. The repair-vs-replace decision should consider: (a) what's the IP / environmental rating of the repaired vs replacement component? (b) Will the repair retain the original IP rating? (c) Is the new component IP-rated for the actual environment? Replacement often comes with current IP / environmental ratings; repair preserves the existing rating (which may have degraded). For harsh environments, replacement is usually the right call.",
      "BS 7671 Section 712 (extensively revised in A4:2026) requires specific signage at the consumer unit (presence of PV generator), at the meter (alternative supply source), at the inverter (DC and AC isolation points) and at any external DC isolators. The EICR inspector verifies presence and legibility of each sign; missing or illegible signage is recorded as an observation (typically C3 — improvement recommended — unless the absence creates an immediate safety risk for maintainers, in which case C2). The Code Breakers schedule and the EICR Best Practice Guide give the typical coding choice. Inspector recommendations should call for the missing signage to be reinstated.",
      "Same framework as PV and battery. Any generator connected in parallel with the public distribution network falls under ENA G98 (up to 16 A per phase per inverter / generator) or G99 (above 16 A or where the DNO requires pre-application). Micro-wind turbines, micro-hydro turbines and micro-CHP units output AC and connect via an inverter (or a synchronous generator with grid-tie protection). Biomass boilers without electrical generation (just heat) are not generators — no G98 / G99. ENA G83 was the older fast-track standard for micro-generators; superseded by G98 from 2019. The L3 apprentice should recognise that the document chain (G98 / G99, type-test certificate, MCS commissioning, BS 7671 EIC, install pack) is the same regardless of the generation technology.",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 134.1.1 is the umbrella safety regulation. It applies to rectification because rectification is work on the installation. The L3 apprentice's job is to leave the rectified circuit in a state that meets the design intent and that complies with BS 7671 (current edition for new work, original edition for like-for-like replacement, with departures noted).",
  },
  {
    id: 5,
    question:
      "BS 7671 Reg 526.1 governs electrical connections. Why is this regulation central to fault rectification?",
    options: [
      "Type A RCDs detect AC residual currents and pulsating DC residual currents. They cannot detect smooth (continuous) DC residual currents — these can blind the device. Type B RCDs detect AC, pulsating DC and smooth DC residual currents. EV charge points produce smooth DC fault currents that a Type A alone cannot reliably trip. Two acceptable solutions per Section 722: (1) the unit includes its own RDC-DD (6 mA DC detection per IEC 62752 / 61851-1) and the upstream RCD can be Type A; (2) the unit does not include an RDC-DD and the upstream device must be Type B. Modern UK domestic units almost universally include the RDC-DD, so Type A upstream is the dominant choice. Always confirm against the unit's data sheet.",
      "Because the majority of faults — high-resistance joints, intermittent contact, scorched terminations, RCBO heat-trip — trace back to a connection that has degraded over time. Reg 526.1 says every connection shall be (a) suitable for the conductor and the environment, (b) constructed to maintain the connection over the equipment's life, AND (c) accessible for inspection unless specifically permitted otherwise. For rectification, this means — the new connection has to be made with the right method (screw torque, crimp, Wago / Wieland push-wire, soldered joint as appropriate), with the right material (correct ferrule for stranded into screw, correct lever-actuated connector for solid into Wago), and to the manufacturer's torque. A rectified connection that's done wrong will fail again within months. The L3 apprentice's discipline is to follow Reg 526.1 every time, not just on the obvious connections.",
      "Engineering compromise = solution that's less than ideal but acceptable given constraints (cost, time, building fabric, customer budget). Examples: (1) Add a dedicated circuit for high-load appliance instead of full kitchen rewire. (2) Replace one tripping RCBO instead of upgrading to all-RCBO CU. (3) Patch a damaged cable section instead of replacing the full run. Each compromise is acceptable IF: (a) it brings the installation to BS 7671 compliance, (b) the limitations are documented and communicated to the customer, (c) the customer has accepted the compromise in writing, (d) the firm's professional indemnity covers the chosen approach. Compromise is engineering, not corner-cutting.",
      "Reg 4(2) puts the duty on every employer and on every employee — and Reg 16 on every person working with electrical systems. For the L3 apprentice doing fault diagnosis: (1) the system you're working on must be assessed for its 'as-found' safety BEFORE work starts (visual inspection of CU, supply, bonding, signs of damage); (2) any departures from safe construction must be recorded and not made worse by your work; (3) when you correct the fault, the corrected system must satisfy Reg 4 — i.e. you don't leave the installation in a worse state than you found it; (4) any defect that you can't fix safely is escalated for further work or for advisory documentation to the customer.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 526.1 is the connection regulation and it's the single most-violated regulation in fault rectification. Every screw torque, every crimp, every Wago, every soldered joint is governed by 526.1. The L3 apprentice's competence test is to know the right method for the right conductor in the right environment, and to apply it consistently.",
  },
  {
    id: 6,
    question:
      "What's the L3 apprentice's planning routine for parts before going to site?",
    options: [
      "BUS provides £7,500 for ASHP / GSHP and £5,000 for biomass — but the biomass strand is restricted to properties that are not connected to the gas grid AND in defined rural categories AND meet Ecodesign emission limits. The intent: heat pumps are the policy default, biomass is a fallback for properties where heat pumps are not viable (very high heat load, no electrical capacity for the heat pump, off-gas-grid rural) and where the air-quality impact is minimal (rural distance from neighbours, Defra-approved Ecodesign appliance). For a typical suburban property the BUS biomass strand is closed. For a rural off-gas-grid farmhouse with a 30 kW heat load, BUS biomass is sometimes the only viable grant route. The L3 electrician sees biomass overwhelmingly in rural settings.",
      "Three reasons stack up. (1) Foreseeable financial loss — refrigerated stock, in-flight tills, in-flight card payments, in-flight server transactions, in-flight CNC jobs in a workshop, all of which the customer has cause to claim against you if you didn't warn them. (2) Customer trust and repeat business — a contractor who 'just turns the power off' without a heads-up is the contractor the customer doesn't call back. (3) Competence under EAWR Reg 16 — part of competence is foreseeing the consequences of your actions; failing to plan the isolation is itself an EAWR Reg 16 issue, because a competent person would have foreseen and managed the impact.",
      "Five-step parts planning. (1) IDENTIFY the failed component from the diagnosis report — make, model, part number, electrical rating, mechanical rating. (2) CONFIRM availability — check wholesaler stock (CEF, Edmundson, Rexel online) or in-van stock; for special items (heritage MK accessories, obsolete Wylex parts) source by phone first. (3) LIKE-FOR-LIKE check — confirm the replacement is electrically and mechanically equivalent (same In, same curve, same form factor, same back-box dimensions). (4) UPGRADE check — does current BS 7671 (A4:2026) require something different (e.g. AFDD where previously not required)? Discuss with supervisor and customer if upgrade is being made. (5) SPARE consideration — for critical-life components (commercial 3-phase RCBOs, large MCBs) carry a spare for first-failure replacement on the day. The 5-step routine takes 10 minutes the night before; saves the comeback visit for 'wrong part'.",
      "Where equipment is connected and is likely to influence the test or be damaged by the test voltage, a 250 V DC IR test shall be used following connection of the equipment, as clarified in the A4:2026 redraft. Practical implication for fault diagnosis: when you re-IR-test a circuit AFTER fixing a fault and reconnecting electronics (LED drivers, dimmers, electronic timers, smart sockets), use the 250 V range on the MFT to verify the post-fix IR without damaging the kit. The 500 V test still applies before the equipment is connected — that's how you confirm the wiring itself is healthy. The two-stage test (500 V isolated + 250 V with kit re-connected) is the A4:2026-aligned procedure.",
    ],
    correctAnswer: 2,
    explanation:
      "Parts planning is the practical interpretation of the information sources (diagnosis report, wholesaler catalogues, manufacturer data sheets, BS 7671 chapters). The 5-step routine is industry standard for any rectification visit and the L3 apprentice's competence is to apply it before van loading, not to discover the missing part on site at 14:00.",
  },
  {
    id: 7,
    question:
      "You arrive at the site and the customer says 'while you're here, can you also fix the dim light in the hallway and the sticky kitchen socket?'. What's the planning response?",
    options: [
      "The BUS is the current main UK government grant for low-carbon heating retrofits — currently up to £7,500 toward an ASHP install, £7,500 toward a GSHP install, and lower amounts toward biomass boilers in eligible properties. The grant is administered by Ofgem and paid to the MCS-certified installer who passes it through to the customer as a price reduction. Eligible properties: existing dwellings (not new-build) with a valid EPC and no outstanding insulation recommendations on the EPC. The grant has been extended several times and is currently confirmed through the late 2020s.",
      "(a) To use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device provided in accordance with any training in the use of that equipment and the instructions respecting that use; AND (b) to inform the employer of any work situation which a person with the training and instruction given to them would reasonably consider represented a serious and immediate danger to health and safety, AND of any matter which a person with the training given would reasonably consider represented a shortcoming in the employer's protection arrangements.",
      "Scope 2 emissions for any UK business that draws grid electricity have fallen sharply over the last decade because the carbon intensity of the grid has fallen — from around 500 gCO2/kWh in 2012 to around 200 gCO2/kWh in recent years (varies year-to-year with weather, gas prices and renewables output). A business that has not changed its electricity consumption at all has nonetheless seen its scope 2 emissions roughly halve over that period, simply because the grid has decarbonised. Switching to a renewable electricity tariff (with verifiable certificates of origin) can drive scope 2 lower still under the market-based reporting method.",
      "Three-part response. (1) ACKNOWLEDGE the request — you'd like to help; you're trained to add scope when it's safe. (2) ASSESS each item — is it within today's quoted scope? Does it need additional parts you may not have? Does it need additional time? Does it expand the certification (a new fault on a different circuit means a new rectification, separate cert)? (3) DECIDE — small same-circuit additions can usually be absorbed into the visit (price agreed verbally with customer, separate line on the invoice). Different-circuit additions or large scope changes need a separate quote and possibly a separate visit. The L3 apprentice's discipline is to avoid scope creep that runs the visit late, leaves you without the right parts, or commits to work that needs a separate cert. Speak to the supervisor by phone if unsure.",
    ],
    correctAnswer: 3,
    explanation:
      "Scope-on-arrival is one of the most common planning failures. The customer's request is reasonable; the apprentice's response is to assess against today's plan and decide based on time / parts / cert scope, not to default to either 'no' or 'yes' without thinking. Most firms want their apprentices to bring scope changes back to the supervisor / office for pricing and dispatch.",
  },
  {
    id: 8,
    question:
      "What's the practical kit (information sources) the L3 apprentice should have at hand on every rectification visit?",
    options: [
      "Six essential references. (1) BS 7671:2018+A4:2026 itself (paper or PDF on the laptop/phone) — particularly Chapter 4 (Protection), Chapter 5 (Selection), Chapter 6 (Testing), Appendix 6 (Forms). (2) IET Guidance Note 3 (current edition) for testing methods and result interpretation. (3) IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th Edition, 2026) for equipment-side work. (4) HSE GS38 for proving-dead instruments. (5) Manufacturer data sheets for the devices being replaced (downloaded ahead of the visit to the laptop). (6) The site's as-built drawings + Schedule of Test Results from the original EIC / EICR. The L3 apprentice doesn't memorise any of this; the L3 apprentice KNOWS where to look it up in 30 seconds when the question arises on site.",
      "The MCS designer calculates the predicted SCOP per the heat-loss calc, the chosen emitter design, the unit specification and the design flow temperature. The result is shared with the customer in writing as part of the design proposal — typically alongside an estimated annual electricity consumption (kWh) and an estimated annual running cost using the customer's electricity tariff. This sets honest customer expectations and is the basis on which the customer makes the buy-or-not-buy decision. MCS Code of Practice requires this disclosure. Without the SCOP estimate, the customer is signing off a six-figure decision (especially with retrofit fabric work) on no basis. The L3 apprentice should be able to find the SCOP estimate in the design pack and discuss it at customer level if asked.",
      "Ask the manufacturer directly via their technical support or sustainability team — most major UK cable and accessory manufacturers publish EPDs on their website or supply on request. If the manufacturer does not publish an EPD for that product, that fact alone is relevant to the project specifier because the spec called for EPD-backed products. The right action is to flag the missing EPD to the project specifier and either source an EPD-backed equivalent from another manufacturer or request a written derogation from the spec. Documenting the search and the decision protects the contractor against later challenge.",
      "Approximately 4.6 V or 2.0 percent of 230 V. Calculation: 6 mm copper cable has approximately 7.3 mV per A per metre voltage drop. 32 A x 35 m x 7.3 mV = 8.18 V single-direction. For circuit voltage drop the full path is line + neutral so multiply by 2 / cable factors per GN1: but the standard cable tables give the per-A-per-m value already accounting for the full loop. Check GN1 Table A1 for the exact value for the cable type. For 6 mm flat T+E with thermosetting insulation: typical 7.3 mV/A/m so 32 x 35 x 7.3 / 1000 = 8.18 V or 3.6 percent — within 5 percent socket limit but close. Worth checking the EV charger spec for its actual demand under typical use (often 28-30 A continuous, not full 32 A).",
    ],
    correctAnswer: 0,
    explanation:
      "L3 competence is not memorising the regulations; it's knowing where to find the answer fast on site. The six-reference kit covers regulatory (BS 7671), interpretive (GN3, CoP), legal (GS38), product-specific (manufacturer data) and site-specific (as-built, EIC). All six are accessible on a phone or laptop in seconds.",
  },
];

const faqs = [
  {
    question: "Where do I get the latest IET Guidance Note 3?",
    answer:
      "GN3 is published by the IET (Institution of Engineering and Technology) and is updated to track BS 7671 amendments. Current edition for 2026 is the post-A4 update. Available as paper book or PDF subscription from the IET shop (theiet.org), and bundled in many of the digital toolkit subscriptions (NICEIC online library, Elec-Mate platform). The GN3 is the standard interpretive reference for inspection-and-testing methods — alongside BS 7671 itself, it's the most-referenced book in the L3 apprentice's kit.",
  },
  {
    question: "What's the IET Code of Practice 5th Edition and when did it change?",
    answer:
      "The IET Code of Practice for In-service Inspection and Testing of Electrical Equipment 5th Edition was published in 2026 and replaces the 4th Edition (2012, with 2020 reprint). The 5th Edition introduces clearer risk-based test intervals, modernised the test classifications (replacing 'PAT testing' terminology with the more accurate 'in-service inspection and testing'), and aligned the test methods with BS 7671 A4:2026. For rectification work on portable / movable / fixed equipment, the 5th Edition is the current authoritative reference for test methods, pass criteria and record-keeping.",
  },
  {
    question: "How do I know if a manufacturer data sheet I've downloaded is current?",
    answer:
      "Manufacturer data sheets carry a publication date and a revision identifier in the footer or title block. For Schneider, Hager, MK, ABB, Eaton — the sheets are republished as products are revised. Always download from the manufacturer's official website (schneider-electric.co.uk, hager.com, mkelectric.com, etc.) rather than from a third-party site; the manufacturer site has the current revision. If the sheet is more than two years old, check the product page for a 'replaced by' note — older protective devices may have been superseded by newer models with different terminal torques or mounting configurations.",
  },
  {
    question: "What if there are no as-built drawings for the installation?",
    answer:
      "Common situation, especially on small-commercial and older domestic. The L3 apprentice's response is — (1) treat the absence as part of the rectification scope; (2) sketch the affected circuit's path before disturbance (cable routes, accessory positions, DB connection); (3) photograph the existing condition for the firm's job file; (4) update the customer's record with the sketch as a partial as-built. The sketch becomes the customer's record going forward and supports the next inspection. Some firms include as-built sketching in the standard rectification scope; others charge separately. Either way, the absence of drawings is a documentary opportunity, not a blocker.",
  },
  {
    question: "Is BS 7671 mandatory or is it just guidance?",
    answer:
      "BS 7671 is a non-statutory standard — but it's the standard that the Electricity at Work Regulations 1989 (statutory) require to be met. Reg 4 of EAWR says systems shall be of such construction as to prevent danger; the practical interpretation is 'designed and constructed in accordance with BS 7671'. Departures from BS 7671 are permitted under EAWR but require justification (reg 134.1 of BS 7671 itself recognises departures and requires them to be recorded on the certificate). For an L3 apprentice the working assumption is — BS 7671 is the design and construction standard, departures are exceptional and require supervisor authorisation.",
  },
  {
    question: "How do I plan testing time into a rectification visit?",
    answer:
      "Verification testing under BS 7671 Part 6 is mandatory but takes time on a real circuit — continuity of CPC + ring (5&ndash;10 mins), IR (5 mins), polarity (built-in to other tests), R1+R2 (5 mins), Zs at the furthest point (5 mins), RCD trip-time at I&Delta;n (2 mins). Total testing time on a domestic single circuit is 20&ndash;30 minutes. The L3 apprentice plans this into the visit at the start — a 'two-hour rectification visit' is typically 30 minutes diagnosis confirmation, 30 minutes physical work, 20 minutes testing, 20 minutes documentation, 20 minutes contingency. Skipping the test time is the cause of the 'I forgot to test' mistake.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 4 · Section 6 · Subsection 1"
            title="Preparation + interpreting information sources"
            description="Reading the as-built drawings, the EICR / Schedule of Test Results, the manufacturer data sheets, IET Guidance Note 3 and IET Code of Practice 5th Edition BEFORE the van leaves the depot — so the rectification visit arrives with the right parts, the right method, and the right tests planned."
            tone="emerald"
          />

          <TLDR
            points={[
              "Drawings are a starting hypothesis, not truth — verify the as-built revision against the actual installation before relying on it.",
              "Manufacturer data sheets give terminal torque, connection diagram, type-class and AFDD compatibility — read them before fitting the new device.",
              "IET Guidance Note 3 is the current interpretive reference for BS 7671 Part 6 testing methods and result interpretation.",
              "IET Code of Practice 5th Edition (2026) governs in-service inspection and testing of equipment — relevant to equipment-side rectification.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Interpret as-designed and as-built drawings, including title-block revision currency, before relying on them for rectification work.",
              "Cross-reference the original Schedule of Test Results from the EIC / EICR with post-rectification readings to confirm the work has not added unexpected resistance.",
              "Locate and apply manufacturer data sheets for protective devices, accessories and equipment — terminal torque, connection diagram, type-class.",
              "Apply IET Guidance Note 3 (current edition) to inspection-and-testing method and result interpretation.",
              "Apply IET Code of Practice 5th Edition (2026) to in-service inspection and testing of equipment encountered in rectification work.",
              "Plan parts, time, testing and documentation for a rectification visit before van loading — the 5-step parts routine and the 6-reference information kit.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Drawings, schedules and the as-built reality</ContentEyebrow>

          <ConceptBlock
            title="Drawings are a starting hypothesis, not the truth"
            plainEnglish="Every drawing has a title block in the corner with the revision letter, the date, and the signatures of the people who drew, checked and approved it. The L3 apprentice's first move on a rectification visit with drawings is to check those signatures against the actual installation — not to trust the drawing because it's printed."
            onSite="Most small-commercial drawings are 5–15 years out of date relative to the installation. Additions, alterations, accessory replacements happen between revisions. The L3 verification routine is — pick three random circuits from the schedule, walk them at the DB and at the load end, confirm they match what's drawn. If they don't, the drawing is hypothesis only and the rectification has to rely on what's physically installed."
          >
            <p>The two drawing types you meet most often:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>As-designed</strong> — issued by the designer before construction. Shows intent. Typically NOT updated to reflect what was actually built.</li>
              <li><strong>As-built</strong> — issued at handover, updated to reflect the actual installation. The drawing you want for rectification.</li>
              <li><strong>Schedule of Test Results</strong> from the original EIC — the baseline electrical readings (R1+R2, IR, Zs, RCD trip-time) for each circuit. Compare your post-rectification readings against this.</li>
              <li><strong>Schedule of Inspections</strong> — the visual inspection record from the original EIC. Tells you what was visually verified at handover.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.1.1"
            clause={
              <>
                "Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation. The installation of electrical equipment shall take account of manufacturers' instructions."
              </>
            }
            meaning={
              <>
                Reg 134.1.1 is the umbrella workmanship regulation. It applies to design, erection, alteration AND repair &mdash; including rectification. Two practical implications. (1) The work must be carried out by skilled or instructed persons (an L3 apprentice qualifies as 'instructed' under appropriate supervision; a fully-qualified electrician qualifies as 'skilled'). (2) Manufacturer's instructions must be followed &mdash; that's the data sheet, the installation guide, the torque specification. Rectification work that ignores the manufacturer's data is a Reg 134.1.1 breach.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 134.1.1 — IET Wiring Regulations 18th Edition Amendment 4."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <VideoCard
            url={videos.safeIsolation.url}
            title={videos.safeIsolation.title}
            channel={videos.safeIsolation.channel}
            duration={videos.safeIsolation.duration}
            topic={videos.safeIsolation.topic}
          />

          <SectionRule />

          <ContentEyebrow>Manufacturer data sheets and product literature</ContentEyebrow>

          <ConceptBlock
            title="The data sheet is the design authority for the device"
            onSite="Hager NDN132B 32 A RCBO data sheet says terminal torque 2.5 Nm. Schneider iC60N RCBO says 2.0–3.0 Nm. MK Logic Plus K2747 13 A socket says 0.8 Nm on the rear screw terminals. Each device has its own number; using the wrong torque (under-torqued = high-resistance heat failure; over-torqued = damaged terminal or stripped thread) is the cause of return faults within months. The L3 apprentice carries a torque screwdriver (Wera 7440 Series, Wiha TorqueVario or Felo 100) and looks up the torque before tightening."
          >
            <p>What a typical data sheet contains:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Terminal torque</strong> — the manufacturer-specified screw torque for the terminations.</li>
              <li><strong>Connection diagram</strong> — which terminal is L, N, load, supply.</li>
              <li><strong>Electrical rating</strong> — In, breaking capacity (kA), I&Delta;n for RCDs, AFDD compatibility flag.</li>
              <li><strong>Mechanical rating</strong> — DIN-rail width (1 module = 17.5 mm typical), depth, mounting orientation requirements.</li>
              <li><strong>Ambient temperature derating</strong> — In is rated at 30 &deg;C ambient; derating curve for higher temperatures (typically 10&ndash;15% reduction at 50 &deg;C).</li>
              <li><strong>Type-compatibility</strong> — which earlier model this device replaces in the same range.</li>
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

          <ContentEyebrow>IET Guidance Note 3 + Code of Practice 5th Edition</ContentEyebrow>

          <ConceptBlock
            title="The IET interpretive references that bridge BS 7671 to the site test"
            plainEnglish="BS 7671 says 'verify by measurement'; GN3 says 'here's how to do the measurement and how to interpret the result'. The IET Code of Practice 5th Edition does the same for in-service equipment testing. Both are non-statutory but both are the industry-accepted method, and competence-scheme audits expect to see them on the contractor's bookshelf or laptop."
            onSite="GN3 examples — the temperature correction factor for Zs measurement (multiply measured Zs by ~1.20 to account for cable warming to operating temperature); the rule of thumb that measured Zs should be less than 0.8 of the BS 7671 maximum to allow for the correction; the test sequence for ring final continuity (R1+R2 = ⅛ of the loop). All of these are GN3 content, not BS 7671 content."
          >
            <p>What each reference adds to the rectification visit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BS 7671 itself</strong> — the regulation. What must be done.</li>
              <li><strong>IET Guidance Note 3</strong> — the practical method. How to do the inspection and testing.</li>
              <li><strong>IET Code of Practice 5th Edition (2026)</strong> — in-service equipment testing. Test method, pass criteria, record-keeping for portable / movable / fixed equipment.</li>
              <li><strong>HSE GS38</strong> — proving-dead instrument selection and use.</li>
              <li><strong>Manufacturer data sheets</strong> — device-specific torque, connection diagram, derating.</li>
              <li><strong>Site as-built drawings + EIC Schedule of Test Results</strong> — site-specific baseline.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE GS38 — Electrical test equipment for use by electricians (4th Edition)"
            clause={
              <>
                "Test probes and leads should incorporate the following features &mdash; finger barriers or are shaped to guard against inadvertent hand contact with the live conductors under test; insulated except for the tip with a maximum of 4&nbsp;mm of exposed metal at the tip (and ideally less); fused at less than 500&nbsp;mA where appropriate; high-impedance to allow for safe testing of dead conductors."
              </>
            }
            meaning={
              <>
                GS38 is the HSE guidance for electrical test instruments. Two-pole testers (Martindale VI-13800, Fluke T130, Kewtech KT1780) are designed to GS38; multimeter probes typically are not. The L3 apprentice carries a GS38-compliant two-pole tester for proving dead and a multimeter for measurement; the two are not interchangeable. Rectification work uses both &mdash; the two-pole to confirm isolation before touching, the multimeter to measure voltages once the work is in progress.
              </>
            }
            cite="Source: HSE GS38 (4th Edition) — Electrical test equipment for use by electricians."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Spares, tools and the morning kit-check</ContentEyebrow>

          <ConceptBlock
            title="What goes in the van before you set off"
            plainEnglish="The L3 fault-correction visit doesn&apos;t survive a missing 4&nbsp;mm² conductor or a flat MFT battery. The morning kit-check is short, structured and saves the second visit."
            onSite="Van layout matters: instruments in a foam-cut case (Fluke / Megger / Kewtech all sell branded), spares in labelled bins (Raaco / Stanley sortmaster), consumables in an open caddy. A kit that&apos;s organised gets checked properly; a chaotic van gets a half-check and a returned-for-parts visit."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Test instruments</strong> &mdash; MFT (charged + within calibration), two-pole tester, proving unit, clamp meter, multimeter. Calibration stickers in date.</li>
              <li><strong>PPE</strong> &mdash; Class 0 gloves (in date, no nicks), insulated tools, arc-flash shield, safety glasses, sturdy boots.</li>
              <li><strong>Common spares</strong> &mdash; matched-brand 6&nbsp;A / 16&nbsp;A / 32&nbsp;A B-curve RCBOs, 13&nbsp;A sockets, 5&nbsp;A switches, sleeving, Wago 221, T+E offcuts.</li>
              <li><strong>Lock-off</strong> &mdash; padlock with unique key, hasp, multilock, tags, signage.</li>
              <li><strong>Consumables</strong> &mdash; plasterboard patch material if make-good is in scope, fire-stop cartridge, intumescent putty, cable clips, P-clips, glands.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Pre-visit briefing and customer expectations</ContentEyebrow>

          <ConceptBlock
            title="Five minutes on the phone before you arrive"
            plainEnglish="The preparation visit starts before you&apos;re on site. A short pre-visit call sets expectations, identifies access constraints, surfaces vulnerable occupants and avoids the &ldquo;we didn&apos;t know you were coming today&rdquo; conversation."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Confirm appointment</strong> &mdash; date, arrival window, expected duration.</li>
              <li><strong>Access</strong> &mdash; who&apos;ll be there, where to park, alarm code or key-safe arrangement.</li>
              <li><strong>Power-down implications</strong> &mdash; freezers, IT, medication fridges, alarms; agree timing and any temporary arrangements.</li>
              <li><strong>Vulnerable occupants</strong> &mdash; elderly residents, young children, anyone on home oxygen or medical equipment that depends on mains.</li>
              <li><strong>Scope and cost</strong> &mdash; what you intend to do today, the call-out fee, the basis for any additional cost if scope grows.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Risk assessment and method statement — RAMS as standard discipline"
            plainEnglish="A formal risk assessment and method statement (RAMS) accompanies any non-trivial rectification visit. The risk assessment lists the hazards (electrical, working at height, lone working, confined space, asbestos exposure, customer-vulnerability), evaluates likelihood and severity, and lists the controls. The method statement walks the work step-by-step. RAMS may be a single-page form for a small domestic visit and a multi-page document for a commercial fit-out — the discipline is the same."
            onSite="Most firms have a template RAMS that is customised at the start of each visit. The L3 apprentice fills in the visit-specific items: address, hazards on the day, occupant vulnerability, isolation strategy, escape route, emergency contact. The customer or building manager signs the RAMS at the start of the visit; a copy stays in the customer file. RAMS is not paperwork for the sake of it — it forces the L3 apprentice to think through the visit before lifting a tool, and it satisfies the firm's CDM and Health and Safety at Work obligations."
          >
            <p>
              Standard RAMS items for a typical L3 rectification visit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical hazards</strong> — live working risk,
                identification of supply, isolation strategy, prove dead before
                touching.
              </li>
              <li>
                <strong>Working at height</strong> — ladder, hop-up, MEWP, edge
                protection; PPE for the height worked.
              </li>
              <li>
                <strong>Asbestos</strong> — pre-2000 properties carry asbestos
                risk; refer to the survey if available, do not drill or break
                ceilings without it.
              </li>
              <li>
                <strong>Lone working</strong> — buddy check, lone-worker app,
                emergency contact, agreed check-in interval.
              </li>
              <li>
                <strong>Customer vulnerability</strong> — elderly, young
                children, medical equipment, pets; agreed power-down strategy
                that minimises disruption.
              </li>
              <li>
                <strong>Confined space</strong> — loft, cellar, riser duct;
                ventilation, lighting, emergency egress.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Tool calibration and PPE check — the boring discipline that prevents the visit going sideways"
            plainEnglish="Multifunction testers (MFT), insulation testers, loop testers and clamp meters all need annual calibration. PPE — gloves, mats, voltage indicators, lock-off kits — needs visual inspection on every visit and replacement when damaged. The L3 apprentice's pre-visit check is a 30-second routine that prevents the awkward 'my MFT is out of calibration' conversation when the customer asks for the certificate."
            onSite="Calibration sticker on the MFT shows the current calibration date and the next due date. Standard practice is annual calibration (12 months); some high-use kits go six-monthly. Calibration certificate lives in the firm's calibration register; copies attached to the certificate where customers request evidence. PPE — voltage indicator (Martindale or Drummond) self-tests at every use; rubber gloves visually checked for cuts; lock-off kit tags and padlocks present and labelled. Replace anything compromised before leaving the depot."
          >
            <p>
              Pre-visit kit check items:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MFT calibration sticker</strong> — date and due date
                visible, certificate available on request.
              </li>
              <li>
                <strong>Voltage indicator</strong> — self-test on every use;
                replaced when battery low or display fails.
              </li>
              <li>
                <strong>Lock-off kit</strong> — padlock, hasp, MCB lock, tag,
                marker pen; tags are firm-branded with apprentice contact.
              </li>
              <li>
                <strong>Insulation gloves and mat</strong> — visual check
                before live-work or testing.
              </li>
              <li>
                <strong>Test leads</strong> — GS38 compliant, fused tips,
                finger barriers, no exposed conductor at the connector.
              </li>
              <li>
                <strong>First aid kit and fire extinguisher</strong> — in date,
                accessible in the van.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer communication record — the audit trail that protects everyone"
            plainEnglish="Every customer conversation about scope, cost, options or risk should leave a written trace. Phone calls get a brief note; emails are the default for substantive items; texts and WhatsApp are increasingly common but should be backed up to the firm's CRM. The audit trail protects both parties — the customer can prove what was agreed, and the firm can prove what was authorised. Disputes that go to mediation or court hinge on the documentary record more than on memory."
            onSite="At the end of every customer interaction, capture the key points in the firm's CRM or job system. 'Customer agreed to option B at £450; reschedule for next Tuesday morning; customer to ensure access to the cellar.' The note takes 30 seconds and lives forever. Email confirmation of any quote, any change of scope, any cost decision — even a one-line confirmation. Customers appreciate the professionalism; the firm gains the protection."
          >
            <p>
              Customer-record items worth capturing in writing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Initial brief</strong> — what the customer reported,
                date, contact details.
              </li>
              <li>
                <strong>Survey or quote</strong> — what was found, options
                presented, prices given, customer choice.
              </li>
              <li>
                <strong>Scope change during work</strong> — anything that
                expands or contracts the original scope, customer agreement
                date and amount.
              </li>
              <li>
                <strong>Customer-declined recommendations</strong> — written
                advisory with the customer's signed acknowledgement.
              </li>
              <li>
                <strong>Aftercare commitments</strong> — return visit dates,
                warranty terms, manufacturer registrations.
              </li>
              <li>
                <strong>Complaint or dispute correspondence</strong> — every
                item routed through the firm's complaints process and logged.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations) and Regulation 513.1 (accessibility)"
            clause={
              <>
                "No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
              </>
            }
            meaning={
              <>
                Preparation includes confirming the working space is actually workable. If the consumer unit is buried behind boxed-in pipework or a kitchen unit, the access has to be sorted before testing starts &mdash; not as an unplanned escalation halfway through. Reg 132.16 binds the duty to ascertain rating and condition before any alteration; Reg 513.1 backs it up with the accessibility requirement on every accessory and item of equipment.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 (verbatim) and Regulation 513.1."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Trusting an outdated drawing"
            whatHappens={
              <>
                Apprentice arrives at a small-commercial unit to rectify a 32&nbsp;A RCBO that's been
                tripping on the lighting circuit. The customer hands over a drawing pack &mdash; the
                drawing shows the circuit feeds two light fittings in the warehouse. Apprentice
                isolates the breaker, confirms dead at the two warehouse fittings, starts work. Half
                an hour later the cleaner reports the office downlights have stopped working &mdash;
                the actual circuit feeds office lights too. The drawing was as-designed from 2018; an
                addition was made in 2021 that put the office lights on the same breaker. The drawing
                was a starting hypothesis the apprentice treated as truth.
              </>
            }
            doInstead={
              <>
                Verify the drawing against the installation before relying on it. Walk the circuit
                from the DB &mdash; switch the breaker on and off, confirm what goes off, list every
                accessory affected. The five-minute walk-through catches additions and modifications
                the drawing missed.
              </>
            }
          />

          <CommonMistake
            title="Fitting a new RCBO without checking the data sheet for terminal torque"
            whatHappens={
              <>
                Apprentice replaces a failed Hager NDN132B 32&nbsp;A RCBO. Tightens the terminations
                by feel. Three months later the customer reports the new RCBO is tripping under
                kettle load. Investigation finds the line termination has heated and the conductor
                has darkened &mdash; classic under-torque heat failure. The Hager data sheet
                specifies 2.5&nbsp;Nm; the apprentice's by-feel torque was probably under 1.5&nbsp;Nm.
                The fix is a re-termination; the cost is a comeback visit and the firm's reputation.
              </>
            }
            doInstead={
              <>
                Look up the torque from the data sheet (5 seconds on the phone). Use a torque
                screwdriver (Wera 7440, Wiha TorqueVario, Felo 100). Set to the specified value.
                Tighten until the screwdriver clicks or slips. Done correctly, the connection lasts
                25&ndash;40 years; done by feel, the connection fails in months.
              </>
            }
          />

          <Scenario
            title="Planning a 32 A RCBO replacement on a small-commercial board"
            situation={
              <>
                The diagnosis report (from yesterday's visit) identifies a failed Hager NDN132B
                32&nbsp;A RCBO on a small-commercial 3-phase Hager board, single-phase circuit feeding
                a kitchenette ring. The customer is open from 09:00; you can be on site from 07:30
                with a 90-minute window before the kitchenette goes back into service.
              </>
            }
            whatToDo={
              <>
                THE NIGHT BEFORE: (1) Confirm parts &mdash; Hager NDN132B in stock at CEF Ardwick
                (open 07:00); reserve via the trade portal. (2) Download the Hager NDN132B data
                sheet to the laptop &mdash; terminal torque 2.5&nbsp;Nm, busbar engagement diagram,
                AFDD compatibility note (no AFDD on this model). (3) Pull the site's most recent EIC
                Schedule of Test Results from the firm's job system &mdash; baseline R1+R2
                0.45&nbsp;&Omega;, Zs 0.62&nbsp;&Omega;, RCD trip-time 18&nbsp;ms at 30&nbsp;mA.
                (4) Confirm the 5-step plan &mdash; isolate, replace, verify torque, retest, certificate.
                (5) Pre-load the MWC template with customer details. ON SITE 07:30: (1) Greet, brief
                the customer on the 90-minute window. (2) Isolate the affected RCBO + lock-off + prove
                dead at the kitchenette. (3) Remove the failed Hager NDN132B; fit the new one with
                torque screwdriver to 2.5&nbsp;Nm; verify busbar engagement clicks. (4) Energise; verify
                the kitchenette fires up; full Part 6 testing with the MFT1741 (R1+R2, IR, polarity, Zs,
                RCD trip-time). (5) Compare results against the EIC baseline &mdash; new readings
                within &plusmn;10% (R1+R2 0.47&nbsp;&Omega;, Zs 0.64&nbsp;&Omega;, RCD trip-time 19&nbsp;ms).
                (6) Issue the MWC + Schedule of Remedial Works on the laptop; email to the customer.
                (7) Hand back at 09:00 with the kitchenette in service.
              </>
            }
            whyItMatters={
              <>
                Planning is the L3 step-up over L2. At L2 you turned up with the part. At L3 you
                turn up with the part, the data sheet, the baseline test results, the MWC template
                pre-loaded, the supervisor's mobile number, and a written plan. The 90-minute window
                holds because the planning collapsed the on-site decision-making to almost zero.
                Without the planning, the same job is a 3-hour scramble with the customer asking why
                the kitchenette isn't ready at 09:00.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Drawings have title-block revisions — verify currency before trusting the drawing for rectification work.",
              "As-designed = intent; as-built = reality; rectification needs as-built (or a fresh sketch where missing).",
              "Manufacturer data sheets give terminal torque, connection diagram, type-class and AFDD compatibility — read before fitting.",
              "BS 7671 134.1.1 mandates good workmanship and adherence to manufacturer's instructions on every install / repair.",
              "BS 7671 526.1 governs every connection — right method, right material, right torque; the most-violated rectification regulation.",
              "IET Guidance Note 3 is the practical interpretive reference for BS 7671 Part 6 testing.",
              "IET Code of Practice 5th Edition (2026) governs in-service equipment testing — the modern replacement for 'PAT' guidance.",
              "5-step parts planning the night before saves the comeback visit; 6-reference information kit on the phone / laptop covers every on-site question.",
            ]}
          />

          <Quiz title="Preparation + interpreting information sources — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section5-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.5 Reporting + handover documentation</div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section6-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.2 Apply correction techniques to common faults</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
